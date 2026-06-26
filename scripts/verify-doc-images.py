#!/usr/bin/env python3
"""Verify doc images match deployed assets and report aspect ratios."""

import hashlib
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"


def md5(data: bytes) -> str:
    return hashlib.md5(data).hexdigest()


def extract_media(path: Path) -> dict[str, bytes]:
    out: dict[str, bytes] = {}
    with zipfile.ZipFile(path) as z:
        for name in z.namelist():
            if name.startswith("word/media/"):
                out[Path(name).name] = z.read(name)
    return out


def dims(data: bytes) -> tuple[int, int]:
    from io import BytesIO

    with Image.open(BytesIO(data)) as im:
        return im.size


def file_dims(path: Path) -> tuple[int, int]:
    with Image.open(path) as im:
        return im.size


def check(name: str, deployed: Path, doc_bytes: bytes | None) -> None:
    ok = deployed.exists()
    print(f"\n{name}")
    print(f"  deployed: {deployed.name if ok else 'MISSING'} ({deployed})")
    if ok:
        w, h = file_dims(deployed)
        orient = "portrait" if h > w else "landscape" if w > h else "square"
        print(f"  size: {w}x{h} ({orient})")
    if doc_bytes:
        dw, dh = dims(doc_bytes)
        print(f"  doc source: {dw}x{dh}")


# Expected mappings
DOCS = Path(r"c:\Users\carla\Downloads")
BRAND = ROOT / "public" / "images" / "brand"

about = extract_media(DOCS / "Salvado About.docx")
contact = extract_media(DOCS / "Salvado contact.docx")
hp = extract_media(DOCS / "Salvado hp services photo adjustments.docx")
svc = extract_media(DOCS / "Salvado services page photo adjustments.docx")
svc2 = extract_media(DOCS / "Salvado services page photo adjustments (part 2).docx")
web = extract_media(DOCS / "Salvado website photo adjustments.docx")

print("=" * 60)
print("ABOUT")
check("showroomImage", BRAND / "about-showroom-v2.jpg", about.get("image1.jpeg"))

print("\n" + "=" * 60)
print("CONTACT")
check("showroomImage", BRAND / "contact-showroom.jpg", contact.get("image2.jpeg"))
check("heroImage (unchanged)", BRAND / "contact-hero-v2.jpg", None)

print("\n" + "=" * 60)
print("HP SERVICES")
check("vault door", BRAND / "home-service-vault-door.jpg", hp.get("image2.jpeg"))
check("repair", BRAND / "home-service-repair.jpg", hp.get("image3.JPG"))
check("consultation (unchanged)", BRAND / "service-consultation.png", None)
check("installation", BRAND / "home-service-installation.jpg", hp.get("image4.jpeg"))

print("\n" + "=" * 60)
print("SERVICES CARDS")
pairs = [
    ("consultation", "service-consultation-delivery.jpg", "image2.jpeg"),
    ("locksmith", "service-locksmith.jpg", "image3.JPG"),
    ("maintenance", "service-repair-maintenance.jpg", "image4.jpeg"),
    ("vault", "service-vault-doors.jpg", "image5.jpeg"),
    ("relocation", "service-relocation.jpg", "image6.jpeg"),
    ("support", "service-after-sales.jpg", "image7.jpeg"),
]
for label, fname, key in pairs:
    check(label, BRAND / fname, svc.get(key))

print("\n" + "=" * 60)
print("SERVICES INSTALL GALLERY")
for i, key in enumerate(
    ["image3.jpeg", "image4.jpeg", "image5.jpeg", "image6.JPG", "image7.jpeg", "image8.jpeg"], 1
):
    check(f"install {i}", BRAND / f"service-install-{i}.jpg", svc2.get(key))

print("\n" + "=" * 60)
print("SHOWROOM CAROUSEL")
for i, key in enumerate(
    ["image2.png", "image3.png", "image4.JPG", "image5.jpeg", "image6.jpeg", "image7.jpeg"], 1
):
    check(f"carousel {i}", BRAND / f"showroom-carousel-{i}.jpg", web.get(key))

# List portrait images in deployed sets
print("\n" + "=" * 60)
print("PORTRAIT DEPLOYED IMAGES (may need landscape crop)")
for pattern in [
    "about-showroom-v2.jpg",
    "contact-showroom.jpg",
    "home-service-*.jpg",
    "service-*.jpg",
    "showroom-carousel-*.jpg",
]:
    for p in sorted(BRAND.glob(pattern)):
        w, h = file_dims(p)
        if h > w * 1.05:
            print(f"  {p.name}: {w}x{h}")
