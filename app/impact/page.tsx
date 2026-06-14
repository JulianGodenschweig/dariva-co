import type { Metadata } from "next";
import { CTA, FeatureGrid, SectionHeading, StatBand } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { impactCards } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impact",
  description: "Dariva.co's impact model focuses on preventative wellness, GBV driver ending, economic opportunity, and scalable community care in Namibia, Africa."
};

const insightCards = [
  { title: "Local insight", text: "Community feedback shows what is working, where trust is growing, and where support must improve." },
  { title: "Partner reporting", text: "Implementation partners can see activity, reach, outcomes, and learning in a credible format." },
  { title: "Adaptive delivery", text: "The model is built to refine training, referral pathways, and digital access over time." },
];

export default function ImpactPage() {
  return (
    <>
      <section className="about-hero">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] opacity-80">Impact</p>
        <h1>Proof that prevention can become community infrastructure</h1>
        <p>Dariva.co measures what matters: emotional literacy, help-seeking, safer relationships, trained local capacity, and economic opportunity through care work.</p>
      </section>

      <section className="section-pad reveal">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Transformation"
            title="The impact is human, practical, and scalable."
            text="Dariva.co's model links individual healing with community capability, safer social conditions, and national potential."
          />
          <div className="mt-12">
            <FeatureGrid items={impactCards} columns="four" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-river-light reveal">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Measurement" title="A serious movement needs a serious learning loop." />
          <div className="mt-12">
            <StatBand />
          </div>


          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {insightCards.map((item) => (
              <Reveal key={item.title} className="card-lift rounded-2xl border border-[#b8d4d8] bg-white p-6">
                <h2 className="text-xl font-semibold text-[#1A237E]">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#4e6878]">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad reveal">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="National potential"
            title="From local trust to a national care network."
            text="Dariva.co can begin community by community, then connect trained counsellors, referral relationships, digital tools, and partner learning into a wider mental wellness system across Namibia, Africa."
          />
          <Stagger className="grid gap-4">
            {["Pilot communities", "Counsellor economy", "National prevention infrastructure"].map((step, index) => (
              <StaggerItem key={step} className="card-lift rounded-2xl border border-[#b8d4d8] bg-[#f6faf9] p-6">
                <p className="text-sm font-bold text-[#00897b]">0{index + 1}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[#1A237E]">{step}</h2>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <div className="bg-deep">
        <CTA />
      </div>
    </>
  );
}
