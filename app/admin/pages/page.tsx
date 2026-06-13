import Link from "next/link";

const sections = [
  { slug: "hero", title: "Hero Slides", desc: "Homepage banner carousel" },
  { slug: "reviews", title: "Google Reviews", desc: "Review cards on homepage" },
  { slug: "instagram", title: "Instagram Posts", desc: "Instagram carousel under reviews" },
  { slug: "home", title: "Homepage Sections", desc: "Proof strip, why Salvado, services, showroom, CTA" },
  { slug: "about", title: "About Page", desc: "Hero, stats, sectors, leadership" },
  { slug: "services", title: "Services Page", desc: "Hero, service cards, FAQs" },
];

export default function AdminPagesIndex() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-white">Page Content</h1>
      <p className="mt-2 text-[15px] text-white/60">Edit marketing copy and homepage sections.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.slug}
            href={`/admin/pages/${s.slug}`}
            className="rounded-2xl border border-white/10 bg-[#14161a] p-5 hover:border-brand/50"
          >
            <h2 className="font-bold text-white">{s.title}</h2>
            <p className="mt-1 text-[13px] text-white/55">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
