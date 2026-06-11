import Link from "next/link";
import { getProducts } from "@/lib/catalog";

export default function AdminProductsPage() {
  const products = getProducts();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Products</h1>
          <p className="mt-2 text-[15px] text-white/60">{products.length} products — click to edit.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-brand px-5 py-2.5 text-[14px] font-semibold text-white"
        >
          + Add product
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-[14px]">
          <thead className="bg-[#14161a] text-white/60">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">Category</th>
              <th className="hidden px-4 py-3 font-semibold lg:table-cell">Sub</th>
              <th className="px-4 py-3 font-semibold">Slug</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.slug} className="border-t border-white/5 hover:bg-white/[0.03]">
                <td className="px-4 py-3">
                  <Link href={`/admin/products/${p.slug}`} className="font-semibold text-white hover:text-brand">
                    {p.name}
                  </Link>
                </td>
                <td className="hidden px-4 py-3 text-white/60 md:table-cell">{p.category}</td>
                <td className="hidden px-4 py-3 text-white/60 lg:table-cell">{p.sub || "—"}</td>
                <td className="px-4 py-3 text-white/45">{p.slug}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
