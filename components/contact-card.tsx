import { PhoneIcon, WhatsAppIcon, PinIcon, QuoteIcon } from "./icons";

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
};

const cardCls =
  "flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6 shadow-card";

export function ContactCard({ icon, label, value }: ContactCardProps) {
  const Icon = icons[icon];

  return (
    <div className={cardCls}>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
        <Icon width={20} height={20} />
      </div>
      <div>
        <p className="text-[13px] font-semibold text-muted">{label}</p>
        <p className="mt-0.5 text-[15px] font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}
