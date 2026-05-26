import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceMap } from "@/components/interactive/ServiceMap";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CITIES } from "@/lib/cities";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Rain Tamer installs seamless gutters, French drains, and gutter guards across Oklahoma City, Edmond, Norman, Moore, Mustang, Yukon, Bethany, Warr Acres, Nichols Hills, The Village, and Tuttle.",
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Service Areas", url: `${SITE.url}/service-areas` },
        ])}
      />
      <PageHero
        eyebrow="Service Areas"
        title="One drive from the shop."
        description="Eleven cities across the OKC metro. Crews who live in the neighborhoods they install in, who know the soils, the trees, and the storms."
        secondary="Most jobs are within a 30-minute drive of the shop. That's how we keep the schedule tight, the estimates accurate, and the crews fresh at the start of an install. Click any city for local detail and to schedule a walk-through there."
        meta={[
          { label: "Cities served", value: "11" },
          { label: "Drive radius", value: "30 mi" },
          { label: "Scheduling", value: "Weekly" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service Areas" }]}
      />

      <section className="border-b border-bone-50/10 py-20 lg:py-28">
        <Container size="full">
          <SectionLabel number="01" label="Metro map" />
          <Reveal className="mt-12">
            <ServiceMap />
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-bone-50/10 py-20 lg:py-28">
        <Container size="full">
          <SectionLabel number="02" label="All cities" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Eleven cities</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.25rem,5vw,4rem)] leading-[0.95]">
                Pick your city.
              </h2>
            </Reveal>
            <div className="lg:col-span-7">
              <div className="border-t border-bone-50/10">
                {CITIES.map((c, i) => (
                  <Reveal key={c.slug} delayMs={i * 40}>
                    <Link
                      href={`/service-areas/${c.slug}`}
                      className="group flex items-center justify-between border-b border-bone-50/10 py-6 transition-colors hover:bg-bone-50/[0.015]"
                    >
                      <div className="flex items-baseline gap-6">
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-2xl font-medium tracking-[-0.02em] text-bone-50 group-hover:text-rain-400 sm:text-3xl">
                          {c.name}
                        </span>
                      </div>
                      <ArrowUpRight className="size-5 text-bone-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rain-400" />
                    </Link>
                  </Reveal>
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
