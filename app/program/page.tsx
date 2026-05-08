import type { Metadata } from "next";
import { Brain, Handshake, HeartPulse, MessagesSquare, Route, UsersRound } from "lucide-react";
import { benefits, journey } from "@/lib/content";
import { CTA, FeatureGrid, PageHero, SectionHeading, Timeline } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Program",
  description: "Dariva.co's train-the-trainer model develops community counsellors through learning, practice, and incentive-based service."
};

export default function ProgramPage() {
  return (
    <>
      <PageHero
        eyebrow="Program"
        title="A practical path from training to trusted community care"
        text="Dariva.co develops community counsellors through a preventative mental wellness model that builds confidence, leadership, referral awareness, and income pathways."
        primary={{ href: "/apply", label: "Apply to Join" }}
      />
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Overview"
            title="The programme turns care into capability."
            text="Through a train-the-trainer approach, Dariva.co equips people to learn, facilitate, mentor, and support others with clear boundaries and continuous support."
          />
          <div className="mt-12">
            <FeatureGrid
              items={[
                { title: "Mental wellness foundations", text: "Emotional literacy, stress, trauma awareness, and everyday support practices.", icon: Brain },
                { title: "GBV awareness", text: "Understanding drivers, warning signs, safer conversations, and referral pathways.", icon: HeartPulse },
                { title: "Leadership and communication", text: "Facilitation, trust-building, confidentiality, and community presence.", icon: MessagesSquare }
              ]}
            />
          </div>
        </div>
      </section>
      <section className="section-pad bg-[#f2f8f7]">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="The 3 phases"
            title="Learn. Practice. Earn impact."
            text="Each phase deepens skill, responsibility, and real-world contribution."
          />
          <Timeline items={journey} />
        </div>
      </section>
      <section className="section-pad bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Benefits"
            title="A programme for personal growth and public value."
            text="Dariva.co is designed to strengthen the person, the household, and the community network around them."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <StaggerItem key={benefit} className="rounded-2xl border border-[#dce9ec] bg-[#fbfefd] p-5">
                <p className="font-semibold text-[#0d2233]">{benefit}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <section className="section-pad bg-[#0d2233] text-white">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {[
            { title: "Training", icon: Route, text: "Structured learning with practical community application." },
            { title: "Mentorship", icon: Handshake, text: "Guidance, feedback, and ethical boundaries as counsellors grow." },
            { title: "Network", icon: UsersRound, text: "A connected care economy with digital access and ongoing support." }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/6 p-6">
                <Icon className="mb-6 text-[#77d2d8]" size={28} />
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/68">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>
      <CTA />
    </>
  );
}
