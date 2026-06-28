import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading, TrustStrip } from "@/components/sections";
import { CategoryCard, ProductCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { getFeaturedCategories, getSecondaryCategories, getProduct, getPublicProducts, getTotalProducts, getCategories, categoryCount, categorySubs } from "@/lib/catalog";
import { getGrades } from "@/lib/grades";
import { GradeCard } from "@/components/grade-card";
import { ProductBanner } from "@/components/product-banner";
import { ProductCatalog } from "@/components/product-catalog";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Products, Premium Safes, Vault Doors and Security Solutions",
  description:
    "Explore Salvado's range of high-security safes, fire-rated safes, vault doors, secure rooms, camouflage safes, luxury safes, and cash-handling solutions in Lebanon.",
};

const protectCards = [
  { title: "Jewelry and Watches", text: "For watches, jewelry, collectibles, and private valuables.", slug: "luxury-safes-watch-storage" },
  { title: "Documents and Files", text: "For contracts, passports, records, cash, and important documents requiring fire protection.", slug: "fire-resistant-safes" },
  { title: "High-Value Assets", text: "For serious protection needs in homes, businesses, jewelers, institutions, and private offices.", slug: "high-security-safes" },
  { title: "Secure Rooms", text: "For vault doors, private rooms, institutional storage, and high-security projects.", slug: "vault-doors-vault-rooms" },
  { title: "Cash Handling", text: "For retailers, offices, exchange businesses, and companies handling cash.", slug: "cash-handling-solutions" },
  { title: "Discreet Storage", text: "For concealed storage in homes, offices, and private spaces.", slug: "concealed-camouflage-safes" },
];

// Confirmed selection: Grade V page, 2-hour fire-rated, vault door, luxury safe, money counter
const selectedSlugs = ["s-59", "vault-doors", "custom-luxury-safe", "plus-p30-money-counter"];

export default function ProductsPage() {
  const selected = selectedSlugs.map((s) => getProduct(s)).filter(Boolean);
  const fallback = getPublicProducts().slice(0, 4);
  const selectedProducts = (selected.length ? selected : fallback) as NonNullable<ReturnType<typeof getProduct>>[];
  const featuredGrade = getGrades().find((g) => g.slug === "grade-v");
  const publicProducts = getPublicProducts();
  const catalogCategories = getCategories().map((c) => ({
    slug: c.slug,
    name: c.name,
    count: categoryCount(c.slug),
    subs: categorySubs(c.slug).map((label) => ({
      label,
      count:
        c.slug === "high-security-safes"
          ? 1
          : publicProducts.filter((p) => p.category === c.slug && p.sub === label).length,
    })),
  }));

  return (
    <>
      <ProductBanner
        eyebrow="Premium Security Solutions"
        title="Safes and Security Solutions in Lebanon"
        subtitle="Explore Salvado's range of high-security safes, fire-resistant safes, vault doors, smart safes, luxury safes, hotel safes, gun safes, money counters, and secure storage solutions — for homes, businesses, hotels, institutions, and private clients."
        quoteMessage="Hi Salvado, I'd like a quote for a security product."
      />

      <TrustStrip />

      {/* Choose what to protect */}
      <section className="bg-white">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Start Here"
              title="Choose What You Need to Protect"
              text="Browse Salvado solutions by the asset, environment, or security requirement you want to secure."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {protectCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 60}>
                <Link
                  href={`/category/${card.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft"
                >
                  <h3 className="font-display text-xl font-bold text-ink">{card.title}</h3>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-2">{card.text}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Browse categories */}
      <section className="bg-surface">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow={`${getTotalProducts()} Products`}
              title="Browse Product Categories"
              text="View Salvado's main product categories, compare available options, and contact our team for pricing, availability, and technical guidance."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getFeaturedCategories().map((c, i) => (
              <Reveal key={c.slug} delay={i * 50}>
                <CategoryCard category={c} premium />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <p className="mb-6 text-center text-[13px] font-bold uppercase tracking-[0.15em] text-muted">
              More Categories
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {getSecondaryCategories().map((c, i) => (
                <Reveal key={c.slug} delay={i * 40}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-white px-5 py-4 transition-all hover:border-brand/40 hover:shadow-card"
                  >
                    <div>
                      <h3 className="text-[15px] font-bold text-ink group-hover:text-brand">{c.name}</h3>
                      <p className="mt-0.5 text-[13px] text-muted">{c.short}</p>
                    </div>
                    <ArrowIcon width={18} height={18} className="shrink-0 text-brand transition-transform group-hover:translate-x-1" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Selected solutions */}
      <section className="bg-white">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Selected Security Solutions"
              title="Frequently Requested Solutions"
              text="A focused selection of Salvado products frequently requested by private clients, businesses, institutions, and high-security projects."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
            {featuredGrade && (
              <Reveal delay={0}>
                <GradeCard grade={featuredGrade} />
              </Reveal>
            )}
            {selectedProducts.map((p, i) => (
              <Reveal key={p.slug} delay={(i + 1) * 50}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full catalogue */}
      <section id="full-catalog" className="scroll-mt-24 border-t border-line bg-surface">
        <div className="container-x py-16 md:py-20">
          <Reveal className="mb-10 max-w-2xl">
            <SectionHeading
              align="left"
              eyebrow="Full Catalogue"
              title="Browse All Products"
              text="Filter by category, series, or model. Already know what you need? Search in the hero or jump straight in below."
            />
          </Reveal>
          <ProductCatalog
            products={publicProducts}
            grades={getGrades()}
            categories={catalogCategories}
            totalCount={getTotalProducts()}
          />
        </div>
      </section>
    </>
  );
}
