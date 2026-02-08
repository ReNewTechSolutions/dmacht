"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRegion, type Region } from "@/components/region";

type PlanId = "basic" | "standard" | "comprehensive";
type Accent = "teal" | "blue" | "ember";

type Plan = {
  id: PlanId;
  name: string;
  priceHint: string;
  bestFor: string;
  bullets: string[];
  accent: Accent;
};

type Cadence = "Monthly" | "Quarterly" | "Bi-Annual" | "Annual" | "Not sure";

const CADENCE_OPTIONS: Cadence[] = ["Monthly", "Quarterly", "Bi-Annual", "Annual", "Not sure"];

function RegionSelectInline({
  region,
  setRegion,
  ready,
}: {
  region: Region;
  setRegion: (r: Region) => void;
  ready: boolean;
}) {
  const showNudge = ready && region === "unknown";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {showNudge && (
        <div className="regionNudgeWrap" aria-label="Select your region">
          <div className="regionNudge">
            <span className="regionNudgeDot" aria-hidden />
            <span className="regionNudgeTextStrong">Select region</span>
            <span className="regionNudgeTextSoft">to personalize service</span>
          </div>
        </div>
      )}

      <select
        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 outline-none"
        value={region}
        onChange={(e) => setRegion(e.target.value as Region)}
        aria-label="Select region"
        disabled={!ready}
      >
        <option value="unknown">Select region…</option>
        <option value="IN">India (live now)</option>
        <option value="US">US / Kansas City (booking soon)</option>
      </select>
    </div>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <span
      className={[
        "inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/5",
        className,
      ].join(" ")}
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Dot({ tone }: { tone: Accent }) {
  return <span className={`inline-block h-2.5 w-2.5 rounded-full mp-dot ${tone}`} aria-hidden />;
}

function buildMailto(params: {
  plan: string;
  regionLabel: string;
  company: string;
  site: string;
  printers: string;
  cadence: string;
  notes: string;
}) {
  const to = "service@dmacht.com";
  const subject = `AMC Quote Request — ${params.plan} — ${params.regionLabel}`;

  const body = [
    `Hello D-Macht Team,`,
    ``,
    `I'd like a quote for an Annual Maintenance Contract.`,
    ``,
    `Plan: ${params.plan}`,
    `Region: ${params.regionLabel}`,
    ``,
    `Company / Plant: ${params.company || "(not provided)"}`,
    `Site Location: ${params.site || "(not provided)"}`,
    `Printer Models / Qty: ${params.printers || "(not provided)"}`,
    `Preferred Service Cadence: ${params.cadence || "(not provided)"}`,
    ``,
    `Notes:`,
    `${params.notes || "(none)"}`,
    ``,
    `Thanks,`,
  ].join("\n");

  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function MaintenancePage() {
  const { region, setRegion, ready } = useRegion();

  const regionLabel = useMemo(() => {
    if (!ready) return "Loading…";
    if (region === "IN") return "India (live now)";
    if (region === "US") return "US / Kansas City (booking soon)";
    return "Select region";
  }, [region, ready]);

  const isUS = ready && region === "US";
  const isIN = ready && region === "IN";
  const isUnknown = ready && region === "unknown";

  const plans: Plan[] = useMemo(
    () => [
      {
        id: "basic",
        name: "Basic AMC",
        priceHint: "Essential coverage",
        bestFor: "Preventive checks + faster triage",
        accent: "teal",
        bullets: [
          "Scheduled preventive checkups",
          "Priority triage (remote-first)",
          "Basic maintenance checklist + notes",
          "Consumables guidance (ink/fluids) as needed",
        ],
      },
      {
        id: "standard",
        name: "Standard AMC",
        priceHint: "Balanced coverage",
        bestFor: "Recurring issues + planned downtime windows",
        accent: "blue",
        bullets: [
          "Preventive maintenance schedule + reporting",
          "Priority triage + remote diagnostics",
          "Service planning for downtime windows",
          "Escalation path + recommended spares list",
        ],
      },
      {
        id: "comprehensive",
        name: "Comprehensive AMC",
        priceHint: "Maximum coverage",
        bestFor: "High-throughput lines where uptime is non-negotiable",
        accent: "ember",
        bullets: [
          "Fastest response + priority queue",
          "Full preventive plan + detailed service reports",
          "Root-cause analysis for repeat failures",
          "Options for parts/consumables programs (as applicable)",
        ],
      },
    ],
    []
  );

  const compare = useMemo(
    () =>
      [
        { k: "Preventive maintenance schedule", basic: true, standard: true, comprehensive: true },
        { k: "Remote-first diagnostics", basic: true, standard: true, comprehensive: true },
        { k: "Detailed service reporting", basic: false, standard: true, comprehensive: true },
        { k: "Downtime / shutdown planning", basic: false, standard: true, comprehensive: true },
        { k: "Root-cause analysis for repeat issues", basic: false, standard: false, comprehensive: true },
        { k: "Parts/consumables program options", basic: false, standard: "optional" as const, comprehensive: true },
      ] as const,
    []
  );

  // Quote form state
  const [planChoice, setPlanChoice] = useState<"Basic" | "Standard" | "Comprehensive">("Standard");
  const [company, setCompany] = useState("");
  const [site, setSite] = useState("");
  const [printers, setPrinters] = useState("");
  const [cadence, setCadence] = useState<Cadence>("Quarterly");
  const [notes, setNotes] = useState("");

  const mailtoHref = useMemo(
    () =>
      buildMailto({
        plan: planChoice,
        regionLabel,
        company,
        site,
        printers,
        cadence,
        notes,
      }),
    [planChoice, regionLabel, company, site, printers, cadence, notes]
  );

  const regionCtaTitle = useMemo(() => {
    if (!ready) return "Loading…";
    if (isUnknown) return "Select a region to personalize coverage.";
    if (isUS) return "US coverage is booking soon — request scheduling + quote.";
    if (isIN) return "India coverage is live — request a quote and cadence.";
    return "Request a quote.";
  }, [ready, isUnknown, isUS, isIN]);

  const regionCtaSub = useMemo(() => {
    if (!ready) return "";
    if (isUnknown) return "You’ll get the right availability and scope based on your region.";
    if (isUS) return "We’ll confirm timing, scope, and what’s available for US/Kansas City — remote diagnostics can start now.";
    if (isIN) return "We’ll confirm printer models, cadence, and coverage — plus preventive scheduling and reporting.";
    return "";
  }, [ready, isUnknown, isUS, isIN]);

  const primaryCtaText = useMemo(() => {
    if (!ready) return "Request quote";
    if (isUnknown) return "Select region";
    if (isUS) return "Request scheduling + quote";
    return "Request AMC quote";
  }, [ready, isUnknown, isUS]);

  return (
    <main className="mx-auto max-w-6xl px-4">
      {/* HERO */}
      <section className="mt-8 md:mt-10 mp-anim" aria-label="Maintenance packages">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 mp-surface">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Paid service</div>
              <h1 className="mt-2 text-2xl font-semibold text-white/90 md:text-3xl">Our Maintenance Packages (AMC)</h1>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Annual Maintenance Contracts built for predictable uptime: preventive service, fast triage, and clear next
                steps — optimized for Markem-Imaje and Domino environments.
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link className="btn btn-primary" href="#quote">
                  {primaryCtaText}
                </Link>
                <Link className="btn btn-ghost" href="/#contact">
                  Talk to support
                </Link>
                <Link className="btn btn-ghost" href="/#industries">
                  See applications
                </Link>
              </div>

              <div className="mt-5">
                <RegionSelectInline region={region} setRegion={setRegion} ready={ready} />
                <div className="mt-2 text-xs text-white/55">
                  Current selection: <span className="text-white/75">{regionLabel}</span>
                </div>
              </div>
            </div>

            {/* REGION CTA */}
            <aside className="w-full max-w-md rounded-3xl border border-white/10 bg-black/35 p-5 mp-card mp-anim mp-delay-1">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Region-aware</div>
              <div className="mt-2 text-base font-semibold text-white/90">{regionCtaTitle}</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">{regionCtaSub}</div>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <div className="flex gap-3">
                  <Check />
                  <span>Reduces emergency downtime with scheduled preventive checks.</span>
                </div>
                <div className="flex gap-3">
                  <Check />
                  <span>Speeds resolution: triage first, then action plan.</span>
                </div>
                <div className="flex gap-3">
                  <Check />
                  <span>Documentation: service notes + repeat-failure prevention.</span>
                </div>
              </div>

              <div className="mt-5">
                <Link className="btn btn-primary w-full" href="#quote">
                  {primaryCtaText}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section className="mt-8" aria-label="Plans">
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((p, idx) => (
            <div
              key={p.id}
              className={`rounded-3xl border border-white/10 bg-black/35 p-5 mp-card mp-anim mp-delay-${Math.min(
                idx + 1,
                3
              )} mp-accent-${p.accent}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Dot tone={p.accent} />
                    <div className="text-sm font-semibold text-white/90">{p.name}</div>
                  </div>
                  <div className="mt-1 text-xs text-white/55">{p.priceHint}</div>
                </div>

                <Link
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:text-white/85"
                  href="#quote"
                  onClick={() => setPlanChoice(p.id === "basic" ? "Basic" : p.id === "standard" ? "Standard" : "Comprehensive")}
                >
                  Quote
                </Link>
              </div>

              <div className="mt-3 text-sm text-white/70">{p.bestFor}</div>

              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <Check />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Ideal for</div>
                <div className="mt-1 text-xs text-white/65">
                  {p.id === "basic"
                    ? "Smaller sites, predictable output, monthly/quarterly checks."
                    : p.id === "standard"
                      ? "Multi-shift lines, recurring print quality issues, scheduled downtime windows."
                      : "High-volume lines, strict SLA expectations, repeat-failure prevention."}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARE */}
      <section className="mt-8 mp-anim mp-delay-2" aria-label="Compare packages">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-7 mp-surface">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Compare</div>
              <h2 className="mt-2 text-xl font-semibold text-white/90 md:text-2xl">What’s included</h2>
              <p className="mt-2 text-sm text-white/70">A clear breakdown so customers understand value and coverage instantly.</p>
            </div>
            <Link className="btn btn-primary md:self-center" href="#quote">
              Get pricing
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    Basic
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    Standard
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    Comprehensive
                  </th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row, i) => (
                  <tr key={row.k} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                    <td className="border-t border-white/10 px-4 py-3 text-sm text-white/80">{row.k}</td>
                    <td className="border-t border-white/10 px-4 py-3 text-sm text-white/70">
                      {row.basic === true ? <Check /> : <span className="text-white/30">—</span>}
                    </td>
                    <td className="border-t border-white/10 px-4 py-3 text-sm text-white/70">
                      {row.standard === true ? (
                        <Check />
                      ) : row.standard === "optional" ? (
                        <span className="text-xs text-white/55">Optional</span>
                      ) : (
                        <span className="text-white/30">—</span>
                      )}
                    </td>
                    <td className="border-t border-white/10 px-4 py-3 text-sm text-white/70">
                      {row.comprehensive === true ? <Check /> : <span className="text-white/30">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-xs text-white/55">
            Note: Final inclusions depend on printer model, line setup, and your preferred service cadence.
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="mt-8 mp-anim mp-delay-3" aria-label="Quote form" id="quote">
        <div className="rounded-3xl border border-white/10 bg-black/35 p-6 md:p-7 mp-card">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Quote request</div>
              <h2 className="mt-2 text-xl font-semibold text-white/90 md:text-2xl">Send details (no backend yet)</h2>
              <p className="mt-2 text-sm text-white/70">
                This opens your email client with a pre-filled request. We’ll reply with pricing + availability.
              </p>
            </div>
            <div className="text-xs text-white/55">
              Region: <span className="text-white/75">{regionLabel}</span>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {/* LEFT: FORM */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Plan</div>

              <div className="mt-3 flex flex-wrap gap-2">
                {(["Basic", "Standard", "Comprehensive"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`mp-pill ${planChoice === p ? "is-active" : ""}`}
                    onClick={() => setPlanChoice(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mp-label">Company / Plant</label>
                  <input className="mp-input" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <div>
                  <label className="mp-label">Site location</label>
                  <input className="mp-input" value={site} onChange={(e) => setSite(e.target.value)} />
                </div>
              </div>

              <div className="mt-3">
                <label className="mp-label">Printer models / quantity</label>
                <input
                  className="mp-input"
                  value={printers}
                  onChange={(e) => setPrinters(e.target.value)}
                  placeholder='Example: "Markem 9450 x2, Domino Ax350i x1"'
                />
              </div>

              <div className="mt-3">
                <label className="mp-label">Preferred cadence</label>
                <select className="mp-input" value={cadence} onChange={(e) => setCadence(e.target.value as Cadence)}>
                  {CADENCE_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-3">
                <label className="mp-label">Notes</label>
                <textarea className="mp-input mp-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                {/* mailto should remain <a> */}
                <a className="btn btn-primary w-full" href={mailtoHref}>
                  Email quote request
                </a>

                <Link className="btn btn-ghost w-full" href="/#contact">
                  Use contact form
                </Link>
              </div>

              {isUS && (
                <div className="mt-3 text-xs text-white/60">
                  US note: booking soon. We can start remote diagnostics immediately and schedule on-site availability as slots open.
                </div>
              )}
            </div>

            {/* RIGHT: EXPECTATIONS */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">What to expect</div>

              <div className="mt-4 space-y-3 text-sm text-white/70">
                <div className="flex gap-3">
                  <Check />
                  <span>We confirm models, site conditions, and cadence.</span>
                </div>
                <div className="flex gap-3">
                  <Check />
                  <span>You get a clear scope: preventive tasks + response expectations.</span>
                </div>
                <div className="flex gap-3">
                  <Check />
                  <span>We recommend spares and consumables strategy (optional).</span>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Contact</div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Email</div>
                    <div className="mt-1 text-sm text-white/80">service@dmacht.com</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Call/Text</div>
                    <div className="mt-1 text-sm text-white/80">816.957.3063</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-white/55">
                Tip: For fastest turnaround, include error codes, recent maintenance history, and ink/solvent type.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM LINKS */}
      <section className="mt-10 mb-14 mp-anim mp-delay-3" aria-label="Bottom links">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 mp-surface">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Next</div>
              <div className="mt-2 text-xl font-semibold text-white/90 md:text-2xl">Want to see applications?</div>
              <div className="mt-2 text-sm text-white/70">Browse supported use-cases and industries, then request support.</div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="btn btn-primary" href="/#contact">
                Request support
              </Link>
              <Link className="btn btn-ghost" href="/#industries">
                See applications
              </Link>
              <Link className="btn btn-ghost" href="/#contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}