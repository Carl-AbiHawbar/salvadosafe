/** Google Analytics 4 */
export const GA_MEASUREMENT_ID = "G-FTQ89DGBJ3";

/** Google Ads conversion label for WhatsApp clicks */
export const WHATSAPP_CONVERSION_SEND_TO = "AW-10925165607/mt6YCJzqhMYcEKeYw9ko";

export const GOOGLE_ADS_ID = "AW-10925165607";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire Google Ads WhatsApp conversion (matches gtag_report_conversion). */
export function reportWhatsAppConversion(onDone?: () => void): void {
  if (typeof window === "undefined" || !window.gtag) {
    onDone?.();
    return;
  }

  window.gtag("event", "conversion", {
    send_to: WHATSAPP_CONVERSION_SEND_TO,
    event_callback: onDone,
  });
}

/** Attach to any WhatsApp link click handler. */
export function onWhatsAppClick(onDone?: () => void): void {
  reportWhatsAppConversion(onDone);
}
