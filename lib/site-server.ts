import "server-only";
import { readJson } from "./storage";
import type { SiteConfig } from "./content";

/** Server-only: reads live content/site.json (e.g. after admin edits). */
export function getSite(): SiteConfig {
  return readJson<SiteConfig>("site.json");
}
