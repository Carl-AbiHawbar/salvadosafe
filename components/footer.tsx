"use client";

import Link from "next/link";
import { useSite } from "./site-provider";
import { waLink, telLink } from "@/lib/site";
import type { Category } from "@/lib/catalog";
import { WhatsAppIcon, PinIcon, ShieldIcon, StarIcon, TruckIcon, CheckIcon } from "./icons";

const services = [
  { label: "Consultation, Delivery and Installation", href: "/services#consultation" },
  { label: "Master Locksmith Services", href: "/services#locksmith" },
  { label: "Safe Repair and Maintenance", href: "/services#maintenance" },
  { label: "Vault Doors and Vault Rooms", href: "/services#vault" },
  { label: "Safe Relocation", href: "/services#relocation" },
  { label: "After-Sales Technical Support", href: "/services#support" },
];

const trust = [
  { icon: StarIcon, label: "40,000+ Clients" },
  { icon: ShieldIcon, label: "40+ Years" },
  { icon: CheckIcon, label: "Top Rated Support" },
  { icon: TruckIcon, label: "European-Standard Installation" },
];

export function Footer({ featuredCategories }: { featuredCategories: Category[] }) {
  const site = useSite();
  return (
    <footer className="mt-auto border-t border-line bg-ink pb-14 text-white md:pb-0">
      {/* Trust strip */}
      <div className="border-b border-white/10">
        <div className="container-x grid grid-cols-2 gap-4 py-7 md:grid-cols-4">
          {trust.map((t) => (
            <div key={t.label} className="flex items-center justify-center gap-2.5 text-center">
              <t.icon width={20} height={20} className="shrink-0 text-brand" />
              <span className="text-[13.5px] font-semibold text-white/90">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Columns */}
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brand/logo.png" alt="Salvado Safe" className="mb-4 h-11 w-auto brightness-0 invert" />
          <p className="max-w-xs text-[14px] leading-relaxed text-white/65">
            A name you can trust in safes, vault doors, and secure storage solutions.
          </p>
          <a
            href={site.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[13px] font-semibold transition-colors hover:border-brand hover:bg-brand"
          >
            <PinIcon width={16} height={16} /> Visit Showroom
          </a>
          <div className="mt-5 flex gap-3 text-[13px]">
            <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-white">Instagram</a>
            <span className="text-white/25">·</span>
            <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-white">Facebook</a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-white/50">Products</h3>
          <ul className="space-y-2.5 text-[14px]">
            {featuredCategories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="text-white/70 hover:text-white">{c.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="font-semibold text-brand hover:brightness-110">View All Products</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-white/50">Services</h3>
          <ul className="space-y-2.5 text-[14px]">
            {services.map((s) => (
              <li key={s.label}>
                <Link href={s.href} className="text-white/70 hover:text-white">{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-white/50">Contact</h3>
          <ul className="space-y-2.5 text-[14px] text-white/70">
            <li>{site.location}</li>
            <li>
              Phone: <a href={telLink(site.phones.landline.tel)} className="hover:text-white">{site.phones.landline.label}</a>
            </li>
            <li>
              WhatsApp: <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">{site.phones.whatsapp.label}</a>
            </li>
            <li>{site.hours.weekdays}</li>
            <li>{site.hours.saturday}</li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
            </li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-[13px] font-semibold text-white hover:border-white hover:bg-white/10">
              <WhatsAppIcon width={15} height={15} className="brightness-0 invert" /> WhatsApp Salvado
            </a>
            <a href={site.maps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold hover:border-white">
              <PinIcon width={15} height={15} /> Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-[13px] text-white/55 md:flex-row">
          <span>© 2026 Salvado Safe. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms and Conditions</Link>
            <Link href="/sitemap" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
