#!/usr/bin/env python3
"""Compress site images (resize + re-encode) while keeping good visual quality.

- Caps the longest side at MAX_SIDE (display sizes are far smaller than the sources).
- JPEG/WEBP: quality 82, progressive, optimized.
- PNG: palette quantization with dithering (pngquant-style), preserving transparency.
- Keeps the original if compression does not actually reduce the file size.
"""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES_DIR = ROOT / "public" / "images"

MAX_SIDE = 1600
JPEG_QUALITY = 82
WEBP_QUALITY = 82
PNG_COLORS = 256

# Crisp brand marks we leave untouched (already small / generated).
SKIP = {"shield-logo.png", "favicon.png"}


def resize(img: Image.Image) -> Image.Image:
    w, h = img.size
    longest = max(w, h)
    if longest <= MAX_SIDE:
        return img
    scale = MAX_SIDE / longest
    return img.resize((round(w * scale), round(h * scale)), Image.LANCZOS)


def compress(path: Path) -> tuple[int, int]:
    before = path.stat().st_size
    ext = path.suffix.lower()
    tmp = path.with_suffix(path.suffix + ".tmp")

    with Image.open(path) as im:
        im.load()
        im = resize(im)

        if ext in (".jpg", ".jpeg"):
            im = im.convert("RGB")
            im.save(tmp, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
        elif ext == ".webp":
            im.save(tmp, "WEBP", quality=WEBP_QUALITY, method=6)
        elif ext == ".png":
            has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
            if has_alpha:
                rgba = im.convert("RGBA")
                q = rgba.quantize(colors=PNG_COLORS, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.FLOYDSTEINBERG)
            else:
                rgb = im.convert("RGB")
                q = rgb.quantize(colors=PNG_COLORS, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
            q.save(tmp, "PNG", optimize=True)
        else:
            return before, before

    after = tmp.stat().st_size
    if after < before:
        tmp.replace(path)
        return before, after
    tmp.unlink()
    return before, before


def main() -> None:
    total_before = total_after = 0
    changed = 0
    for path in sorted(IMAGES_DIR.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp"):
            continue
        if path.name in SKIP:
            continue
        b, a = compress(path)
        total_before += b
        total_after += a
        if a < b:
            changed += 1
            if b - a > 200_000:
                print(f"{b/1024:8.0f} -> {a/1024:7.0f} KB  {path.relative_to(ROOT)}")

    print("\n%d files compressed" % changed)
    print("TOTAL %.1f MB -> %.1f MB (%.0f%% smaller)" % (
        total_before / 1e6, total_after / 1e6,
        (1 - total_after / total_before) * 100 if total_before else 0,
    ))


if __name__ == "__main__":
    main()
