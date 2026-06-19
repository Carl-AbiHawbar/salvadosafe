"use client";

import { useCallback, useRef, useState } from "react";
import { ShieldIcon } from "./icons";

const SWIPE_THRESHOLD = 50;

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const count = images.length;

  const goTo = useCallback(
    (index: number) => {
      setActive((index + count) % count);
      setDragOffset(0);
    },
    [count]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  const onTouchStart = (e: React.TouchEvent) => {
    if (count <= 1) return;
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current || count <= 1) return;
    const dx = e.touches[0].clientX - touchStart.current.x;
    const dy = e.touches[0].clientY - touchStart.current.y;
    if (Math.abs(dy) > Math.abs(dx)) return;
    setDragOffset(dx);
  };

  const onTouchEnd = () => {
    if (count <= 1) return;
    if (Math.abs(dragOffset) > SWIPE_THRESHOLD) {
      if (dragOffset < 0) next();
      else prev();
    } else {
      setDragOffset(0);
    }
    touchStart.current = null;
  };

  if (!count) {
    return (
      <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-3xl border border-line bg-surface text-muted">
        <ShieldIcon width={40} height={40} className="text-line" />
        <span className="text-[14px] font-semibold">Photos available on request</span>
      </div>
    );
  }

  const navBtnCls =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/95 text-lg text-ink shadow-soft transition-colors hover:border-brand hover:text-brand active:scale-95";

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-3xl border border-line bg-surface"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={count > 1 ? `${alt} — photo ${active + 1} of ${count}` : alt}
          className="aspect-square w-full object-contain p-6 sm:p-8"
          style={count > 1 && dragOffset ? { transform: `translateX(${dragOffset}px)` } : undefined}
        />

        {count > 1 && (
          <>
            <button type="button" onClick={prev} aria-label="Previous photo" className={`${navBtnCls} left-3`}>
              ‹
            </button>
            <button type="button" onClick={next} aria-label="Next photo" className={`${navBtnCls} right-3`}>
              ›
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur">
              {active + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === active}
              className={`h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border bg-surface transition-all sm:h-20 sm:w-20 ${
                i === active
                  ? "border-brand ring-2 ring-brand/25"
                  : "border-line opacity-80 hover:border-brand/40 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" className="h-full w-full object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
