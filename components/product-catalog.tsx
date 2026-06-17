"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/catalog-types";
import type { Grade } from "@/lib/grade-types";
import { ProductCard } from "@/components/product-card";
import { GradeCard } from "@/components/grade-card";
import { ChevronDown } from "@/components/icons";

export type CatalogCategory = {
  slug: string;
  name: string;
  count: number;
  subs: { label: string; count: number }[];
};

type ProductCatalogProps = {
  products: Product[];
  grades: Grade[];
  categories: CatalogCategory[];
  totalCount: number;
};

type CatalogItem =
  | { kind: "grade"; key: string; name: string; grade: Grade }
  | { kind: "product"; key: string; name: string; product: Product };

type SortOption = "default" | "name-asc" | "name-desc";

const PAGE_SIZE = 12;

function sortItems(items: CatalogItem[], sort: SortOption): CatalogItem[] {
  const list = [...items];
  if (sort === "default") return list;
  list.sort((a, b) => {
    const cmp = a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });
    return sort === "name-asc" ? cmp : -cmp;
  });
  return list;
}

function activeFilterLabel(
  category: string,
  sub: string,
  categories: CatalogCategory[],
  totalCount: number
): string {
  if (category === "all") return `All Products (${totalCount})`;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return "All Products";
  if (sub !== "all") return `${cat.name} · ${sub}`;
  return cat.name;
}

export function ProductCatalog({ products, grades, categories, totalCount }: ProductCatalogProps) {
  const [category, setCategory] = useState("all");
  const [sub, setSub] = useState("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<SortOption>("default");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [category, sub, sort]);

  const filteredItems = useMemo(() => {
    const items: CatalogItem[] = [];

    const includeGrades = category === "all" || category === "high-security-safes";
    if (includeGrades) {
      for (const grade of grades) {
        if (category === "high-security-safes" && sub !== "all" && grade.grade !== sub) continue;
        items.push({ kind: "grade", key: grade.slug, name: grade.h1, grade });
      }
    }

    for (const product of products) {
      if (category !== "all" && product.category !== category) continue;
      if (sub !== "all" && product.sub !== sub) continue;
      items.push({ kind: "product", key: product.slug, name: product.name, product });
    }

    return sortItems(items, sort);
  }, [products, grades, category, sub, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filteredItems.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const filterLabel = activeFilterLabel(category, sub, categories, totalCount);

  function closeMobileFilters() {
    setMobileFiltersOpen(false);
  }

  function selectAll() {
    setCategory("all");
    setSub("all");
    closeMobileFilters();
  }

  function selectCategory(slug: string) {
    setCategory(slug);
    setSub("all");
    closeMobileFilters();
  }

  function selectSub(catSlug: string, label: string) {
    setCategory(catSlug);
    setSub(label);
    closeMobileFilters();
  }

  function toggleExpanded(slug: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  const sidebar = (
    <nav className="space-y-0.5" aria-label="Product categories">
      <CategoryRow
        active={category === "all" && sub === "all"}
        count={totalCount}
        onClick={selectAll}
      >
        All Products
      </CategoryRow>

      {categories.map((cat) => {
        const isActive = category === cat.slug && sub === "all";
        const hasSubs = cat.subs.length > 0;
        const isOpen = expanded.has(cat.slug) || (category === cat.slug && sub !== "all");

        return (
          <div key={cat.slug}>
            <CategoryRow
              active={isActive}
              count={cat.count}
              onClick={() => selectCategory(cat.slug)}
              expandable={hasSubs}
              expanded={isOpen}
              onToggle={() => toggleExpanded(cat.slug)}
            >
              {cat.name}
            </CategoryRow>

            {hasSubs && isOpen && (
              <div className="ml-3 mt-0.5 space-y-0.5 border-l border-line pl-2">
                {cat.subs.map((item) => (
                  <CategoryRow
                    key={item.label}
                    active={category === cat.slug && sub === item.label}
                    count={item.count}
                    onClick={() => selectSub(cat.slug, item.label)}
                    nested
                  >
                    {item.label}
                  </CategoryRow>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <section className="border-b border-line bg-white">
      <div className="container-x py-6 sm:py-8 md:py-10 lg:py-14">
        {/* Mobile / small tablet: collapsible category panel */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((open) => !open)}
            aria-expanded={mobileFiltersOpen}
            className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 text-left shadow-sm"
          >
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Product Categories</p>
              <p className="mt-1 truncate text-[14px] font-semibold text-ink">{filterLabel}</p>
            </div>
            <ChevronDown
              width={18}
              height={18}
              className={`shrink-0 text-brand transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`}
            />
          </button>

          {mobileFiltersOpen && (
            <div className="mt-3 max-h-[min(60vh,420px)] overflow-y-auto rounded-xl border border-line bg-surface p-3 sm:p-4">
              {sidebar}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-6 md:mt-0 md:flex-row md:items-start md:gap-8 lg:gap-10">
          {/* Tablet + desktop sidebar */}
          <aside className="hidden w-full shrink-0 md:block md:w-[248px] lg:w-[272px] xl:w-[292px]">
            <div className="rounded-2xl border border-line bg-surface p-4 lg:sticky lg:top-24 lg:p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Product Categories</h2>
              <div className="mt-3 lg:mt-4">{sidebar}</div>
            </div>
          </aside>

          {/* Main grid */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pb-5">
              <p className="text-[13px] text-ink-2 sm:text-[14px]">
                <span className="font-semibold text-ink">{filteredItems.length}</span> products
                {filteredItems.length > 0 && (
                  <>
                    {" "}
                    · page <span className="font-semibold text-ink">{safePage}</span> of{" "}
                    <span className="font-semibold text-ink">{totalPages}</span>
                  </>
                )}
              </p>

              <label className="flex w-full items-center gap-2 text-[13px] text-ink-2 sm:w-auto">
                <span className="shrink-0 font-medium">Sort:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="w-full min-w-0 rounded-lg border border-line bg-white px-3 py-2.5 text-[13px] font-medium text-ink outline-none transition-colors focus:border-brand sm:w-auto sm:min-w-[148px]"
                >
                  <option value="default">Default</option>
                  <option value="name-asc">Name (A–Z)</option>
                  <option value="name-desc">Name (Z–A)</option>
                </select>
              </label>
            </div>

            {pageItems.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-line bg-surface px-4 py-12 text-center sm:mt-8 sm:px-6 sm:py-14">
                <p className="text-[15px] font-semibold text-ink">No products in this category</p>
                <button
                  type="button"
                  onClick={selectAll}
                  className="mt-5 rounded-full border border-brand px-5 py-2.5 text-[13px] font-semibold text-brand transition-colors hover:bg-brand-soft"
                >
                  View all products
                </button>
              </div>
            ) : (
              <>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-2 xl:grid-cols-3">
                  {pageItems.map((item) =>
                    item.kind === "grade" ? (
                      <GradeCard key={item.key} grade={item.grade} />
                    ) : (
                      <ProductCard key={item.key} product={item.product} />
                    )
                  )}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex flex-col gap-2 sm:mt-10 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
                    <PaginationButton disabled={safePage <= 1} onClick={() => setPage(safePage - 1)} fullWidth>
                      Previous
                    </PaginationButton>
                    <p className="text-center text-[13px] text-muted sm:hidden">
                      Page {safePage} of {totalPages}
                    </p>
                    <PaginationButton disabled={safePage >= totalPages} onClick={() => setPage(safePage + 1)} fullWidth>
                      Next
                    </PaginationButton>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryRow({
  active,
  count,
  onClick,
  children,
  nested = false,
  expandable = false,
  expanded = false,
  onToggle,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
  nested?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div
      className={`grid grid-cols-[minmax(0,1fr)_2rem_1.625rem] items-center gap-x-1 rounded-lg px-2 py-2 transition-colors sm:px-2.5 sm:py-2.5 ${
        active ? "bg-brand-soft" : "hover:bg-white"
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className={`min-w-0 truncate text-left leading-snug ${
          nested ? "text-[12px] sm:text-[13px]" : "text-[13px] sm:text-[14px]"
        } ${active ? "font-semibold text-brand" : "font-medium text-ink-2 hover:text-brand"}`}
      >
        {children}
      </button>

      <span
        className={`text-right text-[11px] tabular-nums sm:text-[12px] ${
          active ? "font-semibold text-brand" : "font-medium text-muted"
        }`}
      >
        {count}
      </span>

      {expandable && onToggle ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse subcategories" : "Expand subcategories"}
          className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
            expanded ? "text-brand" : "text-muted hover:bg-white hover:text-brand"
          }`}
        >
          <ChevronDown width={14} height={14} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      ) : (
        <span className="h-7 w-7 shrink-0" aria-hidden />
      )}
    </div>
  );
}

function PaginationButton({
  children,
  onClick,
  disabled,
  fullWidth,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-ink-2 transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 ${
        fullWidth ? "w-full sm:w-auto" : ""
      }`}
    >
      {children}
    </button>
  );
}
