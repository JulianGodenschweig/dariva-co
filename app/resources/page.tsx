import type { Metadata } from "next";
import ResourceLibrary from "@/components/app/ResourceLibrary";
import { Reveal } from "@/components/motion/scroll";
import { Button, PageHeader, Section } from "@/components/ui";
import { CRISIS_NOTE } from "@/lib/assessment";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free practical mental wellness tools — articles, tips, guides, videos, self-assessments and frequently asked questions.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Free practical tools, open to everyone."
        lede="Articles, tips, guides, self-assessments and answers to the questions we are asked most. All of it drawn from the programme curricula."
        image="/images/desert-road.jpg"
        alt="An open road through the Namibian landscape"
      />

      <Section className="surface-dark">
        <ResourceLibrary />
      </Section>

      <Section className="bg-ink">
        <Reveal>
          <div className="rounded-2xl border border-azure/25 bg-azure/[0.06] p-8 md:p-10">
            <p className="eyebrow text-azure">If you need help now</p>
            <p className="mt-4 max-w-3xl leading-relaxed text-cream/80">
              {CRISIS_NOTE}
            </p>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-16 text-center">
            <h2 className="display-md mx-auto max-w-3xl text-cream">
              Want these skills properly, not just in summary?
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/programmes">Explore the programmes</Button>
              <Button href="/assessment" variant="outline">
                Take the free check-in
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
