import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { BookingBlock } from "@/components/ui/BookingBlock";
import { contact } from "@/lib/content/pages";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.lede,
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title={contact.title} lede={contact.lede} />

      <Section ground="paper">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <EnquiryForm sourcePage="/contact" submitLabel="Send enquiry" />

          <div className="flex flex-col gap-10">
            <BookingBlock />

            <div>
              <h2 className="text-micro mb-5 text-signal">Direct</h2>
              <address className="space-y-3 text-sm not-italic text-quiet">
                <p>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
                  >
                    {site.email}
                  </a>
                </p>
                <p>
                  <a
                    href={site.phoneHref}
                    className="text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
                  >
                    {site.phone}
                  </a>
                </p>
                <p>{site.postal}</p>
              </address>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
