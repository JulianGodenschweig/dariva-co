"use client";

import { motion } from "framer-motion";
import { Card, CardIcon } from "@/components/ui/Card";
import { Heart, Frown, BookOpen, Users } from "lucide-react";

const problems = [
  {
    icon: Heart,
    title: "Mental Health Gap",
    text: "In Namibia, Africa, access to professional mental health support is limited. Community-based prevention is the most practical path to wider wellness.",
  },
  {
    icon: Frown,
    title: "Silent Suffering",
    text: "Stigma, isolation, and lack of emotional vocabulary prevent people from speaking about pain early — when care is most effective.",
  },
  {
    icon: BookOpen,
    title: "Limited Awareness",
    text: "Many communities lack access to basic emotional literacy, stress management, and referral knowledge that could prevent crisis.",
  },
  {
    icon: Users,
    title: "Fragmented Support",
    text: "Without trained local coaches and connected referral pathways, people fall through the gaps between informal care and professional help.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
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

export function Problem() {
  return (
    <section className="section-pad bg-river-light reveal" id="problem">
      <div className="container-page">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#10B981]">
            The Challenge
          </p>
          <h2
            className="font-heading font-bold tracking-tight text-[#1A237E]"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.2 }}
          >
            Mental wellness should not be a privilege.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-text-muted max-w-2xl">
            In many Namibian communities, professional mental health support is scarce and stigma runs deep. Dariva.co exists to close that gap.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <motion.div key={problem.title} variants={cardVariants}>
                <Card>
                  <CardIcon>
                    <Icon size={22} />
                  </CardIcon>
                  <h3 className="text-lg font-bold text-text">{problem.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {problem.text}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
