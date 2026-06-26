#!/usr/bin/env python3
"""Center-crop client photos to landscape ratios used on the site (no letterboxing)."""

from __future__ import annotations

from io import BytesIO
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "images" / "brand"
MAX_SIDE = 1600
JPEG_QUALITY = 82

# path -> (width ratio, height ratio)
CROP_16_10: list[str] = [
    "showroom-carousel-1.jpg",
    "showroom-carousel-2.jpg",
    "showroom-carousel-3.jpg",
    "showroom-carousel-4.jpg",
    "showroom-carousel-5.jpg",
    "showroom-carousel-6.jpg",
    "home-service-vault-door.jpg",
    "home-service-repair.jpg",
    "home-service-installation.jpg",
    "service-consultation.png",
    "service-consultation-delivery.jpg",
    "service-locksmith.jpg",
    "service-repair-maintenance.jpg",
    "service-vault-doors.jpg",
    "service-relocation.jpg",
    "service-after-sales.jpg",
]

CROP_4_3: list[str] = [
    "service-install-1.jpg",
    "service-install-2.jpg",
    "service-install-3.jpg",
    "service-install-4.jpg",
    "service-install-5.jpg",
    "service-install-6.jpg",
    "about-showroom-v2.jpg",
]


def center_crop(im: Image.Image, rw: int, rh: int) -> Image.Image:
    target = rw / rh
    w, h = im.size
    current = w / h
    if abs(current - target) < 0.01:
        return im
    if current > target:
        new_w = int(h * target)
        left = (w - new_w) // 2
        return im.crop((left, 0, left + new_w, h))
    new_h = int(w / target)
    top = (h - new_h) // 2
    return im.crop((0, top, w, top + new_h))


def resize(im: Image.Image) -> Image.Image:
    w, h = im.size
    longest = max(w, h)
    if longest <= MAX_SIDE:
        return im
    scale = MAX_SIDE / longest
    return im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)


def save(path: Path, im: Image.Image) -> None:
    ext = path.suffix.lower()
    if ext == ".png":
        im.save(path, "PNG", optimize=True)
    else:
        im.convert("RGB").save(path, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)


def process(name: str, rw: int, rh: int) -> None:
    path = BRAND / name
    if not path.exists():
        print(f"SKIP missing: {name}")
        return
    with Image.open(path) as im:
        im.load()
        before = im.size
        out = resize(center_crop(im, rw, rh))
        save(path, out)
        print(f"{name}: {before[0]}x{before[1]} -> {out.size[0]}x{out.size[1]}")


def main() -> None:
    for name in CROP_16_10:
        process(name, 16, 10)
    for name in CROP_4_3:
        process(name, 4, 3)


if __name__ == "__main__":
    main()
