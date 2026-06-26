import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { LeadForm } from "@/components/lead-form";
import { ContactCard } from "@/components/contact-card";
import { site, waLink, telLink } from "@/lib/site";

import { getPagesContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Salvado, Request a Quote",
  description:
    "Contact Salvado Safe in Zalka, Lebanon. Request a quote, ask about a product, or arrange a showroom visit. Call, WhatsApp, or send us your requirements.",
};

const contactItems = [
  { icon: "phone" as const, label: "Call the Showroom", value: site.phones.landline.label, href: telLink(site.phones.landline.tel), external: true },
  { icon: "whatsapp" as const, label: "WhatsApp Salvado", value: site.phones.whatsapp.label, href: waLink("Hi Salvado, I'd like to make an inquiry."), whatsapp: true },
  { icon: "pin" as const, label: "Visit the Showroom", value: site.location, href: site.maps, external: true },
  { icon: "quote" as const, label: "Email Us", value: site.email, href: `mailto:${site.email}`, external: false },
];

export default function ContactPage() {
  const contact = getPagesContent().contact;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={contact.heroImage} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        </div>
        <div className="container-x relative py-20 md:py-24">
          <Reveal className="max-w-2xl">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">Get in Touch</p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-white md:text-[52px]">
              Request a Quote or Speak With a Security Expert
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/80">
              Tell us what you need to protect, your location, and intended use. Our team will recommend suitable
              options and guide you on pricing, delivery, and installation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact cards */}
      <section className="border-b border-line bg-white">
        <div className="container-x grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((c, i) => (
            <Reveal key={c.label} delay={i * 60}>
              <ContactCard {...c} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + details */}
      <section className="bg-surface">
        <div className="container-x grid items-start gap-10 py-12 md:grid-cols-2 md:py-16">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-line shadow-soft md:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={contact.showroomImage} alt="Salvado branded delivery vehicle for professional safe installation" className="aspect-[16/10] w-full object-cover object-center" />
            </div>
            <p className="mb-3 mt-8 text-[12px] font-bold uppercase tracking-[0.18em] text-brand md:mt-0">Send a Message</p>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[40px]">
              Tell Us How We Can Help
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-2">
              Drop your details in the form, and we&apos;ll shoot over a tailored recommendation and pricing on WhatsApp.
              If you&apos;d rather talk right now, we&apos;re just a phone call away at {site.phones.landline.label} or a
              WhatsApp message at {site.phones.whatsapp.label}.
            </p>

            <div className="mt-5 rounded-2xl border border-line bg-white p-6">
              <h3 className="text-[15px] font-bold text-ink">Showroom Hours</h3>
              <ul className="mt-3 space-y-1.5 text-[14px] text-ink-2">
                <li>{site.hours.weekdays}</li>
                <li>{site.hours.saturday}</li>
                <li className="pt-1 text-muted">{site.address}</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80} className="space-y-6">
            <div className="hidden overflow-hidden rounded-3xl border border-line shadow-soft md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={contact.showroomImage} alt="Salvado branded delivery vehicle for professional safe installation" className="aspect-[4/3] w-full object-cover object-center" />
            </div>
            <LeadForm variant="contact" />
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white">
        <div className="container-x py-16">
          <div className="overflow-hidden rounded-3xl border border-line shadow-card">
            <iframe
              src={site.mapsEmbed}
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Salvado showroom location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
