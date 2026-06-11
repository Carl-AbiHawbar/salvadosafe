import Link from "next/link";
import type { Product, Category } from "@/lib/catalog";
import { categoryImage, categoryCount, getCategory } from "@/lib/catalog";
import { waLink } from "@/lib/site";
import { ArrowIcon, WhatsAppIcon } from "./icons";

export function ProductCard({ product }: { product: Product }) {
  const cat = getCategory(product.category);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-surface">
        {product.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-[12.5px] font-semibold text-muted">
            Photo on request
          </span>
        )}
        {cat && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand backdrop-blur">
            {cat.name}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[15px] font-semibold leading-snug text-ink">
          <Link href={`/product/${product.slug}`} className="hover:text-brand">
            {product.name}
          </Link>
        </h3>
        {product.desc && (
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">{product.desc}</p>
        )}
        <div className="mt-4 flex items-center gap-2 pt-3">
          <Link
            href={`/product/${product.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line px-3 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            View Details <ArrowIcon width={15} height={15} />
          </Link>
          <a
            href={waLink(`Hi Salvado, I'm interested in the ${product.name}. Can you share the price?`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp about ${product.name}`}
            className="inline-flex items-center justify-center rounded-full border border-line bg-white px-3 py-2 transition-colors hover:border-brand"
          >
            <WhatsAppIcon width={17} height={17} />
          </a>
        </div>
      </div>
    </article>
  );
}

export function CategoryCard({ category, premium = false }: { category: Category; premium?: boolean }) {
  const count = categoryCount(category.slug);
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft ${
        premium ? "" : ""
      }`}
    >
      <Link href={`/category/${category.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={categoryImage(category)}
            alt={category.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          {count > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-ink backdrop-blur">
              {count} products
            </span>
          )}
          <h3 className="absolute bottom-4 left-5 right-5 font-display text-xl font-bold text-white drop-shadow">
            {category.name}
          </h3>
        </div>
      </Link>
      <div className="p-5">
        <p className="text-[14px] leading-relaxed text-ink-2">{category.short}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            href={`/category/${category.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand bg-brand px-4 py-2 text-[13px] font-semibold !text-white transition-colors hover:bg-brand-dark [&_svg]:stroke-white"
          >
            View Category <ArrowIcon width={15} height={15} />
          </Link>
          <a
            href={waLink(`Hi Salvado, I'd like a recommendation for ${category.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            <WhatsAppIcon width={15} height={15} /> Recommendation
          </a>
        </div>
      </div>
    </article>
  );
}
