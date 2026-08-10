"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Color, Points, Texture, NormalBlending, ShaderMaterial } from "three";
import { buildActTextures, buildParticleAttributes } from "./targets";
import { pointsVertexShader, pointsFragmentShader } from "./shaders";
import type { TierResult } from "@/lib/tier";
import type { ScrollProgressRef } from "./scrollProgress";

/**
 * The propagation field — BRIEF.md §8. "One person becomes many."
 *
 *   Act 1  a single luminous point, alone, breathing
 *   Act 2  it emits — a small cluster forms (a household)
 *   Act 3  clusters multiply (a workplace, a community)
 *   Act 4  a wide, calm field that reads as a region, then stillness
 *
 * Scroll scrubs the field's state: it does not merely parallax it. The camera
 * drifts on a shallow path, rising as the field spreads so the separate
 * communities stay legible, and it never spins. No crescendo.
 *
 * See shaders.ts for why this samples the act textures directly rather than
 * running a ping-pong FBO feedback loop.
 */
function ParticleField({
  tier,
  progress: scrollProgress,
}: {
  tier: TierResult;
  progress: ScrollProgressRef;
}) {
  const size = tier.fboSize;

  const acts = useMemo(() => buildActTextures(size), [size]);
  const attrs = useMemo(() => buildParticleAttributes(size), [size]);

  const uniforms = useMemo(
    () => ({
      uAct0: { value: acts.textures[0] as Texture },
      uAct1: { value: acts.textures[1] as Texture },
      uAct2: { value: acts.textures[2] as Texture },
      uAct3: { value: acts.textures[3] as Texture },
      uStage: { value: 0 },
      uTime: { value: 0 },
      uDrift: { value: 0.04 },
      uBreath: { value: 1 },
      uSize: { value: tier.tier === "a" ? 2.6 : 3.2 },
      uPixelRatio: { value: Math.min(tier.maxDpr, 2) },
      // 0.62, not 1. At full strength the resolved field crowds the lede at
      // the end of the sequence — the copy is what has to stay readable, and
      // the field is the ground behind it, not the subject.
      uOpacity: { value: 0.62 },
      // Palette tokens, read from CSS rather than duplicated here.
      uSignal: { value: new Color("#0072B2") },
      uSignalRaw: { value: new Color("#28A8F0") },
      uWash: { value: new Color("#E8F1F8") },
    }),
    [acts, tier],
  );

  const pointsRef = useRef<Points>(null);
  /**
   * Uniforms are mutated through the material's own reference, not through the
   * object handed to the `uniforms` prop.
   *
   * Mutating the prop object had no effect on what the shader saw: the camera
   * moved, `useFrame` ran, and the scroll value arrived correctly, but the
   * field stayed pinned to act 1 — hardcoding the stage in GLSL rendered act 4
   * immediately, which isolated it to the uniform never reaching the program.
   * Reading the live material guarantees we are writing to whatever object it
   * actually holds.
   */
  const materialRef = useRef<ShaderMaterial>(null);

  /**
   * Scroll progress, smoothed. This is what gives the field its lag and its
   * settle — it eases toward the raw scroll value rather than tracking it
   * exactly, so the particles arrive slightly after the reader does.
   */
  const smoothed = useRef(0);

  // Read the live palette so a token change in globals.css moves the scene too.
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const read = (name: string, fallback: string) =>
      styles.getPropertyValue(name).trim() || fallback;
    uniforms.uSignal.value.set(read("--color-signal", "#0072B2"));
    uniforms.uSignalRaw.value.set(read("--color-signal-raw", "#28A8F0"));
    uniforms.uWash.value.set(read("--color-wash", "#E8F1F8"));
  }, [uniforms]);

  useEffect(() => () => acts.dispose(), [acts]);

  useFrame((state, delta) => {
    const u = materialRef.current?.uniforms;
    if (!u) return;
    const t = state.clock.elapsedTime;

    // Frame-rate independent easing toward the raw scroll value.
    const target = scrollProgress.current;
    smoothed.current += (target - smoothed.current) * Math.min(1, delta * 3.2);
    const progress = smoothed.current;

    // Four acts across the scroll, as one continuous float position.
    u.uStage.value = progress * 3;
    u.uTime.value = t;

    // Breathing belongs to act 1; drift widens as the field opens out.
    u.uBreath.value = Math.max(0, 1 - progress * 4);
    u.uDrift.value = 0.04 + progress * 0.09;

    // Shallow camera drift, never a spin. The camera rises as the field
    // spreads: level with it, act 4 is a flat plane seen edge-on and projects
    // to a featureless band. Looking down across it is what makes the separate
    // communities legible. The end position matches scripts/build-poster.mjs,
    // so the Tier C poster is the same view.
    const cam = state.camera;
    cam.position.x = Math.sin(t * 0.06) * 0.9;
    cam.position.y = 0.5 + Math.sin(t * 0.045) * 0.3 + progress * 3.1;
    cam.position.z = 13.4 - progress * 1.2;
    cam.lookAt(0, -0.15, 0);

    if (pointsRef.current) pointsRef.current.rotation.y = progress * 0.25;
  });

  return (
    // frustumCulled off: the position attribute is a placeholder of zeros —
    // real positions come from the act textures in the vertex shader — so the
    // computed bounding sphere describes nothing and would cull the field.
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        {/* Unused, but three needs an attribute of the right length to size
            the draw call. */}
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(attrs.count * 3), 3]}
        />
        <bufferAttribute attach="attributes-aRef" args={[attrs.uvs, 2]} />
        <bufferAttribute attach="attributes-aSeed" args={[attrs.seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={pointsVertexShader}
        fragmentShader={pointsFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={NormalBlending}
      />
    </points>
  );
}

/**
 * Adaptive DPR, hand-rolled.
 *
 * Replaces drei's PerformanceMonitor + AdaptiveDpr. Samples frame times over a
 * one-second window and steps the device pixel ratio down when the scene
 * cannot hold ~50fps, back up when it comfortably can.
 *
 * Deliberately hysteretic: two consecutive bad windows before demoting, four
 * good ones before promoting. A single janky window during a scroll burst is
 * normal and must not make the resolution oscillate.
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

export default function Scene({
  tier,
  active,
  progress,
}: {
  tier: TierResult;
  active: boolean;
  progress: ScrollProgressRef;
}) {
  const [dpr, setDpr] = useState(Math.min(tier.maxDpr, 1.5));

  return (
    <Canvas
      // Capping DPR is the single largest free win on mid-range Android, which
      // reports 2.5–4 and gains nothing visible above 2.
      dpr={dpr}
      // The field breathes and drifts continuously, so it needs a frame every
      // tick while on screen — "demand" without an invalidate on every
      // animated value renders one frame and then freezes, which is a blank
      // hero. The battery win belongs at a coarser grain: the loop stops
      // entirely once the hero scrolls out of view.
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.5, 13.4], fov: 42, near: 0.1, far: 60 }}
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
      <ParticleField tier={tier} progress={progress} />
    </Canvas>
  );
}
