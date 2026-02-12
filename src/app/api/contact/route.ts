import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type Payload = {
  region?: "IN" | "US" | "unknown";
  source_page?: string;

  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;

  printer_brand: "Markem-Imaje" | "Domino" | "VideoJet" | "Other";
  printer_model: string;
  serial_number?: string | null;

  service_focus: "Repair" | "Maintenance" | "Parts" | "Other";
  issue_type: string;
  issue_details: string;
  urgency: "Normal" | "Urgent" | "Down Line";
};

function clean(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    // basic validation (tighten if you want)
    const name = clean(body.name);
    const email = clean(body.email);
    const printer_model = clean(body.printer_model);
    const issue_details = clean(body.issue_details);
    const issue_type = clean(body.issue_type);

    if (!name || !email || !printer_model || !issue_details || !issue_type) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    if (!supabaseUrl || !serviceRole) {
      return NextResponse.json({ ok: false, error: "Server misconfigured." }, { status: 500 });
    }

    const sb = createClient(supabaseUrl, serviceRole, { auth: { persistSession: false } });

    const region = body.region === "IN" || body.region === "US" ? body.region : "unknown";
    const source_page = body.source_page ? clean(body.source_page) : null;

    const user_agent = req.headers.get("user-agent") ?? null;
    // best-effort IP (Vercel uses x-forwarded-for)
    const ip =
      (req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        null) as string | null;

    const row = {
      region,
      source_page,
      user_agent,
      ip,

      name,
      company: body.company ? clean(body.company) : null,
      email,
      phone: body.phone ? clean(body.phone) : null,

      printer_brand: body.printer_brand,
      printer_model,
      serial_number: body.serial_number ? clean(body.serial_number) : null,

      service_focus: body.service_focus ?? "Repair",
      issue_type,
      issue_details,
      urgency: body.urgency ?? "Normal",
    };

    const { error } = await sb.from("contact_requests").insert(row);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // OPTIONAL: send email via Resend (only if configured)
    // If you already built this elsewhere, ignore/remove this block.
    if (process.env.RESEND_API_KEY && process.env.DMACHT_TO_EMAIL) {
      const toEmail =
        region === "US" ? "service@dmacht.com" : "support@dmacht.com"; // as requested
      const Resend = (await import("resend")).Resend;
      const resend = new Resend(process.env.RESEND_API_KEY);

      const subject = `D-Macht Contact Request — ${row.issue_type} — ${region}`;
      const text = [
        `New Contact Request`,
        ``,
        `Region: ${row.region}`,
        `Source page: ${row.source_page ?? "(unknown)"}`,
        ``,
        `Name: ${row.name}`,
        `Company: ${row.company ?? "(n/a)"}`,
        `Email: ${row.email}`,
        `Phone: ${row.phone ?? "(n/a)"}`,
        ``,
        `Printer brand: ${row.printer_brand}`,
        `Printer model: ${row.printer_model}`,
        `Serial: ${row.serial_number ?? "(n/a)"}`,
        ``,
        `Service focus: ${row.service_focus}`,
        `Issue type: ${row.issue_type}`,
        `Urgency: ${row.urgency}`,
        ``,
        `Details:`,
        row.issue_details,
      ].join("\n");

      await resend.emails.send({
        from: process.env.DMACHT_FROM_EMAIL ?? "dmacht <onboarding@resend.dev>",
        to: [toEmail],
        replyTo: row.email,
        subject,
        text,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}