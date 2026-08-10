import Link from "next/link";
import { footerNav, site, crisisReferral } from "@/lib/content/site";
import { home } from "@/lib/content/pages";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

/**
 * Footer.
 *
 * Carries the PDF's closing call-to-action verbatim — which is also where the
 * phrase "across Namibia and Africa" lands on every page, covering the
 * geography dropped when the two Vision statements were reconciled
 * (DESIGN.md §7).
 *
 * The crisis referral line is here sitewide, per BRIEF.md §3.
 */
export function Footer() {
  return (
    <footer className="bg-ink px-(--spacing-gutter) pt-(--spacing-section) pb-12 text-paper/70">
      <div className="mx-auto w-full max-w-[78rem]">
        <p className="text-display-m max-w-[36ch] text-paper">{home.closing}</p>

        <div className="mt-20 grid gap-12 border-t border-paper/15 pt-12 md:grid-cols-2 lg:grid-cols-4">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-micro mb-5 text-signal-raw">{group.title}</h2>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/70 underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] hover:text-paper hover:decoration-paper/50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-micro mb-5 text-signal-raw">Contact</h2>
            <address className="space-y-3 text-sm not-italic">
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper"
                >
                  {site.email}
                </a>
              </p>
              <p>
                <a
                  href={site.phoneHref}
                  className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper"
                >
                  {site.phone}
                </a>
              </p>
              <p className="text-paper/55">{site.postal}</p>
            </address>
          </div>
        </div>

        <div className="mt-16 border-t border-paper/15 pt-12">
          <NewsletterForm />
        </div>

        {/* Crisis referral — BRIEF.md §3. This site teaches prevention. It is
            not therapy and not crisis care, and it says so. */}
        <aside
          aria-labelledby="crisis-heading"
          className="mt-16 rounded-surface border border-paper/20 p-6 md:p-8"
        >
          <h2 id="crisis-heading" className="text-micro mb-4 text-paper">
            {crisisReferral.heading}
          </h2>
          <p className="max-w-[62ch] text-sm leading-relaxed text-paper/75">
            {crisisReferral.body}
          </p>
          <p className="text-micro mt-4 text-signal-raw">{crisisReferral.number}</p>
        </aside>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/15 pt-8 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. A Namibian social enterprise.
          </p>
          <p className="text-micro">Purpose · People · Planet</p>
        </div>
      </div>
    </footer>
  );
}
