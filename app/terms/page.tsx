import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function TermsPage() {
  return (
    <div className="container-x py-20 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-ink">Terms and Conditions</h1>
        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-2">
          <p>
            Welcome to {site.name}. By using this website, you agree to the following terms. Product availability,
            specifications, pricing, and warranty terms are confirmed directly with our team.
          </p>
          <h2 className="font-display text-xl font-bold text-ink">Products and Pricing</h2>
          <p>
            Prices are provided on request via call, WhatsApp, or quote. Specifications and certifications vary by model
            and are confirmed by our team before purchase.
          </p>
          <h2 className="font-display text-xl font-bold text-ink">Services</h2>
          <p>
            Delivery, installation, repair, relocation, and after-sales services are carried out according to product
            specifications and site conditions. Details are agreed before work begins.
          </p>
          <h2 className="font-display text-xl font-bold text-ink">Warranty</h2>
          <p>Warranty support is available according to product type and manufacturer terms.</p>
          <h2 className="font-display text-xl font-bold text-ink">Contact</h2>
          <p>
            Questions? Reach us at{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-brand">{site.email}</a> or {site.phones.landline.label}.
          </p>
        </div>
      </div>
    </div>
  );
}
