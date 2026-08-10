import { createHash } from "node:crypto";
import { headers } from "next/headers";

/**
 * Turnstile verification, IP hashing and the notification email.
 * Server-only. Nothing here may be imported from a client component.
 */

/**
 * The client IP, hashed with a server-only secret before it leaves this
 * process. The rate-limit table stores the hash, never an address — a leaked
 * database dump should not be a list of who visited a mental health site.
 */
export async function clientIpHash(): Promise<string> {
  const h = await headers();
  const ip =
    h.get("x-nf-client-connection-ip") ?? // Netlify
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown";

  const salt = process.env.IP_HASH_SALT ?? "dariva-dev-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 48);
}

/**
 * Cloudflare Turnstile. If no secret is configured the check is skipped and
 * says so in the log — the forms still work in local dev and on a preview
 * before the keys are set, rather than failing shut with no explanation.
 */
export async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("[turnstile] TURNSTILE_SECRET_KEY not set — skipping verification");
    return true;
  }
  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error("[turnstile] verification request failed", error);
    return false;
  }
}

/**
 * Notification email on every submission.
 *
 * Resend rather than a Supabase edge function, deliberately: the Server Action
 * already holds the validated payload and runs on Netlify's Node runtime, so
 * sending from here is one code path with one error surface. An edge function
 * would add a second network hop and a second place for a notification to fail
 * silently — and it would need either a webhook on the table or a service-role
 * call, both of which are more moving parts than a mail send deserves.
 *
 * Delivery failure is logged and swallowed. The row is already committed; a
 * bounced notification must never turn a successful enquiry into an error the
 * visitor sees.
 */
export async function notify(subject: string, lines: Record<string, string | undefined>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL ?? "dariva.co001@gmail.com";
  const from = process.env.NOTIFY_FROM ?? "Dariva.co website <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn(`[notify] RESEND_API_KEY not set — "${subject}" not emailed`);
    return;
  }

  const body = Object.entries(lines)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text: `${body}\n\n—\nSent by the Dariva.co website.`,
      }),
    });
    if (!res.ok) {
      console.error("[notify] Resend rejected the send", res.status, await res.text());
    }
  } catch (error) {
    console.error("[notify] send failed", error);
  }
}
