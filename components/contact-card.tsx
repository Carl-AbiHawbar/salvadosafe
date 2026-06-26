"use client";

import { PhoneIcon, WhatsAppIcon, PinIcon, QuoteIcon } from "./icons";
import { WhatsAppAnchor } from "./whatsapp-anchor";

const icons = {
  phone: PhoneIcon,
  whatsapp: WhatsAppIcon,
  pin: PinIcon,
  quote: QuoteIcon,
} as const;

type IconKey = keyof typeof icons;

type ContactCardProps = {
  icon: IconKey;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  whatsapp?: boolean;
};

const cardCls =
  "flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft";

export function ContactCard({ icon, label, value, href, external, whatsapp }: ContactCardProps) {
  const Icon = icons[icon];
  const content = (
    <>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
        <Icon width={20} height={20} />
      </div>
      <div>
        <p className="text-[13px] font-semibold text-muted">{label}</p>
        <p className="mt-0.5 text-[15px] font-bold text-ink">{value}</p>
      </div>
    </>
  );

  if (whatsapp) {
    return (
      <WhatsAppAnchor href={href} className={cardCls}>
        {content}
      </WhatsAppAnchor>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cardCls}
    >
      {content}
    </a>
  );
}
