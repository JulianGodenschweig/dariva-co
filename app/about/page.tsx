import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Split, Prose, OutcomeList } from "@/components/ui/Prose";
import { ButtonLink } from "@/components/ui/Button";
import { about } from "@/lib/content/pages";
import { longTermGoals, site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "About",
  description: about.lede,
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title={about.title} lede={about.lede} />

      <Section ground="paper">
        <Reveal>
          <p className="text-display-m measure text-ink">{about.body}</p>
        </Reveal>
      </Section>

      <Section ground="wash">
        <div className="flex flex-col gap-20">
          <Split heading={about.mission.heading}>
            <p className="text-display-m text-ink">{about.mission.text}</p>
          </Split>

          <Split heading={about.vision.heading}>
            <p className="text-display-m text-ink">{about.vision.text}</p>
          </Split>

          <Split heading={about.values.heading}>
            <OutcomeList items={about.values.items} />
          </Split>
        </div>
      </Section>

      {/* Goals, stated as goals. Nothing here is claimed as achieved. */}
      <Section ground="paper">
        <Split
          heading="Where this is going"
          lede="These are stated goals, not results. We publish results when we have them."
        >
          <ol className="flex flex-col">
            {longTermGoals.map((goal, i) => (
              <li
                key={goal}
                className="flex items-baseline gap-5 border-b border-ink/10 py-6 first:border-t"
              >
                <span className="text-micro shrink-0 text-quiet/45" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg text-ink">{goal}</span>
              </li>
            ))}
          </ol>
        </Split>
      </Section>

      <Section ground="paper">
        <Reveal>
          <Prose>
            <p>
              {site.name} is registered in Namibia and works nationally, in person and
              online.
            </p>
          </Prose>
          <div className="mt-10">
            <ButtonLink href="/contact" variant="primary">
              Book a discovery call
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
