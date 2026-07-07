"use client";

import { motion } from "framer-motion";
import { Card, CardIcon } from "@/components/ui/Card";
import { Brain, Smartphone, Award } from "lucide-react";

const solutions = [
  {
    icon: Brain,
    title: "Train",
    text: "We train community coaches in mental wellness foundations, GBV awareness, facilitation, and ethical care practices.",
  },
  {
    icon: Smartphone,
    title: "Connect",
    text: "Digital tools link trained coaches, community members, records, referrals, and continuous learning into one accessible system.",
  },
  {
    icon: Award,
    title: "Reward",
    text: "An incentive-based model creates dignified income pathways for care work while keeping prevention and trust at the centre.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function Solution() {
  return (
    <section className="section-pad reveal" id="solution">
      <div className="container-page">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#10B981]">
            Our Solution
          </p>
          <h2
            className="font-heading font-bold tracking-tight text-[#1A237E]"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.2 }}
          >
            A community-owned model for mental wellness.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-text-muted max-w-2xl mx-auto">
            Dariva.co combines training, digital access, and economic opportunity into one integrated system — making prevention practical and sustainable.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <motion.div key={solution.title} variants={cardVariants}>
                <Card className="text-center md:text-left p-8">
                  <div className="md:flex md:flex-col">
                    <div className="flex justify-center md:justify-start">
                      <CardIcon>
                        <Icon size={24} />
                      </CardIcon>
                    </div>
                    <h3 className="text-xl font-bold text-text">{solution.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-text-muted">
                      {solution.text}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
