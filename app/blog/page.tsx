import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BlogTagFilter } from "@/components/blog/BlogTagFilter";
import { getAllPosts, getAllTags, type BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gutter, Drainage & Storm Prep Blog — Oklahoma City",
  description: "Field notes from Rain Tamer on gutter installation, French drains, gutter guards, and Oklahoma City storm weather. Local tips from an OKC gutter contractor since 2010.",
  keywords: [
    "gutter tips Oklahoma City",
    "gutter installation blog OKC",
    "French drain tips Oklahoma",
    "storm prep Oklahoma City",
    "seamless gutter guide OKC",
    "gutter maintenance blog Oklahoma",
    "Rain Tamer blog",
  ],
};

export default function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Blog", url: `${SITE.url}/blog` },
        ])}
      />
      <PageHero
        eyebrow="Blog"
        title="Field notes."
        description="What we've learned installing thousands of feet of gutter and drain across the Oklahoma City metro. Practical pieces from the people doing the work."
        secondary="How often to clean gutters in this climate, when a French drain actually pays off, which profile belongs on which home. Field notes from the crews that run the jobs. If you read one before the walk-through, the conversation goes faster."
        meta={[
          { label: "Format", value: "Field notes" },
          { label: "By", value: "Installers" },
          { label: "Updated", value: "Quarterly" },
        ]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <BlogList searchParams={searchParams} />
      <FinalCTA />
    </>
  );
}

async function BlogList({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const all = getAllPosts();
  const tags = getAllTags();
  const filtered = tag ? all.filter((p) => p.tags.includes(tag)) : all;
  const featured = !tag ? filtered[0] : null;
  const rest = featured ? filtered.slice(1) : filtered;

  return (
    <>
      {/* Featured post (only when no filter is active) */}
      {featured && (
        <section className="brand-ambient-soft border-b border-bone-50/10 py-16 lg:py-24">
          <Container size="full">
            <SectionLabel number="01" label="Latest" />
            <Reveal className="mt-10">
              <Link href={`/blog/${featured.slug}`} className="group grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="relative aspect-[16/10] overflow-hidden border border-bone-50/10 lg:col-span-7 lg:aspect-[4/3]">
                  {featured.coverImage ? (
                    <Image
                      src={featured.coverImage}
                      alt=""
                      fill
                      priority
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      quality={80}
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-ink-800" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-1000/40 via-transparent to-transparent" />
                  <div className="absolute left-5 top-5">
                    <span className="inline-flex items-center gap-2 rounded-[3px] border border-rain-500 bg-rain-500 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-1000">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-5 lg:self-center">
                  <div className="flex flex-wrap items-center gap-2">
                    {featured.tags.slice(0, 3).map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                  <h2 className="mt-6 font-display text-3xl font-medium leading-[1.1] tracking-[-0.025em] text-bone-50 transition-colors group-hover:text-rain-400 sm:text-4xl lg:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="mt-5 max-w-xl text-[16px] leading-[1.6] text-bone-300">
                    {featured.excerpt}
                  </p>
                  <div className="mt-8 flex items-center gap-3 border-t border-bone-50/10 pt-5">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
                      {formatDate(featured.date)}
                    </span>
                    <span className="h-px w-6 bg-bone-50/15" />
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
                      {featured.readingMinutes} min read
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400">
                      Read article <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      {/* All / filtered grid */}
      <section className="border-b border-bone-50/10 py-20 lg:py-28">
        <Container size="full">
          <SectionLabel number={featured ? "02" : "01"} label={tag ? `Filtered · ${tag}` : "All articles"} />

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6 lg:gap-16">
            <Reveal>
              <Eyebrow>{tag ? "Filter applied" : "Browse"}</Eyebrow>
              <h2 className="mt-5 font-display font-medium tracking-[-0.04em] text-balance text-bone-50 text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95]">
                {tag ? `Posts tagged ${tag}.` : "Everything we've written."}
              </h2>
            </Reveal>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
              {rest.length} {rest.length === 1 ? "post" : "posts"}
            </span>
          </div>

          <div className="mt-10">
            <BlogTagFilter tags={tags} active={tag} />
          </div>

          {rest.length === 0 && filtered.length === 0 ? (
            <div className="mt-12 border border-bone-50/10 bg-ink-950 p-12 text-center">
              <Eyebrow>Nothing here yet</Eyebrow>
              <p className="mt-3 text-bone-300">No posts match this tag.</p>
            </div>
          ) : (
            <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
              {rest.map((p, i) => (
                <PostCard key={p.slug} post={p} delay={i * 60} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

function PostCard({ post, delay }: { post: BlogPost; delay: number }) {
  return (
    <Reveal delayMs={delay}>
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden border border-bone-50/10">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              quality={70}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-ink-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-1000/40 to-transparent" />
        </div>
        <div className="mt-6 flex items-center gap-3">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
            {formatDate(post.date)}
          </span>
          <span className="h-px w-6 bg-bone-50/15" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
            {post.readingMinutes} min
          </span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-medium leading-[1.15] tracking-[-0.02em] text-bone-50 group-hover:text-rain-400 sm:text-3xl">
          {post.title}
        </h3>
        <p className="mt-3 text-[14.5px] leading-[1.55] text-bone-300">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400">
          Read <ArrowUpRight className="size-3.5" />
        </span>
      </Link>
    </Reveal>
  );
}
