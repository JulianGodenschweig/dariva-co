import type { ReactNode } from "react";
import { Check } from "lucide-react";

/**
 * The content draft repeats three shapes over and over: a titled section, a
 * bag of short labels, and a benefits list. Building those three properly once
 * is what keeps eleven pages from becoming eleven piles of bespoke JSX.
 */

type Tone = "light" | "warm" | "dark" | "ink";

const toneClasses: Record<Tone, string> = {
  light: "bg-white text-ink",
  warm: "bg-sand text-ink",
  dark: "bg-navy-deep text-white",
  ink: "bg-navy-ink text-white",
};

interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  /** Adds the drifting aurora field. Only meaningful on dark tones. */
  aurora?: boolean;
  className?: string;
}

export function Section({
  children,
  tone = "light",
  id,
  aurora = false,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden section-pad ${toneClasses[tone]} ${className}`}
    >
      {aurora && <div className="aurora opacity-40" aria-hidden="true" />}
      <div className="container-page relative z-10">{children}</div>
    </section>
  );
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  tagline?: string;
  body?: readonly string[] | string;
}

/** The dark banner every interior page opens with, under the fixed navbar. */
export function PageHero({ eyebrow, title, tagline, body }: PageHeroProps) {
  const paragraphs =
    typeof body === "string" ? [body] : body ? [...body] : [];

  return (
    <section className="relative overflow-hidden bg-navy-ink pb-20 pt-36 sm:pb-28 sm:pt-44">
      <div className="aurora opacity-45" aria-hidden="true" />

      <div className="container-page relative z-10">
        <p className="eyebrow reveal text-cyan-bright">{eyebrow}</p>
        <h1 className="t-h1 reveal mt-4 max-w-4xl text-white">{title}</h1>

        {tagline && (
          <p className="reveal mt-6 max-w-2xl font-heading text-xl font-semibold text-white/80 sm:text-2xl">
            {tagline}
          </p>
        )}

        {paragraphs.length > 0 && (
          <div className="reveal mt-7 max-w-2xl space-y-4">
            {paragraphs.map((text) => (
              <p key={text} className="t-lead text-white/60">
                {text}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** Inverts text colours for use on dark tones. */
  invert?: boolean;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  invert = false,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={`reveal max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className={`eyebrow ${invert ? "text-cyan-bright" : "text-cyan"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`t-h2 mt-3 ${invert ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {lead && (
        <p
          className={`t-lead mt-5 ${invert ? "text-white/70" : "text-ink-muted"}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

interface PillGridProps {
  items: readonly string[];
  invert?: boolean;
}

/** Short labels — "Communities", "Self-awareness", "Integrity". */
export function PillGrid({ items, invert = false }: PillGridProps) {
  return (
    <ul className="reveal-group mt-10 flex flex-wrap gap-2.5">
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            invert
              ? "border-white/15 bg-white/5 text-white/85 hover:border-cyan-bright/50 hover:bg-white/10"
              : "border-line bg-sand-warm text-ink-muted hover:border-cyan/40 hover:text-ink"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

interface CheckListProps {
  items: readonly string[];
  invert?: boolean;
  columns?: 1 | 2 | 3;
}

/** Outcome and benefit lists — the "✔ Build confidence" shape from the draft. */
export function CheckList({
  items,
  invert = false,
  columns = 2,
}: CheckListProps) {
  const columnClass = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <ul className={`reveal-group mt-10 grid gap-x-8 gap-y-4 ${columnClass}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              invert ? "bg-emerald/25 text-emerald-bright" : "bg-emerald/12 text-emerald"
            }`}
          >
            <Check size={12} strokeWidth={3} />
          </span>
          <span
            className={`text-[0.975rem] leading-relaxed ${
              invert ? "text-white/75" : "text-ink-muted"
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

interface StatementProps {
  children: ReactNode;
  invert?: boolean;
}

/** A single sentence given room to land — used for the draft's closing lines. */
export function Statement({ children, invert = false }: StatementProps) {
  return (
    <p
      className={`reveal t-h3 mt-14 max-w-3xl font-heading leading-snug ${
        invert ? "text-white/90" : "text-ink"
      }`}
    >
      {children}
    </p>
  );
}
