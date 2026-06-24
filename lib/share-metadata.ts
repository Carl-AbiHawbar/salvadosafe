import type { Metadata } from "next";

const SITE_URL = "https://salvadosafe.com";

export function absoluteImageUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function productShareMetadata(product: {
  name: string;
  desc?: string | null;
  image?: string | null;
}): Metadata {
  const description =
    product.desc?.trim() ||
    `${product.name} — premium security solution from Salvado Safe in Lebanon.`;
  const imageUrl = absoluteImageUrl(product.image);

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      type: "website",
      images: imageUrl ? [{ url: imageUrl, alt: product.name, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
