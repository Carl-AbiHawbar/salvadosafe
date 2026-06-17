import type { GradeModel } from "@/lib/grade-types";

function formatWeight(value: string): string {
  return /^[\d.,-]+$/.test(value) ? `${value} kg` : value;
}

function formatDims(value?: string): string {
  if (!value) return "—";
  return value.replace(/\s+x\s+/gi, " × ");
}

const SPEC_ROWS: {
  key: keyof GradeModel["specs"];
  label: string;
  shortLabel: string;
  format?: (v: string) => string;
}[] = [
  { key: "external", label: "External (H × W × D mm)", shortLabel: "External", format: formatDims },
  { key: "internal", label: "Internal (H × W × D mm)", shortLabel: "Internal", format: formatDims },
  { key: "weight", label: "Weight", shortLabel: "Weight", format: formatWeight },
  { key: "volume", label: "Volume", shortLabel: "Volume" },
  { key: "shelves", label: "Shelves", shortLabel: "Shelves" },
  { key: "bolts", label: "Bolts", shortLabel: "Bolts" },
];

function specValue(model: GradeModel, key: keyof GradeModel["specs"], format?: (v: string) => string): string {
  const raw = model.specs[key];
  if (!raw) return "—";
  return format ? format(raw) : raw;
}

export function GradeSpecTable({ models }: { models: GradeModel[] }) {
  return (
    <>
      {/* Mobile + small tablet: card list */}
      <div className="space-y-3 md:hidden">
        {models.map((model) => (
          <article key={model.name} className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
            <div className="border-b border-line bg-surface px-4 py-3">
              <h3 className="text-[15px] font-bold tracking-tight text-brand">{model.name}</h3>
            </div>
            <dl className="divide-y divide-line">
              {SPEC_ROWS.map(({ key, shortLabel, format }) => (
                <div key={key} className="flex items-center justify-between gap-4 px-4 py-3">
                  <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-muted">{shortLabel}</dt>
                  <dd className="text-right text-[13px] font-medium leading-snug text-ink whitespace-nowrap">
                    {specValue(model, key, format)}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      {/* Desktop: comparison table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-line md:block">
        <table className="w-full min-w-[760px] text-left text-[14px]">
          <thead className="bg-surface text-[11px] font-bold uppercase tracking-wider text-muted lg:text-[12px]">
            <tr>
              <th className="sticky left-0 z-10 bg-surface px-4 py-3.5 whitespace-nowrap shadow-[4px_0_8px_-4px_rgba(0,0,0,0.08)]">
                Model
              </th>
              {SPEC_ROWS.map(({ key, label }) => (
                <th key={key} className="px-4 py-3.5 whitespace-nowrap">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {models.map((model, i) => (
              <tr key={model.name} className={i % 2 ? "bg-surface" : "bg-white"}>
                <td
                  className={`sticky left-0 z-10 px-4 py-3.5 font-semibold whitespace-nowrap text-ink shadow-[4px_0_8px_-4px_rgba(0,0,0,0.06)] ${
                    i % 2 ? "bg-surface" : "bg-white"
                  }`}
                >
                  {model.name}
                </td>
                {SPEC_ROWS.map(({ key, format }) => (
                  <td key={key} className="px-4 py-3.5 whitespace-nowrap text-ink-2">
                    {specValue(model, key, format)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
