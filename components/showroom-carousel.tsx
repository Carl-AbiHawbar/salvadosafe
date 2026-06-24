"use client";

import { useCallback, useRef, useState } from "react";
import type { ShowroomImage } from "@/lib/content";

const SWIPE_THRESHOLD = 50;

export function ShowroomCarousel({ images }: { images: ShowroomImage[] }) {
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
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.touches[0].clientX - touchStart.current.x;
    const dy = e.touches[0].clientY - touchStart.current.y;
    if (Math.abs(dy) > Math.abs(dx)) return;
    setDragOffset(dx);
  };

  const onTouchEnd = () => {
    if (Math.abs(dragOffset) > SWIPE_THRESHOLD) {
      if (dragOffset < 0) next();
      else prev();
    } else {
      setDragOffset(0);
    }
    touchStart.current = null;
  };

  if (!count) return null;

  const navBtnCls =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/45 text-xl text-white backdrop-blur transition-colors hover:bg-black/65 active:scale-95";

  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-soft"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[18/9] lg:aspect-[2/1]">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={i !== active}
            >
              <div
                className="h-full w-full"
                style={i === active ? { transform: `translateX(${dragOffset}px)` } : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  className={`h-full w-full bg-ink ${
                    img.fit === "contain" ? "object-contain object-center" : "object-cover object-center"
                  } ${img.imgClass ?? ""}`}
                />
              </div>
              {img.caption && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-6 pb-6 pt-20 md:px-8 md:pb-8">
                  <p className="max-w-2xl text-[14px] font-medium leading-relaxed text-white/95 md:text-[15px]">
                    {img.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button type="button" onClick={prev} aria-label="Previous showroom photo" className={`${navBtnCls} left-4`}>
              ‹
            </button>
            <button type="button" onClick={next} aria-label="Next showroom photo" className={`${navBtnCls} right-4`}>
              ›
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show photo ${i + 1}: ${img.alt}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-brand" : "w-2 bg-line hover:bg-brand/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
