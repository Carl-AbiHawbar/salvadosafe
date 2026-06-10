import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/catalog";

export const metadata: Metadata = { title: "Sitemap" };

const mainPages = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function SitemapPage() {
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
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="text-[15px] text-ink-2 hover:text-brand">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
