import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Selected Rain Tamer installs from across the Oklahoma City metro: seamless gutters, copper half-round, French drains, and gutter guards.",
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
          { label: "Featured", value: "12" },
          { label: "Services", value: "5" },
          { label: "Cities", value: "9" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <GalleryGrid />
      <FinalCTA />
    </>
  );
}
