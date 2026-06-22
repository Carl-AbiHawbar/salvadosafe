import Link from "next/link";
import { AdminCard } from "@/components/admin/admin-shell";
import { getProducts, getCategories } from "@/lib/catalog";
import { getPagesContent } from "@/lib/content";

export default function AdminDashboard() {
  const productCount = getProducts().length;
  const categoryCount = getCategories().length;
  const pages = getPagesContent();

  const cards = [
    { href: "/admin/site", title: "Site Settings", desc: "Contact info, phones, social links, maps" },
    { href: "/admin/products", title: "Products", desc: `${productCount} products in catalogue` },
    { href: "/admin/categories", title: "Categories", desc: `${categoryCount} categories with FAQs and guides` },
    { href: "/admin/pages/hero", title: "Hero Slides", desc: `${pages.heroSlides.length} homepage banner slides` },
    { href: "/admin/pages/reviews", title: "Google Reviews", desc: `${pages.reviews.length} review cards` },
    { href: "/admin/pages/instagram", title: "Instagram Posts", desc: `${pages.instagramPosts.length} carousel posts` },
    { href: "/admin/pages/home", title: "Homepage", desc: "Proof strip, why Salvado, services, showroom" },
    { href: "/admin/pages/about", title: "About Page", desc: "Hero, stats, sectors, leadership points" },
    { href: "/admin/pages/services", title: "Services Page", desc: "Service cards, why choose, FAQs" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
      <p className="mt-2 text-[15px] text-white/60">Edit any content on the Salvado website.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="group">
            <AdminCard className="h-full transition-colors group-hover:border-brand/50">
              <h2 className="text-[17px] font-bold text-white group-hover:text-brand">{c.title}</h2>
              <p className="mt-2 text-[14px] text-white/55">{c.desc}</p>
            </AdminCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
