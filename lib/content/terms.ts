/**
 * The one terminology token.
 *
 * The content PDF says "Counsellor" / "Counselling". Earlier Dariva work
 * (commit 93ec2b4) renamed these site-wide to "Coach" / "Coaching", and a
 * later rebuild partly reverted it, leaving the repo mixed. Nothing on this
 * site hardcodes either word — every occurrence reads from here, so flipping
 * the whole site is a one-line change.
 *
 * To switch to Coach/Coaching, change the four values below. Nothing else.
 */
export const terms = {
  /** "Counsellor" — a person who has completed the training. */
  practitioner: "Counsellor",
  practitionerPlural: "Counsellors",
  /** "Counselling" — the practice itself. */
  practice: "Counselling",
  practiceLower: "counselling",
} as const;

export type Terms = typeof terms;

/**
 * The programme is named "Mental Wellness Coaching Programme" in the PDF
 * regardless of the token above — "Coaching" there is the delivery method,
 * not the practitioner title, so it is deliberately not tokenised.
 */
export const PROGRAMME_NAME = "Mental Wellness Coaching Programme";
