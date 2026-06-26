"use client";

import { onWhatsAppClick } from "@/lib/analytics";

type WhatsAppAnchorProps = React.ComponentPropsWithoutRef<"a"> & {
  href: string;
};

export function openWhatsApp(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

export function handleWhatsAppClick(
  href: string,
  e: React.MouseEvent<HTMLAnchorElement>,
  onClick?: React.MouseEventHandler<HTMLAnchorElement>,
) {
  e.preventDefault();
  onWhatsAppClick();
  onClick?.(e);
  openWhatsApp(href);
}

/** External WhatsApp link that reports a Google Ads conversion on click. */
export function WhatsAppAnchor({ href, onClick, children, ...props }: WhatsAppAnchorProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      onClick={(e) => handleWhatsAppClick(href, e, onClick)}
    >
      {children}
    </a>
  );
}
