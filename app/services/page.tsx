import type { Metadata } from "next";
import { SectionHeading, FinalCTA } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { FAQ } from "@/components/faq";
import { LeadForm } from "@/components/lead-form";
import { WhatsAppButton, QuoteButton, CallButton, CTA, CtaGroup } from "@/components/cta";
import { getPagesContent } from "@/lib/content";
import { getIcon } from "@/lib/icon-map";
import { CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Professional Safe & Vault Services",
  description:
    "Salvado provides technical services for safes, vault doors, vault rooms, installation, maintenance, relocation, safe opening, and after-sales support for residential, commercial, and institutional clients.",
};

export default function ServicesPage() {
  const content = getPagesContent().services;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={content.hero.image} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </div>
        <div className="container-x relative py-24 md:py-32">
          <Reveal className="max-w-2xl">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">{content.hero.eyebrow}</p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-white md:text-[52px]">
              {content.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/80">
              {content.hero.text}
            </p>
            <CtaGroup className="mt-8">
              <CTA href="#request" variant="primaryLight">
                <span className="md:hidden">Request</span>
                <span className="hidden md:inline">Request a Service</span>
              </CTA>
              <WhatsAppButton label="WhatsApp Salvado" shortLabel="WhatsApp" message="Hi Salvado, I'd like to request a service." variant="outlineLight" />
              <QuoteButton variant="primaryLight" />
              <CallButton variant="ghostLight" />
            </CtaGroup>
          </Reveal>
        </div>
      </section>

      {/* Services overview */}
      <section className="bg-white">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow={content.overview.eyebrow}
              title={content.overview.title}
              text={content.overview.text}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.items.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
              <Reveal key={s.id} delay={i * 60} className="scroll-mt-28" >
                <div id={s.id} className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 text-center shadow-card transition-shadow hover:shadow-soft md:text-left">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand md:mx-0">
                    <Icon />
                  </div>
                  <h3 className="mt-5 text-[17px] font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">{s.text}</p>
                  <div className="mt-5">
                    <WhatsAppButton variant="outline" label={s.cta} message={`Hi Salvado, I'd like to: ${s.title}.`} />
                  </div>
                </div>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-surface">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Why Salvado Services"
              title="Technical Service by a Specialized Security Team"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.whyPoints.map((p, i) => {
              const Icon = getIcon(p.icon);
              return (
              <Reveal key={p.title} delay={i * 70} className="rounded-2xl border border-line bg-white p-7 text-center shadow-card md:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand md:mx-0">
                  <Icon />
                </div>
                <h3 className="mt-4 text-[16px] font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.text}</p>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Request a service */}
      <section id="request" className="scroll-mt-20 bg-white">
        <div className="container-x grid items-start gap-12 py-20 md:grid-cols-2 md:py-24">
          <Reveal>
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">Lead Section</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[40px]">
              Request a Service From Salvado
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-2">
              Contact Salvado with the service you need, your location, product type, and any technical details
              available. Our team will guide you on the next step.
            </p>
            <ul className="mt-6 space-y-3">
              {["Trained, certified technical team", "Careful, professional methods", "Support across all sectors"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[14.5px] text-ink-2">
                  <CheckIcon width={18} height={18} className="shrink-0 text-brand" /> {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <LeadForm variant="service" />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Service Questions" />
          </Reveal>
          <div className="mt-12">
            <FAQ items={content.faqs} />
          </div>
        </div>
      </section>

      <FinalCTA
        eyebrow="Need technical support?"
        title="Need Support for a Safe, Vault Door, or Security Product?"
        text="Contact Salvado for service requests, installation requirements, repair, relocation, safe opening, or technical support."
        waMessage="Hi Salvado, I need technical support."
      />
    </>
  );
}
