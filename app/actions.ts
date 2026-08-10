"use server";

import { createClient } from "@/lib/supabase/server";
import { clientIpHash, verifyTurnstile, notify } from "@/lib/security";
import {
  enquirySchema,
  programmeInterestSchema,
  partnerEnquirySchema,
  newsletterSchema,
  fieldErrors,
  submittedValues,
  type FormState,
} from "@/lib/validation";

/**
 * The four lead-capture Server Actions — BRIEF.md §10.
 *
 * Every one runs the same gate in the same order:
 *   1. honeypot + Zod validation (cheapest, rejects most junk)
 *   2. Turnstile
 *   3. per-IP rate limit, via a SECURITY DEFINER function
 *   4. insert with the anon key under RLS — never `.select()` back, because
 *      anon has no SELECT and asking for one would fail the whole insert
 *   5. notification email, whose failure never fails the submission
 */

const RATE_LIMITED: FormState = {
  ok: false,
  message:
    "That is several submissions in a short time. Wait ten minutes and try again, or email dariva.co001@gmail.com directly — that reaches the same inbox.",
};

const TURNSTILE_FAILED: FormState = {
  ok: false,
  message:
    "The anti-spam check did not complete. Reload the page and try again — if it keeps failing, email dariva.co001@gmail.com.",
};

const WRITE_FAILED: FormState = {
  ok: false,
  message:
    "We could not save your enquiry — the problem is on our side, not yours. Try again in a moment, or email dariva.co001@gmail.com and we will pick it up from there.",
};

/** Bot filled the honeypot. Accept silently: a bot that sees an error learns. */
const SILENT_OK: FormState = { ok: true, message: "Thank you — we have your message." };

async function passesGate(token: string | undefined): Promise<FormState | null> {
  if (!(await verifyTurnstile(token))) return TURNSTILE_FAILED;

  const supabase = await createClient();
  const { data: allowed, error } = await supabase.rpc("check_rate_limit", {
    p_ip_hash: await clientIpHash(),
  });

  // A failing rate limiter must not lock out real people. Log and continue.
  if (error) {
    console.error("[rate-limit] check failed, allowing through", error);
    return null;
  }
  return allowed === false ? RATE_LIMITED : null;
}

export async function submitEnquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = enquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    if (formData.get("website")) return SILENT_OK;
    return {
      ok: false,
      message: "Some details need fixing before we can send this.",
      errors: fieldErrors(parsed.error),
      values: submittedValues(formData),
    };
  }
  if (parsed.data.website) return SILENT_OK;

  const blocked = await passesGate(formData.get("cf-turnstile-response") as string | undefined);
  if (blocked) return { ...blocked, values: submittedValues(formData) };

  const supabase = await createClient();
  const { error } = await supabase.from("enquiries").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    org: parsed.data.org || null,
    audience_type: parsed.data.audience_type ?? null,
    message: parsed.data.message,
    source_page: parsed.data.source_page ?? null,
  });

  if (error) {
    console.error("[enquiries] insert failed", error);
    return { ...WRITE_FAILED, values: submittedValues(formData) };
  }

  await notify(`New enquiry — ${parsed.data.name}`, {
    Name: parsed.data.name,
    Email: parsed.data.email,
    Phone: parsed.data.phone || undefined,
    Organisation: parsed.data.org || undefined,
    "Audience type": parsed.data.audience_type,
    "From page": parsed.data.source_page,
    Message: parsed.data.message,
  });

  return {
    ok: true,
    message: "Thank you — your enquiry is with us. We reply within two working days.",
  };
}

export async function submitProgrammeInterest(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = programmeInterestSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    if (formData.get("website")) return SILENT_OK;
    return {
      ok: false,
      message: "Some details need fixing before we can send this.",
      errors: fieldErrors(parsed.error),
      values: submittedValues(formData),
    };
  }
  if (parsed.data.website) return SILENT_OK;

  const blocked = await passesGate(formData.get("cf-turnstile-response") as string | undefined);
  if (blocked) return { ...blocked, values: submittedValues(formData) };

  const supabase = await createClient();
  const { error } = await supabase.from("programme_interest").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    region: parsed.data.region || null,
    programme: parsed.data.programme,
    rate_type: parsed.data.rate_type,
  });

  if (error) {
    console.error("[programme_interest] insert failed", error);
    return { ...WRITE_FAILED, values: submittedValues(formData) };
  }

  await notify(`Cohort interest — ${parsed.data.name}`, {
    Name: parsed.data.name,
    Email: parsed.data.email,
    Phone: parsed.data.phone || undefined,
    Region: parsed.data.region || undefined,
    Programme: parsed.data.programme,
    Rate: parsed.data.rate_type,
  });

  return {
    ok: true,
    message:
      "Thank you — you are on the list for the next cohort. We will email you the start date and what to bring.",
  };
}

export async function submitPartnerEnquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = partnerEnquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    if (formData.get("website")) return SILENT_OK;
    return {
      ok: false,
      message: "Some details need fixing before we can send this.",
      errors: fieldErrors(parsed.error),
      values: submittedValues(formData),
    };
  }
  if (parsed.data.website) return SILENT_OK;

  const blocked = await passesGate(formData.get("cf-turnstile-response") as string | undefined);
  if (blocked) return { ...blocked, values: submittedValues(formData) };

  const supabase = await createClient();
  const { error } = await supabase.from("partner_enquiries").insert({
    org_name: parsed.data.org_name,
    contact_name: parsed.data.contact_name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    partnership_type: parsed.data.partnership_type ?? null,
    message: parsed.data.message,
  });

  if (error) {
    console.error("[partner_enquiries] insert failed", error);
    return { ...WRITE_FAILED, values: submittedValues(formData) };
  }

  await notify(`Partnership enquiry — ${parsed.data.org_name}`, {
    Organisation: parsed.data.org_name,
    Contact: parsed.data.contact_name,
    Email: parsed.data.email,
    Phone: parsed.data.phone || undefined,
    Type: parsed.data.partnership_type,
    Message: parsed.data.message,
  });

  return {
    ok: true,
    message:
      "Thank you — your partnership enquiry is with us. Someone will be in touch to arrange a conversation.",
  };
}

export async function subscribeNewsletter(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = newsletterSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    if (formData.get("website")) return SILENT_OK;
    return {
      ok: false,
      message: "That email address needs fixing.",
      errors: fieldErrors(parsed.error),
      values: submittedValues(formData),
    };
  }
  if (parsed.data.website) return SILENT_OK;

  const blocked = await passesGate(formData.get("cf-turnstile-response") as string | undefined);
  if (blocked) return { ...blocked, values: submittedValues(formData) };

  const supabase = await createClient();
  const { error } = await supabase.from("newsletter").insert({ email: parsed.data.email });

  // 23505 = unique violation. Already subscribed is a success from where the
  // visitor is standing, and telling them otherwise leaks who is on the list.
  if (error && error.code !== "23505") {
    console.error("[newsletter] insert failed", error);
    return { ...WRITE_FAILED, values: submittedValues(formData) };
  }

  return {
    ok: true,
    message: "Thank you — we will email you when the first resources are published.",
  };
}
