"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronDown } from "./icons";
import type { HeroSlide } from "@/lib/content";

const SWIPE_THRESHOLD = 50;

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const goTo = useCallback(
    (index: number) => {
      setActive((index + slides.length) % slides.length);
      setDragOffset(0);
    },
    [slides.length]
  );

  const pillBtnCls =
    "flex shrink-0 items-center justify-center rounded-full p-1.5 text-white transition-colors hover:bg-white/10 active:scale-95";

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.touches[0].clientX - touchStart.current.x;
    const dy = e.touches[0].clientY - touchStart.current.y;
    if (Math.abs(dy) > Math.abs(dx)) return; // vertical scroll
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
    setIsDragging(false);
  };

  const trackTransform = `translateX(calc(${-active * 100}% + ${dragOffset}px))`;

  return (
    <section
      ref={containerRef}
      className="relative h-[64svh] min-h-[500px] max-h-[640px] w-full overflow-hidden select-none md:h-[58vh] md:min-h-[420px] md:max-h-[560px]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Swipeable slide track */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{
          transform: trackTransform,
          transitionDuration: isDragging ? "0ms" : "500ms",
        }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="relative h-full min-w-full shrink-0 overflow-hidden bg-ink"
            role="img"
            aria-label={s.title}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.img}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center pb-10 md:pb-0">
        <div className="container-x pointer-events-auto">
          <div className="w-full min-w-0 max-w-2xl pr-6 md:pr-0">
            <span className="mb-3 inline-block rounded-full border border-white/30 bg-black/25 px-3.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur md:mb-4 md:px-4 md:py-1.5 md:text-[12px]">
              Lebanon&apos;s Leading Safe Showroom
            </span>
            <h1 className="font-display text-[26px] font-bold leading-[1.15] text-white drop-shadow-lg [text-wrap:balance] sm:text-4xl sm:leading-[1.08] md:text-6xl">
              {slides[active].title}
            </h1>
            <p className="mt-3.5 max-w-xl text-[14px] leading-relaxed text-white/90 sm:mt-5 sm:text-[16px] md:text-[17px]">
              {slides[active].sub}
            </p>
          </div>
        </div>
      </div>

      {/* Compact bottom control pill — prev, dots, next in one row (all screen sizes) */}
      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center px-4 md:bottom-6">
        <div className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/50 px-1.5 py-1 backdrop-blur-sm">
          <button type="button" aria-label="Previous slide" onClick={prev} className={pillBtnCls}>
            <ChevronDown className="rotate-90" width={16} height={16} />
          </button>
          <div className="flex items-center gap-1.5 px-1">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? "h-1.5 w-5 bg-brand" : "h-1.5 w-1.5 bg-white/45"
                }`}
              />
            ))}
          </div>
          <button type="button" aria-label="Next slide" onClick={next} className={pillBtnCls}>
            <ChevronDown className="-rotate-90" width={16} height={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
