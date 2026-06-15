"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LiveClassLink({ slug, current }: { slug: string; current: string | null }) {
  const router = useRouter();
  const [url, setUrl] = useState(current ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function save() {
    setBusy(true);
    setError(null);
    setSaved(false);

    const supabase = createClient();
    const { error } = await supabase
      .from("course_settings")
      .upsert({ slug, live_url: url.trim() || null, updated_at: new Date().toISOString() });

    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSaved(true);
    router.refresh();
  }

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
      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#1A237E", marginBottom: "8px" }}>
        Live class link (Zoom / Google Meet) — students get a “Join live class” button
      </label>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <input
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setSaved(false);
          }}
          placeholder="https://zoom.us/j/…  or  https://meet.google.com/…"
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
          onClick={save}
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
          {busy ? "Saving…" : "Save"}
        </button>
      </div>
      {error && <p style={{ color: "#dc2626", fontSize: "13px", margin: "8px 0 0" }}>{error}</p>}
      {saved && <p style={{ color: "#047857", fontSize: "13px", margin: "8px 0 0" }}>Saved ✓</p>}
    </div>
  );
}
