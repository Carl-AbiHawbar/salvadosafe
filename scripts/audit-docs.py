import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

DOCS = [
    ("about", Path(r"c:\Users\carla\Downloads\Salvado About.docx")),
    ("contact", Path(r"c:\Users\carla\Downloads\Salvado contact.docx")),
    ("hp-services", Path(r"c:\Users\carla\Downloads\Salvado hp services photo adjustments.docx")),
    ("services", Path(r"c:\Users\carla\Downloads\Salvado services page photo adjustments.docx")),
    ("services-part2", Path(r"c:\Users\carla\Downloads\Salvado services page photo adjustments (part 2).docx")),
    ("website", Path(r"c:\Users\carla\Downloads\Salvado website photo adjustments.docx")),
]

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"


def parse_docx(path: Path) -> None:
    print(f"\n{'='*60}\n{path.name}\n{'='*60}")
    with zipfile.ZipFile(path) as z:
        rels = z.read("word/_rels/document.xml.rels").decode("utf-8")
        rid_to = {}
        for m in re.finditer(r'Id="(rId\d+)"[^>]+Target="([^"]+)"', rels):
            rid_to[m.group(1)] = m.group(2)
        media = [n for n in z.namelist() if n.startswith("word/media/")]
        print("Media:", [Path(n).name for n in media])
        root = ET.fromstring(z.read("word/document.xml"))
        for i, p in enumerate(root.iter(W + "p")):
            parts = []
            for node in p.iter():
                if node.tag == W + "t" and node.text:
                    parts.append(node.text)
                if node.tag.endswith("blip"):
                    rid = node.get(R + "embed")
                    parts.append("[" + Path(rid_to.get(rid, rid)).name + "]")
            line = "".join(parts).strip()
            if line:
                print(f"  P{i}: {line}")


if __name__ == "__main__":
    for name, path in DOCS:
        if path.exists():
            parse_docx(path)
        else:
            print(f"MISSING: {path}")
