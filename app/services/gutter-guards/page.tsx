import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Gutter Guards & Leaf Protection in Oklahoma City",
  description:
    "Stainless micromesh and reverse-curve gutter guards installed across OKC. Stop climbing the ladder. Start trusting the system.",
};

export default function Page() {
  const service = getServiceBySlug("gutter-guards")!;
  return (
    <>
      <JsonLd data={serviceSchema("gutter-guards")} />
      <ServiceDetail service={service} />
    </>
  );
}
