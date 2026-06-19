import { ArrowIcon } from "./icons";

export function CatalogShortcut({
  href = "#full-catalog",
  label = "View all products",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      aria-label={`${label} — jump to full catalogue`}
      className="fixed right-4 top-[38%] z-30 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-line bg-white px-4 py-3 text-[13px] font-semibold text-ink shadow-soft transition-all hover:border-brand hover:text-brand md:inline-flex lg:right-6"
    >
      {label}
      <ArrowIcon width={15} height={15} className="rotate-90" />
    </a>
  );
}
