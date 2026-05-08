import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#0a8f9c]">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left"
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-[#0d2233] sm:text-4xl lg:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-8 text-[#5e7384] sm:text-lg">{text}</p> : null}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  primary
}: {
  eyebrow: string;
  title: string;
  text: string;
  primary?: { href: string; label: string };
}) {
  return (
    <section className="aurora relative overflow-hidden">
      <div className="absolute inset-0 soft-grid opacity-45" />
      <div className="container-page relative grid min-h-[62vh] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.035em] text-[#0d2233] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#496373] sm:text-xl">{text}</p>
          {primary ? (
            <Link href={primary.href} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0d2233] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0a8f9c]">
              {primary.label}
              <ArrowRight size={17} />
            </Link>
          ) : null}
        </Reveal>
        <Reveal delay={0.15} className="hidden lg:block">
          <AbstractSystem />
        </Reveal>
      </div>
    </section>
  );
}

export function FeatureGrid({
  items,
  columns = "three"
}: {
  items: { title: string; description?: string; text?: string; icon: LucideIcon }[];
  columns?: "three" | "four";
}) {
  return (
    <Stagger className={`grid gap-4 ${columns === "four" ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <StaggerItem key={item.title} className="surface rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(13,34,51,0.12)]">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f5f4] text-[#0a8f9c]">
              <Icon size={23} />
            </div>
            <h3 className="text-xl font-semibold tracking-[-0.01em] text-[#0d2233]">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#5e7384]">{item.description ?? item.text}</p>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

export function Timeline({ items }: { items: { kicker: string; title: string; text: string }[] }) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-0 hidden h-full w-px bg-[#dce9ec] md:block" />
      <div className="grid gap-5">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.05} className="relative grid gap-4 rounded-2xl border border-[#dce9ec] bg-white p-6 shadow-sm md:grid-cols-[6rem_1fr] md:pl-14">
            <span className="absolute left-5 top-8 hidden h-3 w-3 rounded-full bg-[#e76f51] ring-8 ring-[#fbfefd] md:block" />
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0a8f9c]">{item.kicker}</p>
            <div>
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#0d2233]">{item.title}</h3>
              <p className="mt-3 max-w-3xl text-base leading-8 text-[#5e7384]">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function StatBand() {
  const stats = [
    { value: "3", label: "programme phases" },
    { value: "6", label: "outcome areas tracked" },
    { value: "24/7", label: "digital access ambition" },
    { value: "1", label: "community-owned system" }
  ];

  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StaggerItem key={stat.label} className="rounded-2xl border border-[#dce9ec] bg-white p-6 shadow-sm">
          <p className="text-4xl font-semibold tracking-[-0.04em] text-[#0d2233] sm:text-5xl">{stat.value}</p>
          <p className="mt-3 text-sm font-medium text-[#5e7384]">{stat.label}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function CTA({
  title = "Build the next layer of community care.",
  text = "Apply to join the programme, partner on implementation, or start a conversation about bringing Dariva.co into your community.",
  primary = { href: "/apply", label: "Apply Now" },
  secondary = { href: "/contact", label: "Partner With Us" }
}: {
  title?: string;
  text?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="section-pad bg-[#0d2233] text-white">
      <Reveal className="container-page text-center">
        <h2 className="text-balance mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">{text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={primary.href} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0d2233] transition hover:bg-[#dff1ef]">
            {primary.label}
            <ArrowRight size={17} />
          </Link>
          <Link href={secondary.href} className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            {secondary.label}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export function PricingCards({
  items
}: {
  items: {
    id: string;
    name: string;
    price: string;
    duration: string;
    features: string[];
    cta: string;
    href: string;
    featured?: boolean;
  }[];
}) {
  return (
    <Stagger className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
      {items.map((card) => (
        <StaggerItem
          key={card.id}
          className={`rounded-2xl border p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(13,34,51,0.12)] ${
            card.featured
              ? "border-[#0a8f9c] bg-[#0d2233] text-white"
              : "border-[#dce9ec] bg-white"
          }`}
        >
          {card.featured && (
            <span className="mb-4 inline-block rounded-full bg-[#0a8f9c]/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#77d2d8]">
              Featured
            </span>
          )}
          <h3 className={`text-2xl font-semibold tracking-[-0.02em] ${card.featured ? "text-white" : "text-[#0d2233]"}`}>
            {card.name}
          </h3>
          <p className={`mt-2 text-sm ${card.featured ? "text-white/60" : "text-[#5e7384]"}`}>
            {card.duration}
          </p>
          <p className={`mt-5 text-3xl font-semibold tracking-[-0.03em] ${card.featured ? "text-white" : "text-[#0d2233]"}`}>
            {card.price}
          </p>
          <ul className="mt-6 grid gap-3">
            {card.features.map((feature) => (
              <li key={feature} className={`flex items-start gap-2 text-sm ${card.featured ? "text-white/80" : "text-[#496373]"}`}>
                <svg className={`mt-0.5 h-4 w-4 shrink-0 ${card.featured ? "text-[#77d2d8]" : "text-[#0a8f9c]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <a
            href={card.href}
            className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
              card.featured
                ? "bg-white text-[#0d2233] hover:bg-[#dff1ef]"
                : "bg-[#0d2233] text-white hover:bg-[#0a8f9c]"
            }`}
          >
            {card.cta}
            <ArrowRight size={17} />
          </a>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function AbstractSystem() {
  return (
    <div className="relative mx-auto aspect-square max-w-[520px]">
      <div className="absolute inset-8 rounded-full border border-[#cfe4e5]" />
      <div className="absolute inset-20 rounded-full border border-[#dce9ec]" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-[#0d2233] p-5 text-white shadow-2xl">
        <p className="text-sm font-semibold">Community care</p>
        <p className="mt-2 text-xs leading-5 text-white/70">Training, trust, digital access, and measurable support.</p>
      </div>
      {[
        ["Training", "left-4 top-20", "#0a8f9c"],
        ["Digital access", "right-0 top-36", "#e76f51"],
        ["Mentorship", "bottom-16 left-12", "#c8943c"],
        ["Impact data", "bottom-8 right-14", "#06646f"]
      ].map(([label, position, color]) => (
        <div key={label} className={`absolute ${position} rounded-2xl border border-white/80 bg-white/88 px-5 py-4 shadow-xl backdrop-blur`}>
          <div className="mb-2 h-2 w-10 rounded-full" style={{ backgroundColor: color }} />
          <p className="text-sm font-semibold text-[#0d2233]">{label}</p>
        </div>
      ))}
    </div>
  );
}
