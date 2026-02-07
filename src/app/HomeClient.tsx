"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import RequestForm from "@/components/RequestForm";
import useRevealOnScroll from "@/components/useRevealOnScroll";
import MotherboardHotspots from "@/components/motherboard-hotspots";

type Region = "IN" | "US";

const REGION_KEY = "dmacht_region";
const REGION_EVENT = "dmacht:region";

const REGIONS: Record<
  Region,
  {
    labelShort: string;
    labelLong: string;
    email: string;
    phoneDisplay: string;
    phoneTel: string;
    manufactureLine: string;
    inkCopy: string;
  }
> = {
  IN: {
    labelShort: "India",
    labelLong: "India (live now)",
    email: "support@dmacht.com",
    phoneDisplay: "+91 99608 16363",
    phoneTel: "+919960816363",
    manufactureLine: "All our products are manufactured in India.",
    inkCopy:
      "We offer a wide range of OEM compatible CIJ inks and fluids for the coding and marking sector. Our CIJ ranges cover all leading brands on the market. We only supply premium ink with very high quality standards to deliver the best performance possible. We can supply most CIJ (Continuous Ink Jet), DOD, and TIJ ink available on the market.",
  },
  US: {
    labelShort: "Kansas City",
    labelLong: "Kansas City (booking soon)",
    email: "service@dmacht.com",
    phoneDisplay: "816.957.3063",
    phoneTel: "+18169573063",
    manufactureLine: "All our products are manufactured in the US.",
    inkCopy:
      "We supply premium coding fluids and OEM-compatible CIJ inks with performance-first quality standards—backed by practical field experience across common production environments.",
  },
};

const INDUSTRIES = [
  "Food",
  "Beverages",
  "Pharmaceuticals",
  "Pipes & Tubes",
  "Dairy",
  "Wires & Cables",
  "Cosmetics",
  "Electronics",
  "Packaging",
  "Barcode / Coding",
];

const APPLICATIONS = [
  "Metal & PVC tubes",
  "Dairy packs",
  "Groceries",
  "Wire & cables",
  "Cans",
  "Beverages",
  "Soft drinks",
  "Cosmetics",
  "Pharmaceuticals",
  "Food packaging",
];

function getInitialRegion(): Region {
  if (typeof window === "undefined") return "IN";
  const url = new URL(window.location.href);
  const qp = url.searchParams.get("region");
  if (qp === "US" || qp === "IN") return qp;
  const saved = window.localStorage.getItem(REGION_KEY);
  if (saved === "US" || saved === "IN") return saved;
  return "IN";
}

export default function HomeClient() {
  useRevealOnScroll();

  const [region, setRegion] = useState<Region>("IN");

  useEffect(() => {
    setRegion(getInitialRegion());

    const onRegionEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === "IN" || detail === "US") setRegion(detail);
    };

    window.addEventListener(REGION_EVENT, onRegionEvent as EventListener);
    return () => window.removeEventListener(REGION_EVENT, onRegionEvent as EventListener);
  }, []);

  const info = REGIONS[region];

  const mailHref = useMemo(() => `mailto:${info.email}`, [info.email]);
  const telHref = useMemo(() => `tel:${info.phoneTel}`, [info.phoneTel]);

  function updateRegion(next: Region) {
    setRegion(next);
    try {
      window.localStorage.setItem(REGION_KEY, next);
      window.dispatchEvent(new CustomEvent(REGION_EVENT, { detail: next }));
    } catch {}
  }

  return (
    <main id="top" className="mx-auto max-w-6xl px-4 pb-24">
      {/* HERO */}
      <section className="mt-10 md:mt-14 reveal">
        <div className="grid gap-10 md:grid-cols-[1.25fr_.9fr] md:items-start">
          {/* Left copy */}
          <div>
            {/* Kicker + region pill */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                Industrial Inkjet Printer Support • Remote-first today
              </div>

              <div className="md:hidden">
                <select
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 outline-none"
                  value={region}
                  onChange={(e) => updateRegion(e.target.value as Region)}
                >
                  <option value="IN">India (live now)</option>
                  <option value="US">Kansas City (booking soon)</option>
                </select>
              </div>
            </div>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
              Keep your production line running.
            </h1>

            <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
              Remote diagnostics, planning, and preventative maintenance—built around Markem-Imaje &amp;
              Domino. Kansas City field service is coming online soon.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a className="btn btn-primary" href="#contact">
                Request support
              </a>
              <a className="btn" href="#how-it-works">
                See how it works
              </a>
            </div>

            {/* Proof row */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { t: "Remote diagnostics", d: "fault isolation + next steps" },
                { t: "PM planning", d: "reduce downtime" },
                { t: "Parts guidance", d: "what to order + why" },
                { t: "KC expansion", d: "booking soon" },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-2xl border border-white/10 bg-black/35 p-4"
                >
                  <div className="text-sm font-semibold">{x.t}</div>
                  <div className="mt-1 text-sm text-white/60">{x.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right hero card with BIG logo (fixes “tiny logo” issue) */}
          <div className="reveal">
            <div className="glass trace rounded-3xl p-6">
              <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    {info.labelLong}
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                    Remote-first
                  </span>
                </div>

                {/* The logo image likely has padding; scale it so it reads visually larger */}
                <div className="relative mt-5 h-24 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 md:h-28">
                  <Image
                    src="/brand/dmacht-logo.png"
                    alt="D-Macht"
                    fill
                    priority
                    sizes="(min-width: 768px) 420px, 90vw"
                    className="object-contain"
                    style={{ transform: "scale(1.55)" }}
                  />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    { t: "Remote-first", d: "fast triage" },
                    { t: "Clear steps", d: "no guessing" },
                    { t: "Focused brands", d: "Markem + Domino" },
                    { t: "Expansion", d: "KC booking soon" },
                  ].map((x) => (
                    <div
                      key={x.t}
                      className="rounded-2xl border border-white/10 bg-black/30 p-4"
                    >
                      <div className="text-sm font-semibold">{x.t}</div>
                      <div className="mt-1 text-sm text-white/60">{x.d}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs text-white/65">
                  <span className="text-white/70">Email:</span>{" "}
                  <a className="underline" href={mailHref}>
                    {info.email}
                  </a>{" "}
                  <span className="text-white/40">•</span>{" "}
                  <span className="text-white/70">Call/Text:</span>{" "}
                  <a className="underline" href={telHref}>
                    {info.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Optional: keep your hotspots module (now imports correctly) */}
            <div className="mt-5">
              <MotherboardHotspots />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="mt-12 md:mt-16 reveal">
        <div className="glass trace rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Workflow map
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            A simple, repeatable process that gets you answers quickly and reduces repeat failures.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "1) Triage",
                d: "Model + symptoms + context. We isolate likely causes and confirm next tests.",
              },
              {
                t: "2) Action plan",
                d: "Clear steps: adjustments, cleaning cycles, parts list, and verification checks.",
              },
              {
                t: "3) Prevent & schedule",
                d: "PM plan + checklists so the same failure doesn’t return next week.",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border border-white/10 bg-black/40 p-5">
                <div className="text-sm font-semibold">{x.t}</div>
                <div className="mt-2 text-sm text-white/70">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVAILABILITY (user-facing) */}
      <section id="availability" className="mt-10 md:mt-14 reveal">
        <div className="glass trace rounded-3xl p-6 md:p-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Availability roadmap
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                We’re live now for India (remote + regional). Kansas City field service comes online as Dee relocates.
              </p>
            </div>

            <a href="#contact" className="btn btn-primary">
              Request support
            </a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {/* Phase 1 */}
            <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  Phase 1
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                  Live now • India
                </span>
              </div>

              <div className="mt-3 text-lg font-semibold text-white/90">
                Remote-first support (India)
              </div>

              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li>• Remote diagnostics (fault isolation + action plan)</li>
                <li>• Planning &amp; PM guidance (cleaning cycles, schedules, checklists)</li>
                <li>• Regional India availability (site visits where possible)</li>
                <li>• US expansion coming soon (quietly)</li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                  Phase 2
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                  2–3 months out
                </span>
              </div>

              <div className="mt-3 text-lg font-semibold text-white/90">
                Pre-arrival ramp (Kansas City)
              </div>

              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li>• Add “Kansas City — booking soon”</li>
                <li>• Offer calendar slots for future dates</li>
                <li>• Start SEO + local service pages</li>
              </ul>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-3 text-xs text-white/65">
                Tip: we can capture leads now and schedule installs/PM dates ahead of arrival.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="mt-10 md:mt-14 reveal">
        <div className="glass trace rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Capabilities
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            What we actually do (and what you can expect in the first response).
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { t: "Remote diagnostics", d: "Fault isolation + next tests + step-by-step action." },
              { t: "Preventative maintenance", d: "Schedules, cleaning cycles, checklists, and training." },
              { t: "Parts guidance", d: "Exactly what to order + why (avoid wrong parts)." },
              { t: "Ink & fluids supply", d: info.manufactureLine },
              { t: "Board-level support", d: "Electronics evaluation + repair guidance where applicable." },
              { t: "Field service (soon)", d: "Kansas City booking opens as relocation completes." },
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border border-white/10 bg-black/40 p-5">
                <div className="text-sm font-semibold">{x.t}</div>
                <div className="mt-2 text-sm text-white/70">{x.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/35 p-5">
            <div className="text-sm font-semibold">Ink & fluids</div>
            <p className="mt-2 text-sm text-white/70">{info.inkCopy}</p>
          </div>
        </div>
      </section>

      {/* INDUSTRIES + APPLICATIONS */}
      <section id="industries" className="mt-10 md:mt-14 reveal">
        <div className="glass trace rounded-3xl p-6 md:p-10">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Industries & applications
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                Supported across both regions (US + India). We’ll refine this with “badass” imagery next.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Industries we serve
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {INDUSTRIES.map((x) => (
                  <div
                    key={x}
                    className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white/75"
                  >
                    {x}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Applications
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {APPLICATIONS.map((x) => (
                  <div
                    key={x}
                    className="group rounded-2xl border border-white/10 bg-black/30 p-3"
                  >
                    <div className="h-10 rounded-xl border border-white/10 bg-white/5" />
                    <div className="mt-2 text-xs font-semibold text-white/80">
                      {x}
                    </div>
                    <div className="mt-1 text-[11px] text-white/55">
                      CIJ / TIJ / DOD use-cases
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mt-10 md:mt-14 reveal">
        <div className="grid gap-6 md:grid-cols-[1.05fr_.95fr] md:items-start">
          <div className="glass trace rounded-3xl p-6 md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Request support
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Choose your region and tell us the model + symptoms. We’ll reply with clear next steps.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                Active: {info.labelShort}
              </span>
              <button className="btn" onClick={() => updateRegion(region === "IN" ? "US" : "IN")}>
                Switch to {region === "IN" ? "US/KC" : "India"}
              </button>
            </div>

            <div className="mt-6 text-sm text-white/70">
              Prefer email or phone?{" "}
              <a className="underline" href={mailHref}>
                {info.email}
              </a>{" "}
              <span className="text-white/40">•</span>{" "}
              <a className="underline" href={telHref}>
                {info.phoneDisplay}
              </a>
            </div>
          </div>

          <RequestForm defaultEmail={info.email} defaultPhone={info.phoneDisplay} />
        </div>
      </section>
    </main>
  );
}