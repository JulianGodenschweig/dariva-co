"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, org } from "@/lib/site";
import { ScrollProgress, useScrolled } from "@/components/motion/scroll";

export default function Navbar() {
  const scrolled = useScrolled(60);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer on navigation, and never leave the body locked.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <ScrollProgress />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "glass border-b border-sand/10 py-3"
            : "border-b border-transparent py-6"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-14 lg:px-20"
        >
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-cream"
          >
            Dariva<span className="text-ochre">.co</span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative text-sm transition-colors duration-300 ${
                      active ? "text-ochre" : "text-cream/75 hover:text-cream"
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1.5 left-0 h-px w-full bg-ochre"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/assessment"
              className="hidden rounded-full bg-ochre px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-ochre-light md:inline-flex"
            >
              Free Check-In
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sand/20 text-cream lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-[1.5px] w-4 bg-current transition-opacity duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className={`fixed inset-0 z-40 bg-ink/97 backdrop-blur-xl transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-b border-sand/10 py-4 font-display text-2xl text-cream transition-colors hover:text-ochre"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-4">
            <Link
              href="/assessment"
              className="block rounded-full bg-ochre px-6 py-4 text-center font-semibold text-ink"
            >
              Take the Free Wellness Check-In
            </Link>
            <a
              href={`mailto:${org.email}`}
              className="block text-center text-sm text-cream/60"
            >
              {org.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
