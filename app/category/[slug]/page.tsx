import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SectionHeading } from "@/components/sections";
import { ProductCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { FAQ } from "@/components/faq";
import { WhatsAppButton, QuoteButton, CallButton, CtaGroup } from "@/components/cta";
import { FinalCTA } from "@/components/sections";
import {
  getCategories,
  getCategory,
  productsInCategory,
  categoryImage,
  categorySubs,
} from "@/lib/catalog";
import { getGrades } from "@/lib/grades";
import { GradeCard } from "@/components/grade-card";
export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category" };
  return {
    title: `${category.name} in Lebanon`,
    description: category.intro,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = productsInCategory(slug);
  const subs = categorySubs(slug);
  const related = getCategories().filter((c) => c.slug !== slug).slice(0, 4);
  const isHighSecurity = slug === "high-security-safes";
  const grades = isHighSecurity ? getGrades() : [];
  const heroCountLabel = isHighSecurity
    ? `${grades.length} Certified Grade Levels`
    : `${items.length} Products Available`;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={categoryImage(category)} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </div>
        <div className="container-x relative py-20 md:py-28">
          <Reveal className="max-w-2xl">
            <nav className="mb-5 flex items-center gap-2 text-[13px] text-white/55">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-white">Products</Link>
              <span>/</span>
              <span className="text-white/85">{category.name}</span>
            </nav>
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">
              {heroCountLabel}
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-white md:text-[52px]">{category.name}</h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/80">{category.intro}</p>
            {subs.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {subs.map((s) => (
                  <span key={s} className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[12.5px] font-medium text-white/80">
                    {s}
                  </span>
                ))}
              </div>
            )}
            <CtaGroup className="mt-8">
              <WhatsAppButton label="WhatsApp for Price" message={`Hi Salvado, I'm interested in ${category.name}.`} variant="outlineLight" />
              <QuoteButton variant="primaryLight" />
              <CallButton variant="ghostLight" />
            </CtaGroup>
          </Reveal>
        </div>
      </section>

      {/* Product grid */}
      <section className="bg-white">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow={isHighSecurity ? "Certified Grades" : "The Collection"}
              title={isHighSecurity ? "Choose Your Security Grade" : category.name}
              text={
                isHighSecurity
                  ? "Each grade offers a certified level of burglary resistance. Open a grade page to compare all available sizes in one table — no separate page per model size."
                  : `Browse available ${category.name.toLowerCase()}. Contact our team for pricing, availability, and technical guidance.`
              }
            />
          </Reveal>
          {isHighSecurity ? (
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
              {grades.map((g, i) => (
                <Reveal key={g.slug} delay={(i % 5) * 50}>
                  <GradeCard grade={g} />
                </Reveal>
              ))}
            </div>
          ) : items.length > 0 ? (
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {items.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 4) * 50}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-line bg-surface p-10 text-center">
              <p className="text-[15px] text-ink-2">
                Products in this category are available on request. Contact us for current options and pricing.
              </p>
              <CtaGroup className="mt-6 justify-center">
                <WhatsAppButton label="WhatsApp for Options" message={`Hi Salvado, what options do you have for ${category.name}?`} />
                <QuoteButton />
              </CtaGroup>
            </div>
          )}
        </div>
      </section>

      {/* Buying guide */}
      <section className="bg-surface">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Buying Guide"
              title={`How to Choose ${category.name}`}
              text={category.protect}
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {category.buyingGuide.map((g, i) => (
              <Reveal key={g.title} delay={i * 70} className="rounded-2xl border border-line bg-white p-7 shadow-card">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[15px] font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-[16px] font-bold text-ink">{g.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{g.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related categories */}
      <section className="bg-white">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading eyebrow="Keep Exploring" title="Related Categories" />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((c, i) => (
              <Reveal key={c.slug} delay={i * 50}>
                <Link
                  href={`/category/${c.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={categoryImage(c)} alt={c.name} loading="lazy" className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03] sm:p-5" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <h3 className="absolute bottom-3 left-4 right-4 font-display text-[16px] font-bold text-white">{c.name}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Common Questions" />
          </Reveal>
          <div className="mt-12">
            <FAQ items={category.faqs} />
          </div>
        </div>
      </section>

      <FinalCTA
        eyebrow="Speak with a security expert"
        title={`Questions About ${category.name}?`}
        text="Contact Salvado for pricing, availability, technical specifications, delivery, and installation guidance."
        waMessage={`Hi Salvado, I have a question about ${category.name}.`}
      />
    </>
  );
}
