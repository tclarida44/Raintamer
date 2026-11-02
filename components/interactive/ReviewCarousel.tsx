"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/reviews";
import { SITE } from "@/lib/site";

/**
 * Editorial pull-quote rotator. Auto-advances every 7s; click an index to jump.
 * No carousel arrows, no slide animation gimmicks; just type fading in.
 * Respects prefers-reduced-motion via the global stylesheet.
 */
export function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 7000);
    return () => clearInterval(id);
  }, [paused]);

  const r = REVIEWS[index];

  function onTouchStart(e: React.TouchEvent) {
    dragStart.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (dragStart.current == null) return;
    const dx = e.changedTouches[0].clientX - dragStart.current;
    if (dx > 40) setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
    else if (dx < -40) setIndex((i) => (i + 1) % REVIEWS.length);
    dragStart.current = null;
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-9">
          <blockquote
            key={r.id}
            className="font-display text-3xl font-medium leading-[1.2] tracking-[-0.025em] text-bone-50 sm:text-4xl lg:text-5xl xl:text-6xl"
            style={{ animation: "fadeUp 0.5s ease both" }}
          >
            <span className="text-rain-500">&ldquo;</span>
            {r.quote}
            <span className="text-rain-500">&rdquo;</span>
          </blockquote>
          <div className="mt-10 flex items-center gap-4 border-t border-bone-50/10 pt-6">
            <span className="font-display text-lg font-medium text-bone-50">{r.name}</span>
            <span className="h-3 w-px bg-bone-50/20" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
              {r.neighborhood} · {r.service}
            </span>
          </div>
        </div>

        <aside className="lg:col-span-3">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">On Google</p>
          <div className="mt-3 flex items-center gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-6 fill-[#FBBC04] text-[#FBBC04]" />
            ))}
          </div>
          <p className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone-50">
            Over{" "}
            <span className="text-[#FBBC04]">
              {SITE.stats.googleReviewCount.toLocaleString()}
            </span>
            <br />
            5-star reviews
          </p>
          <a
            href={SITE.socials.google}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400 hover:text-rain-500"
          >
            Read all →
          </a>

          {/* Index dots */}
          <div className="mt-12 flex flex-wrap gap-1">
            {REVIEWS.map((rev, i) => (
              <button
                key={rev.id}
                onClick={() => setIndex(i)}
                aria-label={`Show review ${i + 1}`}
                className={`h-px w-8 transition-colors ${
                  i === index ? "bg-rain-500" : "bg-bone-50/15 hover:bg-bone-50/40"
                }`}
              />
            ))}
          </div>
        </aside>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
