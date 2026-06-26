import Link from "next/link";
import type { Product } from "@/lib/catalog-types";
import { productCategoryLabel } from "@/lib/catalog-types";
import { ArrowIcon } from "./icons";

export function ProductCard({ product }: { product: Product }) {
  const categoryLabel = productCategoryLabel(product);
  const href = `/product/${product.slug}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft">
      <Link href={href} className="absolute inset-0 z-[1] rounded-2xl" aria-label={`View ${product.name}`} />
      <div className="pointer-events-none relative z-[2] block aspect-square overflow-hidden bg-surface">
        {product.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105 sm:p-5"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center px-3 text-center text-[11px] font-semibold leading-snug text-muted sm:text-[12.5px]">
            Photo on request
          </span>
        )}
        {categoryLabel && (
          <span className="absolute left-2 top-2 hidden max-w-[calc(100%-1rem)] truncate rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand backdrop-blur sm:inline-block">
            {categoryLabel}
          </span>
        )}
      </div>
      <div className="pointer-events-none relative z-[2] flex flex-1 flex-col p-3 sm:p-4">
        {categoryLabel && (
          <p className="mb-1.5 text-center text-[10px] font-bold uppercase leading-snug tracking-wide text-brand sm:hidden">
            {categoryLabel}
          </p>
        )}
        <h3 className="text-center text-[13px] font-semibold leading-snug text-ink transition-colors group-hover:text-brand sm:text-left sm:text-[15px]">
          {product.name}
        </h3>
        {product.desc && (
          <p className="mt-1.5 hidden text-center text-[12px] leading-relaxed text-muted sm:block sm:text-left sm:text-[13px] md:line-clamp-2">
            {product.desc}
          </p>
        )}
        <div className="mt-auto pt-3">
          <span className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-line px-2.5 py-2 text-[12px] font-semibold text-ink transition-colors group-hover:border-brand group-hover:text-brand sm:px-3 sm:text-[13px]">
            View Details <ArrowIcon width={14} height={14} className="sm:h-[15px] sm:w-[15px]" />
          </span>
        </div>
      </div>
    </article>
  );
}
