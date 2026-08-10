"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";

/**
 * Section-entry reveal.
 *
 * Deliberately IntersectionObserver rather than GSAP: this runs on every page,
 * and a reveal is not worth 37 KB of scroll library on a route that has no
 * scene. GSAP + ScrollTrigger + Lenis are loaded only where the hero needs
 * them, as a separate async chunk (see SmoothScroll.tsx).
 *
 * Motion is transform + opacity only. Under `prefers-reduced-motion: reduce`
 * globals.css forces [data-reveal] to its final state, so the element is
 * visible and correctly positioned from first paint — the observer still runs
 * and still sets data-revealed, it simply has nothing left to animate.
 *
 * Mobile gets shorter travel than desktop; parallax is never applied to text.
 */
export function Reveal({
  children,
  as: As = "div" as ElementType,
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the element is already in view on mount (above the fold), reveal it
    // immediately rather than animating it in behind the user's back.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <As
      ref={ref}
      data-reveal=""
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      className={[
        "opacity-0 translate-y-4 sm:translate-y-6",
        "transition-[opacity,transform] duration-700 ease-[var(--ease-out-quiet)]",
        "data-[revealed]:opacity-100 data-[revealed]:translate-y-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </As>
  );
}

/** Staggers its children. Used for lists, never for more than ~10 items. */
export function RevealGroup({
  children,
  className,
  step = 60,
}: {
  children: ReactNode[];
  className?: string;
  step?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={Math.min(i * step, 400)}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
