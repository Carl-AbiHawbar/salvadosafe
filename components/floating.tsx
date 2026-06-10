"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site, waLink, telLink } from "@/lib/site";
import { WhatsAppIcon, PhoneIcon, QuoteIcon } from "./icons";

export function Floating() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* WhatsApp FAB (desktop + above mobile bar) */}
      <a
        href={waLink("Hi Salvado, I have a question.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform hover:scale-110 md:bottom-6 md:right-6"
      >
        <WhatsAppIcon width={28} height={28} />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-20" />
      </a>

      {/* Scroll to top */}
      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-[136px] right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-card transition-all md:bottom-24 md:right-6 ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

      {/* Sticky mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 border-t border-line bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden">
        <a href={telLink(site.phones.landline.tel)} className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold text-ink">
          <PhoneIcon width={18} height={18} className="text-brand" /> Call
        </a>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-0.5 border-x border-line py-2.5 text-[11px] font-semibold text-ink">
          <WhatsAppIcon width={18} height={18} className="text-wa" /> WhatsApp
        </a>
        <Link href="/contact" className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold text-ink">
          <QuoteIcon width={18} height={18} className="text-brand" /> Request Quote
        </Link>
      </div>
    </>
  );
}
