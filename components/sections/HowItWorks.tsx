"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Globe, Award } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: BookOpen,
    title: "Learn",
    text: "Community members train in mental wellness foundations, emotional literacy, GBV awareness, safeguarding, and referral skills.",
  },
  {
    number: "02",
    icon: Users,
    title: "Practice",
    text: "Graduates facilitate peer sessions, build trust, strengthen relationships, and learn when to refer people for additional care.",
  },
  {
    number: "03",
    icon: Globe,
    title: "Serve",
    text: "Trained coaches serve their communities through digital and in-person channels, supported by ongoing mentorship and supervision.",
  },
  {
    number: "04",
    icon: Award,
    title: "Lead",
    text: "Care work becomes a dignified pathway to income, leadership, and lasting community impact — creating a self-sustaining wellness ecosystem.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function HowItWorks() {
  return (
    <section className="section-pad bg-mid reveal" id="how-it-works">
      <div className="container-page">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#10B981]">
            How It Works
          </p>
          <h2
            className="font-heading font-bold tracking-tight text-[#1A237E]"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.2 }}
          >
            From learning to leading in your community.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-text-muted max-w-2xl mx-auto">
            Four stages that turn motivation into capable, supported community care.
          </p>
        </motion.div>

        <div className="mt-16 relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/10 hidden md:block" />

          <motion.div
            className="grid gap-10 md:gap-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;
              return (
                <motion.div
                  key={step.number}
                  variants={stepVariants}
                  className="relative md:grid md:grid-cols-[4rem_1fr] md:gap-8 md:pb-10"
                >
                  <div className="hidden md:flex flex-col items-center">
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#1A237E] text-white shadow-lg shadow-[#1A237E]/20">
                      <Icon size={24} />
                    </div>
                    {!isLast && (
                      <div className="flex-1 w-px bg-gradient-to-b from-[#1A237E]/30 to-transparent min-h-[40px]" />
                    )}
                  </div>

                  <div className="md:pt-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex md:hidden h-10 w-10 items-center justify-center rounded-full bg-[#1A237E]/10 text-[#1A237E] shrink-0">
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#10B981]">
                        Step {step.number}
                      </span>
                    </div>
                    <h3
                      className="font-heading font-bold text-text"
                      style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-text-muted max-w-xl">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
