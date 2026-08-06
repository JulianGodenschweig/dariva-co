"use client";

import { useEffect, useState } from "react";

/**
 * Dariva.co serves community coaches across Namibia, largely on mid-range
 * Android over mobile data. An immersive WebGL scene that is beautiful on a
 * laptop can be unusable on the devices this site actually exists for, so
 * every 3D surface is gated on what the visitor's device can genuinely afford.
 *
 * Tiers:
 *   "full"   — render the scene as designed
 *   "lite"   — render a reduced scene: fewer objects, no post-processing
 *   "static" — render no WebGL at all, use the styled 2D fallback
 */
export type RenderTier = "full" | "lite" | "static";

/** Extra navigator fields that are widely shipped but absent from lib.dom. */
interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  };
}

function supportsWebGL2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2"));
  } catch {
    // Some privacy modes throw rather than returning null.
    return false;
  }
}

function detectTier(): RenderTier {
  if (typeof window === "undefined") return "static";

  // An explicit accessibility preference outranks every capability signal.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "static";
  }

  if (!supportsWebGL2()) return "static";

  const nav = navigator as NavigatorWithHints;

  // Data Saver is the visitor telling us bandwidth costs them money.
  if (nav.connection?.saveData) return "static";

  const effectiveType = nav.connection?.effectiveType;
  if (effectiveType === "slow-2g" || effectiveType === "2g") return "static";

  // deviceMemory is reported in GiB, rounded down, capped at 8.
  const memory = nav.deviceMemory;
  if (typeof memory === "number" && memory <= 1) return "static";

  // Thresholds are calibrated to what the scene actually costs: a few hundred
  // additively-blended points and some line segments. That is cheap. Only
  // genuinely constrained hardware — dual-core, 2GB, or a 3G connection — needs
  // the reduced version; an ordinary 4-core laptop does not.
  const cores = nav.hardwareConcurrency;
  const lowCores = typeof cores === "number" && cores <= 2;
  const lowMemory = typeof memory === "number" && memory <= 2;

  if (lowCores || lowMemory || effectiveType === "3g") return "lite";

  return "full";
}

/**
 * Resolves the render tier on the client.
 *
 * Returns "static" during SSR and on the first paint, so the static export
 * always ships the no-WebGL fallback in its HTML and upgrades afterwards.
 * That keeps first paint fast and means a device that never runs our JS still
 * sees a complete, styled page.
 */
export function useRenderTier(): RenderTier {
  const [tier, setTier] = useState<RenderTier>("static");

  useEffect(() => {
    setTier(detectTier());

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreferenceChange = () => setTier(detectTier());

    motionQuery.addEventListener("change", onPreferenceChange);
    return () => motionQuery.removeEventListener("change", onPreferenceChange);
  }, []);

  return tier;
}
