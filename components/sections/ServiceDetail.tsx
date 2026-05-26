import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SERVICES, type Service, type ServiceSlug } from "@/lib/services";

const SERVICE_HERO_IMAGES: Record<ServiceSlug, string> = {
  "seamless-gutters": "/images/stock/colonial-home.jpg",
  "commercial-gutters": "/images/stock/modern-home.jpg",
  "french-drains": "/images/stock/installer-caulk.jpg",
  "gutter-guards": "/images/stock/autumn-home.jpg",
  "gutter-cleaning": "/images/stock/autumn-home.jpg",
};

type ProcessStep = { num: string; title: string; body: string };

const SERVICE_PROCESS: Record<ServiceSlug, ProcessStep[]> = {
  "seamless-gutters": [
    {
      num: "01",
      title: "Measure & spec",
      body: "We walk every roof line, measure each run, and pick the profile and downspout size to match the actual water volume, not a default.",
    },
    {
      num: "02",
      title: "Form on site",
      body: "Aluminum is fed through a brake machine in your driveway and cut to the exact length of each run. No factory joints, no waste.",
    },
    {
      num: "03",
      title: "Hang & finish",
      body: "Internal hangers every 24″, hand-mitered corners riveted and sealed, outlet tubes at every drop. Photographed before we leave.",
    },
  ],
  "commercial-gutters": [
    {
      num: "01",
      title: "Site survey",
      body: "We assess roof load, drainage requirements, and access. Stamped engineering docs available on request.",
    },
    {
      num: "02",
      title: "Heavy-gauge fabrication",
      body: "Box or oversized K-style in heavier-gauge aluminum or Galvalume Plus, sized to your actual roof load.",
    },
    {
      num: "03",
      title: "Scheduled around you",
      body: "Crews work around your operating hours. Nights, weekends, phased installs as needed.",
    },
  ],
  "french-drains": [
    {
      num: "01",
      title: "Grade & plan",
      body: "We walk the lot, check soil and slope, and design the trench path to a workable outlet. Smallest viable scope, not the largest.",
    },
    {
      num: "02",
      title: "Trench & wrap",
      body: "Trench cut to depth, lined with non-woven filter fabric, perforated pipe set with holes down, washed gravel envelope on every side.",
    },
    {
      num: "03",
      title: "Outlet to daylight",
      body: "Daylight or pop-up emitter at the low point. No blind ends, no dry wells in OKC clay unless conditions actually warrant it.",
    },
  ],
  "gutter-guards": [
    {
      num: "01",
      title: "Audit the trees",
      body: "We walk your property and identify what falls on the roof. Pine, oak, cottonwood, maple. The right guard depends on the debris.",
    },
    {
      num: "02",
      title: "Match the spec",
      body: "Stainless micromesh, reverse-curve, or screen — chosen for your trees, not pre-loaded on the truck. Color-matched to the gutter.",
    },
    {
      num: "03",
      title: "Install without lifting shingles",
      body: "Guards installed without modifying or voiding your roof warranty. Lifetime no-clog warranties available on premium systems.",
    },
  ],
  "gutter-cleaning": [
    {
      num: "01",
      title: "Hand-clean every run",
      body: "All debris removed by hand, bagged, and hauled off site. No leaf blowers throwing wet sludge across the yard.",
    },
    {
      num: "02",
      title: "Flush & flow-test",
      body: "Every downspout flushed with water and confirmed flowing. Any restriction is cleared on the spot.",
    },
    {
      num: "03",
      title: "Photo report",
      body: "Photos of hangers, seams, miters, and any flagged repair items texted to you the same day. Next service auto-scheduled if you want.",
    },
  ],
};

const SERVICE_FACTS: Record<ServiceSlug, { label: string; value: string }[]> = {
  "seamless-gutters": [
    { label: "Typical timeline", value: "1 day" },
    { label: "Profiles available", value: "5" },
    { label: "Colors in stock", value: "23" },
    { label: "Warranty", value: "Lifetime" },
  ],
  "commercial-gutters": [
    { label: "Typical timeline", value: "1–3 days" },
    { label: "Gauges", value: "Heavy" },
    { label: "Profiles", value: "Box / K" },
    { label: "Engineering docs", value: "On request" },
  ],
  "french-drains": [
    { label: "Typical timeline", value: "1–2 days" },
    { label: "Pipe diameter", value: "4–6″" },
    { label: "Slope minimum", value: "1″/10′" },
    { label: "Outlet", value: "Daylight" },
  ],
  "gutter-guards": [
    { label: "Typical timeline", value: "Half-day" },
    { label: "Mesh type", value: "Stainless" },
    { label: "Color match", value: "Yes" },
    { label: "Warranty", value: "Lifetime no-clog" },
  ],
  "gutter-cleaning": [
    { label: "Typical timeline", value: "1 hour" },
    { label: "Cadence", value: "2× / year" },
    { label: "Photo report", value: "Same day" },
    { label: "Plans available", value: "Yes" },
  ],
};

export function ServiceDetail({
  service,
  children,
}: {
  service: Service;
  children?: React.ReactNode;
}) {
  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const steps = SERVICE_PROCESS[service.slug];
  const facts = SERVICE_FACTS[service.slug];

  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.tagline}
        secondary={service.blurb}
        meta={facts.slice(0, 3).map((f) => ({ label: f.label, value: f.value }))}
        image={SERVICE_HERO_IMAGES[service.slug]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.shortTitle },
        ]}
      />

      {/* Overview */}
      <section className="border-b border-bone-50/10 py-20 lg:py-32">
        <Container size="full">
          <SectionLabel number="01" label="Overview" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <p className="font-display text-[clamp(1.5rem,2.2vw,2.25rem)] font-medium leading-[1.3] tracking-[-0.02em] text-bone-50 text-pretty">
                {service.intro}
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-bone-50/10 pt-8 sm:grid-cols-4">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">
                      {f.label}
                    </dt>
                    <dd className="num mt-2 text-2xl text-bone-50 sm:text-3xl">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="lg:col-span-5">
              <Eyebrow>What&apos;s included</Eyebrow>
              <ul className="mt-6 border-t border-bone-50/10">
                {service.bullets.map((b) => (
                  <li
                    key={b}
                    className="grid grid-cols-[auto_1fr] gap-4 border-b border-bone-50/10 py-4"
                  >
                    <span className="mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-rain-500/15 text-rain-400">
                      <Check className="size-3" />
                    </span>
                    <span className="text-[15px] leading-[1.5] text-bone-200">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" size="md">
                  Quote this service
                  <ArrowUpRight className="size-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How it works for this service */}
      <section className="brand-ambient-soft border-b border-bone-50/10 py-20 lg:py-32">
        <Container size="full">
          <SectionLabel number="02" label={`How ${service.shortTitle.toLowerCase()} go in`} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Three steps. No surprises.</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2rem,5vw,3.75rem)] leading-[0.95]">
                How we install it.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.55] text-bone-300">
                The work is mostly invisible once it&apos;s done. These are the steps we take on every {service.shortTitle.toLowerCase()} install, in this order, every time.
              </p>
              <div className="mt-10 relative aspect-[4/3] overflow-hidden border border-bone-50/10">
                <Image
                  src={SERVICE_HERO_IMAGES[service.slug]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  quality={70}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-1000/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <Eyebrow>Detail</Eyebrow>
                  <p className="mt-2 font-display text-lg font-medium text-bone-50">
                    {service.shortTitle}, finished
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <ol className="border-t border-bone-50/15">
                {steps.map((s, i) => (
                  <Reveal key={s.num} delayMs={i * 90}>
                    <li className="grid grid-cols-[auto_1fr] gap-x-8 border-b border-bone-50/10 py-8 lg:py-10">
                      <span className="font-mono text-sm tracking-[0.18em] text-rain-500">{s.num}</span>
                      <div>
                        <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-bone-50 sm:text-3xl">
                          {s.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-[15px] leading-[1.6] text-bone-300">{s.body}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {children}

      <ReviewsSection />

      {/* Pair with */}
      <section className="border-b border-bone-50/10 py-20 lg:py-28">
        <Container size="full">
          <SectionLabel number="—" label="Pair with" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>One system</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2rem,5vw,3.5rem)] leading-[0.95]">
                Our other disciplines.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.55] text-bone-300">
                Most homes benefit from two or three of these working together. Browse the rest, then send your full scope to a single estimate.
              </p>
            </Reveal>

            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/services/${o.slug}`}
                    className="group flex flex-col justify-between gap-6 border border-bone-50/10 bg-ink-950 p-7 transition-colors hover:border-rain-500/50"
                  >
                    <div>
                      <Eyebrow>{o.eyebrow}</Eyebrow>
                      <p className="mt-3 font-display text-2xl font-medium tracking-[-0.02em] text-bone-50 group-hover:text-rain-400">
                        {o.shortTitle}
                      </p>
                      <p className="mt-3 text-[14px] leading-[1.55] text-bone-300">{o.blurb}</p>
                    </div>
                    <ArrowUpRight className="size-4 text-bone-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rain-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
