"use client";

import { useCallback, useRef, useState } from "react";
import { WhatsAppButton } from "./cta";
import { CTA, CtaGroup } from "./cta";
import { ArrowIcon, ChevronDown } from "./icons";
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

  const navBtnCls =
    "flex shrink-0 items-center justify-center rounded-full p-1.5 text-white transition-colors hover:bg-white/10 active:scale-95 md:rounded-full md:border md:border-white/25 md:bg-black/40 md:p-3 md:backdrop-blur md:hover:bg-black/55";

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
      className="relative h-[72svh] min-h-[420px] max-h-[620px] w-full overflow-hidden select-none md:h-[88vh] md:min-h-[560px] md:max-h-none"
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
            className="relative h-full min-w-full shrink-0 overflow-hidden bg-ink bg-cover bg-center md:bg-center"
            style={{ backgroundImage: `url(${s.img})` }}
            role="img"
            aria-label={s.title}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center pb-20 md:pb-0">
        <div className="container-x pointer-events-auto">
          <div className="max-w-2xl pr-1 md:pr-0">
            <span className="mb-4 inline-block rounded-full border border-white/30 bg-black/25 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur">
              Lebanon&apos;s Leading Safe Showroom
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.08] text-white drop-shadow-lg md:text-6xl">
              {slides[active].title}
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/90 md:text-[17px]">
              {slides[active].sub}
            </p>
            <CtaGroup className="mt-6 md:mt-8">
              <CTA href="/products" variant="primaryLight">
                Explore Solutions <ArrowIcon width={14} height={14} className="md:h-[17px] md:w-[17px]" />
              </CTA>
              <WhatsAppButton
                label="WhatsApp Salvado"
                shortLabel="WhatsApp"
                message="Hi Salvado, I'd like a recommendation."
                variant="outlineLight"
              />
            </CtaGroup>
          </div>
        </div>
      </div>

      {/* Mobile: compact bottom control pill — prev, dots, next in one row */}
      <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center px-4 md:hidden">
        <div className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/50 px-1.5 py-1 backdrop-blur-sm">
          <button type="button" aria-label="Previous slide" onClick={prev} className={navBtnCls}>
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
          <button type="button" aria-label="Next slide" onClick={next} className={navBtnCls}>
            <ChevronDown className="-rotate-90" width={16} height={16} />
          </button>
        </div>
      </div>

      {/* Desktop: side arrows + bottom dots */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={prev}
        className={`${navBtnCls} absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex`}
      >
        <ChevronDown className="rotate-90" width={20} height={20} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={next}
        className={`${navBtnCls} absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex`}
      >
        <ChevronDown className="-rotate-90" width={20} height={20} />
      </button>
      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 gap-2.5 md:flex">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-brand" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
