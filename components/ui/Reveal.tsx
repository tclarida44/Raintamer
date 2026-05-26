"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight scroll-driven fade-up. Used sparingly across the site for section entries.
 * No Framer Motion dependency — just IntersectionObserver + a CSS transition.
 * Respects prefers-reduced-motion via the global stylesheet.
 */
export function Reveal({
  children,
  className,
  delayMs = 0,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setSeen(true), delayMs);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [delayMs]);

  return (
    <As ref={ref as never} className={cn("reveal", seen && "in", className)}>
      {children}
    </As>
  );
}
