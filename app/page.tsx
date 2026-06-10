import Link from "next/link";
import { HeroSlider } from "@/components/hero-slider";
import { TrustStrip, SectionHeading, FinalCTA } from "@/components/sections";
import { ReviewsCarousel } from "@/components/reviews";
import { CategoryCard, ProductCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { CTA, TextLink } from "@/components/cta";
import { featuredCategories, getProduct, products } from "@/lib/catalog";
import { ShieldIcon, CheckIcon, HeadsetIcon, ToolsIcon, ArrowIcon } from "@/components/icons";

const whyPoints = [
  { icon: ShieldIcon, title: "Specialized Security Experts", text: "A dedicated specialist focused exclusively on safes, vault doors, secure rooms, and protection — not a general retailer." },
  { icon: CheckIcon, title: "Certified & High-Quality Products", text: "Tested, certified, high-security and fire-rated safes alongside premium European security solutions." },
  { icon: ToolsIcon, title: "Trained Technical Team", text: "Consultation, delivery, installation, anchoring, maintenance, lock service, and technical support — handled in-house." },
  { icon: HeadsetIcon, title: "Premium After-Sales Support", text: "Long-term support, service coordination, and lock assistance well after your purchase or installation." },
];

const homeServices = [
  { img: "/images/brand/vdi.png", title: "Vault Door Installation", text: "End-to-end vault door delivery and professional installation, handled by our expert team." },
  { img: "/images/brand/maint.png", title: "Safe Repair & Maintenance", text: "Lock replacement, digital upgrades, combination changes, and preventative servicing." },
  { img: "/images/brand/cons.png", title: "Security Consultation", text: "Free, informed guidance to match the right safe or solution to your needs." },
  { img: "/images/brand/reloc.png", title: "Safe Installation & Relocation", text: "Careful transport, planning, and correct setup of your safe at any location." },
];

// A focused, premium selection of real products from the catalogue
const selectedSlugs = ["grade-v-high-security-safe", "sa2601", "gs-10", "s59e", "slx-29"];

export default function HomePage() {
  const selected = selectedSlugs.map((s) => getProduct(s)).filter(Boolean);
  const fallback = products.slice(0, 5);
  const selectedProducts = (selected.length ? selected : fallback) as NonNullable<ReturnType<typeof getProduct>>[];

  return (
    <>
      <HeroSlider />

      {/* Proof strip */}
      <section className="border-b border-line bg-ink">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5 text-center text-[13.5px] font-semibold text-white/85">
          <span>30,000+ Clients Served</span>
          <span className="text-brand">•</span>
          <span>40+ Years of Trust</span>
          <span className="text-brand">•</span>
          <span>Lebanon&apos;s Widest Safe Showroom</span>
          <span className="text-brand">•</span>
          <span>European-Standard Installation</span>
          <span className="text-brand">•</span>
          <span>Top-Rated Support</span>
        </div>
      </section>

      {/* Why trust Salvado */}
      <section className="bg-white">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Why Salvado"
              title="Why Homes, Businesses & Institutions Trust Salvado"
              text="Banks, jewelers, institutions, villas, and private clients rely on Salvado for certified protection, professional installation, discretion, and dependable after-sales support."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="rounded-2xl border border-line bg-white p-7 shadow-card transition-shadow hover:shadow-soft">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <p.icon />
                </div>
                <h3 className="mt-5 text-[16px] font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Explore security solutions */}
      <section className="bg-surface">
        <div className="container-x py-20 md:py-24">
          <Reveal className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end md:text-left">
            <SectionHeading
              align="left"
              eyebrow="Our Catalogue"
              title="Explore Our Security Solutions"
              text="Browse Salvado's premium range — from high-security and fire-rated safes to vault doors, luxury safes, and cash-handling solutions."
            />
            <CTA href="/products" variant="outline" className="shrink-0">
              View All Products <ArrowIcon width={16} height={16} />
            </CTA>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 60}>
                <CategoryCard category={c} />
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
              eyebrow="Selected Solutions"
              title="Frequently Requested by Our Clients"
              text="A focused selection of products requested by private clients, businesses, institutions, and high-security projects."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-5">
            {selectedProducts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 50}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Professional services */}
      <section className="bg-ink">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              light
              eyebrow="Technical Services"
              title="Professional Safe & Vault Services"
              text="Salvado supports clients before, during, and after the sale — consultation, delivery, installation, repair, maintenance, relocation, and after-sales support."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {homeServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 70} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="aspect-[4/3] overflow-hidden bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-[16px] font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-white/65">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTA href="/services" variant="primary">
              View All Services <ArrowIcon width={16} height={16} />
            </CTA>
          </div>
        </div>
      </section>

      {/* Showroom */}
      <section className="bg-white">
        <div className="container-x grid items-center gap-12 py-20 md:grid-cols-2 md:py-24">
          <Reveal className="order-2 md:order-1">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">Visit Us</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[40px]">
              Visit the Salvado Showroom
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-2">
              Browse the widest range of safes and security products live in our showroom. Compare high-security safes,
              fire-rated safes, vault doors, luxury safes, and watch storage — and receive professional guidance before
              you decide.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {["High-security safe displays", "Fire-resistant safe displays", "Vault door display", "Luxury safe & watch storage", "Cash-handling solutions", "Consultation area"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[14px] text-ink-2">
                  <CheckIcon width={16} height={16} className="shrink-0 text-brand" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTA href="https://www.google.com/maps/search/?api=1&query=Salvado+safes+Zalka" external variant="primary">
                Open in Google Maps
              </CTA>
              <CTA href="/contact" variant="ghost">
                Speak With Our Team
              </CTA>
            </div>
          </Reveal>
          <Reveal className="order-1 md:order-2">
            <div className="overflow-hidden rounded-3xl border border-line shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/brand/frontimg.webp" alt="Salvado showroom" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-surface">
        <div className="container-x py-20 md:py-24">
          <ReviewsCarousel />
        </div>
      </section>

      {/* Final lead */}
      <FinalCTA
        eyebrow="Talk to a security expert"
        title="Need Help Choosing the Right Safe or Security Solution?"
        text="Contact Salvado with your requirements, location, and intended use. Our team can recommend suitable options based on security level, size, product type, and installation conditions."
        waMessage="Hi Salvado, I'd like help choosing the right safe."
      />
    </>
  );
}
