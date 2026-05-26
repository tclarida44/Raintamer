import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Phone, Star, Shield, BadgeCheck, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { RainCanvas } from "@/components/interactive/RainCanvas";
import { SITE } from "@/lib/site";

/**
 * High-converting hero, modeled on the patterns we found across top
 * contractor sites (Ned Stevens, Gutter Galaxy, Turner). Composition:
 *   - Cinematic lightning photo across the full hero, weighted to the LEFT
 *     so the storm sits behind the headline as drama.
 *   - Live rain animation across the entire hero.
 *   - Large install photo dominating the RIGHT side as product proof.
 *   - Headline, credentials, CTAs anchored on the left.
 *   - Stats strip pinned to the bottom on a backdrop blur.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden border-b border-bone-50/10">
      <BackgroundLayers />

      {/* Top meta row */}
      <Container size="full" className="relative pt-28 lg:pt-32">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Eyebrow>
            <span className="text-rain-400">●</span>
            <span className="ml-2.5">Oklahoma City · Est. {SITE.founded}</span>
          </Eyebrow>
          <div className="hidden items-center gap-6 sm:flex">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-200 transition-colors hover:text-rain-400"
            >
              <Phone className="size-3.5 text-rain-400" />
              {SITE.phone}
            </a>
            <Eyebrow>OK Licensed · Bonded · Insured</Eyebrow>
          </div>
        </div>
      </Container>

      {/* Main content grid */}
      <Container size="full" className="relative pb-16 lg:pb-20">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: headline column */}
          <div className="lg:col-span-7">
            <h1 className="font-display font-medium tracking-[-0.045em] text-balance text-bone-50 text-[clamp(3.25rem,9.5vw,9.5rem)] leading-[0.85]">
              Built to tame
              <br />
              <span className="italic font-normal">Oklahoma weather.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-[1.55] text-bone-200 sm:text-xl">
              Premium seamless gutters, engineered French drains, and tested gutter guards across the Oklahoma City metro. Specced for the storm. Built for the home.
            </p>

            {/* Trust credential strip */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <TrustChip
                icon={<Star className="size-3.5 fill-rain-400 text-rain-400" />}
                label={`${SITE.stats.googleRating}★ on ${SITE.stats.googleReviewCount}+ reviews`}
              />
              <TrustChip
                icon={<Shield className="size-3.5 text-rain-400" />}
                label="Licensed & insured"
              />
              <TrustChip
                icon={<BadgeCheck className="size-3.5 text-rain-400" />}
                label={`${SITE.stats.yearsInBusiness}+ years in OKC`}
              />
              <TrustChip
                icon={<Clock className="size-3.5 text-rain-400" />}
                label="Most installs: 1 day"
              />
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/contact" size="lg">
                Get a Free Estimate
                <ArrowUpRight className="size-4" />
              </Button>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="inline-flex h-14 items-center gap-2.5 rounded-[3px] border border-bone-50/15 px-7 text-[15px] font-medium text-bone-50 transition-colors hover:border-bone-50/40 hover:bg-bone-50/[0.03]"
              >
                <Phone className="size-4 text-rain-400" />
                {SITE.phone}
              </a>
            </div>

            {/* Service pill row */}
            <div className="mt-10 hidden flex-wrap items-center gap-2 sm:flex">
              <span className="mr-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
                We install
              </span>
              <ServicePill href="/services/seamless-gutters">Seamless Gutters</ServicePill>
              <ServicePill href="/services/french-drains">French Drains</ServicePill>
              <ServicePill href="/services/gutter-guards">Gutter Guards</ServicePill>
              <ServicePill href="/services/gutter-cleaning">Cleaning</ServicePill>
              <ServicePill href="/services/commercial-gutters">Commercial</ServicePill>
            </div>
          </div>

          {/* RIGHT: dominant install photo */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-bone-50/15">
              <Image
                src="/images/stock/home-twilight.jpg"
                alt="A finished Rain Tamer install at twilight."
                fill
                priority
                quality={85}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              {/* Brand-blue accent edge along the left */}
              <div aria-hidden className="absolute inset-y-0 left-0 w-1 bg-rain-500/70" />
              {/* Strong bottom scrim so the caption reads on any photo */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-1000/95 via-ink-1000/45 to-transparent"
              />
              {/* Caption wrapped in a backdrop-blurred panel for unmistakable legibility */}
              <div className="absolute inset-x-4 bottom-4 lg:inset-x-5 lg:bottom-5">
                <div className="rounded-[3px] border border-bone-50/12 bg-ink-1000/55 p-5 backdrop-blur-md lg:p-6">
                  <Eyebrow>
                    <span className="text-rain-400">●</span>
                    <span className="ml-2.5 text-bone-100">Recent install</span>
                  </Eyebrow>
                  <p className="mt-3 font-display text-2xl font-medium tracking-[-0.02em] text-white text-pop-strong lg:text-3xl">
                    Half-round copper, Nichols Hills
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t border-bone-50/15 pt-4">
                    <Logo variant="compact" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Stats strip pinned bottom */}
      <div className="relative border-t border-bone-50/15 bg-ink-1000/65 backdrop-blur-sm">
        <Container size="full" className="py-6 lg:py-7">
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            <Stat value={`${SITE.stats.yearsInBusiness}+`} label="Years protecting OKC" />
            <Stat value={`${SITE.stats.installsCompleted.toLocaleString()}+`} label="Installs completed" />
            <Stat value={String(SITE.stats.citiesServed)} label="Metro cities served" />
            <Stat value={`${SITE.stats.googleRating}★`} label={`${SITE.stats.googleReviewCount}+ Google reviews`} />
          </div>
        </Container>
      </div>
    </section>
  );
}

function BackgroundLayers() {
  return (
    <>
      {/* Deep atmospheric backdrop — pure ink with brand-blue storm tint, no photo. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30 bg-[radial-gradient(ellipse_70%_60%_at_30%_30%,rgba(31,102,255,0.22),transparent_75%),radial-gradient(ellipse_50%_45%_at_80%_70%,rgba(31,102,255,0.10),transparent_70%)]"
        style={{ background: "#0A0A0B" }}
      />
      {/* Soft cloud-like haze using layered radial gradients */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 25%, rgba(81,136,255,0.12), transparent 70%), radial-gradient(ellipse 55% 35% at 75% 35%, rgba(190,221,255,0.06), transparent 75%), radial-gradient(ellipse 60% 30% at 50% 90%, rgba(31,102,255,0.10), transparent 70%)",
        }}
      />
      {/* Subtle grain so the gradient doesn't look flat */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
      {/* Bottom fade to ground the stats strip */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-b from-transparent to-ink-1000" />
      {/* Hairline left rail */}
      <div aria-hidden className="absolute left-6 top-32 bottom-8 hidden w-px bg-gradient-to-b from-rain-500/60 via-bone-50/15 to-transparent lg:block lg:left-16" />

      {/* Ambient rain, dialed back so it reads as weather instead of a wall */}
      <RainCanvas density={1} />
    </>
  );
}

function TrustChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[3px] border border-bone-50/15 bg-ink-1000/55 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-bone-200 backdrop-blur-sm">
      {icon}
      {label}
    </span>
  );
}

function ServicePill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-full border border-bone-50/12 bg-ink-1000/55 px-3.5 py-1.5 text-[12.5px] text-bone-200 backdrop-blur-sm transition-colors hover:border-rain-500/60 hover:bg-rain-500/10 hover:text-bone-50"
    >
      {children}
    </Link>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="num text-[clamp(1.75rem,4vw,2.75rem)] text-bone-50">{value}</span>
      <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-300">{label}</span>
    </div>
  );
}
