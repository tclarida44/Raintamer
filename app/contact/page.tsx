import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteForm } from "@/components/interactive/QuoteForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Get a Free Gutter Estimate — Oklahoma City",
  keywords: [
    "free gutter estimate Oklahoma City",
    "gutter estimate OKC",
    "gutter quote Oklahoma City",
    "free gutter installation quote OKC",
    "gutter contractor near me Oklahoma City",
    "seamless gutter quote OKC",
    "French drain quote Oklahoma City",
    "gutter guard estimate Oklahoma City",
    "commercial gutter quote OKC",
    "Rain Tamer contact",
  ],
  description:
    "Request a free estimate from Rain Tamer. Seamless gutters, French drains, and gutter guards across the Oklahoma City metro.",
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Contact", url: `${SITE.url}/contact` },
        ])}
      />

      <PageHero
        eyebrow="Get an Estimate"
        title="Tell us about the project."
        description="Three steps, two minutes. We'll be in touch within one business day to schedule the walk-through and quote the work."
        secondary="Estimates are free, scheduled within the week, and walked through on site. You don't sign anything until the spec, color, and price are in writing. Most homes go from first call to install in under two weeks."
        meta={[
          { label: "Estimate", value: "Free" },
          { label: "Response", value: "1 day" },
          { label: "Pricing", value: "Fixed" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="border-b border-bone-50/10 py-20 lg:py-28">
        <Container size="full">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-8">
              <QuoteForm />
            </Reveal>
            <Reveal className="lg:col-span-4 space-y-3">
              <SideCard title="Call directly">
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="mt-4 flex items-center gap-3 font-display text-3xl font-medium tracking-[-0.03em] text-bone-50 hover:text-rain-400"
                >
                  <Phone className="size-5 text-rain-500" />
                  {SITE.phone}
                </a>
              </SideCard>

              <SideCard title="Hours">
                <div className="mt-4 space-y-2 text-[14.5px] text-bone-300">
                  <Row label="Monday – Friday" value="7:00a – 6:00p" />
                  <Row label="Saturday" value="8:00a – 2:00p" />
                  <Row label="Sunday" value="By appointment" />
                </div>
              </SideCard>

              <SideCard title="Service area">
                <div className="mt-4 flex items-start gap-3 text-[14.5px] leading-[1.55] text-bone-300">
                  <MapPin className="mt-0.5 size-4 flex-shrink-0 text-rain-500" />
                  <p>
                    OKC, Edmond, Norman, Moore, Mustang, Yukon, Bethany, Warr Acres, Nichols Hills, The Village, Tuttle, and the surrounding metro.
                  </p>
                </div>
              </SideCard>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

function SideCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-bone-50/10 bg-ink-950 p-7">
      <Eyebrow>{title}</Eyebrow>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex items-center justify-between border-b border-bone-50/8 pb-2 last:border-0">
      <span>{label}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone-500">{value}</span>
    </p>
  );
}
