"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export function MobileEstimateCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 transition-all duration-300 lg:hidden ${
        show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex w-full max-w-md items-center gap-2 rounded-[6px] border border-bone-50/10 bg-ink-900/95 p-1.5 shadow-2xl backdrop-blur">
        <a
          href={`tel:${SITE.phoneTel}`}
          className="flex size-11 flex-shrink-0 items-center justify-center rounded-[3px] border border-bone-50/10 text-bone-50"
          aria-label={`Call ${SITE.phone}`}
        >
          <Phone className="size-4" />
        </a>
        <Link
          href="/contact"
          className="flex h-11 flex-1 items-center justify-center rounded-[3px] bg-rain-500 font-medium text-ink-1000"
        >
          Get a Free Estimate
        </Link>
      </div>
    </div>
  );
}
