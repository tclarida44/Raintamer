import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight, ShieldCheck, Waves, Droplets, HardHat, Home, Award } from "lucide-react";
import { LpHero } from "@/components/lp/LpHero";
import { LpQuoteForm } from "@/components/lp/LpQuoteForm";
import { SITE } from "@/lib/site";

/**
 * GOOGLE ADS LANDING PAGE — Drainage / French Drains
 *
 * Reachable at /lp/french-drains. Suppressed nav + noindex/nofollow
 * inherited from app/lp/layout.tsx. Hand this URL straight to the
 * Drainage campaign in Google Ads.
 */

export const metadata: Metadata = {
  title: "French Drains & Yard Drainage — OKC Free Estimate | Rain Tamer",
  description:
    "End standing water and protect your foundation. French drains, yard drainage, and buried downspout systems installed across the Oklahoma City metro. Free estimate in under 24 hours.",
};

const HERO_PHOTOS = [
  { src: "/images/raintamer/drains/dr-new-02.jpg", alt: "Freshly-installed French drain trench in an OKC yard" },
  { src: "/images/raintamer/drains/drains-01.jpg", alt: "Gravel-set drain pipe routing water away from foundation" },
  { src: "/images/raintamer/drains/dr-new-04.jpg", alt: "Buried downspout extension tied into yard drainage" },
  { src: "/images/raintamer/drains/drains-03.jpg", alt: "Catch basin install for OKC yard drainage" },
  { src: "/images/raintamer/drains/dr-new-07.jpg", alt: "Completed French drain outlet at daylight" },
];

const PROOF_PHOTOS = [
  "/images/raintamer/drains/dr-new-03.jpg",
  "/images/raintamer/drains/drains-02.jpg",
  "/images/raintamer/drains/dr-new-05.jpg",
  "/images/raintamer/drains/drains-05.jpg",
  "/images/raintamer/drains/dr-new-08.jpg",
  "/images/raintamer/drains/drains-06.jpg",
];

export default function Page() {
  return (
    <div id="top" className="bg-ink-1000 text-bone-50">
      <LpHero
        photos={HERO_PHOTOS}
        titleLines={["End standing water", "for good."]}
        subtitle="French drains, yard drainage, and buried downspouts designed for Oklahoma clay. Routed to daylight or a basin — not a hope and a prayer. Free estimate in under 24 hours."
        formHeading="Get your drainage quote in 24 hours."
      />

      {/* Trust strip — hard stats */}
      <section className="border-b border-bone-50/10 bg-ink-950 py-8 lg:py-12">
        <div className="mx-auto grid w-full max-w-[1640px] grid-cols-2 gap-y-6 px-6 text-center md:grid-cols-4 md:gap-y-0 md:px-10 lg:px-16">
          <Stat value="105k+ ft" label="Of drain line installed" />
          <Stat value={`${(SITE.stats.installsCompleted / 1000).toFixed(0)}k+`} label="Projects since 2010" />
          <Stat value={`${SITE.stats.googleReviewCount}+`} label="5-star reviews" />
          <Stat value={`${SITE.stats.yearsInBusiness} yrs`} label="OKC family-owned" />
        </div>
      </section>

      {/* Why us — 4 drainage-specific benefits */}
      <section className="border-b border-bone-50/10 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1640px] px-6 md:px-10 lg:px-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-rain-400">Why Rain Tamer</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-[-0.03em] text-bone-50 sm:text-4xl lg:text-5xl">
            Drainage designed for Oklahoma clay — routed to daylight, not luck.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <Benefit
              icon={Waves}
              title="Real hydrology, not guesswork"
              body="We walk the slope, watch where water pools, and design the system to move it. No cookie-cutter kits pulled off a shelf."
            />
            <Benefit
              icon={Droplets}
              title="Perforated pipe + gravel + fabric"
              body="Trenched to grade, wrapped in filter fabric, bedded in washed rock. Routes to daylight or a catch basin every time."
            />
            <Benefit
              icon={Home}
              title="Foundation protection first"
              body="Buried downspouts and perimeter drainage carry water 10+ feet from the house before it hits soil that shifts against your slab."
            />
            <Benefit
              icon={ShieldCheck}
              title="Lifetime workmanship"
              body="If the system doesn't move water the way we said it would, we're back on-site to fix it. That's in writing."
            />
          </div>
        </div>
      </section>

      {/* Proof strip — real drainage install photos */}
      <section className="border-b border-bone-50/10 bg-ink-950 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1640px] px-6 md:px-10 lg:px-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-rain-400">Recent drainage work</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-bone-50 sm:text-4xl">
                Real yards, no stock photos.
              </h2>
            </div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-400">
              Edmond · Norman · Nichols Hills · Moore · Yukon
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {PROOF_PHOTOS.map((src, i) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[4px] border border-bone-50/10">
                <Image
                  src={src}
                  alt={`Recent Rain Tamer drainage install ${i + 1}`}
                  fill
                  quality={75}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — 4-step */}
      <section className="border-b border-bone-50/10 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1640px] px-6 md:px-10 lg:px-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-rain-400">How it works</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-[-0.03em] text-bone-50 sm:text-4xl lg:text-5xl">
            From call to dry yard, start to finish.
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <Step n="01" title="Fill the form" body="Or call. Tell us your ZIP and where the water pools. Takes 30 seconds." />
            <Step n="02" title="On-site assessment" body="A drainage lead walks your property, maps the flow, and hands you a firm quote and design." />
            <Step n="03" title="Design the system" body="French drain, catch basin, buried downspouts, or a mix. Routed to daylight, dry well, or grade." />
            <Step n="04" title="Trench + install" body="Most residential jobs done in 1–3 days. We haul spoil, restore the sod, and leave the yard clean." />
          </ol>
        </div>
      </section>

      {/* Reviews cue */}
      <section className="border-b border-bone-50/10 bg-ink-950 py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1640px] px-6 text-center md:px-10 lg:px-16">
          <a
            href={SITE.socials.google}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-bone-50/10 bg-ink-1000 px-5 py-2.5 transition-colors hover:border-bone-50/25"
          >
            <Award className="size-4" style={{ color: "#FBBC04" }} />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-300">
              4.9 ★ average &nbsp;·&nbsp; {SITE.stats.googleReviewCount}+ Google reviews — read them
            </span>
          </a>
        </div>
      </section>

      {/* Second-shot form section */}
      <section className="relative isolate overflow-hidden border-b border-bone-50/10 py-20 lg:py-28">
        <div aria-hidden className="absolute inset-0 -z-20">
          <Image
            src="/images/raintamer/drains/dr-new-06.jpg"
            alt=""
            fill
            quality={70}
            sizes="100vw"
            className="object-cover opacity-[0.22]"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(31,102,255,0.20), transparent 70%), linear-gradient(180deg, rgba(10,10,11,0.78) 0%, rgba(10,10,11,0.92) 100%)",
          }}
        />

        <div className="mx-auto grid w-full max-w-[1640px] items-center gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16">
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-rain-400">
              Still here? Let&apos;s talk.
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-bone-50 sm:text-4xl lg:text-5xl">
              Get your free drainage estimate today.
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-[1.6] text-bone-200">
              Tell us where the water sits and how bad it gets. A Rain Tamer drainage lead will call you within one business day to schedule the walk-through.
            </p>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="mt-8 inline-flex h-14 items-center gap-3 rounded-[3px] bg-rain-500 px-7 text-lg font-semibold text-ink-1000 shadow-[0_0_28px_rgba(31,102,255,0.4)] transition-colors hover:bg-rain-400"
            >
              <Phone className="size-5" />
              Call {SITE.phone}
            </a>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-[6px] border border-bone-50/15 bg-ink-1000/85 p-6 backdrop-blur-md sm:p-8">
              <LpQuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-bone-50/10 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-rain-400">Frequently asked</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-bone-50 sm:text-4xl lg:text-5xl">
            Questions people actually ask.
          </h2>
          <dl className="mt-10 divide-y divide-bone-50/10 border-y border-bone-50/10">
            <Faq
              q="How much does a French drain cost in OKC?"
              a="Most residential French drains run $40–$85 per linear foot depending on depth, length, and how far we route to daylight. We give you a firm number after walking the property — not a range."
            />
            <Faq
              q="How long does drainage installation take?"
              a="Most residential yard drainage systems are installed in 1–3 days. Larger foundation drainage or commercial jobs can run longer; we tell you before we dig."
            />
            <Faq
              q="Will you tear up my yard?"
              a="We trench with care, protect the sod where possible, and haul all spoil off-site. Trench lines are backfilled and the yard is left clean. We're honest about which sections will need reseeding."
            />
            <Faq
              q="Do you install buried downspout extensions?"
              a="Yes — burying downspouts and routing them well away from the foundation is one of the highest-impact drainage upgrades on Oklahoma clay. We often bundle it with a French drain."
            />
            <Faq
              q="What areas do you serve?"
              a="OKC metro: Oklahoma City, Edmond, Norman, Moore, Yukon, Bethany, Warr Acres, Nichols Hills, The Village, Tuttle, Mustang, and surrounding."
            />
            <Faq
              q="Are you licensed and insured?"
              a="Yes. Oklahoma licensed, bonded, and fully insured — proof provided on request."
            />
          </dl>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="bg-ink-950 py-10">
        <div className="mx-auto flex w-full max-w-[1640px] flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:px-10 lg:px-16">
          <div className="flex items-center gap-3">
            <Image src="/images/rain-tamer-logo.png" alt="Rain Tamer" width={120} height={49} className="h-9 w-auto" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
              Oklahoma City · Est. {SITE.founded}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-rain-400 hover:text-rain-500"
            >
              <Phone className="size-3.5" />
              {SITE.phone}
            </a>
            <Link
              href="/privacy"
              className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500 hover:text-bone-300"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>

      {/* Sticky mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-bone-50/15 bg-ink-1000/95 backdrop-blur-md lg:hidden">
        <div className="grid grid-cols-2 gap-2 p-3">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[3px] border border-bone-50/15 bg-ink-950 text-sm font-semibold text-bone-50"
          >
            <Phone className="size-4 text-rain-400" />
            Call
          </a>
          <a
            href="#top"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[3px] bg-rain-500 text-sm font-semibold text-ink-1000"
          >
            Get free estimate
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="num text-3xl font-medium text-bone-50 sm:text-4xl lg:text-5xl">{value}</p>
      <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-400">{label}</p>
    </div>
  );
}

function Benefit({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex size-11 items-center justify-center rounded-[4px] border border-rain-500/30 bg-rain-500/10 text-rain-400">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em] text-bone-50">{title}</h3>
      <p className="mt-2 text-[15px] leading-[1.6] text-bone-300">{body}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="border-t border-bone-50/10 pt-6">
      <span className="num text-3xl text-rain-400">{n}</span>
      <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.02em] text-bone-50">{title}</h3>
      <p className="mt-2 text-[15px] leading-[1.55] text-bone-300">{body}</p>
    </li>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="py-5">
      <dt className="font-display text-lg font-semibold text-bone-50 sm:text-xl">{q}</dt>
      <dd className="mt-2 text-[15px] leading-[1.65] text-bone-300">{a}</dd>
    </div>
  );
}
