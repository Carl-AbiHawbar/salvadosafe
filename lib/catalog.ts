import "server-only";
import { cache } from "react";
import { readJson } from "./storage";

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
  faqs: { q: string; a: string }[];
};

export const getProducts = cache((): Product[] => readJson<Product[]>("products.json"));
export const getCategories = cache((): Category[] => readJson<Category[]>("categories.json"));

export function getCategory(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug);
}

export function productsInCategory(slug: string): Product[] {
  return getProducts().filter((p) => p.categories.includes(slug) || p.category === slug);
}

export function categoryImage(c: Category): string {
  if (c.image) return c.image;
  const first = getProducts().find((p) => p.category === c.slug && p.image)?.image;
  return first || "/images/brand/frontimg.webp";
}

export function categoryCount(slug: string): number {
  return productsInCategory(slug).length;
}

export function categorySubs(slug: string): string[] {
  if (slug === "smart-safes") return [];
  const subs: string[] = [];
  for (const p of productsInCategory(slug)) {
    if (p.sub && !subs.includes(p.sub)) subs.push(p.sub);
  }
  return subs;
}

export function getProduct(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function similarProducts(p: Product, limit = 6): Product[] {
  return getProducts()
    .filter((x) => x.slug !== p.slug && x.category === p.category)
    .slice(0, limit);
}

export function getFeaturedCategories(): Category[] {
  return getCategories().filter((c) => c.featured);
}

export function getSecondaryCategories(): Category[] {
  return getCategories().filter((c) => !c.featured);
}

export function getTotalProducts(): number {
  return getProducts().length;
}
