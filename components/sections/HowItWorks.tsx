import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, FileText, Hammer, Camera, Ruler, Clipboard, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

function FeatureRow({
  icon: Icon,
  title,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
}) {
  return (
    <li className="flex items-start gap-4">
      <div className="mt-0.5 flex size-7 flex-shrink-0 items-center justify-center rounded-[3px] border border-rain-500/30 bg-rain-500/10 text-rain-400">
        <Icon className="size-3.5" />
      </div>
      <div>
        <p className="font-display text-[15px] font-medium leading-tight text-bone-50">{title}</p>
        <p className="mt-1 text-[13px] leading-[1.5] text-bone-300">{sub}</p>
      </div>
    </li>
  );
}

const STEPS = [
  {
    num: "01",
    icon: MapPin,
    title: "Walk the property",
    body: "We come out, walk the lot, the roof, the existing system, and the drainage path. Free, no obligation, and we won't try to upsell you.",
    duration: "30 minutes on-site",
  },
  {
    num: "02",
    icon: FileText,
    title: "Detailed estimate",
    body: "You get a clear scope: profile, color, hanger spacing, downspout sizing, drainage plan, and a fixed price. No surprises, no day-of changes.",
    duration: "Within 1 business day",
  },
  {
    num: "03",
    icon: Hammer,
    title: "Installed in a day",
    body: "The crew shows up on time, forms the aluminum on your driveway, hand-miters the corners, bags the debris, and walks the warranty with you before leaving.",
    duration: "Most homes: single day",
  },
];

export function HowItWorks() {
  return (
    <section className="brand-ambient-soft border-b border-bone-50/10 py-16 lg:py-24">
      <Container size="full">
        <SectionLabel number="02" label="How it works" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>From estimate to install</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95]">
                Three steps. No surprises.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.55] text-bone-300">
                We schedule estimates within a week and most installs land within two. Everything is in writing before a single rivet goes in.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400 hover:text-rain-500"
              >
                Schedule a walk-through
                <ArrowUpRight className="size-3.5" />
              </Link>
            </Reveal>

            {/* Feature card: what you actually get on the walk-through */}
            <Reveal delayMs={140} className="mt-10">
              <div className="relative overflow-hidden border border-bone-50/10 bg-ink-950">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/images/raintamer/custom/custom-03.jpg"
                    alt="Copper crown install in progress."
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    quality={75}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                </div>
                <div className="p-7">
                  <Eyebrow>What you get on the walk-through</Eyebrow>
                  <ul className="mt-5 space-y-3">
                    <FeatureRow icon={Ruler} title="Measurements" sub="Every roof run, valley, and downspout drop" />
                    <FeatureRow icon={Camera} title="Photos of problem areas" sub="Sagging runs, failed corners, drainage failures" />
                    <FeatureRow icon={Clipboard} title="Written scope + fixed price" sub="No day-of changes, no upsell" />
                  </ul>
                  <div className="mt-7 flex items-center justify-between border-t border-bone-50/10 pt-5">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
                      Free · No obligation
                    </span>
                    <a
                      href={`tel:${SITE.phoneTel}`}
                      className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400 hover:text-rain-500"
                    >
                      <Phone className="size-3.5" /> {SITE.phone}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-0 border-t border-bone-50/15">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.num} delayMs={i * 100}>
                    <div className="grid grid-cols-12 items-start gap-x-6 gap-y-4 border-b border-bone-50/10 py-8 lg:py-10">
                      <div className="col-span-12 sm:col-span-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm tracking-[0.18em] text-rain-500">
                            {s.num}
                          </span>
                          <div className="flex size-9 items-center justify-center rounded-[3px] border border-rain-500/30 bg-rain-500/10 text-rain-400">
                            <Icon className="size-4" />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 sm:col-span-10">
                        <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-bone-50 sm:text-3xl">
                          {s.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-[15px] leading-[1.6] text-bone-300">
                          {s.body}
                        </p>
                        <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
                          {s.duration}
                        </p>
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
  );
}
