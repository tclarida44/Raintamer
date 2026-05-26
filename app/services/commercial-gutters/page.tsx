import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Commercial Gutter Systems in Oklahoma City",
  description:
    "Commercial gutter systems for offices, warehouses, schools, and multifamily across the OKC metro. Heavier-gauge aluminum and Galvalume, oversized downspouts.",
};

export default function Page() {
  const service = getServiceBySlug("commercial-gutters")!;
  return (
    <>
      <JsonLd data={serviceSchema("commercial-gutters")} />
      <ServiceDetail service={service} />
    </>
  );
}
