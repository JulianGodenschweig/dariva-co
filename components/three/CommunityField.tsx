"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { RenderTier } from "@/lib/capability";

/**
 * The hero scene, and an argument rather than decoration.
 *
 * The brief opens with "Mental Wellness Starts With One Person." So: a field
 * of nodes representing a community, one of which is lit. A pulse travels out
 * from it along the connections, brightening each node it reaches — wellbeing
 * propagating through a network, which is the organisation's whole thesis.
 */

interface CommunityFieldProps {
  tier: Exclude<RenderTier, "static">;
}

/**
 * A soft round dot to use as the point sprite.
 *
 * Without this, pointsMaterial draws each node as a hard square — at these
 * sizes the field reads as dust or dead pixels rather than as people.
 */
function makeDotTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );

  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.85)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.2)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Fibonacci sphere — even distribution without the clumping of random(). */
function distributeOnSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const ringRadius = Math.sqrt(1 - y * y);
    const theta = golden * i;

    // Nudge each node off the perfect shell so it reads as organic.
    const jitter = 0.82 + Math.sin(i * 12.9898) * 0.18;
    const r = radius * jitter;

    positions[i * 3] = Math.cos(theta) * ringRadius * r;
    positions[i * 3 + 1] = y * r;
    positions[i * 3 + 2] = Math.sin(theta) * ringRadius * r;
  }

  return positions;
}

export function CommunityField({ tier }: CommunityFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const { invalidate } = useThree();

  const isLite = tier === "lite";
  const nodeCount = isLite ? 90 : 260;
  const radius = 3.2;

  const dotTexture = useMemo(() => makeDotTexture(), []);

  // Textures hold GPU memory; release it when the hero unmounts.
  useEffect(() => () => dotTexture.dispose(), [dotTexture]);

  const { positions, colors, connections, seedIndex } = useMemo(() => {
    const positions = distributeOnSphere(nodeCount, radius);
    const colors = new Float32Array(nodeCount * 3);

    // The "one person" — the node the pulse starts from.
    const seedIndex = 0;

    for (let i = 0; i < nodeCount; i++) {
      colors[i * 3] = 0.3;
      colors[i * 3 + 1] = 0.85;
      colors[i * 3 + 2] = 1;
    }

    // Connect near neighbours only. On "lite" we skip the line mesh entirely,
    // so don't spend the O(n²) pass building it.
    const linePositions: number[] = [];

    if (!isLite) {
      const threshold = radius * 0.5;
      const a = new THREE.Vector3();
      const b = new THREE.Vector3();

      for (let i = 0; i < nodeCount; i++) {
        a.fromArray(positions, i * 3);
        let linked = 0;

        for (let j = i + 1; j < nodeCount && linked < 4; j++) {
          b.fromArray(positions, j * 3);
          if (a.distanceTo(b) < threshold) {
            linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
            linked++;
          }
        }
      }
    }

    return {
      positions,
      colors,
      connections: new Float32Array(linePositions),
      seedIndex,
    };
  }, [nodeCount, isLite, radius]);

  /** Distance of every node from the seed, so the pulse can arrive in order. */
  const distancesFromSeed = useMemo(() => {
    const seed = new THREE.Vector3().fromArray(positions, seedIndex * 3);
    const point = new THREE.Vector3();
    const distances = new Float32Array(nodeCount);
    let max = 0;

    for (let i = 0; i < nodeCount; i++) {
      point.fromArray(positions, i * 3);
      const d = seed.distanceTo(point);
      distances[i] = d;
      if (d > max) max = d;
    }

    // Normalise to 0..1 so pulse timing is independent of scene scale.
    for (let i = 0; i < nodeCount; i++) distances[i] /= max || 1;

    return distances;
  }, [positions, nodeCount, seedIndex]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const nodes = nodesRef.current;
    if (!group || !nodes) return;

    const t = state.clock.elapsedTime;

    group.rotation.y += delta * 0.06;
    group.rotation.x = Math.sin(t * 0.18) * 0.09;

    // Pointer parallax — subtle; this is a background, not a toy.
    group.position.x += (state.pointer.x * 0.32 - group.position.x) * 0.04;
    group.position.y += (state.pointer.y * 0.22 - group.position.y) * 0.04;

    // A pulse front expanding from the seed, looping every 6 seconds.
    const front = (t % 6) / 6;
    const colorAttr = nodes.geometry.getAttribute("color") as THREE.BufferAttribute;

    for (let i = 0; i < nodeCount; i++) {
      const distance = distancesFromSeed[i];
      // How close the wavefront currently is to this node.
      const proximity = Math.max(0, 1 - Math.abs(front - distance) * 7);
      const glow = proximity * proximity;

      // Base cyan lifting toward emerald-white as the pulse arrives.
      colorAttr.setXYZ(
        i,
        0.3 + glow * 0.6,
        0.85 + glow * 0.15,
        1 - glow * 0.4,
      );
    }

    colorAttr.needsUpdate = true;

    // On the "demand" frameloop used by lite devices, ask for the next frame.
    if (isLite) invalidate();
  });

  return (
    <group ref={groupRef}>
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={isLite ? 0.3 : 0.26}
          map={dotTexture}
          alphaMap={dotTexture}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {!isLite && connections.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[connections, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color="#4fc3f7"
            transparent
            opacity={0.5}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}
    </group>
  );
}
