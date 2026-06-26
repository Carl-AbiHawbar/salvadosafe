#!/usr/bin/env python3
"""Fix sideways client photos: apply EXIF orientation, manual rotations, then layout crop."""

from __future__ import annotations

import zipfile
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "images" / "brand"
DOWNLOADS = Path(r"c:\Users\carla\Downloads")
MAX_SIDE = 1600
JPEG_QUALITY = 82

# Per-source rotation after EXIF normalize. PIL ROTATE_90 = 90° CCW, ROTATE_270 = 90° CW.
ROTATIONS: dict[str, Image.Transpose] = {
    "image3.jpeg": Image.Transpose.ROTATE_270,  # install gallery #1
    "image4.jpeg": Image.Transpose.ROTATE_270,  # hp safe installation (image4 in hp doc only)
}
# image4.jpeg in part2 doc (vault door) needs no manual rotation — portrait upright in source.


def open_normalized(data: bytes, filename: str) -> Image.Image:
    im = ImageOps.exif_transpose(Image.open(BytesIO(data)))
    if filename in ROTATIONS:
        im = im.transpose(ROTATIONS[filename])
    return im.convert("RGB")


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


def save_jpg(path: Path, im: Image.Image) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    print(f"  {path.name}: {im.size[0]}x{im.size[1]}")


def media_from_docx(docx: Path) -> dict[str, bytes]:
    out: dict[str, bytes] = {}
    with zipfile.ZipFile(docx) as z:
        for name in z.namelist():
            if name.startswith("word/media/"):
                out[Path(name).name] = z.read(name)
    return out


def process(
    docx: Path,
    mapping: list[tuple[str, str, int, int]],
) -> None:
    media = media_from_docx(docx)
    for src_name, dest_name, rw, rh in mapping:
        if src_name not in media:
            raise FileNotFoundError(f"{src_name} missing in {docx.name}")
        im = open_normalized(media[src_name], src_name)
        save_jpg(BRAND / dest_name, resize(center_crop(im, rw, rh)))


def main() -> None:
    print("Showroom carousel")
    process(
        DOWNLOADS / "Salvado website photo adjustments.docx",
        [
            ("image2.png", "showroom-carousel-1.jpg", 16, 10),
            ("image3.png", "showroom-carousel-2.jpg", 16, 10),
            ("image4.JPG", "showroom-carousel-3.jpg", 16, 10),
            ("image5.jpeg", "showroom-carousel-4.jpg", 16, 10),
            ("image6.jpeg", "showroom-carousel-5.jpg", 16, 10),
            ("image7.jpeg", "showroom-carousel-6.jpg", 16, 10),
        ],
    )

    print("Services install gallery")
    process(
        DOWNLOADS / "Salvado services page photo adjustments (part 2).docx",
        [
            ("image3.jpeg", "service-install-1.jpg", 4, 3),
            ("image4.jpeg", "service-install-2.jpg", 4, 3),
            ("image5.jpeg", "service-install-3.jpg", 4, 3),
            ("image6.JPG", "service-install-4.jpg", 4, 3),
            ("image7.jpeg", "service-install-5.jpg", 4, 3),
            ("image8.jpeg", "service-install-6.jpg", 4, 3),
        ],
    )

    print("Homepage services")
    process(
        DOWNLOADS / "Salvado hp services photo adjustments.docx",
        [
            ("image2.jpeg", "home-service-vault-door.jpg", 16, 10),
            ("image3.JPG", "home-service-repair.jpg", 16, 10),
            ("image4.jpeg", "home-service-installation.jpg", 16, 10),
        ],
    )

    print("About showroom")
    media = media_from_docx(DOWNLOADS / "Salvado About.docx")
    im = open_normalized(media["image1.jpeg"], "image1.jpeg")
    save_jpg(BRAND / "about-showroom-v2.jpg", resize(center_crop(im, 4, 3)))

    print("Done.")


if __name__ == "__main__":
    main()
