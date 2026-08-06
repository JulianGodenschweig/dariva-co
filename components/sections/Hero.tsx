"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AdaptiveCanvas } from "@/components/three/AdaptiveCanvas";
import { CommunityField } from "@/components/three/CommunityField";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-ink">
      {/* The 3D field sits behind the words and never competes with them. */}
      <AdaptiveCanvas
        className="absolute inset-0"
        cameraZ={9}
        label="An animated network of connected points, where light spreads outward from a single point to the whole community."
        fallback={<div className="aurora opacity-70" aria-hidden="true" />}
      >
        {(tier) => (
          <>
            <ambientLight intensity={0.6} />
            <CommunityField tier={tier} />
          </>
        )}
      </AdaptiveCanvas>

      {/* Protects the headline without smothering the scene: opaque behind the
          text on the left, clearing toward the right where the network shows.
          The vertical pass just settles the top and bottom edges. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-ink via-navy-ink/80 to-navy-ink/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-ink/70 via-transparent to-navy-ink"
        aria-hidden="true"
      />

      <div className="container-page relative z-10 py-32">
        <div className="max-w-4xl">
          <p className="eyebrow reveal text-cyan-bright">
            {hero.rhythm.join("  •  ")}
          </p>

          <h1 className="t-display reveal mt-6 text-white">
            Mental Wellness Starts With{" "}
            <span className="text-gradient">One Person</span>
          </h1>

          <p className="reveal mt-7 max-w-2xl font-heading text-xl font-semibold leading-snug text-white/85 sm:text-2xl">
            {hero.subtitle}
          </p>

          <p className="t-lead reveal mt-6 max-w-2xl text-white/60">
            {hero.body}
          </p>

          <div className="reveal mt-11 flex flex-wrap items-center gap-4">
            <Link
              href={hero.ctaHref}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-emerald px-7 py-4 text-base font-semibold text-white shadow-xl shadow-cyan/25 transition-transform hover:scale-[1.03]"
            >
              {hero.ctaLabel}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/programmes"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-base font-semibold text-white/90 transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Explore Programmes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
