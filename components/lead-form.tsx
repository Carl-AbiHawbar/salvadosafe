"use client";

import { useState } from "react";
import { useSite } from "./site-provider";

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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      variant,
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      service: data.get("service") ? String(data.get("service")) : undefined,
      product: data.get("product") ? String(data.get("product")) : undefined,
      location: data.get("location") ? String(data.get("location")) : undefined,
      message: data.get("message") ? String(data.get("message")) : undefined,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        throw new Error(json.error || "Unable to send your message.");
      }

      setSent(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your message.");
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-brand-dark active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Sending..." : variant === "service" ? "Submit Service Request" : "Send Message"}
      </button>

      {sent && (
        <p className="mt-4 text-[13.5px] text-emerald-700">
          Thank you, your message was sent to our team. We&apos;ll reply on WhatsApp or by phone shortly. You can also reach us at {site.phones.landline.label}.
        </p>
      )}

      {error && (
        <p className="mt-4 text-[13.5px] text-brand">
          {error} Call us at {site.phones.landline.label} or WhatsApp {site.phones.whatsapp.label}.
        </p>
      )}
    </form>
  );
}
