"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useMemo } from "react";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

function FloatingShape({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full opacity-20 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ delay, duration: 2 }}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

/* ── gentle flowing river lines (CSS animation, no JS re-renders) ── */
function RiverLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Wave layer 1: slow outer */}
      <svg className="absolute bottom-0 left-0 w-[200%] h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
        <g className="animate-river-slow origin-left">
          <path d="M0,600 C360,500 540,700 720,600 C900,500 1080,700 1440,600 L1440,800 L0,800 Z" fill="#1B9AD6" opacity="0.08" />
        </g>
      </svg>

      {/* Wave layer 2: medium mid */}
      <svg className="absolute bottom-0 left-0 w-[200%] h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
        <g className="animate-river-medium origin-left" style={{ animationDelay: "-5s" }}>
          <path d="M0,650 C240,550 480,750 720,650 C960,550 1200,750 1440,650 L1440,800 L0,800 Z" fill="#1A237E" opacity="0.06" />
        </g>
      </svg>

      {/* Wave layer 3: fast inner */}
      <svg className="absolute bottom-0 left-0 w-[200%] h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
        <g className="animate-river-fast origin-left" style={{ animationDelay: "-2s" }}>
          <path d="M0,700 C180,650 360,750 540,700 C720,650 900,750 1080,700 C1260,650 1380,720 1440,700 L1440,800 L0,800 Z" fill="#1B9AD6" opacity="0.1" />
        </g>
      </svg>

      {/* Shimmer lines sliding right-to-left */}
      <svg className="absolute bottom-[12%] left-0 w-full h-32" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <g className="animate-shimmer origin-left">
          <path d="M0,60 C240,40 480,80 720,60 C960,40 1200,80 1440,60" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.12" />
        </g>
        <g className="animate-shimmer origin-left" style={{ animationDelay: "-3s" }}>
          <path d="M0,80 C360,60 720,100 1080,80 C1260,70 1380,90 1440,80" stroke="#ffffff" strokeWidth="0.5" fill="none" opacity="0.08" />
        </g>
      </svg>
    </div>
  );
}

/* ── floating bubbles / droplets (memoized) ── */
function Bubbles() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 7.5) % 84)}%`,
        size: 4 + (i % 4) * 3,
        delay: i * 0.7,
        duration: 12 + (i % 5) * 2,
      })),
    []
  );

  const upAmount = 1000;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full bg-[#1B9AD6]/25"
          style={{ left: b.left, width: b.size, height: b.size, bottom: -20 }}
          animate={{
            y: [0, -upAmount],
            opacity: [0, 0.35, 0],
            scale: [0.5, 1.1, 0.3],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="river-bg relative min-h-svh flex items-center overflow-hidden pt-20 bg-gradient-to-b from-[#EFF8FD] via-[#e6f3fc] to-[#dceef8]">
      {/* Gradient mesh overlay */}
      <div className="absolute inset-0 gradient-mesh animate-gradient-shift" />

      {/* River wave layers */}
      <RiverLines />

      {/* Floating bubbles */}
      <Bubbles />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(27,154,214,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.05),transparent_50%)]" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingShape className="w-64 h-64 bg-primary-lighter rounded-full blur-3xl top-[10%] -left-[10%] animate-float-slow" delay={0} />
        <FloatingShape className="w-48 h-48 bg-secondary/30 rounded-full blur-3xl bottom-[20%] -right-[5%] animate-float" delay={1} />
        <FloatingShape className="w-32 h-32 bg-primary-light/20 rounded-full blur-2xl top-[40%] right-[15%] animate-float-slow" delay={2} />
        <FloatingShape className="w-40 h-40 bg-primary-lighter/15 rounded-full blur-3xl bottom-[30%] left-[10%] animate-float" delay={0.5} />

        <motion.div className="absolute top-[15%] right-[20%] w-24 h-24 border border-primary-lighter/20 rounded-full" animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-[25%] left-[15%] w-16 h-16 border border-secondary/20 rotate-45" animate={{ y: [0, 12, 0], rotate: [45, 55, 45] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-[35%] left-[25%] w-8 h-8 bg-primary-lighter/10 rounded-full blur-sm" animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      <motion.div className="container-page relative z-10 w-full" variants={containerVariants} initial="hidden" animate="show">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={childVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#10B981]/10 px-4 py-2 text-sm font-semibold text-[#10B981] border border-[#10B981]/10">
              <Sparkles size={14} />
              Community Mental Wellness
            </span>
          </motion.div>

          <motion.h1 variants={childVariants} className="text-balance font-heading font-bold tracking-tight" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1.1 }}>
            <span className="hero-shimmer">Building emotionally resilient, self-sustaining communities.</span>
          </motion.h1>

          <motion.p variants={childVariants} className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed text-text-muted">
            Dariva.co trains community coaches, opens digital access to mental wellness, and rewards care work so that prevention becomes practical.
          </motion.p>

          <motion.div variants={childVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apply" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#10B981] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#059669] hover:shadow-xl hover:shadow-[#10B981]/25 active:scale-[0.98] min-h-[48px] w-full sm:w-auto">
              Apply Now <ArrowRight size={18} />
            </Link>
            <Link href="/program" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#1A237E]/20 bg-white/70 backdrop-blur-sm px-8 py-4 text-base font-semibold text-[#1A237E] transition-all duration-300 hover:bg-white hover:border-primary/40 hover:shadow-lg min-h-[48px] w-full sm:w-auto">
              Our Program
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom wave transition */}
      <div className="river-wave" aria-hidden="true" />
      <div className="river-wrap" aria-hidden="true" style={{ zIndex: 0 }}>
        <svg className="river-svg" viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,45 C180,90 360,0 540,45 C720,90 900,0 1080,45 C1260,90 1440,0 1440,45 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.15)" />
          <path d="M0,60 C240,25 480,75 720,55 C960,35 1200,75 1440,55 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.08)" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F6F3] to-transparent pointer-events-none" style={{ zIndex: 10 }} />
    </section>
  );
}
