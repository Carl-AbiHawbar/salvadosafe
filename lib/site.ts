import defaultSite from "@/content/site.json";
import type { SiteConfig } from "./content";

export type { SiteConfig };

/** Client-safe site config (bundled JSON). Use SiteProvider / useSite() in client components. */
export const site = defaultSite as SiteConfig;

export function getSite(): SiteConfig {
  return site;
}

export function waLink(message?: string) {
  const base = `https://wa.me/${site.phones.whatsapp.wa}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const telLink = (tel: string) => `tel:${tel}`;
