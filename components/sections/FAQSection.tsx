"use client";

import { useState } from "react";
import { Phone, Mail, Plus, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ } from "@/lib/faq";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function FAQSection() {
  return (
    <section className="brand-ambient-soft border-b border-bone-50/10 py-16 lg:py-24">
      <Container size="full">
        <SectionLabel number="08" label="Questions" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Direct answers</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95]">
                What we get asked.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.55] text-bone-300">
                A decade of installs across the metro has taught us which questions every homeowner asks. The honest answers are here. If yours isn&apos;t, call us.
              </p>
            </Reveal>

            {/* Still have questions card */}
            <Reveal delayMs={120} className="mt-10">
              <div className="border border-bone-50/10 bg-ink-950 p-7">
                <Eyebrow>Still have questions?</Eyebrow>
                <p className="mt-4 text-[15px] leading-[1.55] text-bone-200">
                  We&apos;d rather you ask. Estimates are free, and a 5-minute call usually saves a week of guessing.
                </p>
                <ul className="mt-6 space-y-3">
                  <ContactRow icon={Phone} label="Call" value={SITE.phone} href={`tel:${SITE.phoneTel}`} />
                  <ContactRow icon={Mail} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
                  <ContactRow icon={MessageSquare} label="Estimate form" value="Send the spec" href="/contact" />
                </ul>
                <div className="mt-6 border-t border-bone-50/10 pt-4">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
                    Hours · Mon–Fri 7a–6p · Sat 8a–2p
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="border-t border-bone-50/15">
                {FAQ.map((item, i) => (
                  <FaqRow key={item.q} item={item} index={i} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        className="group flex items-center justify-between gap-4 border-b border-bone-50/8 pb-3 last:border-0 last:pb-0"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-[3px] border border-rain-500/30 bg-rain-500/10 text-rain-400">
            <Icon className="size-3.5" />
          </div>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
            {label}
          </span>
        </div>
        <span className="font-display text-[15px] font-medium text-bone-50 transition-colors group-hover:text-rain-400">
          {value}
        </span>
      </a>
    </li>
  );
}

function FaqRow({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-bone-50/10">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 py-7 text-left lg:py-8"
      >
        <div className="flex items-start gap-6">
          <span className="pt-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-xl font-medium tracking-[-0.02em] text-bone-50 sm:text-2xl">
            {item.q}
          </span>
        </div>
        <span
          className={cn(
            "mt-1 flex size-9 flex-shrink-0 items-center justify-center rounded-[3px] border border-bone-50/15 transition-all",
            open && "bg-rain-500 text-ink-1000 border-rain-500 rotate-45",
          )}
        >
          <Plus className="size-4" />
        </span>
      </button>
      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-300"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="pb-7 pl-[3.25rem] text-[15px] leading-[1.6] text-bone-300 lg:pb-8">{item.a}</p>
        </div>
      </div>
    </div>
  );
}
