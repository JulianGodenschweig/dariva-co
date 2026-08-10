import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Split, TermList, OutcomeList, Prose } from "@/components/ui/Prose";
import { CrisisNote } from "@/components/ui/CrisisNote";
import { ProgrammeInterestForm } from "@/components/forms/ProgrammeInterestForm";
import { programmes, moduleSummaries } from "@/lib/content/pages";
import { programmeFacts, cohorts } from "@/lib/content/site";

export const metadata: Metadata = {
  title: programmes.title,
  description: programmes.lede,
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow={programmes.subtitle}
        title={programmes.title}
        lede={programmes.lede}
      />

      <Section ground="paper">
        <Reveal>
          <Prose>
            {programmes.body.map((p) => (
              <p key={p} className="text-lg">
                {p}
              </p>
            ))}
          </Prose>
        </Reveal>
      </Section>

      {/* The facts a prospective participant actually needs, set in mono
          because these are measured quantities. */}
      <Section ground="wash" labelledBy="facts-heading">
        <SectionHead id="facts-heading" title="What it costs and how long it takes" />
        <div className="mt-14 grid gap-px overflow-hidden border border-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Duration", value: `${programmeFacts.durationMonths} months` },
            { label: "Standard rate", value: programmeFacts.standardRate },
            {
              label: "Subsidised rate",
              value: `${programmeFacts.subsidisedRateMonthly}/mo`,
              note: `${programmeFacts.subsidisedRateTotal} total`,
            },
            {
              label: "Cohort size",
              value: `${programmeFacts.cohortSizePerTrainer}`,
              note: "per trainer",
            },
          ].map((fact, i) => (
            <Reveal key={fact.label} delay={i * 60}>
              <div className="h-full bg-paper p-8">
                <p className="text-micro text-quiet/70">{fact.label}</p>
                <p className="mt-4 font-[family-name:var(--font-mono)] text-3xl text-ink">
                  {fact.value}
                </p>
                {fact.note ? (
                  <p className="text-micro mt-2 text-quiet">{fact.note}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 max-w-[62ch] text-sm text-quiet">
            The subsidised rate is for {programmeFacts.subsidyEligibility}.
          </p>
        </Reveal>
      </Section>

      <Section ground="paper">
        <div className="flex flex-col gap-20">
          <Split heading={programmes.benefits.heading} lede={programmes.benefits.lede}>
            <TermList items={programmes.benefits.items} columns={2} />
          </Split>
          <Split heading={programmes.suitableFor.heading}>
            <OutcomeList items={programmes.suitableFor.items} />
          </Split>
        </div>
      </Section>

      {/* The three modules */}
      <Section ground="wash" labelledBy="modules-heading">
        <SectionHead id="modules-heading" title="The three streams" />
        <div className="mt-14 flex flex-col">
          {moduleSummaries.map((m, i) => (
            <Reveal key={m.slug} delay={i * 80}>
              <Link
                href={`/programmes/${m.slug}`}
                className="group grid gap-6 border-t border-ink/12 py-10 transition-colors last:border-b hover:bg-ink/[0.02] md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-16"
              >
                <div>
                  <p className="text-micro text-quiet/60">
                    Month {String(i + 1).padStart(2, "0")} / 0{programmeFacts.durationMonths}
                  </p>
                  <h3 className="text-display-m mt-3 text-ink transition-colors group-hover:text-signal">
                    {m.title}
                  </h3>
                </div>
                <div>
                  <p className="max-w-[52ch] text-lg text-quiet">{m.summary}</p>
                  <p className="mt-4 max-w-[52ch] text-ink">{m.outcome}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Cohorts to date — facts, no invented numbers. */}
      <Section ground="paper" labelledBy="cohorts-heading">
        <SectionHead
          id="cohorts-heading"
          title="Cohorts so far"
          lede="Two cohorts have run. We publish outcomes when the data exists, not before."
        />
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

      <Section ground="wash" id="register" labelledBy="register-heading">
        <SectionHead
          id="register-heading"
          title="Join the next cohort"
          lede="Tell us where you are and which rate applies. We reply with the start date and what to bring."
        />
        <div className="mt-14">
          <ProgrammeInterestForm />
        </div>
        <div className="mt-16 max-w-[46rem]">
          <CrisisNote />
        </div>
      </Section>
    </>
  );
}
