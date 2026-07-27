#!/usr/bin/env python3
"""Import the "website minor adjustments" photo drop into the product catalog.

Source: _minor-adjustments-import/website minor adjustments/
Output: public/images/products/<slug>-NN.<ext>  + gallery/image fields in
        content/products.json

Each product below lists its gallery in display order. The first entry is the
primary image. An entry starting with "/" is an image already in public/ that
we reuse as-is (the drop re-sent a number of photos the site already had);
anything else is a path inside the import folder that gets resized/re-encoded.

Sources with transparency become WEBP (the cut-outs sit on the page background);
opaque sources become JPEG. Longest side is capped at MAX_SIDE, matching
scripts/compress-images.py.
"""

import json
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "_minor-adjustments-import" / "website minor adjustments"
DEST = ROOT / "public" / "images" / "products"
PRODUCTS = ROOT / "content" / "products.json"

MAX_SIDE = 1600
JPEG_QUALITY = 82
WEBP_QUALITY = 82

# slug -> gallery in display order; entry 0 is the primary image.
MANIFEST: dict[str, list[str]] = {
    # --- SA1600 series (fire-resistant) ------------------------------------
    # Existing primaries are good closed 3/4 cut-outs; keep them and add the
    # rest of the shoot: front, other angles, keypad detail, open, interior.
    "sa1601e": [
        "/images/products/sa1601e.png",
        "1600/SA1601/SA1601E(2).png",
        "1600/SA1601/SA1601E(11).png",
        "1600/SA1601/SA1601E(4).png",
        "1600/SA1601/SA1601E(5).png",
        "1600/SA1601/SA1601E(1).png",
        "1600/SA1601/SA1601E(10).png",
        "1600/SA1601/SA1601E(3).png",
        "1600/SA1601/SA1601E(6).png",
        "1600/SA1601/SA1601E(7).png",
        "1600/SA1601/SA1601E(8).png",
        "1600/SA1601/SA1601E(9).png",
    ],
    "sa1602e": [
        "/images/products/sa1602e.png",
        "1600/SA1602/SA1602E(11).png",
        "1600/SA1602/SA1602E(4).png",
        "1600/SA1602/SA1602E(2).png",
        "1600/SA1602/SA1602E(1).png",
        "1600/SA1602/SA1602E(3).png",
        "1600/SA1602/SA1602E(6).png",
        "1600/SA1602/SA1602E(5).png",
        "1600/SA1602/SA1602E(10).png",
        "1600/SA1602/SA1602E(9).png",
        "1600/SA1602/SA1602E(8).png",
        "1600/SA1602/SA1602E(7).png",
    ],
    "sa1603e": [
        "/images/products/sa1603e.png",
        "1600/SA1603/SA1603E(1).png",
        "1600/SA1603/SA1603E(3).png",
        "1600/SA1603/SA1603E(2).png",
        "1600/SA1603/SA1603E(5).png",
        "1600/SA1603/SA1603E(4).png",
        "1600/SA1603/SA1603E(7).png",
        "1600/SA1603/SA1603E(8).png",
        "1600/SA1603/SA1603E(6).png",
        "1600/SA1603/SA1603E(9).png",
    ],
    # --- SA2600 series (fire-resistant) ------------------------------------
    # SA2601/SA2602 currently lead with an open-door shot; promote a closed
    # 3/4 view so the catalog grid reads consistently. sa2603 already does.
    "sa2601": [
        "2600/SA2601/SA2601 (7).png",
        "2600/SA2601/SA2601 (1).jpg",
        "2600/SA2601/SA2601 (2).png",
        "/images/products/sa2601.jpg",
        "2600/SA2601/SA2601 (3).jpg",
        "2600/SA2601/SA2601 (4).jpg",
        "2600/SA2601/SA2601 (8).jpg",
        "2600/SA2601/SA2601 (6).jpg",
    ],
    "sa2602": [
        "2600/SA2602/SA2602(2).jpg",
        "2600/SA2602/SA2602 (1) .jpg",
        "2600/SA2602/SA2602(4).jpg",
        "/images/products/sa2602.jpg",
        "2600/SA2602/SA2602 OPEN(1).jpg",
        "2600/SA2602/SA2602 OPEN (3).jpg",
        "2600/SA2602/SA2602 OPEN (2).jpg",
    ],
    "sa2603": [
        "/images/products/sa2603.jpg",
        "2600/SA2603/SA2603(2).jpg",
        "2600/SA2603/SA2603F(4).jpg",
        "2600/SA2603/SA2603(3).jpg",
        "2600/SA2603/SA2603 OPEN (1).jpg",
        "2600/SA2603/SA2603 OPEN (2).jpg",
        "2600/SA2603/SA2603 OPEN (3).jpg",
    ],
    # --- Smart safes (600 / 800 / 1000 series) -----------------------------
    "s601e": [
        "/images/products/s601e.png",
        "smart safes/S601E.png",
        "smart safes/S601LE_03A.png",
    ],
    "s602el": [
        "/images/products/s602el.png",
        "smart safes/S602LE.png",
        "smart safes/S602LE_03A.png",
    ],
    "s603el": [
        "/images/products/s603el.png",
        "smart safes/S603LE.png",
        "smart safes/S603LE_03A.png",
    ],
    "s801le": [
        "/images/products/s801le.png",
        "smart safes/S801LE.png",
        "smart safes/S801LE open.png",
    ],
    "s802l": [
        "/images/products/s802l.png",
        "smart safes/S802LE(1).png",
        "smart safes/S802LE(2).png",
        "smart safes/S802LE_03A.png",
    ],
    "s803e": [
        "/images/products/s803e.png",
        "smart safes/S803E.png",
        "smart safes/S803E open.png",
        "smart safes/S803LE_03A.png",
    ],
    "s1002le": [
        "/images/products/s1002le.png",
        "smart safes/S1002le open.png",
    ],
    "s1003le": [
        "/images/products/s1003le.png",
        "smart safes/S1003le closed.png",
        "smart safes/s1003 open.png",
    ],
    "s1005le": [
        "/images/products/s1005le.png",
        "smart safes/s1005 closed.png",
        "smart safes/S1005le open.png",
    ],
    # --- Hotel safes -------------------------------------------------------
    # "hotel safe (H0402M).jpeg" and "hotel safe .jpeg" are re-sends of photos
    # already in public/, so they are reused rather than re-imported.
    "h0402m": [
        "/images/products/WhatsApp-Image-2023-12-02-at-12.15.07.jpeg",
        "/images/products/h0402m.jpeg",
        "hotel safes/hotel safe 4.jpeg",
        "hotel safes/hotel safe 5.jpeg",
        "hotel safes/hotel safe 3.jpeg",
    ],
    # --- Cash handling -----------------------------------------------------
    # Lead with the clean product shot instead of a marketing slide; the
    # feature slides follow as gallery frames.
    "bcs-160": [
        "money counter (bcs 160)/SALVADO BCS-160 (1).webp",
        "/images/products/bcs-160-3.jpeg",
        "money counter (bcs 160)/3_37c2cca9-eb7c-429d-9927-4f3fe6fce0ce.webp",
        "money counter (bcs 160)/4f0fb346-64d0-4838-be72-02804a468471.8822e3f265256b55725819ff11c0466e.webp",
        "money counter (bcs 160)/57c1971e-3bf9-40a5-bf3d-106017d264a2.c3ff5d1478d6acf1e30880413cac2b20.webp",
        "money counter (bcs 160)/5_b01f8290-a727-435f-9b29-db085d092ba0.webp",
        "money counter (bcs 160)/d0fd024c-d10e-43df-918a-dd2faa3cc00d.af2af3e5350e9055917c44bd44fd1c90.webp",
        "/images/products/bcs-160-2.webp",
        "/images/products/bcs-160.webp",
        "money counter (bcs 160)/7225bfe0-eba2-445a-8ea7-37a17b0d8b4a.5ecce5419ff90eedd49a371caf57644e.webp",
        "money counter (bcs 160)/e9e0cbc0-214e-43cb-9b3d-0b17a0bf7c18.3fa194c94c3dbece5b77306286ddede6.webp",
        "money counter (bcs 160)/97a34087-5231-41b9-8293-c60f947383bb.2aae4c0715e3d00a3ba374ab6797422b.webp",
        "money counter (bcs 160)/352e1757-0a8e-4f76-b21b-9e2420f20643.aeac18fac4174bb747538103a6a9ca62.webp",
    ],
    # --- Luxury watch storage ---------------------------------------------
    # Each variant gains its open-case counterpart.
    "pochette-4-black-tiffany-blue": [
        "/images/products/220510_Pochette_Noir-Bleu_Closed__31708.jpeg",
        "luxury items/Pochette Black_Tiffany Blue/220510_Pochette_Noir-Bleu_Open__60573.jpeg",
    ],
    "pochette-4-blue-off-white": [
        "/images/products/220510_Pochette_Bleu-Blanc_Closed__72135.jpeg",
        "luxury items/Pochette Blue_OFF White/220510_Pochette_Bleu-Blanc_Open__96930.jpeg",
    ],
    "pochette-4-grey-orange": [
        "/images/products/220510_Pochette_Gris-Orange_Closed__93227.jpeg",
        "luxury items/Pochette Orange + Grey/220510_Pochette_Gris-Orange_Open__63800.jpeg",
    ],
    "valigetta-4-black": [
        "/images/products/Valigetta_4_Black_1__83833.webp",
        "luxury items/Valigetta 4 Black/Valigetta_4_Black_2__05530.webp",
    ],
    "valigetta-4-black-tiffany-blue": [
        "/images/products/220510_Valigetta4_Noir-Bleu_Closed__02128.jpeg",
        "luxury items/Valigetta 4 Black_ Tiffany Blue/220510_Valigetta4_Noir-Bleu_Open__28451.jpeg",
    ],
    "valigetta-4-blue-off-white": [
        "/images/products/220510_Valigetta4_Bleu-Blanc_Closed__48115.jpeg",
        "luxury items/Valigetta 4 Black_ OFF White/220510_Valigetta4_Bleu-Blanc_Open__04038.jpeg",
    ],
    # Not imported, both are re-sends of images the site already serves:
    #   hotel safes/S-23.png                 -> s-23.png / s-23.jpg
    #   luxury items/.../Pochette_Gris-Vert_Open -> pochette-4-grey-green primary
}


def has_alpha(im: Image.Image) -> bool:
    if im.mode in ("RGBA", "LA"):
        return im.getchannel("A").getextrema()[0] < 250
    if im.mode == "P" and "transparency" in im.info:
        return im.convert("RGBA").getchannel("A").getextrema()[0] < 250
    return False


def resize(im: Image.Image) -> Image.Image:
    longest = max(im.size)
    if longest <= MAX_SIDE:
        return im
    scale = MAX_SIDE / longest
    return im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)


def convert(src: Path, slug: str, position: int) -> str:
    """Write a resized copy into public/images/products, return its web path."""
    with Image.open(src) as im:
        im.load()
        alpha = has_alpha(im)
        im = resize(im)
        if alpha:
            out = DEST / f"{slug}-{position:02d}.webp"
            im.convert("RGBA").save(out, "WEBP", quality=WEBP_QUALITY, method=6)
        else:
            out = DEST / f"{slug}-{position:02d}.jpg"
            im.convert("RGB").save(out, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    return f"/images/products/{out.name}"


def main() -> None:
    products = json.loads(PRODUCTS.read_text(encoding="utf-8"))
    by_slug = {p["slug"]: p for p in products}

    missing = [s for s in MANIFEST if s not in by_slug]
    if missing:
        raise SystemExit(f"unknown slugs in manifest: {missing}")

    written = 0
    for slug, entries in MANIFEST.items():
        gallery: list[str] = []
        for position, entry in enumerate(entries, start=1):
            if entry.startswith("/"):
                existing = ROOT / "public" / entry.lstrip("/")
                if not existing.exists():
                    raise SystemExit(f"{slug}: missing existing image {entry}")
                gallery.append(entry)
                continue
            src = SRC / entry
            if not src.exists():
                raise SystemExit(f"{slug}: missing source {entry}")
            gallery.append(convert(src, slug, position))
            written += 1

        product = by_slug[slug]
        product["image"] = gallery[0]
        product["gallery"] = gallery
        print(f"{slug:32} primary={gallery[0]:44} gallery={len(gallery)}")

    PRODUCTS.write_text(json.dumps(products, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"\n{written} images written to {DEST.relative_to(ROOT)}")
    print(f"{len(MANIFEST)} products updated in {PRODUCTS.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
