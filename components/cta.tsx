import Link from "next/link";
import { site, waLink, telLink } from "@/lib/site";
import { WhatsAppIcon, PhoneIcon, QuoteIcon, PinIcon, ArrowIcon } from "./icons";

type Variant =
  | "wa"
  | "primary"
  | "primaryLight"
  | "outline"
  | "outlineLight"
  | "ghost"
  | "ghostLight"
  | "dark";

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-all duration-200 whitespace-nowrap text-[11px] px-3 py-2 active:scale-[0.98] [&_svg]:shrink-0 md:gap-2 md:text-[14px] md:px-6 md:py-3";

const variants: Record<Variant, string> = {
  wa: "border border-line bg-white text-ink hover:border-brand hover:bg-brand-soft shadow-sm",
  primary:
    "border border-brand bg-brand !text-white hover:bg-brand-dark shadow-[0_8px_20px_rgba(184,13,13,0.22)] [&_svg]:stroke-white",
  primaryLight:
    "border border-brand/90 bg-brand/10 !text-white backdrop-blur-sm hover:bg-brand/25 [&_svg]:stroke-white",
  outline: "border border-brand/70 text-brand bg-white hover:bg-brand-soft",
  outlineLight:
    "border border-white/40 bg-white/10 !text-white backdrop-blur hover:bg-white/20 [&_svg]:stroke-white",
  ghost: "border border-line text-ink bg-white hover:border-ink/30",
  ghostLight:
    "border border-white/35 bg-white/10 !text-white backdrop-blur hover:bg-white/20 [&_svg]:stroke-white",
  dark: "bg-ink !text-white hover:bg-black [&_svg]:stroke-white",
};

function ResponsiveLabel({ label, shortLabel }: { label: string; shortLabel?: string }) {
  if (!shortLabel || shortLabel === label) return label;
  return (
    <>
      <span className="md:hidden">{shortLabel}</span>
      <span className="hidden md:inline">{label}</span>
    </>
  );
}

/** Horizontal row for hero / page CTAs — compact on mobile, wraps if needed */
export function CtaGroup({
  children,
  className = "",
  center = false,
}: {
  children: React.ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <div
      className={`flex flex-row flex-wrap items-center gap-2 md:gap-3 ${center ? "justify-center" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

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
  shortLabel = "WhatsApp",
  variant = "wa",
  className = "",
}: {
  message?: string;
  label?: string;
  shortLabel?: string;
  variant?: Variant;
  className?: string;
}) {
  const iconOnDark =
    variant === "outlineLight" || variant === "ghostLight" || variant === "primaryLight";
  return (
    <CTA href={waLink(message)} external variant={variant} className={className}>
      <WhatsAppIcon
        width={15}
        height={15}
        className={`md:h-[18px] md:w-[18px] ${iconOnDark ? "brightness-0 invert" : ""}`}
      />
      <ResponsiveLabel label={label} shortLabel={shortLabel} />
    </CTA>
  );
}

export function QuoteButton({
  label = "Request a Quote",
  shortLabel = "Quote",
  variant = "primary",
  className = "",
}: {
  label?: string;
  shortLabel?: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <CTA href="/contact" variant={variant} className={className}>
      <QuoteIcon width={15} height={15} className="md:h-[18px] md:w-[18px]" />
      <ResponsiveLabel label={label} shortLabel={shortLabel} />
    </CTA>
  );
}

export function CallButton({
  label = "Call the Showroom",
  shortLabel = "Call",
  variant = "ghost",
  className = "",
}: {
  label?: string;
  shortLabel?: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <CTA href={telLink(site.phones.landline.tel)} external variant={variant} className={className}>
      <PhoneIcon width={15} height={15} className="md:h-[18px] md:w-[18px]" />
      <ResponsiveLabel label={label} shortLabel={shortLabel} />
    </CTA>
  );
}

export function MapButton({
  label = "Visit the Showroom",
  shortLabel = "Visit",
  variant = "ghost",
  className = "",
}: {
  label?: string;
  shortLabel?: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <CTA href={site.maps} external variant={variant} className={className}>
      <PinIcon width={15} height={15} className="md:h-[18px] md:w-[18px]" />
      <ResponsiveLabel label={label} shortLabel={shortLabel} />
    </CTA>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand link-underline ${className}`}
    >
      {children} <ArrowIcon width={16} height={16} />
    </Link>
  );
}
