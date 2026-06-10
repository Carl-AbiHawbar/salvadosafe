import type { Metadata } from "next";
import { SectionHeading, FinalCTA } from "@/components/sections";
import { Reveal } from "@/components/reveal";
import { FAQ } from "@/components/faq";
import { LeadForm } from "@/components/lead-form";
import { WhatsAppButton, QuoteButton, CallButton, CTA } from "@/components/cta";
import { ShieldIcon, ToolsIcon, HeadsetIcon, TruckIcon, CheckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Professional Safe & Vault Services",
  description:
    "Salvado provides technical services for safes, vault doors, vault rooms, installation, maintenance, relocation, safe opening, and after-sales support for residential, commercial, and institutional clients.",
};

const services = [
  { id: "consultation", title: "Security Consultation, Delivery & Installation", text: "Site assessment, product recommendation, discreet delivery, professional installation, and technical follow-up after installation.", cta: "Request Consultation", icon: ShieldIcon },
  { id: "locksmith", title: "Master Locksmith Services", text: "Locked out of your safe? Our technicians provide professional safe opening and lock service for verified owners, with careful methods to reduce unnecessary damage whenever possible.", cta: "Request Safe Opening", icon: ToolsIcon },
  { id: "maintenance", title: "Safe Repair & Maintenance", text: "Lock replacement, digital lock upgrades, combination changes, troubleshooting, and preventative servicing to keep safes operating correctly.", cta: "Request Maintenance", icon: ToolsIcon },
  { id: "vault", title: "Vault Doors & Vault Rooms", text: "High-security vault doors and complete vault room systems for bank-level, institutional, commercial, and private security requirements.", cta: "View Vault Services", icon: ShieldIcon },
  { id: "relocation", title: "Safe Relocation", text: "Professional relocation of safes with proper handling, transport planning, and setup at the new location.", cta: "Request Relocation", icon: TruckIcon },
  { id: "support", title: "After-Sales Technical Support", text: "Specialized technical assistance for Salvado clients, including lock guidance, service coordination, maintenance follow-up, and product support after purchase or installation.", cta: "Contact Technical Support", icon: HeadsetIcon },
];

const whyPoints = [
  { title: "Certified & Trained Team", text: "Services handled by Salvado's trained technical team with decades of experience in safes, locks, vault doors, installation, and security products." },
  { title: "European-Standard Installation", text: "Installations carried out according to product specifications, site conditions, and European security norms where applicable." },
  { title: "Support Before & After Purchase", text: "From consultation and product selection to installation, maintenance, relocation, and after-sales support." },
  { title: "Trusted Across Sectors", text: "We work with homeowners, businesses, jewelers, banks, institutions, offices, villas, and private clients with demanding requirements." },
];

const faqs = [
  { q: "Can Salvado install safes and vault doors?", a: "Yes. Salvado provides professional delivery and installation based on product specifications, site conditions, and access requirements." },
  { q: "Can Salvado open a locked safe?", a: "Yes. Salvado provides safe opening and lock service for verified owners using professional methods designed to reduce unnecessary damage whenever possible." },
  { q: "Can Salvado repair or replace a safe lock?", a: "Yes. Salvado handles lock replacement, digital lock upgrades, combination changes, troubleshooting, and maintenance depending on the model." },
  { q: "Can Salvado relocate a safe?", a: "Yes. Salvado can relocate safes with proper handling, transport planning, and setup at the new location." },
  { q: "Does Salvado provide after-sales support?", a: "Yes. Salvado provides technical support, service coordination, maintenance guidance, and lock-related assistance after purchase or installation." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brand/vdi.png" alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </div>
        <div className="container-x relative py-24 md:py-32">
          <Reveal className="max-w-2xl">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">Technical Services</p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-white md:text-[52px]">
              Professional Safe &amp; Vault Services
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/80">
              Salvado provides technical services for safes, vault doors, vault rooms, installation, maintenance,
              relocation, safe opening, and after-sales support for residential, commercial, and institutional clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTA href="#request" variant="primary">Request a Service</CTA>
              <WhatsAppButton label="WhatsApp Salvado" message="Hi Salvado, I'd like to request a service." />
              <CallButton variant="dark" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services overview */}
      <section className="bg-white">
        <div className="container-x py-20 md:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="What We Do"
              title="Our Services"
              text="Salvado supports clients before, during, and after the sale — with serious, technical expertise."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 60} className="scroll-mt-28" >
                <div id={s.id} className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card transition-shadow hover:shadow-soft">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <s.icon />
                  </div>
                  <h3 className="mt-5 text-[17px] font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">{s.text}</p>
                  <div className="mt-5">
                    <WhatsAppButton variant="outline" label={s.cta} message={`Hi Salvado, I'd like to: ${s.title}.`} />
                  </div>
                </div>
              </Reveal>
            ))}
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
            {whyPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 70} className="rounded-2xl border border-line bg-white p-7 shadow-card">
                <CheckIcon className="text-brand" />
                <h3 className="mt-4 text-[16px] font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            ))}
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
            <FAQ items={faqs} />
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
