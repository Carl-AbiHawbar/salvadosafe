import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SectionHeading } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { FAQ } from "@/components/faq";
import { GradeCard } from "@/components/grade-card";
import { GradeSpecTable } from "@/components/grade-spec-table";
import { ProductBanner } from "@/components/product-banner";
import { GetQuoteButton, CTA } from "@/components/cta";
import { CheckIcon, ShieldIcon, TruckIcon } from "@/components/icons";
import { getCategory } from "@/lib/catalog";
import { getGrade, getGrades } from "@/lib/grades";

export function generateStaticParams() {
  return getGrades().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const grade = getGrade(slug);
  if (!grade) return { title: "Grade" };
  return {
    title: `${grade.h1} in Lebanon`,
    description: grade.desc,
    keywords: grade.seoFocus.split(";").map((s) => s.trim()).filter(Boolean),
  };
}

export default async function GradePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const grade = getGrade(slug);
  if (!grade) notFound();

  const category = getCategory("high-security-safes");
  const otherGrades = getGrades().filter((g) => g.slug !== slug);

  const faqs = [
    {
      q: `How many ${grade.series} sizes are available?`,
      a: `${grade.models.length} confirmed ${grade.series} models are listed in the size comparison table on this page. Contact Salvado for availability and the best size for your space.`,
    },
    {
      q: `What does ${grade.grade} certification mean?`,
      a: `${grade.grade} reflects a certified level of burglary resistance under UNE EN-1143-1. Salvado can advise on insurance and institutional requirements for your use case.`,
    },
    {
      q: "Do you deliver and install high-security safes?",
      a: "Yes. Salvado provides professional delivery, placement, and anchoring according to product specifications and site conditions across Lebanon.",
    },
    ...(category ? category.faqs.slice(0, 1) : []),
  ];

  return (
    <>
      <ProductBanner
        eyebrow={grade.series}
        title={grade.h1}
        subtitle={grade.desc}
        breadcrumb={
          <nav className="flex flex-wrap items-center gap-2 text-[12px] text-white/55 sm:text-[13px]">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white">Products</Link>
            {category && (
              <>
                <span>/</span>
                <Link href={`/category/${category.slug}`} className="hover:text-white">{category.name}</Link>
              </>
            )}
            <span>/</span>
            <span className="text-white/85">{grade.grade}</span>
          </nav>
        }
      />

      <section className="bg-white">
        <div className="container-x grid items-start gap-10 py-12 md:grid-cols-2 md:py-16">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-line bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={grade.image} alt={grade.h1} className="aspect-square w-full object-contain p-8" />
            </div>
          </Reveal>

          <Reveal delay={80} className="md:sticky md:top-24">
            <div className="flex flex-wrap gap-2">
              {category && (
                <Link
                  href={`/category/${category.slug}`}
                  className="inline-block rounded-full bg-brand-soft px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand"
                >
                  {category.name}
                </Link>
              )}
              <span className="inline-block rounded-full border border-line px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
                {grade.series}
              </span>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-surface px-5 py-4">
              <p className="text-[13px] text-muted">Available sizes</p>
              <p className="text-[20px] font-bold text-ink">
                {grade.models.length} models — see comparison table below
              </p>
            </div>

            <GetQuoteButton
              className="mt-6"
              message={`Hi Salvado, I'd like a quote for ${grade.grade} high-security safes (${grade.series}).`}
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Size Comparison"
              title={`${grade.series} Model and Size Table`}
              text={`Compare external dimensions, internal capacity, weight, and configuration across all confirmed ${grade.grade} models. Contact Salvado for pricing and availability on the size that fits your space.`}
            />
          </Reveal>
          <Reveal delay={60} className="mt-10">
            <GradeSpecTable models={grade.models} />
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x grid gap-12 py-20 md:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">Certified Features</p>
            <h2 className="font-display text-3xl font-bold text-ink">Shared Technical Features</h2>
            <ul className="mt-5 space-y-3">
              {grade.technicalFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-ink-2">
                  <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-brand" /> {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">Series Overview</p>
            <h2 className="font-display text-3xl font-bold text-ink">{grade.series}</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
              All models on this page share the same {grade.grade} certification and core security construction.
              Choose the size based on the space available, the volume you need to secure, and anchoring requirements
              at your location.
            </p>
            <div className="mt-6 rounded-2xl border border-line bg-surface px-5 py-4">
              <p className="text-[13px] font-semibold text-muted">Models on this page</p>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
                {grade.models.map((m) => m.name).join(", ")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-x grid gap-6 py-16 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-line bg-white p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <ShieldIcon />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-ink">Security Details and Documents</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">
              {grade.grade} safes are certified under UNE EN-1143-1. Contact Salvado to request the relevant brochure,
              technical sheet, or certification details for {grade.series}.
            </p>
            <div className="mt-5">
              <CTA href="/contact" variant="ghost">Contact Salvado for Documents</CTA>
            </div>
          </Reveal>

          <Reveal delay={80} className="rounded-2xl border border-line bg-white p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <TruckIcon />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-ink">Delivery, Installation and After-Sales</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">
              Salvado provides careful delivery, European-standard installation, and anchoring based on the model and
              your site conditions, followed by dedicated after-sales technical support.
            </p>
          </Reveal>
        </div>
      </section>

      {otherGrades.length > 0 && (
        <section className="bg-white">
          <div className="container-x py-20 md:py-24">
            <Reveal>
              <SectionHeading eyebrow="Other Grades" title="Explore Other High-Security Grades" />
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {otherGrades.map((g, i) => (
                <Reveal key={g.slug} delay={(i % 4) * 50}>
                  <GradeCard grade={g} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-surface">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Common Questions" />
          </Reveal>
          <div className="mt-12">
            <FAQ items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
