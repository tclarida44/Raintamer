import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { CITIES, getCityBySlug } from "@/lib/cities";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { STANDARDS } from "@/lib/standards";

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const c = getCityBySlug(city);
  if (!c) return {};
  return {
    title: `Seamless Gutter Installation — ${c.name}, OK`,
    description: `Rain Tamer installs seamless gutters, French drains, gutter guards, and commercial gutter systems in ${c.name}, Oklahoma. Serving ${c.name} homeowners since 2010 with 5", 6" K-style, box, half-round, and copper profiles. Hidden hangers every 24 inches, hand-mitered corners, 28 baked-enamel colors. Free estimates.`,
    keywords: [
      `seamless gutters ${c.name} OK`,
      `gutter installation ${c.name}`,
      `gutter contractor ${c.name} Oklahoma`,
      `gutter installers ${c.name} OK`,
      `gutter company ${c.name}`,
      `K-style gutters ${c.name}`,
      `half-round gutters ${c.name}`,
      `copper gutters ${c.name} Oklahoma`,
      `French drain installation ${c.name} OK`,
      `gutter guards ${c.name}`,
      `gutter cleaning ${c.name}`,
      `commercial gutters ${c.name} Oklahoma`,
      `free gutter estimate ${c.name}`,
      `Rain Tamer ${c.name}`,
    ],
    alternates: { canonical: `${SITE.url}/service-areas/${c.slug}` },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const c = getCityBySlug(city);
  if (!c) notFound();

  const localSchema = {
    ...localBusinessSchema(),
    "@id": `${SITE.url}/service-areas/${c.slug}#localbusiness`,
    areaServed: { "@type": "City", name: c.name },
  };

  return (
    <>
      <JsonLd
        data={[
          localSchema,
          breadcrumbSchema([
            { name: "Home", url: SITE.url },
            { name: "Service Areas", url: `${SITE.url}/service-areas` },
            { name: c.name, url: `${SITE.url}/service-areas/${c.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`Service Area · ${c.name}, OK`}
        title={`Seamless Gutters in ${c.name}.`}
        description={c.intro}
        secondary={`${c.localDetail} Estimates are free and walked through on site. Most ${c.name} installs are scheduled within the week and finished in a single day.`}
        meta={[
          { label: "Crew", value: "Local" },
          { label: "Estimate", value: "Free" },
          { label: "Install", value: "1 day" },
        ]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Service Areas", href: "/service-areas" },
          { label: c.name },
        ]}
      />

      <section className="border-b border-bone-50/10 py-20 lg:py-32">
        <Container size="full">
          <SectionLabel number="01" label={`Working in ${c.name}`} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <p className="font-display text-[clamp(1.5rem,2.2vw,2.25rem)] font-medium leading-[1.3] tracking-[-0.02em] text-bone-50 text-pretty">
                Rain Tamer has installed thousands of feet of seamless gutter, French drain, and gutter guard across {c.name} since 2011. Each install starts with a walk of the property, the roof, and the lot grade. {c.localDetail}
              </p>
              <p className="mt-6 text-[16px] leading-[1.6] text-bone-300">
                New builds coming off builder-grade gutters, older homes that never had proper downspout outlet tubes, copper-trim projects where the fascia line has to be dead straight — the crews handle them all the same way: install standards first, no shortcuts.
              </p>
              <p className="mt-4 text-[16px] leading-[1.6] text-bone-300">
                We schedule in {c.name} every week. Most jobs are completed in a single day, with bagged debris hauled off, the work photographed, and the warranty walked through with you before the truck leaves the driveway.
              </p>
            </Reveal>
            <Reveal className="lg:col-span-5">
              <div className="border border-bone-50/10 bg-ink-950 p-8">
                <Eyebrow>Schedule in {c.name}</Eyebrow>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="mt-4 block font-display text-[clamp(2rem,3vw,2.75rem)] font-medium tracking-[-0.03em] text-bone-50 transition-colors hover:text-rain-400"
                >
                  {SITE.phone}
                </a>
                <p className="mt-6 text-[14.5px] leading-[1.55] text-bone-300">
                  Free estimate, scheduled the same week.
                </p>
                <Button href="/contact" className="mt-8 w-full">
                  Get a Free Estimate
                  <ArrowUpRight className="size-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-b border-bone-50/10 py-20 lg:py-32">
        <Container size="full">
          <SectionLabel number="02" label={`Services in ${c.name}`} />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delayMs={i * 50}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group block border border-bone-50/10 bg-ink-950 p-8 transition-colors hover:border-rain-500/50"
                >
                  <Eyebrow>{s.eyebrow}</Eyebrow>
                  <p className="mt-4 font-display text-2xl font-medium tracking-[-0.02em] text-bone-50 group-hover:text-rain-400">
                    {s.shortTitle}
                  </p>
                  <p className="mt-3 text-[14px] leading-[1.55] text-bone-300">{s.blurb}</p>
                  <ArrowUpRight className="mt-8 size-4 text-bone-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rain-400" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-bone-50/10 py-20 lg:py-32">
        <Container size="full">
          <SectionLabel number="03" label={`${c.name} install standards`} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Same six rules</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95]">
                Every {c.name} install.
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-7">
              <ol className="border-t border-bone-50/15">
                {STANDARDS.map((s) => (
                  <li
                    key={s.number}
                    className="grid grid-cols-[auto_1fr] gap-x-8 border-b border-bone-50/10 py-7"
                  >
                    <span className="font-mono text-sm tracking-[0.18em] text-rain-500">{s.number}</span>
                    <div>
                      <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-bone-50 sm:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-[1.55] text-bone-300">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      <ReviewsSection />
      <FinalCTA />
    </>
  );
}
