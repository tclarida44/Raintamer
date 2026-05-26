import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileEstimateCta } from "@/components/layout/MobileEstimateCta";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "wdth"],
  display: "swap",
});

const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Rain Tamer | Seamless Gutters, French Drains, Gutter Guards in Oklahoma City",
    template: "%s | Rain Tamer",
  },
  description:
    "Premium seamless gutters, French drains, and gutter guards across the Oklahoma City metro since 2012. Internal hangers every two feet. Hand-mitered corners. Built to tame Oklahoma weather.",
  keywords: [
    "seamless gutters Oklahoma City",
    "gutter installation OKC",
    "French drains Oklahoma",
    "gutter guards Edmond",
    "copper gutters OKC",
    "Rain Tamer",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: SITE.url,
    title: "Rain Tamer | Built to tame Oklahoma weather.",
    description:
      "Premium seamless gutters, French drains, and gutter guards across the Oklahoma City metro since 2012.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rain Tamer | Built to tame Oklahoma weather.",
    description:
      "Premium seamless gutters, French drains, and gutter guards across the Oklahoma City metro since 2012.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
};

/**
 * Inline before-paint skip-flag for the homepage intro animation. Sets
 * `data-intro-skip` on <html> if the user has already seen the intro this
 * session or has prefers-reduced-motion on. CSS in globals.css uses that
 * flag to hide the overlay before first paint so there's no flash.
 */
const INTRO_SKIP_SCRIPT = `try{if(sessionStorage.getItem("rt-intro-seen")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.introSkip="1"}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SKIP_SCRIPT }} />
      </head>
      <body className="bg-ink-1000 text-bone-50 antialiased">
        <a href="#main" className="skip-to-content">Skip to content</a>
        <JsonLd data={localBusinessSchema()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileEstimateCta />
        <FloatingContact />
      </body>
    </html>
  );
}
