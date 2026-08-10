import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Prose } from "@/components/ui/Prose";
import { CrisisNote } from "@/components/ui/CrisisNote";
import { ProgrammeInterestForm } from "@/components/forms/ProgrammeInterestForm";
import { communityCounsellor } from "@/lib/content/pages";
import { terms } from "@/lib/content/terms";
import { programmeFacts } from "@/lib/content/site";

export const metadata: Metadata = {
  title: communityCounsellor.title,
  description: communityCounsellor.body[0],
};

export default function CommunityCounsellorPage() {
  return (
    <>
      <PageHero
        eyebrow="Train to help"
        title={communityCounsellor.title}
        lede={communityCounsellor.tagline.join(" ")}
      />

      <Section ground="paper">
        <Reveal>
          <Prose>
            {communityCounsellor.body.map((p) => (
              <p key={p} className="text-lg">
                {p}
              </p>
            ))}
          </Prose>
        </Reveal>
      </Section>

      {/* This page is where the prevention/treatment line matters most: a
          reader here is closest to mistaking the training for therapy. */}
      <Section ground="wash" labelledBy="scope-heading">
        <SectionHead
          id="scope-heading"
          title="What this qualifies you to do — and what it does not"
          lede={`A Community ${terms.practitioner} is trained to listen well, to support responsibly, and to know when a situation needs someone else.`}
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="border-t border-ink/15 pt-6">
              <p className="text-micro mb-4 text-signal">This training prepares you to</p>
              <ul className="space-y-3 text-ink">
                <li>Listen actively and without judgement.</li>
                <li>Support colleagues, family and neighbours through ordinary difficulty.</li>
                <li>Hold confidentiality and keep clear boundaries.</li>
                <li>Recognise when something is beyond your role.</li>
                <li>Refer to the right service, early.</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="border-t border-ink/15 pt-6">
              <p className="text-micro mb-4 text-quiet/70">It does not make you</p>
              <ul className="space-y-3 text-quiet">
                <li>A therapist or psychologist.</li>
                <li>A crisis responder.</li>
                <li>A prescriber or diagnostician.</li>
                <li>A substitute for clinical care.</li>
              </ul>
            </div>
          </Reveal>
        </div>
        <div className="mt-16 max-w-[46rem]">
          <CrisisNote />
        </div>
      </Section>

      <Section ground="paper" id="register" labelledBy="register-heading">
        <SectionHead
          id="register-heading"
          title="Join the next cohort"
          lede={`${programmeFacts.durationMonths} months. ${programmeFacts.cohortSizePerTrainer} participants per trainer, so nobody is a face in a crowd.`}
        />
        <div className="mt-14">
          <ProgrammeInterestForm defaultProgramme={`Basic ${terms.practice}`} />
        </div>
      </Section>
    </>
  );
}
