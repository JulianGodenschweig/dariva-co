import { terms, PROGRAMME_NAME } from "./terms";
import { site } from "./site";

/**
 * Page copy.
 *
 * Source: Dariva_co_Website_Development_Content_Draft__29_07_2026.pdf.
 * Tightened for screen — duplication cut, walls of text broken — but nothing
 * is invented. Each block carries a `source` note naming its PDF section.
 *
 * Two editorial decisions, both recorded in DESIGN.md §7:
 *  1. The PDF states "Our Vision" twice. The About wording is kept; the Home
 *     wording is dropped. Geography survives in the footer CTA, verbatim.
 *  2. "Who We Serve" lists nine audiences. They are grouped into three
 *     buckets, each linking to the page that actually serves it.
 */

export const home = {
  source: "PDF §1 HOME",
  hero: {
    /** Verbatim. This is the line the whole hero sequence is built around. */
    headline: "Mental Wellness Starts With One Person",
    subhead: "Building Stronger Communities. Healthier Workplaces. Better Leaders.",
    lede: `${site.name} equips individuals, businesses and communities with practical mental wellness skills that improve emotional wellbeing, strengthen relationships, reduce workplace stress and help prevent Gender-Based Violence before crisis occurs.`,
    primaryCta: { label: "Join the next cohort", href: "/programmes" as const },
    secondaryCta: { label: "Book a discovery call", href: "/contact" as const },
  },
  /**
   * The five stages of the hero sequence. Doubles as the scale readout in the
   * right margin and as the reduced-motion reader's map of the static poster.
   */
  propagation: [
    { key: "one", label: "One", caption: "One person learns the skills." },
    { key: "household", label: "Household", caption: "A household feels the difference." },
    { key: "workplace", label: "Workplace", caption: "A workplace changes how it works." },
    { key: "community", label: "Community", caption: "A community holds itself together." },
    { key: "region", label: "Region", caption: "A region becomes more resilient." },
  ],
  why: {
    heading: `Why ${site.name}?`,
    lede: "Mental wellness is not only about treating illness. It is about helping people develop the emotional skills needed to:",
    items: [
      "Build healthier families",
      "Improve workplace wellbeing",
      "Reduce conflict",
      "Increase resilience",
      "Strengthen leadership",
      "Prevent burnout",
      "Create safer communities",
    ],
    close: "Because when people become emotionally healthier, communities become stronger.",
  },
  /** PDF "Who We Serve" — nine audiences grouped into three routed buckets. */
  serve: {
    heading: "Who we serve",
    lede: "Nine audiences, three doors. Each one leads to the training built for it.",
    buckets: [
      {
        title: "Communities & Individuals",
        absorbs: ["Communities", "Youth", "Graduates", "Community Leaders"],
        body: "Practical skills for people who want to grow, and for the people they will go on to help.",
        href: "/programmes" as const,
        cta: "See the programme",
      },
      {
        title: "Workplaces & Government",
        absorbs: ["Businesses", "Government"],
        body: "Wellbeing, leadership and burnout prevention for teams and departments.",
        href: "/workplace" as const,
        cta: "Enquire about workplace training",
      },
      {
        title: "Faith, Schools & NGOs",
        absorbs: ["Churches", "Schools", "NGOs"],
        body: `Training the trusted people already doing the listening — and teaching them when to refer.`,
        href: "/community-counsellor" as const,
        cta: `Become a Community ${terms.practitioner}`,
      },
    ],
  },
  /** PDF footer CTA, verbatim. Carries "across Namibia and Africa". */
  closing: `Every healthy community begins with one person choosing to grow. Join ${site.name} in building emotionally resilient people, stronger workplaces and safer communities across Namibia and Africa.`,
} as const;

export const about = {
  source: "PDF §2 ABOUT US",
  title: `About ${site.name}`,
  lede: `${site.name} is a social enterprise committed to making mental wellness practical, affordable and accessible for every community.`,
  body: "We believe prevention is more powerful than intervention. By equipping ordinary people with practical emotional wellbeing skills, communities become healthier, safer and more resilient.",
  mission: {
    heading: "Our Mission",
    text: `To improve mental wellness through education, coaching, community ${terms.practiceLower} and leadership development.`,
  },
  vision: {
    heading: "Our Vision",
    /** The About wording. The Home wording is deliberately dropped — DESIGN.md §7. */
    text: "Emotionally resilient communities where every individual has access to practical mental wellness support.",
  },
  values: {
    heading: "Our Values",
    items: [
      "Compassion",
      "Integrity",
      "Accountability",
      "Growth",
      "Community",
      "Excellence",
      "Hope",
    ],
  },
} as const;

export const programmes = {
  source: "PDF §3 OUR MENTAL WELLNESS PROGRAMME",
  title: PROGRAMME_NAME,
  subtitle: "Building Healthy Minds for Healthy Communities",
  lede: "Our Mental Wellness Coaching Programme provides practical life skills that help people understand themselves, manage emotions and build stronger relationships.",
  body: [
    "Unlike traditional therapy, our programme focuses on prevention, education and personal development.",
    "Participants learn practical tools they can immediately apply at home, at work and in their communities.",
  ],
  benefits: {
    heading: "Programme Benefits",
    lede: "Participants learn how to:",
    items: [
      "Improve emotional wellbeing",
      "Handle stress effectively",
      "Communicate confidently",
      "Develop resilience",
      "Resolve conflict peacefully",
      "Improve relationships",
      "Increase self-awareness",
      "Strengthen purpose",
      "Build healthier lifestyles",
    ],
  },
  suitableFor: {
    heading: "Suitable for",
    items: [
      "Individuals",
      "Families",
      "Youth",
      "Graduates",
      "Government Departments",
      "Businesses",
      "NGOs",
      "Churches",
    ],
  },
  cta: { label: "Join the next cohort", href: "/contact" as const },
} as const;

export type Module = {
  slug: string;
  source: string;
  title: string;
  tagline: string;
  body: string;
  topicsHeading: string;
  topics: readonly string[];
  benefitsHeading: string;
  benefitsLede: string;
  benefits: readonly string[];
};

export const modules: readonly Module[] = [
  {
    slug: "personal-growth",
    source: "PDF §4 PERSONAL GROWTH MODULE",
    title: "Personal Growth",
    tagline: "Everything begins with knowing yourself.",
    body: "This module helps participants discover their identity, values, strengths and purpose while developing practical life skills for long-term wellbeing.",
    topicsHeading: "Topics include",
    topics: [
      "Self-awareness",
      "Identity",
      "Self-esteem",
      "Values",
      "Emotional Intelligence",
      "Goal Setting",
      "Psychological Flexibility",
      "Trauma Awareness",
      "Stress Management",
      "Healthy Relationships",
      "Personal Growth Planning",
    ],
    benefitsHeading: "Benefits",
    benefitsLede: "Participants will:",
    benefits: [
      "Build confidence",
      "Improve emotional resilience",
      "Make healthier decisions",
      "Strengthen relationships",
      "Increase motivation",
      "Develop positive habits",
      "Improve mental wellbeing",
    ],
  },
  {
    slug: "basic-counselling",
    source: "PDF §5 BASIC COUNSELLING COURSE",
    title: `Basic ${terms.practice}`,
    tagline: "Everyone can learn to listen with compassion.",
    body: "This course equips participants with practical helping skills that improve emotional support within communities and workplaces.",
    topicsHeading: "Participants learn",
    topics: [
      "Active Listening",
      "Empathy",
      "Communication Skills",
      "Ethical Helping",
      "Confidentiality",
      "Crisis Awareness",
      "Referral Skills",
      "Boundaries",
      "Supporting Vulnerable People",
    ],
    benefitsHeading: "Benefits",
    benefitsLede: "Graduates become better:",
    benefits: [
      "Parents",
      "Supervisors",
      "Teachers",
      "Managers",
      "Church Leaders",
      "Community Volunteers",
      "Peer Supporters",
    ],
  },
  {
    slug: "leadership-development",
    source: "PDF §6 LEADERSHIP DEVELOPMENT",
    title: "Leadership Development",
    tagline: "Great leaders build healthy people.",
    body: "This programme develops emotionally intelligent leaders capable of creating healthy workplace cultures.",
    topicsHeading: "Leadership topics",
    topics: [
      "Emotional Intelligence",
      "Communication",
      "Team Building",
      "Coaching Skills",
      "Conflict Resolution",
      "Motivation",
      "Workplace Wellbeing",
      "Ethical Leadership",
      "Decision Making",
    ],
    benefitsHeading: "Benefits",
    benefitsLede: "Organisations experience:",
    benefits: [
      "Improved teamwork",
      "Higher employee engagement",
      "Better communication",
      "Increased productivity",
      "Lower absenteeism",
      "Healthier workplace culture",
    ],
  },
] as const;

/** Short cards for the programme hub and the home page. PDF §1 "Our Programmes". */
export const moduleSummaries = [
  {
    slug: "personal-growth",
    title: "Personal Growth",
    summary: "Build confidence, emotional resilience and healthy habits.",
    outcomeLabel: "Outcome",
    outcome: "Helping people become the healthiest version of themselves.",
  },
  {
    slug: "basic-counselling",
    title: `Basic ${terms.practice}`,
    summary:
      "Learn practical listening and helping skills for families, schools, churches and workplaces.",
    outcomeLabel: "Outcome",
    outcome: `Creating trusted Community ${terms.practitionerPlural} who know when to support and when to refer.`,
  },
  {
    slug: "leadership-development",
    title: "Leadership Development",
    summary: "Develop emotionally intelligent leaders who inspire healthy teams.",
    outcomeLabel: "Outcome",
    outcome: "Building leaders who lead people—not just processes.",
  },
] as const;

export const workplace = {
  source: "PDF §7 BUSINESS WELLNESS",
  title: "Workplace Mental Wellness",
  tagline: "Healthy employees build successful organisations.",
  body: `${site.name} partners with organisations to improve employee wellbeing through practical coaching and leadership development.`,
  services: {
    heading: "Services",
    items: [
      "Employee Wellness Workshops",
      "Stress Management",
      "Burnout Prevention",
      "Leadership Coaching",
      "Team Building",
      "Emotional Intelligence Training",
      `Workplace ${terms.practice} Support`,
      "Mental Wellness Awareness",
    ],
  },
  benefits: {
    heading: "Business Benefits",
    items: [
      "Higher productivity",
      "Reduced burnout",
      "Better teamwork",
      "Improved morale",
      "Increased staff retention",
      "Stronger leadership",
    ],
  },
  cta: { label: "Enquire about workplace training", href: "#enquire" as const },
} as const;

export const communityCounsellor = {
  source: "PDF §8 COMMUNITY COUNSELLOR PROGRAMME",
  title: `Become a Community ${terms.practitioner}`,
  tagline: ["Help people.", "Strengthen communities.", "Create lasting impact."],
  body: [
    `Our Community ${terms.practitioner} Programme equips caring individuals with practical mental wellness knowledge and helping skills to support others responsibly.`,
    "Graduates receive ongoing coaching, supervision and opportunities to continue growing as community leaders.",
  ],
  cta: { label: "Join the next cohort", href: "#register" as const },
} as const;

export const impact = {
  source: "PDF §9 IMPACT & MONITORING",
  title: "Measuring Real Change",
  lede: `At ${site.name}, we believe that every programme should create measurable impact.`,
  body: "We monitor and evaluate our work to ensure participants gain practical skills that improve their wellbeing and strengthen their communities. Our approach aligns with good monitoring and evaluation (M&E) practice by tracking participation, learning outcomes, behaviour change and longer-term community impact.",
  measures: {
    heading: "What we measure",
    items: [
      "People trained",
      "Programme completion rates",
      "Knowledge gained",
      "Behaviour change",
      "Workplace wellbeing improvements",
      "Community engagement",
      "Leadership growth",
      "Referral outcomes",
      "Participant satisfaction",
      "Community impact indicators",
    ],
  },
  why: {
    heading: "Why monitoring & evaluation matters",
    body: "By collecting feedback and measuring results, we continuously improve our programmes, demonstrate accountability to partners and funders, and ensure our training creates sustainable change for individuals, organisations and communities.",
  },
  /**
   * This page publishes no numbers. The pilot cohort's first graduate is
   * expected end of July 2026 and the national cohort began the same month,
   * so completion and outcome data does not exist yet. Saying so is the
   * honest version and it is what a donor or ministry actually wants to read.
   */
  disclosure: {
    heading: "What we can and cannot yet report",
    body: "Our first cohort launched in May 2026 and the second in July 2026. Outcome data — completion rates, behaviour change, longer-term community impact — is still being collected against the measures above. We publish results when we have them, not before.",
  },
} as const;

export const partner = {
  source: "PDF §10 PARTNER WITH US",
  title: "Together We Can Build Healthier Communities",
  partners: {
    heading: "We welcome partnerships with",
    items: [
      "Government",
      "NGOs",
      "Businesses",
      "Schools",
      "Churches",
      "Donors",
      "International Organisations",
    ],
  },
  close: "Together we can make mental wellness accessible to everyone.",
  cta: { label: "Start a partnership conversation", href: "#partner-enquiry" as const },
} as const;

export const resources = {
  source: "PDF §11 RESOURCES",
  title: "Resources",
  lede: "Free practical tools including:",
  items: [
    "Wellness Articles",
    "Self-Assessments",
    "Downloadable Guides",
    "Videos",
    "Frequently Asked Questions",
    "Mental Wellness Tips",
  ],
  /** Nothing here exists yet. The page says so rather than linking to nothing. */
  status:
    "These resources are in development alongside our current cohorts. Leave your email and we will tell you when the first ones are published — no other mail.",
} as const;

export const contact = {
  source: "PDF §12 CONTACT",
  title: "Let's Build a Healthier Future Together",
  lede: "Whether you are looking for training, workplace coaching, community partnerships or sponsorship opportunities, we would love to hear from you.",
} as const;
