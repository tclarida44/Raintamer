import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { GutterConfigurator } from "@/components/interactive/GutterConfigurator";

function SpecStat({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">{term}</dt>
      <dd className="num text-3xl text-bone-50 sm:text-4xl">{value}</dd>
    </div>
  );
}

export function ConfiguratorSection() {
  return (
    <section id="configurator" className="border-b border-bone-50/10 py-16 lg:py-24">
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
                Twenty-three baked-on painted colors and two premium metals, across five profiles. Match the gutter to the home, not the other way around. Most jobs ship in painted aluminum; solid copper and Galvalume Plus steel are available on request.
              </p>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-bone-300">
                Use the configurator to lock the profile and the color, then send the spec straight to your estimate. We&apos;ll bring matched samples on the walk-through.
              </p>
              <dl className="mt-8 grid max-w-xl grid-cols-3 gap-x-6 gap-y-4 border-t border-bone-50/10 pt-6">
                <SpecStat term="Painted colors" value="23" />
                <SpecStat term="Premium metals" value="2" />
                <SpecStat term="Profiles" value="5" />
              </dl>
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
