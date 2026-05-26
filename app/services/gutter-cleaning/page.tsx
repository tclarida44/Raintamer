import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Gutter Cleaning in Oklahoma City",
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
