"use client";

import { useRef } from "react";
import { StarIcon } from "./icons";

const reviews = [
  { name: "Abdo Sebaali", when: "1 month ago", text: "Best place to buy a safe!", color: "bg-slate-600" },
  { name: "Assaad Nader", when: "1 month ago", text: "We asked for a safety box at 11am and by 3pm it was fixed at our home — rapid and professional service.", color: "bg-indigo-600" },
  { name: "Robert Frayha", when: "1 month ago", text: "Great product, great service. Best choice.", color: "bg-rose-600" },
  { name: "Christine Soulaj", when: "1 month ago", text: "Excellent and fast service, safe is very high quality, made in Spain.", color: "bg-emerald-600" },
  { name: "Marine Bou Chaaya", when: "1 month ago", text: "Great product and quality.", color: "bg-amber-600" },
  { name: "Sysy Fitness", when: "1 month ago", text: "Highly recommended, team are so friendly and professional.", color: "bg-teal-600" },
];

export function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="mb-8 flex flex-col items-center text-center">
        <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-emerald-600">Excellent</p>
        <div className="mt-1 flex text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} width={20} height={20} />
          ))}
        </div>
        <p className="mt-2 text-[14px] text-ink-2">
          Based on <strong className="text-ink">158 reviews</strong> on{" "}
          <span className="font-semibold">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </span>
        </p>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {reviews.map((r) => (
          <article
            key={r.name}
            className="flex min-w-[280px] max-w-[360px] flex-1 snap-start flex-col rounded-2xl border border-line bg-white p-6 shadow-card sm:min-w-[320px]"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-full text-[16px] font-bold text-white ${r.color}`}>
                {r.name[0]}
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-ink">{r.name}</h3>
                <p className="text-[12px] text-muted">{r.when}</p>
              </div>
              <span className="text-[18px] font-bold text-[#4285F4]">G</span>
            </div>
            <div className="mt-3 flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} width={16} height={16} />
              ))}
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{r.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous reviews"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand hover:text-brand"
        >
          ‹
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Next reviews"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand hover:text-brand"
        >
          ›
        </button>
      </div>
    </div>
  );
}
