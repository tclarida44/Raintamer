"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Desktop floating contact pair anchored to the bottom-right of the viewport.
 * Slides in after the user has scrolled past the hero and stays visible while
 * they read the rest of the page. Mobile uses the centered `MobileEstimateCta`
 * pill at the bottom instead, so this component is `hidden lg:flex` only.
 */
export function FloatingContact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed bottom-6 right-6 z-40 hidden items-center gap-2 transition-all duration-300 ease-out lg:flex ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      {/* Call button — quick action, kept compact */}
      <a
        href={`tel:${SITE.phoneTel}`}
        aria-label={`Call ${SITE.phone}`}
        className="group flex h-12 items-center gap-2.5 rounded-[3px] border border-bone-50/15 bg-ink-1000/85 px-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-100 shadow-lg backdrop-blur transition-colors hover:border-rain-500/60 hover:text-bone-50"
      >
        <Phone className="size-4 text-rain-400 transition-colors group-hover:text-rain-300" />
        <span>{SITE.phone}</span>
      </a>

      {/* Primary estimate CTA */}
      <Link
        href="/contact"
        className="group inline-flex h-12 items-center gap-2 rounded-[3px] bg-rain-500 px-5 text-[14px] font-medium text-ink-1000 shadow-lg transition-colors hover:bg-rain-400"
      >
        Get a Free Estimate
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
