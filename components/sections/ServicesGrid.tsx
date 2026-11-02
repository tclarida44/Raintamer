import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES, type ServiceSlug } from "@/lib/services";

function SpecStat({ term, value, small }: { term: string; value: string; small?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">{term}</dt>
      <dd className={`num text-bone-50 ${small ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl"}`}>{value}</dd>
    </div>
  );
}

/**
 * Visual service grid. Per the contractor-site research, every high-converting
 * site shows services as photo cards, not text-only rows. Asymmetric layout
 * keeps the editorial feel while delivering the proven visual variety.
 */
const SERVICE_IMAGES: Record<ServiceSlug, string> = {
  // Featured seamless tile — use the biggest, most impressive residential
  // install we have (long copper half-round with dormer row).
  "seamless-gutters": "/images/raintamer/custom/custom-08.jpg",
  "commercial-gutters": "/images/raintamer/commercial/commercial-12.jpg",
  "french-drains": "/images/raintamer/drains/drains-01.jpg",
  "gutter-guards": "/images/raintamer/leaf-guards/leaf-guards-05.jpg",
  "gutter-cleaning": "/images/raintamer/trucks-crew/trucks-crew-07.jpg",
};

const SERVICE_LAYOUT: Record<ServiceSlug, string> = {
  "seamless-gutters": "lg:col-span-7 lg:row-span-2",
  "french-drains": "lg:col-span-5",
  "gutter-guards": "lg:col-span-5",
  "commercial-gutters": "lg:col-span-7",
  "gutter-cleaning": "lg:col-span-12",
};

const FEATURE_BULLETS: Record<ServiceSlug, string[]> = {
  "seamless-gutters": [
    "K-Style 5″ & 6″, Box, Half Round",
    "28 painted colors + copper, Galvalume, Zinc, Steel",
    "Hand-mitered corners, hidden hangers 24″ OC",
  ],
  "commercial-gutters": [
    "Heavier-gauge aluminum & Galvalume",
    "Oversized downspouts",
    "Crews work around your hours",
  ],
  "french-drains": [
    "Site-graded slope (min. 1″ per 10′)",
    "Washed gravel envelope",
    "Daylight or pop-up outlets",
  ],
  "gutter-guards": [
    "Stainless micromesh",
    "Reverse-curve options",
    "Lifetime no-clog warranties available",
  ],
  "gutter-cleaning": [
    "Hand-cleaned & bagged debris",
    "Downspouts flushed & flow-tested",
    "Photo report of any flagged repairs",
  ],
};

export function ServicesGrid() {
  return (
    <section className="brand-section-blue border-b border-bone-50/10 py-16 lg:py-24">
      <Container size="full">
        <SectionLabel number="03" label="Capabilities" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Five specialties</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95]">
                Every drop has somewhere to go.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <Reveal>
              <p className="max-w-2xl text-[17px] leading-[1.6] text-bone-300">
                One company. One install standard. From the eave to the lot line, we design the entire water path on your property, not just the part you can see from the curb. The five specialties below are designed to work as a system: gutters move water off the roof, drainage carries it away from the foundation, guards keep both flowing.
              </p>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-bone-300">
                Most homes need a combination of two or three. We walk the property first, then recommend the smallest scope that actually solves your water problem, not the largest one we can sell.
              </p>
              <dl className="mt-8 grid max-w-xl grid-cols-3 gap-x-6 gap-y-4 border-t border-bone-50/10 pt-6">
                <SpecStat term="Specialties" value="5" />
                <SpecStat term="Standard" value="1" />
                <SpecStat term="Warranty" value="Lifetime" small />
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-3 lg:auto-rows-[260px] lg:gap-4">
          {SERVICES.map((service, i) => (
            <Reveal
              key={service.slug}
              delayMs={i * 80}
              className={`col-span-12 ${SERVICE_LAYOUT[service.slug]}`}
            >
              <ServiceCard
                slug={service.slug}
                title={service.shortTitle}
                eyebrow={service.eyebrow}
                blurb={service.blurb}
                bullets={FEATURE_BULLETS[service.slug]}
                image={SERVICE_IMAGES[service.slug]}
                featured={service.slug === "seamless-gutters"}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({
  slug,
  title,
  eyebrow,
  blurb,
  bullets,
  image,
  featured,
}: {
  slug: ServiceSlug;
  title: string;
  eyebrow: string;
  blurb: string;
  bullets: string[];
  image: string;
  featured: boolean;
}) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden border border-bone-50/25 bg-ink-950 shadow-[0_8px_32px_rgba(10,10,11,0.55)] transition-all hover:border-rain-500/60 hover:shadow-[0_12px_40px_rgba(31,102,255,0.35)]"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        quality={75}
        className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
      />
      {/* Three-layer scrim: top fade for eyebrow, bottom solid for caption, plus a base wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-1000 via-ink-1000/80 to-ink-1000/45" />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink-1000/55 to-transparent" />
      {/* Brand-blue tint on hover */}
      <div className="absolute inset-0 bg-rain-500/0 transition-colors duration-500 group-hover:bg-rain-500/10" />

      <div className="relative flex h-full flex-col justify-between p-7 lg:p-8">
        <div className="flex items-start justify-between">
          <span className="inline-block text-pop">
            <Eyebrow>
              <span className="text-bone-100">{eyebrow}</span>
            </Eyebrow>
          </span>
          <ArrowUpRight className="size-5 text-bone-200 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rain-400" />
        </div>

        <div>
          <h3
            className={`font-display font-medium tracking-[-0.025em] text-white text-pop-strong transition-colors group-hover:text-rain-400 ${
              featured ? "text-4xl sm:text-5xl lg:text-6xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-3 max-w-md text-[14.5px] leading-[1.55] text-bone-100 text-pop ${
              featured ? "lg:max-w-lg" : ""
            }`}
          >
            {blurb}
          </p>
          <ul className={`mt-5 flex flex-wrap gap-x-4 gap-y-1.5 ${featured ? "" : "hidden lg:flex"}`}>
            {bullets.map((b) => (
              <li
                key={b}
                className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-bone-100 text-pop"
              >
                <span className="mr-2 text-rain-400">—</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
