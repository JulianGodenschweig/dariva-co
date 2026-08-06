import type { Metadata } from "next";
import {
  PageHero,
  Section,
  SectionHeader,
  PillGrid,
} from "@/components/ui/primitives";
import { impact, partner } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impact & Monitoring",
  description: impact.body[0],
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact & Monitoring"
        title={impact.title}
        body={impact.body}
      />

      <Section tone="warm">
        <SectionHeader
          eyebrow={impact.measuresLabel}
          title="Ten indicators we track"
          lead="Monitoring and evaluation is not paperwork — it is how a programme earns the right to keep running."
        />
        <PillGrid items={impact.measures} />
      </Section>

      <Section tone="light">
        <div className="reveal max-w-3xl">
          <p className="eyebrow text-emerald">{impact.whyLabel}</p>
          <p className="t-h3 mt-6 font-heading leading-snug text-ink">
            {impact.why}
          </p>
        </div>
      </Section>

      <Section tone="dark" aurora id="partner">
        <SectionHeader
          eyebrow="Partner With Us"
          title={partner.title}
          lead={partner.lead}
          invert
        />
        <PillGrid items={partner.partners} invert />
        <p className="reveal t-h3 mt-14 max-w-3xl font-heading leading-snug text-white/90">
          {partner.close}
        </p>
      </Section>
    </>
  );
}
