"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { COURSE_BUCKET } from "@/lib/courses";

export function RemoveMaterial({
  slug,
  name,
  lecturerId,
}: {
  slug: string;
  name: string;
  lecturerId: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function remove() {
    if (!window.confirm(`Remove "${name}"? Students will no longer see or download this file.`)) return;
    setBusy(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.storage
      .from(COURSE_BUCKET)
      .remove([`${lecturerId}/${slug}/${name}`]);

    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.refresh();
  }

  return (
    <>
      <button
        onClick={remove}
        disabled={busy}
        style={{
          color: "#B91C1C",
          background: "white",
          border: "1px solid #FCA5A5",
          padding: "8px 12px",
          borderRadius: "8px",
          fontSize: "13px",
          fontWeight: 600,
          cursor: busy ? "not-allowed" : "pointer",
          minHeight: "40px",
          display: "inline-flex",
          alignItems: "center",
          whiteSpace: "nowrap",
        }}
      >
        {busy ? "Removing…" : "Remove"}
      </button>
      {error && <p style={{ color: "#dc2626", fontSize: "13px", margin: "8px 0 0", width: "100%" }}>{error}</p>}
    </>
  );
}
