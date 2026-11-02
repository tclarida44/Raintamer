import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Commercial Gutter Installation — Oklahoma City",
  keywords: [
    "commercial gutters Oklahoma City",
    "commercial gutter installation OKC",
    "commercial gutter systems Oklahoma",
    "steel commercial gutters Oklahoma City",
    "Kynar gutters Oklahoma City",
    "24 gauge steel gutters OKC",
    "26 gauge steel gutters OKC",
    "box gutters commercial OKC",
    "scupper collector boxes Oklahoma City",
    "commercial downspouts OKC",
    "commercial gutter contractor Oklahoma City",
    "flat roof gutter systems Oklahoma",
    "office building gutters OKC",
    "warehouse gutters Oklahoma City",
    "retail gutters Oklahoma City",
  ],
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
