import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Split, TermList, OutcomeList } from "@/components/ui/Prose";
import { ProgrammeInterestForm } from "@/components/forms/ProgrammeInterestForm";
import { modules } from "@/lib/content/pages";
import { programmeFacts } from "@/lib/content/site";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const module = modules.find((m) => m.slug === slug);
  if (!module) return {};
  return { title: module.title, description: module.body };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const module = modules.find((m) => m.slug === slug);
  if (!module) notFound();

  const index = modules.findIndex((m) => m.slug === slug);

  return (
    <>
      <PageHero
        // Earned mono: the training genuinely runs in three monthly modules,
        // so this marks a real position in a real sequence.
        eyebrow={`Month ${String(index + 1).padStart(2, "0")} / 0${programmeFacts.durationMonths}`}
        title={module.title}
        lede={module.tagline}
      />

      <Section ground="paper">
        <Reveal>
          <p className="text-display-m measure text-ink">{module.body}</p>
        </Reveal>
      </Section>

      <Section ground="wash">
        <div className="flex flex-col gap-20">
          <Split heading={module.topicsHeading}>
            <TermList items={module.topics} columns={2} />
          </Split>
          <Split heading={module.benefitsHeading} lede={module.benefitsLede}>
            <OutcomeList items={module.benefits} />
          </Split>
        </div>
      </Section>

      <Section ground="paper" id="register">
        <div className="max-w-[46rem]">
          <h2 className="text-display-l text-ink">Join the next cohort</h2>
          <p className="text-lede mt-8">
            {programmeFacts.standardRate} standard, or {programmeFacts.subsidisedRateTotal}{" "}
            subsidised. {programmeFacts.durationMonths} months, in person or fully online.
          </p>
        </div>
        <div className="mt-14">
          <ProgrammeInterestForm defaultProgramme={module.title} />
        </div>
      </Section>
    </>
  );
}
