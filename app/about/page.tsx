import type { Metadata } from "next";
import { DepthImage, ParallaxBand, Reveal } from "@/components/motion/scroll";
import { Button, Eyebrow, PageHeader, Section } from "@/components/ui";
import { org, values, whoWeServe } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: org.about,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Dariva.co"
        title="Prevention is more powerful than intervention."
        lede={org.about}
        image="/images/acacia-dusk.jpg"
        alt="Acacia tree silhouetted against a Namibian dusk"
      />

      <Section className="surface-dark">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="display-md text-cream">{org.aboutBelief}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal clip>
              <DepthImage
                src="/images/seminar.jpg"
                alt="Participants listening during a Dariva.co session"
                className="aspect-[4/3] w-full"
              />
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid gap-10 md:grid-cols-2">
          <Reveal delay={1}>
            <div className="h-full rounded-2xl border border-mist/12 bg-mist/[0.03] p-9">
              <Eyebrow>Our Mission</Eyebrow>
              <p className="mt-6 font-display text-xl leading-snug text-cream">
                {org.mission}
              </p>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="h-full rounded-2xl border border-mist/12 bg-mist/[0.03] p-9">
              <Eyebrow>Our Vision</Eyebrow>
              <p className="mt-6 font-display text-xl leading-snug text-cream">
                {org.vision}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-ink">
        <Reveal>
          <Eyebrow>Our Values</Eyebrow>
          <h2 className="display-md mt-6 max-w-2xl text-cream">
            Seven commitments we are willing to be measured against.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-mist/12 bg-mist/12 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
            <Reveal key={value.name} delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}>
              <div className="h-full bg-ink-2 p-9 transition-colors duration-500 hover:bg-ink-3">
                <span className="font-display text-xs font-semibold tracking-[0.3em] text-azure">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-sm mt-4 text-cream">{value.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/55">
                  {value.note}
                </p>
              </div>
            </Reveal>
          ))}
          <div className="hidden bg-ink-2 lg:block" />
          <div className="hidden bg-ink-2 sm:block lg:hidden" />
        </div>
      </Section>

      <ParallaxBand
        src="/images/youth-group.jpg"
        alt="A group of young people together"
        className="py-32 md:py-40"
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-14 lg:px-20">
          <Reveal>
            <Eyebrow>Who We Serve</Eyebrow>
            <h2 className="display-md mt-6 max-w-3xl text-cream">
              {org.visionBroad}
            </h2>
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {whoWeServe.map((group) => (
                <li
                  key={group}
                  className="rounded-full border border-mist/25 bg-ink/40 px-5 py-2.5 text-sm text-cream/85 backdrop-blur-sm"
                >
                  {group}
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="/programmes">Explore the programmes</Button>
              <Button href="/partner" variant="outline">
                Partner with us
              </Button>
            </div>
          </Reveal>
        </div>
      </ParallaxBand>
    </>
  );
}
