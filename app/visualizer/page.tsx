import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight, Palette, Ruler, Sparkles, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ColorStrip } from "@/components/sections/ColorStrip";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

// Dynamically load the ~800-line GutterConfigurator client component so
// it doesn't block the initial paint. Users see the hero + stats + rest
// of the page immediately; the interactive configurator streams in
// afterward without holding up first render.
const GutterConfigurator = dynamic(
  () =>
    import("@/components/interactive/GutterConfigurator").then((m) => ({
      default: m.GutterConfigurator,
    })),
  {
    loading: () => (
      <div className="relative aspect-[16/10] w-full animate-pulse rounded-[3px] border border-bone-50/10 bg-ink-950" />
    ),
  },
);

export const metadata: Metadata = {
  title: "Gutter Color & Profile Visualizer — Oklahoma City",
  description:
    "Pick a gutter profile, pick a color, see it live. 28 baked-enamel painted colors plus 5 premium metals (aluminum, copper, Galvalume, Zinc, steel) across K-style, box, and half-round profiles. Spec your Rain Tamer install before the walk-through — free estimate in the OKC metro.",
  keywords: [
    "gutter visualizer Oklahoma City",
    "gutter color picker OKC",
    "seamless gutter colors Oklahoma City",
    "K-style gutter colors OKC",
    "half-round gutter colors Oklahoma City",
    "box gutter colors OKC",
    "copper gutter visualizer Oklahoma City",
    "aluminum gutter colors Oklahoma City",
    "Galvalume gutter colors OKC",
    "Zinc gutter colors OKC",
    "gutter profile selector Oklahoma City",
  ],
};

const HOW_IT_WORKS = [
  {
    icon: Ruler,
    title: "Pick a profile",
    body: "K-Style, Box, or Half-Round, in 5″ or 6″. Each profile has different capacity and a different look on the home.",
  },
  {
    icon: Palette,
    title: "Pick a color",
    body: "28 baked-enamel painted aluminum finishes plus 5 premium metals: aluminum, copper, Galvalume, Zinc, and Steel. Painted coil ships from Senox.",
  },
  {
    icon: Sparkles,
    title: "Preview the spec",
    body: "See the cross-section and a four-foot side elevation render in your chosen color. The preview updates instantly.",
  },
  {
    icon: Truck,
    title: "Send to estimate",
    body: "Hit 'Add to estimate' and the contact form opens pre-filled with your spec. We'll bring physical samples on the walk-through.",
  },
];

export default function VisualizerPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Visualizer", url: `${SITE.url}/visualizer` },
        ])}
      />

      <PageHero
        eyebrow="Gutter Visualizer"
        title="Spec your system."
        description="28 baked-enamel painted colors, 5 premium metals, five profiles. Configure your spec live, send it to your estimate, and we'll bring matched samples on the walk-through."
        secondary="Colors render with metallic sheen overlays so each finish reads as a real material chip. We still bring physical samples in a sleeve to the walk-through so you can hold one against your siding and trim in daylight."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Visualizer" }]}
      />

      {/* Inline stat pills — flowing prose, wraps naturally, no
          cross-column alignment. Every viewport size renders identical
          content flow. */}
      <section className="border-b border-bone-50/10 bg-ink-1000 py-6 lg:py-8">
        <Container size="full">
          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-center sm:justify-start sm:gap-x-4">
            <li className="inline-flex items-baseline gap-2 rounded-full border border-bone-50/15 bg-bone-50/[0.03] px-4 py-2">
              <span className="num text-xl leading-none text-bone-50 sm:text-2xl">28</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-400">Painted colors</span>
            </li>
            <li className="inline-flex items-baseline gap-2 rounded-full border border-bone-50/15 bg-bone-50/[0.03] px-4 py-2">
              <span className="num text-xl leading-none text-bone-50 sm:text-2xl">5</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-400">Premium metals</span>
            </li>
            <li className="inline-flex items-baseline gap-2 rounded-full border border-bone-50/15 bg-bone-50/[0.03] px-4 py-2">
              <span className="num text-xl leading-none text-bone-50 sm:text-2xl">5</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-400">Profile choices</span>
            </li>
          </ul>
        </Container>
      </section>

      {/* Configurator */}
      <section className="brand-ambient border-b border-bone-50/10 py-16 lg:py-24">
        <Container size="full">
          <SectionLabel number="01" label="Live configurator" />
          <Reveal className="mt-10">
            <GutterConfigurator id="configurator" />
          </Reveal>
        </Container>
      </section>

      {/* How to read this */}
      <section className="brand-ambient-soft border-b border-bone-50/10 py-16 lg:py-24">
        <Container size="full">
          <SectionLabel number="02" label="How it works" />

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Read the spec</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.95]">
                Four steps. Two minutes.
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-[1.55] text-bone-300">
                The visualizer is a real-time spec tool, not a marketing toy. What you pick is what we install. Save your spec, send it to your estimate, and we&apos;ll match it on site.
              </p>
              <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-bone-300">
                Colors render on screen with metallic sheen overlays so you get a sense of how each finish actually looks in light. We still bring physical chips on the walk-through.
              </p>
            </Reveal>

            <div className="lg:col-span-7">
              <ol className="border-t border-bone-50/15">
                {HOW_IT_WORKS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <Reveal key={s.title} delayMs={i * 80}>
                      <li className="grid grid-cols-[auto_1fr] gap-x-6 border-b border-bone-50/10 py-7 lg:py-9">
                        <div className="flex size-10 items-center justify-center rounded-[3px] border border-rain-500/30 bg-rain-500/10 text-rain-400">
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <div className="flex items-baseline gap-4">
                            <span className="font-mono text-xs tracking-[0.18em] text-rain-500">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-bone-50">
                              {s.title}
                            </h3>
                          </div>
                          <p className="mt-3 max-w-2xl text-[15px] leading-[1.6] text-bone-300">{s.body}</p>
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

      {/* Full color library */}
      <ColorStrip />

      {/* Spec notes */}
      <section className="border-b border-bone-50/10 py-16 lg:py-24">
        <Container size="full">
          <SectionLabel number="—" label="Notes on the render" />
          <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-12">
            <Reveal>
              <Eyebrow>Color accuracy</Eyebrow>
              <p className="mt-4 text-[15px] leading-[1.6] text-bone-200">
                Hex values are display approximations of the painted-aluminum finish. Real coil ships from Englert and Berger with proprietary paint formulas, and physical samples can shift slightly under different lighting. Always compare a chip in daylight at the install site.
              </p>
            </Reveal>
            <Reveal delayMs={80}>
              <Eyebrow>Five premium metals</Eyebrow>
              <p className="mt-4 text-[15px] leading-[1.6] text-bone-200">
                Most jobs are installed in painted aluminum (coil from Senox), copper, Galvalume, Zinc, or Steel — all available upon request. Copper develops a patina over years of weather exposure. Galvalume and heavier-gauge steel are often specified on commercial and modern residential.
              </p>
            </Reveal>
            <Reveal delayMs={160}>
              <Eyebrow>Profile capacity</Eyebrow>
              <p className="mt-4 text-[15px] leading-[1.6] text-bone-200">
                Six-inch profiles hold roughly 40% more water than five-inch and use a 3×4 downspout instead of 2×3. On steeper roofs, larger homes, or homes with multiple valleys feeding a single run, the upsize pays for itself the first storm.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-bone-50/10 pt-6">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
              Need help reading the spec? Ask on the walk-through.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400 hover:text-rain-500"
            >
              Send your spec
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
