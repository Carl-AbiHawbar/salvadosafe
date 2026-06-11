"use client";

import { useState } from "react";
import { useSite } from "./site-provider";
import { WhatsAppIcon } from "./icons";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[14.5px] text-ink outline-none transition-colors placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/15";

export function LeadForm({
  variant = "contact",
  className = "",
}: {
  variant?: "contact" | "service";
  className?: string;
}) {
  const site = useSite();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const lines: string[] = [];
    lines.push(`New ${variant === "service" ? "service request" : "inquiry"} from the website:`);
    lines.push("");
    lines.push(`Name: ${data.get("name") || "-"}`);
    lines.push(`Phone / WhatsApp: ${data.get("phone") || "-"}`);
    if (variant === "service") lines.push(`Service needed: ${data.get("service") || "-"}`);
    if (data.get("product")) lines.push(`Product / model: ${data.get("product")}`);
    if (data.get("location")) lines.push(`Location: ${data.get("location")}`);
    lines.push(`Message: ${data.get("message") || "-"}`);

    const url = `https://wa.me/${site.phones.whatsapp.wa}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className={`rounded-3xl border border-line bg-white p-7 shadow-soft md:p-9 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-ink-2">Name</label>
          <input name="name" required placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-ink-2">Phone / WhatsApp</label>
          <input name="phone" required placeholder="e.g. 70 273 313" className={inputCls} />
        </div>
        {variant === "service" && (
          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-ink-2">Service needed</label>
            <select name="service" className={inputCls} defaultValue="">
              <option value="" disabled>Select a service</option>
              <option>Consultation, Delivery &amp; Installation</option>
              <option>Master Locksmith / Safe Opening</option>
              <option>Safe Repair &amp; Maintenance</option>
              <option>Vault Doors &amp; Vault Rooms</option>
              <option>Safe Relocation</option>
              <option>After-Sales Technical Support</option>
            </select>
          </div>
        )}
        <div>
          <label className="mb-1.5 block text-[13px] font-semibold text-ink-2">
            Product / model {variant === "service" ? "(if available)" : "(optional)"}
          </label>
          <input name="product" placeholder="e.g. S-59E" className={inputCls} />
        </div>
        <div className={variant === "service" ? "" : "sm:col-span-2"}>
          <label className="mb-1.5 block text-[13px] font-semibold text-ink-2">Location</label>
          <input name="location" placeholder="City / area" className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-[13px] font-semibold text-ink-2">Message</label>
          <textarea name="message" rows={4} placeholder="Tell us what you need..." className={inputCls} />
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-all hover:border-brand hover:bg-brand-soft active:scale-[0.99] sm:w-auto"
      >
        <WhatsAppIcon width={20} height={20} /> {variant === "service" ? "Submit Service Request" : "Send via WhatsApp"}
      </button>

      {sent && (
        <p className="mt-4 text-[13.5px] text-emerald-700">
          WhatsApp is opening with your details — just press send to reach our team. You can also call us directly at {site.phones.landline.label}.
        </p>
      )}
    </form>
  );
}
