"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Product, Category } from "@/lib/catalog-types";
import type { Grade } from "@/lib/grade-types";
import { SearchIcon } from "./icons";

type CatalogData = {
  products: Product[];
  categories: Pick<Category, "slug" | "name" | "short">[];
  grades: Pick<Grade, "slug" | "grade" | "h1" | "series" | "desc">[];
};

export function ProductBannerSearch({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [catalog, setCatalog] = useState<CatalogData | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((data: CatalogData) => setCatalog(data))
      .catch(() => setCatalog({ products: [], categories: [], grades: [] }));
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!catalog || q.length < 2) return { products: [], categories: [], grades: [] };

    const products = catalog.products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          (p.sub && p.sub.toLowerCase().includes(q))
      )
      .slice(0, 5);

    const categories = catalog.categories
      .filter((c) => c.name.toLowerCase().includes(q) || c.short.toLowerCase().includes(q))
      .slice(0, 3);

    const grades = catalog.grades
      .filter(
        (g) =>
          g.grade.toLowerCase().includes(q) ||
          g.series.toLowerCase().includes(q) ||
          g.h1.toLowerCase().includes(q) ||
          g.desc.toLowerCase().includes(q)
      )
      .slice(0, 3);

    return { products, categories, grades };
  }, [catalog, q]);

  const hasResults = results.products.length + results.categories.length + results.grades.length > 0;
  const showPanel = open && q.length >= 2;

  return (
    <div ref={wrapRef} className={`relative w-full ${className}`}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="flex items-center gap-2 rounded-full border border-white/20 bg-black/25 p-1.5 pl-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm sm:pl-4"
      >
        <SearchIcon width={18} height={18} className="shrink-0 text-white/55" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search safes, models, SKU..."
          aria-label="Search safes, models, SKU"
          className="min-w-0 flex-1 bg-transparent py-2 text-[14px] text-white outline-none placeholder:text-white/45 sm:text-[15px]"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-brand px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-brand-dark sm:px-5 sm:py-2.5 sm:text-[14px]"
        >
          Search
        </button>
      </form>

      {showPanel && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 max-h-[min(60vh,420px)] overflow-y-auto rounded-2xl border border-line bg-white shadow-soft">
          {!hasResults ? (
            <p className="px-4 py-6 text-center text-[14px] text-muted">No results for &ldquo;{query}&rdquo;</p>
          ) : (
            <div className="p-2">
              {results.grades.length > 0 && (
                <div className="mb-3">
                  <p className="mb-1.5 px-2 text-[11px] font-bold uppercase tracking-wider text-muted">Grades</p>
                  {results.grades.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/grade/${g.slug}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-2.5 hover:bg-brand-soft"
                    >
                      <p className="text-[14px] font-semibold text-ink">{g.h1}</p>
                      <p className="text-[12px] text-muted">{g.series}</p>
                    </Link>
                  ))}
                </div>
              )}
              {results.categories.length > 0 && (
                <div className="mb-3">
                  <p className="mb-1.5 px-2 text-[11px] font-bold uppercase tracking-wider text-muted">Categories</p>
                  {results.categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-[14px] font-medium text-ink hover:bg-brand-soft hover:text-brand"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
              {results.products.length > 0 && (
                <div>
                  <p className="mb-1.5 px-2 text-[11px] font-bold uppercase tracking-wider text-muted">Products</p>
                  {results.products.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/product/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-brand-soft"
                    >
                      {p.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt="" className="h-10 w-10 shrink-0 rounded-lg bg-surface object-contain" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-semibold text-ink">{p.name}</p>
                        {p.sub && <p className="text-[12px] text-muted">{p.sub}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
