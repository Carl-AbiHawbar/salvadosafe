import { Reveal } from "./reveal";
import { WhatsAppButton, QuoteButton, CallButton } from "./cta";
import { TruckIcon, ShieldIcon, ToolsIcon, HeadsetIcon } from "./icons";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`mb-3 text-[12px] font-bold uppercase tracking-[0.18em] ${light ? "text-brand" : "text-brand"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-3xl font-bold leading-tight md:text-[40px] ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {text && (
        <p className={`mt-4 text-[15.5px] leading-relaxed ${light ? "text-white/70" : "text-ink-2"}`}>{text}</p>
      )}
    </div>
  );
}

const defaultTrust = [
  { icon: TruckIcon, title: "Professional Delivery", text: "Careful handling and delivery based on product size, location, and site requirements." },
  { icon: ShieldIcon, title: "European-Standard Installation", text: "Professional installation according to European security norms and product specifications." },
  { icon: ToolsIcon, title: "Up to 5-Year Warranty", text: "Warranty support available according to product type and manufacturer terms." },
  { icon: HeadsetIcon, title: "Premium After-Sales Support", text: "Dedicated technical support, lock assistance, maintenance guidance, and long-term support." },
];

export function TrustStrip({ items = defaultTrust }: { items?: { icon: typeof TruckIcon; title: string; text: string }[] }) {
  return (
    <section className="border-y border-line bg-surface">
      <div className="container-x grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((t, i) => (
          <Reveal key={t.title} delay={i * 80} className="flex flex-col items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <t.icon />
            </div>
            <h3 className="text-[15px] font-bold text-ink">{t.title}</h3>
            <p className="text-[13.5px] leading-relaxed text-muted">{t.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FinalCTA({
  eyebrow = "Get in touch",
  title,
  text,
  waMessage,
}: {
  eyebrow?: string;
  title: string;
  text: string;
  waMessage?: string;
}) {
  return (
    <section className="bg-ink">
      <div className="container-x py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-[42px]">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-white/70">{text}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <WhatsAppButton message={waMessage} label="WhatsApp Salvado" />
            <QuoteButton />
            <CallButton variant="dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
