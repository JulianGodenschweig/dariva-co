import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, role, approved")
    .eq("id", user.id)
    .single();

  const name = profile?.full_name || user.email;
  const role = profile?.role ?? "student";
  const approved = profile?.approved ?? false;

  return (
    <main style={{ minHeight: "100svh", background: "#F8F6F3", padding: "24px 20px" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <Image
            src="/logo.png"
            alt="Dariva.co"
            width={120}
            height={32}
            style={{ objectFit: "contain" }}
          />
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

        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "28px 24px",
            boxShadow: "0 4px 24px rgba(27,154,214,0.10)",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1A237E", margin: "0 0 4px" }}>
            Hi, {name}
          </h1>
          <p style={{ color: "#6B7280", fontSize: "14px", margin: "0 0 18px" }}>{user.email}</p>

          <span
            style={{
              display: "inline-block",
              background: "rgba(26,35,126,0.06)",
              color: "#1A237E",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: "999px",
            }}
          >
            {role}
          </span>

          <div
            style={{
              marginTop: "20px",
              borderRadius: "12px",
              padding: "16px 18px",
              background: approved ? "#ECFDF5" : "#FFFBEB",
              border: `1px solid ${approved ? "#A7F3D0" : "#FDE68A"}`,
            }}
          >
            <p
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: "15px",
                color: approved ? "#047857" : "#B45309",
              }}
            >
              {approved ? "Account approved" : "Pending approval"}
            </p>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: "14px",
                lineHeight: 1.6,
                color: approved ? "#065F46" : "#92400E",
              }}
            >
              {approved
                ? "You're all set. Your course material will appear here once it's published."
                : "A lecturer will review and approve your account shortly. You'll get access to your course material once approved."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
