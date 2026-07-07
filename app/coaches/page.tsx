import type { Metadata } from "next";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { coaches } from "@/lib/coaches";
import { CTA, SectionHeading } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Book a Coach",
  description: "Pick a Dariva.co coach and book a session that works for you.",
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

export default function CoachesPage() {
  return (
    <>
      <section className="about-hero">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] opacity-80">Book a Coach</p>
        <h1>Move forward. Book a coach.</h1>
        <p>Pick a Dariva.co coach and book a session that works for you — no forms, no waiting.</p>
        <div className="river-wrap" aria-hidden="true">
          <svg className="river-svg" viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,45 C180,90 360,0 540,45 C720,90 900,0 1080,45 C1260,90 1440,0 1440,45 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.12)" />
            <path d="M0,60 C200,20 400,80 600,60 C800,40 1000,80 1200,60 C1300,50 1380,65 1440,60 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.07)" />
          </svg>
        </div>
      </section>

      <section className="section-pad reveal">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Our Coaches"
            title="Choose who you'd like to talk to."
            text="Every coach sets their own availability. Booking takes a minute and confirms straight to your calendar."
          />

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coaches.map((coach) => {
              const waText = encodeURIComponent(`Hi Dariva.co, I'd like to book a session with ${coach.name}.`);
              const bookHref = coach.bookingUrl ?? `https://wa.me/264813404364?text=${waText}`;
              const bookLabel = coach.bookingUrl ? "Book a Session" : "Message to Book";
              const BookIcon = coach.bookingUrl ? CalendarCheck : MessageCircle;

              return (
                <StaggerItem key={coach.id} className="rounded-2xl border border-primary/10 bg-card p-6 card-lift">
                  <div
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #1A237E, #1B9AD6)" }}
                    aria-hidden="true"
                  >
                    {initials(coach.name)}
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-[#1A237E]">{coach.name}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-[#10B981]">{coach.role}</p>
                  <p className="mt-3 text-sm leading-7 text-[#4e6878]">{coach.bio}</p>
                  <a
                    href={bookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1B9AD6] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1A237E] hover:shadow-lg min-h-[48px]"
                  >
                    <BookIcon size={17} />
                    {bookLabel}
                  </a>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <div className="bg-deep">
        <CTA
          title="Not sure who to pick?"
          text="Message us on WhatsApp and we'll match you with the right coach."
          primary={{ href: "https://wa.me/264813404364", label: "WhatsApp Us" }}
          secondary={{ href: "/contact", label: "Contact" }}
        />
      </div>
    </>
  );
}
