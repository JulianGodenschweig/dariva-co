"use client";

import Script from "next/script";

/**
 * Cloudflare Turnstile widget.
 *
 * Renders nothing when NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset, and the server
 * skips verification in that case too — so the forms are fully functional
 * before the keys are configured, rather than silently failing shut.
 *
 * The script is deferred: it must never compete with the LCP element.
 */
export function Turnstile() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
      />
      <div
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-theme="light"
        data-appearance="interaction-only"
      />
    </>
  );
}
