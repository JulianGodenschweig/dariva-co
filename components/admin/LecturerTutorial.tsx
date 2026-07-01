"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "dariva_lms_tutorial_done";

const steps = [
  {
    icon: "👩‍🎓",
    title: "Students sign up under you",
    body: "When a student creates an account, they choose you as their lecturer. They land in your Pending list — only you see them.",
  },
  {
    icon: "✅",
    title: "You approve (or deny) them",
    body: "Hit Approve to unlock their course access. Hit Deny to remove them from your list. You can also Revoke access at any time from the Approved section.",
  },
  {
    icon: "📚",
    title: "You manage your own course materials",
    body: 'Go to Course Materials → open a course → upload PDFs, PowerPoints, or videos. Only your students see your files. Each lecturer has a completely separate library.',
  },
  {
    icon: "🔴",
    title: "Set your live class link",
    body: 'Inside any course, paste your Zoom or Google Meet link and hit Save. Your students will see a red "Join live class" button that opens your session.',
  },
  {
    icon: "➕",
    title: "Adding more lecturers",
    body: "Ask the new lecturer to sign up at dariva.co first. Then scroll down to the Lecturers section below and type their email — they instantly get their own portal.",
  },
];

export function LecturerTutorial() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(13,27,42,0.55)",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "32px 28px 24px",
          maxWidth: "420px",
          width: "100%",
          boxShadow: "0 24px 64px rgba(13,27,42,0.4)",
          position: "relative",
        }}
      >
        {/* Step dots */}
        <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "24px" }}>
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? "20px" : "8px",
                height: "8px",
                borderRadius: "999px",
                background: i === step ? "#1B9AD6" : "#E5E7EB",
                transition: "all 0.25s",
              }}
            />
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "48px", marginBottom: "14px", lineHeight: 1 }}>{current.icon}</div>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "#1A237E",
              margin: "0 0 10px",
              lineHeight: 1.3,
            }}
          >
            {current.title}
          </h2>
          <p style={{ color: "#4B5563", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>{current.body}</p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              style={{
                flex: 1,
                background: "white",
                border: "1px solid #D1D5DB",
                color: "#374151",
                padding: "12px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                minHeight: "44px",
              }}
            >
              Back
            </button>
          )}
          <button
            onClick={isLast ? dismiss : () => setStep((s) => s + 1)}
            style={{
              flex: 2,
              background: "linear-gradient(135deg,#1B9AD6,#1A237E)",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              minHeight: "44px",
            }}
          >
            {isLast ? "Got it, let's go →" : "Next →"}
          </button>
        </div>

        <button
          onClick={dismiss}
          aria-label="Skip tutorial"
          style={{
            position: "absolute",
            top: "14px",
            right: "16px",
            background: "none",
            border: "none",
            fontSize: "18px",
            color: "#9CA3AF",
            cursor: "pointer",
            lineHeight: 1,
            padding: "4px",
          }}
        >
          ✕
        </button>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#9CA3AF", margin: "14px 0 0" }}>
          You&apos;ll never see this again after closing.
        </p>
      </div>
    </div>
  );
}
