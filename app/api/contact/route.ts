import { NextResponse } from "next/server";
import { sendContactEmail, type ContactPayload } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ContactPayload;

    if (!data.name?.trim() || !data.phone?.trim()) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }

    const result = await sendContactEmail({
      variant: data.variant === "service" ? "service" : "contact",
      name: data.name.trim(),
      phone: data.phone.trim(),
      service: data.service?.trim(),
      product: data.product?.trim(),
      location: data.location?.trim(),
      message: data.message?.trim(),
    });

    return NextResponse.json({ ok: true, emailSent: result.emailSent });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ ok: true, emailSent: false });
  }
}
