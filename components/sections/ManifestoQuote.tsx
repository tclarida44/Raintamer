import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Giant pull-quote section. Used to break up content-heavy passes with a
 * single declarative statement at scale. Pairs well between dense sections
 * because it reads as breathing room with substance.
 */
export function ManifestoQuote({
  eyebrow,
  quote,
  attribution,
  cta,
}: {
  eyebrow: string;
  quote: string;
  attribution?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="brand-ambient border-b border-bone-50/10 py-20 lg:py-28">
      <Container size="full">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-2">
            <Eyebrow>
              <span className="text-rain-400">●</span>
              <span className="ml-2.5">{eyebrow}</span>
            </Eyebrow>
            <div aria-hidden className="mt-6 hidden h-32 w-px bg-gradient-to-b from-rain-500/60 via-bone-50/15 to-transparent lg:block" />
          </div>

          <div className="lg:col-span-9">
            <p className="font-display text-balance text-[clamp(2rem,5.5vw,5rem)] font-medium leading-[1.05] tracking-[-0.035em] text-bone-50">
              <span className="text-rain-500">&ldquo;</span>
              {quote}
              <span className="text-rain-500">&rdquo;</span>
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-bone-50/10 pt-6">
              {attribution && (
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-300">
                  {attribution}
                </p>
              )}
              {cta && (
                <Link
                  href={cta.href}
                  className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400 hover:text-rain-500"
                >
                  {cta.label}
                  <ArrowUpRight className="size-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
