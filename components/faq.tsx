"use client";

import { useState } from "react";
import { ChevronDown } from "./icons";

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q || `faq-${i}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[15px] font-semibold text-ink">{item.q}</span>
              <ChevronDown
                className={`shrink-0 text-brand transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className="grid overflow-hidden px-6 transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0">
                <p className="pb-5 text-[14.5px] leading-relaxed text-ink-2">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
