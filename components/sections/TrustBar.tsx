import { Star, Shield, Award, Clock, Wrench, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

/**
 * Horizontal trust strip directly under the hero. Common pattern on every
 * top-converting contractor site we surveyed (Ned Stevens, Apex, K-Guard).
 * Surfaces credentials in one quick scan: rating, BBB-style accreditation,
 * licensure, warranty, scheduling speed, longevity.
 */
const ITEMS = [
  {
    icon: Star,
    title: `${SITE.stats.googleRating}★`,
    sub: `${SITE.stats.googleReviewCount}+ Google reviews`,
  },
  {
    icon: BadgeCheck,
    title: "BBB Accredited",
    sub: "Better Business Bureau",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    sub: "OK license · workers' comp",
  },
  {
    icon: Wrench,
    title: "Lifetime Warranty",
    sub: "Workmanship · original owner",
  },
  {
    icon: Clock,
    title: "Same-Week Scheduling",
    sub: "Most jobs installed in 1 day",
  },
  {
    icon: Award,
    title: `Since ${SITE.founded}`,
    sub: `${SITE.stats.yearsInBusiness}+ years protecting OKC`,
  },
];

export function TrustBar() {
  return (
    <section className="border-b border-bone-50/10 bg-ink-950">
      <Container size="full" className="py-8 lg:py-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-[3px] border border-rain-500/40 bg-rain-500/15 text-rain-400">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[15px] font-medium leading-tight tracking-[-0.01em] text-bone-50">
                    {item.title}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-500">
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
