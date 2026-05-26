import { Hero } from "@/components/sections/Hero";
import { IntroAnimation } from "@/components/interactive/IntroAnimation";
import { TrustBar } from "@/components/sections/TrustBar";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ConfiguratorSection } from "@/components/sections/ConfiguratorSection";
import { ServiceAreaSection } from "@/components/sections/ServiceAreaSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";
import { FAQ } from "@/lib/faq";

/**
 * Homepage flow — researched against 2026 contractor + conversion-page best
 * practice. Every block answers one explicit question:
 *
 *   1. Hero               — what do you offer, what should I do?
 *   2. TrustBar           — can I trust you (at a glance)?
 *   3. ServicesGrid       — what specifically do you install?
 *   4. HowItWorks         — what happens if I call?
 *   5. ConfiguratorSection — let me try before I buy
 *   6. ProjectsGrid       — show me real work
 *   7. ServiceAreaSection — do you work where I live?
 *   8. ReviewsSection     — what do other customers say?
 *   9. FAQSection         — what about [my objection]?
 *  10. FinalCTA           — last chance, get the estimate
 *
 * Removed from earlier iteration: 3 × PhotoBreak, 2 × SpecBanner, 2 ×
 * ManifestoQuote, ColorStrip (moved to /visualizer), Marquee, Difference
 * (moved to /about), BlogTeaser (now lives at /blog).
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />

      <IntroAnimation />

      <Hero />
      <TrustBar />
      <ServicesGrid />
      <HowItWorks />
      <ConfiguratorSection />
      <ProjectsGrid />
      <ServiceAreaSection />
      <ReviewsSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
