import defaultSite from "@/content/site.json";
import type { SiteConfig } from "./content";

export type { SiteConfig };

export function getSite(): SiteConfig {
  if (typeof window !== "undefined") {
    return defaultSite as SiteConfig;
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { readJson } = require("./storage") as typeof import("./storage");
  return readJson<SiteConfig>("site.json");
}

export function waLink(message?: string) {
  const s = getSite();
  const base = `https://wa.me/${s.phones.whatsapp.wa}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const telLink = (tel: string) => `tel:${tel}`;

/** Static defaults for client bundles; prefer getSite() on the server */
export const site = defaultSite as SiteConfig;
