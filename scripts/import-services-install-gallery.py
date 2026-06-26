#!/usr/bin/env python3
"""Import services page installation gallery from part 2 docx."""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "_services-part2-import"
OUT = ROOT / "public" / "images" / "brand"
MAX_SIDE = 1600
QUALITY = 82

ORDER = [
    ("image3.jpeg", "service-install-1.jpg"),
    ("image4.jpeg", "service-install-2.jpg"),
    ("image5.jpeg", "service-install-3.jpg"),
    ("image6.JPG", "service-install-4.jpg"),
    ("image7.jpeg", "service-install-5.jpg"),
    ("image8.jpeg", "service-install-6.jpg"),
]


def save_jpg(src: Path, dest: Path) -> None:
    with Image.open(src) as im:
        im.load()
        im = im.convert("RGB")
        w, h = im.size
        longest = max(w, h)
        if longest > MAX_SIDE:
            scale = MAX_SIDE / longest
            im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
        dest.parent.mkdir(parents=True, exist_ok=True)
        im.save(dest, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    print(f"  {dest.name}: {dest.stat().st_size // 1024} KB")


def main() -> None:
    for src_name, dest_name in ORDER:
        src = SRC / src_name
        if not src.exists():
            raise FileNotFoundError(src)
        save_jpg(src, OUT / dest_name)


if __name__ == "__main__":
    main()
