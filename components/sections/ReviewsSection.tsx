import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewCarousel } from "@/components/interactive/ReviewCarousel";
import { REVIEWS } from "@/lib/reviews";
import { SITE } from "@/lib/site";

/**
 * Reviews section. Carousel pull quote up top, secondary quote cards below
 * to give a sense of breadth, then a stats banner closing the section.
 */
export function ReviewsSection() {
  const secondary = REVIEWS.slice(1, 4);

  return (
    <section className="border-b border-bone-50/10 py-16 lg:py-24">
      <Container size="full">
        <SectionLabel number="05" label="Reviews" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>What customers say</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95]">
                The proof is in the install.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <Reveal>
              <p className="max-w-2xl text-[17px] leading-[1.6] text-bone-300">
                Most of our business comes from referrals and from neighbors who watched the install next door. Here&apos;s what they&apos;ve written about us, in their own words.
              </p>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-bone-300">
                We don&apos;t pay for reviews, we don&apos;t filter them, and we don&apos;t pick our favorites. Every quote on this page is from a real Rain Tamer customer.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16">
          <ReviewCarousel />
        </Reveal>

        {/* Secondary quote cards */}
        <div className="mt-20 grid gap-4 sm:grid-cols-3 lg:gap-6">
          {secondary.map((r, i) => (
            <Reveal key={r.id} delayMs={i * 90}>
              <article className="flex h-full flex-col border border-bone-50/10 bg-ink-950 p-7">
                <div className="flex items-center gap-1 text-rain-500" aria-label={`${r.rating} out of 5`}>
                  {Array.from({ length: r.rating }).map((_, idx) => (
                    <Star key={idx} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-5 flex-1 font-display text-[17px] leading-[1.45] tracking-[-0.01em] text-bone-50">
                  &ldquo;{shorten(r.quote, 180)}&rdquo;
                </p>
                <div className="mt-6 border-t border-bone-50/10 pt-4">
                  <p className="font-display text-[15px] font-medium text-bone-50">{r.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">
                    {r.neighborhood} · {r.service}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Stats banner */}
        <Reveal className="mt-12">
          <div className="grid grid-cols-2 gap-8 border-t border-bone-50/15 pt-8 sm:grid-cols-4">
            <StatItem value={`${SITE.stats.googleRating}`} suffix="★" label="Google rating" />
            <StatItem value={`${SITE.stats.googleReviewCount}+`} label="Reviews" />
            <StatItem value="98%" label="5-star ratings" />
            <StatItem value="1 day" label="Response time" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function shorten(s: string, max: number) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max).replace(/[\s,;:.]+\S*$/, "");
  return `${cut}…`;
}

function StatItem({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="num text-[clamp(2rem,4vw,3rem)] text-bone-50">
        {value}
        {suffix && <span className="text-rain-400">{suffix}</span>}
      </span>
      <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
        {label}
      </span>
    </div>
  );
}
