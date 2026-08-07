/**
 * The free resource library.
 *
 * Practical, preventive material drawn from the programme curricula. Nothing
 * here is clinical advice — everything is framed as a skill to practise, which
 * is the same posture the courses take.
 */

export type ResourceType = "Article" | "Tip" | "Guide" | "Video" | "FAQ" | "Tool";

export type Resource = {
  id: string;
  type: ResourceType;
  title: string;
  summary: string;
  body?: string;
  readTime?: string;
  href?: string;
  topics: string[];
};

export const resourceTypes: ResourceType[] = [
  "Article",
  "Tip",
  "Guide",
  "Video",
  "FAQ",
  "Tool",
];

export const resources: Resource[] = [
  {
    id: "checkin",
    type: "Tool",
    title: "The Wellness Check-In",
    summary:
      "A three-minute self-reflection across five everyday capacities, with a programme recommendation at the end.",
    href: "/assessment",
    readTime: "3 min",
    topics: ["Self-awareness", "Stress Management", "Personal Growth Planning"],
  },
  {
    id: "name-it",
    type: "Tip",
    title: "Name it to tame it",
    summary:
      "Putting a specific word to a feeling reduces its intensity. Vague distress stays large; named distress becomes workable.",
    body: "When something hits you, pause and finish the sentence 'right now I feel ___'. Push past the first word. 'Angry' is often really 'disrespected' or 'afraid'. The more precise the word, the more the feeling settles — and the clearer it becomes what you actually need to do next.",
    readTime: "1 min",
    topics: ["Emotional Intelligence", "Self-awareness"],
  },
  {
    id: "listening",
    type: "Article",
    title: "What active listening actually looks like",
    summary:
      "Most people listen in order to reply. Active listening is a set of concrete behaviours you can practise deliberately.",
    body: "Give the person your body, not just your ears — turn towards them and put the phone away. Let silences sit for three seconds before filling them. Reflect back what you heard in your own words before you respond: 'So what I'm hearing is…'. Ask one open question for every piece of advice you feel tempted to give. And notice the urge to fix; most people asking to be heard are not asking to be solved.",
    readTime: "4 min",
    topics: ["Active Listening", "Communication Skills", "Empathy"],
  },
  {
    id: "burnout-signs",
    type: "Guide",
    title: "Eight early signs of burnout at work",
    summary:
      "Burnout rarely arrives suddenly. These are the signals that usually appear months before someone reaches breaking point.",
    body: "Watch for: persistent exhaustion that rest does not fix; cynicism about work that used to matter; dropping performance despite longer hours; withdrawal from colleagues; irritability over small things; physical symptoms like headaches or disturbed sleep; a sense that nothing you do makes a difference; and loss of interest outside work. Two or three sustained over several weeks is worth acting on — for yourself or for someone on your team.",
    readTime: "5 min",
    topics: ["Burnout Prevention", "Workplace Wellbeing", "Stress Management"],
  },
  {
    id: "boundaries",
    type: "Tip",
    title: "A boundary is a statement, not a negotiation",
    summary:
      "Boundaries fail when they are phrased as requests for permission.",
    body: "Compare 'Would it be okay if I don't take calls after eight?' with 'I don't take calls after eight.' The second is a boundary. State it plainly, state it once, and hold it consistently — consistency is what teaches people where the line is, far more than the words you choose.",
    readTime: "1 min",
    topics: ["Boundaries", "Healthy Relationships"],
  },
  {
    id: "conflict",
    type: "Article",
    title: "De-escalating a conflict before it hardens",
    summary:
      "Conflict becomes damaging at the point it stops being about the issue and starts being about the person.",
    body: "Slow the pace deliberately — speak more slowly and quietly than feels natural. Separate the behaviour from the person: 'when the report came late' rather than 'when you were careless'. Acknowledge something true in their position before you state yours; this is not conceding, it is keeping the conversation open. If either of you is flooded, name it and agree a time to return. A postponed conversation is recoverable; a said-in-anger sentence often is not.",
    readTime: "5 min",
    topics: ["Conflict Resolution", "Communication", "Emotional Intelligence"],
  },
  {
    id: "refer",
    type: "Guide",
    title: "Knowing when to refer, not counsel",
    summary:
      "The most important skill a community counsellor learns is recognising the edge of their competence.",
    body: "Refer when you encounter: any mention of self-harm or suicide; signs of severe depression such as an inability to function day to day; substance dependence; psychosis or loss of contact with reality; ongoing abuse or immediate danger; or any situation where you feel out of your depth. Referring is not failure — it is the responsible exercise of the boundary that makes community support safe. Know your local clinic, hospital and social worker contacts before you need them.",
    readTime: "4 min",
    topics: ["Referral Skills", "Crisis Awareness", "Ethical Helping"],
  },
  {
    id: "breathing",
    type: "Tip",
    title: "The physiological sigh",
    summary:
      "The fastest evidence-backed way to bring your body down from acute stress, and it takes under a minute.",
    body: "Two inhales through the nose — one long, then a second short one on top to fully inflate the lungs — followed by one long slow exhale through the mouth. Repeat three to five times. It works by reinflating collapsed air sacs and offloading carbon dioxide, which slows the heart. Useful before a difficult conversation, not only after one.",
    readTime: "1 min",
    topics: ["Stress Management", "Psychological Flexibility"],
  },
  {
    id: "values",
    type: "Guide",
    title: "Finding your values in twenty minutes",
    summary:
      "A short exercise from the Personal Growth module for people who are unsure what they actually stand for.",
    body: "Write down three moments you felt genuinely proud — not praised, proud. For each, name what you were honouring: honesty, courage, loyalty, craft, fairness. Then write three moments you felt real anger at something unfair. Name what was being violated. The words that repeat across both lists are your values. Test them: does your calendar for the last month reflect them? Where it does not is where the friction in your life is coming from.",
    readTime: "6 min",
    topics: ["Values", "Identity", "Personal Growth Planning"],
  },
  {
    id: "supporting",
    type: "Article",
    title: "How to support someone without absorbing their distress",
    summary:
      "Sustainable helping requires a difference between empathy and fusion.",
    body: "Empathy is understanding someone's feeling. Fusion is taking it on as your own. The first helps them; the second eventually stops you helping anyone. Practically: keep the conversation in their frame rather than relating everything back to your own experience; decide before you start how long you have and say so; and afterwards do something deliberately physical — walk, wash up, step outside — to mark the end. Supervision and peer support exist for exactly this reason.",
    readTime: "4 min",
    topics: ["Supporting Vulnerable People", "Boundaries", "Empathy"],
  },
  {
    id: "faq-therapy",
    type: "FAQ",
    title: "Is this therapy?",
    summary:
      "No. Dariva.co provides education, coaching and community counselling skills — prevention rather than treatment.",
    body: "Our programmes focus on prevention, education and personal development. We teach practical skills people can apply immediately at home, at work and in their communities. We do not diagnose or treat mental illness, and a core part of our Basic Counselling course is teaching participants exactly when to refer someone to a qualified professional.",
    topics: ["Ethical Helping", "Referral Skills"],
  },
  {
    id: "faq-who",
    type: "FAQ",
    title: "Who are the programmes for?",
    summary:
      "Individuals, families, youth, graduates, government departments, businesses, NGOs and churches.",
    body: "No prior qualification is required. The Personal Growth module suits anyone wanting to understand themselves better. Basic Counselling suits people who are already the ones others come to. Leadership Development suits anyone responsible for a team, formally or informally.",
    topics: ["Personal Growth", "Basic Counselling", "Leadership Development"],
  },
  {
    id: "faq-workplace",
    type: "FAQ",
    title: "Can you run a programme for our organisation?",
    summary:
      "Yes — workplace wellness workshops, leadership coaching and team training are delivered on site.",
    body: "Workplace offerings include employee wellness workshops, stress management, burnout prevention, leadership coaching, team building, emotional intelligence training, workplace counselling support and mental wellness awareness sessions. Get in touch and we will scope it with you.",
    href: "/business",
    topics: ["Workplace Wellbeing", "Leadership Coaching"],
  },
  {
    id: "faq-gbv",
    type: "FAQ",
    title: "How does mental wellness training prevent Gender-Based Violence?",
    summary:
      "Because most violence is preceded by escalation that emotional skills can interrupt.",
    body: "GBV prevention work is most effective upstream of crisis. Emotional regulation, conflict resolution, healthy communication and help-seeking are all learnable skills, and communities where more people hold them intervene earlier and more often. That is the prevention logic our programmes are built on.",
    topics: ["Conflict Resolution", "Healthy Relationships", "Crisis Awareness"],
  },
  {
    id: "video-intro",
    type: "Video",
    title: "Introduction to the Mental Wellness Coaching Programme",
    summary:
      "A short overview of how the three training streams fit together — coming soon to this library.",
    topics: ["Personal Growth", "Basic Counselling", "Leadership Development"],
  },
  {
    id: "video-listening",
    type: "Video",
    title: "Active listening demonstrated",
    summary:
      "A filmed walkthrough of the listening skills taught in the Basic Counselling course — coming soon.",
    topics: ["Active Listening", "Communication Skills"],
  },
];

export const allTopics = Array.from(
  new Set(resources.flatMap((r) => r.topics)),
).sort();
