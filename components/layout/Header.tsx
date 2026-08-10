"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content/site";

/**
 * Header — DESIGN.md §3.
 *
 * Wordmark set in Geist Mono and parenthesised; nav lowercase and
 * right-aligned. The mobile panel is a plain disclosure, not a portal: it
 * stays in DOM order so tab order is correct without a focus trap, and browser
 * find still reaches the links.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change, so a tap that navigates does not leave the panel up.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes. Scroll is never locked — BRIEF.md §3, never trap scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[78rem] items-center justify-between gap-6 px-(--spacing-gutter) py-4">
        <Link
          href="/"
          className="text-micro text-ink transition-colors hover:text-signal"
          aria-label={`${site.name} — home`}
        >
          ({site.name.toUpperCase()})
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm lowercase transition-colors ${
                  active ? "text-signal" : "text-quiet hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="text-micro rounded-button bg-ink px-4 py-2.5 text-paper transition-colors hover:bg-signal"
          >
            Book a call
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="text-micro -mr-2 inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-ink md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-ink/8 bg-paper px-(--spacing-gutter) pb-6 md:hidden"
      >
        <nav aria-label="Primary, mobile" className="flex flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-12 items-center border-b border-ink/8 text-base lowercase text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-button bg-ink px-6 text-paper"
          >
            Book a discovery call
          </Link>
        </nav>
      </div>
    </header>
  );
}
