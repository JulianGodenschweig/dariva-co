import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { OutcomeList } from "@/components/ui/Prose";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { partner } from "@/lib/content/pages";
import { TODO_CLIENT } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Partner With Us",
  description: partner.close,
};

export default function PartnerPage() {
  return (
    <>
      <PageHero eyebrow="Partnership" title={partner.title} lede={partner.close} />

      <Section ground="wash">
        <Reveal>
          <h2 className="text-display-m text-ink">{partner.partners.heading}</h2>
          <div className="mt-10">
            <OutcomeList items={partner.partners.items} />
          </div>
        </Reveal>
        {/* No "trusted by" strip. There are no confirmed partner logos to
            show, and a strip of placeholders would be a lie — BRIEF.md §13. */}
        <Reveal delay={100}>
          <p className="text-micro mt-12 text-quiet/70">{TODO_CLIENT.partners}</p>
        </Reveal>
      </Section>

      <Section ground="paper" id="partner-enquiry" labelledBy="partner-heading">
        <SectionHead
          id="partner-heading"
          title="Start a partnership conversation"
          lede="Tell us what your organisation is trying to achieve. We will say honestly whether we are the right fit."
        />
        <div className="mt-14">
          <PartnerForm />
        </div>
      </Section>
    </>
  );
}
