import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Gutter Cleaning & Maintenance — Oklahoma City",
  keywords: [
    "gutter cleaning Oklahoma City",
    "gutter cleaning OKC",
    "gutter cleaning service Oklahoma City",
    "gutter cleaning near me Oklahoma City",
    "downspout cleaning OKC",
    "gutter maintenance Oklahoma City",
    "gutter flush OKC",
    "gutter cleaning Edmond",
    "gutter cleaning Norman",
    "gutter cleaning Nichols Hills",
    "gutter cleaning Moore OK",
    "residential gutter cleaning Oklahoma City",
    "gutter inspection OKC",
    "twice yearly gutter cleaning Oklahoma City",
  ],
  description:
    "Hand-cleaned gutters and downspouts with bagged debris and a flow test on every run. Twice a year, in and out, no mess left behind.",
};

export default function Page() {
  const service = getServiceBySlug("gutter-cleaning")!;
  return (
    <>
      <JsonLd data={serviceSchema("gutter-cleaning")} />
      <ServiceDetail service={service} />
    </>
  );
}
