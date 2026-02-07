"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
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
    statusPill: string;
  }
> = {
  IN: {
    labelShort: "India",
    labelLong: "India (live now)",
    statusPill: "Live now",
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
    statusPill: "Booking soon",
    email: "service@dmacht.com",
    phoneDisplay: "816.957.3063",
    phoneTel: "+18169573063",
    manufactureLine: "All our products are manufactured in the US.",
    inkCopy:
      "We supply premium coding fluids and OEM-compatible CIJ inks with performance-first quality standards—backed by practical field experience across common production environments.",
  },
};

function getInitialRegion(): Region {
  // Safe for SSR
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

  // ✅ Lazy init removes the need to setState in an effect
  const [region, setRegion] = useState<Region>(() => getInitialRegion());

  useEffect(() => {
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
        <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr] md:items-start">
          {/* LEFT */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                Remote-first • Markem-Imaje &amp; Domino • Region-aware
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
                {info.labelLong}
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
              Fast triage, clear next steps, and preventative maintenance planning—built around Markem-Imaje &amp; Domino.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a className="btn btn-primary" href="#contact">
                Request support
              </a>
              <a className="btn" href="#workflow">
                See workflow
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { t: "Response", d: "fast triage + next steps" },
                { t: "Format", d: "remote-first support" },
                { t: "Brands", d: "Markem + Domino focus" },
                { t: "Region", d: info.statusPill },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <div className="text-sm font-semibold">{x.t}</div>
                  <div className="mt-1 text-sm text-white/60">{x.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="reveal">
            <div className="glass trace rounded-3xl p-6">
              <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    {info.labelLong}
                  </div>

                  <div className="hidden md:block">
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

                {/* ✅ Controlled size so it doesn't blow out layout */}
                <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 px-4 py-4">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/brand/dmacht-wordmark.svg"
                      alt="D-Macht"
                      width={560}
                      height={140}
                      priority
                      className="h-10 w-auto md:h-12 lg:h-14"
                    />
                  </div>

                  {/* legacy logo (secondary) */}
                  <div className="mt-3 flex items-center justify-center">
                    <Image
                      src="/brand/applications/dmacht-oldlogo.svg"
                      alt="D-Macht legacy logo"
                      width={180}
                      height={60}
                      className="h-6 w-auto opacity-80"
                    />
                  </div>
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

                <div className="mt-5 flex gap-3">
                  <a className="btn btn-primary w-full" href="#contact">
                    Request support
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <MotherboardHotspots />
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="mt-12 md:mt-16 reveal">
        <div className="glass trace rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Workflow</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            A simple, repeatable process that gets you answers quickly and reduces repeat failures.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { t: "1) Triage", d: "Model + symptoms + context. We isolate likely causes and confirm next tests." },
              { t: "2) Action plan", d: "Clear steps: adjustments, cleaning cycles, parts list, and verification checks." },
              { t: "3) Prevent & schedule", d: "PM plan + checklists so the same failure doesn’t return next week." },
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border border-white/10 bg-black/40 p-5">
                <div className="text-sm font-semibold">{x.t}</div>
                <div className="mt-2 text-sm text-white/70">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section id="applications" className="mt-10 md:mt-14 reveal">
        <div className="glass trace rounded-3xl p-6 md:p-10">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Applications</h2>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                Visual examples of common coding surfaces and production environments.
              </p>
            </div>
            <a href="#contact" className="btn btn-primary">
              Request support
            </a>
          </div>

          <div className="mt-6">
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