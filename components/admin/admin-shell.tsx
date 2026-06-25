"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";

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

const MAX_UPLOAD_DIMENSION = 1600;
const PASSTHROUGH_TYPES = new Set(["image/svg+xml", "image/gif"]);

/** Downscale + re-encode an image in the browser so uploads stay fast and small. */
async function compressImage(file: File): Promise<File> {
  if (PASSTHROUGH_TYPES.has(file.type) || !file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;
    const longest = Math.max(width, height);
    const scale = longest > MAX_UPLOAD_DIMENSION ? MAX_UPLOAD_DIMENSION / longest : 1;
    const w = Math.round(width * scale);
    const h = Math.round(height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.82)
    );
    if (!blob || blob.size >= file.size) return file; // keep original if no win
    const base = file.name.replace(/\.[^.]+$/, "");
    return new File([blob], `${base}.webp`, { type: "image/webp" });
  } catch {
    return file;
  }
}

export async function uploadImage(file: File): Promise<string> {
  const compressed = await compressImage(file);
  const form = new FormData();
  form.append("file", compressed, compressed.name);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Upload failed");
  }
  const { path } = (await res.json()) as { path: string };
  return path;
}

/** Text input + upload button + thumbnail preview for a single image path. */
export function ImageField({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadImage(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    }
    setBusy(false);
  }

  return (
    <div className={`block ${className}`}>
      <span className="text-[13px] font-semibold text-white/70">{label}</span>
      <div className="mt-1.5 flex items-start gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#0f1115]">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-[10px] text-white/30">
              none
            </span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/... or paste a URL"
            className="w-full rounded-xl border border-white/10 bg-[#0f1115] px-4 py-2.5 text-[14px] text-white outline-none focus:border-brand"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="rounded-full border border-white/20 px-4 py-1.5 text-[13px] font-semibold text-white/80 hover:border-white/40 hover:text-white disabled:opacity-60"
            >
              {busy ? "Uploading…" : "Upload image"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="text-[13px] font-semibold text-white/40 hover:text-white/70"
              >
                Clear
              </button>
            )}
            {error && <span className="text-[12px] text-red-300">{error}</span>}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
      </div>
    </div>
  );
}

/** Editable list of image paths (add / upload / reorder-free remove). */
export function ImageListField({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div>
      <span className="text-[13px] font-semibold text-white/70">{label}</span>
      <div className="mt-2 space-y-3">
        {values.map((v, i) => (
          <div key={i} className="flex items-end gap-2">
            <ImageField
              label={`Image ${i + 1}`}
              value={v}
              onChange={(nv) => {
                const next = [...values];
                next[i] = nv;
                onChange(next);
              }}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="mb-1 rounded-lg border border-red-500/40 px-3 py-2 text-[12px] font-semibold text-red-300 hover:bg-red-500/10"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="rounded-full border border-white/20 px-4 py-2 text-[13px] font-semibold text-white/80 hover:border-white/40 hover:text-white"
        >
          + Add image
        </button>
      </div>
    </div>
  );
}
