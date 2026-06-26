"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AdminCard,
  AdminInput,
  ImageField,
  ImageListField,
  SaveBar,
  saveContent,
} from "@/components/admin/admin-shell";
import type { PagesContent, IconPoint, Stat, Faq } from "@/lib/content";

type Setter = (next: PagesContent) => void;

/* ---------- small reusable helpers ---------- */

function StringListField({
  label,
  values,
  onChange,
  rows,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  rows?: number;
}) {
  return (
    <div>
      <span className="text-[13px] font-semibold text-white/70">{label}</span>
      <div className="mt-2 space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex items-start gap-2">
            <AdminInput
              label=""
              value={v}
              rows={rows}
              className="flex-1"
              onChange={(nv) => {
                const next = [...values];
                next[i] = nv;
                onChange(next);
              }}
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="mt-1.5 rounded-lg border border-red-500/40 px-3 py-2 text-[12px] font-semibold text-red-300 hover:bg-red-500/10"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="rounded-full border border-white/20 px-4 py-1.5 text-[13px] font-semibold text-white/80 hover:border-white/40 hover:text-white"
        >
          + Add
        </button>
      </div>
    </div>
  );
}

function PointsEditor({
  label,
  points,
  onChange,
}: {
  label: string;
  points: IconPoint[];
  onChange: (v: IconPoint[]) => void;
}) {
  return (
    <div>
      <span className="text-[13px] font-semibold text-white/70">{label}</span>
      <div className="mt-2 space-y-3">
        {points.map((p, i) => (
          <div key={i} className="rounded-xl border border-white/5 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <AdminInput label="Icon key" value={p.icon} onChange={(v) => upd(i, { icon: v })} />
              <AdminInput label="Title" value={p.title} onChange={(v) => upd(i, { title: v })} />
            </div>
            <AdminInput label="Text" value={p.text} rows={2} className="mt-3" onChange={(v) => upd(i, { text: v })} />
            <button
              type="button"
              onClick={() => onChange(points.filter((_, j) => j !== i))}
              className="mt-2 text-[13px] font-semibold text-red-300 hover:text-red-200"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...points, { icon: "shield", title: "", text: "" }])}
          className="rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold text-white/80 hover:border-white/40 hover:text-white"
        >
          + Add point
        </button>
      </div>
    </div>
  );

  function upd(i: number, patch: Partial<IconPoint>) {
    const next = [...points];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }
}

function HeadingFields({
  data,
  onChange,
}: {
  data: { eyebrow: string; title: string; text: string };
  onChange: (v: { eyebrow: string; title: string; text: string }) => void;
}) {
  return (
    <div className="space-y-3">
      <AdminInput label="Eyebrow" value={data.eyebrow} onChange={(v) => onChange({ ...data, eyebrow: v })} />
      <AdminInput label="Title" value={data.title} onChange={(v) => onChange({ ...data, title: v })} />
      <AdminInput label="Text" value={data.text} rows={3} onChange={(v) => onChange({ ...data, text: v })} />
    </div>
  );
}

/* ---------- section editors ---------- */

function HomeEditor({ pages, set }: { pages: PagesContent; set: Setter }) {
  const home = pages.home;
  const patch = (p: Partial<PagesContent["home"]>) => set({ ...pages, home: { ...home, ...p } });

  return (
    <div className="mt-6 space-y-6">
      <AdminCard title="Proof strip (badges under hero)">
        <StringListField label="Items" values={home.proofStrip} onChange={(v) => patch({ proofStrip: v })} />
      </AdminCard>

      <AdminCard title="Why Salvado">
        <HeadingFields data={home.whySalvado} onChange={(v) => patch({ whySalvado: { ...home.whySalvado, ...v } })} />
        <div className="mt-4">
          <PointsEditor label="Points" points={home.whySalvado.points} onChange={(v) => patch({ whySalvado: { ...home.whySalvado, points: v } })} />
        </div>
      </AdminCard>

      <AdminCard title="Catalog section">
        <HeadingFields data={home.catalogSection} onChange={(v) => patch({ catalogSection: { ...home.catalogSection, ...v } })} />
        <div className="mt-4">
          <StringListField label="Category slugs" values={home.catalogSection.slugs} onChange={(v) => patch({ catalogSection: { ...home.catalogSection, slugs: v } })} />
        </div>
      </AdminCard>

      <AdminCard title="Selected section">
        <HeadingFields data={home.selectedSection} onChange={(v) => patch({ selectedSection: { ...home.selectedSection, ...v } })} />
        <div className="mt-4">
          <StringListField label="Product / grade slugs" values={home.selectedSection.slugs} onChange={(v) => patch({ selectedSection: { ...home.selectedSection, slugs: v } })} />
        </div>
      </AdminCard>

      <AdminCard title="Services section">
        <HeadingFields data={home.servicesSection} onChange={(v) => patch({ servicesSection: { ...home.servicesSection, ...v } })} />
        <div className="mt-4 space-y-4">
          {home.servicesSection.cards.map((card, i) => (
            <div key={i} className="rounded-xl border border-white/5 p-4">
              <ImageField label={`Card ${i + 1} image`} value={card.img} onChange={(v) => updCard(i, { img: v })} />
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <AdminInput label="Title" value={card.title} onChange={(v) => updCard(i, { title: v })} />
                <AdminInput label="Image CSS class (optional)" value={card.imgClass || ""} onChange={(v) => updCard(i, { imgClass: v || undefined })} />
              </div>
              <AdminInput label="Text" value={card.text} rows={2} className="mt-3" onChange={(v) => updCard(i, { text: v })} />
              <button type="button" onClick={() => patch({ servicesSection: { ...home.servicesSection, cards: home.servicesSection.cards.filter((_, j) => j !== i) } })} className="mt-2 text-[13px] font-semibold text-red-300 hover:text-red-200">
                Remove card
              </button>
            </div>
          ))}
          <button type="button" onClick={() => patch({ servicesSection: { ...home.servicesSection, cards: [...home.servicesSection.cards, { img: "", title: "", text: "" }] } })} className="rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold text-white/80 hover:border-white/40 hover:text-white">
            + Add card
          </button>
        </div>
      </AdminCard>

      <AdminCard title="Showroom">
        <HeadingFields data={home.showroom} onChange={(v) => patch({ showroom: { ...home.showroom, ...v } })} />
        <div className="mt-4 space-y-4">
          {home.showroom.images.map((img, i) => (
            <div key={i} className="rounded-xl border border-white/5 p-4">
              <ImageField label={`Image ${i + 1}`} value={img.src} onChange={(v) => updImg(i, { src: v })} />
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <AdminInput label="Alt text" value={img.alt} onChange={(v) => updImg(i, { alt: v })} />
                <AdminInput label="Caption (optional)" value={img.caption || ""} onChange={(v) => updImg(i, { caption: v || undefined })} />
                <label className="block">
                  <span className="text-[13px] font-semibold text-white/70">Fit</span>
                  <select
                    value={img.fit || "cover"}
                    onChange={(e) => updImg(i, { fit: e.target.value as "cover" | "contain" })}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0f1115] px-4 py-2.5 text-[14px] text-white"
                  >
                    <option value="cover">cover</option>
                    <option value="contain">contain</option>
                  </select>
                </label>
                <AdminInput label="Image CSS class (optional)" value={img.imgClass || ""} onChange={(v) => updImg(i, { imgClass: v || undefined })} />
              </div>
              <button type="button" onClick={() => patch({ showroom: { ...home.showroom, images: home.showroom.images.filter((_, j) => j !== i) } })} className="mt-2 text-[13px] font-semibold text-red-300 hover:text-red-200">
                Remove image
              </button>
            </div>
          ))}
          <button type="button" onClick={() => patch({ showroom: { ...home.showroom, images: [...home.showroom.images, { src: "", alt: "" }] } })} className="rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold text-white/80 hover:border-white/40 hover:text-white">
            + Add image
          </button>
        </div>
        <div className="mt-4">
          <StringListField label="Feature bullets" values={home.showroom.features} onChange={(v) => patch({ showroom: { ...home.showroom, features: v } })} />
        </div>
      </AdminCard>

      <AdminCard title="Final CTA">
        <HeadingFields data={home.finalCta} onChange={(v) => patch({ finalCta: { ...home.finalCta, ...v } })} />
        <AdminInput label="WhatsApp message" value={home.finalCta.waMessage} rows={2} className="mt-3" onChange={(v) => patch({ finalCta: { ...home.finalCta, waMessage: v } })} />
      </AdminCard>
    </div>
  );

  function updCard(i: number, p: Partial<PagesContent["home"]["servicesSection"]["cards"][number]>) {
    const cards = [...home.servicesSection.cards];
    cards[i] = { ...cards[i], ...p };
    patch({ servicesSection: { ...home.servicesSection, cards } });
  }
  function updImg(i: number, p: Partial<PagesContent["home"]["showroom"]["images"][number]>) {
    const images = [...home.showroom.images];
    images[i] = { ...images[i], ...p };
    patch({ showroom: { ...home.showroom, images } });
  }
}

function AboutEditor({ pages, set }: { pages: PagesContent; set: Setter }) {
  const about = pages.about;
  const patch = (p: Partial<PagesContent["about"]>) => set({ ...pages, about: { ...about, ...p } });

  return (
    <div className="mt-6 space-y-6">
      <AdminCard title="Hero">
        <HeadingFields data={about.hero} onChange={(v) => patch({ hero: { ...about.hero, ...v } })} />
        <div className="mt-4">
          <ImageField label="Hero image" value={about.hero.image} onChange={(v) => patch({ hero: { ...about.hero, image: v } })} />
        </div>
      </AdminCard>

      <AdminCard title="Stats">
        <div className="space-y-3">
          {about.stats.map((s: Stat, i) => (
            <div key={i} className="flex items-end gap-2">
              <AdminInput label="Value" value={s.value} className="flex-1" onChange={(v) => updStat(i, { value: v })} />
              <AdminInput label="Label" value={s.label} className="flex-1" onChange={(v) => updStat(i, { label: v })} />
              <button type="button" onClick={() => patch({ stats: about.stats.filter((_, j) => j !== i) })} className="mb-1.5 rounded-lg border border-red-500/40 px-3 py-2 text-[12px] font-semibold text-red-300 hover:bg-red-500/10">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => patch({ stats: [...about.stats, { value: "", label: "" }] })} className="rounded-full border border-white/20 px-4 py-1.5 text-[13px] font-semibold text-white/80 hover:border-white/40 hover:text-white">+ Add stat</button>
        </div>
      </AdminCard>

      <AdminCard title="Sectors served">
        <StringListField label="Sectors" values={about.sectors} onChange={(v) => patch({ sectors: v })} />
      </AdminCard>

      <AdminCard title="Leadership points">
        <PointsEditor label="Points" points={about.leadPoints} onChange={(v) => patch({ leadPoints: v })} />
      </AdminCard>

      <AdminCard title="Showroom & team images">
        <div className="grid gap-4 md:grid-cols-2">
          <ImageField label="Showroom image" value={about.showroomImage} onChange={(v) => patch({ showroomImage: v })} />
          <ImageField label="Team image" value={about.teamImage} onChange={(v) => patch({ teamImage: v })} />
        </div>
      </AdminCard>

      <AdminCard title="Installation gallery">
        <div className="space-y-4">
          {about.gallery.map((g, i) => (
            <div key={i} className="rounded-xl border border-white/5 p-4">
              <ImageField label={`Image ${i + 1}`} value={g.src} onChange={(v) => updGallery(i, { src: v })} />
              <AdminInput label="Alt text" value={g.alt} className="mt-3" onChange={(v) => updGallery(i, { alt: v })} />
              <button type="button" onClick={() => patch({ gallery: about.gallery.filter((_, j) => j !== i) })} className="mt-2 text-[13px] font-semibold text-red-300 hover:text-red-200">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => patch({ gallery: [...about.gallery, { src: "", alt: "" }] })} className="rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold text-white/80 hover:border-white/40 hover:text-white">+ Add image</button>
        </div>
      </AdminCard>
    </div>
  );

  function updStat(i: number, p: Partial<Stat>) {
    const stats = [...about.stats];
    stats[i] = { ...stats[i], ...p };
    patch({ stats });
  }
  function updGallery(i: number, p: Partial<PagesContent["about"]["gallery"][number]>) {
    const gallery = [...about.gallery];
    gallery[i] = { ...gallery[i], ...p };
    patch({ gallery });
  }
}

function ServicesEditor({ pages, set }: { pages: PagesContent; set: Setter }) {
  const services = pages.services;
  const patch = (p: Partial<PagesContent["services"]>) => set({ ...pages, services: { ...services, ...p } });

  return (
    <div className="mt-6 space-y-6">
      <AdminCard title="Hero">
        <HeadingFields data={services.hero} onChange={(v) => patch({ hero: { ...services.hero, ...v } })} />
        <div className="mt-4">
          <ImageField label="Hero image" value={services.hero.image} onChange={(v) => patch({ hero: { ...services.hero, image: v } })} />
        </div>
      </AdminCard>

      <AdminCard title="Overview">
        <HeadingFields data={services.overview} onChange={(v) => patch({ overview: { ...services.overview, ...v } })} />
      </AdminCard>

      <AdminCard title="Service items">
        <div className="space-y-4">
          {services.items.map((item, i) => (
            <div key={i} className="rounded-xl border border-white/5 p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <AdminInput label="ID (anchor)" value={item.id} onChange={(v) => updItem(i, { id: v })} />
                <AdminInput label="Icon key" value={item.icon} onChange={(v) => updItem(i, { icon: v })} />
                <AdminInput label="Title" value={item.title} onChange={(v) => updItem(i, { title: v })} />
                <AdminInput label="CTA label" value={item.cta} onChange={(v) => updItem(i, { cta: v })} />
              </div>
              <AdminInput label="Text" value={item.text} rows={3} className="mt-3" onChange={(v) => updItem(i, { text: v })} />
              <div className="mt-3">
                <ImageField label="Image (optional)" value={item.image || ""} onChange={(v) => updItem(i, { image: v || undefined })} />
              </div>
              <button type="button" onClick={() => patch({ items: services.items.filter((_, j) => j !== i) })} className="mt-2 text-[13px] font-semibold text-red-300 hover:text-red-200">Remove item</button>
            </div>
          ))}
          <button type="button" onClick={() => patch({ items: [...services.items, { id: "", title: "", text: "", cta: "", icon: "shield" }] })} className="rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold text-white/80 hover:border-white/40 hover:text-white">+ Add service</button>
        </div>
      </AdminCard>

      <AdminCard title="Installation gallery">
        <div className="space-y-4">
          {services.installationGallery.map((g, i) => (
            <div key={i} className="rounded-xl border border-white/5 p-4">
              <ImageField label={`Image ${i + 1}`} value={g.src} onChange={(v) => updGallery(i, { src: v })} />
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <AdminInput label="Alt text" value={g.alt} onChange={(v) => updGallery(i, { alt: v })} />
                <AdminInput label="Caption" value={g.caption} onChange={(v) => updGallery(i, { caption: v })} />
              </div>
              <button type="button" onClick={() => patch({ installationGallery: services.installationGallery.filter((_, j) => j !== i) })} className="mt-2 text-[13px] font-semibold text-red-300 hover:text-red-200">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => patch({ installationGallery: [...services.installationGallery, { src: "", alt: "", caption: "" }] })} className="rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold text-white/80 hover:border-white/40 hover:text-white">+ Add image</button>
        </div>
      </AdminCard>

      <AdminCard title="Why choose us">
        <PointsEditor label="Points" points={services.whyPoints} onChange={(v) => patch({ whyPoints: v })} />
      </AdminCard>

      <AdminCard title="FAQs">
        <div className="space-y-4">
          {services.faqs.map((f: Faq, i) => (
            <div key={i} className="rounded-xl border border-white/5 p-4">
              <AdminInput label="Question" value={f.q} onChange={(v) => updFaq(i, { q: v })} />
              <AdminInput label="Answer" value={f.a} rows={3} className="mt-3" onChange={(v) => updFaq(i, { a: v })} />
              <button type="button" onClick={() => patch({ faqs: services.faqs.filter((_, j) => j !== i) })} className="mt-2 text-[13px] font-semibold text-red-300 hover:text-red-200">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => patch({ faqs: [...services.faqs, { q: "", a: "" }] })} className="rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold text-white/80 hover:border-white/40 hover:text-white">+ Add FAQ</button>
        </div>
      </AdminCard>
    </div>
  );

  function updItem(i: number, p: Partial<PagesContent["services"]["items"][number]>) {
    const items = [...services.items];
    items[i] = { ...items[i], ...p };
    patch({ items });
  }
  function updGallery(i: number, p: Partial<PagesContent["services"]["installationGallery"][number]>) {
    const gallery = [...services.installationGallery];
    gallery[i] = { ...gallery[i], ...p };
    patch({ installationGallery: gallery });
  }
  function updFaq(i: number, p: Partial<Faq>) {
    const faqs = [...services.faqs];
    faqs[i] = { ...faqs[i], ...p };
    patch({ faqs });
  }
}

function ContactEditor({ pages, set }: { pages: PagesContent; set: Setter }) {
  const contact = pages.contact;
  return (
    <AdminCard title="Contact page images" className="mt-6">
      <p className="mb-4 text-[13px] text-white/55">
        Phone numbers, address and map come from <strong>Site Settings</strong>. These control the contact page imagery.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <ImageField label="Hero background image" value={contact.heroImage} onChange={(v) => set({ ...pages, contact: { ...contact, heroImage: v } })} />
        <ImageField label="Showroom image" value={contact.showroomImage} onChange={(v) => set({ ...pages, contact: { ...contact, showroomImage: v } })} />
      </div>
    </AdminCard>
  );
}

/* ---------- page ---------- */

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

  const known = ["hero", "reviews", "instagram", "home", "about", "services", "contact"];

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
                <ImageField label="Image" value={slide.img} onChange={(v) => {
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

      {section === "instagram" && (
        <>
          <AdminCard title="Instagram header" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput label="Handle" value={pages.instagramMeta.handle} onChange={(v) => setPages({ ...pages, instagramMeta: { ...pages.instagramMeta, handle: v } })} />
              <AdminInput label="Title" value={pages.instagramMeta.title} onChange={(v) => setPages({ ...pages, instagramMeta: { ...pages.instagramMeta, title: v } })} />
              <AdminInput label="Subtitle" value={pages.instagramMeta.subtitle} onChange={(v) => setPages({ ...pages, instagramMeta: { ...pages.instagramMeta, subtitle: v } })} rows={2} className="md:col-span-2" />
            </div>
          </AdminCard>
          {pages.instagramPosts.map((post, i) => (
            <AdminCard key={i} title={`Post ${i + 1}`} className="mt-4">
              <div className="space-y-4">
                <ImageField label="Image" value={post.image} onChange={(v) => { const instagramPosts = [...pages.instagramPosts]; instagramPosts[i] = { ...post, image: v }; setPages({ ...pages, instagramPosts }); }} />
                <div className="grid gap-4 md:grid-cols-2">
                  <AdminInput label="Post link" value={post.href} onChange={(v) => { const instagramPosts = [...pages.instagramPosts]; instagramPosts[i] = { ...post, href: v }; setPages({ ...pages, instagramPosts }); }} />
                  <AdminInput label="Alt text" value={post.alt || ""} onChange={(v) => { const instagramPosts = [...pages.instagramPosts]; instagramPosts[i] = { ...post, alt: v }; setPages({ ...pages, instagramPosts }); }} />
                  <AdminInput label="Caption" value={post.caption} onChange={(v) => { const instagramPosts = [...pages.instagramPosts]; instagramPosts[i] = { ...post, caption: v }; setPages({ ...pages, instagramPosts }); }} rows={2} className="md:col-span-2" />
                </div>
              </div>
            </AdminCard>
          ))}
          <SaveBar onSave={() => save(pages)} saving={saving} message={msg} />
        </>
      )}

      {section === "home" && (
        <>
          <HomeEditor pages={pages} set={setPages} />
          <SaveBar onSave={() => save(pages)} saving={saving} message={msg} />
        </>
      )}

      {section === "about" && (
        <>
          <AboutEditor pages={pages} set={setPages} />
          <SaveBar onSave={() => save(pages)} saving={saving} message={msg} />
        </>
      )}

      {section === "services" && (
        <>
          <ServicesEditor pages={pages} set={setPages} />
          <SaveBar onSave={() => save(pages)} saving={saving} message={msg} />
        </>
      )}

      {section === "contact" && (
        <>
          <ContactEditor pages={pages} set={setPages} />
          <SaveBar onSave={() => save(pages)} saving={saving} message={msg} />
        </>
      )}

      {!known.includes(section) && <p className="mt-6 text-white/60">Unknown section.</p>}
    </div>
  );
}
