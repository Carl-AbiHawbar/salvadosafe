import Link from "next/link";
import { HeroSlider } from "@/components/hero-slider";
import { ShowroomCarousel } from "@/components/showroom-carousel";
import { TrustStrip, SectionHeading } from "@/components/sections";
import { ReviewsCarousel } from "@/components/reviews";
import { InstagramCarousel } from "@/components/instagram-carousel";
import { CategoryCard, ProductCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { getCategoriesBySlugs, getProduct } from "@/lib/catalog";
import { getGrade } from "@/lib/grades";
import { GradeCard } from "@/components/grade-card";
import { getPagesContent } from "@/lib/content";
import { getSite } from "@/lib/site-server";
import { ShieldIcon, CheckIcon } from "@/components/icons";

import { getIcon } from "@/lib/icon-map";

export default function HomePage() {
  const pages = getPagesContent();
  const catalogCategories = getCategoriesBySlugs(pages.home.catalogSection.slugs);
  const site = getSite();
  type SelectedItem =
    | { kind: "grade"; grade: NonNullable<ReturnType<typeof getGrade>> }
    | { kind: "product"; product: NonNullable<ReturnType<typeof getProduct>> };

  const selectedItems: SelectedItem[] = pages.home.selectedSection.slugs.flatMap((slug): SelectedItem[] => {
    const grade = getGrade(slug);
    if (grade) return [{ kind: "grade", grade }];
    const product = getProduct(slug);
    if (product) return [{ kind: "product", product }];
    return [];
  });

  return (
    <>
      <HeroSlider slides={pages.heroSlides} />

      {/* Proof strip */}
      <section className="border-b border-line bg-ink">
        <div className="container-x py-4 md:py-3">
          {/* Mobile: stacked */}
          <div className="flex flex-col items-center gap-2 text-center text-[12px] font-semibold leading-snug text-white/85 md:hidden">
            {pages.home.proofStrip.map((item) => (
              <span key={item} className="whitespace-nowrap">{item}</span>
            ))}
          </div>
          {/* Tablet + desktop: wrapped row on md, single row from xl */}
          <div className="hidden flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-[12px] font-semibold leading-snug text-white/85 md:flex xl:flex-nowrap xl:gap-x-7 xl:leading-none xl:text-[12.5px]">
            {pages.home.proofStrip.map((item, i) => (
              <span key={item} className="inline-flex items-center gap-x-4 xl:shrink-0 xl:gap-x-7">
                {i > 0 && <span className="hidden text-brand xl:inline" aria-hidden>•</span>}
                <span className="whitespace-nowrap">{item}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why trust Salvado */}
      <section className="bg-white">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow={pages.home.whySalvado.eyebrow}
              title={pages.home.whySalvado.title}
              text={pages.home.whySalvado.text}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pages.home.whySalvado.points.map((p, i) => {
              const Icon = getIcon(p.icon);
              return (
              <Reveal key={p.title} delay={i * 80} className="rounded-2xl border border-line bg-white p-7 text-center shadow-card transition-shadow hover:shadow-soft md:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand md:mx-0">
                  <Icon />
                </div>
                <h3 className="mt-5 text-[16px] font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.text}</p>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore security solutions */}
      <section className="bg-surface">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow={pages.home.catalogSection.eyebrow}
              title={pages.home.catalogSection.title}
              text={pages.home.catalogSection.text}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {catalogCategories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 60}>
                <CategoryCard category={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Showroom */}
      <section className="bg-white">
        <div className="container-x py-24 md:py-28">
          <Reveal className="max-w-3xl">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">{pages.home.showroom.eyebrow}</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[40px]">
              {pages.home.showroom.title}
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-2 md:text-[16px]">
              {pages.home.showroom.text}
            </p>
          </Reveal>

          <Reveal className="mt-10 md:mt-12">
            <ShowroomCarousel images={pages.home.showroom.images} />
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
            <Reveal delay={80}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {pages.home.showroom.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[14px] text-ink-2 md:text-[15px]">
                    <CheckIcon width={16} height={16} className="shrink-0 text-brand" /> {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Professional services */}
      <section className="bg-ink">
        <div className="container-x py-24 md:py-28">
          <Reveal>
            <SectionHeading
              light
              eyebrow={pages.home.servicesSection.eyebrow}
              title={pages.home.servicesSection.title}
              text={pages.home.servicesSection.text}
            />
          </Reveal>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {pages.home.servicesSection.cards.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 70}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5 sm:aspect-[5/3] md:aspect-[16/9]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${s.imgClass ?? "object-center"}`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
                </div>
                <div className="p-7 md:p-8">
                  <h3 className="text-[17px] font-bold text-white md:text-[18px]">{s.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-white/70 md:text-[15px]">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Selected solutions */}
      <section className="bg-white">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow={pages.home.selectedSection.eyebrow}
              title={pages.home.selectedSection.title}
              text={pages.home.selectedSection.text}
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
            {selectedItems.map((item, i) => (
              <Reveal key={item.kind === "grade" ? item.grade.slug : item.product.slug} delay={i * 50}>
                {item.kind === "grade" ? (
                  <GradeCard grade={item.grade} />
                ) : (
                  <ProductCard product={item.product} />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-surface">
        <div className="container-x py-20 md:py-24">
          <ReviewsCarousel
            reviews={pages.reviews}
            ratingLabel={pages.reviewsMeta.ratingLabel}
            reviewCount={pages.reviewsMeta.reviewCount}
          />
          <div className="mt-16 border-t border-line pt-16 md:mt-20 md:pt-20">
            <InstagramCarousel
              posts={pages.instagramPosts}
              handle={pages.instagramMeta.handle}
              title={pages.instagramMeta.title}
              subtitle={pages.instagramMeta.subtitle}
              profileUrl={site.socials.instagram}
            />
          </div>
        </div>
      </section>
    </>
  );
}
