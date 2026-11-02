import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Gutter Guards & Leaf Protection — Oklahoma City",
  keywords: [
    "gutter guards Oklahoma City",
    "gutter guards OKC",
    "leaf guards Oklahoma City",
    "leaf protection OKC",
    "micromesh gutter guards Oklahoma City",
    "stainless steel gutter guards OKC",
    "gutter screens Oklahoma City",
    "gutter protection Oklahoma City",
    "gutter covers OKC",
    "leaf filter alternative Oklahoma City",
    "reverse curve gutter guards OKC",
    "gutter guard installation Edmond",
    "gutter guards Norman",
    "gutter guards Nichols Hills",
    "lifetime no-clog gutter guards Oklahoma",
  ],
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
