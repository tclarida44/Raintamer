import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceMap } from "@/components/interactive/ServiceMap";

function SpecStat({ term, value, small }: { term: string; value: string; small?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">{term}</dt>
      <dd className={`num text-bone-50 ${small ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl"}`}>{value}</dd>
    </div>
  );
}

export function ServiceAreaSection() {
  return (
    <section className="border-b border-bone-50/10 py-16 lg:py-24">
      <Container size="full">
        <SectionLabel number="04" label="Service Area" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Eleven cities · One drive from the shop</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95]">
                We work the metro.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <Reveal>
              <p className="max-w-2xl text-[17px] leading-[1.6] text-bone-300">
                From Tuttle to Edmond, Norman to Yukon, our crews live and work in the neighborhoods they install in. We know the soils, the trees, and the storms. Most jobs are within a 30-minute drive of the shop, which is how we keep the schedule tight even in the busiest months.
              </p>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-bone-300">
                Click any city on the map to see how we work in that neighborhood, or jump straight to a dedicated service-area page for local details.
              </p>
              <dl className="mt-8 grid max-w-xl grid-cols-3 gap-x-6 gap-y-4 border-t border-bone-50/10 pt-6">
                <SpecStat term="Cities served" value="11" />
                <SpecStat term="Drive radius" value="30 mi" small />
                <SpecStat term="Scheduling" value="Same week" small />
              </dl>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16">
          <ServiceMap />
        </Reveal>
      </Container>
    </section>
  );
}
