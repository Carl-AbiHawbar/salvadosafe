"use client";

import { useEffect, useState } from "react";
import { WhatsAppButton } from "./cta";
import { CTA } from "./cta";
import { ArrowIcon } from "./icons";

const slides = [
  {
    img: "/images/brand/c84dfdaf90cd428f56b6cafe.jpg",
    title: "Salvado — A Name You Can Trust in Security",
    sub: "Premium safes, vault doors, and secure storage solutions for homes, businesses, and institutions across Lebanon.",
  },
  {
    img: "/images/brand/c6c71578def71511416d0707.jpg",
    title: "Bespoke, High-Security, Personalized Protection",
    sub: "Certified products, European-standard installation, and dedicated after-sales technical support.",
  },
  {
    img: "/images/brand/81b4439950502d0e2237beec.jpg",
    title: "The Pinnacle of Security & Quality",
    sub: "From high-security safes to vault rooms — explore Lebanon's widest safe showroom.",
  },
  {
    img: "/images/brand/406286567de28867e45029df.jpg",
    title: "Accurate, Efficient, Reliable Cash Solutions",
    sub: "Money counters and cash-handling solutions for businesses that move cash with confidence.",
  },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.img} alt={s.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        </div>
      ))}

      <div className="container-x relative flex h-full items-center">
        <div className="max-w-2xl">
          {slides.map((s, i) => (
            <div
              key={i}
              className="transition-all duration-700"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? "none" : "translateY(20px)",
                position: i === active ? "relative" : "absolute",
                pointerEvents: i === active ? "auto" : "none",
              }}
            >
              {i === active && (
                <>
                  <span className="mb-4 inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur">
                    Lebanon&apos;s Widest Safe Showroom
                  </span>
                  <h1 className="font-display text-4xl font-bold leading-[1.08] text-white drop-shadow md:text-6xl">
                    {s.title}
                  </h1>
                  <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/85 md:text-[17px]">
                    {s.sub}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <CTA href="/products" variant="primary">
                      Explore Solutions <ArrowIcon width={17} height={17} />
                    </CTA>
                    <WhatsAppButton label="WhatsApp Salvado" message="Hi Salvado, I'd like a recommendation." />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-brand" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
