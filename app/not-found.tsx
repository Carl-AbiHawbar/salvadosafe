import Link from "next/link";
import { getCategories } from "@/lib/catalog";

export default function NotFound() {
  const categories = getCategories().slice(0, 6);

  return (
    <div className="container-x py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-brand">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink md:text-5xl">Page not found</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-ink-2">
          The page you are looking for may have moved. Browse our safes, vault doors, and security solutions in Lebanon.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-brand px-6 py-3 text-[14px] font-semibold text-white hover:brightness-110">
            Home
          </Link>
          <Link href="/products" className="rounded-full border border-line px-6 py-3 text-[14px] font-semibold text-ink hover:border-brand hover:text-brand">
            All Products
          </Link>
          <Link href="/contact" className="rounded-full border border-line px-6 py-3 text-[14px] font-semibold text-ink hover:border-brand hover:text-brand">
            Contact Us
          </Link>
        </div>
        <div className="mt-12 text-left">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-muted">Popular categories</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="text-[15px] text-ink-2 hover:text-brand">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
