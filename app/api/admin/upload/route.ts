import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "uploads");
const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "webp", "gif", "svg", "avif"]);
const MAX_BYTES = 12 * 1024 * 1024; // 12 MB safety cap (compressed client-side first)

function sanitizeBase(name: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  const clean = base
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
  return clean || "image";
}

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large" }, { status: 413 });
  }

  const ext = (file.name.split(".").pop() || "").toLowerCase();
  if (!ALLOWED_EXT.has(ext)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
  }

  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const stamp = Date.now().toString(36);
  const filename = `${sanitizeBase(file.name)}-${stamp}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);

  return NextResponse.json({ path: `/images/uploads/${filename}` });
}
