const RESEND_ENDPOINT = "https://api.resend.com/emails";

// Until the dariva.co domain is verified in Resend, we send from Resend's shared
// domain. In test mode Resend only delivers to the account owner's address — once
// the dariva.co domain is verified (DNS), switch FROM to e.g. noreply@dariva.co
// and emails to students/anyone will deliver.
const FROM = "Dariva.co <onboarding@resend.dev>";

export const NOTIFY_EMAIL = process.env.LMS_NOTIFY_EMAIL ?? "dariva.co001@gmail.com";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dariva.co";

export function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false as const, error: "RESEND_API_KEY missing" };
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to, subject, html }),
    });
    if (!res.ok) return { ok: false as const, error: await res.text() };
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: String(e) };
  }
}
