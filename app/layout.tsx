import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppWidget } from "@/components/whatsapp-widget";

export const metadata: Metadata = {
  metadataBase: new URL("https://dariva.co"),
  title: {
    default: "Dariva.co | Community Mental Wellness in Namibia",
    template: "%s | Dariva.co"
  },
  description:
    "Dariva.co builds community counsellors, preventative mental wellness systems, digital health access, and economic pathways that strengthen communities in Namibia.",
  keywords: [
    "Dariva.co",
    "Namibia mental wellness",
    "community counselling",
    "GBV prevention Namibia",
    "mental health community empowerment",
    "preventative mental wellness"
  ],
  openGraph: {
    title: "Dariva.co | Transform Mental Wellness Into Community Power",
    description:
      "A Namibia-based mental wellness ecosystem building community counsellors, accessible support, and practical pathways to safer, more resilient communities.",
    url: "https://dariva.co",
    siteName: "Dariva.co",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Dariva.co" }],
    locale: "en_NA",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="no-js">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.remove('no-js')` }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
