import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConnectingStroke } from "@/components/motion/ConnectingStroke";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} — Mental Wellness Starts With One Person`,
    template: `%s — ${site.name}`,
  },
  description:
    "A Namibian social enterprise training ordinary people in practical mental wellness skills, so communities prevent crisis instead of reacting to it.",
  openGraph: {
    type: "website",
    locale: "en_NA",
    siteName: site.name,
    url: site.domain,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FBFCFD",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NA" className={fontVariables}>
      <body>
        {/* First tab stop on every page. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-button focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to main content
        </a>

        <ConnectingStroke />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
