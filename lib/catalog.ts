import "server-only";
import { cache } from "react";
import { readJson } from "./storage";
export type { Product, ProductSpecs, Category } from "./catalog-types";
import type { Product, Category } from "./catalog-types";

const HIGH_SECURITY_CATEGORY = "high-security-safes";

export function isPublicProduct(p: Product): boolean {
  if (p.category !== HIGH_SECURITY_CATEGORY) return true;
  if (p.sub && (HIGH_SECURITY_GRADE_SUBS as readonly string[]).includes(p.sub)) return false;
  return true;
}

export const HIGH_SECURITY_GRADE_SUBS = ["Grade I", "Grade II", "Grade III", "Grade IV", "Grade V"] as const;

export const getProducts = cache((): Product[] => readJson<Product[]>("products.json"));
export const getPublicProducts = cache((): Product[] => getProducts().filter(isPublicProduct));
export const getCategories = cache((): Category[] => readJson<Category[]>("categories.json"));

export function getCategory(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug);
}

export function productsInCategory(slug: string): Product[] {
  return getPublicProducts().filter((p) => p.categories.includes(slug) || p.category === slug);
}

export function categoryImage(c: Category): string {
  if (c.image) return c.image;
  const first = getProducts().find((p) => p.category === c.slug && p.image)?.image;
  return first || "/images/brand/frontimg.webp";
}

export function categoryCount(slug: string): number {
  if (slug === HIGH_SECURITY_CATEGORY) return HIGH_SECURITY_GRADE_SUBS.length;
  return productsInCategory(slug).length;
}

export function categorySubs(slug: string): string[] {
  if (slug === "smart-safes") return [];
  if (slug === HIGH_SECURITY_CATEGORY) return [...HIGH_SECURITY_GRADE_SUBS];
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
  return getPublicProducts()
    .filter((x) => x.slug !== p.slug && x.category === p.category)
    .slice(0, limit);
}

export function getFeaturedCategories(): Category[] {
  return getCategories().filter((c) => c.featured);
}

export function getCategoriesBySlugs(slugs: string[]): Category[] {
  const bySlug = new Map(getCategories().map((c) => [c.slug, c]));
  return slugs.map((slug) => bySlug.get(slug)).filter((c): c is Category => Boolean(c));
}

export function getSecondaryCategories(): Category[] {
  return getCategories().filter((c) => !c.featured);
}

export function getTotalProducts(): number {
  return getPublicProducts().length + HIGH_SECURITY_GRADE_SUBS.length;
}
