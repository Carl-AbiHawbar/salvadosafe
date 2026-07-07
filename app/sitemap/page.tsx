import Link from "next/link";
import { getCategories, getPublicProducts } from "@/lib/catalog";
import { getGrades } from "@/lib/grades";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sitemap",
  description: "Browse all pages, product categories, security grades, and products on Salvado Safe Lebanon.",
  path: "/sitemap",
});

const mainPages = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];

export default function SitemapPage() {
  const products = getPublicProducts();
  return (
    <div className="container-x py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-ink">Sitemap</h1>
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-muted">Main Pages</h2>
            <ul className="space-y-2.5">
              {mainPages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-[15px] text-ink-2 hover:text-brand">{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-muted">Product Categories</h2>
            <ul className="space-y-2.5">
              {getCategories().map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="text-[15px] text-ink-2 hover:text-brand">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-muted">High-Security Grades</h2>
            <ul className="space-y-2.5">
              {getGrades().map((g) => (
                <li key={g.slug}>
                  <Link href={`/grade/${g.slug}`} className="text-[15px] text-ink-2 hover:text-brand">{g.h1}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2">
            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-muted">Products ({products.length})</h2>
            <ul className="columns-1 gap-x-8 space-y-2.5 sm:columns-2 lg:columns-3">
              {products.map((p) => (
                <li key={p.slug} className="break-inside-avoid">
                  <Link href={`/product/${p.slug}`} className="text-[15px] text-ink-2 hover:text-brand">{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
