import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TermList } from "@/components/ui/Prose";
import { resources } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: "Resources",
  description: resources.status,
};

/**
 * /resources.
 *
 * The PDF lists six resource types. None of them exist yet, so this page lists
 * what is coming and says so, rather than linking to six empty pages. The
 * newsletter signup in the footer is the actual action available here.
 */
export default function ResourcesPage() {
  return (
    <>
      <PageHero eyebrow="In development" title={resources.title} lede={resources.status} />

      <Section ground="paper">
        <Reveal>
          <h2 className="text-display-m text-ink">{resources.lede}</h2>
          <div className="mt-12">
            <TermList items={resources.items} columns={2} />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
