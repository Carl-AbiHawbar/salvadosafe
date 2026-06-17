import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getPublicProducts, getCategories } from "@/lib/catalog";
import { getGrades } from "@/lib/grades";

export async function GET() {
  const products = getPublicProducts();
  const categories = getCategories().map(({ slug, name, short }) => ({ slug, name, short }));
  const grades = getGrades().map(({ slug, grade, h1, series, desc }) => ({
    slug,
    grade,
    h1,
    series,
    desc,
  }));
  return NextResponse.json({ products, categories, grades });
}

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return GET();
}
