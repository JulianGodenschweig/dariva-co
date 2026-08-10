import localFont from "next/font/local";

/**
 * Three roles, three faces, self-hosted. See public/fonts/LICENSES.md.
 *
 * All variable, Latin-subset, woff2 only — 61.8 KB total. `display: swap` so
 * a slow connection renders copy immediately in the fallback rather than
 * holding a blank screen, which matters far more here than avoiding a reflow.
 */

export const clash = localFont({
  src: "../public/fonts/ClashDisplay-Variable.latin.woff2",
  variable: "--font-clash",
  display: "swap",
  weight: "200 700",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const space = localFont({
  src: "../public/fonts/SpaceGrotesk-Variable.latin.woff2",
  variable: "--font-space",
  display: "swap",
  weight: "300 700",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const geistMono = localFont({
  src: "../public/fonts/GeistMono-Variable.latin.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "300 700",
  fallback: ["ui-monospace", "SF Mono", "Menlo", "monospace"],
  adjustFontFallback: false,
});

export const fontVariables = `${clash.variable} ${space.variable} ${geistMono.variable}`;
