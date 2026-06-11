import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getProducts, getCategories } from "@/lib/catalog";

export async function GET() {
  const products = getProducts();
  const categories = getCategories().map(({ slug, name, short }) => ({ slug, name, short }));
  return NextResponse.json({ products, categories });
}

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return GET();
}
