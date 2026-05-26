import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { getPostSlugs, readPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = readPost(slug);
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        url: `${SITE.url}/blog/${slug}`,
      },
    };
  } catch {
    return { title: "Post not found" };
  }
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-16 font-display text-4xl font-medium tracking-[-0.025em] text-bone-50" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-14 font-display text-3xl font-medium tracking-[-0.025em] text-bone-50" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-10 font-display text-2xl font-medium tracking-[-0.02em] text-bone-50" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-6 text-[17px] leading-[1.7] text-bone-200" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-6 list-disc space-y-2 pl-6 text-[17px] leading-[1.7] text-bone-200 marker:text-rain-500" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-6 list-decimal space-y-2 pl-6 text-[17px] leading-[1.7] text-bone-200 marker:text-bone-500" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-8 border-l-2 border-rain-500 pl-6 font-display text-2xl font-medium italic leading-[1.3] tracking-[-0.015em] text-bone-50"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded-[2px] bg-ink-800 px-1.5 py-0.5 font-mono text-sm text-rain-400" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-rain-400 underline underline-offset-4 hover:text-rain-500" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-bone-50" {...props} />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post: ReturnType<typeof readPost>;
  try {
    post = readPost(slug);
  } catch {
    notFound();
  }
  const url = `${SITE.url}/blog/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", url: SITE.url },
            { name: "Blog", url: `${SITE.url}/blog` },
            { name: post.title, url },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`${formatDate(post.date)} · ${post.readingMinutes} min read`}
        title={post.title}
        description={post.excerpt}
        secondary={`Written by ${post.author}. Field notes from the trucks, not the marketing team — the practical version of what we'd tell you in person on the walk-through.`}
        meta={[
          { label: "Published", value: formatDate(post.date) },
          { label: "Read time", value: `${post.readingMinutes} min` },
          { label: "Author", value: post.author },
        ]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      {post.coverImage && (
        <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-bone-50/10 lg:aspect-[24/9]">
          <Image
            src={post.coverImage}
            alt=""
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <Container size="narrow" className="py-20 lg:py-28">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bone-50/10 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <ShareLinks url={url} title={post.title} />
        </div>

        <article>
          <MDXRemote source={post.content} components={components} />
        </article>

        <div className="mt-20 border border-bone-50/10 bg-ink-950 p-10 sm:p-14">
          <Eyebrow>Ready to start?</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-[-0.025em] text-bone-50 sm:text-4xl">
            Get a free estimate.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-bone-300">
            We&apos;ll walk the property, write up a clear scope, and get you on the calendar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">Get an Estimate</Button>
            <Button href={`tel:${SITE.phoneTel}`} variant="outline">
              Call {SITE.phone}
            </Button>
          </div>
        </div>
      </Container>

      <FinalCTA />
    </>
  );
}
