"use client";

import { onWhatsAppClick } from "@/lib/analytics";

type WhatsAppAnchorProps = React.ComponentPropsWithoutRef<"a"> & {
  href: string;
};

/** External WhatsApp link that reports a Google Ads conversion on click. */
export function WhatsAppAnchor({ href, onClick, children, ...props }: WhatsAppAnchorProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      onClick={(e) => {
        onWhatsAppClick();
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
