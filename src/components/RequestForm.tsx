"use client";

import { useMemo, useState } from "react";

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
  serviceType: string;
  urgency: string;
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
  serviceType: "",
  urgency: "Standard",
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
    status !== "sending";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("sending");
    setError("");

    // Build payload with trimmed values
    const payload = {
      ...form,
      name: clean(form.name),
      company: clean(form.company),
      email: clean(form.email),
      phone: clean(form.phone),
      serviceType: clean(form.serviceType),
      urgency: clean(form.urgency),
      brand: clean(form.brand),
      model: clean(form.model),
      location: clean(form.location),
      symptoms: clean(form.symptoms),
    };

    // Timeout protection
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
      const res = await fetch("/api/request-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));

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
            <option value="Industrial printer service">Industrial printer service</option>
            <option value="Preventative maintenance">Preventative maintenance</option>
            <option value="Electronics / board repair">Electronics / board repair</option>
            <option value="Field installation">Field installation</option>
            <option value="CCTV / low-voltage">CCTV / low-voltage</option>
          </select>

          <select
            className="input"
            name="urgency"
            value={form.urgency}
            onChange={(e) => update("urgency", e.target.value)}
          >
            <option value="Standard">Standard</option>
            <option value="Urgent (line down)">Urgent (line down)</option>
            <option value="Scheduling / quote">Scheduling / quote</option>
          </select>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="input"
            name="brand"
            placeholder="Brand (Domino, Markem-Imaje...)"
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
          placeholder="Location (city / facility)"
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
            <div className="mt-1 text-xs text-white/60">
              If urgent, call/text {defaultPhone}.
            </div>
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