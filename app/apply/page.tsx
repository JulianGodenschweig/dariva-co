import type { Metadata } from "next";
import { FAQAccordion } from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply to join Dariva.co's community counsellor development programme in Namibia, Africa."
};

const faqItems = [
  {
    question: "Is there a payment / investment required to enter the Programme?",
    answer: (
      <div className="space-y-3">
        <p>
          A programme similar to this one costs N$ 14,700.00 in Windhoek. Another Training programme
          costs N$ 3,500 for a workshop of one-week only - no peer reviewing with mentorship as our
          programme offers.
        </p>
        <p>
          As a non-profit organisation, to make this programme affordable and accessible, we ask that
          you make a minimal investment in two phases: an Administrative fee of N$ 190.00 (non-refundable
          and separate from the Training Fee); then
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>N$ 3,000.00 for the 3-month Training Programme</li>
        </ul>
        <p className="font-medium">OR</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>N$ 1,000 per month at N$ 83.30 per session, for 12 sessions in a month, for 3-months - the total equals N$ 3,000.00.</li>
        </ul>
      </div>
    )
  },
  {
    question: "How much is my Return on Investment / can I earn after successful completion of the Training - as a Community Mental Wellness Counsellor?",
    answer: (
      <div className="space-y-3">
        <p>
          This Programme is unique in that Successful Graduates of our programme progressing to be
          Trainers, in Months 4 - 6, earn N$ 3,500.00 per month for three months - earning more than
          double their initial investment within the first month of the Trainer programme.
        </p>
        <p>
          Successful Graduated Community Mental Wellness Counsellors are Employed by Dariva.co
          and have the potential to earn:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>N$ 2,400 - N$ 10,500 per month - depending on the number of consultations conducted.</li>
          <li>Prior / already Qualified and Experienced Counsellors can earn up to N$ 15,000 per month - depending on the number of Consultations conducted.</li>
        </ul>
      </div>
    )
  },
  {
    question: "I need a Sponsor for the Programme - how can you support me to acquire one?",
    answer: (
      <p>
        Because of your earning capability through the programme and as a Successful Graduate
        employed by Dariva.co, we can support you in writing a letter to your potential Sponsor,
        committing that should you successfully complete each month's training and evaluations, we will
        share your report card with your sponsor for each month's evaluation, and do a payment-plan
        for your sponsor with an interest for their investment into your training. We recommend an
        interest rate of up to 33.33% = N$ 1,000.00 additional to the investment total of N$ 3,000.00 -
        meaning we can do payments that total up to N$ 4,000.00 in return - timeline to be negotiated
        and agreed upon with your Sponsor.
      </p>
    )
  }
];

export default function ApplyPage() {
  return (
    <>
      <section className="about-hero">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] opacity-80">Apply</p>
        <h1>Step into a role that strengthens people around you</h1>
        <p>This application is for community-minded people ready to learn, serve responsibly, and help make mental wellness a normal part of everyday life.</p>
        <div className="river-wrap" aria-hidden="true">
          <svg className="river-svg" viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,45 C180,90 360,0 540,45 C720,90 900,0 1080,45 C1260,90 1440,0 1440,45 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.12)"/>
            <path d="M0,60 C200,20 400,80 600,60 C800,40 1000,80 1200,60 C1300,50 1380,65 1440,60 L1440,90 L0,90 Z" fill="rgba(255,255,255,0.07)"/>
          </svg>
        </div>
      </section>

      <section className="section-pad bg-white reveal">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto max-w-3xl text-center mb-14">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#10B981]">FAQ</p>
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-[#1A237E] sm:text-4xl lg:text-5xl">
                Frequently Asked Questions
              </h2>
            </div>
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#e8f4fd] reveal">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#10B981]">Apply</p>
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-[#1A237E] sm:text-4xl lg:text-5xl">
              Apply to join the programme
            </h2>
            <p className="mt-5 text-base leading-8 text-[#4e6878] sm:text-lg">
              Complete the form below to begin your application.
            </p>
          </div>
          <div className="w-full overflow-hidden rounded-2xl border border-[#b8d4d8] bg-white shadow-sm">
            <iframe
              src="https://forms.gle/TY2MECn6sDGrn23u6"
              width="100%"
              height="900"
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              style={{ display: "block" }}
              title="Dariva.co Application Form"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </section>
    </>
  );
}
