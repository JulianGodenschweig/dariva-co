import type { Metadata } from "next";
import {
  PageHero,
  Section,
  SectionHeader,
  PillGrid,
} from "@/components/ui/primitives";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description: about.body[0],
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={about.heading}
        body={about.body}
      />

      <Section tone="warm">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="reveal rounded-3xl border border-line bg-white p-9">
            <p className="eyebrow text-cyan">Our Mission</p>
            <p className="t-h3 mt-5 font-heading leading-snug text-ink">
              {about.mission}
            </p>
          </div>

          <div className="reveal rounded-3xl border border-line bg-white p-9">
            <p className="eyebrow text-emerald">Our Vision</p>
            <p className="t-h3 mt-5 font-heading leading-snug text-ink">
              {about.vision}
            </p>
          </div>
        </div>
      </Section>

      <Section tone="dark" aurora>
        <SectionHeader
          eyebrow="Our Values"
          title="What we hold ourselves to"
          invert
        />
        <PillGrid items={about.values} invert />
      </Section>
    </>
  );
}
