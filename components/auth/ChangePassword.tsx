"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PasswordInput } from "./PasswordInput";

export function ChangePassword() {
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function save() {
    if (pw.length < 6) {
      setMsg({ ok: false, text: "Password must be at least 6 characters." });
      return;
    }
    setBusy(true);
    setMsg(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) {
      setMsg({ ok: false, text: error.message });
      return;
    }
    setPw("");
    setMsg({ ok: true, text: "Password updated ✓" });
  }

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 4px 24px rgba(27,154,214,0.10)",
        marginTop: "20px",
      }}
    >
      <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A237E", margin: "0 0 12px" }}>
        Change password
      </h2>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <PasswordInput
            value={pw}
            onChange={setPw}
            placeholder="New password (min 6 characters)"
            autoComplete="new-password"
            minLength={6}
          />
        </div>
        <button
          onClick={save}
          disabled={busy}
          style={{
            background: busy ? "#9CA3AF" : "linear-gradient(135deg,#1B9AD6,#1A237E)",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: busy ? "not-allowed" : "pointer",
            minHeight: "48px",
          }}
        >
          {busy ? "Saving…" : "Update"}
        </button>
      </div>
      {msg && (
        <p style={{ margin: "10px 0 0", fontSize: "13px", color: msg.ok ? "#047857" : "#dc2626" }}>
          {msg.text}
        </p>
      )}
    </div>
  );
}
