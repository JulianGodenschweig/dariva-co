import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

// Empty on dariva.co / Netlify, "/dariva-co" on GitHub Pages. next/link and
// next/image apply this themselves; raw <link> tags below need it manually.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dariva.co"),
  title: {
    default: "Dariva.co | Mental Wellness & the End of GBV in Namibia, Africa",
    template: "%s | Dariva.co",
  },
  description:
    "Community Mental Wellness & Ending Gender Based Violence",
  keywords: [
    "Dariva",
    "Dariva.co",
    "mental wellness",
    "community mental health",
    "community coach",
    "GBV prevention",
    "gender-based violence",
    "Namibia Africa mental health",
    "Lüderitz",
    "community wellness",
    "mental health training Namibia Africa",
    "end gender-based violence",
    "community care",
    "prevention mental wellness",
    "train the trainer Namibia Africa",
  ],
  authors: [{ name: "Dariva.co" }],
  creator: "Dariva.co",
  publisher: "Dariva.co",
  alternates: {
    canonical: "https://www.dariva.co",
  },
  openGraph: {
    title: "Dariva.co | Mental Wellness & the End of GBV in Namibia, Africa",
    description:
      "Community Mental Wellness & Ending Gender Based Violence",
    url: "https://www.dariva.co",
    siteName: "Dariva.co",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Dariva.co - Mental Wellness & the End of GBV in Namibia, Africa",
      },
    ],
    locale: "en_NA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dariva.co | Mental Wellness & the End of GBV in Namibia, Africa",
    description:
      "Community Mental Wellness & Ending Gender Based Violence",
    images: ["/logo.png"],
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

// Schema.org JSON-LD structured data for Organization
const schemaOrgData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.dariva.co/#organization",
      name: "Dariva.co",
      url: "https://www.dariva.co",
      logo: {
        "@type": "ImageObject",
        url: "https://www.dariva.co/favicon.png",
        width: 512,
        height: 512,
      },
      description:
        "Dariva.co trains community coaches in mental wellness and gender-based violence prevention across Namibia, Africa. Building emotionally resilient, self-sustaining communities.",
      sameAs: [],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+264-81-340-4364",
        contactType: "general",
        availableLanguage: ["English"],
      },
      areaServed: {
        "@type": "Country",
        name: "Namibia, Africa",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.dariva.co/#website",
      url: "https://www.dariva.co",
      name: "Dariva.co",
      publisher: {
        "@id": "https://www.dariva.co/#organization",
      },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": "https://www.dariva.co/#webpage",
      url: "https://www.dariva.co",
      name: "Dariva.co | Mental Wellness & the End of GBV in Namibia, Africa",
      description:
        "Dariva.co trains community coaches in mental wellness and gender-based violence prevention across Namibia, Africa. Building emotionally resilient, self-sustaining communities.",
      isPartOf: {
        "@id": "https://www.dariva.co/#website",
      },
      about: {
        "@id": "https://www.dariva.co/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="32x32" />
        <link rel="icon" href={`${basePath}/favicon.png`} type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href={`${basePath}/favicon.png`} />
        <meta name="theme-color" content="#1A237E" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <a href="https://wa.me/264813404364" target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="WhatsApp Dariva.co">
          <svg width="26" height="26" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.27 2 2 8.27 2 16c0 2.44.65 4.73 1.79 6.72L2 30l7.5-1.96A13.93 13.93 0 0016 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm7.19 19.19c-.3.84-1.75 1.61-2.4 1.71-.62.1-1.41.14-4.07-.87-3.44-1.24-5.65-4.74-5.82-4.96-.17-.22-1.4-1.86-1.4-3.55 0-1.69.88-2.52 1.19-2.86.31-.34.68-.43.91-.43h.65c.21 0 .5-.08.77.59.3.73 1.01 2.48 1.1 2.66.09.18.14.4.03.64-.11.24-.17.39-.34.6l-.51.6c-.17.17-.35.36-.15.7.2.34.9 1.48 1.93 2.4 1.33 1.18 2.44 1.55 2.78 1.72.34.17.54.14.74-.08.2-.22.85-1 1.08-1.34.22-.34.45-.28.77-.17.31.11 1.99.94 2.33 1.11.34.17.57.25.65.4.09.14.09.8-.21 1.63z"/>
          </svg>
        </a>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            function initReveal() {
              var els = document.querySelectorAll('.reveal');
              if (!els.length) return;
              var io = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                  if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    io.unobserve(e.target);
                  }
                });
              }, { threshold: 0.12 });
              els.forEach(function(el) { io.observe(el); });
            }
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', initReveal);
            } else {
              initReveal();
            }
            var _pushState = history.pushState;
            history.pushState = function() {
              _pushState.apply(this, arguments);
              setTimeout(initReveal, 400);
            };
          })();
        ` }} />
      </body>
    </html>
  );
}
