import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Geist_Mono } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, websiteSchema, organizationSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

// Sharper, more modern type system:
// - Display: Inter Tight (tight tracking, geometric, very modern)
// - Body:    Inter (universal sharp grotesque, pairs perfectly with the display)
// - Mono:    Geist Mono (kept — already sharp)
const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
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
    default: "Rain Tamer | Seamless Gutter Installation & French Drains — Oklahoma City",
    // Every child page inherits "…| Rain Tamer OKC Gutter Contractor" so
    // location + entity signals are present on every SERP listing.
    template: "%s | Rain Tamer OKC Gutter Contractor",
  },
  description:
    "Family-owned Oklahoma City gutter contractor since 2010. Seamless gutters, French drains, gutter guards, gutter cleaning, and commercial systems across the OKC metro — Edmond, Norman, Moore, Yukon, Mustang, Nichols Hills, Bethany. 650+ 5-star Google reviews. Free estimates.",
  keywords: [
    // Primary residential
    "seamless gutters Oklahoma City",
    "gutter installation Oklahoma City",
    "gutter installation OKC",
    "gutter contractor Oklahoma City",
    "gutter installers Oklahoma City",
    "gutter company OKC",
    "best gutter company Oklahoma City",
    "gutter installers near me OKC",
    "residential gutters Oklahoma City",
    // Profile / material long-tail
    "K-style gutters OKC",
    "6 inch gutters Oklahoma City",
    "half-round gutters Oklahoma City",
    "copper gutters Oklahoma City",
    "copper half-round gutters OKC",
    "box gutters Oklahoma City",
    "aluminum gutters OKC",
    "steel gutters OKC",
    "Galvalume gutters Oklahoma City",
    // Drainage
    "French drain installation Oklahoma City",
    "French drains Oklahoma",
    "yard drainage OKC",
    "downspout extension OKC",
    "catch basin installation Oklahoma City",
    "surface drains Oklahoma City",
    // Guards
    "gutter guards Oklahoma City",
    "leaf guards OKC",
    "micromesh gutter guards Oklahoma City",
    "leaf protection Oklahoma City",
    // Commercial
    "commercial gutters Oklahoma City",
    "commercial gutter installation OKC",
    "steel commercial gutters Oklahoma",
    "Kynar gutters Oklahoma City",
    // Cleaning & repair
    "gutter cleaning Oklahoma City",
    "gutter cleaning OKC",
    "gutter repair Oklahoma City",
    "storm damage gutter repair Oklahoma",
    // City-specific
    "seamless gutters Edmond OK",
    "gutter installation Norman OK",
    "gutters Moore Oklahoma",
    "gutters Yukon OK",
    "gutters Mustang OK",
    "gutters Nichols Hills",
    "gutters Bethany OK",
    "gutters Tuttle OK",
    "gutters The Village OK",
    "gutters Warr Acres OK",
    // Intent / near-me
    "free gutter estimate Oklahoma City",
    "gutter estimate OKC",
    "Rain Tamer",
    "Rain Tamer Oklahoma City",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: SITE.url,
    title: "Rain Tamer | Built to tame Oklahoma weather.",
    description:
      "OKC's premium seamless gutter contractor since 2011. Seamless gutters, French drains, gutter guards. Lifetime workmanship warranty.",
    images: [
      {
        url: "/images/raintamer/custom/custom-01.jpg",
        width: 1200,
        height: 1600,
        alt: "A modern Rain Tamer install at sunset in the OKC metro.",
      },
      {
        url: "/images/raintamer/trucks-crew/trucks-crew-02.jpg",
        width: 1200,
        height: 900,
        alt: "Rain Tamer truck on a residential install in the OKC metro.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rain Tamer | Built to tame Oklahoma weather.",
    description:
      "OKC's premium seamless gutter contractor since 2011. Seamless gutters, French drains, gutter guards. Lifetime workmanship warranty.",
    images: ["/images/raintamer/custom/custom-01.jpg"],
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
  alternates: { canonical: SITE.url },
  category: "Home Services",
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
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
        {/* Belt-and-suspenders cache-bust: even if a CDN or Safari
            intermediate ignores response headers, these meta tags force
            the page to be treated as uncached. */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <script dangerouslySetInnerHTML={{ __html: INTRO_SKIP_SCRIPT }} />
      </head>
      <body className="bg-ink-1000 text-bone-50 antialiased">
        <a href="#main" className="skip-to-content">Skip to content</a>
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />
        <JsonLd data={organizationSchema()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {/* Single 3-icon action strip (Call / Text / Estimate) — works on
            every screen size, no separate mobile CTA needed. */}
        <FloatingContact />
      </body>
      {/* Google Tag Manager — one container for tags you configure via
          the GTM dashboard (Meta Pixel, LinkedIn, conversions, etc.). */}
      <GoogleTagManager gtmId="GTM-T3CLSS2N" />

      {/* Google Analytics 4 — direct gtag.js install so pageviews and
          enhanced-measurement events start flowing immediately without
          needing to configure a GA4 tag inside GTM. IMPORTANT: do NOT
          also add a GA4 Configuration tag inside GTM — that would
          double-count every pageview. Use GTM for OTHER platforms only. */}
      <GoogleAnalytics gaId="G-05H39MKSV6" />
    </html>
  );
}
