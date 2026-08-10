/**
 * Device tiering — BRIEF.md §9. This is the gate before any WebGL ships.
 *
 * Tier A  desktop, WebGL2, GPU tier >= 3   65k particles, 256² FBO
 * Tier B  capable mobile, GPU tier 2       24k particles, 128² FBO, DPR <= 1.5
 * Tier C  everything else                  zero Three.js bytes, static poster
 *
 * Order matters. The cheap synchronous checks run first and can return "c"
 * without ever touching detect-gpu, so a phone on 3G with saveData enabled
 * downloads neither the benchmark JSON (up to 36 KB for Adreno) nor any part
 * of the WebGL chunk. Running detect-gpu first would spend those bytes on
 * precisely the devices that cannot afford them.
 */

export type Tier = "a" | "b" | "c";

export type TierResult = {
  tier: Tier;
  /** Why we landed here. Surfaced in the Playwright report, not to users. */
  reason: string;
  particles: number;
  fboSize: number;
  maxDpr: number;
  lines: boolean;
};

const TIER_C: Omit<TierResult, "reason"> = {
  tier: "c",
  particles: 0,
  fboSize: 0,
  maxDpr: 1,
  lines: false,
};

const TIER_B: Omit<TierResult, "reason"> = {
  tier: "b",
  particles: 24_000,
  fboSize: 128,
  maxDpr: 1.5,
  lines: false,
};

const TIER_A: Omit<TierResult, "reason"> = {
  tier: "a",
  particles: 65_536, // 256² exactly — one particle per FBO texel
  fboSize: 256,
  maxDpr: 2,
  lines: true,
};

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

/**
 * Detect once on mount. Never call this during render.
 *
 * `forceTier` exists for the Playwright pass so every tier can be screenshotted
 * on the same machine; it is read from ?tier= and is otherwise inert.
 */
export async function detectTier(forceTier?: Tier | null): Promise<TierResult> {
  if (forceTier === "a") return { ...TIER_A, reason: "forced via ?tier=a" };
  if (forceTier === "b") return { ...TIER_B, reason: "forced via ?tier=b" };
  if (forceTier === "c") return { ...TIER_C, reason: "forced via ?tier=c" };

  if (typeof window === "undefined") {
    return { ...TIER_C, reason: "server render" };
  }

  // --- Cheap checks first. Any failure here costs zero network bytes. ---

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { ...TIER_C, reason: "prefers-reduced-motion: reduce" };
  }

  const nav = navigator as NavigatorWithHints;

  if (nav.connection?.saveData) {
    return { ...TIER_C, reason: "navigator.connection.saveData" };
  }

  const effectiveType = nav.connection?.effectiveType;
  if (effectiveType && /^(slow-2g|2g|3g)$/.test(effectiveType)) {
    return { ...TIER_C, reason: `effectiveType: ${effectiveType}` };
  }

  // deviceMemory is Chromium-only. Absent means unknown, not zero — Safari and
  // Firefox never report it, and refusing them WebGL on that basis would be
  // wrong. Only an explicit value below 4 disqualifies.
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) {
    return { ...TIER_C, reason: `deviceMemory: ${nav.deviceMemory}` };
  }

  if (!hasWebGL2()) {
    return { ...TIER_C, reason: "no WebGL2 context" };
  }

  // --- Only now is it worth fetching a benchmark file. ---

  try {
    const { getGPUTier } = await import("@pmndrs/detect-gpu");
    const gpu = await getGPUTier({
      // Self-hosted: detect-gpu's own benchmark data stopped updating in
      // December 2025, so the upstream CDN is both stale and a third-party
      // request we do not need. Files live in public/gpu, cached a week.
      benchmarksURL: "/gpu",
      failIfMajorPerformanceCaveat: true,
    });

    // A 2026 handset absent from a dataset frozen in 2025 comes back as
    // tier 0 / "FALLBACK". Treat unknown as unknown, not as slow: give it
    // Tier B, where the particle count and DPR cap are conservative anyway,
    // and let PerformanceMonitor demote it if it actually struggles.
    if (gpu.type === "FALLBACK" || gpu.type === "BLOCKLISTED") {
      return {
        ...TIER_B,
        reason: `detect-gpu ${gpu.type} (unrecognised device, assumed recent)`,
      };
    }

    if (gpu.tier >= 3 && !gpu.isMobile) {
      return { ...TIER_A, reason: `GPU tier ${gpu.tier}, desktop` };
    }
    if (gpu.tier >= 2) {
      return {
        ...TIER_B,
        reason: `GPU tier ${gpu.tier}${gpu.isMobile ? ", mobile" : ""}`,
      };
    }
    return { ...TIER_C, reason: `GPU tier ${gpu.tier}` };
  } catch (error) {
    // A failed benchmark fetch must never cost the user a broken hero.
    return {
      ...TIER_C,
      reason: `detect-gpu failed: ${error instanceof Error ? error.message : "unknown"}`,
    };
  }
}
