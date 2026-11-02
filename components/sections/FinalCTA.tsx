import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";
import { CITIES } from "@/lib/cities";

export function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden border-b border-bone-50/10 py-28 lg:py-40">
      {/* Photo backdrop — real install at sunset, heavily dimmed */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <Image
          src="/images/raintamer/custom/custom-01.jpg"
          alt=""
          fill
          quality={70}
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />
      </div>
      {/* Atmospheric brand gradient over the photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(31,102,255,0.20), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(31,102,255,0.10), transparent 70%), linear-gradient(180deg, rgba(10,10,11,0.78) 0%, rgba(10,10,11,0.92) 100%)",
        }}
      />
      <Container size="full">
        <Reveal>
          <Eyebrow>Ready when you are</Eyebrow>
        </Reveal>

        <Reveal delayMs={120}>
          <h2 className="mt-8 max-w-6xl font-display font-medium tracking-[-0.045em] text-balance text-bone-50 text-[clamp(3rem,11vw,11rem)] leading-[0.88] [word-spacing:0.01em]">
            Let&apos;s <span className="-ml-[0.05em] mr-[0.05em] italic text-rain-400">Tame</span> the next storm.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-bone-50/10 pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-14">
          {/* Left column: call + email + manifesto blurb */}
          <Reveal className="lg:col-span-7">
            <Eyebrow>Call directly</Eyebrow>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="mt-4 block font-display text-[clamp(3rem,7.5vw,6.5rem)] font-medium tracking-[-0.04em] text-bone-50 transition-colors hover:text-rain-400"
            >
              {SITE.phone}
            </a>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-bone-300">
              Talk to the person who&apos;ll walk your property. Most calls are answered in two rings, and we book the walk-through right there.
            </p>

            <div className="mt-10">
              <ContactBlock
                icon={Calendar}
                label="Hours"
                primary="Mon–Fri 7a–6p"
                sub="Sat 8a–2p · Sun by appointment"
              />
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-14 items-center gap-2.5 rounded-[3px] bg-rain-500 px-7 text-[15px] font-medium tracking-tight text-ink-1000 transition-colors hover:bg-rain-400"
              >
                Get a Free Estimate
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex h-14 items-center gap-2.5 rounded-[3px] border border-bone-50/15 px-7 text-[15px] font-medium text-bone-50 transition-colors hover:border-bone-50/40 hover:bg-bone-50/[0.03]"
              >
                Browse services
              </Link>
            </div>
          </Reveal>

          {/* Right column: scheduling card */}
          <Reveal className="lg:col-span-5" delayMs={120}>
            <div className="relative h-full overflow-hidden border border-bone-50/10 bg-ink-950 p-7 lg:p-9">
              <div className="flex items-center gap-3">
                <span aria-hidden className="size-2 rounded-full bg-rain-500 [box-shadow:0_0_12px_rgba(31,102,255,0.7)]" />
                <Eyebrow>Now scheduling</Eyebrow>
              </div>
              <p className="mt-5 font-display text-3xl font-medium tracking-[-0.025em] text-bone-50 sm:text-4xl">
                Walk-throughs within the week.
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.6] text-bone-300">
                Booking estimates across the metro through next Friday. Tell us where you are and we&apos;ll route the closest crew lead.
              </p>

              <div className="mt-8 grid gap-2 border-t border-bone-50/10 pt-6">
                <Eyebrow>Cities open this week</Eyebrow>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[14px]">
                  {CITIES.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/service-areas/${c.slug}`}
                        className="group inline-flex items-center gap-2 text-bone-200 transition-colors hover:text-rain-400"
                      >
                        <MapPin className="size-3 text-bone-500 group-hover:text-rain-400" />
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-bone-50/10 pt-5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
                  Free · No obligation · Insured
                </p>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400 hover:text-rain-500"
                >
                  <Phone className="size-3.5" /> Call now
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ContactBlock({
  icon: Icon,
  label,
  primary,
  sub,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  primary: string;
  sub: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-[3px] border border-rain-500/30 bg-rain-500/10 text-rain-400">
          <Icon className="size-3.5" />
        </div>
        <Eyebrow>{label}</Eyebrow>
      </div>
      <p className="mt-4 font-display text-xl font-medium text-bone-50">{primary}</p>
      <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">{sub}</p>
    </>
  );
  if (href) {
    return (
      <a href={href} className="block transition-opacity hover:opacity-90">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}
