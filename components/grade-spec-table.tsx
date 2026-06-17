import type { GradeModel } from "@/lib/grade-types";

function formatWeight(value: string): string {
  return /^[\d.,-]+$/.test(value) ? `${value} kg` : value;
}

export function GradeSpecTable({ models }: { models: GradeModel[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[720px] text-left text-[13px] sm:text-[14px]">
        <thead className="bg-surface text-[11px] font-bold uppercase tracking-wider text-muted sm:text-[12px]">
          <tr>
            <th className="px-4 py-3.5">Model</th>
            <th className="px-4 py-3.5">External (H × W × D mm)</th>
            <th className="px-4 py-3.5">Internal (H × W × D mm)</th>
            <th className="px-4 py-3.5">Weight</th>
            <th className="px-4 py-3.5">Volume</th>
            <th className="px-4 py-3.5">Shelves</th>
            <th className="px-4 py-3.5">Bolts</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model, i) => (
            <tr key={model.name} className={i % 2 ? "bg-surface" : "bg-white"}>
              <td className="px-4 py-3.5 font-semibold text-ink">{model.name}</td>
              <td className="px-4 py-3.5 text-ink-2">{model.specs.external || "—"}</td>
              <td className="px-4 py-3.5 text-ink-2">{model.specs.internal || "—"}</td>
              <td className="px-4 py-3.5 text-ink-2">
                {model.specs.weight ? formatWeight(model.specs.weight) : "—"}
              </td>
              <td className="px-4 py-3.5 text-ink-2">{model.specs.volume || "—"}</td>
              <td className="px-4 py-3.5 text-ink-2">{model.specs.shelves || "—"}</td>
              <td className="px-4 py-3.5 text-ink-2">{model.specs.bolts || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
