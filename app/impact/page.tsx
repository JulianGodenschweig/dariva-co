import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Split, Prose } from "@/components/ui/Prose";
import { impact } from "@/lib/content/pages";
import { cohorts, TODO_CLIENT } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Impact & Monitoring",
  description: impact.lede,
};

/**
 * /impact.
 *
 * This page publishes no percentages, because none exist yet: the pilot's
 * first graduate was expected end of July 2026 and the national cohort began
 * the same month. What it publishes instead is the measurement framework and
 * an explicit statement of what is not yet known.
 *
 * That is the honest version, and for a ministry or a donor it is also the
 * more persuasive one — a completion rate invented today would be found out.
 */
export default function ImpactPage() {
  return (
    <>
      <PageHero eyebrow="Monitoring & evaluation" title={impact.title} lede={impact.lede} />

      <Section ground="paper">
        <Reveal>
          <Prose>
            <p className="text-lg">{impact.body}</p>
          </Prose>
        </Reveal>
      </Section>

      {/* The M&E table. Mono is correct here — these are the indicators the
          organisation actually tracks. */}
      <Section ground="wash" labelledBy="measure-heading">
        <SectionHead
          id="measure-heading"
          title={impact.measures.heading}
          lede="Ten indicators, tracked from a participant's first session onward."
        />
        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">
              Indicators tracked by Dariva.co, and their current reporting status
            </caption>
            <thead>
              <tr className="border-b border-ink/20">
                <th scope="col" className="text-micro py-4 pr-6 text-quiet/70">
                  Indicator
                </th>
                <th scope="col" className="text-micro py-4 text-quiet/70">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {impact.measures.items.map((item) => (
                <tr key={item} className="border-b border-ink/10">
                  <th scope="row" className="py-4 pr-6 font-normal text-ink">
                    {item}
                  </th>
                  <td className="text-micro py-4 text-quiet">Collecting</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Say plainly what is not yet known. */}
      <Section ground="paper" labelledBy="disclosure-heading">
        <Split heading={impact.disclosure.heading}>
          <Prose>
            <p className="text-lg">{impact.disclosure.body}</p>
          </Prose>
          <p className="text-micro mt-8 text-quiet/70">
            {TODO_CLIENT.participantNumbers}
          </p>
        </Split>
      </Section>

      <Section ground="wash" labelledBy="cohorts-heading">
        <SectionHead id="cohorts-heading" title="What has run so far" />
        <div className="mt-14 flex flex-col">
          {cohorts.map((c, i) => (
            <Reveal key={c.id} delay={i * 80}>
              <div className="grid gap-6 border-t border-ink/12 py-10 last:border-b md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-16">
                <div>
                  <p className="text-micro text-signal">{c.when}</p>
                  <h3 className="mt-3 text-xl text-ink">{c.label}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-ink">{c.where}</p>
                  <p className="text-micro text-quiet/70">{c.mode}</p>
                  {c.note ? <p className="text-sm text-quiet">{c.note}</p> : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section ground="paper">
        <Split heading={impact.why.heading}>
          <Prose>
            <p className="text-lg">{impact.why.body}</p>
          </Prose>
        </Split>
      </Section>
    </>
  );
}
