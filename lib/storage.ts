import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ContentFile = "site.json" | "categories.json" | "products.json" | "pages.json";

export function readJson<T>(file: ContentFile): T {
  const filePath = path.join(CONTENT_DIR, file);
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

export function writeJson(file: ContentFile, data: unknown): void {
  const filePath = path.join(CONTENT_DIR, file);
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}

export function contentExists(file: ContentFile): boolean {
  return fs.existsSync(path.join(CONTENT_DIR, file));
}
