import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "French Drain Installation in Oklahoma City",
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
