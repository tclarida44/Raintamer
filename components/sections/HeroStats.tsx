"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Homepage hero stats — five real numbers that count up from zero when the
 * strip scrolls into view. Ease-out cubic; ~1.5s per stat, so big numbers
 * still land quickly. IntersectionObserver so we only trigger once.
 *
 * The review stat's label is rendered with a proper gold Star icon so the
 * "5★" reads consistently with every other star treatment on the site.
 */
const STATS: {
  end: number;
  suffix?: string;
  label: ReactNode;
  format?: "plain" | "comma";
}[] = [
  { end: SITE.stats.installsCompleted, suffix: "+", label: "Projects completed", format: "comma" },
  { end: SITE.stats.gutterFeetInstalled, suffix: "+", label: "Feet of gutter installed", format: "comma" },
  { end: SITE.stats.drainsFeetInstalled, suffix: "+", label: "Feet of drains installed", format: "comma" },
  {
    end: SITE.stats.googleReviewCount,
    suffix: "+",
    label: (
      <span className="inline-flex items-center gap-1.5">
        <Star className="size-3 fill-[#FBBC04] text-[#FBBC04]" aria-hidden />
        Google reviews
      </span>
    ),
    format: "comma",
  },
  { end: SITE.stats.yearsInBusiness, suffix: "", label: "Years in business", format: "plain" },
];

export function HeroStats() {
  return (
    <div className="relative border-t border-bone-50/15 bg-ink-1000/72 backdrop-blur-sm">
      <div className="mx-auto grid w-full max-w-[1640px] grid-cols-2 gap-x-6 gap-y-6 px-6 py-7 sm:grid-cols-3 md:px-10 lg:grid-cols-5 lg:gap-x-4 lg:px-16 lg:py-8">
        {STATS.map((s, i) => (
          <CountUpStat
            key={i}
            end={s.end}
            suffix={s.suffix}
            label={s.label}
            format={s.format}
            delayMs={i * 90}
          />
        ))}
      </div>
    </div>
  );
}

function CountUpStat({
  end,
  suffix = "",
  label,
  format = "comma",
  delayMs = 0,
}: {
  end: number;
  suffix?: string;
  label: ReactNode;
  format?: "plain" | "comma";
  delayMs?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(end);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const startAt = performance.now() + delayMs;
          const step = (now: number) => {
            if (now < startAt) {
              requestAnimationFrame(step);
              return;
            }
            const elapsed = now - startAt;
            const t = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.floor(eased * end));
            if (t < 1) requestAnimationFrame(step);
            else setValue(end);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, delayMs]);

  const displayed = format === "comma" ? value.toLocaleString() : String(value);

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <span className="num text-[clamp(1.5rem,3vw,2.5rem)] leading-none text-bone-50">
        {displayed}
        {suffix}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-300">
        {label}
      </span>
    </div>
  );
}
