#!/usr/bin/env python3
"""Import the November 2026 product drop: the Cobra Series and three S Series safes.

Source: _nov2026-import/website new products (nov 2026)/
        (9 photos + Salvado_New_Safes_Website.xlsx)
Output: public/images/products/<slug>.jpg
        content/categories.json  (new Heavy-Duty Fire-Resistant Safes category)
        content/products.json    (9 new products)

The spreadsheet is a vertical key/value block per product. Its first row carries
the brief: create a Heavy-Duty Fire-Resistant Safes category for the Cobra
Series, and add S-30, S-35 and S-69 to the existing Fire-Resistant Safes
category under S Series.

Model names drop the "Salvado " prefix the sheet uses, so the new entries read
like the rest of the catalogue (S-61, SA1601E) and S-30 sorts beside S-31.
Dimensions are converted from the sheet's centimetres to the millimetres the
existing `external` spec uses, in the established height x width x depth order.

Re-running is safe: it rewrites the same files and skips products already added.
"""

import json
import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "_nov2026-import" / "website new products (nov 2026)"
XLSX = SRC / "Salvado_New_Safes_Website (2).xlsx"
DEST = ROOT / "public" / "images" / "products"
PRODUCTS = ROOT / "content" / "products.json"
CATEGORIES = ROOT / "content" / "categories.json"

MAX_SIDE = 1600
JPEG_QUALITY = 82

NEW_CATEGORY_SLUG = "heavy-duty-fire-resistant-safes"

# Sheet model name -> (display name, slug, photo file in the drop)
MODELS = {
    "Salvado Cobra SSTC-48": ("Cobra SSTC-48", "cobra-sstc-48", "Salvado_Cobra_SSTC-48.png"),
    "Salvado Cobra SSTC-57": ("Cobra SSTC-57", "cobra-sstc-57", "Salvado_Cobra_SSTC-57.png"),
    "Salvado Cobra SSTC-67": ("Cobra SSTC-67", "cobra-sstc-67", "Salvado_Cobra_SSTC-67.png"),
    "Salvado Cobra SSTC-97": ("Cobra SSTC-97", "cobra-sstc-97", "Salvado_Cobra_SSTC-97.png"),
    "Salvado Cobra SSTC-122": ("Cobra SSTC-122", "cobra-sstc-122", "Salvado_Cobra_SSTC-122.png"),
    "Salvado Cobra SSTC-152": ("Cobra SSTC-152", "cobra-sstc-152", "Salvado_Cobra_SSTC-152.png"),
    "Salvado S-30": ("S-30", "s-30", "S-30E.jpg"),
    "Salvado S-35": ("S-35", "s-35", "S-35EL.jpg"),
    "Salvado S-69": ("S-69", "s-69", "S-69E.jpg"),
}

CATEGORY_SLUGS = {
    "Heavy-Duty Fire-Resistant Safes": NEW_CATEGORY_SLUG,
    "Fire-Resistant Safes": "fire-resistant-safes",
}

NEW_CATEGORY = {
    "slug": NEW_CATEGORY_SLUG,
    "name": "Heavy-Duty Fire-Resistant Safes",
    "short": "Two-hour fire protection in a heavy, thick-walled body.",
    "intro": (
        "Heavy-duty fire-resistant safes from the Cobra Series, built with 55 mm door and body "
        "construction, UL-certified SECURAM electronic locking and gear-driven boltwork for premises "
        "that need two-hour fire protection alongside serious physical security."
    ),
    "protect": (
        "For businesses, offices, and homes storing documents, cash, jewellery, and valuables that "
        "need both fire protection and a heavy, attack-resistant body."
    ),
    "subs": ["Cobra Series"],
    "featured": True,
    "buyingGuide": [
        {
            "title": "Start with the fire rating",
            "body": "Every Cobra model is rated for two hours at 1010°C, so choose on capacity and placement rather than fire performance.",
        },
        {
            "title": "Plan for the weight",
            "body": "These safes run from 210 kg to 785 kg. Access routes, floor loading, and anchoring all need checking before delivery.",
        },
        {
            "title": "Match the interior to the contents",
            "body": "Shelving rises from one shelf on the SSTC-48 to four on the SSTC-152, and every model adds a lockable drawer and a hidden inner compartment.",
        },
    ],
    "faqs": [
        {
            "q": "How is this different from a standard fire-resistant safe?",
            "a": "Cobra models combine the same two-hour fire rating with a far heavier 55 mm body and door, gear-driven boltwork, and an anti-drill glass-plate relocking system.",
        },
        {
            "q": "What does the glass-plate relocking system do?",
            "a": "If the safe is attacked by drilling, a tempered glass plate breaks and releases independent relocking bolts, locking the door shut permanently until it is serviced.",
        },
        {
            "q": "Do you deliver and install them?",
            "a": "Yes. These safes are heavy and benefit from professional handling, placement, and anchoring. Salvado handles delivery and installation across Lebanon.",
        },
    ],
}


def parse_sheet(path: Path) -> list[dict]:
    """Read the vertical key/value sheet into one dict per product, in order."""
    ns = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
    rel_ns = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
    z = zipfile.ZipFile(path)

    shared = []
    if "xl/sharedStrings.xml" in z.namelist():
        for si in ET.fromstring(z.read("xl/sharedStrings.xml")).findall(f"{ns}si"):
            shared.append("".join(t.text or "" for t in si.iter(f"{ns}t")))

    wb = ET.fromstring(z.read("xl/workbook.xml"))
    rels = {r.get("Id"): r.get("Target") for r in ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))}
    sheet = next(wb.iter(f"{ns}sheet"))
    target = rels[sheet.get(f"{rel_ns}id")].lstrip("/")
    if not target.startswith("xl/"):
        target = "xl/" + target

    def col(ref: str) -> int:
        n = 0
        for ch in re.match(r"([A-Z]+)", ref).group(1):
            n = n * 26 + (ord(ch) - 64)
        return n - 1

    records: list[dict] = []
    current: dict | None = None
    for row in ET.fromstring(z.read(target)).iter(f"{ns}row"):
        cells: dict[int, str] = {}
        for c in row.findall(f"{ns}c"):
            v = c.find(f"{ns}v")
            inline = c.find(f"{ns}is")
            if c.get("t") == "s" and v is not None:
                val = shared[int(v.text)]
            elif inline is not None:
                val = "".join(t.text or "" for t in inline.iter(f"{ns}t"))
            elif v is not None:
                val = v.text
            else:
                continue
            cells[col(c.get("r"))] = (val or "").strip()
        if not cells:
            continue
        key, value = cells.get(0, ""), cells.get(1, "")
        if key == "Model":
            current = {"Model": value}
            records.append(current)
        elif current is not None and key:
            current[key] = value
    return records


def mm(cm: str) -> int:
    return round(float(cm) * 10)


def lower_first(text: str) -> str:
    """Open a feature line in lower case, but leave acronyms (UL, LCD) alone."""
    if len(text) > 1 and text[0].isupper() and text[1].isupper():
        return text
    return text[0].lower() + text[1:] if text else text


def shelf_phrase(count: str, shelf_type: str) -> str:
    """"1" + "Metal, height-adjustable" -> "1 height-adjustable metal shelf"."""
    parts = [p.strip().lower() for p in (shelf_type or "metal").split(",") if p.strip()]
    descriptor = " ".join(reversed(parts))
    noun = "shelf" if count == "1" else "shelves"
    return f"{count} {descriptor} {noun}"


def build_features(rec: dict) -> list[str]:
    """Assemble a feature list in the order the rest of the catalogue uses."""
    feats: list[str] = []
    if rec.get("Fire resistance"):
        feats.append(f"{rec['Fire resistance'].replace('2 hours', '2-hour fire rating')}")
    if rec.get("Lock / access"):
        feats.append(lower_first(rec["Lock / access"]))
    if rec.get("Main keys supplied"):
        feats.append(f"{rec['Main keys supplied']} main keys supplied")
    if rec.get("Compartment keys supplied"):
        feats.append(f"{rec['Compartment keys supplied']} compartment keys supplied")

    door, body = rec.get("Door thickness (mm)"), rec.get("Body thickness (mm)")
    if door and body:
        feats.append(f"{door} mm door and {body} mm body")

    for line in (rec.get("Additional features") or "").splitlines():
        line = line.strip()
        if line:
            feats.append(lower_first(line))

    shelves = rec.get("Number of shelves")
    if shelves and shelves != "0":
        feats.append(shelf_phrase(shelves, rec.get("Shelf type")))
    drawer = rec.get("Drawer / compartment")
    if drawer:
        # "Upper internal organiser drawer only" is a capacity note on the sheet;
        # as a feature line the trailing qualifier just reads oddly.
        feats.append(lower_first(re.sub(r"\s+only$", "", drawer)))
    if rec.get("Hidden inner compartment") == "Yes":
        feats.append("hidden inner compartment")

    if rec.get("Depth measurement"):
        note = "exterior depth excludes the handle"
        if rec.get("Handle projection (cm)"):
            note += f" ({rec['Handle projection (cm)']} cm projection)"
        feats.append(note)
    if rec.get("Warranty (years)"):
        feats.append(f"{rec['Warranty (years)']}-year warranty")
    return feats


def build_specs(rec: dict) -> dict:
    specs: dict[str, str] = {}
    h, w, d = rec.get("Exterior height (cm)"), rec.get("Exterior width (cm)"), rec.get("Exterior depth (cm)")
    if h and w and d:
        specs["external"] = f"{mm(h)} x {mm(w)} x {mm(d)}"
    if rec.get("Weight (kg)"):
        specs["weight"] = rec["Weight (kg)"]
    shelves = rec.get("Number of shelves")
    if shelves and shelves != "0":
        specs["shelves"] = shelf_phrase(shelves, rec.get("Shelf type"))
    if rec.get("Lock / access"):
        specs["lock"] = rec["Lock / access"]
    if rec.get("Fire resistance"):
        specs["fireRating"] = rec["Fire resistance"]
    if rec.get("Warranty (years)"):
        specs["warranty"] = f"{rec['Warranty (years)']} years"
    return specs


def model_number(slug: str) -> int:
    """Trailing model number, used to keep a series in numeric order."""
    nums = re.findall(r"\d+", slug)
    return int(nums[-1]) if nums else 0


def insert_at(products: list[dict], new: dict) -> int:
    """Index that keeps an existing series block in model-number order.

    The S Series runs S-31, S-37, S-45 ... in the file, and the catalogue
    renders products in file order, so appending would strand S-30 after S-170.
    New products in a series the file does not have yet go to the end.
    """
    peers = [i for i, p in enumerate(products)
             if p.get("sub") == new["sub"] and p.get("category") == new["category"]]
    if not peers:
        return len(products)
    key = model_number(new["slug"])
    for i in peers:
        if model_number(products[i]["slug"]) > key:
            return i
    return peers[-1] + 1


def convert(src: Path, slug: str) -> str:
    out = DEST / f"{slug}.jpg"
    with Image.open(src) as im:
        im.load()
        longest = max(im.size)
        if longest > MAX_SIDE:
            scale = MAX_SIDE / longest
            im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
        im.convert("RGB").save(out, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    return f"/images/products/{out.name}"


def main() -> None:
    records = parse_sheet(XLSX)
    unknown = [r["Model"] for r in records if r["Model"] not in MODELS]
    if unknown:
        sys.exit(f"sheet has models not in MODELS: {unknown}")

    products = json.loads(PRODUCTS.read_text(encoding="utf-8"))
    categories = json.loads(CATEGORIES.read_text(encoding="utf-8"))
    existing = {p["slug"] for p in products}

    # Add the new category directly after the related Fire-Resistant Safes entry.
    if not any(c["slug"] == NEW_CATEGORY_SLUG for c in categories):
        at = next(i for i, c in enumerate(categories) if c["slug"] == "fire-resistant-safes")
        categories.insert(at + 1, NEW_CATEGORY)
        print(f"category added: {NEW_CATEGORY_SLUG}")

    added = 0
    for rec in records:
        name, slug, photo = MODELS[rec["Model"]]
        if slug in existing:
            print(f"{slug:16} already present, skipped")
            continue
        src = SRC / photo
        if not src.exists():
            sys.exit(f"{slug}: missing photo {photo}")
        category = CATEGORY_SLUGS[rec["Website category"]]
        product = {
            "slug": slug,
            "name": name,
            "sub": rec["Series"],
            "desc": rec["Website description"],
            "image": convert(src, slug),
            "category": category,
            "categories": [category],
            "isProject": False,
            "specs": build_specs(rec),
            "features": build_features(rec),
        }
        at = insert_at(products, product)
        products.insert(at, product)
        added += 1
        print(f"{slug:16} {category:32} at #{at:<4} {product['image']}")

    # Each file keeps its own trailing-newline convention so the diff stays minimal:
    # products.json ends with one, categories.json does not.
    PRODUCTS.write_text(json.dumps(products, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    CATEGORIES.write_text(json.dumps(categories, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\n{added} products added, {len(products)} total")


if __name__ == "__main__":
    main()
