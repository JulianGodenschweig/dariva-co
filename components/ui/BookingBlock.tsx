import { site, TODO_CLIENT } from "@/lib/content/site";
import { ButtonLink } from "./Button";

/**
 * Direct booking.
 *
 * BRIEF.md §4 asked for the existing Calendly coach-booking embed to be
 * preserved. There was none to preserve: a search of every branch and the full
 * git history turned up only `feature/lms:lib/coaches.ts`, which declares an
 * OPTIONAL `bookingUrl?: string` that is never set, with a code comment saying
 * it falls back to WhatsApp "until a real link exists". No Calendly account,
 * URL or embed exists in this repo.
 *
 * So this is the conscious re-implementation: the slot is built and labelled,
 * the WhatsApp fallback that was actually live still works, and the missing
 * link is a visible TODO(client) rather than an invented URL.
 *
 * To wire Calendly: set NEXT_PUBLIC_CALENDLY_URL and this renders the link
 * instead. Deliberately a link, not an iframe embed — a third-party iframe on
 * a Namibian mobile connection costs more than the booking is worth, and it
 * cannot be made keyboard-accessible from here.
 */
export function BookingBlock() {
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <aside className="rounded-surface border border-ink/15 p-8">
      <h2 className="text-micro mb-5 text-signal">Rather just talk?</h2>

      {calendly ? (
        <>
          <p className="mb-6 text-sm text-quiet">
            Pick a time that suits you. Thirty minutes, no obligation.
          </p>
          <ButtonLink href={calendly} variant="primary" external>
            Book a discovery call
          </ButtonLink>
        </>
      ) : (
        <>
          <p className="mb-6 text-sm text-quiet">
            Message us on WhatsApp and we will find a time. Usually same day.
          </p>
          <ButtonLink href={site.whatsapp} variant="primary" external>
            Book a call on WhatsApp
          </ButtonLink>
          <p className="text-micro mt-6 text-quiet/70">{TODO_CLIENT.calendly}</p>
        </>
      )}

      <p className="mt-8 border-t border-ink/10 pt-6 text-sm text-quiet">
        Or email{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-signal underline decoration-signal/40 underline-offset-4 hover:decoration-signal"
        >
          {site.email}
        </a>
      </p>
    </aside>
  );
}
