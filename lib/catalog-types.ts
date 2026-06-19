export type ProductSpecs = {
  external?: string;
  internal?: string;
  weight?: string;
  volume?: string;
  shelves?: string;
  bolts?: string;
  lock?: string;
  fireRating?: string;
  grade?: string;
  warranty?: string;
};

export type FaqItem = { q: string; a: string };

export type Product = {
  slug: string;
  name: string;
  desc: string;
  image: string | null;
  gallery?: string[];
  category: string;
  categories: string[];
  sub: string | null;
  isProject: boolean;
  colors?: string[];
  specs: ProductSpecs;
  features: string[];
  /** Product-specific FAQs. When set, shown instead of category FAQs. */
  faqs?: FaqItem[];
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  protect: string;
  image?: string;
  subs: string[];
  featured: boolean;
  buyingGuide: { title: string; body: string }[];
  faqs: FaqItem[];
};

const CATEGORY_SHORT: Record<string, string> = {
  "high-security-safes": "High Security",
  "fire-resistant-safes": "Fire Rated",
  "vault-doors-vault-rooms": "Vault Doors",
  "cash-handling-solutions": "Cash Handling",
  "concealed-camouflage-safes": "Concealed Safes",
  "luxury-safes-watch-storage": "Luxury Safes",
  "home-safes": "Home Safes",
  "smart-safes": "Smart Safes",
  "hotel-safes": "Hotel Safes",
  "responsible-firearm-storage": "Firearm Storage",
  "cash-boxes-key-cabinets": "Key & Cash Boxes",
};

export function productCategoryLabel(product: Product, categoryName?: string): string {
  if (product.sub) return product.sub;
  if (CATEGORY_SHORT[product.category]) return CATEGORY_SHORT[product.category];
  if (categoryName) {
    const amp = categoryName.indexOf(" & ");
    if (amp > 0) return categoryName.slice(0, amp);
    return categoryName;
  }
  return "";
}

/** Primary image first, then gallery URLs without duplicates. */
export function productImages(product: Pick<Product, "image" | "gallery">): string[] {
  const images: string[] = [];
  if (product.image) images.push(product.image);
  for (const src of product.gallery ?? []) {
    if (!images.includes(src)) images.push(src);
  }
  return images;
}

/**
 * Product page FAQs: use product-specific entries when provided,
 * otherwise fall back to the parent category FAQs.
 */
export function resolveProductFaqs(
  product: Pick<Product, "faqs">,
  category?: Pick<Category, "faqs"> | null
): FaqItem[] {
  const valid = (items: FaqItem[]) => items.filter((f) => f.q.trim() && f.a.trim());
  if (product.faqs && product.faqs.length > 0) return valid(product.faqs);
  if (category?.faqs?.length) return valid(category.faqs);
  return [];
}
