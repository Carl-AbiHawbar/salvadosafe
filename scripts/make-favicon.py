#!/usr/bin/env python3
"""Crop the Salvado shield (with check) from the brand logo and build favicons."""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "public" / "images" / "brand" / "logo.png"


def shield_bbox(img: Image.Image) -> tuple[int, int, int, int]:
    """Isolate the shield: first contiguous block of opaque columns, stopping at the gap before the wordmark."""
    w, h = img.size
    alpha = img.split()[-1]
    px = alpha.load()
    threshold = 16

    def column_has_content(x: int) -> bool:
        return any(px[x, y] > threshold for y in range(0, h, 2))

    # Find first opaque column (shield start).
    start = next((x for x in range(w) if column_has_content(x)), None)
    if start is None:
        raise SystemExit("Could not detect shield in logo.")

    # Walk right until a sustained transparent gap marks the end of the shield.
    gap = 0
    end = start
    for x in range(start, w):
        if column_has_content(x):
            end = x
            gap = 0
        else:
            gap += 1
            if gap > int(w * 0.01):  # gap between shield and the "S"
                break

    region = img.crop((start, 0, end + 1, h))
    vbox = region.split()[-1].getbbox()
    top, bottom = (vbox[1], vbox[3]) if vbox else (0, h)
    return (start, top, end + 1, bottom)


def build() -> None:
    logo = Image.open(LOGO).convert("RGBA")
    box = shield_bbox(logo)
    shield = logo.crop(box)

    # Square canvas with small transparent padding so the shield breathes in the tab.
    side = max(shield.size)
    pad = int(side * 0.12)
    canvas_side = side + pad * 2
    canvas = Image.new("RGBA", (canvas_side, canvas_side), (0, 0, 0, 0))
    offset = ((canvas_side - shield.width) // 2, (canvas_side - shield.height) // 2)
    canvas.paste(shield, offset, shield)

    targets = {
        ROOT / "app" / "icon.png": 512,
        ROOT / "app" / "apple-icon.png": 180,
        ROOT / "public" / "images" / "brand" / "shield-logo.png": 512,
        ROOT / "public" / "favicon.png": 64,
    }
    for path, size in targets.items():
        out = canvas.resize((size, size), Image.LANCZOS)
        out.save(path, "PNG", optimize=True)
        print(f"wrote {path.relative_to(ROOT)} ({size}x{size}, {path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    build()
