import type { Metadata } from "next";
import { CTA, FeatureGrid, PageHero, SectionHeading, StatBand } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { impactCards } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impact",
  description: "Dariva.co's impact model focuses on preventative wellness, GBV driver reduction, economic opportunity, and scalable community care in Namibia."
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Proof that prevention can become community infrastructure"
        text="Dariva.co measures what matters: emotional literacy, help-seeking, safer relationships, trained local capacity, and economic opportunity through care work."
        primary={{ href: "/contact", label: "Discuss Partnership" }}
      />
      <section className="section-pad bg-white">
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
      <section className="section-pad bg-[#e9f3f1]">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Measurement" title="A serious movement needs a serious learning loop." />
          <div className="mt-12">
            <StatBand />
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              ["Local insight", "Community feedback shows what is working, where trust is growing, and where support must improve."],
              ["Partner reporting", "Implementation partners can see activity, reach, outcomes, and learning in a credible format."],
              ["Adaptive delivery", "The model is built to refine training, referral pathways, and digital access over time."]
            ].map(([title, text]) => (
              <Reveal key={title} className="rounded-2xl border border-[#b8d4d8] bg-white p-6">
                <h2 className="text-xl font-semibold text-[#071822]">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#4e6878]">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="National potential"
            title="From local trust to a national care network."
            text="Dariva.co can begin community by community, then connect trained counsellors, referral relationships, digital tools, and partner learning into a wider Namibian mental wellness system."
          />
          <Stagger className="grid gap-4">
            {["Pilot communities", "Regional partner network", "Counsellor economy", "National prevention infrastructure"].map((step, index) => (
              <StaggerItem key={step} className="rounded-2xl border border-[#b8d4d8] bg-[#f6faf9] p-6">
                <p className="text-sm font-bold text-[#00897b]">0{index + 1}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[#071822]">{step}</h2>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <section className="section-pad bg-[#071822] text-white">
        <Reveal className="container-page text-center">
          <p className="mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
            “A community that can speak about pain early is a community with more room for dignity, leadership, and safety.”
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-white/52">Dariva.co community voice</p>
        </Reveal>
      </section>
      <CTA />
    </>
  );
}
