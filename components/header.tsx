"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { navItems } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#dce9ec] bg-[#fbfefd]">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Dariva.co home">
          <Image src="/logo.png" alt="Dariva.co logo" width={441} height={132} priority className="h-auto w-[112px] sm:w-[132px]" />
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-[#dce9ec] bg-white/70 p-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-[#385466] transition hover:text-[#0d2233] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {active ? <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-[#e8f5f4]" transition={{ type: "spring", stiffness: 360, damping: 32 }} /> : null}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/contact" className="text-sm font-semibold text-[#0a8f9c] transition hover:text-[#06646f]">
            Partner
          </Link>
          <Link href="/apply" className="rounded-full bg-[#0d2233] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0a8f9c]">
            Apply Now
          </Link>
        </div>
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#dce9ec] bg-white md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-[#dce9ec] bg-white px-4 py-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-[#0d2233] hover:bg-[#f2f8f7]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.nav>
      ) : null}
    </header>
  );
}
