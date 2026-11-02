import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

type Profile = {
  name: string;
  size: string;
  blurb: string;
  image: string;
  alt: string;
  href: string;
};

const PROFILES: Profile[] = [
  {
    name: "K-Style",
    size: "5″ & 6″",
    blurb: "The workhorse residential profile. Sharp front face that reads like crown molding.",
    image: "/images/raintamer/k-style-5/k-style-5-01.jpg",
    alt: "K-style gutter on a modern stucco home.",
    href: "/services/seamless-gutters",
  },
  {
    name: "Box",
    size: "6″",
    blurb: "Flat-faced, modern. Disappears into contemporary fascia lines.",
    image: "/images/raintamer/box-6/box-6-01.jpg",
    alt: "Box gutter on a modern stucco home.",
    href: "/services/seamless-gutters",
  },
  {
    name: "Half-Round",
    size: "6″",
    blurb: "Curved profile rooted in traditional architecture. Often run in copper.",
    image: "/images/raintamer/half-round-6/half-round-6-01.jpg",
    alt: "Copper half-round gutter on a stucco home.",
    href: "/services/seamless-gutters",
  },
  {
    name: "Copper",
    size: "Heritage",
    blurb: "Hand-soldered, hand-finished. A lifetime install for homes worth it.",
    image: "/images/raintamer/custom/custom-02.jpg",
    alt: "Hand-soldered copper joinery detail.",
    href: "/visualizer",
  },
];

/**
 * ProfileStrip — 4 profile families showcased with real installs.
 * Sits between HowItWorks and ConfiguratorSection: visually previews
 * the choices users are about to interact with in the Visualizer.
 */
export function ProfileStrip() {
  return (
    <section className="border-b border-bone-50/10 py-20 lg:py-28">
      <Container size="full">
        <SectionLabel number="—" label="What you can pick" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Four profile families</Eyebrow>
            <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[0.92]">
              The four profiles
              <br />
              <span className="italic font-normal text-rain-400">we run.</span>
            </h2>
            <p className="mt-7 max-w-md text-[16.5px] leading-[1.55] text-bone-300">
              K-style, Box, and Half-Round in aluminum or steel — plus solid copper for heritage homes. Each profile is rolled on site to your exact roof lengths. Click any to see real installs.
            </p>
            <Link
              href="/visualizer"
              className="mt-8 inline-flex items-center gap-2 rounded-[3px] border border-rain-500/40 bg-rain-500/10 px-5 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-300 transition-colors hover:border-rain-500 hover:bg-rain-500/20 hover:text-bone-50"
            >
              Pick a combo in the Visualizer
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {PROFILES.map((p, i) => (
                <Reveal key={p.name} delayMs={i * 70}>
                  <Link
                    href={p.href}
                    className="group relative block aspect-[4/5] overflow-hidden border border-bone-50/12 transition-colors hover:border-rain-500/50"
                  >
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 24vw, 50vw"
                      quality={75}
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                    />
                    {/* Brand accent edge */}
                    <div
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-[3px] bg-rain-500/0 transition-colors duration-300 group-hover:bg-rain-500/80"
                    />
                    {/* Bottom scrim for label legibility */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink-1000/95 via-ink-1000/30 to-transparent"
                    />
                    {/* Top-right size chip */}
                    <span className="absolute right-3 top-3 rounded-[3px] border border-bone-50/15 bg-ink-1000/60 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-bone-100 backdrop-blur-sm">
                      {p.size}
                    </span>
                    {/* Bottom label block */}
                    <div className="absolute inset-x-4 bottom-4 lg:inset-x-5 lg:bottom-5">
                      <p className="font-display text-2xl font-medium tracking-[-0.02em] text-white lg:text-3xl">
                        {p.name}
                      </p>
                      <p className="mt-2 max-w-[220px] text-[12.5px] leading-[1.5] text-bone-200">
                        {p.blurb}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-rain-300 opacity-0 transition-opacity group-hover:opacity-100">
                        View installs
                        <ArrowUpRight className="size-3" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
