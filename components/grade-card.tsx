import Link from "next/link";
import type { Grade } from "@/lib/grades";
import { waLink } from "@/lib/site";
import { ArrowIcon, WhatsAppIcon } from "./icons";

export function GradeCard({ grade }: { grade: Grade }) {
  const href = `/grade/${grade.slug}`;
  const modelCount = grade.models.length;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft">
      <Link href={href} className="absolute inset-0 z-[1] rounded-2xl" aria-label={`View ${grade.h1}`} />
      <div className="relative z-[2] block aspect-square overflow-hidden bg-surface">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={grade.image}
          alt={grade.h1}
          loading="lazy"
          className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105 sm:p-5"
        />
        <span className="absolute left-2 top-2 hidden max-w-[calc(100%-1rem)] truncate rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand backdrop-blur sm:inline-block">
          {grade.series}
        </span>
      </div>
      <div className="relative z-[2] flex flex-1 flex-col p-3 sm:p-4">
        <p className="mb-1.5 text-center text-[10px] font-bold uppercase leading-snug tracking-wide text-brand sm:text-left">
          {grade.series}
        </p>
        <h3 className="text-center text-[13px] font-semibold leading-snug text-ink transition-colors group-hover:text-brand sm:text-left sm:text-[15px]">
          {grade.grade} High-Security Safes
        </h3>
        <p className="mt-1.5 hidden text-center text-[12px] leading-relaxed text-muted sm:block sm:text-left sm:text-[13px] md:line-clamp-2">
          {grade.desc}
        </p>
        <p className="mt-2 text-center text-[11px] font-medium text-muted sm:text-left">
          {modelCount} sizes in comparison table
        </p>
        <div className="relative z-[3] mt-auto flex flex-col gap-2 pt-3 sm:flex-row sm:items-center sm:gap-2">
          <span className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-line px-2.5 py-2 text-[12px] font-semibold text-ink transition-colors group-hover:border-brand group-hover:text-brand sm:flex-1 sm:px-3 sm:text-[13px]">
            View Grade <ArrowIcon width={14} height={14} className="sm:h-[15px] sm:w-[15px]" />
          </span>
          <a
            href={waLink(`Hi Salvado, I'm interested in ${grade.grade} high-security safes. Can you help me choose the right size?`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp about ${grade.grade}`}
            className="relative z-[3] inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-2 text-[12px] font-semibold text-ink transition-colors hover:border-brand sm:w-auto sm:px-3"
          >
            <WhatsAppIcon width={16} height={16} className="sm:h-[17px] sm:w-[17px]" />
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}
