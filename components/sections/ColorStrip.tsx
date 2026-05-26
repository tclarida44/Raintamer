import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { GUTTER_COLORS } from "@/lib/colors";

/**
 * Visual filler that doubles as material proof. Shows all 23 painted colors
 * + 2 premium metals as a long horizontal tile strip with the color name
 * overlaid. Breaks up the type-heavy editorial flow with pure color.
 */
export function ColorStrip() {
  const painted = GUTTER_COLORS.filter((c) => !c.premium);
  const premium = GUTTER_COLORS.filter((c) => c.premium);

  return (
    <section className="border-b border-bone-50/10 bg-ink-950 py-20 lg:py-28">
      <Container size="full">
        <SectionLabel number="—" label="Color Library" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Twenty-three painted · Two premium</Eyebrow>
            <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.25rem,5vw,4rem)] leading-[0.95]">
              Match the gutter to the home.
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-[1.55] text-bone-300">
              Baked-on painted aluminum holds its color for decades. Solid copper develops a patina you can&apos;t fake. Galvalume Plus steel for commercial-grade installs and modern builds.
            </p>
            <Link
              href="/services/seamless-gutters#configurator"
              className="mt-8 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400 hover:text-rain-500"
            >
              Configure a sample
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Painted aluminum · 23 colors</Eyebrow>
            </Reveal>

            <Reveal delayMs={80} className="mt-5">
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                {painted.map((c) => (
                  <li key={c.name}>
                    <Swatch hex={c.hex} name={c.name} />
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delayMs={140} className="mt-10">
              <Eyebrow>Premium metals · 2 finishes</Eyebrow>
            </Reveal>
            <Reveal delayMs={180} className="mt-5">
              <ul className="grid grid-cols-2 gap-2">
                {premium.map((c) => (
                  <li key={c.name}>
                    <Swatch hex={c.hex} name={c.name} premium />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Swatch({
  hex,
  name,
  premium,
}: {
  hex: string;
  name: string;
  premium?: boolean;
}) {
  return (
    <div
      className={`group relative h-20 overflow-hidden rounded-[3px] border ${
        premium ? "border-copper-500/40" : "border-bone-50/10"
      } transition-transform hover:scale-[1.02]`}
      style={{ background: hex }}
      title={name}
    >
      {premium && (
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/15 to-black/20 mix-blend-overlay" />
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-1000/85 via-ink-1000/40 to-transparent p-2 transition-opacity">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-bone-50">
          {name}
        </p>
      </div>
    </div>
  );
}
