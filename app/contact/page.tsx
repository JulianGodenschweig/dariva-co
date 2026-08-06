import type { Metadata } from "next";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { PageHero, Section } from "@/components/ui/primitives";
import { ContactForm } from "@/components/sections/ContactForm";
import { contact, contactPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: contactPage.body,
};

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: contact.phone,
    href: contact.whatsapp,
  },
  {
    icon: MapPin,
    label: "Location",
    value: contact.location,
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={contactPage.title}
        body={contactPage.body}
      />

      <Section tone="warm">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div className="reveal">
            <h2 className="t-h3 font-heading text-ink">Reach us directly</h2>

            <ul className="mt-8 space-y-4">
              {channels.map(({ icon: Icon, label, value, href }) => {
                const body = (
                  <>
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                      <Icon size={19} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-ink-faint">
                        {label}
                      </span>
                      <span className="mt-0.5 block break-words font-medium text-ink">
                        {value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-cyan/40"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
                        {body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="reveal rounded-3xl border border-line bg-white p-8 sm:p-10">
            <h2 className="t-h3 font-heading text-ink">Send us a message</h2>
            <p className="mt-3 text-ink-muted">
              We read everything that comes through here.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
