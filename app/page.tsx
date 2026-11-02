import { Hero } from "@/components/sections/Hero";
import { IntroAnimation } from "@/components/interactive/IntroAnimation";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ConfiguratorSection } from "@/components/sections/ConfiguratorSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, installHowToSchema } from "@/lib/schema";
import { FAQ } from "@/lib/faq";

/**
 * Tightened homepage — 6 conversion-critical sections. Every block earns
 * its scroll. SEO schemas (FAQ + HowTo) still rendered as JsonLd even
 * though the matching visual sections were dropped, so AI Overviews and
 * voice search still see the structured Q&A and step-by-step content.
 *
 *   1. Hero               — headline, photo, trust, CTAs
 *   2. ServicesGrid       — what we install (photo cards)
 *   3. ConfiguratorSection — let me try before I buy
 *   4. ProjectsGrid       — real installs as proof
 *   5. ReviewsSection     — social proof
 *   6. FinalCTA           — last-chance estimate
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />
      <JsonLd data={installHowToSchema()} />

      <IntroAnimation />

      <Hero />
      <ServicesGrid />
      <ConfiguratorSection />
      <ProjectsGrid />
      <ReviewsSection />
      <FinalCTA />
    </>
  );
}
