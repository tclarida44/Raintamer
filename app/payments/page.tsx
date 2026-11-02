import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CreditCard,
  ShieldCheck,
  Lock,
  FileText,
  Phone,
  Mail,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pay Your Gutter Invoice Online — Oklahoma City",
  keywords: [
    "pay gutter invoice Oklahoma City",
    "Rain Tamer online payment",
    "pay invoice OKC gutter contractor",
    "Bryt Wired payment portal",
  ],
  description:
    "Pay your Rain Tamer invoice online. Secure payment portal hosted by Bryt Wired. Credit card or ACH accepted.",
  alternates: { canonical: `${SITE.url}/payments` },
};

const WHAT_YOU_NEED = [
  {
    icon: FileText,
    title: "Your invoice number",
    body: "Printed on the estimate or invoice we sent. Starts with a date or job reference.",
  },
  {
    icon: CreditCard,
    title: "A payment method",
    body: "Credit card, debit card, or ACH from a US bank account. Saved cards stay in the Bryt Wired portal, not on our site.",
  },
  {
    icon: ShieldCheck,
    title: "Two minutes",
    body: "Most payments finish in under two minutes. You'll get a receipt the moment the transaction clears.",
  },
];

export default function PaymentsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Payments", url: `${SITE.url}/payments` },
        ])}
      />

      <PageHero
        eyebrow="Online Payments"
        title="Pay your invoice."
        description="Settle a Rain Tamer invoice in a couple of minutes through our secure hosted portal. Card and ACH both accepted."
        meta={[
          { label: "Processor", value: "Bryt Wired" },
          { label: "Methods", value: "Card · ACH" },
          { label: "Receipt", value: "Instant" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Payments" }]}
      />

      {/* IMMEDIATE CTA BANNER — the moment the page loads, this is the focal point */}
      <section className="relative border-b border-bone-50/10 bg-ink-950 py-12 lg:py-16">
        {/* Brand-blue ambient glow that makes the button band feel "lit" */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(31,102,255,0.18), transparent 70%)",
          }}
        />
        <Container size="full" className="relative">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Eyebrow>
                <span className="text-rain-400">●</span>
                <span className="ml-2.5">Ready to pay?</span>
              </Eyebrow>
              <h2 className="mt-4 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2rem,5vw,3.5rem)] leading-[0.95]">
                Open the secure portal.
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.55] text-bone-300">
                One click. Opens in a new tab. Powered by Bryt Wired, our PCI-compliant payment partner — your card never touches our servers.
              </p>
            </div>

            <div className="lg:col-span-5 lg:pl-8">
              <a
                href={SITE.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-16 w-full items-center justify-between gap-3 rounded-[3px] bg-rain-500 px-7 text-base font-semibold tracking-tight text-ink-1000 shadow-[0_8px_40px_-8px_rgba(31,102,255,0.6)] transition-all hover:bg-rain-400 hover:shadow-[0_12px_50px_-6px_rgba(31,102,255,0.85)] sm:text-lg"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-ink-1000/15">
                    <CreditCard className="size-5" />
                  </span>
                  Pay Online Now
                </span>
                <ArrowUpRight className="size-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-300 transition-colors hover:text-bone-50"
                >
                  <Phone className="size-3.5 text-rain-400" />
                  Or call {SITE.phone}
                </a>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">
                  <Lock className="size-3" />
                  pay.brytewired.com
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why it's safe — trust signals without redundant CTAs */}
      <section className="brand-ambient border-b border-bone-50/10 py-20 lg:py-28">
        <Container size="full">
          <SectionLabel number="01" label="Why it's safe" />

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <Eyebrow>Secure hosted portal</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.95]">
                Your card never touches our servers.
              </h2>
              <p className="mt-6 max-w-xl text-[17px] leading-[1.55] text-bone-300">
                Rain Tamer doesn&apos;t see, transmit, or store your card information. The whole transaction (capture through receipt) happens inside the Bryt Wired portal, which is PCI-DSS certified for that exact job.
              </p>
              <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-bone-300">
                Have a question about the invoice itself? Call us at {SITE.phone}. We can resend the bill, walk you through the portal, or take payment over the phone if that&apos;s easier.
              </p>
            </Reveal>

            <Reveal delayMs={140} className="lg:col-span-5">
              <div className="border border-bone-50/10 bg-ink-950 p-7">
                <div className="flex size-12 items-center justify-center rounded-[3px] border border-rain-500/30 bg-rain-500/10 text-rain-400">
                  <Lock className="size-5" />
                </div>
                <h3 className="mt-6 font-display text-xl font-medium tracking-[-0.02em] text-bone-50 sm:text-2xl">
                  How the portal protects you.
                </h3>
                <ul className="mt-6 space-y-3 border-t border-bone-50/10 pt-5">
                  <TrustRow label="PCI-DSS compliant processor" />
                  <TrustRow label="256-bit TLS encryption in transit" />
                  <TrustRow label="Tokenized card storage if you opt in" />
                  <TrustRow label="Instant receipt on settle" />
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What you'll need */}
      <section className="border-b border-bone-50/10 py-20 lg:py-28">
        <Container size="full">
          <SectionLabel number="02" label="What you'll need" />

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Before you click</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.95]">
                Three things and you&apos;re paid.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.55] text-bone-300">
                Pull these up before you open the portal and the whole thing is a 90-second exercise.
              </p>
            </Reveal>

            <div className="lg:col-span-7">
              <ol className="border-t border-bone-50/15">
                {WHAT_YOU_NEED.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delayMs={i * 90}>
                      <li className="grid grid-cols-[auto_auto_1fr] items-start gap-x-6 border-b border-bone-50/10 py-7 lg:py-9">
                        <span className="font-mono text-sm tracking-[0.18em] text-rain-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex size-10 items-center justify-center rounded-[3px] border border-rain-500/30 bg-rain-500/10 text-rain-400">
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-bone-50">
                            {item.title}
                          </h3>
                          <p className="mt-3 max-w-2xl text-[15px] leading-[1.6] text-bone-300">
                            {item.body}
                          </p>
                        </div>
                      </li>
                    </Reveal>
                  );
                })}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* Help block */}
      <section className="brand-ambient-soft border-b border-bone-50/10 py-20 lg:py-28">
        <Container size="full">
          <SectionLabel number="03" label="Need help?" />

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Anything off?</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.95]">
                Call us. We answer.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.55] text-bone-300">
                Lost your invoice, the amount looks wrong, or the portal won&apos;t take your card? Pick up the phone. We&apos;ll resend the invoice, walk you through, or take payment over the phone — whichever is easier for you.
              </p>
            </Reveal>

            <Reveal delayMs={120} className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                <HelpCard
                  icon={Phone}
                  eyebrow="Call"
                  title={SITE.phone}
                  body="Mon–Fri 7a–6p · Sat 8a–2p · CT"
                  href={`tel:${SITE.phoneTel}`}
                />
              </div>

              <div className="mt-3 border border-bone-50/10 bg-ink-950 p-7">
                <Eyebrow>Need a fresh estimate instead?</Eyebrow>
                <h3 className="mt-4 font-display text-xl font-medium tracking-[-0.02em] text-bone-50 sm:text-2xl">
                  Start the estimate form.
                </h3>
                <p className="mt-3 max-w-xl text-[14.5px] leading-[1.6] text-bone-300">
                  If this is for new work and you don&apos;t have an invoice yet, send the spec through our estimate form and we&apos;ll walk the property.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400 hover:text-rain-500"
                >
                  Get a Free Estimate
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}

function TrustRow({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-3 border-b border-bone-50/8 pb-3 last:border-0 last:pb-0">
      <span className="mt-2 size-1.5 flex-shrink-0 rounded-full bg-rain-400" />
      <span className="text-[14px] leading-[1.55] text-bone-200">{label}</span>
    </li>
  );
}

function HelpCard({
  icon: Icon,
  eyebrow,
  title,
  body,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group block border border-bone-50/10 bg-ink-950 p-7 transition-colors hover:border-rain-500/40"
    >
      <div className="flex size-10 items-center justify-center rounded-[3px] border border-rain-500/30 bg-rain-500/10 text-rain-400">
        <Icon className="size-4" />
      </div>
      <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
        {eyebrow}
      </p>
      <p className="mt-2 font-display text-2xl font-medium tracking-[-0.025em] text-bone-50 transition-colors group-hover:text-rain-400">
        {title}
      </p>
      <p className="mt-3 text-[14px] leading-[1.55] text-bone-300">{body}</p>
    </a>
  );
}
