"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminCard, AdminInput, SaveBar, saveContent } from "@/components/admin/admin-shell";
import type { PagesContent } from "@/lib/content";

export default function AdminPageSection({ params }: { params: Promise<{ section: string }> }) {
  const [section, setSection] = useState<string>("");
  const [pages, setPages] = useState<PagesContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    params.then((p) => setSection(p.section));
  }, [params]);

  useEffect(() => {
    fetch("/api/admin/content/pages")
      .then((r) => r.json())
      .then(setPages);
  }, []);

  async function save(next: PagesContent) {
    setSaving(true);
    setMsg("");
    try {
      await saveContent("pages", next);
      setPages(next);
      setMsg("Saved.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Save failed");
    }
    setSaving(false);
  }

  if (!pages || !section) return <p className="text-white/60">Loading…</p>;

  return (
    <div>
      <Link href="/admin/pages" className="text-[13px] font-semibold text-white/50 hover:text-white">
        ← Page content
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold capitalize text-white">{section.replace("-", " ")}</h1>

      {section === "hero" && (
        <>
          {pages.heroSlides.map((slide, i) => (
            <AdminCard key={i} title={`Slide ${i + 1}`} className="mt-6">
              <div className="space-y-4">
                <AdminInput label="Image URL" value={slide.img} onChange={(v) => {
                  const heroSlides = [...pages.heroSlides];
                  heroSlides[i] = { ...slide, img: v };
                  setPages({ ...pages, heroSlides });
                }} />
                <AdminInput label="Title" value={slide.title} onChange={(v) => {
                  const heroSlides = [...pages.heroSlides];
                  heroSlides[i] = { ...slide, title: v };
                  setPages({ ...pages, heroSlides });
                }} />
                <AdminInput label="Subtitle" value={slide.sub} onChange={(v) => {
                  const heroSlides = [...pages.heroSlides];
                  heroSlides[i] = { ...slide, sub: v };
                  setPages({ ...pages, heroSlides });
                }} rows={3} />
              </div>
            </AdminCard>
          ))}
          <SaveBar onSave={() => save(pages)} saving={saving} message={msg} />
        </>
      )}

      {section === "reviews" && (
        <>
          <AdminCard title="Reviews header" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput label="Rating label" value={pages.reviewsMeta.ratingLabel} onChange={(v) => setPages({ ...pages, reviewsMeta: { ...pages.reviewsMeta, ratingLabel: v } })} />
              <AdminInput label="Review count text" value={pages.reviewsMeta.reviewCount} onChange={(v) => setPages({ ...pages, reviewsMeta: { ...pages.reviewsMeta, reviewCount: v } })} />
            </div>
          </AdminCard>
          {pages.reviews.map((r, i) => (
            <AdminCard key={i} title={r.name} className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <AdminInput label="Name" value={r.name} onChange={(v) => { const reviews = [...pages.reviews]; reviews[i] = { ...r, name: v }; setPages({ ...pages, reviews }); }} />
                <AdminInput label="When" value={r.when} onChange={(v) => { const reviews = [...pages.reviews]; reviews[i] = { ...r, when: v }; setPages({ ...pages, reviews }); }} />
                <AdminInput label="Avatar color class" value={r.color} onChange={(v) => { const reviews = [...pages.reviews]; reviews[i] = { ...r, color: v }; setPages({ ...pages, reviews }); }} />
                <AdminInput label="Review text" value={r.text} onChange={(v) => { const reviews = [...pages.reviews]; reviews[i] = { ...r, text: v }; setPages({ ...pages, reviews }); }} rows={3} className="md:col-span-2" />
              </div>
            </AdminCard>
          ))}
          <SaveBar onSave={() => save(pages)} saving={saving} message={msg} />
        </>
      )}

      {(section === "home" || section === "about" || section === "services") && (
        <>
          <AdminCard title="Raw JSON editor" className="mt-6">
            <p className="mb-3 text-[13px] text-white/55">
              Edit the full <strong>{section}</strong> section as JSON. Save validates structure on write.
            </p>
            <textarea
              defaultValue={JSON.stringify(pages[section as keyof Pick<PagesContent, "home" | "about" | "services">], null, 2)}
              id="json-editor"
              rows={24}
              className="w-full rounded-xl border border-white/10 bg-[#0f1115] p-4 font-mono text-[13px] text-white outline-none focus:border-brand"
            />
          </AdminCard>
          <SaveBar
            onSave={() => {
              try {
                const raw = (document.getElementById("json-editor") as HTMLTextAreaElement).value;
                const parsed = JSON.parse(raw);
                const next = { ...pages, [section]: parsed } as PagesContent;
                save(next);
              } catch {
                setMsg("Invalid JSON");
              }
            }}
            saving={saving}
            message={msg}
          />
        </>
      )}

      {!["hero", "reviews", "home", "about", "services"].includes(section) && (
        <p className="mt-6 text-white/60">Unknown section.</p>
      )}
    </div>
  );
}
