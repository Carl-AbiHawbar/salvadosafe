/** Google Analytics 4 */
export const GA_MEASUREMENT_ID = "G-FTQ89DGBJ3";

/** Google Ads conversion label for Get a Quote / WhatsApp quote requests */
export const REQUEST_QUOTE_CONVERSION_SEND_TO = "AW-10925165607/WrWsCLzttMccEKeYw9ko";

export const GOOGLE_ADS_ID = "AW-10925165607";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire Google Ads Request quote conversion (matches gtag_report_conversion). */
export function reportQuoteConversion(onDone?: () => void): void {
  if (typeof window === "undefined" || !window.gtag) {
    onDone?.();
    return;
  }

  window.gtag("event", "conversion", {
    send_to: REQUEST_QUOTE_CONVERSION_SEND_TO,
    event_callback: onDone,
  });
}

/** Attach to Get a Quote / WhatsApp link click handlers. */
export function onGetQuoteClick(onDone?: () => void): void {
  reportQuoteConversion(onDone);
}
