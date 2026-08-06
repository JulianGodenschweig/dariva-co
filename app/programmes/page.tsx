import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeader,
  CheckList,
  PillGrid,
} from "@/components/ui/primitives";
import { wellnessProgramme, modules } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programmes",
  description: wellnessProgramme.body[0],
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Mental Wellness Programme"
        title={wellnessProgramme.title}
        tagline={wellnessProgramme.tagline}
        body={wellnessProgramme.body}
      />

      <Section tone="warm">
        <SectionHeader
          eyebrow="Programme Benefits"
          title="Practical skills, applied immediately"
          lead={wellnessProgramme.benefitsLead}
        />
        <CheckList items={wellnessProgramme.benefits} columns={3} />
      </Section>

      <Section tone="light">
        <SectionHeader eyebrow="Suitable For" title="Built for every setting" />
        <PillGrid items={wellnessProgramme.suitableFor} />
      </Section>

      <Section tone="dark" aurora>
        <SectionHeader
          eyebrow="The Modules"
          title="Three streams you can take on their own or together"
          invert
        />

        <div className="reveal-group mt-14 grid gap-6 lg:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.slug}
              href={`/programmes/${module.slug}`}
              className="group flex flex-col rounded-3xl border border-white/12 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:border-cyan-bright/40 hover:bg-white/10"
            >
              <h3 className="t-h3 font-heading text-white">{module.title}</h3>
              <p className="mt-3 font-heading text-cyan-bright">
                {module.tagline}
              </p>
              <p className="mt-5 flex-1 leading-relaxed text-white/60">
                {module.body}
              </p>
              <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                View module
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
