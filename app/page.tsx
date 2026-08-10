import Link from "next/link";
import { Hero } from "@/components/scene/Hero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TermList } from "@/components/ui/Prose";
import { ButtonLink } from "@/components/ui/Button";
import { home, moduleSummaries } from "@/lib/content/pages";
import { programmeFacts } from "@/lib/content/site";

/**
 * Home.
 *
 * The ground shifts once — DESIGN.md §4 — at "Who we serve", where the site
 * stops speaking to a person and starts speaking to an institution. That is
 * the only inversion on the page.
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      {/* --- Why Dariva.co --- */}
      <Section ground="paper" labelledBy="why-heading">
        <SectionHead
          id="why-heading"
          title={home.why.heading}
          lede={home.why.lede}
        />
        <div className="mt-16">
          <Reveal>
            <TermList items={home.why.items} columns={2} />
          </Reveal>
          <Reveal delay={100}>
            <p className="text-display-m mt-16 max-w-[24ch] text-ink">
              {home.why.close}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* --- The three programmes --- */}
      <Section ground="wash" labelledBy="programmes-heading">
        <SectionHead
          id="programmes-heading"
          eyebrow={`${programmeFacts.durationMonths} months · ${programmeFacts.cohortSizePerTrainer} per trainer`}
          title="Three ways in"
          lede="One programme, three streams. Each one stands on its own and each one feeds the next."
        />

        <div className="mt-16 flex flex-col">
          {moduleSummaries.map((m, i) => (
            <Reveal key={m.slug} delay={i * 80}>
              <Link
                href={`/programmes/${m.slug}`}
                className="group grid gap-6 border-t border-ink/12 py-10 transition-colors last:border-b hover:bg-ink/[0.02] md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-16"
              >
                <h3 className="text-display-m text-ink transition-colors group-hover:text-signal">
                  {m.title}
                </h3>
                <div>
                  <p className="max-w-[52ch] text-lg text-quiet">{m.summary}</p>
                  <p className="text-micro mt-6 text-quiet">{m.outcomeLabel}</p>
                  <p className="mt-2 max-w-[52ch] text-ink">{m.outcome}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* --- Who we serve. The one ground inversion. --- */}
      <Section ground="ink" labelledBy="serve-heading">
        <SectionHead
          id="serve-heading"
          title={home.serve.heading}
          lede={home.serve.lede}
          inverted
        />

        <div className="mt-16 flex flex-col">
          {home.serve.buckets.map((bucket, i) => (
            <Reveal key={bucket.title} delay={i * 80}>
              <Link
                href={bucket.href}
                className="group grid gap-6 border-t border-paper/20 py-10 transition-colors last:border-b hover:bg-paper/[0.04] md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-16"
              >
                <div>
                  <h3 className="text-display-m text-paper transition-colors group-hover:text-signal-raw">
                    {bucket.title}
                  </h3>
                  <p className="text-micro mt-4 text-paper/70">
                    {bucket.absorbs.join(" · ")}
                  </p>
                </div>
                <div className="flex flex-col justify-between gap-6">
                  <p className="max-w-[52ch] text-lg text-paper/75">{bucket.body}</p>
                  <span className="text-micro text-signal-raw">{bucket.cta} ↗</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* --- One CTA. Not three. --- */}
      <Section ground="paper">
        <Reveal>
          <div className="max-w-[46rem]">
            <h2 className="text-display-l text-ink">
              The next cohort is forming now.
            </h2>
            <p className="text-lede mt-8">
              Training runs {programmeFacts.durationMonths} months, in person and fully
              online. {programmeFacts.standardRate} standard, or{" "}
              {programmeFacts.subsidisedRateTotal} for {programmeFacts.subsidyEligibility}.
            </p>
            <div className="mt-10">
              <ButtonLink href="/programmes" variant="signal">
                Join the next cohort
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
