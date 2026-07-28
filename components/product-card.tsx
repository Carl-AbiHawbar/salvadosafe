import Link from "next/link";
import type { Product } from "@/lib/catalog-types";
import { productCategoryLabel, productImages } from "@/lib/catalog-types";

export function ProductCard({ product }: { product: Product }) {
  const categoryLabel = productCategoryLabel(product);
  const href = `/product/${product.slug}`;
  // Cross-fade to the next gallery shot on hover. Only products with a gallery
  // get the second image, so the rest of the grid loads exactly as before.
  const [image, hoverImage] = productImages(product);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft">
      <Link
        href={href}
        className="relative block aspect-square overflow-hidden bg-surface"
        aria-label={`View ${product.name}`}
      >
        {image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={product.name}
              loading="lazy"
              className={`h-full w-full object-contain p-3 transition-[scale,opacity] duration-500 group-hover:scale-105 sm:p-5${
                hoverImage ? " group-hover:opacity-0" : ""
              }`}
            />
            {hoverImage && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={hoverImage}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain p-3 opacity-0 transition-[scale,opacity] duration-500 group-hover:scale-105 group-hover:opacity-100 sm:p-5"
              />
            )}
          </>
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
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {categoryLabel && (
          <p className="mb-1.5 text-center text-[10px] font-bold uppercase leading-snug tracking-wide text-brand sm:hidden">
            {categoryLabel}
          </p>
        )}
        <Link href={href} className="block">
          <h3 className="text-center text-[13px] font-semibold leading-snug text-ink transition-colors group-hover:text-brand sm:text-left sm:text-[15px]">
            {product.name}
          </h3>
        </Link>
        {product.desc && (
          <p className="mt-1.5 hidden text-center text-[12px] leading-relaxed text-muted sm:block sm:text-left sm:text-[13px] md:line-clamp-2">
            {product.desc}
          </p>
        )}
      </div>
    </article>
  );
}
