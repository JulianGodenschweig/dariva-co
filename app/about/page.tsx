import type { Metadata } from "next";
import { CTA, FeatureGrid, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Learn Dariva.co's mission, values, and community-first approach to preventative mental wellness in Namibia, Africa."
};

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] opacity-80">About Dariva.co</p>
        <h1>From healing individuals to transforming communities</h1>
        <p>Dariva.co exists because emotional wellness is not a luxury. It is infrastructure for dignity, safety, leadership, and opportunity.</p>
        <div className="river-wrap" aria-hidden="true">
          <svg className="river-svg" viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,45 C180,90 360,0 540,45 C720,90 900,0 1080,45 C1260,90 1440,0 1440,45 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.12)"/>
            <path d="M0,60 C200,20 400,80 600,60 C800,40 1000,80 1200,60 C1300,50 1380,65 1440,60 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.07)"/>
          </svg>
        </div>
      </section>


      <section className="section-pad bg-river-light">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Our story"
            title="Dariva.co is building a community-owned mental wellness system."
            text="The work begins with people who already carry influence in their communities: listeners, organisers, youth leaders, caregivers, and trusted neighbours. Dariva.co trains and supports them so care becomes practical, local, and consistent."
          />
          <div className="grid gap-4">
            {[
              ["Mission", "To make mental wellness accessible and normal through trained community coaches and digital support that ends Gender-Based Violence."],
              ["Vision", "Emotionally resilient, self-sustaining communities across Namibia and Africa."],
              ["Difference", "Dariva.co combines prevention, economic opportunity, digital health integration, and monitoring into one ecosystem."]
            ].map(([title, text], i) => (
              <div key={title} className={`reveal reveal-delay-${i + 1} rounded-2xl border border-[#b8d4d8] bg-[#f6faf9] p-6 card-lift`}>
                <h2 className="text-xl font-semibold text-[#1A237E]">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#4e6878]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="section-pad bg-mid">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Values"
            title="Warm enough for community trust. Disciplined enough for national scale."
          />
          <div className="mt-12">
            <FeatureGrid items={values.map(({ title, icon }) => ({ title, icon }))} columns="four" />
          </div>
        </div>
      </section>


      <div className="bg-deep">
        <CTA title="Help make wellness a community practice." text="Dariva.co is for communities, partners, and funders who believe prevention should be built before crisis." />
      </div>
    </>
  );
}
