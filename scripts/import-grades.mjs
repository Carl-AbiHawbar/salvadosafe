import fs from "fs";
import path from "path";
import XLSX from "xlsx";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const XLSX_PATH =
  process.argv[2] ||
  "c:/Users/carla/Downloads/Salvado_Product_Data_Handover_FINAL_VERIFIED (2).xlsx";
const OUT_PATH = path.join(ROOT, "content/grades.json");
const PRODUCTS_PATH = path.join(ROOT, "content/products.json");

const GRADE_SLUGS = {
  "Grade I": "grade-i",
  "Grade II": "grade-ii",
  "Grade III": "grade-iii",
  "Grade IV": "grade-iv",
  "Grade V": "grade-v",
};

function clean(val) {
  if (val === undefined || val === null) return "";
  return String(val).trim();
}

function parseList(raw) {
  if (!raw) return [];
  return String(raw)
    .split(/[;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildSpecs(row) {
  const specs = {};
  const ext = clean(row["External Size (H x W x D mm)"]);
  const int = clean(row["Internal Size (H x W x D mm)"]);
  const weight = clean(row["Weight (kg)"]);
  const vol = clean(row["Volume / Capacity"]);
  const shelves = clean(row["Shelves / Drawers"]);
  const bolts = clean(row["Bolts"]);
  const lock = clean(row["Lock / Access"]);
  const warranty = clean(row["Warranty"]);

  if (ext) specs.external = ext;
  if (int) specs.internal = int;
  if (weight) specs.weight = String(weight);
  if (vol) specs.volume = vol;
  if (shelves && !/color options/i.test(shelves)) specs.shelves = shelves;
  if (bolts) specs.bolts = String(bolts);
  if (lock) specs.lock = lock;
  if (warranty) specs.warranty = warranty;
  return specs;
}

function modelNames(raw) {
  return clean(raw)
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function pickImage(modelNames, products) {
  const byName = new Map(products.map((p) => [p.name.toLowerCase(), p]));
  for (const name of modelNames) {
    const p = byName.get(name.toLowerCase());
    if (p?.image) return p.image;
  }
  return "/images/products/safe-1.jpg";
}

function filterFeatures(gradeLabel, features) {
  if (gradeLabel !== "Grade II") return features;
  return features.filter((f) => !/fire/i.test(f));
}

function filterTechnicalFeatures(gradeLabel, items) {
  if (gradeLabel !== "Grade II") return items;
  return items.filter((f) => !/fire/i.test(f));
}

function main() {
  const wb = XLSX.readFile(XLSX_PATH);
  const plan = XLSX.utils.sheet_to_json(wb.Sheets["High-Security Page Plan"]);
  const rows = XLSX.utils.sheet_to_json(wb.Sheets["High-Security Safes"]);
  const products = fs.existsSync(PRODUCTS_PATH)
    ? JSON.parse(fs.readFileSync(PRODUCTS_PATH, "utf8"))
    : [];

  const rowByName = new Map();
  for (const row of rows) {
    const name = clean(row["Product / Model"]);
    if (name) rowByName.set(name.toLowerCase(), row);
  }

  const grades = plan.map((entry) => {
    const h1 = clean(entry["Page / H1"]);
    const gradeMatch = h1.match(/Grade (IV|III|II|I|V)\b/i);
    const gradeLabel = gradeMatch ? `Grade ${gradeMatch[1].toUpperCase()}` : "";
    const slug = GRADE_SLUGS[gradeLabel];
    const models = modelNames(entry["Models included as size table"]);

    const modelRows = models.map((name) => {
      const row = rowByName.get(name.toLowerCase());
      if (!row) {
        console.warn(`Missing model row for ${name} (${gradeLabel})`);
        return { name, specs: {}, features: [] };
      }
      const features = filterFeatures(gradeLabel, parseList(row["Main Features"]));
      return {
        name,
        specs: buildSpecs(row),
        features,
      };
    });

    const technicalFeatures = filterTechnicalFeatures(
      gradeLabel,
      parseList(entry["Shared technical features"])
    );

    return {
      slug,
      grade: gradeLabel,
      h1,
      series: clean(entry.Series),
      seoFocus: clean(entry["SEO focus"]),
      desc: clean(entry["Shared description"]),
      technicalFeatures,
      cta: clean(entry["CTA / Lead action"]),
      developerNote: clean(entry["Developer note"]),
      image: pickImage(models, products),
      models: modelRows,
    };
  });

  fs.writeFileSync(OUT_PATH, `${JSON.stringify(grades, null, 2)}\n`, "utf8");
  console.log(
    JSON.stringify(
      grades.map((g) => ({ slug: g.slug, grade: g.grade, models: g.models.length })),
      null,
      2
    )
  );
}

main();
