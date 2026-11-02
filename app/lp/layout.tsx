import type { Metadata } from "next";

/**
 * Minimal landing-page layout — deliberately renders NO site header,
 * NO main-nav, NO footer, and NO floating action strip.
 *
 * Why: paid-traffic landing pages convert better with a single clear
 * path to conversion (the form + phone number). Extra links siphon
 * paid clicks off the page before the user submits.
 *
 * The root layout still provides <html>, <body>, fonts, GTM/GA scripts.
 * This layout is a passthrough that keeps analytics + brand system
 * intact but drops navigation chrome.
 *
 * All routes under /lp/* inherit this layout automatically.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
