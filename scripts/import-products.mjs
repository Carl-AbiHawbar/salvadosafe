import fs from "fs";
import path from "path";
import XLSX from "xlsx";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const XLSX_PATH =
  process.argv[2] ||
  "c:/Users/carla/Downloads/Salvado_Product_Data_Handover_FINAL_VERIFIED (2).xlsx";
const OUT_PATH = path.join(ROOT, "content/products.json");
const OLD_PATH = path.join(ROOT, "content/products.json");

const SHEET_TO_SLUG = {
  "High-Security Safes": "high-security-safes",
  "Fire-Resistant Safes": "fire-resistant-safes",
  "Vault Doors & Vault Rooms": "vault-doors-vault-rooms",
  "Cash Handling Solutions": "cash-handling-solutions",
  "Concealed & Camouflage": "concealed-camouflage-safes",
  "Luxury & Watch Storage": "luxury-safes-watch-storage",
  "Home Safes": "home-safes",
  "Hotel Safes": "hotel-safes",
  "Gun Safes": "responsible-firearm-storage",
  "Cash Boxes & Key Cabinets": "cash-boxes-key-cabinets",
  "Smart Safes": "smart-safes",
};

const PRODUCT_SHEETS = Object.keys(SHEET_TO_SLUG);

function slugify(name) {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function clean(val) {
  if (val === undefined || val === null) return "";
  const s = String(val).trim();
  return s;
}

function parseFeatures(raw) {
  if (!raw) return [];
  return String(raw)
    .split(/[;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function isColorList(val) {
  const s = clean(val);
  if (!s) return false;
  if (/^\d/.test(s) || /\d\s*L\b/i.test(s) || /keys?/i.test(s) || /rifles?/i.test(s)) return false;
  if (s.includes(",")) return true;
  if (/^(blue|red|grey|gray|white|black|green|orange|brown|tiffany)/i.test(s)) return true;
  return false;
}

function parseColors(val) {
  const s = clean(val);
  if (!isColorList(s)) return undefined;
  return s.split(/[,;/]/).map((c) => c.trim()).filter(Boolean);
}

function volumeSpec(val) {
  const s = clean(val);
  if (!s || isColorList(s)) return undefined;
  return s;
}

function buildSpecs(row) {
  const specs = {};
  const ext = clean(row["External Size (H x W x D mm)"]);
  const int = clean(row["Internal Size (H x W x D mm)"]);
  const weight = clean(row["Weight (kg)"]);
  const vol = volumeSpec(row["Volume / Capacity"]);
  const shelves = clean(row["Shelves / Drawers"]);
  const bolts = clean(row["Bolts"]);
  const lock = clean(row["Lock / Access"]);
  const fire = clean(row["Fire Rating"]);
  const grade = clean(row["Security Grade / Certification"]);
  const warranty = clean(row["Warranty"]);

  if (ext) specs.external = ext;
  if (int) specs.internal = int;
  if (weight) specs.weight = String(weight);
  if (vol) specs.volume = vol;
  if (shelves && !/color options/i.test(shelves)) specs.shelves = shelves;
  if (bolts) specs.bolts = String(bolts);
  if (lock) specs.lock = lock;
  if (fire) specs.fireRating = fire;
  if (grade) specs.grade = grade;
  if (warranty) specs.warranty = warranty;
  return specs;
}

function isProjectRow(row) {
  const sub = clean(row["Series / Subcategory"]);
  const dev = clean(row["Developer Notes"]);
  if (/project-based/i.test(sub)) return true;
  if (/custom by project/i.test(clean(row["External Size (H x W x D mm)"]))) return true;
  if (/not a normal product grid/i.test(dev)) return true;
  return false;
}

function loadExisting() {
  if (!fs.existsSync(OLD_PATH)) return [];
  return JSON.parse(fs.readFileSync(OLD_PATH, "utf8"));
}

function buildLookup(existing) {
  const byName = new Map();
  const bySlug = new Map();
  for (const p of existing) {
    byName.set(p.name.toLowerCase(), p);
    bySlug.set(p.slug, p);
  }
  return { byName, bySlug };
}

function pickImage(name, slug, lookup) {
  const key = name.toLowerCase();
  const prev = lookup.byName.get(key) || lookup.bySlug.get(slug);
  if (prev?.image) return prev.image;

  // Try normalized name match against all existing
  const norm = key.replace(/[^a-z0-9]/g, "");
  for (const p of lookup.byName.values()) {
    if (p.name.toLowerCase().replace(/[^a-z0-9]/g, "") === norm && p.image) return p.image;
  }

  // Gun safes: map GS-* to existing images by model prefix
  if (/^gs-/i.test(name)) {
    const gs = lookup.byName.get(name.toLowerCase());
    if (gs?.image) return gs.image;
    const fallback = [...lookup.byName.values()].find(
      (p) => p.image && p.name.toLowerCase().includes(name.toLowerCase())
    );
    if (fallback?.image) return fallback.image;
    return `/images/products/${name.toUpperCase()}-CLOSE.jpg`;
  }
  if (/^ps2?$/i.test(name)) {
    return lookup.byName.get("pistol safes")?.image || "/images/products/pistol-open.jpg";
  }

  return null;
}

function preserveExtras(prev, next) {
  if (prev?.gallery?.length) next.gallery = prev.gallery;
  if (prev?.colors?.length && !next.colors?.length) next.colors = prev.colors;
  if (!next.image && prev?.image) next.image = prev.image;
}

function rowToProduct(row, categorySlug, lookup) {
  const name = clean(row["Product / Model"]);
  if (!name || /^developer note/i.test(name) || /^DEVELOPER NOTE/i.test(row.Category)) return null;

  const prev = lookup.byName.get(name.toLowerCase());
  const slug = prev?.slug || slugify(name);
  const sub = clean(row["Series / Subcategory"]) || null;
  const desc = clean(row["Short Description"]);
  const features = parseFeatures(row["Main Features"]);
  const colors = parseColors(row["Volume / Capacity"]) || parseColors(row["Shelves / Drawers"]);
  const specs = buildSpecs(row);
  const isProject = isProjectRow(row);

  const product = {
    slug,
    name,
    sub,
    desc,
    image: pickImage(name, slug, lookup),
    category: categorySlug,
    categories: [categorySlug],
    isProject,
    specs,
    features,
  };

  if (colors?.length) product.colors = colors;
  preserveExtras(prev, product);
  return product;
}

function mergeProduct(existing, incoming) {
  if (!existing) return incoming;
  const categories = [...new Set([...existing.categories, ...incoming.categories])];
  return {
    ...incoming,
    slug: existing.slug,
    name: existing.name,
    desc: existing.desc,
    sub: existing.sub,
    category: existing.category,
    image: existing.image ?? incoming.image,
    gallery: existing.gallery ?? incoming.gallery,
    colors: incoming.colors?.length ? incoming.colors : existing.colors,
    categories,
  };
}

function main() {
  const wb = XLSX.readFile(XLSX_PATH);
  const existing = loadExisting();
  const lookup = buildLookup(existing);
  const productsMap = new Map();

  for (const sheet of PRODUCT_SHEETS) {
    const categorySlug = SHEET_TO_SLUG[sheet];
    const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
    for (const row of rows) {
      const product = rowToProduct(row, categorySlug, lookup);
      if (!product) continue;
      const key = product.name.toLowerCase();
      productsMap.set(key, mergeProduct(productsMap.get(key), product));
    }
  }

  // Sort: category order then name
  const categoryOrder = Object.values(SHEET_TO_SLUG);
  const products = [...productsMap.values()].sort((a, b) => {
    const ai = categoryOrder.indexOf(a.category);
    const bi = categoryOrder.indexOf(b.category);
    if (ai !== bi) return ai - bi;
    return a.name.localeCompare(b.name, undefined, { numeric: true });
  });

  fs.writeFileSync(OUT_PATH, `${JSON.stringify(products, null, 2)}\n`, "utf8");

  const summary = {
    total: products.length,
    byCategory: {},
    noImage: products.filter((p) => !p.image).map((p) => p.name),
    project: products.filter((p) => p.isProject).length,
  };
  for (const p of products) {
    summary.byCategory[p.category] = (summary.byCategory[p.category] || 0) + 1;
  }

  console.log(JSON.stringify(summary, null, 2));
}

main();
