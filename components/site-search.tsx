"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Product, Category } from "@/lib/catalog";
import { SearchIcon, CloseIcon } from "./icons";

type CatalogData = {
  products: Product[];
  categories: Pick<Category, "slug" | "name" | "short">[];
};

export function SiteSearch({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState<CatalogData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || catalog) return;
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((data: CatalogData) => setCatalog(data))
      .catch(() => setCatalog({ products: [], categories: [] }));
  }, [open, catalog]);

  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!catalog || q.length < 2) return { products: [], categories: [] };
    const matchedProducts = catalog.products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          (p.sub && p.sub.toLowerCase().includes(q))
      )
      .slice(0, 6);
    const matchedCategories = catalog.categories
      .filter((c) => c.name.toLowerCase().includes(q) || c.short.toLowerCase().includes(q))
      .slice(0, 4);
    return { products: matchedProducts, categories: matchedCategories };
  }, [catalog, q]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.addEventListener("mousedown", onClick);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search products"
        className={`flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand ${className}`}
      >
        <SearchIcon width={16} height={16} /> Search
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 px-4 pt-24 backdrop-blur-sm">
          <div ref={panelRef} className="w-full max-w-xl rounded-2xl border border-line bg-white shadow-soft">
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <SearchIcon width={18} height={18} className="text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products or categories…"
                className="flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
              />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close search">
                <CloseIcon width={20} height={20} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-3">
              {q.length < 2 ? (
                <p className="px-2 py-6 text-center text-[14px] text-muted">Type at least 2 characters to search</p>
              ) : results.products.length === 0 && results.categories.length === 0 ? (
                <p className="px-2 py-6 text-center text-[14px] text-muted">No results for &ldquo;{query}&rdquo;</p>
              ) : (
                <>
                  {results.categories.length > 0 && (
                    <div className="mb-4">
                      <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-muted">Categories</p>
                      {results.categories.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/category/${c.slug}`}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-[14px] font-medium text-ink hover:bg-brand-soft hover:text-brand"
                        >
                          {c.name}
                          <span className="ml-2 text-[12px] text-muted">{c.short}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                  {results.products.length > 0 && (
                    <div>
                      <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-muted">Products</p>
                      {results.products.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/product/${p.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-brand-soft"
                        >
                          {p.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-contain bg-surface" />
                          )}
                          <div>
                            <p className="text-[14px] font-semibold text-ink">{p.name}</p>
                            {p.sub && <p className="text-[12px] text-muted">{p.sub}</p>}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
