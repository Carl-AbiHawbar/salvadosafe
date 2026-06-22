"use client";

import { useEffect, useState } from "react";
import { AdminCard, AdminInput, SaveBar, saveContent } from "@/components/admin/admin-shell";
import type { SiteConfig } from "@/lib/content";

export default function AdminSitePage() {
  const [data, setData] = useState<SiteConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/content/site")
      .then((r) => r.json())
      .then(setData);
  }, []);

  async function save() {
    if (!data) return;
    setSaving(true);
    setMsg("");
    try {
      await saveContent("site", data);
      setMsg("Saved successfully.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Save failed");
    }
    setSaving(false);
  }

  if (!data) return <p className="text-white/60">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-white">Site Settings</h1>
      <p className="mt-2 text-[15px] text-white/60">Contact details shown in header, footer, and contact page.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <AdminCard title="General">
          <div className="space-y-4">
            <AdminInput label="Site name" value={data.name} onChange={(v) => setData({ ...data, name: v })} />
            <AdminInput label="Short name" value={data.shortName} onChange={(v) => setData({ ...data, shortName: v })} />
            <AdminInput label="Tagline" value={data.tagline} onChange={(v) => setData({ ...data, tagline: v })} />
            <AdminInput label="Email" value={data.email} onChange={(v) => setData({ ...data, email: v })} />
            <AdminInput label="Location" value={data.location} onChange={(v) => setData({ ...data, location: v })} />
            <AdminInput label="Address" value={data.address} onChange={(v) => setData({ ...data, address: v })} rows={2} />
          </div>
        </AdminCard>

        <AdminCard title="Phones and hours">
          <div className="space-y-4">
            <AdminInput label="Landline label" value={data.phones.landline.label} onChange={(v) => setData({ ...data, phones: { ...data.phones, landline: { ...data.phones.landline, label: v } } })} />
            <AdminInput label="Landline tel" value={data.phones.landline.tel} onChange={(v) => setData({ ...data, phones: { ...data.phones, landline: { ...data.phones.landline, tel: v } } })} />
            <AdminInput label="WhatsApp label" value={data.phones.whatsapp.label} onChange={(v) => setData({ ...data, phones: { ...data.phones, whatsapp: { ...data.phones.whatsapp, label: v } } })} />
            <AdminInput label="WhatsApp tel" value={data.phones.whatsapp.tel} onChange={(v) => setData({ ...data, phones: { ...data.phones, whatsapp: { ...data.phones.whatsapp, tel: v } } })} />
            <AdminInput label="WhatsApp wa.me number" value={data.phones.whatsapp.wa} onChange={(v) => setData({ ...data, phones: { ...data.phones, whatsapp: { ...data.phones.whatsapp, wa: v } } })} />
            <AdminInput label="Mobile label" value={data.phones.mobile.label} onChange={(v) => setData({ ...data, phones: { ...data.phones, mobile: { ...data.phones.mobile, label: v } } })} />
            <AdminInput label="Mobile tel" value={data.phones.mobile.tel} onChange={(v) => setData({ ...data, phones: { ...data.phones, mobile: { ...data.phones.mobile, tel: v } } })} />
            <AdminInput label="Weekday hours" value={data.hours.weekdays} onChange={(v) => setData({ ...data, hours: { ...data.hours, weekdays: v } })} />
            <AdminInput label="Saturday hours" value={data.hours.saturday} onChange={(v) => setData({ ...data, hours: { ...data.hours, saturday: v } })} />
          </div>
        </AdminCard>

        <AdminCard title="Social and maps" className="lg:col-span-2">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput label="Instagram URL" value={data.socials.instagram} onChange={(v) => setData({ ...data, socials: { ...data.socials, instagram: v } })} />
            <AdminInput label="Facebook URL" value={data.socials.facebook} onChange={(v) => setData({ ...data, socials: { ...data.socials, facebook: v } })} />
            <AdminInput label="Google Maps link" value={data.maps} onChange={(v) => setData({ ...data, maps: v })} />
            <AdminInput label="Maps embed URL" value={data.mapsEmbed} onChange={(v) => setData({ ...data, mapsEmbed: v })} rows={3} />
          </div>
        </AdminCard>
      </div>

      <SaveBar onSave={save} saving={saving} message={msg} />
    </div>
  );
}
