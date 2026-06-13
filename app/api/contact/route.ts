import { NextResponse } from "next/server";
import { sendContactEmail, type ContactPayload } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ContactPayload;

    if (!data.name?.trim() || !data.phone?.trim()) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }

    await sendContactEmail({
      variant: data.variant === "service" ? "service" : "contact",
      name: data.name.trim(),
      phone: data.phone.trim(),
      service: data.service?.trim(),
      product: data.product?.trim(),
      location: data.location?.trim(),
      message: data.message?.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unable to send message.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
