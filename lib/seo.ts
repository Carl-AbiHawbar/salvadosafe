import type { Metadata } from "next";

export const SITE_URL = "https://www.salvadosafe.com";
export const SITE_NAME = "Salvado Safe";
export const DEFAULT_OG_IMAGE = "/images/brand/showroom-interior-2.jpg";
export const GEO = { latitude: 33.9033421, longitude: 35.5736211 };

export const DEFAULT_KEYWORDS = [
  "safe Lebanon",
  "safes Lebanon",
  "fireproof safe Lebanon",
  "fire rated safe Lebanon",
  "vault doors Lebanon",
  "vault Lebanon",
  "high security safe Lebanon",
  "home safe Lebanon",
  "luxury safes Lebanon",
  "gun safe Lebanon",
  "money counter Lebanon",
  "safe installation Lebanon",
  "Salvado Safe",
  "Salvado safes Zalka",
];

const CATEGORY_SEO: Record<string, { title: string; keywords: string[] }> = {
  "high-security-safes": {
    title: "High-Security Safes in Lebanon",
    keywords: ["high security safe Lebanon", "certified safe Lebanon", "Grade V safe Lebanon"],
  },
  "fire-resistant-safes": {
    title: "Fireproof Safes in Lebanon",
    keywords: ["fireproof safe Lebanon", "fire rated safe Lebanon", "fire resistant safe Lebanon"],
  },
  "vault-doors-vault-rooms": {
    title: "Vault Doors in Lebanon",
    keywords: ["vault doors Lebanon", "vault room Lebanon", "bank vault door Lebanon"],
  },
  "luxury-safes-watch-storage": {
    title: "Luxury Safes and Watch Storage in Lebanon",
    keywords: ["luxury safe Lebanon", "watch winder safe Lebanon", "jewelry safe Lebanon"],
  },
  "responsible-firearm-storage": {
    title: "Gun Safes in Lebanon",
    keywords: ["gun safe Lebanon", "rifle safe Lebanon", "pistol safe Lebanon"],
  },
  "cash-handling-solutions": {
    title: "Cash Handling Solutions in Lebanon",
    keywords: ["money counter Lebanon", "drop safe Lebanon", "cash handling Lebanon"],
  },
  "concealed-camouflage-safes": {
    title: "Concealed and Camouflage Safes in Lebanon",
    keywords: ["hidden safe Lebanon", "camouflage safe Lebanon", "concealed safe Lebanon"],
  },
  "home-office-safes": {
    title: "Home and Office Safes in Lebanon",
    keywords: ["home safe Lebanon", "office safe Lebanon", "document safe Lebanon"],
  },
  "hotel-safes": {
    title: "Hotel Safes in Lebanon",
    keywords: ["hotel safe Lebanon", "hospitality safe Lebanon"],
  },
  "key-cabinets": {
    title: "Key Cabinets in Lebanon",
    keywords: ["key cabinet Lebanon", "key storage Lebanon"],
  },
  "smart-safes": {
    title: "Smart Safes in Lebanon",
    keywords: ["smart safe Lebanon", "biometric safe Lebanon"],
  },
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonicalUrl(path: string): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  return absoluteUrl(path);
}

export function absoluteImageUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  return absoluteUrl(path);
}

export type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  keywords?: string[];
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  keywords,
  noIndex,
}: PageMetaInput): Metadata {
  const url = canonicalUrl(path);
  const imageUrl = absoluteImageUrl(image ?? DEFAULT_OG_IMAGE);

  return {
    title,
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_LB",
      type: "website",
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export function categorySeoMeta(category: { slug: string; name: string; intro: string; image?: string | null }) {
  const seo = CATEGORY_SEO[category.slug];
  const title = seo?.title ?? `${category.name} in Lebanon`;
  const description =
    category.intro?.trim() ||
    `Browse ${category.name.toLowerCase()} from Salvado Safe, Lebanon's leading security showroom in Zalka.`;
  return pageMetadata({
    title,
    description,
    path: `/category/${category.slug}`,
    image: category.image,
    keywords: seo?.keywords ?? [`${category.name} Lebanon`, "Salvado Safe"],
  });
}

export function productSeoMeta(product: {
  name: string;
  desc?: string | null;
  image?: string | null;
  slug: string;
  category?: string;
}) {
  const description =
    product.desc?.trim() ||
    `${product.name} — premium certified security solution from Salvado Safe in Lebanon. Request a quote for delivery and installation.`;
  const keywords = [
    product.name,
    "safe Lebanon",
    product.category ? `${product.category.replace(/-/g, " ")} Lebanon` : "security safe Lebanon",
    "Salvado Safe",
  ];

  return pageMetadata({
    title: product.name,
    description,
    path: `/product/${product.slug}`,
    image: product.image,
    keywords,
  });
}

export function gradeSeoMeta(grade: { slug: string; h1: string; desc: string; seoFocus: string; image?: string | null }) {
  return pageMetadata({
    title: `${grade.h1} in Lebanon`,
    description: grade.desc,
    path: `/grade/${grade.slug}`,
    image: grade.image,
    keywords: grade.seoFocus.split(";").map((s) => s.trim()).filter(Boolean),
  });
}

export function breadcrumbSchema(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? canonicalUrl(item.path) : undefined,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function productSchema(product: {
  name: string;
  desc?: string | null;
  image?: string | null;
  slug: string;
  categoryName?: string;
}) {
  const image = absoluteImageUrl(product.image);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.desc || `${product.name} from Salvado Safe Lebanon.`,
    image: image ? [image] : undefined,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: product.categoryName,
    url: canonicalUrl(`/product/${product.slug}`),
    offers: {
      "@type": "Offer",
      url: canonicalUrl(`/product/${product.slug}`),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };
}

export function localBusinessSchema(input: {
  name: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  mapsUrl: string;
  ratingValue?: string;
  reviewCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Store"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: input.name,
    description: input.description,
    url: SITE_URL,
    email: input.email,
    telephone: input.phone,
    image: absoluteImageUrl(DEFAULT_OG_IMAGE),
    address: {
      "@type": "PostalAddress",
      streetAddress: "White Tower, Zalka",
      addressLocality: "Zalka",
      addressCountry: "LB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    areaServed: { "@type": "Country", name: "Lebanon" },
    sameAs: [input.mapsUrl],
    ...(input.ratingValue && input.reviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: input.ratingValue,
            reviewCount: input.reviewCount,
            bestRating: "5",
          },
        }
      : {}),
  };
}

export function organizationSchema(input: {
  name: string;
  description: string;
  email: string;
  phone: string;
  instagram: string;
  facebook: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: input.name,
    url: SITE_URL,
    logo: absoluteImageUrl("/images/brand/shield-logo.png"),
    description: input.description,
    email: input.email,
    telephone: input.phone,
    sameAs: [input.instagram, input.facebook],
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-LB",
  };
}
