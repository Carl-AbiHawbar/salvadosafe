import type { Metadata } from "next";
import Link from "next/link";
import { TrustStrip, SectionHeading, FinalCTA } from "@/components/sections";
import { CategoryCard, ProductCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { WhatsAppButton, QuoteButton, MapButton } from "@/components/cta";
import { getFeaturedCategories, getSecondaryCategories, getProduct, getProducts, getTotalProducts } from "@/lib/catalog";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Products, Premium Safes, Vault Doors & Security Solutions",
  description:
    "Explore Salvado's range of high-security safes, fire-rated safes, vault doors, secure rooms, camouflage safes, luxury safes, and cash-handling solutions in Lebanon.",
};

const protectCards = [
  { title: "Jewelry & Watches", text: "For watches, jewelry, collectibles, and private valuables.", slug: "luxury-safes-watch-storage", cta: "View Luxury Solutions" },
  { title: "Documents & Files", text: "For contracts, passports, records, cash, and important documents requiring fire protection.", slug: "fire-resistant-safes", cta: "View Fire-Resistant Safes" },
  { title: "High-Value Assets", text: "For serious protection needs in homes, businesses, jewelers, institutions, and private offices.", slug: "high-security-safes", cta: "View High-Security Safes" },
  { title: "Secure Rooms", text: "For vault doors, private rooms, institutional storage, and high-security projects.", slug: "vault-doors-vault-rooms", cta: "View Vault Solutions" },
  { title: "Cash Handling", text: "For retailers, offices, exchange businesses, and companies handling cash.", slug: "cash-handling-solutions", cta: "View Cash Handling" },
  { title: "Discreet Storage", text: "For concealed storage in homes, offices, and private spaces.", slug: "concealed-camouflage-safes", cta: "View Concealed Safes" },
];

// Confirmed selection: Grade V, 2-hour fire-rated, vault door, luxury safe, money counter
const selectedSlugs = ["ak-8le", "s-59", "vault-doors", "custom-luxury-safe", "plus-p30-money-counter"];

export default function ProductsPage() {
  const selected = selectedSlugs.map((s) => getProduct(s)).filter(Boolean);
  const fallback = getProducts().slice(0, 5);
  const selectedProducts = (selected.length ? selected : fallback) as NonNullable<ReturnType<typeof getProduct>>[];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brand/81b4439950502d0e2237beec.jpg" alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </div>
        <div className="container-x relative py-24 md:py-32">
          <Reveal className="max-w-2xl">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">Premium Security Catalogue</p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-white md:text-[52px]">
              A Premium Collection of Safes, Vault Doors &amp; Security Solutions in Lebanon
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/80">
              Explore Salvado&apos;s range of high-security safes, fire-rated safes, vault doors, secure rooms, camouflage
              safes, luxury safes, and cash-handling solutions for homes, businesses, hotels, institutions, and private
              clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton label="WhatsApp for Recommendation" message="Hi Salvado, I'd like a product recommendation." variant="outlineLight" />
              <QuoteButton variant="primaryLight" />
              <MapButton variant="ghostLight" />
            </div>
          </Reveal>
        </div>
      </section>

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
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand">
                    {card.cta} <ArrowIcon width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
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
            {selectedProducts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 50}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Not sure */}
      <FinalCTA
        eyebrow="Not sure what to choose?"
        title="Need Help Choosing the Right Safe or Security Solution?"
        text="Contact Salvado with your requirements, location, and intended use. Our team can recommend suitable options based on security level, size, product type, and installation conditions."
        waMessage="Hi Salvado, I'm not sure which safe to choose, can you help?"
      />
    </>
  );
}
