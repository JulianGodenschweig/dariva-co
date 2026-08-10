import { terms } from "./terms";

/**
 * Verified facts only.
 *
 * Everything in this file is traceable either to the content PDF
 * (Dariva_co_Website_Development_Content_Draft__29_07_2026.pdf) or to the
 * verified fact list in BRIEF.md §7. Nothing here is invented.
 *
 * Anything the design wants but which is not verified is a TODO_CLIENT entry
 * below, rendered visibly on the page rather than filled with a plausible
 * guess. A fabricated participant count on a donor-facing site is worse than
 * an empty slot.
 */

export const site = {
  name: "Dariva.co",
  domain: "https://www.dariva.co",
  /** PDF §12 CONTACT */
  email: "dariva.co001@gmail.com",
  phone: "+264 81 340 4364",
  phoneHref: "tel:+264813404364",
  whatsapp: "https://wa.me/264813404364",
  /** BRIEF.md §7 */
  postal: "P.O. Box 21287, Windhoek, Namibia",
  country: "Namibia",
} as const;

/** BRIEF.md §7 — verified programme economics. */
export const programmeFacts = {
  durationMonths: 3,
  standardRate: "N$3,000",
  subsidisedRateMonthly: "N$500",
  subsidisedRateTotal: "N$1,500",
  subsidyEligibility:
    "pensioners, persons with disabilities, and underprivileged households, on proof of limited funds",
  cohortSizePerTrainer: 15,
} as const;

/** BRIEF.md §7 — verified delivery history. Used on /impact. */
export const cohorts = [
  {
    id: "pilot",
    label: "Pilot cohort",
    when: "May 2026",
    where: "Lüderitz, //Kharas Region",
    mode: "In person",
    note: "First graduate expected end of July 2026.",
  },
  {
    id: "national",
    label: "Second cohort",
    when: "July 2026",
    where: "National — participants from towns across Namibia, north to south",
    mode: "Fully online",
    note: null,
  },
] as const;

/** BRIEF.md §7 — stated long-term goals. Goals, not achievements. */
export const longTermGoals = [
  "A mental wellness coach available to every household and business.",
  `A ${terms.practice} Learning Institute and Regulatory Body for Namibia — no ICF-regulated coaching body currently exists here.`,
  "A community centre in each town of launch.",
] as const;

/**
 * Slots the design wants but which no verified source covers. These render as
 * visible TODO(client) markers, never as placeholder prose that could be
 * mistaken for a claim.
 */
export const TODO_CLIENT = {
  crisisLine:
    "TODO(client): Namibian crisis / emergency mental health line — number not yet supplied",
  calendly:
    "TODO(client): Calendly or Google Calendar booking link — none exists in the repo yet",
  photography:
    "TODO(client): Dariva.co's own photography of its actual training work",
  participantNumbers:
    "TODO(client): participants trained to date — will publish once the first cohorts complete",
  testimonials: "TODO(client): participant testimonials, with consent on file",
  partners: "TODO(client): confirmed partner organisations",
} as const;

export type RouteHref =
  | "/"
  | "/about"
  | "/programmes"
  | "/programmes/personal-growth"
  | "/programmes/basic-counselling"
  | "/programmes/leadership-development"
  | "/workplace"
  | "/community-counsellor"
  | "/impact"
  | "/partner"
  | "/resources"
  | "/contact";

/** Primary navigation. Lowercase per DESIGN.md §3. */
export const nav: { href: RouteHref; label: string }[] = [
  { href: "/about", label: "about" },
  { href: "/programmes", label: "programmes" },
  { href: "/workplace", label: "workplace" },
  { href: "/community-counsellor", label: terms.practitionerPlural.toLowerCase() },
  { href: "/impact", label: "impact" },
  { href: "/partner", label: "partner" },
];

/** Footer grouping — includes the routes the header does not carry. */
export const footerNav: { title: string; links: { href: RouteHref; label: string }[] }[] = [
  {
    title: "Learn",
    links: [
      { href: "/programmes", label: "Mental Wellness Coaching Programme" },
      { href: "/programmes/personal-growth", label: "Personal Growth" },
      { href: "/programmes/basic-counselling", label: `Basic ${terms.practice}` },
      { href: "/programmes/leadership-development", label: "Leadership Development" },
    ],
  },
  {
    title: "Work with us",
    links: [
      { href: "/workplace", label: "Workplace Mental Wellness" },
      { href: "/community-counsellor", label: `Become a Community ${terms.practitioner}` },
      { href: "/partner", label: "Partner With Us" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: `About ${site.name}` },
      { href: "/impact", label: "Impact & Monitoring" },
      { href: "/resources", label: "Resources" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

/**
 * The crisis referral line. Appears in the footer sitewide and on the
 * Programme and Community Counsellor pages, per BRIEF.md §3.
 *
 * The site teaches prevention. It is not therapy and not crisis care, and it
 * must never be mistaken for either.
 */
export const crisisReferral = {
  heading: "If you need help right now",
  body: `${site.name} teaches prevention and practical skills. It is education and coaching — not therapy, and not crisis care. If you or someone you know is in immediate danger, contact emergency services or a crisis line.`,
  number: TODO_CLIENT.crisisLine,
} as const;
