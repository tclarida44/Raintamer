import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Stat = {
  value: string;
  label: string;
  sub?: string;
};

/**
 * Wide spec-strip banner. Sits between major sections to break up empty
 * vertical space with high-density data. Pure type + numbers, no photo.
 */
export function SpecBanner({
  eyebrow,
  headline,
  stats,
}: {
  eyebrow: string;
  headline: string;
  stats: Stat[];
}) {
  return (
    <section className="brand-ambient-soft border-b border-bone-50/10 bg-ink-950 py-12 lg:py-16">
      <Container size="full">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow>
              <span className="text-rain-400">●</span>
              <span className="ml-2.5">{eyebrow}</span>
            </Eyebrow>
            <p className="mt-4 font-display text-3xl font-medium tracking-[-0.025em] text-bone-50 sm:text-4xl">
              {headline}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-bone-50/10 pt-8 sm:grid-cols-4 lg:col-span-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">
                  {s.label}
                </dt>
                <dd className="num text-[clamp(2rem,3.5vw,3rem)] text-bone-50">{s.value}</dd>
                {s.sub && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-300">
                    {s.sub}
                  </p>
                )}
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
