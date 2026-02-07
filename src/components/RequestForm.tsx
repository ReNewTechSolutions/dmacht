"use client";

import React, { useMemo, useState } from "react";

type Props = {
  defaultEmail: string;
  defaultPhone: string;
};

type Status = "idle" | "sending" | "sent" | "error";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;

  // NEW required fields
  location_region: "India" | "Kansas City (Coming soon)" | "Other / Not sure" | "";
  equipment_type: "Markem-Imaje" | "Domino" | "Videojet" | "Linx" | "Hitachi" | "Other" | "";
  urgency: "Urgent (line down)" | "High (quality issue)" | "Normal (PM/planning)";

  // existing details
  serviceType: string;
  brand: string;
  model: string;
  location: string;
  symptoms: string;
};

const INITIAL: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",

  location_region: "",
  equipment_type: "",
  urgency: "Normal (PM/planning)",

  serviceType: "",
  brand: "",
  model: "",
  location: "",
  symptoms: "",
};

function clean(v: string) {
  return v.trim();
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function RequestForm({ defaultEmail, defaultPhone }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const telHref = useMemo(
    () => `tel:+1${defaultPhone.replace(/\D/g, "")}`,
    [defaultPhone]
  );

  const canSubmit =
    clean(form.name).length > 0 &&
    isEmail(form.email) &&
    clean(form.serviceType).length > 0 &&
    clean(form.symptoms).length > 0 &&
    clean(form.location_region).length > 0 &&
    clean(form.equipment_type).length > 0 &&
    clean(form.urgency).length > 0 &&
    status !== "sending";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("sending");
    setError("");

    const payload = {
      ...form,
      name: clean(form.name),
      company: clean(form.company),
      email: clean(form.email),
      phone: clean(form.phone),

      location_region: clean(form.location_region),
      equipment_type: clean(form.equipment_type),
      urgency: clean(form.urgency),

      serviceType: clean(form.serviceType),
      brand: clean(form.brand),
      model: clean(form.model),
      location: clean(form.location),
      symptoms: clean(form.symptoms),
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
      const res = await fetch("/api/request-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const data: { ok?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Unable to send request. Please try again.");
      }

      setStatus("sent");
      setForm(INITIAL);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.name === "AbortError"
            ? "Request timed out. Please try again (or call/text if urgent)."
            : err.message
          : "Something went wrong.";
      setStatus("error");
      setError(msg);
    } finally {
      clearTimeout(timeout);
    }
  }

  return (
    <div className="glass-soft rounded-2xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-white">Quick Request</div>
          <p className="mt-1 text-sm text-white/70">
            Fastest response if you include model + symptoms + location.
          </p>
        </div>

        <a
          href={telHref}
          className="hidden rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 sm:inline-block"
        >
          Call/Text
        </a>
      </div>

      <form onSubmit={onSubmit} className="mt-4 grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="input"
            name="name"
            placeholder="Your name *"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            autoComplete="name"
          />
          <input
            className="input"
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            autoComplete="organization"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="input"
            name="email"
            placeholder="Email *"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            autoComplete="email"
          />
          <input
            className="input"
            name="phone"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
          />
        </div>

        {/* NEW: location_region + equipment_type */}
        <div className="grid gap-3 sm:grid-cols-2">
          <select
            className="input"
            name="location_region"
            value={form.location_region}
            onChange={(e) => update("location_region", e.target.value as FormState["location_region"])}
            required
          >
            <option value="" disabled>
              Location *
            </option>
            <option value="India">India</option>
            <option value="Kansas City (Coming soon)">Kansas City (Coming soon)</option>
            <option value="Other / Not sure">Other / Not sure</option>
          </select>

          <select
            className="input"
            name="equipment_type"
            value={form.equipment_type}
            onChange={(e) => update("equipment_type", e.target.value as FormState["equipment_type"])}
            required
          >
            <option value="" disabled>
              Equipment type *
            </option>
            <option value="Markem-Imaje">Markem-Imaje</option>
            <option value="Domino">Domino</option>
            <option value="Videojet">Videojet</option>
            <option value="Linx">Linx</option>
            <option value="Hitachi">Hitachi</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* ServiceType + NEW urgency */}
        <div className="grid gap-3 sm:grid-cols-2">
          <select
            className="input"
            name="serviceType"
            value={form.serviceType}
            onChange={(e) => update("serviceType", e.target.value)}
            required
          >
            <option value="" disabled>
              Service type *
            </option>
            <option value="Remote diagnostics">Remote diagnostics</option>
            <option value="Preventative maintenance planning">Preventative maintenance planning</option>
            <option value="Parts guidance / pre-order review">Parts guidance / pre-order review</option>
            <option value="Install / integration planning">Install / integration planning</option>
            <option value="Other">Other</option>
          </select>

          <select
            className="input"
            name="urgency"
            value={form.urgency}
            onChange={(e) => update("urgency", e.target.value as FormState["urgency"])}
            required
          >
            <option value="Urgent (line down)">Urgent (line down)</option>
            <option value="High (quality issue)">High (quality issue)</option>
            <option value="Normal (PM/planning)">Normal (PM/planning)</option>
          </select>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="input"
            name="brand"
            placeholder="Brand (optional)"
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
          />
          <input
            className="input"
            name="model"
            placeholder="Model (optional)"
            value={form.model}
            onChange={(e) => update("model", e.target.value)}
          />
        </div>

        <input
          className="input"
          name="location"
          placeholder="City / facility (optional)"
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
        />

        <textarea
          className="input"
          name="symptoms"
          placeholder="Symptoms / details * (fault code, when it started, what changed)"
          value={form.symptoms}
          onChange={(e) => update("symptoms", e.target.value)}
          required
          rows={5}
        />

        <button
          disabled={!canSubmit}
          className="btn btn-primary w-full disabled:opacity-60"
          type="submit"
        >
          {status === "sending" ? "Sending…" : "Send Request"}
        </button>

        {status === "sent" && (
          <div className="rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white/80">
            ✅ Sent. We’ll respond as soon as possible.
            <div className="mt-1 text-xs text-white/60">If urgent, call/text {defaultPhone}.</div>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-xl border border-red-500/30 bg-black/30 p-3 text-sm text-white/80">
            ❌ Could not send. {error}
            <div className="mt-1 text-xs text-white/60">
              Email us directly at {defaultEmail}.
            </div>
          </div>
        )}

        <div className="text-[11px] text-white/55">
          Or email directly:{" "}
          <a className="underline" href={`mailto:${defaultEmail}`}>
            {defaultEmail}
          </a>
        </div>
      </form>
    </div>
  );
}