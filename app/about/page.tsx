import type { Metadata } from "next";
import { SectionHeading, FinalCTA } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { CTA, CallButton, MapButton } from "@/components/cta";
import { ShieldIcon, CheckIcon, ToolsIcon, HeadsetIcon, StarIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Salvado",
  description:
    "Salvado is Lebanon's leading name in safes, vault doors, secure rooms, and professional security solutions — with the widest safe showroom in Lebanon and a trained technical team.",
};

const sectors = ["Banks", "Jewelers", "Institutions", "International Companies", "Agencies", "Villas & Private Clients", "Offices & Businesses"];

const leadPoints = [
  { icon: ShieldIcon, title: "Specialized in Safes & Security", text: "A dedicated security specialist focused exclusively on protection and secure storage — safes, vault doors, secure rooms, installation, maintenance, and technical support." },
  { icon: CheckIcon, title: "Certified & High-Quality Products", text: "Tested and certified security products, high-security safes, fire-rated safes, vault doors, and premium European security solutions." },
  { icon: StarIcon, title: "Full Transparency With Clients", text: "Clear guidance on product category, security level, fire rating, installation requirements, warranty, and after-sales support." },
  { icon: ToolsIcon, title: "Trained Technical Team", text: "Trained to handle consultation, delivery, installation, anchoring, maintenance, lock service, and technical support." },
  { icon: HeadsetIcon, title: "Market Leadership in Lebanon", text: "Rated number one in Lebanon and recognized for its showroom, product range, technical expertise, service quality, and after-sales support." },
];

const stats = [
  { value: "40+", label: "Years of Trust" },
  { value: "30,000+", label: "Clients Served" },
  { value: "#1", label: "Rated in Lebanon" },
  { value: "143+", label: "Products in Showroom" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brand/c6c71578def71511416d0707.jpg" alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </div>
        <div className="container-x relative py-24 md:py-32">
          <Reveal className="max-w-2xl">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">About Salvado</p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-white md:text-[52px]">
              Lebanon&apos;s Reference Point for Security &amp; Secure Storage
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/80">
              Salvado is Lebanon&apos;s leading name in safes, vault doors, secure rooms, and professional security
              solutions. With the widest safe showroom in Lebanon, certified products, a trained technical team, and a
              reputation built on transparency and service, Salvado is the reference point for clients who expect the
              highest level of security, quality, and support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MapButton variant="primary" />
              <CTA href="/contact" variant="dark">Speak With Our Team</CTA>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-line bg-white">
        <div className="container-x grid grid-cols-2 gap-6 py-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="text-center">
              <p className="font-display text-4xl font-bold text-brand md:text-5xl">{s.value}</p>
              <p className="mt-1 text-[13.5px] font-medium text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Showroom */}
      <section className="bg-white">
        <div className="container-x grid items-center gap-12 py-20 md:grid-cols-2 md:py-24">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-line shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/brand/frontimg.webp" alt="Salvado showroom" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">Our Showroom</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[40px]">
              The Widest Safe Showroom in Lebanon
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-2">
              At Salvado, clients can browse the widest range of safes and security products live in our showroom. From
              high-security safes and fire-rated safes to vault doors, luxury safes, watch storage, and secure storage
              solutions, our showroom allows clients to compare models, inspect quality, and receive professional
              guidance before making a decision.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <MapButton label="Open in Google Maps" variant="primary" />
              <CallButton />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who trusts Salvado */}
      <section className="bg-surface">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Trusted Clients"
              title="Trusted by Lebanon's Most Demanding Clients"
              text="Salvado serves clients with serious security requirements who need certified protection, professional installation, discretion, and dependable after-sales support."
            />
          </Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {sectors.map((s, i) => (
              <Reveal key={s} delay={i * 40}>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-[14px] font-semibold text-ink-2 shadow-card">
                  <ShieldIcon width={16} height={16} className="text-brand" /> {s}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Salvado leads */}
      <section className="bg-white">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Why We Lead"
              title="A Trusted Name Built on Quality, Transparency & Specialization"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 60} className="rounded-2xl border border-line bg-white p-7 shadow-card transition-shadow hover:shadow-soft">
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

      {/* Technical capability */}
      <section className="bg-ink">
        <div className="container-x py-20 md:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">More Than a Supplier</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-[40px]">
              More Than a Safe Supplier
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-white/70">
              Salvado supports clients before, during, and after the purchase — product recommendation, site assessment,
              delivery, installation, anchoring, safe relocation, lock service, maintenance, vault door installation,
              secure room solutions, and after-sales technical support. This technical capability is what separates
              Salvado from ordinary sellers and makes the company a trusted security partner for residential,
              commercial, institutional, and private clients.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCTA
        eyebrow="Visit or speak with our team"
        title="Visit Salvado or Speak With Our Team"
        text="For showroom visits, product guidance, security consultation, delivery, installation, or after-sales support, contact Salvado directly."
        waMessage="Hi Salvado, I'd like to learn more about your company."
      />
    </>
  );
}
