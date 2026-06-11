import Link from "next/link";
import { getCategories } from "@/lib/catalog";

export default function AdminCategoriesPage() {
  const categories = getCategories();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-white">Categories</h1>
      <p className="mt-2 text-[15px] text-white/60">{categories.length} categories — edit copy, FAQs, and buying guides.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/admin/categories/${c.slug}`}
            className="rounded-2xl border border-white/10 bg-[#14161a] p-5 transition-colors hover:border-brand/50"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-white">{c.name}</h2>
                <p className="mt-1 text-[13px] text-white/55">{c.short}</p>
              </div>
              {c.featured && (
                <span className="rounded-full bg-brand/20 px-2.5 py-1 text-[11px] font-bold text-brand">Featured</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
