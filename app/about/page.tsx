import type { Metadata } from "next";
import { SectionHeading, FinalCTA } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { CTA, CallButton, MapButton } from "@/components/cta";
import { getPagesContent } from "@/lib/content";
import { getIcon } from "@/lib/icon-map";
import { ShieldIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Salvado",
  description:
    "Salvado is Lebanon's leading name in safes, vault doors, secure rooms, and professional security solutions, with the widest safe showroom in Lebanon and a trained technical team.",
};

export default function AboutPage() {
  const about = getPagesContent().about;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={about.hero.image} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </div>
        <div className="container-x relative py-24 md:py-32">
          <Reveal className="max-w-2xl">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">{about.hero.eyebrow}</p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-white md:text-[52px]">
              {about.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/80">
              {about.hero.text}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MapButton variant="primaryLight" />
              <CTA href="/contact" variant="ghostLight">Speak With Our Team</CTA>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-line bg-white">
        <div className="container-x grid grid-cols-2 gap-6 py-12 md:grid-cols-4">
          {about.stats.map((s, i) => (
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
            {about.sectors.map((s, i) => (
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
            {about.leadPoints.map((p, i) => {
              const Icon = getIcon(p.icon);
              return (
              <Reveal key={p.title} delay={i * 60} className="rounded-2xl border border-line bg-white p-7 text-center shadow-card transition-shadow hover:shadow-soft md:text-left">
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

      {/* Technical capability */}
      <section className="bg-ink">
        <div className="container-x py-20 md:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">More Than a Supplier</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-[40px]">
              More Than a Safe Supplier
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-white/70">
              Salvado supports clients before, during, and after the purchase, product recommendation, site assessment,
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
