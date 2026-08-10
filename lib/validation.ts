import { z } from "zod";

/**
 * Server-side validation — BRIEF.md §10. Every insert passes through one of
 * these before it reaches Supabase.
 *
 * Error copy rule (BRIEF.md §7): errors explain what happened and what to do.
 * They do not apologise and they are never vague. "This field is required" is
 * vague; "We need a name to know who to reply to" is not.
 */

const email = z
  .string()
  .trim()
  .min(1, "We need an email address to reply to.")
  .max(254, "That email address is longer than an email address can be.")
  .email("That does not look like an email address — check for a missing @ or a typo.");

const name = z
  .string()
  .trim()
  .min(1, "We need a name to know who to reply to.")
  .max(120, "That name is longer than we can store. Use the name you go by.");

const phone = z
  .string()
  .trim()
  .max(40, "That phone number is too long. Digits and spaces only.")
  .optional()
  .or(z.literal(""));

const message = z
  .string()
  .trim()
  .min(10, "Tell us a little more — a sentence or two is enough to route your enquiry.")
  .max(4000, "That message is over 4,000 characters. Send the short version and we will ask for the rest.");

/**
 * An optional <select> submits "" when nothing is chosen, and "" is not
 * `undefined` — so `z.enum([...]).optional()` rejects it and the whole form
 * fails with an error the user cannot act on. Normalise empty to undefined
 * before the enum sees it.
 */
function optionalEnum<const T extends readonly [string, ...string[]]>(
  values: T,
  message: string,
) {
  return z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.enum(values, { message }).optional(),
  );
}

/**
 * Honeypot. A real person never sees this field, so a real person never fills
 * it. Anything non-empty is a bot and is rejected without an error the bot can
 * learn from.
 */
const honeypot = z
  .string()
  .max(0, "rejected")
  .optional()
  .or(z.literal(""));

export const enquirySchema = z.object({
  name,
  email,
  phone,
  org: z.string().trim().max(160, "That organisation name is too long.").optional().or(z.literal("")),
  audience_type: optionalEnum(
    ["individual", "workplace", "government", "faith", "school", "ngo", "donor", "other"],
    "Choose the option closest to you so we route this to the right person.",
  ),
  message,
  source_page: z.string().trim().max(200).optional(),
  website: honeypot,
});

export const programmeInterestSchema = z.object({
  name,
  email,
  phone,
  region: z.string().trim().max(120, "That region name is too long.").optional().or(z.literal("")),
  programme: z
    .string()
    .trim()
    .min(1, "Choose which programme you want to join.")
    .max(120),
  rate_type: z.enum(["standard", "subsidised"], {
    message: "Choose standard or subsidised so we can send you the right details.",
  }),
  website: honeypot,
});

export const partnerEnquirySchema = z.object({
  org_name: z
    .string()
    .trim()
    .min(1, "We need your organisation's name.")
    .max(160, "That organisation name is too long."),
  contact_name: name,
  email,
  phone,
  partnership_type: optionalEnum(
    ["government", "ngo", "business", "school", "church", "donor", "international", "other"],
    "Choose the option closest to your organisation.",
  ),
  message,
  website: honeypot,
});

export const newsletterSchema = z.object({
  email,
  website: honeypot,
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type ProgrammeInterestInput = z.infer<typeof programmeInterestSchema>;
export type PartnerEnquiryInput = z.infer<typeof partnerEnquirySchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;

/** What every Server Action returns. `errors` is keyed by field name. */
export type FormState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string[]>;
  /**
   * The values the visitor submitted, echoed back so the form can re-render
   * them as defaults.
   *
   * React 19 automatically resets an uncontrolled form after its action
   * completes. Without this, one mistyped email address wipes everything the
   * person just wrote — including a long message. That is a real loss of
   * work, not a cosmetic issue.
   */
  values?: Record<string, string>;
};

export const IDLE_STATE: FormState = { ok: false, message: "" };

/**
 * Pulls the visitor's own fields out of a FormData, dropping React's internal
 * action bookkeeping ($ACTION_REF, $ACTION_KEY and friends) and the honeypot.
 */
export function submittedValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("$") || key === "website") continue;
    if (typeof value === "string") values[key] = value;
  }
  return values;
}

/** Flattens a Zod error into the shape the form components render. */
export function fieldErrors(error: z.ZodError): Record<string, string[]> {
  const flattened: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    (flattened[key] ??= []).push(issue.message);
  }
  return flattened;
}
