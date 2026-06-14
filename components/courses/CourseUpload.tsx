"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { COURSE_BUCKET } from "@/lib/courses";

export function CourseUpload({ slug }: { slug: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.storage
      .from(COURSE_BUCKET)
      .upload(`${slug}/${file.name}`, file, { upsert: true });

    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
    if (error) {
      setError(error.message);
      return;
    }
    router.refresh();
  }

  return (
    <div style={{ marginBottom: "16px" }}>
      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: busy ? "#9CA3AF" : "#10B981",
          color: "white",
          padding: "10px 18px",
          borderRadius: "10px",
          fontSize: "14px",
          fontWeight: 700,
          cursor: busy ? "not-allowed" : "pointer",
          minHeight: "44px",
        }}
      >
        {busy ? "Uploading…" : "+ Upload material (PPT or PDF)"}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.ppt,.pptx"
          onChange={onChange}
          disabled={busy}
          style={{ display: "none" }}
        />
      </label>
      {error && <p style={{ color: "#dc2626", fontSize: "13px", margin: "8px 0 0" }}>{error}</p>}
    </div>
  );
}
