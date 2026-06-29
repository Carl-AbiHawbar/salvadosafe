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

    start = next((x for x in range(w) if column_has_content(x)), None)
    if start is None:
        raise SystemExit("Could not detect shield in logo.")

    gap = 0
    end = start
    for x in range(start, w):
        if column_has_content(x):
            end = x
            gap = 0
        else:
            gap += 1
            if gap > int(w * 0.01):
                break

    region = img.crop((start, 0, end + 1, h))
    vbox = region.split()[-1].getbbox()
    top, bottom = (vbox[1], vbox[3]) if vbox else (0, h)
    return (start, top, end + 1, bottom)


def square_shield() -> Image.Image:
    logo = Image.open(LOGO).convert("RGBA")
    shield = logo.crop(shield_bbox(logo))
    side = max(shield.size)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    offset = ((side - shield.width) // 2, (side - shield.height) // 2)
    canvas.paste(shield, offset, shield)
    return canvas


def write_png(canvas: Image.Image, path: Path, size: int) -> None:
    out = canvas.resize((size, size), Image.LANCZOS)
    path.parent.mkdir(parents=True, exist_ok=True)
    out.save(path, "PNG", optimize=True)
    print(f"wrote {path.relative_to(ROOT)} ({size}x{size}, {path.stat().st_size // 1024} KB)")


def write_ico(canvas: Image.Image, path: Path) -> None:
    """Build a multi-size .ico Google and browsers can fetch reliably."""
    sizes = (16, 32, 48)
    frames = [canvas.resize((s, s), Image.LANCZOS) for s in sizes]
    path.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        path,
        format="ICO",
        sizes=[(s, s) for s in sizes],
        append_images=frames[1:],
    )
    print(f"wrote {path.relative_to(ROOT)} ({path.stat().st_size} bytes)")


def build() -> None:
    canvas = square_shield()

    write_png(canvas, ROOT / "app" / "icon.png", 512)
    write_png(canvas, ROOT / "app" / "apple-icon.png", 180)
    write_png(canvas, ROOT / "public" / "images" / "brand" / "shield-logo.png", 512)
    write_png(canvas, ROOT / "public" / "favicon.png", 48)
    write_ico(canvas, ROOT / "public" / "favicon.ico")

    # Next.js app/favicon.ico metadata route can 500 on some hosts; serve static public copy instead.
    app_ico = ROOT / "app" / "favicon.ico"
    if app_ico.exists():
        app_ico.unlink()
        print(f"removed {app_ico.relative_to(ROOT)} (use public/favicon.ico)")


if __name__ == "__main__":
    build()
