import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { createClient } from "@/lib/supabase/server";

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

  // Defense in depth — the "lecturers update profiles" RLS policy also enforces this.
  const { data: me } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (me?.role !== "lecturer") return;

  await supabase.from("profiles").update({ approved: approve }).eq("id", id);
  revalidatePath("/admin");
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
    .order("created_at", { ascending: true });

  const rows = (students ?? []) as Row[];
  const pending = rows.filter((s) => !s.approved);
  const approved = rows.filter((s) => s.approved);

  return (
    <main style={{ minHeight: "100svh", background: "#F8F6F3", padding: "24px 20px 64px" }}>
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
                  <form action={setApproval}>
                    <input type="hidden" name="id" value={s.id} />
                    <input type="hidden" name="approve" value="true" />
                    <button type="submit" style={approveBtn}>
                      Approve
                    </button>
                  </form>
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
