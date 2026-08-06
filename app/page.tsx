import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import {
  Section,
  SectionHeader,
  PillGrid,
  CheckList,
  Statement,
} from "@/components/ui/primitives";
import { whyDariva, programmes, whoWeServe, homeVision } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section tone="warm" id="why">
        <SectionHeader
          eyebrow="Why Dariva.co?"
          title="Prevention is more powerful than intervention"
          lead={whyDariva.lead}
        />
        <CheckList items={whyDariva.points} columns={3} />
        <Statement>{whyDariva.close}</Statement>
      </Section>

      <Section tone="light" id="programmes">
        <SectionHeader
          eyebrow="Our Programmes"
          title="Three streams, one outcome"
          lead="Every Dariva.co programme turns emotional skill into something a person can use the same day — at home, at work, and in their community."
        />

        <div className="reveal-group mt-14 grid gap-6 lg:grid-cols-3">
          {programmes.map((programme, index) => (
            <Link
              key={programme.slug}
              href={`/programmes/${programme.slug}`}
              className="card group flex flex-col p-8"
            >
              <span className="eyebrow text-cyan">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="t-h3 mt-4 font-heading text-ink">
                {programme.title}
              </h3>

              <p className="mt-4 flex-1 leading-relaxed text-ink-muted">
                {programme.summary}
              </p>

              <div className="mt-7 border-t border-line pt-6">
                <p className="eyebrow text-ink-faint">Outcome</p>
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  {programme.outcome}
                </p>
              </div>

              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan">
                Explore module
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="dark" aurora id="who-we-serve">
        <SectionHeader
          eyebrow="Who We Serve"
          title="Mental wellness belongs everywhere people gather"
          invert
        />
        <PillGrid items={whoWeServe} invert />
        <Statement invert>{homeVision}</Statement>

        <div className="reveal mt-12">
          <Link
            href="/community-counsellor"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-navy-deep transition-transform hover:scale-[1.03]"
          >
            Become a Community Counsellor
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </Section>
    </>
  );
}
