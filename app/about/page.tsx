import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Difference } from "@/components/sections/Difference";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Rain Tamer — Oklahoma City Gutter Contractor Since 2010",
  keywords: [
    "Rain Tamer Oklahoma City",
    "Oklahoma City gutter company",
    "OKC gutter contractor",
    "local gutter installers Oklahoma City",
    "licensed gutter contractor Oklahoma",
    "insured gutter contractor OKC",
    "family-owned gutter company Oklahoma City",
    "Oklahoma gutter installers since 2010",
    "best gutter company OKC",
  ],
  description:
    "Rain Tamer has been installing premium seamless gutters, French drains, and gutter guards in the Oklahoma City metro since 2011.",
};

const VALUES = [
  {
    num: "01",
    title: "Specs over shortcuts",
    body: "Hidden hangers every 24 inches. Hand-mitered corners. Outlet tubes at every downspout. Every gutter pitched to drain to the nearest downspout — never level. None of this is optional, on any install.",
  },
  {
    num: "02",
    title: "Pricing in writing",
    body: "Our estimates are fixed. Whatever number you sign is what you pay. No day-of changes, no surprise scope, no whittling the bill down to the bone and bolting on extras later.",
  },
  {
    num: "03",
    title: "Crews that show up",
    body: "We schedule the day, we hit the day. If the weather pushes us, you hear from us before you hear from the radar. Our installers have been here three, five, ten years. They know the work.",
  },
  {
    num: "04",
    title: "Warranty we honor",
    body: "Lifetime workmanship for the original homeowner. If something we installed fails because of how we installed it, we come fix it. We&apos;re still here, still in Oklahoma City, still answering the phone.",
  },
];

const CREW_FACTS = [
  { label: "Crews in the field", value: "6" },
  { label: "Average tenure", value: "6 yrs" },
  { label: "Fleet trucks", value: "15" },
  { label: "Gutter machines", value: "10" },
  { label: "Materials warehouse", value: "13,000 sq ft" },
  { label: "Colors in inventory", value: "28" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Our Company", url: `${SITE.url}/about` },
        ])}
      />
      <PageHero
        eyebrow="Our Company"
        title="An Oklahoma company built around one job."
        description="Keeping water away from the house. Rain Tamer was founded in 2011 in Oklahoma City. Since then we've installed gutter and drainage systems on thousands of homes and commercial properties across the metro."
        secondary="We're privately owned. We answer our own phones. We've turned down jobs we couldn't do right, and we've taken on work the big guys wouldn't touch. Same crews, same standards, the same install rules we wrote down on day one."
        meta={[
          { label: "Founded", value: "2011" },
          { label: "Installs", value: "5,000+" },
          { label: "Cities", value: "11" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Company" }]}
        image="/images/raintamer/trucks-crew/trucks-crew-02.jpg"
      />

      {/* Story */}
      <section className="border-b border-bone-50/10 py-16 lg:py-24">
        <Container size="full">
          <SectionLabel number="01" label="Our story" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <p className="font-display text-[clamp(1.5rem,2.4vw,2.5rem)] font-medium leading-[1.25] tracking-[-0.02em] text-bone-50 text-pretty">
                We started Rain Tamer because the gutter work we kept seeing on Oklahoma homes wasn&apos;t worthy of the homes themselves. Crooked runs, exposed straps, prefab miters that pull apart in two seasons. We knew it could be done better.
              </p>
              <p className="mt-8 text-[16px] leading-[1.6] text-bone-300">
                Today, our crews install seamless gutters, French drains, and gutter guards across the OKC metro using a standard we wrote down and refuse to deviate from. Every install gets hidden hangers every two feet, hand-mitered corners, formed outlet tubes, and a positive pitch to the nearest downspout on every run. It&apos;s slower than the truck-and-ladder competition, and we like it that way.
              </p>
              <p className="mt-4 text-[16px] leading-[1.6] text-bone-300">
                We&apos;re licensed, insured, and based in Oklahoma City. Most of our work comes from referrals and from neighbors who watched the install next door. That tells us we&apos;re doing it right.
              </p>
            </Reveal>

            <Reveal className="lg:col-span-5">
              <Eyebrow>By the numbers</Eyebrow>
              <dl className="mt-6 border-t border-bone-50/15">
                <StatRow term="Founded" value={String(SITE.founded)} />
                <StatRow term="Years in business" value={`${SITE.stats.yearsInBusiness}+`} />
                <StatRow
                  term="Installs completed"
                  value={`${SITE.stats.installsCompleted.toLocaleString()}+`}
                />
                <StatRow term="Cities served" value={String(SITE.stats.citiesServed)} />
                <StatRow term="Google rating" value={`${SITE.stats.googleRating} / 5`} />
                <StatRow term="Reviews" value={`${SITE.stats.googleReviewCount}+`} />
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="brand-section-blue border-b border-bone-50/10 py-16 lg:py-24">
        <Container size="full">
          <SectionLabel number="02" label="What we stand for" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Four rules we run on</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95]">
                The shortcuts we won&apos;t take.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.55] text-bone-300">
                The construction trades have a reputation for a reason. We built Rain Tamer to be the company we couldn&apos;t find when we needed someone to do this work on our own homes.
              </p>
            </Reveal>

            <div className="lg:col-span-7">
              <ol className="border-t border-bone-50/15">
                {VALUES.map((v, i) => (
                  <Reveal key={v.num} delayMs={i * 80}>
                    <li className="grid grid-cols-[auto_1fr] gap-x-8 border-b border-bone-50/10 py-8 lg:py-10">
                      <span className="font-mono text-sm tracking-[0.18em] text-rain-500">{v.num}</span>
                      <div>
                        <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-bone-50 sm:text-3xl">
                          {v.title}
                        </h3>
                        <p
                          className="mt-3 max-w-2xl text-[15px] leading-[1.6] text-bone-300"
                          dangerouslySetInnerHTML={{ __html: v.body }}
                        />
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* Crew + equipment */}
      <section className="border-b border-bone-50/10 py-16 lg:py-24">
        <Container size="full">
          <SectionLabel number="03" label="Crews & equipment" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <Eyebrow>The team behind the install</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95]">
                Real crews. Real trucks.
              </h2>
              <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-bone-300">
                Six crews in the field, run by lead installers with an average tenure of six years. Fifteen fleet trucks. Ten Knudson gutter machines so we form aluminum on site to the exact length your home needs. A 13,000 square foot warehouse with every painted color in stock.
              </p>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-bone-300">
                When you call, you talk to the person who will quote you. When the crew arrives, they&apos;re wearing Rain Tamer shirts, not whatever subcontractor we could borrow that morning. Every truck, every crew, every install: same company.
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-bone-50/10 pt-8 sm:grid-cols-3">
                {CREW_FACTS.map((f) => (
                  <div key={f.label}>
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
                      {f.label}
                    </dt>
                    <dd className="num mt-2 text-3xl text-bone-50 sm:text-4xl">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="lg:col-span-5" delayMs={150}>
              <div className="grid gap-3">
                <div className="relative aspect-[4/5] overflow-hidden border border-bone-50/10">
                  <Image
                    src="/images/raintamer/trucks-crew/trucks-crew-06.jpg"
                    alt="Rain Tamer truck logo with a colonial home in the background."
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    quality={80}
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-1000/85 to-transparent p-5">
                    <Eyebrow>Truck on site</Eyebrow>
                    <p className="mt-2 font-display text-lg font-medium text-bone-50">
                      Rain Tamer truck, OKC metro
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative aspect-[4/3] overflow-hidden border border-bone-50/10">
                    <Image
                      src="/images/raintamer/trucks-crew/trucks-crew-03.jpg"
                      alt="Side view of a Rain Tamer truck."
                      fill
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      quality={70}
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden border border-bone-50/10">
                    <Image
                      src="/images/raintamer/trucks-crew/trucks-crew-01.jpg"
                      alt="Rain Tamer crew on ladders during an install."
                      fill
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      quality={70}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Difference />
      <ReviewsSection />
      <FinalCTA />
    </>
  );
}

function StatRow({ term, value }: { term: string; value: string }) {
  return (
    <div className="grid grid-cols-2 items-baseline gap-4 border-b border-bone-50/10 py-5">
      <dt className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">{term}</dt>
      <dd className="num text-right text-2xl text-bone-50 sm:text-3xl">{value}</dd>
    </div>
  );
}
