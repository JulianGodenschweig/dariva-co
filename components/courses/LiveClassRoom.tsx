"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LiveClassRoom({ slug, current }: { slug: string; current: string | null }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function set(action: "start" | "end") {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/live-class", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, action }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const on = !!current;

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #E5F3FB",
        borderRadius: "12px",
        padding: "14px 16px",
        marginBottom: "16px",
      }}
    >
      <p style={{ fontSize: "13px", fontWeight: 600, color: "#1A237E", margin: "0 0 8px" }}>
        Live class room {on ? "— LIVE 🔴 students can join above" : "— off"}
      </p>
      {on ? (
        <button
          onClick={() => set("end")}
          disabled={busy}
          style={btn("#B91C1C", "white", "1px solid #FCA5A5", busy)}
        >
          {busy ? "…" : "End live class"}
        </button>
      ) : (
        <button
          onClick={() => set("start")}
          disabled={busy}
          style={btn("#1A237E", "white", "none", busy)}
        >
          {busy ? "Starting…" : "Start live class"}
        </button>
      )}
      <p style={{ color: "#9CA3AF", fontSize: "12px", margin: "8px 0 0", lineHeight: 1.5 }}>
        When live, students see a “Join live class” button that opens the meeting right on this page.
      </p>
      {error && <p style={{ color: "#dc2626", fontSize: "13px", margin: "8px 0 0" }}>{error}</p>}
    </div>
  );
}

function btn(bg: string, color: string, border: string, busy: boolean) {
  return {
    background: busy ? "#9CA3AF" : bg,
    color,
    border,
    padding: "10px 18px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: busy ? "not-allowed" : "pointer",
    minHeight: "42px",
  } as const;
}
