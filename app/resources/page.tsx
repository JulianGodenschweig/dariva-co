import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  ClipboardCheck,
  Download,
  PlayCircle,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/ui/primitives";
import { resources, contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free practical mental wellness tools from Dariva.co — articles, self-assessments, downloadable guides, videos and everyday wellbeing tips.",
};

/* Icons paired to the six resource types named in the content draft. */
const icons = [
  BookOpen,
  ClipboardCheck,
  Download,
  PlayCircle,
  HelpCircle,
  Lightbulb,
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Free practical tools for everyday wellbeing"
        body={resources.lead}
      />

      <Section tone="warm">
        <SectionHeader
          eyebrow="What's Coming"
          title="Six kinds of support, free to use"
          lead="We are building this library now. Tell us which of these would help you most and we will send it to you the moment it is ready."
        />

        <div className="reveal-group mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.items.map((item, index) => {
            const Icon = icons[index] ?? BookOpen;

            return (
              <article key={item} className="card p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/10 text-cyan">
                  <Icon size={22} />
                </span>
                <h3 className="mt-6 font-heading text-lg font-bold text-ink">
                  {item}
                </h3>
              </article>
            );
          })}
        </div>

        <div className="reveal mt-14">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-emerald px-7 py-4 font-semibold text-white shadow-xl shadow-cyan/25 transition-transform hover:scale-[1.03]"
          >
            Request a resource
          </Link>
          <p className="mt-5 text-sm text-ink-muted">
            Or message us directly on WhatsApp at{" "}
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan underline underline-offset-4"
            >
              {contact.phone}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
