import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "French Drain & Yard Drainage Installation — Oklahoma City",
  keywords: [
    "French drain installation Oklahoma City",
    "French drains OKC",
    "yard drainage Oklahoma City",
    "downspout drains OKC",
    "downspout extension Oklahoma City",
    "catch basin installation OKC",
    "surface drains Oklahoma City",
    "channel drain Oklahoma City",
    "pop-up emitter OKC",
    "yard drain OKC",
    "drainage contractor Oklahoma City",
    "wet yard fix OKC",
    "foundation drainage Oklahoma City",
    "PVC drain pipe installation OKC",
    "drainage system Oklahoma City",
    "French drains Edmond",
    "French drains Norman",
    "French drains Nichols Hills",
  ],
  description:
    "Engineered French drain systems for OKC homeowners. Site-graded slope, washed gravel envelope, daylight outlets. Move water away from the foundation.",
};

export default function Page() {
  const service = getServiceBySlug("french-drains")!;
  return (
    <>
      <JsonLd data={serviceSchema("french-drains")} />
      <ServiceDetail service={service} />
    </>
  );
}
