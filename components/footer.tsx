import Image from "next/image";
import Link from "next/link";
import { contact, navItems } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-[#dce9ec] bg-[#0d2233] text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image src="/logo.png" alt="Dariva.co logo" width={441} height={132} className="mb-5 h-auto w-[142px] rounded bg-white px-3 py-2" />
          <p className="max-w-md text-sm leading-7 text-white/72">
            Dariva.co builds emotionally resilient, self-sustaining communities where mental wellness is accessible, normalised, and practiced.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/56">Explore</h2>
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/72 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/56">Contact</h2>
          <div className="grid gap-2 text-sm text-white/72">
            <a href={`mailto:${contact.email}`} className="transition hover:text-white">{contact.email}</a>
            <span>{contact.phone}</span>
            <span>{contact.location}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-col gap-2 text-xs text-white/52 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dariva.co. All rights reserved.</p>
          <p>Community care, built with dignity.</p>
        </div>
      </div>
    </footer>
  );
}
