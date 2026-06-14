import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/** Shared input style for the auth forms. */
export const authInputStyle: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #D1D5DB",
  borderRadius: "10px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

/** Branded, mobile-first shell for /signup and /login (Dariva "river" theme). */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        background: "linear-gradient(135deg,#0D1B2A 0%,#1A237E 55%,#1B9AD6 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          borderRadius: "20px",
          padding: "36px 28px",
          boxShadow: "0 20px 60px rgba(13,27,42,0.35)",
        }}
      >
        <Link href="/" style={{ display: "inline-block", marginBottom: "20px" }}>
          <Image
            src="/logo.png"
            alt="Dariva.co"
            width={130}
            height={34}
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1A237E", margin: "0 0 6px" }}>
          {title}
        </h1>
        <p style={{ color: "#6B7280", fontSize: "14px", margin: "0 0 24px", lineHeight: 1.6 }}>
          {subtitle}
        </p>
        {children}
        <div style={{ marginTop: "20px", fontSize: "14px", color: "#6B7280", textAlign: "center" }}>
          {footer}
        </div>
      </div>
    </main>
  );
}
