"use client";

import React, { useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRegion } from "@/components/region";

type Status = "New" | "In Progress" | "Scheduled" | "Closed";

const REQUEST_TYPES = ["Support", "AMC", "Refurb", "Mobile"] as const;
type RequestType = (typeof REQUEST_TYPES)[number];

const URGENCY = ["Line down", "Degraded", "Preventive", "Quote", "Normal"] as const;
type Urgency = (typeof URGENCY)[number];

const BRANDS = ["Markem-Imaje", "Domino", "VideoJet", "Other"] as const;
type Brand = (typeof BRANDS)[number];

const ISSUE_CATEGORIES = [
  "Troubleshooting / Diagnostics",
  "Motherboard Repair",
  "Power Supply Repair",
  "Inspection / Preventive",
  "Production Line Support",
  "Packaging & Coding",
  "Inks & Fluids",
  "Industrial Parts",
  "Refurbished Electronics",
  "Mobile Repair",
  "Other",
] as const;
type IssueCategory = (typeof ISSUE_CATEGORIES)[number];

const PREFERRED_CONTACT = ["Email", "Phone", "Text"] as const;
type PreferredContact = (typeof PREFERRED_CONTACT)[number];

type Props = {
  requestType?: RequestType;
  defaultIssueCategory?: IssueCategory;
  compact?: boolean;
};

export default function SupportRequestForm({
  requestType = "Support",
  defaultIssueCategory = "Motherboard Repair",
  compact = false,
}: Props) {
  const { region, ready, support, isUnknown } = useRegion();

  const routedEmail = useMemo(() => {
    // keep exactly as requested
    if (!ready) return "support@dmacht.com";
    if (region === "US") return "service@dmacht.com";
    if (region === "IN") return "support@dmacht.com";
    return "support@dmacht.com";
  }, [ready, region]);

  // Printer
  const [brand, setBrand] = useState<Brand>("Markem-Imaje");
  const [printerModel, setPrinterModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  // Issue
  const [issueCategory, setIssueCategory] = useState<IssueCategory>(defaultIssueCategory);
  const [symptoms, setSymptoms] = useState("");
  const [errorCodes, setErrorCodes] = useState("");
  const [location, setLocation] = useState("");

  const [urgency, setUrgency] = useState<Urgency>("Normal");

  // Contact
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [preferredContact, setPreferredContact] = useState<PreferredContact>("Email");

  // UX
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return Boolean(contactName.trim() && contactEmail.trim() && symptoms.trim() && printerModel.trim());
  }, [contactName, contactEmail, symptoms, printerModel]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);

    if (!canSubmit || submitting) return;

    setSubmitting(true);
    try {
      const payload = {
        // context
        region,
        routed_email: routedEmail,
        request_type: requestType,
        urgency,

        // printer
        printer_brand: brand,
        printer_model: printerModel,
        serial_number: serialNumber || null,

        // issue
        issue_category: issueCategory,
        symptoms,
        error_codes: errorCodes || null,
        location: location || null,

        // contact
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone || null,
        preferred_contact: preferredContact,

        status: "New" as Status,
      };

      const { error } = await supabase.from("support_requests").insert(payload);
      if (error) throw error;

      setOk("✓ Request received. We’ll follow up soon.");
      setSymptoms("");
      setErrorCodes("");
      setPrinterModel("");
      setSerialNumber("");
      setLocation("");
      // keep their contact info for convenience (optional)
      // setContactName(""); setContactEmail(""); setContactPhone("");

      // subtle auto-clear like your pill behavior
      window.setTimeout(() => setOk(null), 6000);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong.";
      setErr(message);
      window.setTimeout(() => setErr(null), 6000);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-3" : "space-y-4"} aria-label="Support request form">
      {/* Routing */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Routing</div>
            <div className="mt-2 text-sm text-white/80">
              Region: <span className="text-white/95">{support.label}</span>
            </div>
            <div className="mt-1 text-sm text-white/80">
              Email: <span className="text-white/95">{routedEmail}</span>
            </div>
            <div className="mt-2 text-xs text-white/55">
              {isUnknown ? "Tip: choose region above to personalize routing + availability." : support.note}
            </div>
          </div>

          <a className="btn btn-ghost shrink-0" href={`mailto:${routedEmail}`}>
            Email direct
          </a>
        </div>
      </div>

      {/* Printer */}
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mp-label">Brand *</label>
          <select className="mp-input" value={brand} onChange={(e) => setBrand(e.target.value as Brand)}>
            {BRANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <div className="mt-1 text-[11px] text-white/45">Primary focus: Markem-Imaje, Domino, VideoJet.</div>
          {brand === "Other" ? (
            <div className="mt-1 text-[11px] text-white/45">
              We can still advise, but repairs/field service are prioritized for the three brands above.
            </div>
          ) : null}
        </div>

        <div>
          <label className="mp-label">Printer model *</label>
          <input
            className="mp-input"
            value={printerModel}
            onChange={(e) => setPrinterModel(e.target.value)}
            placeholder='Example: "9450" or "Ax350i"'
          />
        </div>

        <div>
          <label className="mp-label">Serial # (optional)</label>
          <input className="mp-input" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
        </div>

        <div>
          <label className="mp-label">Urgency</label>
          <select className="mp-input" value={urgency} onChange={(e) => setUrgency(e.target.value as Urgency)}>
            {URGENCY.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Issue */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mp-label">Issue category</label>
            <select
              className="mp-input"
              value={issueCategory}
              onChange={(e) => setIssueCategory(e.target.value as IssueCategory)}
            >
              {ISSUE_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mp-label">Error codes (optional)</label>
            <input className="mp-input" value={errorCodes} onChange={(e) => setErrorCodes(e.target.value)} />
          </div>
        </div>

        <div className="mt-3">
          <label className="mp-label">Symptoms / what’s happening *</label>
          <textarea
            className="mp-input mp-textarea"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe symptoms, when it started, and what’s been tried."
          />
          <div className="mt-2 text-[11px] text-white/45">
            Tip: include photos/video when we reply (uploads not enabled yet).
          </div>
        </div>

        <div className="mt-3">
          <label className="mp-label">Site / location (optional)</label>
          <input className="mp-input" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
      </div>

      {/* Contact */}
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mp-label">Your name *</label>
          <input className="mp-input" value={contactName} onChange={(e) => setContactName(e.target.value)} />
        </div>
        <div>
          <label className="mp-label">Email *</label>
          <input className="mp-input" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
        </div>
        <div>
          <label className="mp-label">Phone (optional)</label>
          <input className="mp-input" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
        </div>
        <div>
          <label className="mp-label">Preferred contact</label>
          <select
            className="mp-input"
            value={preferredContact}
            onChange={(e) => setPreferredContact(e.target.value as PreferredContact)}
          >
            {PREFERRED_CONTACT.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn btn-primary w-full" disabled={!canSubmit || submitting}>
          {submitting ? "Sending…" : "Submit request"}
        </button>

        <a className="btn btn-ghost w-full" href="/maintenance">
          View maintenance packages
        </a>
      </div>

      {/* Inline subtle pills */}
      {ok ? <div className="formStatus success">{ok}</div> : null}
      {err ? <div className="formStatus error">{err}</div> : null}
    </form>
  );
}