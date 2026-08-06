import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeader,
  PillGrid,
  CheckList,
} from "@/components/ui/primitives";
import { workplace } from "@/lib/content";

export const metadata: Metadata = {
  title: workplace.title,
  description: workplace.body,
};

export default function WorkplacePage() {
  return (
    <>
      <PageHero
        eyebrow="For Organisations"
        title={workplace.title}
        tagline={workplace.tagline}
        body={workplace.body}
      />

      <Section tone="warm">
        <SectionHeader
          eyebrow="Services"
          title="How we work with your organisation"
        />
        <PillGrid items={workplace.services} />
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow={workplace.benefitsLead}
          title="What organisations gain"
        />
        <CheckList items={workplace.benefits} columns={3} />
      </Section>

      <Section tone="dark" aurora>
        <div className="reveal max-w-3xl">
          <h2 className="t-h2 text-white">
            Bring practical wellness training to your team
          </h2>
          <p className="t-lead mt-6 text-white/65">
            Tell us about your organisation and we will put together a
            programme that fits your people, your budget and your calendar.
          </p>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-emerald px-7 py-4 font-semibold text-white shadow-xl shadow-cyan/25 transition-transform hover:scale-[1.03]"
          >
            Talk to us
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </Section>
    </>
  );
}
