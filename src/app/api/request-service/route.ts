import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  name: string;
  company?: string;
  phone?: string;
  email: string;
  serviceType: string;
  brand?: string;
  model?: string;
  symptoms: string;
  location?: string;
  urgency?: string;
};

function safe(v: unknown) {
  return String(v ?? "").trim();
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.DMACHT_TO_EMAIL || "hello@renewtech.solutions";
    const fromEmail =
      process.env.DMACHT_FROM_EMAIL || "DMacht <onboarding@resend.dev>";

    if (!resendKey) {
      return NextResponse.json(
        { ok: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as Partial<Payload>;

    const name = safe(body.name);
    const email = safe(body.email);
    const symptoms = safe(body.symptoms);
    const serviceType = safe(body.serviceType);

    if (!name || !email || !symptoms || !serviceType) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const company = safe(body.company);
    const phone = safe(body.phone);
    const brand = safe(body.brand);
    const model = safe(body.model);
    const location = safe(body.location);
    const urgency = safe(body.urgency || "Standard");

    const subject = `DMacht Service Request — ${serviceType} (${name})`;

    const text = [
      `New DMacht service request`,
      ``,
      `Name: ${name}`,
      `Company: ${company || "-"}`,
      `Email: ${email}`,
      `Phone: ${phone || "-"}`,
      ``,
      `Service Type: ${serviceType}`,
      `Urgency: ${urgency}`,
      `Brand: ${brand || "-"}`,
      `Model: ${model || "-"}`,
      `Location: ${location || "-"}`,
      ``,
      `Symptoms / Details:`,
      symptoms,
      ``,
      `— sent from dmacht site`,
    ].join("\n");

    const resend = new Resend(resendKey);

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown server error.";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}