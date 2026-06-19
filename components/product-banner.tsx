import type { ReactNode } from "react";
import { ProductBannerSearch } from "./product-banner-search";
import { ArrowIcon } from "./icons";

type ProductBannerProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  breadcrumb?: ReactNode;
  catalogLink?: { label: string; href: string };
};

export function ProductBanner({ eyebrow, title, subtitle, breadcrumb, catalogLink }: ProductBannerProps) {
  return (
    <section className="product-banner relative overflow-hidden">
      <div className="product-banner-pattern absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand/80 to-transparent"
        aria-hidden
      />
      <div className="container-x relative py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16">
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between md:gap-8 lg:gap-10 xl:gap-14">
          <div className="min-w-0 max-w-2xl flex-1">
            {breadcrumb && <div className="mb-4">{breadcrumb}</div>}
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand/90 sm:text-[12px]">
              {eyebrow}
            </p>
            <h1 className="mt-2 font-display text-[2rem] font-bold leading-[1.08] text-white sm:mt-3 sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem]">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-white/75 sm:mt-4 sm:text-[15px] md:text-[16px]">
              {subtitle}
            </p>
            {catalogLink && (
              <a
                href={catalogLink.href}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-[13px] font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/15 md:mt-6 md:text-[14px]"
              >
                {catalogLink.label}
                <ArrowIcon width={15} height={15} className="stroke-white" />
              </a>
            )}
          </div>

          <div className="w-full md:max-w-[380px] md:shrink-0 lg:max-w-[420px] xl:w-[460px]">
            <ProductBannerSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
