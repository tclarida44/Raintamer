import { SITE } from "./site";
import { CITIES } from "./cities";
import { SERVICES } from "./services";

const baseUrl = SITE.url.replace(/\/$/, "");
const LOGO_URL = `${baseUrl}/rain-tamer-logo.png`;
const HERO_IMAGE = `${baseUrl}/images/raintamer/custom/custom-01.jpg`;

/**
 * Primary entity for the business. Multi-typed so search engines treat us
 * as a RoofingContractor (closest specific schema.org type for gutter work)
 * AND HomeAndConstructionBusiness AND LocalBusiness. Includes geo, hours,
 * priceRange, offer catalog, and topical knowsAbout — the high-impact fields
 * for 2026 local + AI search.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["RoofingContractor", "HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": `${baseUrl}#localbusiness`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: baseUrl,
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: `${SITE.founded}-01-01`,
    image: [HERO_IMAGE, `${baseUrl}/images/raintamer/trucks-crew/trucks-crew-06.jpg`],
    logo: LOGO_URL,
    priceRange: "$$",
    description:
      "Premium seamless gutter installation, French drains, gutter guards, gutter cleaning, and commercial gutter systems across the Oklahoma City metro since 2011.",
    slogan: "Built to tame Oklahoma weather.",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street || undefined,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.4676,
      longitude: -97.5164,
    },
    areaServed: CITIES.map((c) => ({
      "@type": "City",
      name: c.name,
      containedInPlace: { "@type": "State", name: "Oklahoma" },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Gutter & Drainage Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.tagline,
          url: `${baseUrl}/services/${s.slug}`,
          provider: { "@id": `${baseUrl}#localbusiness` },
        },
      })),
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
    paymentAccepted: ["Cash", "Check", "Credit Card", "Invoice"],
    currenciesAccepted: "USD",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.stats.googleRating,
      reviewCount: SITE.stats.googleReviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: Object.values(SITE.socials),
    knowsAbout: [
      "Seamless gutter installation",
      "K-style gutters",
      "Half-round gutters",
      "Box gutters",
      "Copper gutters",
      "5-inch gutters",
      "6-inch gutters",
      "French drains",
      "Yard drainage",
      "Downspout extensions",
      "Gutter guards",
      "Leaf protection",
      "Micromesh gutter guards",
      "Gutter cleaning",
      "Commercial gutters",
      "Heavy-gauge aluminum gutters",
      "Storm damage repair",
      "Oklahoma City gutter contractor",
    ],
    knowsLanguage: "en-US",
  };
}

/**
 * Sitelinks-search ready WebSite schema. Pairs with the LocalBusiness entity.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    url: baseUrl,
    name: SITE.name,
    description:
      "Seamless gutters, French drains, and gutter guards across the Oklahoma City metro.",
    publisher: { "@id": `${baseUrl}#localbusiness` },
    inLanguage: "en-US",
  };
}

/**
 * Organization entity for brand-level knowledge graph signals. Links logo,
 * social profiles, and contact channels.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 174,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "customer service",
        areaServed: "US-OK",
        availableLanguage: "en",
      },
    ],
    sameAs: Object.values(SITE.socials),
  };
}

/**
 * Per-service schema. Each service inherits the provider entity, declares
 * the service-area cities, and surfaces the offer for the homepage offer
 * catalog to point at.
 */
export function serviceSchema(slug: string) {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/services/${service.slug}#service`,
    serviceType: service.title,
    name: service.title,
    description: service.intro,
    url: `${baseUrl}/services/${service.slug}`,
    provider: { "@id": `${baseUrl}#localbusiness` },
    areaServed: CITIES.map((c) => ({ "@type": "City", name: c.name })),
    serviceOutput: service.shortTitle,
    audience: {
      "@type": "Audience",
      audienceType: service.eyebrow.toLowerCase().includes("commercial")
        ? "Commercial property owners and managers"
        : "Homeowners",
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/contact`,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      areaServed: CITIES.map((c) => c.name),
    },
  };
}

/**
 * FAQPage schema with Speakable specification — eligible for AI Overviews
 * and voice-search assistants in 2026.
 */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["[data-speakable]"],
    },
  };
}

/**
 * HowTo schema for the install process. Helps with "how does gutter
 * installation work" search intent and AI-generated step-by-step answers.
 */
export function installHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Rain Tamer installs seamless gutters",
    description:
      "From walk-through to fully installed system, the Rain Tamer install process is consistent on every job: measure on site, form aluminum from a coil, hang with internal supports every two feet.",
    totalTime: "PT1D",
    tool: [
      { "@type": "HowToTool", name: "Knudson brake machine" },
      { "@type": "HowToTool", name: "Internal hangers" },
      { "@type": "HowToTool", name: "Rivet gun" },
      { "@type": "HowToTool", name: "Polyurethane sealant" },
    ],
    supply: [
      { "@type": "HowToSupply", name: ".027 or .032 aluminum coil" },
      { "@type": "HowToSupply", name: "Downspouts and elbows" },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Measure & spec",
        text: "We walk every roof line, measure each run, and pick the profile and downspout size to match the actual water volume, not a default.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Form on site",
        text: "Aluminum is fed through a brake machine in your driveway and cut to the exact length of each run. No factory joints, no waste.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Hang & finish",
        text: "Internal hangers every 24 inches, hand-mitered corners riveted and sealed, outlet tubes at every drop. Photographed before we leave.",
      },
    ],
  };
}

/**
 * Standard breadcrumb chain.
 */
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
