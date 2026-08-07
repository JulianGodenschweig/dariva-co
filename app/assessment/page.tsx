import type { Metadata } from "next";
import AssessmentApp from "@/components/app/AssessmentApp";
import { dimensions } from "@/lib/assessment";
import { Reveal } from "@/components/motion/scroll";
import { Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Wellness Check-In",
  description:
    "A free, private three-minute self-reflection across five everyday capacities, with a programme recommendation at the end.",
};

export default function AssessmentPage() {
  return (
    <>
      <section className="relative isolate grain overflow-hidden px-6 pb-20 pt-40 md:px-14 lg:px-20">
        <img
          src="/images/portrait-lead.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/92 to-ink" />
        <AssessmentApp />
      </section>

      <Section className="surface-dark">
        <Reveal>
          <Eyebrow>What it looks at</Eyebrow>
          <h2 className="display-md mt-6 max-w-3xl text-cream">
            Five capacities that shape everyday wellbeing.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-mist/12 bg-mist/12 sm:grid-cols-2 lg:grid-cols-5">
          {dimensions.map((d, i) => (
            <Reveal key={d.id} delay={((i + 1) as 1 | 2 | 3 | 4 | 5)}>
              <div className="h-full bg-ink-2 p-7">
                <span className="font-display text-xs font-semibold tracking-[0.3em] text-azure">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold leading-snug text-cream">
                  {d.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/55">
                  {d.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
