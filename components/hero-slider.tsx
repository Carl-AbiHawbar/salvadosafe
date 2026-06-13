"use client";

import { useCallback, useRef, useState } from "react";
import { WhatsAppButton } from "./cta";
import { CTA } from "./cta";
import { ArrowIcon, ChevronDown } from "./icons";
import type { HeroSlide } from "@/lib/content";

const SWIPE_THRESHOLD = 50;

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const goTo = useCallback((index: number) => {
    setActive((index + slides.length) % slides.length);
    setDragOffset(0);
  }, []);

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
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="container-x pointer-events-auto">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block rounded-full border border-white/30 bg-black/25 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur">
              Lebanon&apos;s Widest Safe Showroom
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.08] text-white drop-shadow-lg md:text-6xl">
              {slides[active].title}
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/90 md:text-[17px]">
              {slides[active].sub}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CTA href="/products" variant="primaryLight">
                Explore Solutions <ArrowIcon width={17} height={17} />
              </CTA>
              <WhatsAppButton
                label="WhatsApp Salvado"
                message="Hi Salvado, I'd like a recommendation."
                variant="outlineLight"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Prev / next arrows */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-3 top-1/2 z-10 flex -translate-y-1/2 rounded-full border border-white/25 bg-black/30 p-2.5 text-white backdrop-blur transition-colors hover:bg-black/50 md:p-3"
      >
        <ChevronDown className="rotate-90" width={20} height={20} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={next}
        className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 rounded-full border border-white/25 bg-black/30 p-2.5 text-white backdrop-blur transition-colors hover:bg-black/50 md:p-3"
      >
        <ChevronDown className="-rotate-90" width={20} height={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
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

      {/* Swipe hint (mobile) */}
      <p className="absolute bottom-16 left-1/2 z-10 -translate-x-1/2 text-[11px] font-medium uppercase tracking-wider text-white/50 md:hidden">
        Swipe to browse
      </p>
    </section>
  );
}
