import Link from "next/link";
import type { Grade } from "@/lib/grade-types";

export function GradeCard({ grade }: { grade: Grade }) {
  const href = `/grade/${grade.slug}`;
  const modelCount = grade.models.length;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft">
      <Link
        href={href}
        className="relative block aspect-square overflow-hidden bg-surface"
        aria-label={`View ${grade.h1}`}
      >
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
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="mb-1.5 text-center text-[10px] font-bold uppercase leading-snug tracking-wide text-brand sm:text-left">
          {grade.series}
        </p>
        <Link href={href} className="block">
          <h3 className="text-center text-[13px] font-semibold leading-snug text-ink transition-colors group-hover:text-brand sm:text-left sm:text-[15px]">
            {grade.grade} High-Security Safes
          </h3>
        </Link>
        <p className="mt-1.5 hidden text-center text-[12px] leading-relaxed text-muted sm:block sm:text-left sm:text-[13px] md:line-clamp-2">
          {grade.desc}
        </p>
        <p className="mt-2 text-center text-[11px] font-medium text-muted sm:text-left">
          {modelCount} sizes in comparison table
        </p>
      </div>
    </article>
  );
}
