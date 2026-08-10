"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { detectTier, type Tier, type TierResult } from "@/lib/tier";
import { scrollProgress } from "./scrollProgress";
import { home } from "@/lib/content/pages";
import { ButtonLink } from "@/components/ui/Button";

/**
 * The hero — BRIEF.md §8.
 *
 * `{ ssr: false }` must be called from a Client Component in current Next.js,
 * which is why this file carries 'use client' rather than the page.
 *
 * Tier C downloads zero Three.js bytes: the dynamic import never runs, so the
 * chunk is never requested. The poster is the LCP element on that path and is
 * marked `priority` accordingly.
 */
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export function Hero() {
  const [tier, setTier] = useState<TierResult | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  // Detect once on mount.
  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).get("tier") as Tier | null;
    let cancelled = false;
    detectTier(forced).then((result) => {
      if (!cancelled) setTier(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // The one loop. GSAP's ticker drives Lenis; Lenis updates ScrollTrigger;
  // ScrollTrigger writes scrollProgress; R3F reads it in useFrame and keeps
  // its own render. Loaded as an async chunk so no route pays for it upfront.
  useEffect(() => {
    if (!tier || tier.tier === "c") {
      // Still track progress for the scale readout — it just does not drive
      // a canvas. A plain listener is enough and costs nothing.
      const onScroll = () => {
        const el = sectionRef.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total)) : 0;
        scrollProgress.current = p;
        setStage(Math.min(4, Math.floor(p * 4.999)));
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ lerp: 0.11 });
      lenis.on("scroll", ScrollTrigger.update);

      // GSAP reports seconds; Lenis wants milliseconds.
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
          setStage(Math.min(4, Math.floor(self.progress * 4.999)));
        },
      });

      cleanup = () => {
        trigger.kill();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [tier]);

  const showCanvas = tier !== null && tier.tier !== "c";

  return (
    <div ref={sectionRef} className="relative h-[400vh]" data-tier={tier?.tier ?? "pending"}>
      {/* sticky, not fixed — scroll is never trapped and the section ends. */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          {showCanvas ? (
            <Scene tier={tier} />
          ) : (
            <Image
              src="/hero-poster.avif"
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
            />
          )}
        </div>

        {/* Copy is real DOM text over the canvas — never rendered in WebGL. */}
        <div className="relative flex h-full flex-col justify-center px-(--spacing-gutter)">
          <div className="mx-auto w-full max-w-[78rem]">
            <h1 className="text-display-xl max-w-[16ch] text-ink">
              {home.hero.headline}
            </h1>
            <p className="mt-8 max-w-[44ch] text-lede">{home.hero.subhead}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href={home.hero.primaryCta.href} variant="primary">
                {home.hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={home.hero.secondaryCta.href} variant="ghost">
                {home.hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>

        <ScaleReadout stage={stage} />
      </div>
    </div>
  );
}

/**
 * The scale readout — DESIGN.md §3.
 *
 * This replaced the reference's `[ 003 /012 ]` counter, which indexed nothing.
 * This marks a real position in a real progression: the act of the propagation
 * currently on screen. Under reduced motion it shows every stage at once, so
 * it doubles as the static reader's map of what the poster represents.
 */
function ScaleReadout({ stage }: { stage: number }) {
  return (
    <div
      className="text-micro pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
      aria-hidden="true"
    >
      {home.propagation.map((step, i) => (
        <span
          key={step.key}
          className={`transition-colors duration-500 ${
            i === stage ? "text-signal" : "text-quiet/40"
          }`}
        >
          {step.label}
        </span>
      ))}
    </div>
  );
}
