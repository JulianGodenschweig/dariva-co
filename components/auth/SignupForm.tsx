"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AuthShell, authInputStyle } from "@/components/auth/AuthShell";
import { PasswordInput } from "@/components/auth/PasswordInput";

type Lecturer = { id: string; full_name: string | null };

export function SignupForm({ lecturers }: { lecturers: Lecturer[] }) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lecturerId, setLecturerId] = useState(lecturers[0]?.id ?? "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!lecturerId) {
      setError("Please select a lecturer.");
      return;
    }
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { full_name: fullName.trim(), lecturer_id: lecturerId } },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    fetch("/api/notify-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: fullName.trim(), email: email.trim(), lecturerId }),
    }).catch(() => {});

    if (!data.session) {
      setCheckEmail(true);
      setLoading(false);
      return;
    }

    router.push("/pending");
    router.refresh();
  }

  const lecturerName =
    lecturers.find((l) => l.id === lecturerId)?.full_name ?? "a lecturer";

  return (
    <AuthShell
      title={checkEmail ? "Check your email" : "Create your account"}
      subtitle={
        checkEmail
          ? "One quick step before we continue."
          : "Sign up to access your Dariva.co course material. A lecturer approves your account before you can start."
      }
      footer={
        checkEmail ? (
          <>
            Already confirmed?{" "}
            <Link href="/login" style={{ color: "#1B9AD6", fontWeight: 600 }}>
              Log in
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#1B9AD6", fontWeight: 600 }}>
              Log in
            </Link>
          </>
        )
      }
    >
      {checkEmail ? (
        <div
          style={{
            background: "#EFF8FD",
            border: "1px solid #cfe4f7",
            borderRadius: "12px",
            padding: "18px",
            fontSize: "14px",
            lineHeight: 1.6,
            color: "#1A237E",
          }}
        >
          We sent a confirmation link to <strong>{email}</strong>. Open it to verify
          your account, then log in. Once verified,{" "}
          <strong>{lecturerName}</strong> will approve your access.
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <input
            style={authInputStyle}
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            autoComplete="name"
          />
          <input
            style={authInputStyle}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <PasswordInput
            value={password}
            onChange={setPassword}
            placeholder="Password (min 6 characters)"
            autoComplete="new-password"
            minLength={6}
          />
          {lecturers.length > 1 && (
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Choose your lecturer
              </label>
              <select
                value={lecturerId}
                onChange={(e) => setLecturerId(e.target.value)}
                required
                style={{
                  ...authInputStyle,
                  width: "100%",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled>
                  Select a lecturer…
                </option>
                {lecturers.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.full_name ?? l.id}
                  </option>
                ))}
              </select>
            </div>
          )}
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
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
