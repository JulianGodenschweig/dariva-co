import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * List treatments.
 *
 * BRIEF.md §13 bans eight identical cards with identical padding, radius and
 * shadow — so there are no cards here. A list of topics is set as a list, and
 * the only structure it gets is the rhythm of the type and a hairline that
 * separates rows rather than boxing them.
 */

/**
 * A dense list of short items — topics, values, benefits.
 *
 * Deliberately unnumbered. These are not sequences: "Build healthier families"
 * is not step 01 of anything, and numbering it would be the decorative
 * ordinal BRIEF.md §13 bans. The only numbered lists on this site are the
 * three programme months and the long-term goals, both of which are ordered
 * in reality.
 */
export function TermList({
  items,
  inverted = false,
  columns = 2,
}: {
  items: readonly string[];
  inverted?: boolean;
  columns?: 1 | 2 | 3;
}) {
  const cols =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : columns === 2
        ? "sm:grid-cols-2"
        : "";

  return (
    <ul className={`grid gap-x-10 ${cols}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-baseline gap-4 border-b py-4 ${
            inverted ? "border-paper/15" : "border-ink/10"
          }`}
        >
          <span
            aria-hidden="true"
            className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
              inverted ? "bg-paper/70" : "bg-signal"
            }`}
          />
          <span className={inverted ? "text-paper/85" : "text-ink"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A list where the items are outcomes rather than an index — no numbering,
 * because these are not a sequence and BRIEF.md §13 is explicit about that.
 */
export function OutcomeList({
  items,
  inverted = false,
}: {
  items: readonly string[];
  inverted?: boolean;
}) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-3">
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-button border px-4 py-2 text-sm ${
            inverted
              ? "border-paper/25 text-paper/85"
              : "border-ink/15 text-ink"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Body copy at a readable measure. */
export function Prose({
  children,
  inverted = false,
}: {
  children: ReactNode;
  inverted?: boolean;
}) {
  return (
    <div
      className={`measure space-y-6 text-base leading-relaxed ${
        inverted ? "text-paper/75" : "text-quiet"
      }`}
    >
      {children}
    </div>
  );
}

/** Two-column block: heading left, content right. The page's workhorse. */
export function Split({
  heading,
  lede,
  children,
  inverted = false,
}: {
  heading: string;
  lede?: string;
  children: ReactNode;
  inverted?: boolean;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
      <Reveal>
        <div className="lg:sticky lg:top-28">
          <h2 className={`text-display-m ${inverted ? "text-paper" : "text-ink"}`}>
            {heading}
          </h2>
          {lede ? (
            <p className={`mt-5 ${inverted ? "text-paper/70" : "text-quiet"}`}>{lede}</p>
          ) : null}
        </div>
      </Reveal>
      <Reveal delay={80}>{children}</Reveal>
    </div>
  );
}
