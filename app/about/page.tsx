import type { Metadata } from "next";
import { CTA, FeatureGrid, PageHero, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Learn Dariva.co's mission, values, and community-first approach to preventative mental wellness in Namibia."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Dariva.co"
        title="From healing individuals to transforming communities"
        text="Dariva.co exists because emotional wellness is not a luxury. It is infrastructure for dignity, safety, leadership, and opportunity."
        primary={{ href: "/program", label: "Explore the Program" }}
      />
      <section className="section-pad bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Our story"
            title="Dariva.co is building a community-owned mental wellness system."
            text="The work begins with people who already carry influence in their communities: listeners, organisers, youth leaders, caregivers, and trusted neighbours. Dariva.co trains and supports them so care becomes practical, local, and consistent."
          />
          <Reveal className="grid gap-4">
            {[
              ["Mission", "To make mental wellness accessible and normal through trained community counsellors, digital support, and partner-led implementation."],
              ["Vision", "Emotionally resilient, self-sustaining communities across Namibia."],
              ["Difference", "Dariva.co combines prevention, economic opportunity, digital health integration, and monitoring into one ecosystem."]
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-[#b8d4d8] bg-[#f6faf9] p-6">
                <h2 className="text-xl font-semibold text-[#071822]">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#4e6878]">{text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="section-pad bg-[#e9f3f1]">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Values"
            title="Warm enough for community trust. Disciplined enough for national scale."
          />
          <div className="mt-12">
            <FeatureGrid items={values.map(({ title, icon }) => ({ title, icon, text: "A standard we practice in training, service delivery, partnerships, and data stewardship." }))} columns="four" />
          </div>
        </div>
      </section>
      <CTA title="Help make wellness a community practice." text="Dariva.co is for communities, partners, and funders who believe prevention should be built before crisis." />
    </>
  );
}
