import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Split, TermList, OutcomeList } from "@/components/ui/Prose";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { BookingBlock } from "@/components/ui/BookingBlock";
import { workplace } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: workplace.title,
  description: workplace.body,
};

export default function WorkplacePage() {
  return (
    <>
      <PageHero
        eyebrow="For organisations"
        title={workplace.title}
        lede={workplace.tagline}
      />

      <Section ground="paper">
        <Reveal>
          <p className="text-display-m measure text-ink">{workplace.body}</p>
        </Reveal>
      </Section>

      <Section ground="ink">
        <div className="flex flex-col gap-20">
          <Split heading={workplace.services.heading} inverted>
            <TermList items={workplace.services.items} columns={2} inverted />
          </Split>
          <Split heading={workplace.benefits.heading} inverted>
            <OutcomeList items={workplace.benefits.items} inverted />
          </Split>
        </div>
      </Section>

      <Section ground="paper" id="enquire" labelledBy="enquire-heading">
        <SectionHead
          id="enquire-heading"
          title="Enquire about workplace training"
          lede="Tell us the size of the team and what you are trying to change. We will come back with a shape and a price."
        />
        <div className="mt-14 grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <EnquiryForm
            sourcePage="/workplace"
            submitLabel="Enquire about workplace training"
          />
          <BookingBlock />
        </div>
      </Section>
    </>
  );
}
