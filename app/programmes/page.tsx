import type { Metadata } from "next";
import Link from "next/link";
import { DepthImage, ParallaxBand, Reveal } from "@/components/motion/scroll";
import { Button, Dot, Eyebrow, PageHeader, Pill, Section } from "@/components/ui";
import { coachingProgramme, programmes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Personal Growth, Basic Counselling and Leadership Development — practical mental wellness training for individuals, communities and organisations.",
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Mental Wellness Programme"
        title={coachingProgramme.tagline}
        lede={coachingProgramme.body[0]}
        image="/images/workshop.jpg"
        alt="A Dariva.co wellness workshop in progress"
      />

      <Section className="surface-dark">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>How it differs</Eyebrow>
              {coachingProgramme.body.slice(1).map((para) => (
                <p
                  key={para}
                  className="mt-6 font-display text-xl leading-snug text-cream first:mt-8"
                >
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal delay={2}>
              <p className="eyebrow mt-12 text-azure">
                {coachingProgramme.benefitsLabel}
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {coachingProgramme.benefits.map((b) => (
                  <Dot key={b}>{b}</Dot>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal clip>
              <DepthImage
                src="/images/meeting-table.jpg"
                alt="A small group working through a module together"
                className="aspect-[3/4] w-full"
              />
            </Reveal>
            <Reveal delay={2}>
              <p className="eyebrow mt-10 text-azure">
                {coachingProgramme.suitableLabel}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {coachingProgramme.suitable.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="bg-ink">
        <Reveal>
          <Eyebrow>The three streams</Eyebrow>
          <h2 className="display-lg mt-6 max-w-3xl text-cream">
            Choose where you want to start.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {programmes.map((p, i) => (
            <Reveal key={p.slug} delay={((i + 1) as 1 | 2 | 3)}>
              <Link
                href={`/programmes/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist/12 bg-ink-2 transition-all duration-500 hover:border-azure/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink/30 to-transparent" />
                  <span className="absolute left-6 top-6 font-display text-sm font-semibold tracking-[0.3em] text-azure">
                    {p.index}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="display-sm text-cream transition-colors group-hover:text-azure">
                    {p.title}
                  </h3>
                  <p className="mt-3 font-display text-mist/80">{p.tagline}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/60">
                    {p.summary}
                  </p>
                  <p className="mt-6 border-t border-mist/10 pt-5 text-sm text-royal-light">
                    {p.outcome}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-azure">
                    Explore
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <ParallaxBand
        src="/images/hands-together.jpg"
        alt="Hands joined in a circle"
        className="py-32 md:py-40"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-14 lg:px-20">
          <Reveal>
            <Eyebrow>Not sure where to begin?</Eyebrow>
            <h2 className="display-md mt-6 max-w-3xl text-cream">
              Take the free three-minute check-in and we will point you at the
              right stream.
            </h2>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/assessment">Start the check-in</Button>
              <Button href="/contact" variant="outline">
                Ask us directly
              </Button>
            </div>
          </Reveal>
        </div>
      </ParallaxBand>
    </>
  );
}
