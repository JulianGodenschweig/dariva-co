import { NextResponse } from "next/server";
import { sendEmail, escapeHtml, NOTIFY_EMAIL, SITE_URL } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = body?.email as string | undefined;
  const name = (body?.name as string | undefined) ?? "";
  if (!email) return NextResponse.json({ ok: false }, { status: 400 });

  await sendEmail({
    to: NOTIFY_EMAIL,
    subject: "New Dariva.co student registration",
    html: `<p>A new student has registered and is awaiting your approval:</p>
<p><strong>${escapeHtml(name) || "(no name given)"}</strong><br/>${escapeHtml(email)}</p>
<p><a href="${SITE_URL}/admin">Open the lecturer panel to approve →</a></p>`,
  });

  return NextResponse.json({ ok: true });
}
