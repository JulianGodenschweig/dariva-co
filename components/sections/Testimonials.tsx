"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Having someone in my community who understands what I am going through — that changes everything. Dariva.co is building something real.",
    name: "Community Voice",
    role: "Lüderitz Pilot Participant",
  },
  {
    quote:
      "What excites me about Dariva.co is the train-the-trainer model. It does not just help one person — it creates a ripple effect of wellness across entire communities.",
    name: "Partner",
    role: "Community Organisation",
  },
  {
    quote:
      "When prevention becomes practical, everyone benefits. Dariva.co is building the infrastructure for a mentally healthier Namibia, Africa.",
    name: "Mental Health Advocate",
    role: "Supporting Partner",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function Testimonials() {
  return (
    <section className="section-pad bg-white reveal" id="testimonials">
      <div className="container-page">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#10B981]">
            Community Voices
          </p>
          <h2
            className="font-heading font-bold tracking-tight text-[#1A237E]"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.2 }}
          >
            What people are saying
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.name + i} 
              className="relative h-full rounded-2xl bg-card border border-primary/10 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
            >
              <Quote
                size={28}
                className="text-[#1A237E] mb-4"
              />
              <p className="text-base leading-relaxed text-text-muted">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 pt-6 border-t border-primary/5">
                <p className="font-bold text-text">{t.name}</p>
                <p className="text-sm text-text-muted mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
