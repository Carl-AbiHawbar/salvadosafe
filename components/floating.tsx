"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSite } from "./site-provider";
import { waLink, telLink } from "@/lib/site";
import { WhatsAppIcon, PhoneIcon, QuoteIcon } from "./icons";

export function Floating() {
  const site = useSite();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* WhatsApp FAB — outline icon, no green fill */}
      <a
        href={waLink("Hi Salvado, I have a question.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center overflow-visible rounded-full border border-line bg-white p-3 text-ink shadow-soft transition-transform hover:scale-110 hover:border-brand md:bottom-6 md:right-6"
      >
        <WhatsAppIcon width={22} height={22} className="max-h-full max-w-full scale-100" />
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
      <div className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-line bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden">
        <a
          href={telLink(site.phones.landline.tel)}
          className="flex flex-1 flex-row items-center justify-center gap-1 border-r border-line py-2 text-[10px] font-semibold text-ink"
        >
          <PhoneIcon width={15} height={15} className="text-brand" /> Call
        </a>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-row items-center justify-center gap-1 border-r border-line py-2 text-[10px] font-semibold text-ink"
        >
          <WhatsAppIcon width={15} height={15} /> WhatsApp
        </a>
        <Link
          href="/contact"
          className="flex flex-1 flex-row items-center justify-center gap-1 py-2 text-[10px] font-semibold text-ink"
        >
          <QuoteIcon width={15} height={15} className="text-brand" /> Quote
        </Link>
      </div>
    </>
  );
}
