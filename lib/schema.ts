import { SITE } from "./site";
import { CITIES } from "./cities";
import { SERVICES } from "./services";

const baseUrl = SITE.url.replace(/\/$/, "");

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}#localbusiness`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: baseUrl,
    telephone: SITE.phone,
    foundingDate: `${SITE.founded}-01-01`,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.country,
    },
    areaServed: CITIES.map((c) => ({
      "@type": "City",
      name: c.name,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.stats.googleRating,
      reviewCount: SITE.stats.googleReviewCount,
    },
    sameAs: Object.values(SITE.socials),
  };
}

export function serviceSchema(slug: string) {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: { "@id": `${baseUrl}#localbusiness` },
    areaServed: CITIES.map((c) => c.name),
    description: service.intro,
    url: `${baseUrl}/services/${service.slug}`,
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(post: {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  author?: string;
  coverImage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.excerpt,
    image: post.coverImage ? `${baseUrl}${post.coverImage}` : undefined,
    author: { "@type": "Organization", name: post.author || SITE.name },
    publisher: { "@id": `${baseUrl}#localbusiness` },
    mainEntityOfPage: `${baseUrl}/blog/${post.slug}`,
  };
}
