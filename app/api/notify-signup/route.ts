import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmail, escapeHtml, NOTIFY_EMAIL, SITE_URL } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = body?.email as string | undefined;
  const name = (body?.name as string | undefined) ?? "";
  const lecturerId = body?.lecturerId as string | undefined;
  if (!email) return NextResponse.json({ ok: false }, { status: 400 });

  let to = NOTIFY_EMAIL;
  if (lecturerId) {
    const supabase = await createClient();
    const { data: lecturerEmail } = await supabase.rpc("get_lecturer_email", { p_id: lecturerId });
    if (lecturerEmail) to = lecturerEmail;
  }

  await sendEmail({
    to,
    subject: "New Dariva.co student registration",
    html: `<p>A new student has registered under your account and is awaiting your approval:</p>
<p><strong>${escapeHtml(name) || "(no name given)"}</strong><br/>${escapeHtml(email)}</p>
<p><a href="${SITE_URL}/admin">Open the lecturer panel to approve →</a></p>`,
  });

  return NextResponse.json({ ok: true });
}
