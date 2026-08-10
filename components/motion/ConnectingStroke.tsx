"use client";

import { useEffect, useRef } from "react";

/**
 * The connecting stroke — DESIGN.md §4.
 *
 * Dariva's logo is a script: one continuous handwritten line. That is also the
 * brand's thesis, so the site's structural device is a single --signal stroke
 * threading down the page, drawn as you scroll. It *joins* sections rather
 * than dividing them, which is the opposite of what a hairline rule does.
 *
 * ~2 KB, resolution-independent, inherits the palette token. Under reduced
 * motion globals.css pins stroke-dashoffset to 0, so it renders complete and
 * static — the structure is still legible, nothing is lost.
 *
 * Decorative: aria-hidden, and it carries no information that is not also in
 * the DOM order of the sections it passes.
 */
export function ConnectingStroke() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // A page shorter than the viewport has nothing to scrub; draw it fully.
      const progress = scrollable > 0 ? window.scrollY / scrollable : 1;
      path.style.strokeDashoffset = String(1 - Math.min(1, Math.max(0, progress)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none fixed inset-y-0 left-3 z-10 hidden h-full w-8 md:block lg:left-6"
      viewBox="0 0 32 1000"
      preserveAspectRatio="none"
      fill="none"
    >
      {/* The full path at very low opacity: the reader can see where the line
          is going, which is the point of a connector. */}
      <path
        d={PATH}
        stroke="var(--color-ink)"
        strokeOpacity="0.08"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        ref={pathRef}
        data-stroke=""
        d={PATH}
        stroke="var(--color-signal)"
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** A gentle script-like drift. Never straight — a rule is straight, a hand is not. */
const PATH =
  "M16 0 C 6 120, 26 200, 16 300 S 4 460, 16 560 S 28 720, 16 830 S 8 940, 16 1000";
