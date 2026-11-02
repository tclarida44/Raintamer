"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, MessageSquare, ClipboardList } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Sticky bottom-right (bottom-center on mobile) three-icon action strip:
 *   [ Call ]  [ Text ]  [ Estimate ]
 *
 * Slides in after the user scrolls past the hero and stays visible for the
 * rest of the page. Icons only — labels via aria-label + hover tooltip.
 */
export function FloatingContact() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  // Suppress on paid-traffic landing pages — they have their own
  // dedicated Call + Estimate mobile bottom bar; showing both stacks
  // buttons on top of each other on mobile.
  const isLandingPage = pathname?.startsWith("/lp") ?? false;

  useEffect(() => {
    if (isLandingPage) return;
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLandingPage]);

  if (isLandingPage) return null;

  return (
    <div
      aria-hidden={!show}
      className={`fixed bottom-4 right-4 z-40 flex items-center gap-2 transition-all duration-300 ease-out sm:bottom-6 sm:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <IconAction
        href={`tel:${SITE.phoneTel}`}
        icon={<Phone className="size-5" />}
        label={`Call ${SITE.phone}`}
        tooltip="Call"
        variant="dark"
      />
      <IconAction
        href={`sms:${SITE.textPhoneTel}`}
        icon={<MessageSquare className="size-5" />}
        label={`Text ${SITE.phone}`}
        tooltip="Text"
        variant="dark"
      />
      <IconAction
        href="/contact"
        icon={<ClipboardList className="size-5" />}
        label="Get a Free Estimate"
        tooltip="Estimate"
        variant="brand"
        isInternal
      />
    </div>
  );
}

function IconAction({
  href,
  icon,
  label,
  tooltip,
  variant,
  isInternal = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  variant: "dark" | "brand";
  isInternal?: boolean;
}) {
  const base =
    "group relative flex size-13 items-center justify-center rounded-full shadow-2xl backdrop-blur transition-all hover:scale-105";
  const style =
    variant === "brand"
      ? "bg-rain-500 text-ink-1000 hover:bg-rain-400"
      : "border border-bone-50/15 bg-ink-1000/90 text-rain-400 hover:border-rain-500/60 hover:text-rain-300";

  const content = (
    <>
      {icon}
      {/* Tooltip label above the icon */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-[3px] bg-ink-1000/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-50 opacity-0 shadow-lg backdrop-blur transition-opacity duration-200 group-hover:opacity-100"
      >
        {tooltip}
      </span>
    </>
  );

  const className = `${base} ${style}`;

  return isInternal ? (
    <Link href={href} aria-label={label} className={className} style={{ width: "52px", height: "52px" }}>
      {content}
    </Link>
  ) : (
    <a href={href} aria-label={label} className={className} style={{ width: "52px", height: "52px" }}>
      {content}
    </a>
  );
}
