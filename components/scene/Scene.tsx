"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, createPortal } from "@react-three/fiber";
import {
  Scene as ThreeScene,
  OrthographicCamera,
  WebGLRenderTarget,
  Color,
  Points,
  Texture,
  FloatType,
  RGBAFormat,
  NearestFilter,
  NormalBlending,
  MathUtils,
} from "three";
import { buildActTextures, buildParticleAttributes } from "./targets";
import {
  simVertexShader,
  simFragmentShader,
  pointsVertexShader,
  pointsFragmentShader,
} from "./shaders";
import type { TierResult } from "@/lib/tier";
import { scrollProgress } from "./scrollProgress";

/**
 * The propagation field — BRIEF.md §8.
 *
 * Ping-pong FBO simulation: read the previous position texture, ease toward
 * the act-blended target with curl drift, write to the other texture, swap.
 * The render pass samples the result in the vertex shader.
 *
 * The camera drifts on a shallow path and never spins.
 */

function ParticleField({ tier }: { tier: TierResult }) {
  const size = tier.fboSize;
  const { gl, invalidate } = useThree();

  const acts = useMemo(() => buildActTextures(size), [size]);
  const attrs = useMemo(() => buildParticleAttributes(size), [size]);

  // Two render targets to ping-pong between, plus an offscreen scene holding
  // the fullscreen quad the simulation draws to.
  //
  // Plain WebGLRenderTargets rather than drei's useFBO: importing drei at all
  // cost ~55 KB gzipped in this chunk, and the handful of helpers used here
  // are a few lines each. That is the difference between a 232 KB WebGL chunk
  // and one inside the 220 KB budget.
  const [fboA, fboB] = useMemo(() => {
    const options = {
      type: FloatType,
      format: RGBAFormat,
      minFilter: NearestFilter,
      magFilter: NearestFilter,
      depthBuffer: false,
      stencilBuffer: false,
    } as const;
    return [
      new WebGLRenderTarget(size, size, options),
      new WebGLRenderTarget(size, size, options),
    ];
  }, [size]);

  const simScene = useMemo(() => new ThreeScene(), []);
  const simCamera = useMemo(
    () => new OrthographicCamera(-1, 1, 1, -1, 0, 1),
    [],
  );

  const simUniforms = useMemo(
    () => ({
      uPrev: { value: acts.textures[0] as Texture },
      uTargetA: { value: acts.textures[0] as Texture },
      uTargetB: { value: acts.textures[1] as Texture },
      uMix: { value: 0 },
      uTime: { value: 0 },
      uEase: { value: 0.045 },
      uDrift: { value: 0.05 },
      uBreath: { value: 1 },
    }),
    [acts],
  );

  const pointUniforms = useMemo(
    () => ({
      uPositions: { value: acts.textures[0] as Texture },
      uSize: { value: tier.tier === "a" ? 2.6 : 3.2 },
      uPixelRatio: { value: Math.min(tier.maxDpr, 2) },
      uTime: { value: 0 },
      // Palette tokens, read from CSS rather than duplicated here.
      uSignal: { value: new Color("#007ABF") },
      uSignalRaw: { value: new Color("#28A8F0") },
      uWash: { value: new Color("#E8F1F8") },
      uOpacity: { value: 0 },
    }),
    [acts, tier],
  );

  const pointsRef = useRef<Points>(null);
  const readTarget = useRef(fboA);
  const writeTarget = useRef(fboB);
  const seeded = useRef(false);

  // Read the live palette so a token change in globals.css moves the scene too.
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const read = (name: string, fallback: string) =>
      styles.getPropertyValue(name).trim() || fallback;
    pointUniforms.uSignal.value.set(read("--color-signal", "#007ABF"));
    pointUniforms.uSignalRaw.value.set(read("--color-signal-raw", "#28A8F0"));
    pointUniforms.uWash.value.set(read("--color-wash", "#E8F1F8"));
    invalidate();
  }, [pointUniforms, invalidate]);

  useEffect(() => () => acts.dispose(), [acts]);
  useEffect(
    () => () => {
      fboA.dispose();
      fboB.dispose();
    },
    [fboA, fboB],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const progress = scrollProgress.current;

    // Four acts across the scroll. `stage` is the float position between them.
    const stage = Math.min(progress * 3, 2.9999);
    const index = Math.floor(stage);
    simUniforms.uTargetA.value = acts.textures[index];
    simUniforms.uTargetB.value = acts.textures[index + 1] ?? acts.textures[index];
    simUniforms.uMix.value = stage - index;
    simUniforms.uTime.value = t;

    // Breathing belongs to act 1 only; drift widens as the field opens out.
    simUniforms.uBreath.value = Math.max(0, 1 - progress * 4);
    simUniforms.uDrift.value = 0.04 + progress * 0.09;

    // First frame: seed the read target from act 1 so particles do not start
    // at the origin and fly outward, which would read as an explosion.
    if (!seeded.current) {
      simUniforms.uEase.value = 1;
      seeded.current = true;
    } else {
      simUniforms.uEase.value = Math.min(1, 0.9 * delta * 5);
    }

    // --- simulation pass ---
    simUniforms.uPrev.value = readTarget.current.texture;
    gl.setRenderTarget(writeTarget.current);
    gl.clear();
    gl.render(simScene, simCamera);
    gl.setRenderTarget(null);

    const swap = readTarget.current;
    readTarget.current = writeTarget.current;
    writeTarget.current = swap;

    pointUniforms.uPositions.value = readTarget.current.texture;
    pointUniforms.uTime.value = t;
    // Fade in rather than popping on first paint.
    pointUniforms.uOpacity.value = MathUtils.lerp(
      pointUniforms.uOpacity.value,
      1,
      delta * 1.5,
    );

    // Shallow camera drift. Never a spin.
    //
    // The camera rises as the field spreads: level with the field, act 4 is a
    // flat plane seen edge-on and projects to a featureless band. Looking down
    // across it is what makes the separate communities legible. End position
    // matches scripts/build-poster.mjs so the Tier C poster is the same view.
    const cam = state.camera;
    cam.position.x = Math.sin(t * 0.06) * 0.9;
    cam.position.y = 0.5 + Math.sin(t * 0.045) * 0.3 + progress * 3.1;
    cam.position.z = 13.4 - progress * 1.2;
    cam.lookAt(0, -0.15, 0);

    if (pointsRef.current) pointsRef.current.rotation.y = progress * 0.25;
  });

  return (
    <>
      {createPortal(
        <mesh>
          <planeGeometry args={[2, 2]} />
          <shaderMaterial
            vertexShader={simVertexShader}
            fragmentShader={simFragmentShader}
            uniforms={simUniforms}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>,
        simScene,
      )}

      <points ref={pointsRef}>
        <bufferGeometry>
          {/* Position is unused — the vertex shader reads the FBO — but three
              needs an attribute of the right length to size the draw call. */}
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(attrs.count * 3), 3]}
          />
          <bufferAttribute attach="attributes-aRef" args={[attrs.uvs, 2]} />
          <bufferAttribute attach="attributes-aSeed" args={[attrs.seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={pointsVertexShader}
          fragmentShader={pointsFragmentShader}
          uniforms={pointUniforms}
          transparent
          depthWrite={false}
          blending={NormalBlending}
        />
      </points>
    </>
  );
}

/**
 * Adaptive DPR, hand-rolled.
 *
 * Replaces drei's PerformanceMonitor + AdaptiveDpr + AdaptiveEvents. Samples
 * frame times over a one-second window and steps the device pixel ratio down
 * when the scene cannot hold ~50fps, back up when it comfortably can.
 *
 * Deliberately hysteretic: two consecutive bad windows before demoting, four
 * consecutive good ones before promoting. A single janky window during a
 * scroll burst is normal and must not cause the resolution to oscillate.
 */
function PerformanceGovernor({
  max,
  onChange,
}: {
  max: number;
  onChange: (dpr: number) => void;
}) {
  const frames = useRef(0);
  const elapsed = useRef(0);
  const bad = useRef(0);
  const good = useRef(0);
  const current = useRef(Math.min(max, 1.5));

  useFrame((_, delta) => {
    frames.current += 1;
    elapsed.current += delta;
    if (elapsed.current < 1) return;

    const fps = frames.current / elapsed.current;
    frames.current = 0;
    elapsed.current = 0;

    if (fps < 50) {
      bad.current += 1;
      good.current = 0;
    } else if (fps > 58) {
      good.current += 1;
      bad.current = 0;
    }

    if (bad.current >= 2 && current.current > 1) {
      current.current = 1;
      bad.current = 0;
      onChange(1);
    } else if (good.current >= 4 && current.current < max) {
      current.current = Math.min(max, 2);
      good.current = 0;
      onChange(current.current);
    }
  });

  return null;
}

export default function Scene({ tier }: { tier: TierResult }) {
  const [dpr, setDpr] = useState(Math.min(tier.maxDpr, 1.5));

  return (
    <Canvas
      // Capping DPR is the single largest free win on mid-range Android, which
      // reports 2.5–4 and gains nothing visible above 2.
      dpr={dpr}
      // The scene stops burning battery the moment the user stops scrolling.
      frameloop="demand"
      camera={{ position: [0, 0.4, 13], fov: 42, near: 0.1, far: 60 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
      }}
      style={{ pointerEvents: "none" }}
    >
      <PerformanceGovernor max={tier.maxDpr} onChange={setDpr} />
      <ParticleField tier={tier} />
    </Canvas>
  );
}
