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
  title: "Seamless Gutter Installation — Oklahoma City",
  description:
    "Seamless gutter installation across Oklahoma City and the OKC metro since 2010. 5\" and 6\" K-style, box, and half-round profiles. 28 baked-enamel painted colors plus copper, Galvalume, Zinc, and Steel. Formed on site, hand-mitered corners, hidden hangers every 24 inches. Free estimates in Edmond, Norman, Moore, Yukon, Mustang.",
  keywords: [
    "seamless gutters Oklahoma City",
    "seamless gutter installation OKC",
    "5 inch gutters Oklahoma City",
    "6 inch gutters Oklahoma City",
    "K-style gutters OKC",
    "half-round gutters Oklahoma City",
    "box gutters Oklahoma City",
    "copper gutters Oklahoma City",
    "aluminum gutters Oklahoma City",
    "Galvalume gutters OKC",
    "Zinc gutters Oklahoma City",
    "steel gutters OKC",
    "residential gutter installation OKC",
    "gutter contractor Oklahoma City",
    "seamless gutters Edmond",
    "seamless gutters Norman",
    "gutter estimate Oklahoma City",
  ],
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
                  Spec your system.
                </h2>
              </Reveal>
              <Reveal className="lg:col-span-7 lg:pt-4">
                <p className="max-w-xl text-[17px] leading-[1.55] text-bone-300">
                  28 painted colors in a baked enamel finish, plus 5 premium metals across five profiles. Painted aluminum coil ships from Senox. Most jobs are installed in Aluminum, Copper, Galvalume, Zinc, or Steel — all available upon request.
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
