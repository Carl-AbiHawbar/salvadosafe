export type LeadFormPayload = {
  variant: "contact" | "service";
  name: string;
  phone: string;
  service?: string;
  product?: string;
  location?: string;
  message?: string;
};

export function formatLeadWhatsAppMessage(data: LeadFormPayload): string {
  const intro =
    data.variant === "service"
      ? "Hi Salvado, I'd like to request a service."
      : "Hi Salvado, I'd like to get in touch.";

  const lines = [intro, "", `Name: ${data.name}`, `Phone: ${data.phone}`];

  if (data.service?.trim()) lines.push(`Service: ${data.service.trim()}`);
  if (data.product?.trim()) lines.push(`Product / model: ${data.product.trim()}`);
  if (data.location?.trim()) lines.push(`Location: ${data.location.trim()}`);
  if (data.message?.trim()) lines.push(`Message: ${data.message.trim()}`);

  return lines.join("\n");
}

export function buildWhatsAppUrl(waNumber: string, message: string): string {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}
