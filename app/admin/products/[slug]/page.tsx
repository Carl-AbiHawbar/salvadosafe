"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminCard, AdminInput, ImageField, ImageListField, SaveBar, saveContent } from "@/components/admin/admin-shell";
import type { Product, ProductSpecs, Category } from "@/lib/catalog";

const emptyProduct = (): Product => ({
  slug: "",
  name: "",
  desc: "",
  image: null,
  category: "high-security-safes",
  categories: ["high-security-safes"],
  sub: null,
  isProject: false,
  specs: {},
  features: [],
  faqs: [],
});

function ProductEditor({ initial, isNew }: { initial: Product; isNew?: boolean }) {
  const router = useRouter();
  const [product, setProduct] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [categoryOptions, setCategoryOptions] = useState<Pick<Category, "slug" | "name">[]>([]);

  useEffect(() => {
    fetch("/api/admin/content/categories")
      .then((r) => r.json())
      .then((list: Category[]) => setCategoryOptions(list.map((c) => ({ slug: c.slug, name: c.name }))));
  }, []);

  function setSpec(key: keyof ProductSpecs, value: string) {
    setProduct((p) => ({ ...p, specs: { ...p.specs, [key]: value || undefined } }));
  }

  async function save() {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/content/products");
      const list = (await res.json()) as Product[];
      const slug = product.slug.trim().toLowerCase().replace(/\s+/g, "-");
      if (!slug || !product.name.trim()) throw new Error("Name and slug are required");
      const next = { ...product, slug, categories: product.categories.length ? product.categories : [product.category] };
      let updated: Product[];
      if (isNew) {
        if (list.some((p) => p.slug === slug)) throw new Error("Slug already exists");
        updated = [...list, next];
      } else {
        updated = list.map((p) => (p.slug === initial.slug ? next : p));
        if (initial.slug !== slug) {
          updated = updated.filter((p) => p.slug !== initial.slug);
          if (!updated.some((p) => p.slug === slug)) updated.push(next);
        }
      }
      await saveContent("products", updated);
      setMsg("Saved.");
      router.push(`/admin/products/${slug}`);
      router.refresh();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Save failed");
    }
    setSaving(false);
  }

  async function remove() {
    if (!confirm(`Delete ${product.name}?`)) return;
    setSaving(true);
    const res = await fetch("/api/admin/content/products");
    const list = (await res.json()) as Product[];
    await saveContent("products", list.filter((p) => p.slug !== initial.slug));
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <div>
      <Link href="/admin/products" className="text-[13px] font-semibold text-white/50 hover:text-white">
        ← All products
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold text-white">{isNew ? "New product" : product.name}</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <AdminCard title="Basics">
          <div className="space-y-4">
            <AdminInput label="Name" value={product.name} onChange={(v) => setProduct({ ...product, name: v })} />
            <AdminInput label="Slug" value={product.slug} onChange={(v) => setProduct({ ...product, slug: v })} />
            <AdminInput label="Sub / grade label" value={product.sub || ""} onChange={(v) => setProduct({ ...product, sub: v || null })} />
            <AdminInput label="Description" value={product.desc} onChange={(v) => setProduct({ ...product, desc: v })} rows={5} />
            <ImageField label="Main image" value={product.image || ""} onChange={(v) => setProduct({ ...product, image: v || null })} />
            <label className="flex items-center gap-2 text-[14px] text-white/80">
              <input type="checkbox" checked={product.isProject} onChange={(e) => setProduct({ ...product, isProject: e.target.checked })} />
              Project-based (custom quotation)
            </label>
            <label className="block">
              <span className="text-[13px] font-semibold text-white/70">Primary category</span>
              <select
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value, categories: [e.target.value] })}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0f1115] px-4 py-2.5 text-[14px] text-white"
              >
                {categoryOptions.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </label>
          </div>
        </AdminCard>

        <AdminCard title="Specifications">
          <div className="grid gap-3 sm:grid-cols-2">
            {(["external", "internal", "weight", "volume", "shelves", "bolts", "lock", "fireRating", "grade", "warranty"] as const).map((k) => (
              <AdminInput
                key={k}
                label={k}
                value={product.specs[k] || ""}
                onChange={(v) => setSpec(k, v)}
              />
            ))}
          </div>
        </AdminCard>

        <AdminCard title="Features (one per line)" className="lg:col-span-2">
          <AdminInput
            label="Features"
            value={product.features.join("\n")}
            onChange={(v) => setProduct({ ...product, features: v.split("\n").map((s) => s.trim()).filter(Boolean) })}
            rows={8}
          />
          <div className="mt-4">
            <ImageListField
              label="Gallery images"
              values={product.gallery || []}
              onChange={(v) => setProduct({ ...product, gallery: v })}
            />
          </div>
          <AdminInput
            className="mt-4"
            label="Colors (one per line)"
            value={(product.colors || []).join("\n")}
            onChange={(v) => setProduct({ ...product, colors: v.split("\n").map((s) => s.trim()).filter(Boolean) })}
            rows={3}
          />
        </AdminCard>

        <AdminCard title="FAQs (optional)" className="lg:col-span-2">
          <p className="mb-4 text-[13px] leading-relaxed text-white/55">
            Add product-specific questions here. When set, these replace the category FAQs on the product page.
            Leave empty to use the category&apos;s FAQ list instead.
          </p>
          {(product.faqs || []).map((item, i) => (
            <div key={i} className="mb-4 rounded-xl border border-white/5 p-4">
              <AdminInput
                label="Question"
                value={item.q}
                onChange={(v) => {
                  const faqs = [...(product.faqs || [])];
                  faqs[i] = { ...item, q: v };
                  setProduct({ ...product, faqs });
                }}
              />
              <AdminInput
                label="Answer"
                value={item.a}
                onChange={(v) => {
                  const faqs = [...(product.faqs || [])];
                  faqs[i] = { ...item, a: v };
                  setProduct({ ...product, faqs });
                }}
                rows={3}
              />
              <button
                type="button"
                onClick={() => setProduct({ ...product, faqs: (product.faqs || []).filter((_, j) => j !== i) })}
                className="mt-2 text-[13px] font-semibold text-red-300 hover:text-red-200"
              >
                Remove FAQ
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setProduct({ ...product, faqs: [...(product.faqs || []), { q: "", a: "" }] })}
            className="rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold text-white/80 hover:border-white/40 hover:text-white"
          >
            Add FAQ
          </button>
        </AdminCard>
      </div>

      <div className="mt-4 flex gap-3">
        {!isNew && (
          <button type="button" onClick={remove} className="rounded-full border border-red-500/40 px-5 py-2.5 text-[14px] font-semibold text-red-300">
            Delete product
          </button>
        )}
      </div>
      <SaveBar onSave={save} saving={saving} message={msg} />
    </div>
  );
}

export default function AdminProductEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    if (slug === "new") {
      setProduct(emptyProduct());
      return;
    }
    fetch("/api/admin/content/products")
      .then((r) => r.json())
      .then((list: Product[]) => setProduct(list.find((p) => p.slug === slug) || null));
  }, [slug]);

  if (!product) return <p className="text-white/60">Loading…</p>;
  return <ProductEditor initial={product} isNew={slug === "new"} />;
}
