import Link from "next/link";
import { site, waLink, telLink } from "@/lib/site";
import { WhatsAppIcon, PhoneIcon, QuoteIcon, PinIcon, ArrowIcon } from "./icons";

type Variant = "wa" | "primary" | "outline" | "ghost" | "dark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 text-[14px] px-6 py-3 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  wa: "bg-wa text-white hover:brightness-105 shadow-[0_8px_20px_rgba(37,211,102,0.25)]",
  primary: "bg-brand text-white hover:bg-brand-dark shadow-[0_8px_20px_rgba(184,13,13,0.22)]",
  outline: "border border-brand/70 text-brand bg-white hover:bg-brand-soft",
  ghost: "border border-line text-ink bg-white hover:border-ink/30",
  dark: "bg-ink text-white hover:bg-black",
};

export function CTA({
  href,
  variant = "primary",
  children,
  className = "",
  external,
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function WhatsAppButton({
  message,
  label = "WhatsApp for Price",
  variant = "wa",
  className = "",
}: {
  message?: string;
  label?: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <CTA href={waLink(message)} external variant={variant} className={className}>
      <WhatsAppIcon /> {label}
    </CTA>
  );
}

export function QuoteButton({ label = "Request a Quote", variant = "primary", className = "" }: { label?: string; variant?: Variant; className?: string }) {
  return (
    <CTA href="/contact" variant={variant} className={className}>
      <QuoteIcon /> {label}
    </CTA>
  );
}

export function CallButton({ label = "Call the Showroom", variant = "ghost", className = "" }: { label?: string; variant?: Variant; className?: string }) {
  return (
    <CTA href={telLink(site.phones.landline.tel)} external variant={variant} className={className}>
      <PhoneIcon /> {label}
    </CTA>
  );
}

export function MapButton({ label = "Visit the Showroom", variant = "ghost", className = "" }: { label?: string; variant?: Variant; className?: string }) {
  return (
    <CTA href={site.maps} external variant={variant} className={className}>
      <PinIcon /> {label}
    </CTA>
  );
}

export function TextLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand link-underline ${className}`}>
      {children} <ArrowIcon width={16} height={16} />
    </Link>
  );
}
