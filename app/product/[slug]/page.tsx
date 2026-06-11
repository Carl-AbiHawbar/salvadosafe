import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { FAQ } from "@/components/faq";
import { ProductCard } from "@/components/cards";
import { SectionHeading, FinalCTA } from "@/components/sections";
import { WhatsAppButton, QuoteButton, CallButton, CTA } from "@/components/cta";
import { getProducts, getProduct, getCategory, similarProducts, type Product } from "@/lib/catalog";
import { CheckIcon, TruckIcon, ShieldIcon, ToolsIcon, HeadsetIcon } from "@/components/icons";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.desc || `${product.name} — premium security solution from Salvado Safe in Lebanon.`,
  };
}

const quickTrust = [
  { icon: TruckIcon, label: "Professional Delivery" },
  { icon: ShieldIcon, label: "European-Standard Install" },
  { icon: ToolsIcon, label: "Up to 5-Year Warranty" },
  { icon: HeadsetIcon, label: "After-Sales Support" },
];

const SPEC_LABELS: { key: keyof Product["specs"]; label: string }[] = [
  { key: "external", label: "External Size (H × W × D mm)" },
  { key: "internal", label: "Internal Size (H × W × D mm)" },
  { key: "weight", label: "Weight" },
  { key: "volume", label: "Volume / Capacity" },
  { key: "shelves", label: "Shelves / Drawers" },
  { key: "bolts", label: "Locking Bolts" },
  { key: "lock", label: "Lock / Access" },
  { key: "fireRating", label: "Fire Rating" },
  { key: "grade", label: "Security Grade / Certification" },
  { key: "warranty", label: "Warranty" },
];

function formatSpec(key: string, value: string): string {
  if (key === "weight" && /^[\d.,-]+$/.test(value)) return `${value} kg`;
  return value;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const similar = similarProducts(product, 6);

  // Hide empty fields — only show confirmed specs
  const specRows = SPEC_LABELS.filter(({ key }) => product.specs[key]).map(({ key, label }) => ({
    label,
    value: formatSpec(key, product.specs[key] as string),
  }));

  const gallery = product.gallery && product.gallery.length > 1 ? product.gallery : null;

  const faqs = [
    product.isProject
      ? { q: `How does a ${product.name} project work?`, a: "These are project-based solutions. Salvado provides private consultation, site assessment, technical planning, and professional installation tailored to your space and security requirements." }
      : { q: `Is the ${product.name} available?`, a: "Yes — contact Salvado for current availability, pricing, and lead time. We can also advise on suitable alternatives." },
    { q: "Can you deliver and install it?", a: "Yes. Salvado provides professional delivery and European-standard installation based on product specifications and site conditions." },
    { q: "Do you offer after-sales support?", a: "Yes. We provide technical support, lock assistance, maintenance guidance, and service coordination after purchase." },
    ...(category ? category.faqs.slice(0, 1) : []),
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-line bg-surface">
        <div className="container-x flex flex-wrap items-center gap-2 py-3 text-[13px] text-muted">
          <Link href="/" className="hover:text-brand">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-brand">Products</Link>
          {category && (
            <>
              <span>/</span>
              <Link href={`/category/${category.slug}`} className="hover:text-brand">{category.name}</Link>
            </>
          )}
          <span>/</span>
          <span className="font-semibold text-ink-2">{product.name}</span>
        </div>
      </div>

      {/* Product hero */}
      <section className="bg-white">
        <div className="container-x grid items-start gap-10 py-12 md:grid-cols-2 md:py-16">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-line bg-surface">
              {product.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={product.image} alt={product.name} className="aspect-square w-full object-contain p-8" />
              ) : (
                <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 text-muted">
                  <ShieldIcon width={40} height={40} className="text-line" />
                  <span className="text-[14px] font-semibold">Photos available on request</span>
                </div>
              )}
            </div>
            {gallery && (
              <div className="mt-3 flex flex-wrap gap-2.5">
                {gallery.map((img) => (
                  <div key={img} className="h-20 w-20 overflow-hidden rounded-xl border border-line bg-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={product.name} loading="lazy" className="h-full w-full object-contain p-1.5" />
                  </div>
                ))}
              </div>
            )}
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
              {product.sub && (
                <span className="inline-block rounded-full border border-line px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
                  {product.sub}
                </span>
              )}
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-ink md:text-[44px]">{product.name}</h1>

            {product.desc && (
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-2">{product.desc}</p>
            )}

            {product.colors && (
              <div className="mt-5">
                <p className="text-[13px] font-semibold text-muted">Available Colors</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <span key={c} className="rounded-full border border-line bg-white px-4 py-1.5 text-[13px] font-semibold text-ink-2">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-line bg-surface px-5 py-4">
              <p className="text-[13px] text-muted">{product.isProject ? "Project-Based Solution" : "Pricing"}</p>
              <p className="text-[20px] font-bold text-ink">
                {product.isProject ? "Custom Quotation by Project" : "Call / WhatsApp for Price"}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {product.isProject ? (
                <>
                  <WhatsAppButton label="Request Private Consultation" message={`Hi Salvado, I'd like a private consultation about ${product.name}.`} />
                  <QuoteButton label="Request a Quote" />
                </>
              ) : (
                <>
                  <WhatsAppButton label="WhatsApp for Price" message={`Hi Salvado, I'm interested in the ${product.name}. Can you share the price and availability?`} />
                  <QuoteButton label="Request a Quote" />
                </>
              )}
              <CallButton />
            </div>

            {/* Quick trust strip */}
            <div className="mt-7 grid grid-cols-2 gap-3 border-t border-line pt-6">
              {quickTrust.map((t) => (
                <div key={t.label} className="flex items-center gap-2.5 text-[13px] text-ink-2">
                  <t.icon width={18} height={18} className="shrink-0 text-brand" /> {t.label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Similar options strip */}
      {similar.length > 0 && (
        <section className="border-y border-line bg-surface">
          <div className="container-x py-12">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-bold text-ink">Similar Options</h2>
              {category && (
                <Link href={`/category/${category.slug}`} className="text-[14px] font-semibold text-brand link-underline">
                  View all {category.name}
                </Link>
              )}
            </div>
            <div className="no-scrollbar flex gap-5 overflow-x-auto pb-2">
              {similar.map((p) => (
                <div key={p.slug} className="w-[220px] shrink-0">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specs + features */}
      <section className="bg-white">
        <div className="container-x grid gap-12 py-20 md:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">Specifications</p>
            <h2 className="font-display text-3xl font-bold text-ink">Technical Details</h2>
            {specRows.length > 0 ? (
              <div className="mt-5 overflow-hidden rounded-2xl border border-line">
                <table className="w-full text-[14px]">
                  <tbody>
                    {specRows.map((s, i) => (
                      <tr key={s.label} className={i % 2 ? "bg-surface" : "bg-white"}>
                        <td className="w-1/2 px-5 py-3.5 align-top font-semibold text-ink-2">{s.label}</td>
                        <td className="px-5 py-3.5 text-ink">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-5 text-[14.5px] leading-relaxed text-ink-2">
                Specifications for this solution are confirmed per project. Contact our team for technical details.
              </p>
            )}
          </Reveal>

          <Reveal delay={80}>
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">
              {product.features.length > 0 ? "Main Features" : "Best For"}
            </p>
            <h2 className="font-display text-3xl font-bold text-ink">
              {product.features.length > 0 ? "What This Model Offers" : "Recommended Use"}
            </h2>
            {product.features.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-ink-2">
                    <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-brand" /> {f}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
                {category?.protect ?? "Suitable for homes, businesses, and institutions with serious security requirements."}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* Security details & documents + Delivery */}
      <section className="bg-surface">
        <div className="container-x grid gap-6 py-16 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-line bg-white p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <ShieldIcon />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-ink">Security Details &amp; Documents</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">
              {product.specs.grade
                ? `This model carries: ${product.specs.grade}. Contact Salvado to request the relevant brochure or technical sheet.`
                : "Certifications and technical documents vary by model. Contact Salvado to confirm the specifications for this product and request the relevant brochure or technical sheet."}
            </p>
            <div className="mt-5">
              <WhatsAppButton variant="outline" label="Request Documents" message={`Hi Salvado, can you send the documents for the ${product.name}?`} />
            </div>
          </Reveal>

          <Reveal delay={80} className="rounded-2xl border border-line bg-white p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <TruckIcon />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-ink">Delivery, Installation &amp; After-Sales</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">
              Salvado provides careful delivery, European-standard installation, and anchoring based on the product and
              your site conditions — followed by dedicated after-sales technical support, lock assistance, and
              maintenance guidance.
            </p>
            <div className="mt-5">
              <CTA href="/services" variant="ghost">Ask About Delivery &amp; Installation</CTA>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="container-x py-20">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Product Questions" />
          </Reveal>
          <div className="mt-12">
            <FAQ items={faqs} />
          </div>
        </div>
      </section>

      <FinalCTA
        eyebrow="Ask about this product"
        title={`Interested in the ${product.name}?`}
        text="Contact Salvado for pricing, availability, specifications, and delivery or installation guidance. Our team is ready to help."
        waMessage={`Hi Salvado, I'd like to ask about the ${product.name}.`}
      />
    </>
  );
}
