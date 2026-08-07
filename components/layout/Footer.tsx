import Link from "next/link";
import { nav, org, programmes } from "@/lib/site";
import { Reveal } from "@/components/motion/scroll";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-mist/10 bg-ink">
      <img
        src="/images/desert-road.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/90 to-ink" />

      <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-14 lg:px-20">
        <Reveal>
          <p className="display-md max-w-4xl text-cream">{org.footerCta}</p>
        </Reveal>

        <div className="mt-20 grid gap-12 border-t border-mist/10 pt-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={`${basePath}/logo.png`}
              alt={org.name}
              width={441}
              height={132}
              className="h-16 w-auto"
            />
            <p className="mt-4 text-sm text-cream/55">{org.tagline}</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/50">
              A social enterprise making mental wellness practical, affordable
              and accessible for every community.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow text-azure">Explore</h2>
            <ul className="mt-5 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/60 transition-colors hover:text-azure"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-azure">Programmes</h2>
            <ul className="mt-5 space-y-2.5">
              {programmes.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/programmes/${p.slug}`}
                    className="text-sm text-cream/60 transition-colors hover:text-azure"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/community-counsellor"
                  className="text-sm text-cream/60 transition-colors hover:text-azure"
                >
                  Community Counsellor
                </Link>
              </li>
              <li>
                <Link
                  href="/partner"
                  className="text-sm text-cream/60 transition-colors hover:text-azure"
                >
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-azure">Contact</h2>
            <ul className="mt-5 space-y-2.5 text-sm text-cream/60">
              <li>
                <a
                  href={`mailto:${org.email}`}
                  className="transition-colors hover:text-azure"
                >
                  {org.email}
                </a>
              </li>
              <li>
                <a
                  href={org.phoneHref}
                  className="transition-colors hover:text-azure"
                >
                  {org.phone}
                </a>
              </li>
              <li>{org.location}</li>
              <li className="pt-2">
                <a
                  href={org.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-royal/40 px-4 py-2 text-royal-light transition-colors hover:bg-royal/10"
                >
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-mist/10 pt-8 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {org.name}. Building emotionally
            resilient communities across Namibia and Africa.
          </p>
          <p>{org.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
