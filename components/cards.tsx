import Link from "next/link";
import type { Product, Category } from "@/lib/catalog";
import { categoryImage, categoryCount, getCategory } from "@/lib/catalog";
import { waLink } from "@/lib/site";
import { ArrowIcon, WhatsAppIcon } from "./icons";

function cardCategoryLabel(product: Product, cat: Category | undefined): string {
  if (product.sub) return product.sub;
  if (!cat) return "";
  const short: Record<string, string> = {
    "high-security-safes": "High Security",
    "fire-resistant-safes": "Fire Rated",
    "vault-doors-vault-rooms": "Vault Doors",
    "cash-handling-solutions": "Cash Handling",
    "concealed-camouflage-safes": "Concealed Safes",
    "luxury-safes-watch-storage": "Luxury Safes",
    "home-safes": "Home Safes",
    "smart-safes": "Smart Safes",
    "hotel-safes": "Hotel Safes",
    "responsible-firearm-storage": "Firearm Storage",
    "cash-boxes-key-cabinets": "Key & Cash Boxes",
  };
  if (short[cat.slug]) return short[cat.slug];
  const amp = cat.name.indexOf(" & ");
  if (amp > 0) return cat.name.slice(0, amp);
  return cat.name;
}

export function ProductCard({ product }: { product: Product }) {
  const cat = getCategory(product.category);
  const categoryLabel = cardCategoryLabel(product, cat);
  const href = `/product/${product.slug}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft">
      <Link href={href} className="absolute inset-0 z-[1] rounded-2xl" aria-label={`View ${product.name}`} />
      <div className="relative z-[2] block aspect-square overflow-hidden bg-surface">
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
      <div className="relative z-[2] flex flex-1 flex-col p-3 sm:p-4">
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
        <div className="relative z-[3] mt-auto flex flex-col gap-2 pt-3 sm:flex-row sm:items-center sm:gap-2">
          <span className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-line px-2.5 py-2 text-[12px] font-semibold text-ink transition-colors group-hover:border-brand group-hover:text-brand sm:flex-1 sm:px-3 sm:text-[13px]">
            View Details <ArrowIcon width={14} height={14} className="sm:h-[15px] sm:w-[15px]" />
          </span>
          <a
            href={waLink(`Hi Salvado, I'm interested in the ${product.name}. Can you share the price?`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp about ${product.name}`}
            className="relative z-[3] inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-2 text-[12px] font-semibold text-ink transition-colors hover:border-brand sm:w-auto sm:px-3"
          >
            <WhatsAppIcon width={16} height={16} className="sm:h-[17px] sm:w-[17px]" />
            <span className="sm:hidden">WhatsApp</span>
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
            className="h-full w-full object-contain p-5 transition-transform duration-700 group-hover:scale-[1.03] sm:p-7"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
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
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
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
