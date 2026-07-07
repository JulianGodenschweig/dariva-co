import {
  BadgeCheck,
  Brain,
  ChartNoAxesCombined,
  CircleDollarSign,
  HeartHandshake,
  Layers3,
  LockKeyhole,
  MessageCircleHeart,
  Network,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sprout,
  UsersRound
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/program", label: "Program" },
  { href: "/impact", label: "Impact" },
  { href: "/apply", label: "Apply" },
  { href: "/contact", label: "Contact" }
];

export const pillars = [
  {
    title: "Train community coaches",
    description:
      "Local leaders learn mental wellness foundations, facilitation, safeguarding, and practical care skills.",
    icon: UsersRound
  },
  {
    title: "Open digital access",
    description:
      "Dariva.co connects trained coaches, communities, records, referrals, and learning through a digital health layer.",
    icon: Smartphone
  },
  {
    title: "Reward care work",
    description:
      "An incentive-based model creates income pathways while keeping prevention, trust, and community outcomes at the centre.",
    icon: CircleDollarSign
  }
];

export const journey = [
  {
    title: "Learn & Grow",
    text: "Build emotional literacy, GBV awareness, leadership confidence, and the basics of preventative mental wellness.",
    kicker: "Phase 01"
  },
  {
    title: "Practice & Lead",
    text: "Facilitate guided sessions, support peers, strengthen relationships, and learn when to refer people for additional care.",
    kicker: "Phase 02"
  },
  {
    title: "Earn & Impact",
    text: "Serve through digital and community channels, receive mentorship, and grow a dignified pathway in care work.",
    kicker: "Phase 03"
  }
];

export const outcomes = [
  "Better emotional literacy",
  "Earlier help-seeking",
  "Stronger relationships",
  "More local support",
  "Income opportunity",
  "Safer communities"
];

export const values = [
  { title: "Empathy", icon: HeartHandshake },
  { title: "Confidentiality", icon: LockKeyhole },
  { title: "Integrity", icon: ShieldCheck },
  { title: "Empowerment", icon: Sparkles },
  { title: "Community Ownership", icon: Network },
  { title: "Accountability", icon: BadgeCheck },
  { title: "Sustainability", icon: Sprout }
];

export const benefits = [
  "Practical mental wellness skills",
  "Personal emotional growth",
  "Leadership and facilitation",
  "Purpose-led community service",
  "Income opportunity",
  "Measurable community impact"
];

export const impactCards = [
  {
    title: "Preventative wellness",
    text: "Dariva.co helps communities respond before crisis becomes the only option.",
    icon: Brain
  },
  {
    title: "GBV driver ending",
    text: "Emotional support, safer conversations, and early intervention help end the pressures that feed violence.",
    icon: ShieldCheck
  },
  {
    title: "Care economy",
    text: "Community members can turn trusted support work into a pathway for dignity, income, and leadership.",
    icon: CircleDollarSign
  },
  {
    title: "Adaptive learning",
    text: "Monitoring, feedback, and partner reporting keep the model practical, honest, and ready to improve.",
    icon: ChartNoAxesCombined
  }
];

export const faqs = [
  {
    q: "Is Dariva.co a counselling app or a training programme?",
    a: "It is both, and more. Dariva.co blends community coach training, digital access, partner implementation, and continuous learning into one mental wellness ecosystem."
  },
  {
    q: "Who can apply?",
    a: "Community-minded people in Namibia, Africa who want to learn, lead, support others responsibly, and grow through supervised mental wellness work."
  },
  {
    q: "Does Dariva.co replace professional therapy?",
    a: "No. Dariva.co strengthens early support, emotional literacy, and referral pathways. It is designed to work with professional care, not replace it."
  }
];

export const programmes = [
  {
    id: "train-the-trainer",
    name: "Train-The-Trainer Programme",
    price: "NAD 3,000",
    duration: "6-month transformation journey",
    features: [
      "Phase 1: Learn & Grow (Months 1–3)",
      "Phase 2: Practice & Lead (Months 4–6)",
      "Phase 3: Earn & Impact (Digital Counselling)",
      "Community coach certification",
      "Digital access & tools",
      "Ongoing mentorship support"
    ],
    cta: "Enroll Now",
    href: "/apply",
    featured: true
  },
  {
    id: "graduate-development",
    name: "Graduate Development Programme",
    price: "Price TBD",
    duration: "3-month training + internship + 6-month paid position",
    features: [
      "Personal development training",
      "Communication skills",
      "Leadership development",
      "Internship placement",
      "6-month paid position",
      "Professional mentorship"
    ],
    cta: "Register Interest",
    href: "/apply",
    featured: false
  }
];

export const contact = {
  email: "dariva.co001@gmail.com",
  phone: "+264 81 340 4364",
  whatsapp: "+264 81 340 4364",
      location: "Namibia, Africa",
};
