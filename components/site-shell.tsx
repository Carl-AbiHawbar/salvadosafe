"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { Floating } from "./floating";
import type { Category } from "@/lib/catalog";

export function SiteShell({
  children,
  featuredCategories,
  secondaryCategories,
}: {
  children: React.ReactNode;
  featuredCategories: Category[];
  secondaryCategories: Category[];
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header featuredCategories={featuredCategories} secondaryCategories={secondaryCategories} />
      <main className="flex-1">{children}</main>
      <Footer featuredCategories={featuredCategories} />
      <Floating />
    </>
  );
}
