import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight, ShieldCheck, Ruler, Truck, HardHat, Wrench, Award } from "lucide-react";
import { LpHero } from "@/components/lp/LpHero";
import { LpQuoteForm } from "@/components/lp/LpQuoteForm";
import { SITE } from "@/lib/site";

/**
 * GOOGLE ADS LANDING PAGE — Seamless Gutters
 *
 * STAGED, NOT LAUNCHED. Reachable at /lp/seamless-gutters but:
 *  - not linked from main nav
 *  - noindex/nofollow (inherited from app/lp/layout.tsx)
 *  - not in sitemap
 *
 * Hand this URL directly to Google Ads. When you're ready to send
 * paid traffic, add UTM params on the ad side; the LP form captures
 * source + landing URL automatically so leads are attributable.
 */

export const metadata: Metadata = {
  title: "Seamless Gutters — Free OKC Estimate | Rain Tamer",
  description:
    "Seamless K-style, half-round, and box gutters installed by Rain Tamer across the Oklahoma City metro. Free estimate in under 24 hours. Licensed, bonded, insured.",
  // robots noindex/nofollow inherited from app/lp/layout.tsx
};

// Pull 6 real install photos for the mid-page proof strip
const PROOF_PHOTOS = [
  "/images/raintamer/k-style-5/k5-new-01.jpg",
  "/images/raintamer/k-style-6/k6-new-02.jpg",
  "/images/raintamer/half-round-6/gd-04.jpg",
  "/images/raintamer/box-6/gd-01.jpg",
  "/images/raintamer/k-style-6/k6-new-04.jpg",
  "/images/raintamer/half-round-6/hr-new-01.jpg",
];

const HERO_PHOTOS = [
  { src: "/images/raintamer/k-style-6/k6-new-01.jpg", alt: "Freshly-installed seamless K-style gutters on an OKC home" },
  { src: "/images/raintamer/k-style-5/k5-new-01.jpg", alt: "Custom-formed seamless gutter run" },
  { src: "/images/raintamer/half-round-6/hr-new-01.jpg", alt: "Half-round gutter install on a modern build" },
  { src: "/images/raintamer/k-style-6/k6-new-04.jpg", alt: "Clean fascia line with new seamless gutters" },
  { src: "/images/raintamer/box-6/gd-01.jpg", alt: "Commercial-profile box gutter install" },
];

export default function Page() {
  return (
    <div id="top" className="bg-ink-1000 text-bone-50">
      <LpHero
        photos={HERO_PHOTOS}
        titleLines={["Seamless gutters,", "installed in a day."]}
        subtitle="Custom-formed on your driveway, hung level with hidden hangers, warrantied for life. Free estimate in under 24 hours."
        formHeading="Get your price in 24 hours."
      />

      {/* Trust strip — high-contrast bar with hard stats */}
      <section className="border-b border-bone-50/10 bg-ink-950 py-8 lg:py-12">
        <div className="mx-auto grid w-full max-w-[1640px] grid-cols-2 gap-y-6 px-6 text-center md:grid-cols-4 md:gap-y-0 md:px-10 lg:px-16">
          <Stat value={`${(SITE.stats.installsCompleted / 1000).toFixed(0)}k+`} label="Installs since 2010" />
          <Stat value="8M ft" label="Gutter installed" />
          <Stat value={`${SITE.stats.googleReviewCount}+`} label="5-star reviews" />
          <Stat value={`${SITE.stats.yearsInBusiness} yrs`} label="OKC family-owned" />
        </div>
      </section>

      {/* Why us — 4-column benefits */}
      <section className="border-b border-bone-50/10 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1640px] px-6 md:px-10 lg:px-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-rain-400">Why Rain Tamer</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-[-0.03em] text-bone-50 sm:text-4xl lg:text-5xl">
            Custom-formed on your driveway, hung level, warrantied for life.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <Benefit
              icon={Ruler}
              title="Cut on-site, zero seams"
              body="We roll each run to the exact length of your fascia on our truck-mounted machine. No sectional joints means no leaks 5 years in."
            />
            <Benefit
              icon={Wrench}
              title="Hidden hangers, storm-rated"
              body="Every gutter is anchored with concealed hangers spaced tight to OKC's storm loads. No sagging in a heavy May downpour."
            />
            <Benefit
              icon={HardHat}
              title="Same-week walk-through"
              body="Free on-site walk-through, firm quote in hand before we leave. Most installs booked within 5-10 business days."
            />
            <Benefit
              icon={ShieldCheck}
              title="Lifetime workmanship"
              body="Backed by our workmanship warranty. If it leaks because of how we hung it, we're back on-site to fix it — no invoice."
            />
          </div>
        </div>
      </section>

      {/* Proof strip — real install photo grid */}
      <section className="border-b border-bone-50/10 bg-ink-950 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1640px] px-6 md:px-10 lg:px-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-rain-400">Recent installs</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-bone-50 sm:text-4xl">
                Real work across the OKC metro.
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
                  alt={`Recent Rain Tamer seamless gutter install ${i + 1}`}
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

      {/* Process — 4-step visual */}
      <section className="border-b border-bone-50/10 py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1640px] px-6 md:px-10 lg:px-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-rain-400">How it works</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-[-0.03em] text-bone-50 sm:text-4xl lg:text-5xl">
            From call to installed in under 2 weeks.
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <Step n="01" title="Fill the form" body="Or call. Tell us your ZIP and what you need. Takes 30 seconds." />
            <Step n="02" title="Free walk-through" body="A crew lead comes out, measures the roofline, and hands you a firm quote on the spot." />
            <Step n="03" title="Pick color + profile" body="28 baked-enamel colors, plus copper, Galvalume, zinc, and steel. Live samples on-site." />
            <Step n="04" title="Installed in a day" body="Most residential jobs done in a single day. We haul all debris off-site." />
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

      {/* Second-shot form section — for scrollers who bounced past the hero form */}
      <section className="relative isolate overflow-hidden border-b border-bone-50/10 py-20 lg:py-28">
        <div aria-hidden className="absolute inset-0 -z-20">
          <Image
            src="/images/raintamer/k-style-6/k6-new-01.jpg"
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
              Get your free estimate today.
            </h2>
            <p className="mt-5 max-w-lg text-[17px] leading-[1.6] text-bone-200">
              Tell us where you are and what you need. A Rain Tamer crew lead will call you within one business day to schedule the walk-through.
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
              q="How much do seamless gutters cost in OKC?"
              a="Most single-story residential jobs run $8–$14 per linear foot depending on gauge, profile, and color. Copper, zinc, and box profiles are quoted separately. We give you a firm number on the walk-through, not a range."
            />
            <Faq
              q="How long does an install take?"
              a="Most residential jobs are completed in a single day. Larger two-story homes or commercial buildings may take 1–2 days."
            />
            <Faq
              q="Do you install gutter guards too?"
              a="Yes — we install our leaf-guard system over new or existing K-style and half-round gutters. Ask on the walk-through and we'll price it as an add-on."
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

      {/* Minimal footer — no nav, just phone + legal */}
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

      {/* Sticky mobile bottom bar — Call + Get quote (jumps to hero form) */}
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
