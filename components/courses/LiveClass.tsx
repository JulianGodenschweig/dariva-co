"use client";

import { useEffect, useRef, useState } from "react";

const JITSI_DOMAIN = "meet.jit.si";
const SCRIPT_SRC = `https://${JITSI_DOMAIN}/external_api.js`;

type JitsiApi = { dispose: () => void; addEventListener?: (event: string, cb: () => void) => void };

declare global {
  interface Window {
    JitsiMeetExternalAPI?: new (domain: string, options: Record<string, unknown>) => JitsiApi;
  }
}

function loadJitsiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.JitsiMeetExternalAPI) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load the meeting.")));
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load the meeting."));
    document.body.appendChild(s);
  });
}

export function LiveClass({ room, displayName }: { room: string; displayName: string }) {
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<JitsiApi | null>(null);

  useEffect(() => {
    if (!joined) return;
    let cancelled = false;

    loadJitsiScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.JitsiMeetExternalAPI) return;
        const api = new window.JitsiMeetExternalAPI(JITSI_DOMAIN, {
          roomName: room,
          parentNode: containerRef.current,
          width: "100%",
          height: 560,
          userInfo: { displayName },
          configOverwrite: {
            prejoinPageEnabled: true,
            disableDeepLinking: true,
            startWithAudioMuted: true,
          },
          interfaceConfigOverwrite: {
            MOBILE_APP_PROMO: false,
            SHOW_JITSI_WATERMARK: false,
            DEFAULT_REMOTE_DISPLAY_NAME: "Classmate",
          },
        });
        apiRef.current = api;
        api.addEventListener?.("readyToClose", () => setJoined(false));
      })
      .catch((e: Error) => setError(e.message));

    return () => {
      cancelled = true;
      apiRef.current?.dispose();
      apiRef.current = null;
    };
  }, [joined, room, displayName]);

  if (!joined) {
    return (
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => {
            setError(null);
            setJoined(true);
          }}
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
          Your live class runs right here on the page — no downloads, no leaving the site.
        </p>
        {error && <p style={{ color: "#dc2626", fontSize: "13px", margin: "8px 0 0", textAlign: "center" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "560px", borderRadius: "12px", overflow: "hidden", background: "#000" }}
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
