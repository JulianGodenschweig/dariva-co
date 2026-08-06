import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeader,
  PillGrid,
  CheckList,
} from "@/components/ui/primitives";
import { modules } from "@/lib/content";

interface Params {
  params: Promise<{ slug: string }>;
}

/** `output: "export"` needs every dynamic route enumerated at build time. */
export function generateStaticParams() {
  return modules.map((module) => ({ slug: module.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const module = modules.find((m) => m.slug === slug);

  if (!module) return {};

  return {
    title: module.title,
    description: module.body,
  };
}

export default async function ModulePage({ params }: Params) {
  const { slug } = await params;
  const module = modules.find((m) => m.slug === slug);

  if (!module) notFound();

  const index = modules.findIndex((m) => m.slug === slug);
  const next = modules[(index + 1) % modules.length];

  return (
    <>
      <PageHero
        eyebrow="Programme Module"
        title={module.title}
        tagline={module.tagline}
        body={module.body}
      />

      <Section tone="warm">
        <SectionHeader eyebrow={module.topicsLabel} title="What is covered" />
        <PillGrid items={module.topics} />
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Benefits"
          title="What participants take away"
          lead={module.benefitsLead}
        />
        <CheckList items={module.benefits} columns={2} />
      </Section>

      <Section tone="dark" aurora>
        <div className="reveal flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-cyan-bright">Next module</p>
            <p className="t-h2 mt-3 text-white">{next.title}</p>
            <p className="mt-3 max-w-xl text-white/60">{next.tagline}</p>
          </div>

          <Link
            href={`/programmes/${next.slug}`}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-navy-deep transition-transform hover:scale-[1.03]"
          >
            Continue
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
