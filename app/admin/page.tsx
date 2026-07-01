import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { createClient } from "@/lib/supabase/server";
import { sendEmail, escapeHtml, SITE_URL } from "@/lib/email";
import { COURSE_BUCKET, courses } from "@/lib/courses";
import { AddLecturer } from "@/components/admin/AddLecturer";
import { LecturerTutorial } from "@/components/admin/LecturerTutorial";

export const metadata: Metadata = {
  title: "Lecturer panel",
  robots: { index: false, follow: false },
};

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

async function setApproval(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  const approve = formData.get("approve") === "true";
  if (!id) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: me } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (me?.role !== "lecturer") return;

  await supabase.from("profiles").update({ approved: approve }).eq("id", id);

  if (approve) {
    const { data: student } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", id)
      .single();
    if (student?.email) {
      await sendEmail({
        to: student.email,
        subject: "Your Dariva.co account is approved 🎉",
        html: `<p>Hi ${escapeHtml(student.full_name ?? "")},</p><p>Good news — your Dariva.co account has been approved. You can now log in and access your course material.</p><p><a href="${SITE_URL}/login">Log in →</a></p>`,
      });
    }
  }

  revalidatePath("/admin");
}

async function denyApplicant(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: me } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (me?.role !== "lecturer") return;

  await supabase.from("profiles").delete().eq("id", id);
  revalidatePath("/admin");
}

async function migrateLegacyFiles() {
  "use server";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: me } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (me?.role !== "lecturer") return;

  for (const course of courses) {
    const { data: files } = await supabase.storage.from(COURSE_BUCKET).list(course.slug);
    if (!files) continue;
    for (const f of files) {
      if (f.name === ".emptyFolderPlaceholder" || !f.id) continue;
      const oldPath = `${course.slug}/${f.name}`;
      const newPath = `${user.id}/${course.slug}/${f.name}`;
      await supabase.storage.from(COURSE_BUCKET).copy(oldPath, newPath);
      await supabase.storage.from(COURSE_BUCKET).remove([oldPath]);
    }
  }

  revalidatePath("/admin");
  revalidatePath("/courses");
}

type Row = {
  id: string;
  full_name: string | null;
  email: string | null;
  approved: boolean;
  created_at: string;
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: me } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (me?.role !== "lecturer") redirect("/account");

  const { data: students } = await supabase
    .from("profiles")
    .select("id, full_name, email, approved, created_at")
    .eq("role", "student")
    .eq("lecturer_id", user.id)
    .order("created_at", { ascending: true });

  const { data: lecturers } = await supabase
    .from("profiles")
    .select("id, full_name, email, approved, created_at")
    .eq("role", "lecturer")
    .order("created_at", { ascending: true });

  const rows = (students ?? []) as Row[];
  const pending = rows.filter((s) => !s.approved);
  const approved = rows.filter((s) => s.approved);
  const lecturerRows = (lecturers ?? []) as Row[];

  // Check if old-format files still exist (first segment = course slug, not a UUID).
  let legacyFileCount = 0;
  for (const course of courses) {
    const { data: oldFiles } = await supabase.storage.from(COURSE_BUCKET).list(course.slug);
    legacyFileCount += (oldFiles ?? []).filter((f) => f.id !== null && f.name !== ".emptyFolderPlaceholder").length;
  }

  return (
    <main style={{ minHeight: "100svh", background: "#F8F6F3", padding: "24px 20px 64px" }}>
      <LecturerTutorial />
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <Image src="/logo.png" alt="Dariva.co" width={120} height={32} style={{ objectFit: "contain" }} />
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <Link href="/courses" style={{ color: "#1A237E", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Course materials
            </Link>
            <form action={signOut}>
              <button type="submit" style={signOutBtn}>
                Sign out
              </button>
            </form>
          </div>
        </div>

        {legacyFileCount > 0 && (
          <div
            style={{
              background: "#FFFBEB",
              border: "1px solid #FDE68A",
              borderRadius: "12px",
              padding: "14px 16px",
              marginBottom: "20px",
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: "20px", flexShrink: 0 }}>📂</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#92400E", fontSize: "14px" }}>
                Your existing course files need to be moved
              </p>
              <p style={{ margin: "0 0 10px", color: "#78350F", fontSize: "13px" }}>
                {legacyFileCount} file{legacyFileCount > 1 ? "s" : ""} found at the old location. Click below to move them to your private folder — one click, done.
              </p>
              <form action={migrateLegacyFiles}>
                <button
                  type="submit"
                  style={{
                    background: "#F59E0B",
                    color: "white",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                    minHeight: "36px",
                  }}
                >
                  Move my files →
                </button>
              </form>
            </div>
          </div>
        )}

        <p
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#1B9AD6",
            margin: "0 0 4px",
          }}
        >
          Lecturer panel
        </p>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1A237E", margin: "0 0 6px" }}>
          Approve students
        </h1>
        <p style={{ color: "#6B7280", fontSize: "14px", margin: "0 0 28px" }}>
          {pending.length} pending · {approved.length} approved
        </p>

        <section style={{ marginBottom: "36px" }}>
          <h2 style={sectionH}>Pending approval ({pending.length})</h2>
          {pending.length === 0 ? (
            <p style={emptyText}>No students waiting right now. 🎉</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {pending.map((s) => (
                <div key={s.id} style={card}>
                  <div style={{ minWidth: 0 }}>
                    <p style={nameText}>{s.full_name || "—"}</p>
                    <p style={subText}>{s.email}</p>
                    <p style={dateText}>Registered {fmt(s.created_at)}</p>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                    <form action={setApproval}>
                      <input type="hidden" name="id" value={s.id} />
                      <input type="hidden" name="approve" value="true" />
                      <button type="submit" style={approveBtn}>
                        Approve
                      </button>
                    </form>
                    <form action={denyApplicant}>
                      <input type="hidden" name="id" value={s.id} />
                      <button type="submit" style={denyBtn}>
                        Deny
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 style={sectionH}>Approved students ({approved.length})</h2>
          {approved.length === 0 ? (
            <p style={emptyText}>None yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {approved.map((s) => (
                <div key={s.id} style={cardApproved}>
                  <div style={{ minWidth: 0 }}>
                    <p style={nameText}>{s.full_name || "—"}</p>
                    <p style={subText}>{s.email}</p>
                  </div>
                  <form action={setApproval}>
                    <input type="hidden" name="id" value={s.id} />
                    <input type="hidden" name="approve" value="false" />
                    <button type="submit" style={revokeBtn}>
                      Revoke
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={{ marginTop: "36px" }}>
          <h2 style={sectionH}>Lecturers ({lecturerRows.length})</h2>
          {lecturerRows.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "12px" }}>
              {lecturerRows.map((l) => (
                <div
                  key={l.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    background: "white",
                    border: "1px solid #E5F3FB",
                    borderRadius: "12px",
                    padding: "12px 16px",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <p style={nameText}>{l.full_name || "—"}</p>
                    <p style={subText}>{l.email}</p>
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#1A237E",
                      background: "#1A237E12",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Lecturer
                  </span>
                </div>
              ))}
            </div>
          )}
          <AddLecturer />
        </section>
      </div>
    </main>
  );
}

const signOutBtn: CSSProperties = {
  background: "white",
  border: "1px solid #D1D5DB",
  color: "#1A237E",
  padding: "8px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  minHeight: "40px",
};
const sectionH: CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: 700,
  color: "#0D1B2A",
  margin: "0 0 12px",
};
const emptyText: CSSProperties = {
  color: "#9CA3AF",
  fontSize: "14px",
  background: "white",
  border: "1px dashed #E5E7EB",
  borderRadius: "12px",
  padding: "20px",
  textAlign: "center",
  margin: 0,
};
const card: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  background: "white",
  border: "1px solid #FDE68A",
  borderRadius: "12px",
  padding: "14px 16px",
  boxShadow: "0 2px 12px rgba(27,154,214,0.06)",
};
const cardApproved: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  background: "white",
  border: "1px solid #A7F3D0",
  borderRadius: "12px",
  padding: "12px 16px",
};
const nameText: CSSProperties = {
  margin: 0,
  fontWeight: 700,
  color: "#1A237E",
  fontSize: "15px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const subText: CSSProperties = {
  margin: "2px 0 0",
  color: "#6B7280",
  fontSize: "13px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const dateText: CSSProperties = { margin: "4px 0 0", color: "#9CA3AF", fontSize: "12px" };
const approveBtn: CSSProperties = {
  background: "#10B981",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
  minHeight: "44px",
  whiteSpace: "nowrap",
};
const denyBtn: CSSProperties = {
  background: "white",
  color: "#B91C1C",
  border: "1px solid #FCA5A5",
  padding: "10px 14px",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  minHeight: "44px",
  whiteSpace: "nowrap",
};
const revokeBtn: CSSProperties = {
  background: "white",
  color: "#B45309",
  border: "1px solid #FDE68A",
  padding: "8px 14px",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  minHeight: "40px",
  whiteSpace: "nowrap",
};
