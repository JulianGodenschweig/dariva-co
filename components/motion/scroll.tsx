"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { asset } from "@/lib/asset";

/* -------------------------------------------------------------------------
 * useCalmMotion
 *
 * `useReducedMotion` reads a media query, so it is null during SSR and on the
 * very first client render, then flips. Components that swap their markup on
 * it would therefore hydrate against different HTML than the server sent.
 * Gating on `mounted` keeps the first client render identical to the server's,
 * and moves the swap into an ordinary post-hydration update.
 * ---------------------------------------------------------------------- */

function useCalmMotion() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && Boolean(prefersReduced);
}

/* -------------------------------------------------------------------------
 * Reveal — the workhorse. IntersectionObserver adds `.visible`, CSS does the
 * rest, so nothing animates on the main thread until it is actually on screen.
 * ---------------------------------------------------------------------- */

export function Reveal({
  children,
  className = "",
  delay = 0,
  clip = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  clip?: boolean;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delayClass = delay ? ` reveal-delay-${delay}` : "";
  const state = seen ? " visible" : "";

  // The clip variant must not put its clip-path on the observed element:
  // IntersectionObserver factors an element's own clip into its visible area,
  // so a self-clipped target reports ratio 0 forever and could never reveal
  // itself. Observing the outer node and clipping an inner one breaks the
  // deadlock. The plain variant animates opacity/transform, which the observer
  // ignores, so it can stay on a single element.
  if (clip) {
    return (
      <Tag
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={className}
      >
        <div className={`clip-reveal${delayClass}${state}`}>{children}</div>
      </Tag>
    );
  }

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal${delayClass}${state} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------------------
 * ZoomHero — the signature move.
 *
 * A tall scroll track pins a full-viewport stage. As you scroll, the
 * photograph recedes from a hard zoom-in (scale 1.85) back to rest, while an
 * animated inset turns the full-bleed frame into a floating panel. The result
 * reads as pulling backwards through the scene rather than a slide transition.
 * ---------------------------------------------------------------------- */

export function ZoomHero({
  image,
  alt,
  children,
  outro,
  heightVh = 320,
}: {
  image: string;
  alt: string;
  children: ReactNode;
  outro?: ReactNode;
  heightVh?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useCalmMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.0008,
  });

  // Photograph pulls back from a tight crop to its natural framing.
  const scale = useTransform(p, [0, 1], [1.85, 1.02]);
  // Frame closes in, converting full-bleed into a panel with depth around it.
  const insetY = useTransform(p, [0, 1], [0, 9]);
  const insetX = useTransform(p, [0, 1], [0, 6]);
  const radius = useTransform(p, [0, 1], [0, 26]);
  const clipPath = useMotionTemplate`inset(${insetY}vh ${insetX}vw round ${radius}px)`;

  // Headline recedes into the distance as the image pulls back.
  const titleOpacity = useTransform(p, [0, 0.34, 0.46], [1, 1, 0]);
  const titleScale = useTransform(p, [0, 0.5], [1, 0.9]);
  const titleY = useTransform(p, [0, 0.5], [0, -50]);

  // The second beat arrives once the first has cleared.
  const outroOpacity = useTransform(p, [0.5, 0.72], [0, 1]);
  const outroY = useTransform(p, [0.5, 0.85], [40, 0]);

  const scrimOpacity = useTransform(p, [0, 0.6], [0.55, 0.82]);

  // Calm variant: no pinning, no scroll-linked transforms. Both beats are laid
  // out in normal flow so nothing that the animated version reveals on scroll
  // is lost to someone who asked for less movement.
  if (reduce) {
    return (
      <section
        className="relative isolate grain min-h-screen overflow-hidden"
        aria-label="Introduction"
      >
        <img
          src={asset(image)}
          alt={alt}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 scrim-full" />
        <div className="flex min-h-screen flex-col justify-end px-6 pb-24 pt-40 md:px-14 lg:px-20">
          {children}
          {outro ? <div className="mt-10">{outro}</div> : null}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      style={{ height: `${heightVh}vh` }}
      className="relative"
      aria-label="Introduction"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Depth plate behind the panel — what you "pull back" into */}
        <div className="absolute inset-0 bg-ink" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(42,168,246,0.16), transparent 62%)",
          }}
        />

        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 grain overflow-hidden"
        >
          <motion.img
            src={asset(image)}
            alt={alt}
            style={{ scale }}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            fetchPriority="high"
          />
          <motion.div
            style={{ opacity: scrimOpacity }}
            className="absolute inset-0 scrim-full"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end px-6 pb-[14vh] md:px-14 lg:px-20">
          <motion.div
            style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
            className="pointer-events-auto origin-bottom-left"
          >
            {children}
          </motion.div>

          {outro ? (
            <motion.div
              style={{ opacity: outroOpacity, y: outroY }}
              className="pointer-events-auto absolute inset-x-6 bottom-[14vh] md:inset-x-14 lg:inset-x-20"
            >
              {outro}
            </motion.div>
          ) : null}
        </div>

        <ScrollHint progress={p} />
      </div>
    </section>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.12], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-center"
      aria-hidden="true"
    >
      <span className="eyebrow block text-mist/60">Scroll</span>
      <span className="mx-auto mt-2 block h-10 w-px bg-gradient-to-b from-mist/70 to-transparent" />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
 * DepthImage — carries the zoom-out language through the rest of the page.
 * Each image eases back from a slight over-scale as it crosses the viewport.
 * ---------------------------------------------------------------------- */

export function DepthImage({
  src,
  alt,
  className = "",
  from = 1.28,
  to = 1,
  rounded = "rounded-2xl",
  overlay = true,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  from?: number;
  to?: number;
  rounded?: string;
  overlay?: boolean;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useCalmMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);
  const smooth = useSpring(scale, { stiffness: 90, damping: 26 });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden grain ${rounded} ${className}`}
    >
      {reduce ? (
        <img src={asset(src)} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <motion.img
          src={asset(src)}
          alt={alt}
          style={{ scale: smooth }}
          loading="lazy"
          className="h-full w-full object-cover will-change-transform"
        />
      )}
      {overlay ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      ) : null}
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * ParallaxBand — a pinned full-bleed photograph that drifts against the
 * scroll. Used to break long text stretches without asking for a click.
 * ---------------------------------------------------------------------- */

export function ParallaxBand({
  src,
  alt,
  children,
  className = "",
  strength = 18,
}: {
  src: string;
  alt: string;
  children?: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useCalmMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.16, 1.06, 1.16]);

  return (
    <section
      ref={ref}
      className={`relative isolate overflow-hidden grain ${className}`}
    >
      <div className="absolute inset-0 -z-10">
        {reduce ? (
          <img src={asset(src)} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <motion.img
            src={asset(src)}
            alt={alt}
            style={{ y, scale }}
            loading="lazy"
            className="h-[130%] w-full object-cover will-change-transform"
          />
        )}
      </div>
      <div className="absolute inset-0 -z-10 scrim-full" />
      {children}
    </section>
  );
}

/* -------------------------------------------------------------------------
 * Counter — counts up once, when it first becomes visible.
 * ---------------------------------------------------------------------- */

export function Counter({
  to,
  suffix = "",
  duration = 1600,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const reduce = useCalmMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // easeOutExpo — fast then settles, matches the scroll easing
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setValue(Math.round(eased * to));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, reduce]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------------------
 * ScrollProgress — a hairline reading indicator pinned under the header.
 * ---------------------------------------------------------------------- */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-azure via-azure-light to-royal"
      aria-hidden="true"
    />
  );
}

/* -------------------------------------------------------------------------
 * useScrolled — small helper for the header's solid/transparent state.
 * ---------------------------------------------------------------------- */

export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > threshold));
  return scrolled;
}
