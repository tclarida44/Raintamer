import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { STANDARDS } from "@/lib/standards";

export function Difference() {
  return (
    <section className="brand-ambient-soft border-b border-bone-50/10 py-16 lg:py-24">
      <Container size="full">
        <SectionLabel number="02" label="Install Standards" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>The Rain Tamer Standard v2026</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95]">
                Six rules we never break.
              </h2>
              <p className="mt-8 max-w-md text-[17px] leading-[1.55] text-bone-300">
                The labor on a gutter install is mostly invisible once it's done. These are the details we never let slide, on every job, on every home.
              </p>

              <Reveal delayMs={120} className="mt-12 hidden lg:block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
                  <Image
                    src="/images/stock/installer-caulk.jpg"
                    alt="Detail of an install: sealant on a corner miter."
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    quality={75}
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <Reveal>
              <ol className="border-t border-bone-50/15">
                {STANDARDS.map((s) => (
                  <li
                    key={s.number}
                    className="grid grid-cols-[auto_1fr] gap-x-8 border-b border-bone-50/10 py-8 lg:py-10"
                  >
                    <span className="font-mono text-sm tracking-[0.18em] text-rain-500">{s.number}</span>
                    <div>
                      <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-bone-50 sm:text-3xl">
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-[15px] leading-[1.55] text-bone-300">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
