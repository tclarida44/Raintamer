import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { GutterConfigurator } from "@/components/interactive/GutterConfigurator";
import { Difference } from "@/components/sections/Difference";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Seamless Aluminum Gutters in Oklahoma City",
  description:
    "Seamless aluminum gutters formed on site, hand-mitered corners, internal hangers every two feet, 23 painted colors plus copper and Galvalume.",
};

export default function Page() {
  const service = getServiceBySlug("seamless-gutters")!;
  return (
    <>
      <JsonLd data={serviceSchema("seamless-gutters")} />
      <ServiceDetail service={service}>
        <section className="border-b border-bone-50/10 py-20 lg:py-32">
          <Container size="full">
            <SectionLabel number="02" label="Configurator" />
            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <Eyebrow>Pick a profile. Pick a color.</Eyebrow>
                <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.25rem,5vw,4rem)] leading-[0.95]">
                  Spec your gutter.
                </h2>
              </Reveal>
              <Reveal className="lg:col-span-7 lg:pt-4">
                <p className="max-w-xl text-[17px] leading-[1.55] text-bone-300">
                  Twenty-three painted colors and two premium metals across five profiles. Send your spec straight to your estimate.
                </p>
              </Reveal>
            </div>
            <Reveal className="mt-16">
              <GutterConfigurator id="configurator" />
            </Reveal>
          </Container>
        </section>
        <Difference />
      </ServiceDetail>
    </>
  );
}
