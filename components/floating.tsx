"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/site";
import { WhatsAppAnchor } from "./whatsapp-anchor";
import { WhatsAppIcon } from "./icons";

export function Floating() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* WhatsApp FAB — outline icon, no green fill */}
      <WhatsAppAnchor
        href={waLink("Hi Salvado, I'd like to get a quote.")}
        aria-label="Get a Quote on WhatsApp"
        className="fixed bottom-6 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-line bg-white p-3.5 text-ink shadow-soft transition-transform hover:scale-110 hover:border-brand md:right-6"
      >
        <WhatsAppIcon width={24} height={24} />
      </WhatsAppAnchor>

      {/* Scroll to top */}
      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-24 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-card transition-all md:right-6 ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
