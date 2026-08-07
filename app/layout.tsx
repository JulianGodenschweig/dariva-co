import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { org } from "@/lib/site";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dariva.co"),
  title: {
    default: "Dariva.co | Mental Wellness for Namibia & Africa",
    template: "%s | Dariva.co",
  },
  description:
    "Dariva.co equips individuals, businesses and communities with practical mental wellness skills that improve emotional wellbeing, strengthen relationships, reduce workplace stress and help prevent Gender-Based Violence before crisis occurs.",
  keywords: [
    "Dariva",
    "Dariva.co",
    "mental wellness Namibia",
    "community counselling",
    "workplace wellness Namibia",
    "leadership development Africa",
    "GBV prevention",
    "gender-based violence prevention",
    "emotional intelligence training",
    "community counsellor programme",
    "personal growth course",
    "employee wellbeing Namibia",
  ],
  authors: [{ name: org.name }],
  creator: org.name,
  publisher: org.name,
  alternates: { canonical: "https://www.dariva.co" },
  openGraph: {
    title: "Dariva.co | Mental Wellness for Namibia & Africa",
    description:
      "Practical mental wellness skills for individuals, businesses and communities. Learn • Grow • Lead.",
    url: "https://www.dariva.co",
    siteName: org.name,
    images: [
      {
        url: "/images/hero-plains.jpg",
        width: 1200,
        height: 630,
        alt: "Dariva.co — mental wellness across Namibia and Africa",
      },
    ],
    locale: "en_NA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dariva.co | Mental Wellness for Namibia & Africa",
    description:
      "Practical mental wellness skills for individuals, businesses and communities.",
    images: ["/images/hero-plains.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "u4vbbviY7jzg_36WK7d8KQhJECTOEGOx_sLckGOOI7o",
  },
};

const schemaOrgData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "NGO",
      "@id": "https://www.dariva.co/#organization",
      name: org.name,
      url: "https://www.dariva.co",
      logo: {
        "@type": "ImageObject",
        url: "https://www.dariva.co/favicon.png",
        width: 512,
        height: 512,
      },
      description: org.about,
      email: org.email,
      telephone: "+264-81-340-4364",
      sameAs: [],
      areaServed: { "@type": "Country", name: "Namibia" },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+264-81-340-4364",
        email: org.email,
        contactType: "general",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.dariva.co/#website",
      url: "https://www.dariva.co",
      name: org.name,
      publisher: { "@id": "https://www.dariva.co/#organization" },
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
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="32x32" />
        <link
          rel="icon"
          href={`${basePath}/favicon.png`}
          type="image/png"
          sizes="512x512"
        />
        <link rel="apple-touch-icon" href={`${basePath}/favicon.png`} />
        <meta name="theme-color" content="#0a0d13" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <a
          href={org.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message Dariva.co on WhatsApp"
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-teal shadow-[0_8px_30px_-6px_rgba(47,139,122,0.7)] transition-transform duration-300 hover:scale-110 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 32 32"
            fill="white"
            aria-hidden="true"
          >
            <path d="M16 2C8.27 2 2 8.27 2 16c0 2.44.65 4.73 1.79 6.72L2 30l7.5-1.96A13.93 13.93 0 0016 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm7.19 19.19c-.3.84-1.75 1.61-2.4 1.71-.62.1-1.41.14-4.07-.87-3.44-1.24-5.65-4.74-5.82-4.96-.17-.22-1.4-1.86-1.4-3.55 0-1.69.88-2.52 1.19-2.86.31-.34.68-.43.91-.43h.65c.21 0 .5-.08.77.59.3.73 1.01 2.48 1.1 2.66.09.18.14.4.03.64-.11.24-.17.39-.34.6l-.51.6c-.17.17-.35.36-.15.7.2.34.9 1.48 1.93 2.4 1.33 1.18 2.44 1.55 2.78 1.72.34.17.54.14.74-.08.2-.22.85-1 1.08-1.34.22-.34.45-.28.77-.17.31.11 1.99.94 2.33 1.11.34.17.57.25.65.4.09.14.09.8-.21 1.63z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
