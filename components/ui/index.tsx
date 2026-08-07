import Link from "next/link";
import type { ReactNode } from "react";
import { asset } from "@/lib/asset";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
  external = false,
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300";
  const styles = {
    solid:
      "bg-azure text-ink hover:bg-azure-light hover:shadow-[0_0_36px_-6px_rgba(42,168,246,0.6)]",
    outline:
      "border border-mist/30 text-cream hover:border-azure hover:text-azure hover:bg-azure/5",
    ghost: "text-cream/80 hover:text-azure",
  }[variant];

  const content = (
    <>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {content}
    </Link>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`eyebrow flex items-center gap-3 text-azure ${className}`}>
      <span aria-hidden="true" className="h-px w-8 bg-azure/60" />
      {children}
    </p>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-mist/20 bg-mist/5 px-4 py-2 text-sm text-cream/85 transition-colors duration-300 hover:border-azure/50 hover:text-azure">
      {children}
    </span>
  );
}

export function Tick({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-cream/80">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="mt-1 h-4 w-4 shrink-0 text-royal-light"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 10.5 8 14.5 16 5.5" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

export function Dot({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-cream/75">
      <span
        aria-hidden="true"
        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-azure"
      />
      <span>{children}</span>
    </li>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 py-24 md:px-14 md:py-32 lg:px-20 ${className}`}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  image,
  alt,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  image: string;
  alt: string;
}) {
  return (
    <header className="relative isolate grain min-h-[62vh] overflow-hidden pt-32">
      <img
        src={asset(image)}
        alt={alt}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 scrim-full" />
      <div className="mx-auto flex min-h-[46vh] w-full max-w-7xl flex-col justify-end px-6 pb-16 md:px-14 lg:px-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display-lg mt-6 max-w-4xl text-cream">{title}</h1>
        {lede ? (
          <p className="lede mt-6 max-w-2xl text-cream/75">{lede}</p>
        ) : null}
      </div>
    </header>
  );
}
