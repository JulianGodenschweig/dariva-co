"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AuthShell, authInputStyle } from "@/components/auth/AuthShell";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to access your Dariva.co course material."
      footer={
        <>
          New here?{" "}
          <Link href="/signup" style={{ color: "#1B9AD6", fontWeight: 600 }}>
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <input
          style={authInputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          style={authInputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        {error && <p style={{ color: "#dc2626", fontSize: "13px", margin: 0 }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "linear-gradient(135deg,#1B9AD6,#1A237E)",
            color: "white",
            padding: "13px",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: 700,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            marginTop: "4px",
            minHeight: "48px",
          }}
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
    </AuthShell>
  );
}
