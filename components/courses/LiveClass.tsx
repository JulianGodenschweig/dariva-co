"use client";

import { useState } from "react";

export function LiveClass({ roomUrl }: { roomUrl: string }) {
  const [joined, setJoined] = useState(false);

  if (!joined) {
    return (
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => setJoined(true)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
            background: "#EF4444",
            color: "white",
            padding: "14px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            minHeight: "52px",
          }}
        >
          🔴 Join live class
        </button>
        <p style={{ color: "#6B7280", fontSize: "13px", lineHeight: 1.5, margin: "8px 2px 0", textAlign: "center" }}>
          Your live class runs right here on the page — no login, no downloads, no leaving the site.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "16px" }}>
      <iframe
        title="Live class"
        src={roomUrl}
        allow="camera; microphone; fullscreen; speaker; display-capture; autoplay"
        style={{ width: "100%", height: "560px", border: "none", borderRadius: "12px", background: "#000" }}
      />
      <button
        onClick={() => setJoined(false)}
        style={{
          marginTop: "8px",
          background: "white",
          color: "#B91C1C",
          border: "1px solid #FCA5A5",
          padding: "8px 16px",
          borderRadius: "8px",
          fontSize: "13px",
          fontWeight: 600,
          cursor: "pointer",
          minHeight: "40px",
        }}
      >
        Leave class
      </button>
    </div>
  );
}
