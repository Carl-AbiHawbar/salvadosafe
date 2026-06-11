"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminCard, AdminInput, SaveBar, saveContent } from "@/components/admin/admin-shell";
import type { Category } from "@/lib/catalog";

function CategoryEditor({ initial }: { initial: Category }) {
  const [cat, setCat] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function save() {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/content/categories");
      const list = (await res.json()) as Category[];
      const updated = list.map((c) => (c.slug === initial.slug ? cat : c));
      await saveContent("categories", updated);
      setMsg("Saved.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Save failed");
    }
    setSaving(false);
  }

  return (
    <div>
      <Link href="/admin/categories" className="text-[13px] font-semibold text-white/50 hover:text-white">
        ← All categories
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold text-white">{cat.name}</h1>

      <div className="mt-8 space-y-6">
        <AdminCard title="Overview">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput label="Name" value={cat.name} onChange={(v) => setCat({ ...cat, name: v })} />
            <AdminInput label="Slug (read-only)" value={cat.slug} onChange={() => {}} />
            <AdminInput label="Short (card)" value={cat.short} onChange={(v) => setCat({ ...cat, short: v })} />
            <AdminInput label="Image override URL" value={cat.image || ""} onChange={(v) => setCat({ ...cat, image: v || undefined })} />
            <label className="flex items-center gap-2 text-[14px] text-white/80 md:col-span-2">
              <input type="checkbox" checked={cat.featured} onChange={(e) => setCat({ ...cat, featured: e.target.checked })} />
              Featured category (homepage grid)
            </label>
            <AdminInput label="Intro (hero)" value={cat.intro} onChange={(v) => setCat({ ...cat, intro: v })} rows={4} className="md:col-span-2" />
            <AdminInput label="Protect angle" value={cat.protect} onChange={(v) => setCat({ ...cat, protect: v })} rows={3} className="md:col-span-2" />
          </div>
        </AdminCard>

        <AdminCard title="Buying guide">
          {cat.buyingGuide.map((item, i) => (
            <div key={i} className="mb-4 rounded-xl border border-white/5 p-4">
              <AdminInput label="Title" value={item.title} onChange={(v) => {
                const buyingGuide = [...cat.buyingGuide];
                buyingGuide[i] = { ...item, title: v };
                setCat({ ...cat, buyingGuide });
              }} />
              <AdminInput label="Body" value={item.body} onChange={(v) => {
                const buyingGuide = [...cat.buyingGuide];
                buyingGuide[i] = { ...item, body: v };
                setCat({ ...cat, buyingGuide });
              }} rows={3} />
            </div>
          ))}
        </AdminCard>

        <AdminCard title="FAQs">
          {cat.faqs.map((item, i) => (
            <div key={i} className="mb-4 rounded-xl border border-white/5 p-4">
              <AdminInput label="Question" value={item.q} onChange={(v) => {
                const faqs = [...cat.faqs];
                faqs[i] = { ...item, q: v };
                setCat({ ...cat, faqs });
              }} />
              <AdminInput label="Answer" value={item.a} onChange={(v) => {
                const faqs = [...cat.faqs];
                faqs[i] = { ...item, a: v };
                setCat({ ...cat, faqs });
              }} rows={3} />
            </div>
          ))}
        </AdminCard>
      </div>

      <SaveBar onSave={save} saving={saving} message={msg} />
    </div>
  );
}

export default function AdminCategoryEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    params.then(async ({ slug }) => {
      const res = await fetch("/api/admin/content/categories");
      const list = (await res.json()) as Category[];
      setCategory(list.find((c) => c.slug === slug) || null);
    });
  }, [params]);

  if (!category) return <p className="text-white/60">Loading…</p>;
  return <CategoryEditor initial={category} />;
}
