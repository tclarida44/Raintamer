import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Droplets, ShieldCheck, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services Overview",
  description:
    "Seamless gutters, French drains, gutter guards, gutter cleaning, and commercial gutter systems across the Oklahoma City metro.",
};

const APPROACH = [
  {
    icon: Droplets,
    title: "Water moves first.",
    body: "We design the entire water path before we pick a profile. Roof slope, lot grade, soil, downspout count, drainage outlet. The hardware comes after the plan.",
  },
  {
    icon: Wrench,
    title: "Built on standards.",
    body: "Every install gets the same six rules: internal hangers every 24″, hand-mitered corners, riveted downspouts, outlet tubes at every drop, positive slope verified with a level, 100% polyurethane sealant.",
  },
  {
    icon: ShieldCheck,
    title: "Warranted for life.",
    body: "Workmanship is warranted for the lifetime of the home, for the original owner. Materials follow manufacturer terms. We walk you through both before installs, never after.",
  },
];

export default function ServicesIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Services", url: `${SITE.url}/services` },
        ])}
      />
      <PageHero
        eyebrow="Services"
        title="Five disciplines, one system."
        description="Every Rain Tamer install is designed to work with the others. Gutters move water off the roof; drainage moves it off the lot; guards keep both flowing."
        secondary="We don't sell point fixes. We design the entire water path on your property and only spec the disciplines you actually need. Start with one, add the rest if and when it makes sense."
        meta={[
          { label: "Disciplines", value: "5" },
          { label: "Standard", value: "1" },
          { label: "Warranty", value: "Lifetime" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* Our approach */}
      <section className="brand-ambient-soft border-b border-bone-50/10 py-20 lg:py-28">
        <Container size="full">
          <SectionLabel number="01" label="Our approach" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>How we work</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.25rem,5vw,4rem)] leading-[0.95]">
                The system before the spec.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.55] text-bone-300">
                Most contractors lead with the product. We lead with the water. The five disciplines below all exist to solve the same problem: keep water moving until it&apos;s well away from the foundation.
              </p>
            </Reveal>
            <div className="lg:col-span-7">
              <div className="grid gap-0 border-t border-bone-50/15">
                {APPROACH.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <Reveal key={p.title} delayMs={i * 90}>
                      <div className="grid grid-cols-[auto_1fr] gap-x-6 border-b border-bone-50/10 py-7 lg:py-9">
                        <div className="flex size-10 items-center justify-center rounded-[3px] border border-rain-500/30 bg-rain-500/10 text-rain-400">
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-bone-50">
                            {p.title}
                          </h3>
                          <p className="mt-2 max-w-2xl text-[15px] leading-[1.6] text-bone-300">{p.body}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services list */}
      <section className="border-b border-bone-50/10 py-20 lg:py-28">
        <Container size="full">
          <SectionLabel number="02" label="Disciplines" />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>What we install</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.25rem,5vw,4rem)] leading-[0.95]">
                Five capabilities.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.55] text-bone-300">
                Click into each for materials, sizing, color options, and the exact spec we use on every install.
              </p>
            </Reveal>
            <div className="lg:col-span-7">
              <div className="border-t border-bone-50/10">
                {SERVICES.map((s, i) => (
                  <Reveal key={s.slug} delayMs={i * 60}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group grid grid-cols-12 items-baseline gap-6 border-b border-bone-50/10 py-8 transition-colors hover:bg-bone-50/[0.015] lg:py-10"
                    >
                      <span className="col-span-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="col-span-12 sm:col-span-10 lg:col-span-9">
                        <Eyebrow>{s.eyebrow}</Eyebrow>
                        <h3 className="mt-2 font-display text-2xl font-medium tracking-[-0.025em] text-bone-50 transition-colors group-hover:text-rain-400 sm:text-3xl">
                          {s.shortTitle}
                        </h3>
                        <p className="mt-2 max-w-2xl text-[14.5px] leading-[1.55] text-bone-300">
                          {s.tagline}
                        </p>
                      </div>
                      <div className="col-span-12 flex items-center justify-end sm:col-span-1 lg:col-span-2">
                        <ArrowUpRight className="size-5 text-bone-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rain-400" />
                      </div>
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
