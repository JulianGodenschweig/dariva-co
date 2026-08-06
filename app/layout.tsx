import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { RevealScript } from "@/components/layout/RevealScript";
import { ServiceWorker } from "@/components/layout/ServiceWorker";
import { asset } from "@/lib/utils";

/* Self-hosted at build time by next/font — no runtime request to Google, which
   matters on a slow connection and keeps the site working offline. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const SITE = "https://www.dariva.co";

/** The github.io preview must never be indexed — it would compete with the
 *  real domain for the same content. Only production invites crawlers. */
const isProduction = process.env.DEPLOY_TARGET === "production";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default:
      "Dariva.co | Practical Mental Wellness Training in Namibia",
    template: "%s | Dariva.co",
  },
  description:
    "Dariva.co equips individuals, businesses and communities with practical mental wellness skills that improve emotional wellbeing, strengthen relationships, reduce workplace stress and help prevent Gender-Based Violence before crisis occurs.",
  keywords: [
    "Dariva",
    "Dariva.co",
    "mental wellness Namibia",
    "community counsellor training",
    "basic counselling course Namibia",
    "leadership development Namibia",
    "workplace wellness Namibia",
    "GBV prevention",
    "gender-based violence prevention",
    "emotional intelligence training",
    "personal growth programme",
    "employee wellbeing Africa",
    "mental health training Namibia",
  ],
  authors: [{ name: "Dariva.co" }],
  creator: "Dariva.co",
  publisher: "Dariva.co",
  alternates: { canonical: SITE },
  openGraph: {
    title: "Dariva.co | Practical Mental Wellness Training in Namibia",
    description:
      "Building Stronger Communities. Healthier Workplaces. Better Leaders.",
    url: SITE,
    siteName: "Dariva.co",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Dariva.co — Purpose, People, Planet",
      },
    ],
    locale: "en_NA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dariva.co | Practical Mental Wellness Training in Namibia",
    description:
      "Building Stronger Communities. Healthier Workplaces. Better Leaders.",
    images: ["/og.png"],
  },
  // asset() is required here: Next does not apply basePath to metadata icons.
  icons: {
    icon: [
      { url: asset("/favicon.ico"), sizes: "32x32" },
      { url: asset("/icon-192.png"), type: "image/png", sizes: "192x192" },
      { url: asset("/icon-512.png"), type: "image/png", sizes: "512x512" },
    ],
    apple: asset("/apple-touch-icon.png"),
  },
  robots: isProduction
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false },
  // Carried over from the previous site — losing this would break Search
  // Console ownership.
  verification: {
    google: "u4vbbviY7jzg_36WK7d8KQhJECTOEGOx_sLckGOOI7o",
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "EducationalOrganization"],
      "@id": `${SITE}/#organization`,
      name: "Dariva.co",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/icon-512.png`,
        width: 512,
        height: 512,
      },
      description:
        "Dariva.co is a social enterprise making mental wellness practical, affordable and accessible for every community across Namibia and Africa.",
      email: "dariva.co001@gmail.com",
      telephone: "+264-81-340-4364",
      sameAs: [],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+264-81-340-4364",
        email: "dariva.co001@gmail.com",
        contactType: "general",
        availableLanguage: ["English"],
      },
      areaServed: { "@type": "Country", name: "Namibia" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Dariva.co",
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <meta name="theme-color" content="#0d1b2a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        <RevealScript />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ServiceWorker />
      </body>
    </html>
  );
}
