/**
 * The Wellness Check-In.
 *
 * A self-reflection tool, deliberately NOT a clinical instrument. It maps a
 * person's own sense of five everyday capacities onto the three Dariva.co
 * training streams, so the recommendation it produces is "which course would
 * help you most", never "here is your diagnosis". See DISCLAIMER below — it is
 * surfaced in the UI on both the intro and the results screen.
 */

export const DISCLAIMER =
  "This check-in is a personal reflection tool, not a medical or psychological assessment. It cannot diagnose any condition. If you are struggling, please speak to a qualified health professional.";

export const CRISIS_NOTE =
  "If you or someone you know is in immediate danger or thinking about self-harm, please contact your nearest emergency service or hospital right away. Dariva.co is a prevention and education service and does not provide crisis care.";

export type DimensionId =
  | "awareness"
  | "resilience"
  | "relationships"
  | "purpose"
  | "support";

export type Dimension = {
  id: DimensionId;
  name: string;
  blurb: string;
  /** Programme slug this dimension maps to when it scores lowest. */
  programme: string;
};

export const dimensions: Dimension[] = [
  {
    id: "awareness",
    name: "Emotional Awareness",
    blurb:
      "How clearly you notice, name and understand what you are feeling as it happens.",
    programme: "personal-growth",
  },
  {
    id: "resilience",
    name: "Stress & Resilience",
    blurb:
      "How well you recover from pressure, setbacks and demanding periods.",
    programme: "personal-growth",
  },
  {
    id: "relationships",
    name: "Relationships & Communication",
    blurb:
      "How you listen, express yourself and work through conflict with others.",
    programme: "basic-counselling",
  },
  {
    id: "purpose",
    name: "Purpose & Growth",
    blurb:
      "How connected you feel to your direction, values and sense of progress.",
    programme: "leadership-development",
  },
  {
    id: "support",
    name: "Support & Connection",
    blurb:
      "How supported you feel, and how confident you are supporting others.",
    programme: "basic-counselling",
  },
];

export type Question = {
  id: string;
  dimension: DimensionId;
  text: string;
  /** When true, agreement indicates lower wellbeing and the score inverts. */
  reverse?: boolean;
};

export const questions: Question[] = [
  // Emotional awareness
  { id: "a1", dimension: "awareness", text: "I can usually name what I am feeling and why." },
  { id: "a2", dimension: "awareness", text: "I notice my emotions building before they take over." },
  { id: "a3", dimension: "awareness", text: "My own reactions often surprise or confuse me.", reverse: true },

  // Stress and resilience
  { id: "r1", dimension: "resilience", text: "I recover reasonably quickly after a stressful day." },
  { id: "r2", dimension: "resilience", text: "I have practical habits that help me manage pressure." },
  { id: "r3", dimension: "resilience", text: "I feel worn down or exhausted most of the time.", reverse: true },

  // Relationships and communication
  { id: "c1", dimension: "relationships", text: "I can say what I need without anger or avoidance." },
  { id: "c2", dimension: "relationships", text: "I listen properly before responding to someone." },
  { id: "c3", dimension: "relationships", text: "Disagreements in my life tend to escalate.", reverse: true },

  // Purpose and growth
  { id: "p1", dimension: "purpose", text: "I have a clear sense of what matters most to me." },
  { id: "p2", dimension: "purpose", text: "I am working towards goals that feel like mine." },
  { id: "p3", dimension: "purpose", text: "I often feel stuck or unsure where I am heading.", reverse: true },

  // Support and connection
  { id: "s1", dimension: "support", text: "There is someone I can talk to honestly when things are hard." },
  { id: "s2", dimension: "support", text: "I feel confident supporting someone else who is struggling." },
  { id: "s3", dimension: "support", text: "I tend to carry my difficulties alone.", reverse: true },
];

export const scaleLabels = [
  "Strongly disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly agree",
] as const;

export type Answers = Record<string, number>;

export type DimensionResult = {
  dimension: Dimension;
  /** 0–100, higher is stronger. */
  score: number;
  band: "Developing" | "Steady" | "Strong";
};

export type Result = {
  overall: number;
  dimensions: DimensionResult[];
  /** Lowest-scoring dimension — what the recommendation is built from. */
  focus: DimensionResult;
  recommendedProgramme: string;
  completedAt: string;
};

function band(score: number): DimensionResult["band"] {
  if (score < 45) return "Developing";
  if (score < 70) return "Steady";
  return "Strong";
}

/**
 * Answers arrive as 1–5. Reverse-scored items flip so that, for every question,
 * a higher normalised value always means greater wellbeing.
 */
export function scoreAssessment(answers: Answers): Result {
  const perDimension = dimensions.map((dimension) => {
    const items = questions.filter((q) => q.dimension === dimension.id);
    const values = items.map((q) => {
      const raw = answers[q.id] ?? 3;
      const adjusted = q.reverse ? 6 - raw : raw;
      return (adjusted - 1) / 4; // → 0..1
    });
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const score = Math.round(mean * 100);
    return { dimension, score, band: band(score) };
  });

  const overall = Math.round(
    perDimension.reduce((sum, d) => sum + d.score, 0) / perDimension.length,
  );

  const focus = perDimension.reduce((lowest, d) =>
    d.score < lowest.score ? d : lowest,
  );

  return {
    overall,
    dimensions: perDimension,
    focus,
    recommendedProgramme: focus.dimension.programme,
    completedAt: new Date().toISOString(),
  };
}

export const STORAGE_KEY = "dariva.checkin.v1";

export function overallMessage(score: number): { title: string; body: string } {
  if (score < 45) {
    return {
      title: "There is real room to grow — and that is a useful thing to know.",
      body: "Several areas came back low. That is not a verdict on you; it is a starting point. The Personal Growth module is built precisely for this, and working through it with others tends to move these scores fastest.",
    };
  }
  if (score < 70) {
    return {
      title: "A steady foundation with clear places to build.",
      body: "You are managing, and there are specific capacities that would repay attention. Focusing on your lowest area rather than everything at once is usually the shortest route to feeling different.",
    };
  }
  return {
    title: "A strong foundation — and a real opportunity to help others.",
    body: "Your responses suggest solid emotional footing. People in this position are exactly who our Basic Counselling and Leadership streams are designed for: those with capacity to support the people around them.",
  };
}
