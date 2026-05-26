import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type MetaItem = {
  label: string;
  value: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional second paragraph that sits below the description for more substance. */
  secondary?: string;
  /** Optional 3–4 small data chips rendered as a hairline-divided grid below the description. */
  meta?: MetaItem[];
  breadcrumbs?: { label: string; href?: string }[];
  /** Optional hero photo rendered as a full-width band below the page header. */
  image?: string;
};

/**
 * Editorial page header. Title-first, with breadcrumbs, an expanded right column
 * (description + optional secondary paragraph + optional meta chip grid), and an
 * optional signature photo rendered as a full-bleed band below.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  secondary,
  meta,
  breadcrumbs,
  image,
}: Props) {
  return (
    <section className="border-b border-bone-50/10">
      <Container size="full" className="pt-32 pb-16 lg:pt-44 lg:pb-24">
        {breadcrumbs && (
          <nav className="mb-10 flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {b.href ? (
                  <Link href={b.href} className="hover:text-bone-50">{b.label}</Link>
                ) : (
                  <span className="text-bone-300">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span>/</span>}
              </span>
            ))}
          </nav>
        )}

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="mt-6 font-display font-medium tracking-[-0.045em] text-bone-50 text-balance text-[clamp(2.5rem,7vw,6rem)] leading-[0.92]">
              {title}
            </h1>
          </div>

          {(description || secondary || meta) && (
            <div className="lg:col-span-5 lg:pt-2">
              {description && (
                <p className="max-w-md text-[17px] leading-[1.55] text-bone-200">{description}</p>
              )}
              {secondary && (
                <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-bone-300">{secondary}</p>
              )}
              {meta && meta.length > 0 && (
                <dl className="mt-8 grid grid-cols-3 gap-x-4 gap-y-4 border-t border-bone-50/10 pt-6">
                  {meta.map((m) => (
                    <div key={m.label}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">
                        {m.label}
                      </dt>
                      <dd className="num mt-2 text-xl text-bone-50 sm:text-2xl">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          )}
        </div>
      </Container>

      {image && (
        <div className="relative aspect-[21/9] w-full overflow-hidden border-t border-bone-50/10 lg:aspect-[24/9]">
          <Image
            src={image}
            alt=""
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
    </section>
  );
}
