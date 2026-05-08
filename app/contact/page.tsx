import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CTA, PageHero, SectionHeading } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Dariva.co about applications, partnerships, implementation, and community mental wellness in Namibia."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a serious conversation about community mental wellness"
        text="Reach out about applications, partnerships, implementation, funding, or bringing Dariva.co into a community setting."
      />
      <section className="section-pad bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Get in touch"
            title="Partnership starts with a clear next conversation."
            text="Dariva.co welcomes conversations with communities, funders, public-sector stakeholders, implementation partners, and people who want to serve."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: Mail },
              { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replaceAll(" ", "")}`, icon: Phone },
              { label: "WhatsApp", value: contact.whatsapp, href: `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`, icon: MessageCircle },
              { label: "Location", value: contact.location, href: "#", icon: MapPin }
            ].map((item) => {
              const Icon = item.icon;
              const content = (
                <StaggerItem className="h-full rounded-2xl border border-[#dce9ec] bg-[#fbfefd] p-6 transition hover:bg-[#f2f8f7]">
                  <Icon className="mb-7 text-[#0a8f9c]" size={26} />
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#5e7384]">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-[#0d2233]">{item.value}</p>
                </StaggerItem>
              );
              return item.href === "#" ? <div key={item.label}>{content}</div> : <Link key={item.label} href={item.href}>{content}</Link>;
            })}
          </Stagger>
        </div>
      </section>
      <section className="section-pad bg-[#f2f8f7]">
        <Reveal className="container-page rounded-2xl border border-[#dce9ec] bg-white p-8 text-center shadow-sm">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-[#0d2233] sm:text-5xl">
            Dariva.co is built for people who want prevention to become practical.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#5e7384]">
            Tell us what you are building, who you serve, and where community mental wellness could create lasting change.
          </p>
        </Reveal>
      </section>
      <CTA title="Ready to move from concern to action?" text="Apply, partner, or support the work of making care more accessible in Namibia." />
    </>
  );
}
