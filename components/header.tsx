"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite } from "./site-provider";
import type { Category } from "@/lib/catalog";
import { SiteSearch } from "./site-search";
import { WhatsAppIcon, PhoneIcon, PinIcon, ChevronDown, MenuIcon, CloseIcon, ArrowIcon, QuoteIcon } from "./icons";
import { waLink, telLink } from "@/lib/site";
import { WhatsAppAnchor } from "./whatsapp-anchor";

const services = [
  { label: "Consultation, Delivery and Installation", href: "/services#consultation" },
  { label: "Master Locksmith Services", href: "/services#locksmith" },
  { label: "Safe Repair and Maintenance", href: "/services#maintenance" },
  { label: "Vault Doors and Vault Rooms", href: "/services#vault" },
  { label: "Safe Relocation", href: "/services#relocation" },
  { label: "After-Sales Technical Support", href: "/services#support" },
];

const mainNav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", mega: "products" as const },
  { label: "Services", href: "/services", mega: "services" as const },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header({
  featuredCategories,
  secondaryCategories,
}: {
  featuredCategories: Category[];
  secondaryCategories: Category[];
}) {
  const site = useSite();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [desktopMega, setDesktopMega] = useState<string | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setExpanded(null);
    setDesktopMega(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* Slim top bar */}
      <div className="hidden bg-ink text-white md:block">
        <div className="container-x flex h-9 items-center justify-between text-[12.5px]">
          <div className="flex items-center gap-5">
            <a href={telLink(site.phones.landline.tel)} className="inline-flex items-center gap-1.5 hover:text-white/80">
              <PhoneIcon width={13} height={13} /> {site.phones.landline.label}
            </a>
            <WhatsAppAnchor href={waLink()} className="inline-flex items-center gap-1.5 hover:text-white/80">
              <WhatsAppIcon width={13} height={13} className="brightness-0 invert" /> {site.phones.whatsapp.label}
            </WhatsAppAnchor>
          </div>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 text-white/80">
              <PinIcon width={13} height={13} /> {site.location}
            </span>
            <a href={site.maps} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-white/80">
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-x flex h-[68px] items-center justify-between gap-4">
          {/* Mobile burger */}
          <button
            className="flex items-center justify-center rounded-lg p-1.5 text-ink md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Salvado home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/brand/logo.png" alt="Salvado Safe" className="h-9 w-auto md:h-10" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {mainNav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.mega && setDesktopMega(item.mega)}
                onMouseLeave={() => setDesktopMega(null)}
              >
                <Link
                  href={item.href}
                  onClick={() => setDesktopMega(null)}
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[14px] font-semibold transition-colors ${
                    isActive(item.href) ? "text-brand" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {item.label}
                  {item.mega && <ChevronDown width={13} height={13} className="opacity-60" />}
                </Link>

                {item.mega === "products" && (
                  <div
                    className={`absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3 transition-all duration-200 ${
                      desktopMega === "products"
                        ? "visible opacity-100"
                        : "invisible pointer-events-none opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 p-6">
                        <div>
                          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted">Main Categories</p>
                          {featuredCategories.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/category/${c.slug}`}
                              onClick={() => setDesktopMega(null)}
                              className="block rounded-lg px-3 py-2 text-[14px] font-medium text-ink-2 hover:bg-brand-soft hover:text-brand"
                            >
                              {c.name}
                            </Link>
                          ))}
                        </div>
                        <div>
                          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted">More Categories</p>
                          {secondaryCategories.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/category/${c.slug}`}
                              onClick={() => setDesktopMega(null)}
                              className="block rounded-lg px-3 py-2 text-[14px] font-medium text-ink-2 hover:bg-brand-soft hover:text-brand"
                            >
                              {c.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <Link
                        href="/products"
                        onClick={() => setDesktopMega(null)}
                        className="flex items-center justify-between border-t border-line bg-surface px-6 py-3.5 text-[14px] font-semibold text-brand hover:bg-brand-soft"
                      >
                        View All Products <ArrowIcon width={16} height={16} />
                      </Link>
                    </div>
                  </div>
                )}

                {item.mega === "services" && (
                  <div
                    className={`absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 pt-3 transition-all duration-200 ${
                      desktopMega === "services"
                        ? "visible opacity-100"
                        : "invisible pointer-events-none opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
                      <div className="p-3">
                        {services.map((s) => (
                          <Link
                            key={s.label}
                            href={s.href}
                            onClick={() => setDesktopMega(null)}
                            className="block rounded-lg px-3 py-2.5 text-[14px] font-medium text-ink-2 hover:bg-brand-soft hover:text-brand"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/contact"
                        onClick={() => setDesktopMega(null)}
                        className="flex items-center justify-between border-t border-line bg-surface px-6 py-3.5 text-[14px] font-semibold text-brand hover:bg-brand-soft"
                      >
                        Request a Service <ArrowIcon width={16} height={16} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <SiteSearch />
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full border border-brand bg-brand px-5 py-2.5 text-[13.5px] font-semibold !text-white transition-colors hover:bg-brand-dark md:inline-flex [&_svg]:stroke-white"
            >
              <QuoteIcon width={16} height={16} /> Request a Quote
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-[340px] overflow-y-auto bg-white shadow-soft">
            <div className="flex h-[68px] items-center justify-between border-b border-line px-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/brand/logo.png" alt="Salvado" className="h-8 w-auto" />
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="text-ink">
                <CloseIcon />
              </button>
            </div>
            <nav className="p-3">
              <div className="mb-3 px-3">
                <SiteSearch className="w-full justify-center" />
              </div>
              <Link href="/" className="block rounded-lg px-3 py-3 text-[15px] font-semibold text-ink hover:bg-surface">Home</Link>

              <MobileGroup label="Products" open={expanded === "products"} onToggle={() => setExpanded(expanded === "products" ? null : "products")}>
                <Link href="/products" onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-[14px] font-semibold text-brand">View All Products</Link>
                {[...featuredCategories, ...secondaryCategories].map((c) => (
                  <Link key={c.slug} href={`/category/${c.slug}`} onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-[14px] text-ink-2 hover:text-brand">{c.name}</Link>
                ))}
              </MobileGroup>

              <MobileGroup label="Services" open={expanded === "services"} onToggle={() => setExpanded(expanded === "services" ? null : "services")}>
                {services.map((s) => (
                  <Link key={s.label} href={s.href} onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-[14px] text-ink-2 hover:text-brand">{s.label}</Link>
                ))}
              </MobileGroup>

              <Link href="/blog" className="block rounded-lg px-3 py-3 text-[15px] font-semibold text-ink hover:bg-surface">Blog</Link>
              <Link href="/about" className="block rounded-lg px-3 py-3 text-[15px] font-semibold text-ink hover:bg-surface">About</Link>
              <Link href="/contact" className="block rounded-lg px-3 py-3 text-[15px] font-semibold text-ink hover:bg-surface">Contact</Link>

              <Link href="/contact" className="mt-3 flex items-center justify-center gap-2 rounded-full border border-brand bg-brand px-5 py-3 text-[14px] font-semibold !text-white [&_svg]:stroke-white">
                <QuoteIcon width={16} height={16} /> Request a Quote
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function MobileGroup({ label, open, onToggle, children }: { label: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div>
      <button onClick={onToggle} className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-[15px] font-semibold text-ink hover:bg-surface">
        {label}
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="ml-2 border-l border-line pl-2">{children}</div>}
    </div>
  );
}
