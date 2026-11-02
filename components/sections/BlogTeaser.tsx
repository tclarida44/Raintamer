import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BookOpen, Newspaper, Wrench } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

const TOPIC_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  maintenance: Wrench,
  gutters: Newspaper,
  okc: BookOpen,
  drainage: Wrench,
  design: BookOpen,
  "buying-guide": Newspaper,
  foundation: Wrench,
};

export function BlogTeaser() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;
  const tags = getAllTags();

  return (
    <section className="brand-ambient-soft border-b border-bone-50/10 py-16 lg:py-24">
      <Container size="full">
        <SectionLabel number="07" label="Blog" />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Field notes</Eyebrow>
            <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95]">
              From the trucks.
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-[1.55] text-bone-300">
              Practical pieces from the people doing the work: how often to clean gutters in Oklahoma, when a French drain is worth it, which gutter profile belongs on which home.
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-bone-300">
              Short reads from the install crews on how OKC weather actually treats your roof line. If you&apos;ve got a few minutes before the walk-through, these answer a lot of the questions people usually ask on site.
            </p>

            {/* Topics quick-jump */}
            <div className="mt-10">
              <Eyebrow>Browse by topic</Eyebrow>
              <ul className="mt-5 grid gap-2">
                {tags.map((t) => {
                  const Icon = TOPIC_ICONS[t] ?? BookOpen;
                  return (
                    <li key={t}>
                      <Link
                        href={`/blog?tag=${encodeURIComponent(t)}`}
                        className="group flex items-center justify-between gap-4 border-b border-bone-50/10 py-3 transition-colors hover:border-rain-500/40"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex size-7 items-center justify-center rounded-[3px] border border-rain-500/30 bg-rain-500/10 text-rain-400">
                            <Icon className="size-3.5" />
                          </span>
                          <span className="font-display text-[15px] font-medium text-bone-50 group-hover:text-rain-400">
                            {t}
                          </span>
                        </span>
                        <ArrowUpRight className="size-3.5 text-bone-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rain-400" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-[3px] border border-bone-50/15 px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-50 transition-colors hover:border-bone-50/40 hover:bg-bone-50/[0.03]"
              >
                All posts <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Recent</Eyebrow>
            </Reveal>
            <div className="mt-6 flex flex-col gap-10">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delayMs={i * 80}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group grid items-start gap-6 border-b border-bone-50/10 pb-10 last:border-0 last:pb-0 sm:grid-cols-[200px_1fr] lg:grid-cols-[260px_1fr] lg:gap-10"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden border border-bone-50/10">
                      {p.coverImage ? (
                        <Image
                          src={p.coverImage}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 260px, 200px"
                          quality={70}
                          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-ink-800" />
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
                          {formatDate(p.date)}
                        </span>
                        <span className="h-px w-6 bg-bone-50/15" />
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
                          {p.readingMinutes} min read
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-medium leading-[1.15] tracking-[-0.02em] text-bone-50 group-hover:text-rain-400 sm:text-3xl">
                        {p.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-[14.5px] leading-[1.55] text-bone-300">
                        {p.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400">
                        Read article <ArrowUpRight className="size-3.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
