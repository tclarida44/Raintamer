import Link from "next/link";
import { CITIES } from "@/lib/cities";

/**
 * Running tape of city names. Used as a visual breather between major
 * sections. CSS-only marquee (no JS), two duplicated tracks for seamless
 * loop. Respects prefers-reduced-motion via the global rule.
 */
export function Marquee() {
  const items = CITIES.map((c) => ({ slug: c.slug, name: c.name }));
  // Repeat the list a couple times so the animation has enough material to loop seamlessly
  const looped = [...items, ...items, ...items, ...items];

  return (
    <section className="relative overflow-hidden border-b border-bone-50/10 bg-ink-950 py-10 lg:py-14">
      {/* Brand-blue edge fades on both sides so the marquee dissolves rather than abruptly cutting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-950 to-transparent sm:w-48"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-950 to-transparent sm:w-48"
      />

      <div className="rt-marquee flex w-max items-center gap-12 whitespace-nowrap will-change-transform">
        {looped.map((c, i) => (
          <Link
            key={`${c.slug}-${i}`}
            href={`/service-areas/${c.slug}`}
            className="group inline-flex items-center gap-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-[-0.04em] text-bone-50 transition-colors hover:text-rain-400"
          >
            <span>{c.name}</span>
            <Star />
          </Link>
        ))}
      </div>

      <style>{`
        @keyframes rt-marquee-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .rt-marquee {
          animation: rt-marquee-scroll 60s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .rt-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

function Star() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 flex-shrink-0 text-rain-500 opacity-70"
      aria-hidden
    >
      <path
        d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z"
        fill="currentColor"
      />
    </svg>
  );
}
