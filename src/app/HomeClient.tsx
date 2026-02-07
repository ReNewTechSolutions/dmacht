"use client";

import { useEffect, useMemo, useState } from "react";
import RequestForm from "@/components/RequestForm";
import useRevealOnScroll from "@/components/useRevealOnScroll";
import MotherboardHotspots from "@/components/motherboard-hotspots";
import ApplicationsGrid from "@/components/ApplicationsGrid";

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
      "We offer a wide range of OEM compatible CIJ inks and fluids for the coding and marking sector. Our CIJ ranges cover all leading brands on the market. We only supply premium ink with very high quality standards to deliver the best performance possible. We can supply most of the CIJ (Continuous Ink Jet), DOD, and TIJ ink available on the market.",
  },
  US: {
    labelShort: "United States",
    labelLong: "United States (Kansas City service)",
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
  "Barcode / Labels",
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
      {/* HERO — SPEED STRIP */}
      <section className="mt-10 md:mt-14 reveal" aria-label="Hero">
        <div className="grid gap-8 md:grid-cols-[1.15fr_.85fr] md:items-start">
          {/* LEFT */}
          <div>
            {/* Top strip */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
                Remote-first • Markem-Imaje &amp; Domino • Region-aware
              </div>

              {/* Region select (compact) */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                <span className="hidden sm:inline text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  Region
                </span>
                <select
                  className="rounded-full bg-transparent px-2 py-0.5 text-xs text-white/80 outline-none"
                  value={region}
                  onChange={(e) => updateRegion(e.target.value as Region)}
                  aria-label="Select region"
                >
                  <option value="IN">India</option>
                  <option value="US">United States (KC)</option>
                </select>
              </div>

              {/* Status pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                {info.labelLong}
              </div>
            </div>

            {/* Logo row (SVG-safe) */}
            <div className="mt-6 flex items-center gap-4">
              <img
                src="/brand/dmacht-wordmark.svg"
                alt="D-Macht"
                className="h-9 w-auto opacity-95"
                loading="eager"
                draggable={false}
              />

              <img
                src="/brand/applications/dmacht-oldlogo.svg"
                alt="D-Macht legacy logo"
                className="h-10 w-auto opacity-80"
                loading="lazy"
                draggable={false}
              />
            </div>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
              Keep your production line running.
            </h1>

            <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">
              Remote diagnostics, preventative maintenance, and ink &amp; fluids supply — built around Markem-Imaje
              &amp; Domino. Fast, clear, action-ready next steps.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a className="btn btn-primary" href="#contact">
                Request support
              </a>
              <a className="btn" href="#industries">
                See applications
              </a>
              <a className="btn" href={telHref}>
                Call/Text
              </a>
            </div>

            {/* Horizontal capability strip (mobile scroll) */}
            <div className="mt-6">
              <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none]">
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                {[
                  { t: "Remote diagnostics", s: "fault isolation" },
                  { t: "PM planning", s: "reduce downtime" },
                  { t: "Parts guidance", s: "order right" },
                  { t: "CIJ / TIJ / DOD", s: "ink + fluids" },
                  { t: "Markem + Domino", s: "focused support" },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="min-w-[210px] rounded-2xl border border-white/10 bg-black/35 px-4 py-3"
                  >
                    <div className="text-sm font-semibold text-white/85">{x.t}</div>
                    <div className="mt-1 text-xs text-white/55">{x.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — compact support card */}
          <div className="reveal">
            <div className="glass trace rounded-3xl p-5 md:p-6">
              <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    Support channel
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                    {info.labelShort}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { t: "Response", d: "Fast triage + next steps" },
                    { t: "Focus", d: "Markem + Domino" },
                    { t: "Format", d: "Remote-first support" },
                    { t: "Supply", d: "CIJ/TIJ/DOD inks" },
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="text-sm font-semibold">{x.t}</div>
                      <div className="mt-1 text-sm text-white/60">{x.d}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Contact</div>
                  <div className="mt-3 text-sm text-white/75">
                    <div>
                      <span className="text-white/60">Email:</span>{" "}
                      <a className="underline" href={mailHref}>
                        {info.email}
                      </a>
                    </div>
                    <div className="mt-1">
                      <span className="text-white/60">Call/Text:</span>{" "}
                      <a className="underline" href={telHref}>
                        {info.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-white/65">
                  <span className="text-white/70">Manufacturing:</span> {info.manufactureLine}
                </div>

                <div className="mt-5 flex gap-3">
                  <a href="#contact" className="btn btn-primary w-full">
                    Start a request
                  </a>
                </div>
              </div>
            </div>

            {/* Motherboard module stays below the card (desktop + mobile) */}
            <div className="mt-5">
              <MotherboardHotspots />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="mt-12 md:mt-16 reveal">
        <div className="glass trace rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">How it works</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            A simple, repeatable process that gets you answers quickly and reduces repeat failures.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                t: "1) Triage",
                d: "Model + symptoms + context. We isolate likely causes and confirm the next checks.",
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

      {/* CAPABILITIES */}
      <section id="capabilities" className="mt-10 md:mt-14 reveal">
        <div className="glass trace rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Capabilities</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            What we do — and what you can expect in the first response.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { t: "Remote diagnostics", d: "Fault isolation + next checks + step-by-step action plan." },
              { t: "Preventative maintenance", d: "Schedules, cleaning cycles, checklists, and training guidance." },
              { t: "Parts guidance", d: "Exactly what to order + why (avoid wrong parts)." },
              { t: "Ink & fluids supply", d: info.manufactureLine },
              { t: "Board-level support", d: "Electronics evaluation + repair guidance where applicable." },
              { t: "Service coordination", d: "Region-aware response paths and support routing." },
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border border-white/10 bg-black/40 p-5">
                <div className="text-sm font-semibold">{x.t}</div>
                <div className="mt-2 text-sm text-white/70">{x.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/35 p-5">
            <div className="text-sm font-semibold">Ink &amp; fluids</div>
            <p className="mt-2 text-sm text-white/70">{info.inkCopy}</p>
          </div>
        </div>
      </section>

      {/* INDUSTRIES + APPLICATIONS */}
      <section id="industries" className="mt-10 md:mt-14 reveal">
        <div className="glass trace rounded-3xl p-6 md:p-10">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Industries &amp; applications</h2>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                Supported across both regions (US + India). Explore common use-cases below.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Industries we serve
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
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

            {/* Applications (your SVG grid component) */}
            <ApplicationsGrid />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mt-10 md:mt-14 reveal">
        <div className="grid gap-6 md:grid-cols-[1.05fr_.95fr] md:items-start">
          <div className="glass trace rounded-3xl p-6 md:p-10">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Request support</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Choose your region and tell us the model + symptoms. We’ll reply with clear next steps.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                Active: {info.labelShort}
              </span>
              <button className="btn" onClick={() => updateRegion(region === "IN" ? "US" : "IN")}>
                Switch to {region === "IN" ? "US" : "India"}
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