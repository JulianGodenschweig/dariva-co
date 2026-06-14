import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Pending approval",
  robots: { index: false, follow: false },
};

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function PendingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, approved, role")
    .eq("id", user.id)
    .single();

  // Already cleared → send them to their home base.
  if (profile?.role === "lecturer") redirect("/admin");
  if (profile?.approved) redirect("/courses");

  const name = profile?.full_name || user.email;

  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        background: "linear-gradient(135deg,#0D1B2A 0%,#1A237E 55%,#1B9AD6 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "white",
          borderRadius: "20px",
          padding: "36px 28px",
          boxShadow: "0 20px 60px rgba(13,27,42,0.35)",
          textAlign: "center",
        }}
      >
        <Image
          src="/logo.png"
          alt="Dariva.co"
          width={140}
          height={36}
          style={{ objectFit: "contain", marginBottom: "20px" }}
          priority
        />
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "999px",
            background: "#FFFBEB",
            border: "1px solid #FDE68A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "26px",
          }}
        >
          ⏳
        </div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1A237E", margin: "0 0 8px" }}>
          You&apos;re on the list, {name}!
        </h1>
        <p style={{ color: "#4B5563", fontSize: "15px", lineHeight: 1.7, margin: "0 0 8px" }}>
          Your account is awaiting approval from a Dariva.co lecturer. As soon as
          you&apos;re approved, your course material unlocks right here.
        </p>
        <p style={{ color: "#9CA3AF", fontSize: "13px", margin: "0 0 24px" }}>
          Already approved? Refresh this page.
        </p>
        <form action={signOut}>
          <button
            type="submit"
            style={{
              background: "white",
              border: "1px solid #D1D5DB",
              color: "#1A237E",
              padding: "10px 20px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              minHeight: "44px",
            }}
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
