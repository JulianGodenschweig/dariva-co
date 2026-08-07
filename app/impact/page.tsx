import type { Metadata } from "next";
import { Counter, DepthImage, ParallaxBand, Reveal } from "@/components/motion/scroll";
import { Button, Eyebrow, PageHeader, Section } from "@/components/ui";
import { impact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impact & Monitoring",
  description: impact.body,
};

/**
 * The measurement framework, grouped the way M&E practice actually reads:
 * activity → learning → behaviour → longer-term community change.
 */
const framework = [
  {
    stage: "Participation",
    note: "Who we reached, and whether they stayed.",
    measures: ["People trained", "Programme completion rates"],
  },
  {
    stage: "Learning outcomes",
    note: "What participants actually gained.",
    measures: ["Knowledge gained", "Participant satisfaction"],
  },
  {
    stage: "Behaviour change",
    note: "What people do differently afterwards.",
    measures: ["Behaviour change", "Leadership growth", "Referral outcomes"],
  },
  {
    stage: "Community impact",
    note: "Whether the change held, and spread.",
    measures: [
      "Workplace wellbeing improvements",
      "Community engagement",
      "Community impact indicators",
    ],
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Impact & Monitoring"
        title={impact.title}
        lede={impact.lede}
        image="/images/savanna-wide.jpg"
        alt="Wide open savanna at golden hour"
      />

      <Section className="surface-dark">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="display-md text-cream">
                Every programme should create measurable impact.
              </p>
              <p className="mt-8 leading-relaxed text-cream/70">
                {impact.body}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal clip>
              <DepthImage
                src="/images/notes-meeting.jpg"
                alt="Reviewing programme results together"
                className="aspect-[4/3] w-full"
              />
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-mist/12 bg-mist/12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: 10, label: "Impact indicators tracked" },
            { n: 4, label: "Stages in the M&E framework" },
            { n: 3, label: "Core training streams" },
            { n: 9, label: "Audience groups served" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={((i + 1) as 1 | 2 | 3 | 4)}>
              <div className="h-full bg-ink-2 p-8">
                <p className="font-display text-5xl font-bold text-azure">
                  <Counter to={s.n} />
                </p>
                <p className="mt-3 text-sm text-cream/60">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-ink">
        <Reveal>
          <Eyebrow>{impact.measuresLabel}</Eyebrow>
          <h2 className="display-md mt-6 max-w-3xl text-cream">
            Ten indicators, tracked across four stages.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-px overflow-hidden rounded-2xl border border-mist/12 bg-mist/12">
          {framework.map((row, i) => (
            <Reveal key={row.stage} delay={((i + 1) as 1 | 2 | 3 | 4)}>
              <div className="grid gap-6 bg-ink-2 p-8 md:grid-cols-12 md:items-center md:p-10">
                <div className="md:col-span-1">
                  <span className="font-display text-sm font-semibold tracking-[0.3em] text-azure">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="display-sm text-cream">{row.stage}</h3>
                  <p className="mt-2 text-sm text-cream/50">{row.note}</p>
                </div>
                <div className="md:col-span-7">
                  <ul className="flex flex-wrap gap-2.5">
                    {row.measures.map((m) => (
                      <li
                        key={m}
                        className="rounded-full border border-mist/18 bg-mist/[0.03] px-4 py-2 text-sm text-cream/75"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <ParallaxBand
        src="/images/acacia-dusk.jpg"
        alt="Acacia tree at dusk"
        className="py-32 md:py-40"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-14 lg:px-20">
          <Reveal>
            <Eyebrow>{impact.whyLabel}</Eyebrow>
            <p className="display-md mt-8 max-w-4xl text-cream">{impact.why}</p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="/partner">Partner with us</Button>
              <Button href="/contact" variant="outline">
                Request our reporting approach
              </Button>
            </div>
          </Reveal>
        </div>
      </ParallaxBand>
    </>
  );
}
