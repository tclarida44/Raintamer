"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, Star, ShieldCheck, Clock } from "lucide-react";
import { SITE } from "@/lib/site";
import { LpQuoteForm } from "./LpQuoteForm";

/**
 * LP hero — split layout with rotating install-photo background on the
 * left/panel and a sticky conversion form on the right. Rotation runs
 * on a 5-second interval with a slow crossfade so the hero feels alive
 * without pulling attention away from the form.
 *
 * Props let a single LpHero drive multiple service-specific landing
 * pages (gutters, drains, etc.) — photos, headline, and subtitle vary
 * per service; everything else (phone CTA, trust chips, form, layout)
 * stays consistent.
 */

type HeroPhoto = { src: string; alt: string };

export type LpHeroProps = {
  photos: HeroPhoto[];
  /** H1 headline lines. Each entry is one visual line. */
  titleLines: string[];
  /** Supporting paragraph under the headline. */
  subtitle: string;
  /** Optional eyebrow above headline — defaults to "Oklahoma City · Free Estimate". */
  eyebrow?: string;
  /** Optional form card heading — defaults to "Get your price in 24 hours." */
  formHeading?: string;
};

export function LpHero({
  photos,
  titleLines,
  subtitle,
  eyebrow = "Oklahoma City · Free Estimate",
  formHeading = "Get your price in 24 hours.",
}: LpHeroProps) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((prev) => (prev + 1) % photos.length), 5000);
    return () => clearInterval(t);
  }, [photos.length]);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink-1000">
      {/* Rotating BG photos — layered, all mounted, opacity cross-fades */}
      <div className="absolute inset-0 -z-30" aria-hidden>
        {photos.map((p, idx) => (
          <div
            key={p.src}
            className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
            style={{ opacity: idx === i ? 1 : 0 }}
          >
            <Image
              src={p.src}
              alt=""
              fill
              priority={idx === 0}
              quality={80}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dark scrim for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0.45) 30%, rgba(10,10,11,0.85) 100%)",
        }}
      />
      {/* Brand-blue glow on right where the form sits */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 45% 60% at 80% 40%, rgba(31,102,255,0.18), transparent 70%)",
        }}
      />

      {/* Sticky compact bar — logo + phone. Replaces the missing site header. */}
      <div className="absolute inset-x-0 top-0 z-20 border-b border-bone-50/10 bg-ink-1000/60 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1640px] items-center justify-between px-6 py-3 md:px-10 lg:px-16">
          <div className="flex items-center gap-3">
            <Image
              src="/images/rain-tamer-logo.png"
              alt="Rain Tamer"
              width={140}
              height={57}
              priority
              className="h-10 w-auto sm:h-11"
            />
          </div>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex items-center gap-2 rounded-full bg-rain-500 px-4 py-2 text-sm font-semibold text-ink-1000 shadow-[0_0_24px_rgba(31,102,255,0.35)] transition-colors hover:bg-rain-400 sm:text-base"
          >
            <Phone className="size-4" />
            <span className="hidden sm:inline">{SITE.phone}</span>
            <span className="sm:hidden">Call now</span>
          </a>
        </div>
      </div>

      {/* Hero content grid */}
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1640px] flex-col justify-center gap-10 px-6 pb-16 pt-28 md:px-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:px-16 lg:pt-32">
        {/* LEFT — pitch */}
        <div className="lg:col-span-7 lg:pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-rain-400">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display font-semibold tracking-[-0.045em] text-white text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] drop-shadow-[0_4px_28px_rgba(0,0,0,0.75)]">
            {titleLines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-[1.55] text-white/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] sm:text-lg">
            {subtitle}
          </p>

          {/* Trust chips */}
          <ul className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
            <TrustChip icon={ShieldCheck} label="OK Licensed · Bonded · Insured" />
            <TrustChip icon={Star} label={`${SITE.stats.googleReviewCount}+ five-star Google reviews`} />
            <TrustChip icon={Clock} label="Estimates within 24 hrs" />
          </ul>

          {/* Phone CTA — big + obvious */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex h-14 items-center gap-3 rounded-[3px] bg-rain-500 px-7 text-lg font-semibold text-ink-1000 shadow-[0_0_36px_rgba(31,102,255,0.45)] transition-colors hover:bg-rain-400"
            >
              <Phone className="size-5" />
              {SITE.phone}
            </a>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/80">
              or fill out the form →
            </span>
          </div>
        </div>

        {/* RIGHT — form card */}
        <div className="lg:col-span-5">
          <div className="rounded-[6px] border border-bone-50/15 bg-ink-1000/85 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-8">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-rain-400">
              Free Estimate — No Obligation
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-bone-50 sm:text-3xl">
              {formHeading}
            </h2>
            <p className="mt-2 text-[14px] leading-[1.55] text-bone-300">
              A crew lead calls you back within one business day. Tell us where and we&apos;ll route the closest team.
            </p>
            <LpQuoteForm className="mt-5" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustChip({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <li className="flex items-center gap-2.5 rounded-full border border-bone-50/15 bg-ink-1000/40 px-4 py-2.5 text-[13px] text-white backdrop-blur-sm">
      <Icon className="size-4 shrink-0 text-rain-400" />
      <span className="leading-tight">{label}</span>
    </li>
  );
}
