"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, BookOpen, HandHeart, TrendingUp } from "lucide-react";

function Counter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    let startTime: number;
    let raf: number;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    }

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return (
    <p ref={ref} className="text-5xl font-bold tracking-tight text-[#1B9AD6] sm:text-6xl">
      {prefix}{count.toLocaleString()}{suffix}
    </p>
  );
}

const stats = [
  {
    icon: Users,
    value: 2300,
    suffix: "+",
    label: "Trainees targeted by 2027",
  },
  {
    icon: BookOpen,
    value: 3,
    suffix: "",
    label: "Programme phases",
  },
  {
    icon: TrendingUp,
    value: 6,
    suffix: "",
    label: "Outcome areas tracked",
  },
  {
    icon: HandHeart,
    value: 1,
    suffix: "",
    label: "Community Counselling Centre Built in Each Community",
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

export function Impact() {
  return (
    <section className="section-pad bg-deep reveal" id="impact">
      <div className="container-page relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/70">
            Our Impact
          </p>
          <h2
            className="font-heading font-bold tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.2, color: 'white' }}
          >
            Measurable change, meaningful reach.
          </h2>
          <p className="mt-5 text-lg leading-relaxed opacity-80 max-w-2xl mx-auto">
            Every metric represents real people gaining real access to mental wellness.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                className="card-lift bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 p-6 text-center transition-all duration-300"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-[#1B9AD6] mx-auto">
                  <Icon size={22} />
                </div>
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="mt-3 text-sm font-medium opacity-80">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
