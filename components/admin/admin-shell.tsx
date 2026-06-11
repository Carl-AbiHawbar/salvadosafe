"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/site", label: "Site Settings" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/pages", label: "Page Content" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
      <header className="border-b border-white/10 bg-[#14161a]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-display text-xl font-bold text-white">
              Salvado <span className="text-brand">Admin</span>
            </Link>
            <nav className="hidden gap-1 md:flex">
              {links.map((l) => {
                const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors ${
                      active ? "bg-brand text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="text-[13px] font-semibold text-white/60 hover:text-white">
              View site ↗
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-white/15 px-3 py-2 text-[13px] font-semibold text-white/80 hover:bg-white/10"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}

export function AdminCard({ title, children, className = "" }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-[#14161a] p-6 ${className}`}>
      {title && <h2 className="mb-4 text-lg font-bold text-white">{title}</h2>}
      {children}
    </div>
  );
}

export function AdminInput({
  label,
  value,
  onChange,
  type = "text",
  rows,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  rows?: number;
  className?: string;
}) {
  const cls =
    "mt-1.5 w-full rounded-xl border border-white/10 bg-[#0f1115] px-4 py-2.5 text-[14px] text-white outline-none focus:border-brand";
  return (
    <label className={`block ${className}`}>
      <span className="text-[13px] font-semibold text-white/70">{label}</span>
      {rows ? (
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </label>
  );
}

export function SaveBar({
  onSave,
  saving,
  message,
}: {
  onSave: () => void;
  saving: boolean;
  message?: string;
}) {
  return (
    <div className="sticky bottom-4 z-10 mt-8 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#14161a]/95 px-5 py-4 backdrop-blur">
      <p className="text-[13px] text-white/60">{message || "Save changes to update the live website."}</p>
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="rounded-full bg-brand px-6 py-2.5 text-[14px] font-semibold text-white disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
    </div>
  );
}

export async function saveContent(file: string, data: unknown) {
  const res = await fetch(`/api/admin/content/${file}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Save failed");
  }
}
