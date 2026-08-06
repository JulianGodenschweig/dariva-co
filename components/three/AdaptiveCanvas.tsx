"use client";

import dynamic from "next/dynamic";
import { type ReactNode, Suspense, useEffect, useRef, useState } from "react";
import { useRenderTier, type RenderTier } from "@/lib/capability";

/**
 * three.js and the R3F runtime are ~150KB gzipped. Loading them behind
 * next/dynamic means a device on the "static" tier never downloads a byte of
 * WebGL — the cost is paid only by devices that will actually use it.
 */
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false },
);

interface AdaptiveCanvasProps {
  /** The 3D scene. Receives the resolved tier so it can shed detail on "lite". */
  children: (tier: Exclude<RenderTier, "static">) => ReactNode;
  /**
   * Rendered instead of the canvas on the "static" tier, and as the SSR/first
   * paint output on every tier. This is not a spinner — it is the real,
   * complete, styled content for anyone who never gets WebGL.
   */
  fallback: ReactNode;
  className?: string;
  /** Accessible description of what the scene conveys, for screen readers. */
  label?: string;
  /** Camera distance from origin. Scenes are authored around the origin. */
  cameraZ?: number;
  fov?: number;
}

export function AdaptiveCanvas({
  children,
  fallback,
  className,
  label,
  cameraZ = 9,
  fov = 50,
}: AdaptiveCanvasProps) {
  const tier = useRenderTier();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasBeenNear, setHasBeenNear] = useState(false);

  // Don't spin up a WebGL context for a scene the visitor may never scroll to.
  useEffect(() => {
    const node = containerRef.current;
    if (!node || hasBeenNear) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasBeenNear]);

  const showCanvas = tier !== "static" && hasBeenNear;

  return (
    <div ref={containerRef} className={className}>
      {showCanvas ? (
        <Canvas
          camera={{ position: [0, 0, cameraZ], fov }}
          // Cap the pixel ratio: a 3x phone screen renders 9x the pixels of a
          // 1x one for no perceptible gain on a scene this size.
          dpr={tier === "lite" ? 1 : [1, 2]}
          gl={{
            antialias: tier === "full",
            powerPreference: "high-performance",
            // Let the browser drop the context under memory pressure rather
            // than killing the tab.
            failIfMajorPerformanceCaveat: false,
          }}
          // "lite" devices only redraw when something asks them to (scroll,
          // interaction); "full" devices get a continuous loop for ambient
          // motion. Either way nothing renders while the canvas is unmounted.
          frameloop={tier === "lite" ? "demand" : "always"}
          aria-label={label}
        >
          <Suspense fallback={null}>{children(tier)}</Suspense>
        </Canvas>
      ) : (
        fallback
      )}
    </div>
  );
}
