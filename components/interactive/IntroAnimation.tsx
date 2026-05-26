"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * First-visit intro. Drops fall, converge to the center, and the logo
 * emerges out of the convergence — one continuous motion, no second beat.
 *
 *   0.0–0.5s   Brand-blue ambient glow blooms in.
 *   0.3–1.5s   28 drops fall in across the viewport (staggered).
 *   1.4–2.2s   Drops streak toward center, shrinking + fading.
 *   1.5–2.7s   Halo + logo materialize in parallel with the convergence,
 *              so the logo IS the destination of the drops, not a separate
 *              reveal. Slight scale pulse on settle.
 *   3.3–4.1s   Stage dissolves into the homepage.
 *
 * No clip-path wipes. No side-sweep over the logo. Just smooth, continuous
 * motion with expo-out easing for a modern feel.
 */

type Drop = {
  x: number;
  y: number;
  size: number;
  fallDelay: number;
};

const DROP_COUNT = 28;
const SMOOTH_OUT = "expo.out";

function makeDrops(): Drop[] {
  return Array.from({ length: DROP_COUNT }, (_, i) => {
    const s1 = ((i * 71 + 23) * 17) % 1000;
    const s2 = ((i * 53 + 11) * 13) % 1000;
    const s3 = (i * 41) % 100;
    return {
      x: (s1 / 1000) * 92 + 4,
      y: 10 + (s2 / 1000) * 74,
      size: 7 + (s3 % 5) * 1.4,
      fallDelay: (i / DROP_COUNT) * 1.1 + ((i * 19) % 7) * 0.025,
    };
  });
}

export function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState(true);
  const drops = useMemo(makeDrops, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.documentElement.dataset.introSkip === "1") {
      setActive(false);
      return;
    }

    sessionStorage.setItem("rt-intro-seen", "1");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useGSAP(
    () => {
      if (!active || !containerRef.current) return;

      const stage = containerRef.current;
      const dropEls = stage.querySelectorAll<HTMLElement>(".rt-drop");

      dropEls.forEach((el) => {
        el.style.willChange = "transform, opacity";
      });

      // Precompute per-drop convergence vector toward stage center
      const rect = stage.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const convergeVectors = Array.from(dropEls).map((el) => {
        const dr = el.getBoundingClientRect();
        return {
          dx: centerX - (dr.left - rect.left + dr.width / 2),
          dy: centerY - (dr.top - rect.top + dr.height / 2),
        };
      });

      const tl = gsap.timeline({
        defaults: { ease: SMOOTH_OUT, force3D: true },
        onComplete: () => {
          dropEls.forEach((el) => {
            el.style.willChange = "";
          });
          setActive(false);
          document.body.style.overflow = "";
        },
      });
      tlRef.current = tl;

      // Phase 0 — ambient glow
      tl.from(
        stage.querySelector(".rt-glow"),
        { opacity: 0, duration: 0.55, ease: "power2.out" },
        0,
      );

      // Phase 1 — drops fall in
      dropEls.forEach((el, i) => {
        const d = drops[i];
        gsap.set(el, {
          y: -180,
          opacity: 0,
          scaleY: 1.4,
          scaleX: 0.65,
          xPercent: -50,
          yPercent: -100,
        });
        tl.to(
          el,
          {
            keyframes: [
              {
                y: 0,
                opacity: 1,
                scaleY: 1.15,
                scaleX: 0.75,
                duration: 0.42,
                ease: "power2.in",
              },
              {
                scaleY: 0.42,
                scaleX: 1.45,
                y: 4,
                duration: 0.09,
                ease: "power2.out",
              },
              {
                scaleY: 0.7,
                scaleX: 1,
                y: 0,
                duration: 0.18,
                ease: "back.out(1.2)",
              },
            ],
          },
          d.fallDelay,
        );
      });

      // Phase 2 — convergence + logo emergence happen in parallel,
      // so the logo IS the destination, not a separate reveal beat.
      const mergeAt = 1.4;

      // Drops streak toward center, shrinking + fading
      dropEls.forEach((el, i) => {
        const v = convergeVectors[i];
        tl.to(
          el,
          {
            x: v.dx,
            y: v.dy,
            scale: 0.2,
            opacity: 0,
            duration: 0.75,
            ease: "power3.in",
          },
          mergeAt + (i % 6) * 0.012,
        );
      });

      // Halo blooms behind the logo, in sync with the convergence
      tl.fromTo(
        stage.querySelector(".rt-halo"),
        { opacity: 0, scale: 0.55 },
        { opacity: 1, scale: 1, duration: 1.1, ease: SMOOTH_OUT },
        mergeAt + 0.1,
      );

      // Logo materializes during convergence — overlaps drops arriving
      tl.fromTo(
        stage.querySelector(".rt-logo-shell"),
        { opacity: 0, scale: 0.88, y: 6 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.3,
          ease: SMOOTH_OUT,
        },
        mergeAt + 0.35,
      );

      // Tiny brand-blue corona at the merge point — quick flicker, blends
      // the convergence into the halo
      tl.fromTo(
        stage.querySelector(".rt-corona"),
        { opacity: 0, scale: 0.45 },
        { opacity: 0.7, scale: 1.1, duration: 0.45, ease: SMOOTH_OUT },
        mergeAt + 0.55,
      );
      tl.to(
        stage.querySelector(".rt-corona"),
        { opacity: 0, scale: 1.5, duration: 0.85, ease: "power2.in" },
        mergeAt + 1.0,
      );

      // Subtle settle pulse on the logo — barely perceptible, but adds weight
      tl.to(
        stage.querySelector(".rt-logo-shell"),
        { scale: 1.012, duration: 0.4, ease: "power2.out" },
        mergeAt + 1.55,
      );
      tl.to(
        stage.querySelector(".rt-logo-shell"),
        { scale: 1, duration: 0.5, ease: "power2.inOut" },
        mergeAt + 1.95,
      );

      // Halo softly recedes to a steady-state value while logo settles
      tl.to(
        stage.querySelector(".rt-halo"),
        { opacity: 0.55, duration: 0.5, ease: "power2.inOut" },
        mergeAt + 1.7,
      );

      // Phase 3 — dissolve into the homepage
      tl.to(
        stage.querySelector(".rt-stage"),
        {
          opacity: 0,
          scale: 1.025,
          duration: 0.85,
          ease: "power3.in",
        },
        mergeAt + 2.4,
      );

      return () => {
        tl.kill();
      };
    },
    { scope: containerRef, dependencies: [active] },
  );

  if (!active) return null;

  const skip = () => {
    if (tlRef.current) {
      tlRef.current.timeScale(5).play();
    }
  };

  return (
    <div
      ref={containerRef}
      role="presentation"
      onClick={skip}
      onKeyDown={(e) => {
        if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip();
      }}
      tabIndex={-1}
      aria-label="Rain Tamer intro animation"
      className="rt-intro-root fixed inset-0 z-[100] overflow-hidden"
    >
      <div className="rt-stage absolute inset-0 bg-ink-1000">
        {/* Brand-blue ambient glow */}
        <div
          aria-hidden
          className="rt-glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(31,102,255,0.18),transparent_72%)]"
        />

        {/* Hairline grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(190,221,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(190,221,255,0.6) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Drops scattered across the viewport */}
        {drops.map((d, i) => (
          <span
            key={i}
            aria-hidden
            className="rt-drop pointer-events-none absolute"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size * 1.4,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              background: "#3DA9FC",
              boxShadow: "0 0 10px rgba(61,169,252,0.6)",
              transformOrigin: "50% 100%",
              opacity: 0,
            }}
          />
        ))}

        {/* Halo behind the logo — bridges the convergence into the reveal */}
        <span
          aria-hidden
          className="rt-halo pointer-events-none absolute left-1/2 top-1/2 size-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(31,102,255,0.22) 0%, rgba(31,102,255,0.08) 38%, transparent 70%)",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        />

        {/* Corona at the merge point — short bridging flicker */}
        <span
          aria-hidden
          className="rt-corona pointer-events-none absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(190,221,255,0.55) 0%, rgba(31,102,255,0.28) 32%, transparent 62%)",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        />

        {/* Logo — wordmark + splash only. The tagline ("SEAMLESS GUTTERS |
            DRAINAGE SOLUTIONS") on the source PNG is masked out via a
            soft alpha gradient on the bottom 15% so the wordmark letterforms
            are never clipped. Tune the mask stops if a sliver of the tagline
            still shows. */}
        <div
          className="rt-logo-shell absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0 }}
        >
          <Image
            src="/images/rain-tamer-logo.png"
            alt="Rain Tamer"
            width={2474}
            height={1011}
            priority
            sizes="(min-width: 1024px) 580px, 88vw"
            className="block h-auto w-[min(88vw,580px)] select-none"
            style={{
              mixBlendMode: "screen",
              maskImage:
                "linear-gradient(to bottom, black 82%, transparent 92%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 82%, transparent 92%)",
            }}
          />
        </div>

        {/* Skip hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
          Tap anywhere to skip
        </div>
      </div>
    </div>
  );
}
