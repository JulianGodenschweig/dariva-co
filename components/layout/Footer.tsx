import Link from "next/link";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { navItems, contact, footerCta, programmes } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-ink text-white">
      <div className="aurora opacity-30" aria-hidden="true" />

      <div className="container-page relative z-10 py-20">
        <p className="t-h3 max-w-3xl font-heading text-white/90">
          {footerCta}
        </p>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-lg font-bold">
              Dariva<span className="text-cyan-bright">.co</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              A social enterprise making mental wellness practical, affordable
              and accessible for every community.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-cyan-bright">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-cyan-bright">Programmes</p>
            <ul className="mt-4 space-y-2.5">
              {programmes.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/programmes/${p.slug}`}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/community-counsellor"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Community Counsellor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-cyan-bright">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-2.5 text-white/60 transition-colors hover:text-white"
                >
                  <Mail size={16} className="mt-0.5 shrink-0" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-white/60 transition-colors hover:text-white"
                >
                  <MessageCircle size={16} className="mt-0.5 shrink-0" />
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                {contact.location}
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-8 text-xs text-white/40">
          © {new Date().getFullYear()} Dariva.co. Building emotionally resilient
          communities across Namibia and Africa.
        </p>
      </div>
    </footer>
  );
}
