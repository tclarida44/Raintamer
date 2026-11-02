import Image from "next/image";
import { ArrowUpRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { RainCanvas } from "@/components/interactive/RainCanvas";
import { HeroStats } from "@/components/sections/HeroStats";
import { SITE } from "@/lib/site";

/**
 * Magazine-cover hero, client-notes rev.
 *
 *   - H1: "Built to tame Oklahoma weather." — all one size. "Tame" italic +
 *     brand-blue as the focal point.
 *   - Subhead updated to "Specced for the storm, designed for the home."
 *   - Trust chips gone (redundant with the stats + header credentials).
 *   - Bottom strip: five real count-up stats (42k projects, 8M ft gutter,
 *     105k ft drains, 650+ reviews, 15 yrs) — animated from zero on first
 *     scroll into view.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden border-b border-bone-50/10">
      <BackgroundLayers />

      {/* TOP-RIGHT credential stack — small right-aligned block sitting under
          the header, no artifact on the left under the logo. */}
      <Container size="full" className="relative pt-24 lg:pt-28">
        <div className="hidden flex-col items-end gap-1.5 text-right sm:flex">
          <Eyebrow>OK Licensed · Bonded · Insured</Eyebrow>
          <Eyebrow>
            <span className="text-rain-400">●</span>
            <span className="ml-2.5">Oklahoma City · Est. {SITE.founded}</span>
          </Eyebrow>
        </div>
      </Container>

      {/* CENTER: massive editorial headline — "Tame" capitalized, italic + brand-blue focal */}
      <Container size="full" className="relative flex flex-1 flex-col justify-center pb-14 pt-10 lg:pb-20 lg:pt-14">
        <h1 className="font-display font-semibold tracking-[-0.055em] text-balance text-white text-[clamp(3.5rem,13vw,15rem)] leading-[0.84] drop-shadow-[0_4px_28px_rgba(0,0,0,0.75)] [word-spacing:0.01em]">
          Built to <span className="-ml-[0.05em] mr-[0.05em] italic text-rain-400 drop-shadow-[0_2px_18px_rgba(31,102,255,0.65)]">Tame</span>
          <br />
          Oklahoma Weather.
        </h1>

        <p className="mt-9 max-w-2xl text-[17.5px] font-medium leading-[1.5] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] sm:text-xl">
          Specced for the storm, designed for the home. Premium seamless gutters, engineered drainage, and tested gutter guards across the Oklahoma City metro.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button href="/contact" size="lg">
            Get a Free Estimate
            <ArrowUpRight className="size-4" />
          </Button>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex h-14 items-center gap-2.5 rounded-[3px] border border-bone-50/25 bg-ink-1000/40 px-7 text-[15px] font-medium text-bone-50 backdrop-blur-sm transition-colors hover:border-bone-50/45 hover:bg-bone-50/[0.08]"
          >
            <Phone className="size-4 text-rain-400" />
            {SITE.phone}
          </a>
        </div>
      </Container>

      {/* BOTTOM: count-up stats bar */}
      <HeroStats />
    </section>
  );
}

function BackgroundLayers() {
  return (
    <>
      {/* Full-bleed install photo — copper K-style with oversized downspouts on
          a modern white-brick home. Premium material, high contrast, bright sky. */}
      <div aria-hidden className="absolute inset-0 -z-40">
        <Image
          src="/images/raintamer/half-round-6/half-round-6-04.jpg"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Full-height scrim: stronger at top+bottom for header/ticker legibility */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,11,0.62) 0%, rgba(10,10,11,0.20) 22%, rgba(10,10,11,0.20) 70%, rgba(10,10,11,0.88) 100%)",
        }}
      />

      {/* Larger, darker vignette behind the headline so the type reads over any part of the photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-25"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 25% 55%, rgba(10,10,11,0.78), transparent 75%)",
        }}
      />

      {/* Brand-blue glow on the opposite side */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse 45% 40% at 85% 65%, rgba(31,102,255,0.22), transparent 72%)",
        }}
      />

      {/* Subtle grain */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <RainCanvas density={1} />
    </>
  );
}
