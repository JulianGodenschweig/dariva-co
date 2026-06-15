"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AddLecturer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function add() {
    const target = email.trim().toLowerCase();
    if (!target) return;
    setBusy(true);
    setMsg(null);

    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .update({ role: "lecturer", approved: true })
      .eq("email", target)
      .select("email");

    setBusy(false);
    if (error) {
      setMsg({ ok: false, text: error.message });
      return;
    }
    if (!data || data.length === 0) {
      setMsg({
        ok: false,
        text: "No account with that email yet. Ask them to sign up at dariva.co first, then add them here.",
      });
      return;
    }
    setEmail("");
    setMsg({ ok: true, text: `${target} is now a lecturer ✓` });
    router.refresh();
  }

  return (
    <div style={{ background: "white", border: "1px solid #E5F3FB", borderRadius: "12px", padding: "16px", marginTop: "12px" }}>
      <p style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 600, color: "#1A237E" }}>
        Add a lecturer — they sign up at dariva.co first, then enter their email here
      </p>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMsg(null);
          }}
          placeholder="lecturer@email.com"
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "10px 12px",
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
          }}
        />
        <button
          onClick={add}
          disabled={busy}
          style={{
            background: busy ? "#9CA3AF" : "#1A237E",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: busy ? "not-allowed" : "pointer",
            minHeight: "42px",
          }}
        >
          {busy ? "Adding…" : "Make lecturer"}
        </button>
      </div>
      {msg && (
        <p style={{ margin: "8px 0 0", fontSize: "13px", color: msg.ok ? "#047857" : "#dc2626" }}>{msg.text}</p>
      )}
    </div>
  );
}
