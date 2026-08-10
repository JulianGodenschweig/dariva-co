import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Buttons shift weight, not size — BRIEF.md §9. Radius is --radius-button
 * (fully round), taken from the script logo's round stroke terminals.
 *
 * Labels say what happens. "Submit", "Learn more" and "Click here" are not
 * used anywhere on this site.
 */

type Variant = "primary" | "signal" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-button px-6 py-3.5 " +
  "font-medium leading-none transition-[background-color,color,border-color,font-variation-settings,transform] " +
  "duration-200 ease-[var(--ease-out-quiet)] min-h-11 " +
  "hover:font-semibold active:translate-y-px " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-[#1b2470]",
  signal: "bg-signal text-paper hover:bg-[#00689f]",
  ghost:
    "border border-ink/20 text-ink bg-transparent hover:border-ink/50 hover:bg-ink/[0.03]",
};

/** On an --ink ground the primary/ghost variants invert. */
const onInk: Record<Variant, string> = {
  primary: "bg-paper text-ink hover:bg-white",
  signal: "bg-signal text-paper hover:bg-[#0a8fdb]",
  ghost:
    "border border-paper/30 text-paper bg-transparent hover:border-paper/70 hover:bg-paper/[0.06]",
};

function classes(variant: Variant, inverted: boolean, extra?: string) {
  return [base, inverted ? onInk[variant] : variants[variant], extra]
    .filter(Boolean)
    .join(" ");
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  inverted = false,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  inverted?: boolean;
  className?: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes(variant, inverted, className)}
      >
        {children}
        <span aria-hidden="true">↗</span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes(variant, inverted, className)}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  inverted = false,
  className,
  ...rest
}: ComponentProps<"button"> & { variant?: Variant; inverted?: boolean }) {
  return (
    <button {...rest} className={classes(variant, inverted, className)}>
      {children}
    </button>
  );
}

/**
 * A text link whose underline draws on hover, rather than appearing.
 * The underline is always present at rest for anything inside body copy —
 * removing it would leave colour as the only affordance, which fails WCAG 1.4.1.
 */
export function TextLink({
  href,
  children,
  external,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = [
    "text-signal underline decoration-signal/40 underline-offset-4",
    "transition-[text-decoration-color] duration-200 hover:decoration-signal",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <span aria-hidden="true"> ↗</span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
