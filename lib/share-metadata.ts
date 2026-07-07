import type { Metadata } from "next";
import { productSeoMeta } from "@/lib/seo";

export { absoluteImageUrl, SITE_URL } from "@/lib/seo";

export function productShareMetadata(product: {
  name: string;
  desc?: string | null;
  image?: string | null;
  slug: string;
  category?: string;
}): Metadata {
  return productSeoMeta(product);
}
