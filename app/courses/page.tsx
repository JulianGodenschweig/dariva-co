import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Courses",
  robots: { index: false, follow: false },
};

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function CoursesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, approved")
    .eq("id", user.id)
    .single();

  const isLecturer = profile?.role === "lecturer";
  if (!isLecturer && !profile?.approved) redirect("/pending");

  const firstName = (profile?.full_name || "").split(" ")[0] || "there";

  return (
    <main style={{ minHeight: "100svh", background: "#F8F6F3", padding: "24px 20px 64px" }}>
      <div style={{ maxWidth: "880px", margin: "0 auto" }}>
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
            {isLecturer && (
              <Link href="/admin" style={{ color: "#1A237E", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
                Lecturer panel
              </Link>
            )}
            <form action={signOut}>
              <button
                type="submit"
                style={{
                  background: "white",
                  border: "1px solid #D1D5DB",
                  color: "#1A237E",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  minHeight: "40px",
                }}
              >
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
          {isLecturer ? "Course management" : "Your courses"}
        </p>
        <h1 style={{ fontSize: "1.7rem", fontWeight: 800, color: "#1A237E", margin: "0 0 6px" }}>
          {isLecturer ? "Manage course materials" : `Hi ${firstName}, welcome to your training`}
        </h1>
        <p style={{ color: "#6B7280", fontSize: "14px", margin: "0 0 28px" }}>
          {isLecturer
            ? "Open a course to upload materials and set its live class link."
            : "Open a course to view and download its materials."}
        </p>

        <div
          style={{
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          }}
        >
          {courses.map((c) => (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              style={{
                display: "block",
                background: "white",
                borderRadius: "16px",
                padding: "22px 20px",
                textDecoration: "none",
                border: "1px solid #E5F3FB",
                boxShadow: "0 4px 20px rgba(27,154,214,0.08)",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg,#1B9AD6,#1A237E)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                  fontSize: "20px",
                }}
              >
                📘
              </div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A237E", margin: "0 0 6px" }}>
                {c.title}
              </h2>
              <p style={{ color: "#6B7280", fontSize: "13px", lineHeight: 1.6, margin: "0 0 14px" }}>
                {c.blurb}
              </p>
              <span style={{ color: "#1B9AD6", fontSize: "14px", fontWeight: 700 }}>Open →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
