import { crisisReferral } from "@/lib/content/site";

/**
 * Crisis referral — BRIEF.md §3.
 *
 * Sits in the footer sitewide, and again on the Programme and Community
 * Counsellor pages, where a reader is closest to mistaking training for
 * treatment. Calm, factual, and it never pretends to be a crisis service.
 *
 * The number is a visible TODO(client) rather than a guessed one. A wrong
 * emergency number on a mental health site is worse than no number.
 */
export function CrisisNote({ inverted = false }: { inverted?: boolean }) {
  return (
    <aside
      aria-labelledby="crisis-inline"
      className={`rounded-surface border p-6 md:p-8 ${
        inverted ? "border-paper/20" : "border-ink/15 bg-wash/60"
      }`}
    >
      <h2
        id="crisis-inline"
        className={`text-micro mb-4 ${inverted ? "text-paper" : "text-ink"}`}
      >
        {crisisReferral.heading}
      </h2>
      <p
        className={`max-w-[62ch] text-sm leading-relaxed ${
          inverted ? "text-paper/75" : "text-quiet"
        }`}
      >
        {crisisReferral.body}
      </p>
      <p className={`text-micro mt-4 ${inverted ? "text-signal-raw" : "text-signal"}`}>
        {crisisReferral.number}
      </p>
    </aside>
  );
}
