/**
 * Single source of truth for Dariva.co site content.
 *
 * Every string here traces back to the "Dariva.co Website Development Content
 * Draft" (29.07.2026). Keeping it in one typed module means copy changes never
 * require touching layout code.
 */

export const org = {
  name: "Dariva.co",
  tagline: "Learn • Grow • Lead",
  email: "dariva.co001@gmail.com",
  phone: "+264 81 340 4364",
  phoneHref: "tel:+264813404364",
  whatsapp: "https://wa.me/264813404364",
  location: "Namibia",
  mission:
    "To improve mental wellness through education, coaching, community counselling and leadership development.",
  vision:
    "Emotionally resilient communities where every individual has access to practical mental wellness support.",
  visionBroad:
    "To build emotionally resilient, self-sustaining communities throughout Namibia and Africa.",
  about:
    "Dariva.co is a social enterprise committed to making mental wellness practical, affordable and accessible for every community.",
  aboutBelief:
    "We believe prevention is more powerful than intervention. By equipping ordinary people with practical emotional wellbeing skills, communities become healthier, safer and more resilient.",
  footerCta:
    "Every healthy community begins with one person choosing to grow. Join Dariva.co in building emotionally resilient people, stronger workplaces and safer communities across Namibia and Africa.",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programmes", label: "Programmes" },
  { href: "/business", label: "Business" },
  { href: "/impact", label: "Impact" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
] as const;

export const hero = {
  eyebrow: "Namibia • Africa",
  title: "Mental Wellness Starts With One Person",
  subtitle:
    "Building Stronger Communities. Healthier Workplaces. Better Leaders.",
  body:
    "Dariva.co equips individuals, businesses and communities with practical mental wellness skills that improve emotional wellbeing, strengthen relationships, reduce workplace stress and help prevent Gender-Based Violence before crisis occurs.",
  cta: "Become Part of the Movement",
} as const;

export const whyDariva = {
  title: "Why Dariva.co?",
  lede: "Mental wellness is not only about treating illness.",
  body: "It is about helping people develop the emotional skills needed to:",
  points: [
    "Build healthier families",
    "Improve workplace wellbeing",
    "Reduce conflict",
    "Increase resilience",
    "Strengthen leadership",
    "Prevent burnout",
    "Create safer communities",
  ],
  closer:
    "Because when people become emotionally healthier, communities become stronger.",
} as const;

export type Programme = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  summary: string;
  outcome: string;
  image: string;
  topicsLabel: string;
  topics: string[];
  benefitsLabel: string;
  benefits: string[];
  audienceLabel?: string;
  audience?: string[];
};

export const programmes: Programme[] = [
  {
    slug: "personal-growth",
    index: "01",
    title: "Personal Growth",
    tagline: "Everything begins with knowing yourself.",
    summary:
      "This module helps participants discover their identity, values, strengths and purpose while developing practical life skills for long-term wellbeing.",
    outcome: "Helping people become the healthiest version of themselves.",
    image: "/images/portrait-woman.jpg",
    topicsLabel: "Topics include",
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
    benefitsLabel: "Participants will",
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
    index: "02",
    title: "Basic Counselling",
    tagline: "Everyone can learn to listen with compassion.",
    summary:
      "This course equips participants with practical helping skills that improve emotional support within communities and workplaces.",
    outcome:
      "Creating trusted Community Counsellors who know when to support and when to refer.",
    image: "/images/group-talk.jpg",
    topicsLabel: "Participants learn",
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
    benefitsLabel: "Graduates become better",
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
    index: "03",
    title: "Leadership Development",
    tagline: "Great leaders build healthy people.",
    summary:
      "This programme develops emotionally intelligent leaders capable of creating healthy workplace cultures.",
    outcome: "Building leaders who lead people—not just processes.",
    image: "/images/training-room.jpg",
    topicsLabel: "Leadership topics",
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
    benefitsLabel: "Organisations experience",
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
] as const;

export const values = [
  { name: "Compassion", note: "We meet people where they are." },
  { name: "Integrity", note: "We do what we say, quietly and consistently." },
  { name: "Accountability", note: "We measure what we promise." },
  { name: "Growth", note: "Everyone is capable of becoming healthier." },
  { name: "Community", note: "Change holds when it is collective." },
  { name: "Excellence", note: "Practical work, done properly." },
  { name: "Hope", note: "Prevention is an act of optimism." },
] as const;

export const coachingProgramme = {
  title: "Mental Wellness Coaching Programme",
  tagline: "Building Healthy Minds for Healthy Communities",
  body: [
    "Our Mental Wellness Coaching Programme provides practical life skills that help people understand themselves, manage emotions and build stronger relationships.",
    "Unlike traditional therapy, our programme focuses on prevention, education and personal development.",
    "Participants learn practical tools they can immediately apply at home, at work and in their communities.",
  ],
  benefitsLabel: "Participants learn how to",
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
  suitableLabel: "Suitable for",
  suitable: [
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

export const business = {
  title: "Workplace Mental Wellness",
  tagline: "Healthy employees build successful organisations.",
  body:
    "Dariva.co partners with organisations to improve employee wellbeing through practical coaching and leadership development.",
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
  benefits: [
    "Higher productivity",
    "Reduced burnout",
    "Better teamwork",
    "Improved morale",
    "Increased staff retention",
    "Stronger leadership",
  ],
} as const;

export const communityCounsellor = {
  title: "Become a Community Counsellor",
  lines: ["Help people.", "Strengthen communities.", "Create lasting impact."],
  body:
    "Our Community Counsellor Programme equips caring individuals with practical mental wellness knowledge and helping skills to support others responsibly.",
  body2:
    "Graduates receive ongoing coaching, supervision and opportunities to continue growing as community leaders.",
} as const;

export const impact = {
  title: "Measuring Real Change",
  lede:
    "At Dariva.co, we believe that every programme should create measurable impact.",
  body:
    "We monitor and evaluate our work to ensure participants gain practical skills that improve their wellbeing and strengthen their communities. Our approach aligns with good monitoring and evaluation (M&E) practice by tracking participation, learning outcomes, behaviour change and longer-term community impact.",
  measuresLabel: "What we measure",
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
  whyLabel: "Why Monitoring & Evaluation matters",
  why:
    "By collecting feedback and measuring results, we continuously improve our programmes, demonstrate accountability to partners and funders, and ensure our training creates sustainable change for individuals, workplaces and communities.",
} as const;

export const partner = {
  title: "Together We Can Build Healthier Communities",
  body: "We welcome partnerships with:",
  partners: [
    "Government",
    "NGOs",
    "Businesses",
    "Schools",
    "Churches",
    "Donors",
    "International Organisations",
  ],
  closer: "Together we can make mental wellness accessible to everyone.",
} as const;

export const contact = {
  title: "Let's Build a Healthier Future Together",
  body:
    "Whether you are looking for training, workplace coaching, community partnerships or sponsorship opportunities, we would love to hear from you.",
} as const;
