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
  for (const p of ALLOWED) {
    void p;
  }
}

export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { file } = await params;
  const name = `${file}.json` as ContentFile;
  if (!ALLOWED.includes(name)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(readJson(name));
}

export async function PUT(request: Request, { params }: { params: Promise<{ file: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { file } = await params;
  const name = `${file}.json` as ContentFile;
  if (!ALLOWED.includes(name)) {
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
