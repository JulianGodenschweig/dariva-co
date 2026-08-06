import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  PageHero,
  Section,
  SectionHeader,
  CheckList,
} from "@/components/ui/primitives";
import { communityCounsellor, modules } from "@/lib/content";

export const metadata: Metadata = {
  title: "Become a Community Counsellor",
  description: communityCounsellor.body[0],
};

// The counselling module is the spine of this pathway.
const counsellingModule = modules.find((m) => m.slug === "basic-counselling");

export default function CommunityCounsellorPage() {
  return (
    <>
      <PageHero
        eyebrow="Community Counsellor Programme"
        title={communityCounsellor.title}
        tagline={communityCounsellor.tagline}
        body={communityCounsellor.body}
      />

      {counsellingModule && (
        <Section tone="warm">
          <SectionHeader
            eyebrow="Skills You Will Learn"
            title="Practical helping skills, taught responsibly"
            lead="Knowing when to support and when to refer is the difference between helping someone and harming them. That judgement is taught explicitly."
          />
          <CheckList items={counsellingModule.topics} columns={3} />
        </Section>
      )}

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <p className="eyebrow text-cyan">After Graduation</p>
            <h2 className="t-h2 mt-3 text-ink">You are not left on your own</h2>
            <p className="t-lead mt-6 text-ink-muted">
              {communityCounsellor.body[1]}
            </p>
          </div>

          <ul className="reveal-group grid gap-4">
            {[
              "Ongoing coaching as you begin supporting others",
              "Supervision from experienced practitioners",
              "Opportunities to grow into community leadership",
            ].map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-line bg-sand-warm p-6 leading-relaxed text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="dark" aurora>
        <div className="reveal max-w-3xl">
          <h2 className="t-h2 text-white">
            Caring about people is the only prerequisite
          </h2>
          <p className="t-lead mt-6 text-white/65">
            If you are the person others already come to, this programme gives
            you the skills to carry that well.
          </p>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-emerald px-7 py-4 font-semibold text-white shadow-xl shadow-cyan/25 transition-transform hover:scale-[1.03]"
          >
            Apply to join
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
