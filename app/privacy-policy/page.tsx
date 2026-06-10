import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container-x py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-ink">Privacy Policy</h1>
        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-2">
          <p>
            {site.name} respects your privacy. This page explains, in simple terms, how we handle the information you
            share with us when you contact us, request a quote, or visit our showroom.
          </p>
          <h2 className="font-display text-xl font-bold text-ink">Information We Collect</h2>
          <p>
            When you submit an inquiry or service request, we may receive your name, phone or WhatsApp number, location,
            and any details you choose to share about the product or service you need.
          </p>
          <h2 className="font-display text-xl font-bold text-ink">How We Use It</h2>
          <p>
            We use your information only to respond to your inquiry, provide recommendations, prepare quotes, and arrange
            delivery, installation, or after-sales support. We do not sell your information.
          </p>
          <h2 className="font-display text-xl font-bold text-ink">Contact</h2>
          <p>
            For any privacy questions, contact us at{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand">{site.email}</a> or call{" "}
            {site.phones.landline.label}.
          </p>
        </div>
      </div>
    </div>
  );
}
