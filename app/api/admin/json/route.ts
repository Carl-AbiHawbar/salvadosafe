import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { readJson, writeJson, type ContentFile } from "@/lib/storage";

const ALLOWED: ContentFile[] = ["site.json", "categories.json", "products.json", "pages.json"];

function revalidateAll() {
  revalidatePath("/", "layout");
  revalidatePath("/products");
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/contact");
}

function resolveFile(request: Request): ContentFile | null {
  const file = new URL(request.url).searchParams.get("file");
  if (!file) return null;
  const name = `${file}.json` as ContentFile;
  return ALLOWED.includes(name) ? name : null;
}

export async function GET(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const name = resolveFile(request);
  if (!name) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(readJson(name));
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const name = resolveFile(request);
  if (!name) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const data = await request.json();
  writeJson(name, data);
  revalidateAll();
  if (name === "products.json") {
    const products = readJson<{ slug: string }[]>("products.json");
    for (const p of products) revalidatePath(`/product/${p.slug}`);
  }
  if (name === "categories.json") {
    const categories = readJson<{ slug: string }[]>("categories.json");
    for (const c of categories) revalidatePath(`/category/${c.slug}`);
  }
  return NextResponse.json({ ok: true });
}
