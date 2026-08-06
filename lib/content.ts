/**
 * Every word of user-facing copy on this site comes from here.
 *
 * Source: "Dariva.co Website Development Content Draft", 29.07.2026.
 * That draft is the client's own wording — where it differs from older code,
 * the draft wins. It uses "Community Counsellor", superseding the July 7th
 * sitewide swap to "Coach".
 *
 * Keeping copy in one module means Ms Sheena's next revision is a single-file
 * change, not an archaeology dig through JSX.
 */

export interface NavItem {
  href: string;
  label: string;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programmes", label: "Programmes" },
  { href: "/workplace", label: "Workplace" },
  { href: "/impact", label: "Impact" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export const contact = {
  email: "dariva.co001@gmail.com",
  phone: "+264 81 340 4364",
  /** E.164, no spaces — for wa.me and tel: links. */
  phoneRaw: "+264813404364",
  whatsapp: "https://wa.me/264813404364",
  location: "Namibia",
} as const;

/* ─────────────────────────── 1. HOME ─────────────────────────── */

export const hero = {
  title: "Mental Wellness Starts With One Person",
  subtitle:
    "Building Stronger Communities. Healthier Workplaces. Better Leaders.",
  body:
    "Dariva.co equips individuals, businesses and communities with practical mental wellness skills that improve emotional wellbeing, strengthen relationships, reduce workplace stress and help prevent Gender-Based Violence before crisis occurs.",
  ctaLabel: "Become Part of the Movement",
  ctaHref: "/contact",
  rhythm: ["Learn", "Grow", "Lead"],
} as const;

export const whyDariva = {
  heading: "Why Dariva.co?",
  lead: "Mental wellness is not only about treating illness. It is about helping people develop the emotional skills needed to:",
  points: [
    "Build healthier families",
    "Improve workplace wellbeing",
    "Reduce conflict",
    "Increase resilience",
    "Strengthen leadership",
    "Prevent burnout",
    "Create safer communities",
  ],
  close:
    "Because when people become emotionally healthier, communities become stronger.",
} as const;

export interface Programme {
  slug: string;
  title: string;
  summary: string;
  outcome: string;
}

/** The three core training streams the whole organisation is built around. */
export const programmes: Programme[] = [
  {
    slug: "personal-growth",
    title: "Personal Growth",
    summary:
      "Build confidence, emotional resilience and healthy habits.",
    outcome:
      "Helping people become the healthiest version of themselves.",
  },
  {
    slug: "basic-counselling",
    title: "Basic Counselling",
    summary:
      "Learn practical listening and helping skills for families, schools, churches and workplaces.",
    outcome:
      "Creating trusted Community Counsellors who know when to support and when to refer.",
  },
  {
    slug: "leadership-development",
    title: "Leadership Development",
    summary:
      "Develop emotionally intelligent leaders who inspire healthy teams.",
    outcome: "Building leaders who lead people—not just processes.",
  },
];

export const whoWeServe = [
  "Communities",
  "Businesses",
  "Government",
  "Schools",
  "Churches",
  "NGOs",
  "Youth",
  "Graduates",
  "Community Leaders",
];

export const homeVision =
  "To build emotionally resilient, self-sustaining communities throughout Namibia and Africa.";

/* ─────────────────────────── 2. ABOUT US ─────────────────────────── */

export const about = {
  heading: "About Dariva.co",
  body: [
    "Dariva.co is a social enterprise committed to making mental wellness practical, affordable and accessible for every community.",
    "We believe prevention is more powerful than intervention.",
    "By equipping ordinary people with practical emotional wellbeing skills, communities become healthier, safer and more resilient.",
  ],
  mission:
    "To improve mental wellness through education, coaching, community counselling and leadership development.",
  vision:
    "Emotionally resilient communities where every individual has access to practical mental wellness support.",
  values: [
    "Compassion",
    "Integrity",
    "Accountability",
    "Growth",
    "Community",
    "Excellence",
    "Hope",
  ],
} as const;

/* ─────────────── 3. MENTAL WELLNESS COACHING PROGRAMME ─────────────── */

export const wellnessProgramme = {
  title: "Mental Wellness Coaching Programme",
  tagline: "Building Healthy Minds for Healthy Communities",
  body: [
    "Our Mental Wellness Coaching Programme provides practical life skills that help people understand themselves, manage emotions and build stronger relationships.",
    "Unlike traditional therapy, our programme focuses on prevention, education and personal development.",
    "Participants learn practical tools they can immediately apply at home, at work and in their communities.",
  ],
  benefitsLead: "Participants learn how to:",
  benefits: [
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
  suitableFor: [
    "Individuals",
    "Families",
    "Youth",
    "Graduates",
    "Government Departments",
    "Businesses",
    "NGOs",
    "Churches",
  ],
} as const;

/* ──────────────── 4–6. THE THREE PROGRAMME MODULES ──────────────── */

export interface ProgrammeModule {
  slug: string;
  title: string;
  tagline: string;
  body: string;
  topicsLabel: string;
  topics: string[];
  benefitsLead: string;
  benefits: string[];
}

export const modules: ProgrammeModule[] = [
  {
    slug: "personal-growth",
    title: "Personal Growth",
    tagline: "Everything begins with knowing yourself.",
    body: "This module helps participants discover their identity, values, strengths and purpose while developing practical life skills for long-term wellbeing.",
    topicsLabel: "Topics Include",
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
    benefitsLead: "Participants will:",
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
    title: "Basic Counselling",
    tagline: "Everyone can learn to listen with compassion.",
    body: "This course equips participants with practical helping skills that improve emotional support within communities and workplaces.",
    topicsLabel: "Participants Learn",
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
    benefitsLead: "Graduates become better:",
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
    title: "Leadership Development",
    tagline: "Great leaders build healthy people.",
    body: "This programme develops emotionally intelligent leaders capable of creating healthy workplace cultures.",
    topicsLabel: "Leadership Topics",
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
    benefitsLead: "Organisations experience:",
    benefits: [
      "Improved teamwork",
      "Higher employee engagement",
      "Better communication",
      "Increased productivity",
      "Lower absenteeism",
      "Healthier workplace culture",
    ],
  },
];

/* ─────────────────── 7. WORKPLACE WELLNESS ─────────────────── */

/**
 * The draft's page break swallowed this section's numbered heading — page 8
 * opens mid-section on "Healthy employees build successful organisations."
 * Titled "Workplace Wellness" here to match its content; confirm with Ms Sheena.
 */
export const workplace = {
  title: "Workplace Wellness",
  tagline: "Healthy employees build successful organisations.",
  body: "Dariva.co partners with organisations to improve employee wellbeing through practical coaching and leadership development.",
  services: [
    "Employee Wellness Workshops",
    "Stress Management",
    "Burnout Prevention",
    "Leadership Coaching",
    "Team Building",
    "Emotional Intelligence Training",
    "Workplace Counselling Support",
    "Mental Wellness Awareness",
  ],
  benefitsLead: "Business Benefits",
  benefits: [
    "Higher productivity",
    "Reduced burnout",
    "Better teamwork",
    "Improved morale",
    "Increased staff retention",
    "Stronger leadership",
  ],
} as const;

/* ─────────────── 8. COMMUNITY COUNSELLOR PROGRAMME ─────────────── */

export const communityCounsellor = {
  title: "Become a Community Counsellor",
  tagline: "Help people. Strengthen communities. Create lasting impact.",
  body: [
    "Our Community Counsellor Programme equips caring individuals with practical mental wellness knowledge and helping skills to support others responsibly.",
    "Graduates receive ongoing coaching, supervision and opportunities to continue growing as community leaders.",
  ],
} as const;

/* ─────────────────── 9. IMPACT & MONITORING ─────────────────── */

export const impact = {
  title: "Measuring Real Change",
  body: [
    "At Dariva.co, we believe that every programme should create measurable impact.",
    "We monitor and evaluate our work to ensure participants gain practical skills that improve their wellbeing and strengthen their communities. Our approach aligns with good monitoring and evaluation (M&E) practice by tracking participation, learning outcomes, behaviour change and longer-term community impact.",
  ],
  measuresLabel: "What We Measure",
  measures: [
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
  whyLabel: "Why Monitoring & Evaluation Matters",
  why: "By collecting feedback and measuring results, we continuously improve our programmes, demonstrate accountability to partners and funders, and ensure our training creates sustainable change for individuals, organisations and communities.",
} as const;

/* ─────────────────── 10. PARTNER WITH US ─────────────────── */

export const partner = {
  title: "Together We Can Build Healthier Communities",
  lead: "We welcome partnerships with:",
  partners: [
    "Government",
    "NGOs",
    "Businesses",
    "Schools",
    "Churches",
    "Donors",
    "International Organisations",
  ],
  close: "Together we can make mental wellness accessible to everyone.",
} as const;

/* ─────────────────────── 11. RESOURCES ─────────────────────── */

export const resources = {
  title: "Resources",
  lead: "Free practical tools including:",
  items: [
    "Wellness Articles",
    "Self-Assessments",
    "Downloadable Guides",
    "Videos",
    "Frequently Asked Questions",
    "Mental Wellness Tips",
  ],
} as const;

/* ──────────────────────── 12. CONTACT ──────────────────────── */

export const contactPage = {
  title: "Let's Build a Healthier Future Together",
  body: "Whether you are looking for training, workplace coaching, community partnerships or sponsorship opportunities, we would love to hear from you.",
} as const;

export const footerCta =
  "Every healthy community begins with one person choosing to grow. Join Dariva.co in building emotionally resilient people, stronger workplaces and safer communities across Namibia and Africa.";
