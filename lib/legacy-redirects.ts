/**
 * Legacy WordPress `/product-category/*` → current Next.js routes.
 * Collected from Wayback Machine CDX for salvadosafe.com.
 */
export type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

const CATEGORY_MAP: Record<string, string> = {
  // Fire-resistant
  "fire-resistant-safe": "/category/fire-resistant-safes",
  "fire-resistant-safes": "/category/fire-resistant-safes",
  "fire_resistant_safe": "/category/fire-resistant-safes",
  "fire_resistant_safes": "/category/fire-resistant-safes",
  "fire-burglary-safe": "/category/fire-resistant-safes",
  "fire_burglary_safe": "/category/fire-resistant-safes",
  "filing-safe": "/category/fire-resistant-safes",
  "filing_safe": "/category/fire-resistant-safes",

  // Hotel
  "hotel-safe": "/category/hotel-safes",
  "hotel-safes": "/category/hotel-safes",
  "hotel_safe": "/category/hotel-safes",
  "hotel_safes": "/category/hotel-safes",
  "flag-safes": "/category/hotel-safes",
  "flag_safes": "/category/hotel-safes",
  "electronic-flag-safe": "/category/hotel-safes",
  "electronic_flag_safe": "/category/hotel-safes",

  // High-security / anti-burglary
  "anti_burglary_safes": "/category/high-security-safes",
  "anti-burglary-safes": "/category/high-security-safes",
  "anti-burglary-safe": "/category/high-security-safes",
  "profesionnal-safes": "/category/high-security-safes",
  "professional-safes": "/category/high-security-safes",
  "high-security-safe": "/category/high-security-safes",
  "high-security-safes": "/category/high-security-safes",
  "high_security_safe": "/category/high-security-safes",
  "high_security_safes": "/category/high-security-safes",

  // Grades (were product-categories on old WP)
  "grade-i": "/grade/grade-i",
  "grade-ii": "/grade/grade-ii",
  "grade-iii": "/grade/grade-iii",
  "grade-iv": "/grade/grade-iv",
  "grade-v": "/grade/grade-v",
  "grade_i": "/grade/grade-i",
  "grade_ii": "/grade/grade-ii",
  "grade_iii": "/grade/grade-iii",
  "grade_iv": "/grade/grade-iv",
  "grade_v": "/grade/grade-v",

  // Vault
  "vault_door": "/category/vault-doors-vault-rooms",
  "vault-door": "/category/vault-doors-vault-rooms",
  "vault-doors": "/category/vault-doors-vault-rooms",
  "vault-safe": "/category/vault-doors-vault-rooms",
  "vault_safe": "/category/vault-doors-vault-rooms",
  "vault-doors-vault-rooms": "/category/vault-doors-vault-rooms",

  // Cash handling
  "deposit_safes": "/category/cash-handling-solutions",
  "deposit-safes": "/category/cash-handling-solutions",
  "deposit-safe": "/category/cash-handling-solutions",
  "money_counter": "/category/cash-handling-solutions",
  "money-counter": "/category/cash-handling-solutions",
  "money-counters": "/category/cash-handling-solutions",
  "cash-handling": "/category/cash-handling-solutions",
  "cash-handling-solutions": "/category/cash-handling-solutions",

  // Camouflage / concealed
  "camouflage_safes": "/category/concealed-camouflage-safes",
  "camouflage-safes": "/category/concealed-camouflage-safes",
  "camouflage-safe": "/category/concealed-camouflage-safes",
  "concealed-camouflage-safes": "/category/concealed-camouflage-safes",
  "wall_safes": "/category/concealed-camouflage-safes",
  "wall-safes": "/category/concealed-camouflage-safes",
  "wall-safe": "/category/concealed-camouflage-safes",

  // Luxury / watch
  "luxury_safes": "/category/luxury-safes-watch-storage",
  "luxury-safes": "/category/luxury-safes-watch-storage",
  "luxury-safe": "/category/luxury-safes-watch-storage",
  "luxury-safes-watch-storage": "/category/luxury-safes-watch-storage",
  "luxury-fire-resistant-safe": "/category/luxury-safes-watch-storage",
  "luxury_fire_resistant_safe": "/category/luxury-safes-watch-storage",
  "luxury-small-safe": "/category/luxury-safes-watch-storage",
  "luxury_small_safe": "/category/luxury-safes-watch-storage",
  "watch-winders": "/category/luxury-safes-watch-storage",
  "watch_winders": "/category/luxury-safes-watch-storage",
  "pouches": "/category/luxury-safes-watch-storage",

  // Home / furniture / drawer
  "home-safes": "/category/home-safes",
  "home-safe": "/category/home-safes",
  "home_safes": "/category/home-safes",
  "furniture-safe": "/category/home-safes",
  "furniture_safe": "/category/home-safes",
  "drawer-safes": "/category/home-safes",
  "drawer-safe": "/category/home-safes",
  "drawer_safes": "/category/home-safes",
  "safe-box": "/category/home-safes",
  "safe_box": "/category/home-safes",

  // Smart
  "smart_safes": "/category/smart-safes",
  "smart-safes": "/category/smart-safes",
  "smart-safe": "/category/smart-safes",
  "finger-print-safe": "/category/smart-safes",
  "finger_print_safe": "/category/smart-safes",
  "fingerprint-safe": "/category/smart-safes",

  // Gun
  "gun_safes": "/category/responsible-firearm-storage",
  "gun-safes": "/category/responsible-firearm-storage",
  "gun-safe": "/category/responsible-firearm-storage",
  "responsible-firearm-storage": "/category/responsible-firearm-storage",

  // Cash boxes / key cabinets
  "cash_box": "/category/cash-boxes-key-cabinets",
  "cash-box": "/category/cash-boxes-key-cabinets",
  "cash-boxes": "/category/cash-boxes-key-cabinets",
  "key-box": "/category/cash-boxes-key-cabinets",
  "key_box": "/category/cash-boxes-key-cabinets",
  "key-cabinets": "/category/cash-boxes-key-cabinets",
  "cash-boxes-key-cabinets": "/category/cash-boxes-key-cabinets",
};

/** Nested WP category paths */
const NESTED_CATEGORY_MAP: Record<string, string> = {
  "gun_safes/long_rifle_safe": "/category/responsible-firearm-storage",
  "gun_safes/pistol_safes": "/category/responsible-firearm-storage",
  "gun-safes/long-rifle-safe": "/category/responsible-firearm-storage",
  "gun-safes/pistol-safes": "/category/responsible-firearm-storage",
  "watch-winders/colorful-winders": "/category/luxury-safes-watch-storage",
  "watch-winders/italian-made": "/category/luxury-safes-watch-storage",
  "watch-winders/swiss-made": "/category/luxury-safes-watch-storage",
  "watch-winders/page/1": "/category/luxury-safes-watch-storage",
  "watch-winders/page/2": "/category/luxury-safes-watch-storage",
  "watch-winders/page/3": "/category/luxury-safes-watch-storage",
};

function withSlashVariants(source: string, destination: string): LegacyRedirect[] {
  const base = source.replace(/\/$/, "");
  return [
    { source: base, destination, permanent: true },
    { source: `${base}/`, destination, permanent: true },
  ];
}

export function getLegacyRedirects(): LegacyRedirect[] {
  const redirects: LegacyRedirect[] = [];

  for (const [slug, dest] of Object.entries(CATEGORY_MAP)) {
    redirects.push(...withSlashVariants(`/product-category/${slug}`, dest));
  }

  for (const [slug, dest] of Object.entries(NESTED_CATEGORY_MAP)) {
    redirects.push(...withSlashVariants(`/product-category/${slug}`, dest));
  }

  // Catch-all for any remaining / unknown WP category paths
  redirects.push(
    {
      source: "/product-category/:path*",
      destination: "/products",
      permanent: true,
    },
    {
      source: "/product_category/:path*",
      destination: "/products",
      permanent: true,
    },
  );

  // Old WP shop index / taxonomy feeds
  redirects.push(
    ...withSlashVariants("/shop", "/products"),
    ...withSlashVariants("/product-tag/:slug", "/products"),
    ...withSlashVariants("/product_tag/:slug", "/products"),
  );

  return redirects;
}
