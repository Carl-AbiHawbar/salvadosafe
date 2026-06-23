#!/usr/bin/env python3
"""Import high-quality images from the client zip into public/images and update content JSON."""

from __future__ import annotations

import json
import os
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IMPORT_ROOT = ROOT / "_import" / "new website"
BRAND_DIR = ROOT / "public" / "images" / "brand"
PRODUCTS_DIR = ROOT / "public" / "images" / "products"
CONTENT = ROOT / "content"

# slug -> relative path under IMPORT_ROOT
BRAND_MAP: dict[str, str] = {
    "hero-slide-1.jpg": r"home page\slider\high security safe slider (1).JPG",
    "hero-slide-2.png": r"home page\slider\cuatom luxury safe slider (2).png",
    "hero-slide-3.jpg": r"home page\slider\Grade 1 safe slider (3).JPG",
    "hero-slide-4.jpg": r"home page\slider\Best Mone4y counter slider (4).JPG",
    "showroom-1.png": r"home page\showroom\salvado zalka showroom 1 .png",
    "showroom-4.jpg": r"home page\showroom\salvado zalka showroom 4.jpg",
    "showroom-5.jpg": r"home page\showroom\salvado zalka showroom 5.jpg",
    "service-vault-door.png": r"services\salvado vault door installation.png",
    "service-maintenance.jpg": r"services\salvado safe repair and maintenance.JPG",
    "service-consultation.png": r"services\salvado safe consultation.PNG",
    "service-installation.png": r"services\salvado safe installation and delivery.PNG",
    "about-hero.jpg": r"home page\showroom\salvado zalka showroom 5.jpg",
    "about-showroom.jpg": r"home page\showroom\salvado zalka showroom 4.jpg",
    "about-team.jpg": r"services\salvado safe consultation.PNG",
    "contact-hero.jpg": r"home page\showroom\salvado zalka showroom 1 .png",
    "contact-showroom.jpg": r"WhatsApp Image 2024-04-30 at 14.30.00_0d6228f3.jpg",
    "instagram-showroom.jpg": r"home page\showroom\salvado zalka showroom 5.jpg",
    "grade-i.png": r"products\high security\grade 1(2).png",
    "grade-ii.png": r"products\high security\grade 2 (1).png",
    "grade-iii.png": r"products\high security\grade 3 (1).png",
    "grade-iv.png": r"products\high security\grade 4.png",
    "grade-v.png": r"products\high security\grade 5.png",
}

PRODUCT_MAP: dict[str, str] = {
    # Fire-rated S-series
    "s-31e.jpg": r"products\fireproof\s-series\S-31E.jpg",
    "s-37el.jpg": r"products\fireproof\s-series\S-37EL.jpg",
    "s-45e.jpeg": r"products\fireproof\s-series\S-45E.jpeg",
    "s-49e.png": r"products\fireproof\s-series\S-49E.png",
    "s-52e.png": r"products\fireproof\s-series\s-52E.png",
    "s-56e.jpg": r"products\fireproof\s-series\S-56E.jpg",
    "s-59e.jpg": r"products\fireproof\s-series\S-59E.jpg",
    "s-61e.jpg": r"products\fireproof\s-series\S-61E.jpg",
    "s-65e.jpg": r"products\fireproof\s-series\S-65E.jpg",
    "s-76el.jpg": r"products\fireproof\s-series\S-76EL.jpg",
    "s-87e.jpg": r"products\fireproof\s-series\S-87E.jpg",
    "s-100e.png": r"products\fireproof\s-series\S-100E.png",
    "s-120e.png": r"products\fireproof\s-series\S-120E.png",
    "s-140ei-open.png": r"products\fireproof\s-series\S-139EI OPEN.png",
    "s-160e.png": r"products\fireproof\s-series\S-159E.png",
    "s-167e.png": r"products\fireproof\s-series\S-167E.png",
    # SLX
    "slx-28.jpeg": r"products\fireproof\slx\SLX-28.jpeg",
    "slx-29.jpeg": r"products\fireproof\slx\SLX-29.jpeg",
    "slx-36.jpeg": r"products\fireproof\slx\SLX-36.jpeg",
    "slx-50.jpeg": r"products\fireproof\slx\SLX-50.jpeg",
    # 1600 / 2600
    "sa1601e.png": r"products\fireproof\1600\SA1601E(10).png",
    "sa1602e.png": r"products\fireproof\1600\SA1602E(5).png",
    "sa1603e.png": r"products\fireproof\1600\SA1603E(5).png",
    "sa2601.jpg": r"products\fireproof\2600\SA2601 (5).jpg",
    "sa2602.jpg": r"products\fireproof\2600\SA2602(3).jpg",
    "sa2603.jpg": r"products\fireproof\2600\SA2603.jpg",
    # Smart safes
    "s601e.png": r"products\smart safes\S601E closed.png",
    "s602el.png": r"products\smart safes\S602Le closed.png",
    "s603el.png": r"products\smart safes\S603LE closed.png",
    "s801le.png": r"products\smart safes\S801LE.png",
    "s802l.png": r"products\smart safes\S802LE(1).png",
    "s803e.png": r"products\smart safes\S803E.png",
    "s1002le.png": r"products\smart safes\s1002le closed.png",
    "s1003le.png": r"products\smart safes\S1003le closed.png",
    "s1005le.png": r"products\smart safes\s1005 closed.png",
    # Hotel / home
    "s-23.png": r"products\hotel safes\S-23.png",
    "h0402m.jpeg": r"products\hotel safes\hotel safe (H0402M).jpeg",
    # Cash handling
    "dep800l.png": r"products\cash handling\DEP800L.png",
    "sub800l.png": r"products\cash handling\SUB800L.png",
    "bcs-160.webp": r"products\cash handling\money counter (bcs 160)\bcs160sorting-1664517298886_1200x.webp",
    "bcs-160-2.webp": r"products\cash handling\money counter (bcs 160)\non-stop-money-sorter-BCS160.webp",
    "bcs-160-3.jpeg": r"products\cash handling\money counter (bcs 160)\81XaY9shuwL.jpeg",
    # Gun safes
    "gs-5.jpeg": r"products\gun safes\rifle\GS5\Fingerprint Gun safe (GS5) 4.jpeg",
    "gs-10-close.jpg": r"products\gun safes\rifle\GS-10-CLOSE.jpg",
    "gs-14.png": r"products\gun safes\rifle\GS-14.png",
    "gs-24.jpg": r"products\gun safes\rifle\GS-24.jpg",
    "gs-30-open.jpeg": r"products\gun safes\rifle\GS-30-OPEN.jpeg",
    "gs-36-open.jpg": r"products\gun safes\rifle\GS-36-OPEN.jpg",
    "ps.jpg": r"products\gun safes\pistol\PS\Pistol safe PS.jpg",
    "ps2.png": r"products\gun safes\pistol\PS2\1.png",
    # Luxury
    "custom-luxury-safe.jpg": r"products\luxury\custom luxury safe\IMG_2497.jpg",
    "custom-luxury-safe-2.jpg": r"products\luxury\custom luxury safe\IMG_2498.jpg",
    "custom-luxury-ilux.png": r"products\luxury\custom luxury safe\ilux (10).png",
    "ar-5e-ilux-open.png": r"products\luxury\custom luxury safe\AR-5E ILUX_OPEN.png",
    "double-racing-red.webp": r"products\luxury\swiss kubik\swiss kubik double racing red.webp",
    # Key boxes
    "kp50.png": r"products\key box\KP 50 Strong key box.png",
    "kp104.png": r"products\key box\KP 104 Strong key box 2.png",
}

# product slug -> primary image filename in PRODUCTS_DIR (without path)
SLUG_PRIMARY: dict[str, str] = {
    "s-31": "s-31e.jpg",
    "s-37": "s-37el.jpg",
    "s-45": "s-45e.jpeg",
    "s-49": "s-49e.png",
    "s-52": "s-52e.png",
    "s-56": "s-56e.jpg",
    "s-59": "s-59e.jpg",
    "s-61": "s-61e.jpg",
    "s-65": "s-65e.jpg",
    "s-76": "s-76el.jpg",
    "s-87": "s-87e.jpg",
    "s-100": "s-100e.png",
    "s-120": "s-120e.png",
    "s-140": "s-140ei-open.png",
    "s-160": "s-160e.png",
    "s-167": "s-167e.png",
    "slx-28": "slx-28.jpeg",
    "slx-29": "slx-29.jpeg",
    "slx-36": "slx-36.jpeg",
    "slx-50": "slx-50.jpeg",
    "sa1601e": "sa1601e.png",
    "sa1602e": "sa1602e.png",
    "sa1603e": "sa1603e.png",
    "sa2601": "sa2601.jpg",
    "sa2602": "sa2602.jpg",
    "sa2603": "sa2603.jpg",
    "s601e": "s601e.png",
    "s602el": "s602el.png",
    "s603el": "s603el.png",
    "s801le": "s801le.png",
    "s802l": "s802l.png",
    "s803e": "s803e.png",
    "s1002le": "s1002le.png",
    "s1003le": "s1003le.png",
    "s1005le": "s1005le.png",
    "s-23": "s-23.png",
    "h0402m": "h0402m.jpeg",
    "dep800l": "dep800l.png",
    "sub800l": "sub800l.png",
    "bcs-160": "bcs-160.webp",
    "gs-5": "gs-5.jpeg",
    "gs-10": "gs-10-close.jpg",
    "gs-14": "gs-14.png",
    "gs-24": "gs-24.jpg",
    "gs-30": "gs-30-open.jpeg",
    "gs-36": "gs-36-open.jpg",
    "ps": "ps.jpg",
    "ps2": "ps2.png",
    "custom-luxury-safe": "custom-luxury-ilux.png",
    "double-racing-red": "double-racing-red.webp",
    "kp50": "kp50.png",
    "kp104": "kp104.png",
    "plus-p30-money-counter": "bcs-160-3.jpeg",
    "salvado-heavy-duty-money-counter": "bcs-160.webp",
}

SLUG_GALLERY: dict[str, list[str]] = {
    "custom-luxury-safe": [
        "custom-luxury-ilux.png",
        "custom-luxury-safe.jpg",
        "custom-luxury-safe-2.jpg",
        "ar-5e-ilux-open.png",
    ],
    "bcs-160": ["bcs-160.webp", "bcs-160-2.webp", "bcs-160-3.jpeg"],
    "gs-5": ["gs-5.jpeg"],
    "gs-30": ["gs-30-open.jpeg"],
    "gs-36": ["gs-36-open.jpg"],
    "ps2": ["ps2.png"],
    "s1002le": ["s1002le.png"],
    "s1003le": ["s1003le.png"],
    "s1005le": ["s1005le.png"],
}

GRADE_IMAGE: dict[str, str] = {
    "grade-i": "grade-i.png",
    "grade-ii": "grade-ii.png",
    "grade-iii": "grade-iii.png",
    "grade-iv": "grade-iv.png",
    "grade-v": "grade-v.png",
}


def copy_file(src_rel: str, dest: Path) -> None:
    src = IMPORT_ROOT / src_rel
    if not src.exists():
        raise FileNotFoundError(f"Missing source: {src}")
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)


def img_url(filename: str, *, brand: bool = False) -> str:
    base = "/images/brand" if brand else "/images/products"
    return f"{base}/{filename}"


def import_assets() -> None:
    BRAND_DIR.mkdir(parents=True, exist_ok=True)
    PRODUCTS_DIR.mkdir(parents=True, exist_ok=True)

    for dest_name, src_rel in BRAND_MAP.items():
        copy_file(src_rel, BRAND_DIR / dest_name)

    for dest_name, src_rel in PRODUCT_MAP.items():
        copy_file(src_rel, PRODUCTS_DIR / dest_name)


GRADE_SUB_IMAGE: dict[str, str] = {
    "Grade I": "grade-i.png",
    "Grade II": "grade-ii.png",
    "Grade III": "grade-iii.png",
    "Grade IV": "grade-iv.png",
    "Grade V": "grade-v.png",
}


def update_high_security_products(products: list[dict]) -> None:
    for product in products:
        sub = product.get("sub")
        if sub in GRADE_SUB_IMAGE and product.get("category") == "high-security-safes":
            product["image"] = img_url(GRADE_SUB_IMAGE[sub], brand=True)


def update_products() -> None:
    path = CONTENT / "products.json"
    products: list[dict] = json.loads(path.read_text(encoding="utf-8"))
    by_slug = {p["slug"]: p for p in products}

    # Add BCS-160 if missing
    if "bcs-160" not in by_slug:
        products.append(
            {
                "slug": "bcs-160",
                "name": "BCS-160 Money Counter",
                "sub": "Money Counters",
                "desc": "Professional two-pocket banknote counter and sorter with reject pocket, built for businesses that need fast, accurate cash handling.",
                "image": img_url("bcs-160.webp"),
                "category": "cash-handling-solutions",
                "categories": ["cash-handling-solutions"],
                "isProject": False,
                "specs": {
                    "external": "Professional desk unit",
                    "volume": "High-speed counting with sort and reject pockets",
                    "lock": "Counterfeit detection / value counting",
                },
                "features": [
                    "Two-pocket sorting",
                    "reject pocket for suspect notes",
                    "high-speed banknote processing",
                    "suitable for retail, exchange, and office cash rooms.",
                ],
                "gallery": [img_url(f) for f in SLUG_GALLERY["bcs-160"]],
            }
        )
        by_slug["bcs-160"] = products[-1]

    for slug, filename in SLUG_PRIMARY.items():
        if slug not in by_slug:
            print(f"WARN: slug not in catalog: {slug}")
            continue
        product = by_slug[slug]
        product["image"] = img_url(filename)
        if slug in SLUG_GALLERY:
            product["gallery"] = [img_url(f) for f in SLUG_GALLERY[slug]]

    update_high_security_products(products)

    path.write_text(json.dumps(products, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def update_grades() -> None:
    path = CONTENT / "grades.json"
    grades: list[dict] = json.loads(path.read_text(encoding="utf-8"))
    for grade in grades:
        slug = grade["slug"]
        if slug in GRADE_IMAGE:
            grade["image"] = img_url(GRADE_IMAGE[slug], brand=True)
    path.write_text(json.dumps(grades, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def update_pages() -> None:
    path = CONTENT / "pages.json"
    pages: dict = json.loads(path.read_text(encoding="utf-8"))

    pages["heroSlides"] = [
        {
            "img": img_url("hero-slide-1.jpg", brand=True),
            "title": pages["heroSlides"][0]["title"],
            "sub": pages["heroSlides"][0]["sub"],
        },
        {
            "img": img_url("hero-slide-2.png", brand=True),
            "title": pages["heroSlides"][1]["title"],
            "sub": pages["heroSlides"][1]["sub"],
        },
        {
            "img": img_url("hero-slide-3.jpg", brand=True),
            "title": pages["heroSlides"][2]["title"],
            "sub": pages["heroSlides"][2]["sub"],
        },
        {
            "img": img_url("hero-slide-4.jpg", brand=True),
            "title": pages["heroSlides"][3]["title"],
            "sub": pages["heroSlides"][3]["sub"],
        },
    ]

    pages["home"]["servicesSection"]["cards"] = [
        {
            "img": img_url("service-vault-door.png", brand=True),
            "title": "Vault Door Installation",
            "text": "End-to-end vault door delivery and professional installation, handled by our expert team.",
        },
        {
            "img": img_url("service-maintenance.jpg", brand=True),
            "title": "Safe Repair and Maintenance",
            "text": "Lock replacement, digital upgrades, combination changes, and preventative servicing.",
        },
        {
            "img": img_url("service-consultation.png", brand=True),
            "title": "Security Consultation",
            "text": "Free, informed guidance to match the right safe or solution to your needs.",
        },
        {
            "img": img_url("service-installation.png", brand=True),
            "title": "Safe Installation and Relocation",
            "text": "Careful transport, planning, and correct setup of your safe at any location.",
        },
    ]

    pages["home"]["showroom"]["images"] = [
        {
            "src": img_url("showroom-1.png", brand=True),
            "alt": "Salvado showroom exterior in Zalka",
            "caption": "Visit Lebanon's leading safe showroom in Zalka and explore solutions in person.",
        },
        {
            "src": img_url("showroom-4.jpg", brand=True),
            "alt": "Salvado showroom interior display",
            "caption": "Compare high-security safes, fire-rated models, and vault solutions on the showroom floor.",
        },
        {
            "src": img_url("showroom-5.jpg", brand=True),
            "alt": "Salvado showroom consultation area",
            "caption": "Speak with our specialists and inspect build quality before you decide.",
        },
        {
            "src": img_url("hero-slide-2.png", brand=True),
            "alt": "Luxury safe display at Salvado",
            "caption": "Luxury safes and bespoke watch storage for discerning clients.",
        },
        {
            "src": img_url("service-vault-door.png", brand=True),
            "alt": "Vault door installation by Salvado",
            "caption": "Vault doors and high-security installations you can discuss with our team on site.",
        },
    ]

    pages["instagramPosts"] = [
        {
            "image": img_url("showroom-1.png", brand=True),
            "caption": "Visit Lebanon's leading safe showroom in Zalka.",
            "href": "https://www.instagram.com/salvadosafes/",
            "alt": "Salvado showroom",
        },
        {
            "image": img_url("hero-slide-1.jpg", brand=True),
            "caption": "Premium safes and security solutions you can trust.",
            "href": "https://www.instagram.com/salvadosafes/",
            "alt": "Salvado high-security safes",
        },
        {
            "image": img_url("hero-slide-2.png", brand=True),
            "caption": "Bespoke high-security protection for homes and businesses.",
            "href": "https://www.instagram.com/salvadosafes/",
            "alt": "Custom security solutions",
        },
        {
            "image": img_url("grade-v.png", brand=True),
            "caption": "Certified Grade V protection with European-standard installation.",
            "href": "https://www.instagram.com/salvadosafes/",
            "alt": "Grade V safe",
        },
        {
            "image": img_url("custom-luxury-ilux.png"),
            "caption": "Luxury safes and watch storage for discerning clients.",
            "href": "https://www.instagram.com/salvadosafes/",
            "alt": "Luxury safe",
        },
        {
            "image": img_url("service-vault-door.png", brand=True),
            "caption": "Professional vault door delivery and installation.",
            "href": "https://www.instagram.com/salvadosafes/",
            "alt": "Vault door installation",
        },
        {
            "image": img_url("gs-30-open.jpeg"),
            "caption": "Responsible firearm storage solutions.",
            "href": "https://www.instagram.com/salvadosafes/",
            "alt": "Gun safe",
        },
        {
            "image": img_url("hero-slide-4.jpg", brand=True),
            "caption": "Cash-handling solutions for businesses across Lebanon.",
            "href": "https://www.instagram.com/salvadosafes/",
            "alt": "Money counter",
        },
    ]

    pages["about"]["hero"]["image"] = img_url("about-hero.jpg", brand=True)
    pages["about"]["showroomImage"] = img_url("about-showroom.jpg", brand=True)
    pages["about"]["teamImage"] = img_url("about-team.jpg", brand=True)
    pages["about"]["gallery"] = [
        {"src": img_url("showroom-1.png", brand=True), "alt": "Salvado showroom in Zalka"},
        {"src": img_url("showroom-4.jpg", brand=True), "alt": "Safe displays inside the Salvado showroom"},
        {"src": img_url("showroom-5.jpg", brand=True), "alt": "Consultation area at Salvado"},
        {"src": img_url("service-installation.png", brand=True), "alt": "Professional safe delivery and installation"},
    ]

    pages["contact"] = {
        "heroImage": img_url("contact-hero.jpg", brand=True),
        "showroomImage": img_url("contact-showroom.jpg", brand=True),
    }

    pages["services"]["hero"]["image"] = img_url("service-vault-door.png", brand=True)

    path.write_text(json.dumps(pages, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> None:
    if not IMPORT_ROOT.exists():
        raise SystemExit(f"Import folder not found: {IMPORT_ROOT}")
    import_assets()
    update_products()
    update_grades()
    update_pages()
    print("Imported images and updated content JSON successfully.")


if __name__ == "__main__":
    main()
