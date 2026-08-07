import type { Metadata } from "next";
import EnquiryForm from "@/components/app/EnquiryForm";
import { Reveal } from "@/components/motion/scroll";
import { Eyebrow, PageHeader, Section } from "@/components/ui";
import { CRISIS_NOTE } from "@/lib/assessment";
import { contact, org } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.body,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={contact.title}
        lede={contact.body}
        image="/images/hero-plains.jpg"
        alt="Open plains at sunrise"
      />

      <Section className="surface-dark">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Send us a message</Eyebrow>
              <h2 className="display-md mt-6 text-cream">
                Tell us what you need.
              </h2>
              <p className="mt-4 text-cream/60">
                Training, workplace coaching, community partnerships or
                sponsorship — start here and we will come back to you.
              </p>
            </Reveal>
            <div className="mt-10">
              <EnquiryForm />
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-6">
              <Reveal>
                <div className="rounded-2xl border border-mist/12 bg-mist/[0.03] p-8">
                  <h2 className="display-sm text-cream">Direct</h2>
                  <dl className="mt-6 space-y-5">
                    <div>
                      <dt className="eyebrow text-azure">Email</dt>
                      <dd className="mt-2">
                        <a
                          href={`mailto:${org.email}`}
                          className="text-cream transition-colors hover:text-azure"
                        >
                          {org.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-azure">Phone</dt>
                      <dd className="mt-2">
                        <a
                          href={org.phoneHref}
                          className="text-cream transition-colors hover:text-azure"
                        >
                          {org.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-azure">Location</dt>
                      <dd className="mt-2 text-cream">{org.location}</dd>
                    </div>
                  </dl>
                  <a
                    href={org.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-royal/45 px-6 py-3.5 font-semibold text-royal-light transition-colors hover:bg-royal/10"
                  >
                    Message us on WhatsApp
                  </a>
                </div>
              </Reveal>

              <Reveal delay={2}>
                <div className="rounded-2xl border border-azure/25 bg-azure/[0.06] p-8">
                  <p className="eyebrow text-azure">Please note</p>
                  <p className="mt-4 text-sm leading-relaxed text-cream/75">
                    {CRISIS_NOTE}
                  </p>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
