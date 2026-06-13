import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { LeadForm } from "@/components/lead-form";
import { site, waLink, telLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon, PinIcon, QuoteIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Salvado, Request a Quote",
  description:
    "Contact Salvado Safe in Zalka, Lebanon. Request a quote, ask about a product, or arrange a showroom visit. Call, WhatsApp, or send us your requirements.",
};

const contactItems = [
  { icon: PhoneIcon, label: "Call the Showroom", value: site.phones.landline.label, href: telLink(site.phones.landline.tel), external: true },
  { icon: WhatsAppIcon, label: "WhatsApp Salvado", value: site.phones.whatsapp.label, href: waLink("Hi Salvado, I'd like to make an inquiry."), external: true },
  { icon: PinIcon, label: "Visit the Showroom", value: site.location, href: site.maps, external: true },
  { icon: QuoteIcon, label: "Email Us", value: site.email, href: `mailto:${site.email}`, external: false },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink">
        <div className="container-x py-20 md:py-24">
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
              <a
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <c.icon width={20} height={20} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-muted">{c.label}</p>
                  <p className="mt-0.5 text-[15px] font-bold text-ink">{c.value}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + details */}
      <section className="bg-surface">
        <div className="container-x grid items-start gap-10 py-12 md:grid-cols-2 md:py-16">
          <Reveal>
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">Send a Message</p>
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

          <Reveal delay={80}>
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
