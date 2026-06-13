"use client";

import { useRef } from "react";
import type { InstagramPost } from "@/lib/content";

function InstagramMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} width="22" height="22" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" stroke="url(#ig)" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig)" />
      <defs>
        <linearGradient id="ig" x1="2" y1="22" x2="22" y2="2">
          <stop stopColor="#f58529" />
          <stop offset="0.5" stopColor="#dd2a7b" />
          <stop offset="1" stopColor="#8134af" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function InstagramCarousel({
  posts,
  handle,
  title,
  subtitle,
  profileUrl,
}: {
  posts: InstagramPost[];
  handle: string;
  title: string;
  subtitle: string;
  profileUrl: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.75), behavior: "smooth" });
  };

  if (!posts.length) return null;

  return (
    <div className="relative">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <InstagramMark />
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#dd2a7b]">Instagram</p>
        </div>
        <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-3xl">{title}</h2>
        <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-ink-2">{subtitle}</p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-[14px] font-semibold text-[#8134af] hover:underline"
        >
          {handle}
        </a>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:gap-5"
      >
        {posts.map((post) => (
          <a
            key={post.href + post.image}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative min-w-[220px] max-w-[280px] flex-1 snap-start overflow-hidden rounded-2xl border border-line bg-white shadow-card sm:min-w-[260px]"
          >
            <div className="relative aspect-square overflow-hidden bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.alt || post.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 backdrop-blur">
                <InstagramMark className="h-4 w-4" />
              </div>
              <p className="absolute bottom-0 left-0 right-0 p-4 text-[13px] font-medium leading-snug text-white">
                {post.caption}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous Instagram posts"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand hover:text-brand"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next Instagram posts"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand hover:text-brand"
          >
            ›
          </button>
        </div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#dd2a7b]/40 bg-gradient-to-r from-[#f58529]/10 via-[#dd2a7b]/10 to-[#8134af]/10 px-5 py-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-[#dd2a7b]/60"
        >
          <InstagramMark className="h-4 w-4" /> Follow on Instagram
        </a>
      </div>
    </div>
  );
}
