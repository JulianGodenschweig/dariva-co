import type { Metadata } from "next";
import { ApplicationForm } from "@/components/application-form";
import { PageHero, SectionHeading } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply to join Dariva.co's community counsellor development programme in Namibia."
};

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Apply"
        title="Step into a role that strengthens people around you"
        text="This application is for community-minded people ready to learn, serve responsibly, and help make mental wellness a normal part of everyday life."
      />
      <section className="section-pad bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeading
              eyebrow="Who should apply"
              title="People with trust, patience, and a real reason to serve."
              text="You do not need to arrive as an expert. You need commitment, confidentiality, willingness to learn, and respect for the responsibility of care."
            />
            <Stagger className="mt-8 grid gap-3">
              {[
                "Community leaders and organisers",
                "Youth mentors and caregivers",
                "People interested in mental wellness and GBV prevention",
                "Applicants seeking purpose-led income opportunities",
                "Partners nominating trusted community members"
              ].map((item) => (
                <StaggerItem key={item} className="rounded-2xl border border-[#dce9ec] bg-[#fbfefd] p-4 text-sm font-semibold text-[#0d2233]">
                  {item}
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="mt-8 rounded-2xl border border-[#dce9ec] bg-[#f2f8f7] p-6">
              <h2 className="text-lg font-semibold text-[#0d2233]">Privacy reassurance</h2>
              <p className="mt-3 text-sm leading-7 text-[#5e7384]">
                Dariva.co treats application information with care. Your details are used for programme review and follow-up only.
              </p>
            </Reveal>
          </div>
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}
