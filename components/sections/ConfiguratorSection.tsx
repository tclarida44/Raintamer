import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { GutterConfigurator } from "@/components/interactive/GutterConfigurator";

/**
 * Self-contained pill. Value + label live on ONE baseline inside a
 * rounded pill so there is no cross-column alignment anywhere. Each
 * pill wraps as a unit on narrow screens.
 */
function SpecPill({ term, value }: { term: string; value: string }) {
  return (
    <li className="inline-flex items-baseline gap-2 rounded-full border border-bone-50/15 bg-bone-50/[0.03] px-4 py-2">
      <span className="num text-xl leading-none text-bone-50 sm:text-2xl">{value}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-400">{term}</span>
    </li>
  );
}

export function ConfiguratorSection() {
  return (
    <section id="configurator" className="brand-section-blue border-b border-bone-50/10 py-16 lg:py-24">
      <Container size="full">
        <SectionLabel number="03" label="Configurator" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Pick a profile. Pick a color.</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95]">
                Spec your system.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <Reveal>
              <p className="max-w-2xl text-[17px] leading-[1.6] text-bone-300">
                28 painted colors in a baked enamel finish, plus 5 premium metals across five profiles. Painted aluminum coil ships from Senox. Most jobs are installed in Aluminum, Copper, Galvalume, Zinc, or Steel — all available upon request.
              </p>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-bone-300">
                Use the configurator to lock the profile and the color, then send the spec straight to your estimate. We&apos;ll bring matched samples on the walk-through.
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-3 border-t border-bone-50/10 pt-6">
                <SpecPill term="Painted colors" value="28" />
                <SpecPill term="Premium metals" value="5" />
                <SpecPill term="Profile choices" value="5" />
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16">
          <GutterConfigurator />
        </Reveal>
      </Container>
    </section>
  );
}
