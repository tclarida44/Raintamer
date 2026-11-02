import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gutter Installation Photos & Project Gallery",
  description:
    "See recent Rain Tamer gutter installs across the Oklahoma City metro: seamless K-style, copper half-round, box profiles, commercial gutter systems, French drains, gutter guards, and rain chains. Photos from real jobs in Edmond, Norman, Moore, Yukon, Nichols Hills, and Oklahoma City.",
  keywords: [
    "gutter installation photos Oklahoma City",
    "seamless gutter gallery OKC",
    "copper gutter installation photos Oklahoma City",
    "gutter installation before and after Oklahoma City",
    "commercial gutter photos Oklahoma City",
    "French drain installation photos OKC",
    "Rain Tamer projects Oklahoma City",
    "residential gutter examples Oklahoma City",
  ],
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Gallery", url: `${SITE.url}/gallery` },
        ])}
      />
      <PageHero
        eyebrow="Gallery"
        title="Selected work."
        description="A look at recent installs from across the metro. Filter by service to see specifically what we install in your category, or click any tile to see the scope behind it."
        secondary="Every project here notes the location, the service performed, and the call we made on profile, color, and drainage. Where photography permits, we'll add before/after pairs as new shoots come in."
        meta={[
          { label: "Featured", value: "67" },
          { label: "Services", value: "4" },
          { label: "Coverage", value: "OKC metro" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <GalleryGrid />
      <FinalCTA />
    </>
  );
}
