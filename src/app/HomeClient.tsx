"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRegion } from "@/components/region";

import RegionBar from "@/components/RegionBar";
import PCBWorkflow from "@/components/PCBWorkflow";
import ApplicationsGrid from "@/components/ApplicationsGrid";
// If you still use it elsewhere, keep it imported; otherwise remove.
// import MotherboardHotspots from "@/components/motherboard-hotspots";

type Meta = { title: string; sub: string };

const ENDORSEMENT = "D-Macht — a ReNewTech Solutions service line.";

const REGION_SUPPORT = {
  unknown: {
    label: "Select region",
    email: "support@dmacht.com",
    phoneDisplay: "Select region",
    phoneE164: "",
    headline: "Select a region to personalize support",
    sub: "Region affects availability, cadence, and on-site scheduling expectations.",
    note: "Tip: choose India or US to show the correct contact details.",
  },
  IN: {
    label: "India (live now)",
    email: "support@dmacht.com",
    phoneDisplay: "+91 99608 16363",
    phoneE164: "+919960816363",
    headline: "India support is live",
    sub: "Fast triage + preventive planning. We’ll confirm cadence, scope, and recommended spares.",
    note: "India: field service + remote diagnostics available now.",
  },
  US: {
    label: "US / Kansas City (booking soon)",
    email: "service@dmacht.com",
    phoneDisplay: "+1 (816) 957-3063",
    phoneE164: "+18169573063",
    headline: "US support is booking soon",
    sub: "Remote diagnostics now. We’ll confirm Kansas City scheduling as slots open.",
    note: "US: booking soon — remote diagnostics available now.",
  },
} as const;

function SpeedStrip() {
  const items = [
    { dot: "teal", text: "Fast triage + clear next steps" },
    { dot: "blue", text: "Remote-first diagnostics" },
    { dot: "ember", text: "Preventive maintenance planning" },
    { dot: "teal", text: "Markem-Imaje + Domino focus" },
    { dot: "blue", text: "Parts + consumables support" },
    { dot: "ember", text: "Response in hours, not days" },
  ] as const;

  const loop = [...items, ...items];

  return (
    <div className="speedStrip" aria-label="Speed strip">
      <div className="speedStripInner">
        {loop.map((it, idx) => (
          <div key={`${it.text}-${idx}`} className="speedPill">
            <span className={`dot ${it.dot}`} aria-hidden />
            <span>{it.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomeClient() {
  const { region, ready } = useRegion();

  const support = useMemo(() => {
    if (!ready) return REGION_SUPPORT.unknown;
    if (region === "IN") return REGION_SUPPORT.IN;
    if (region === "US") return REGION_SUPPORT.US;
    return REGION_SUPPORT.unknown;
  }, [ready, region]);

  const metaCards: Meta[] = useMemo(
    () => [
      { title: "Response", sub: "fast triage + next steps" },
      { title: "Format", sub: "remote-first support" },
      { title: "Brands", sub: "Markem + Domino focus" },
      { title: "Region", sub: region === "unknown" ? "pick to personalize" : support.label },
    ],
    [region, support.label]
  );

  return (
    <main className="homeRoot">
      {/* Optional: page background */}
      <div className="homeBg" aria-hidden />

      <div className="homeContent">
        {/* 1) RegionBar sits directly under Navbar */}
        <RegionBar />

        {/* 2) HERO */}
        <section className="mx-auto max-w-6xl px-4 pt-4" aria-label="Hero" id="top">
          <div className="heroWrap">
            {/* LEFT */}
            <div className="heroLeft">
              <div className="heroTopChips">
                <div className="chip">
                  <span className="chipDot" aria-hidden />
                  <span>Remote-first</span>
                  <span className="chipSep" aria-hidden>
                    •
                  </span>
                  <span>Markem-Imaje &amp; Domino</span>
                  <span className="chipSep" aria-hidden>
                    •
                  </span>
                  <span>Region-aware</span>
                </div>
              </div>

              <h1 className="heroH1">Keep your production line running.</h1>
              <p className="heroP">
                Fast triage, clear next steps, and preventive maintenance planning—built around Markem-Imaje &amp; Domino.
              </p>

              <div className="heroCtas">
                <Link className="btn btn-primary" href="#contact">
                  Request support
                </Link>
                <Link className="btn btn-ghost" href="#workflow">
                  See workflow
                </Link>
                <Link className="btn btn-ghost" href="#maintenance">
                  Maintenance
                </Link>
              </div>

              <div className="mt-3 text-xs text-white/60">
                Current selection: <span className="text-white/85">{support.label}</span>
              </div>
              <div className="mt-2 text-[11px] text-white/45">{ENDORSEMENT}</div>

              <div className="heroMetaGrid" aria-label="Hero highlights">
                {metaCards.map((m) => (
                  <div key={m.title} className="heroMetaCard">
                    <div className="heroMetaTitle">{m.title}</div>
                    <div className="heroMetaSub">{m.sub}</div>
                  </div>
                ))}
              </div>

              <SpeedStrip />
            </div>

            {/* RIGHT */}
            <aside className="heroRightCard" aria-label="Support panel">
              <div className="heroRightTop">
                <div>
                  <div className="heroRightKicker">Support channel</div>
                  <div className="heroRightRegion">
                    Region: <span className="heroRightRegionStrong">{support.label}</span>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white/90">{support.headline}</div>
                  <div className="mt-1 text-sm text-white/70">{support.sub}</div>
                </div>

                <Link className="btn btn-primary" href="#contact">
                  Request
                </Link>
              </div>

              <div className="heroRightBody">
                <div className="heroRightImageFrame" aria-label="Brand preview">
                  <Image src="/brand/dmacht-wordmark.svg" alt="D-Macht" width={900} height={360} priority />
                </div>

                <div className="heroRightCopy">
                  Clear next steps, documented fixes, and maintenance planning—so you can keep uptime high and surprises low.
                </div>

                <div className="heroContactGrid">
                  <div className="heroContactCard">
                    <div className="heroContactKicker">Email</div>
                    <a className="heroContactValue" href={`mailto:${support.email}`}>
                      {support.email}
                    </a>
                  </div>

                  <div className="heroContactCard">
                    <div className="heroContactKicker">Call/Text</div>
                    {support.phoneE164 ? (
                      <a className="heroContactValue" href={`tel:${support.phoneE164}`}>
                        {support.phoneDisplay}
                      </a>
                    ) : (
                      <div className="heroContactValue">{support.phoneDisplay}</div>
                    )}
                  </div>
                </div>

                <div className="mt-3 text-xs text-white/55">{support.note}</div>
                <div className="mt-2 text-[11px] text-white/45">{ENDORSEMENT}</div>
              </div>
            </aside>
          </div>
        </section>

        {/* 3) PRINT BRAND BANNER */}
        <section className="mx-auto max-w-6xl px-4 pt-10" aria-label="Banner" id="banner">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Printer brands</div>
            <div className="mt-2 text-xl font-semibold text-white/90">Markem-Imaje &amp; Domino focused</div>
            <div className="mt-2 text-sm text-white/70">
              Support for common reliability issues, consumables guidance, and predictable maintenance planning.
            </div>

            <div className="mt-5">
              {/* Swap this with your marquee/strip component if you have it */}
              <div className="rounded-2xl border border-white/10 bg-black/35 p-4 text-sm text-white/70">
                Add your “print brand banner / marquee” module here.
              </div>
            </div>
          </div>
        </section>

        {/* 4) SERVICES OFFERED */}
        <section className="mx-auto max-w-6xl px-4 pt-10" aria-label="Services" id="services">
          <div className="rounded-3xl border border-white/10 bg-black/35 p-6 md:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Services</div>
            <div className="mt-2 text-xl font-semibold text-white/90">Support that fits your uptime goals</div>
            <div className="mt-2 text-sm text-white/70">
              Remote-first diagnostics, on-site scheduling (region-aware), preventive planning, and consumables guidance.
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-sm font-semibold text-white/90">Remote diagnostics</div>
                <div className="mt-2 text-sm text-white/70">Fast triage with clear next steps and documented fixes.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-sm font-semibold text-white/90">On-site service</div>
                <div className="mt-2 text-sm text-white/70">Region-aware scheduling with a scoped plan and parts readiness.</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-sm font-semibold text-white/90">Preventive maintenance</div>
                <div className="mt-2 text-sm text-white/70">AMC packages, checklists, reports, and spares guidance.</div>
              </div>
            </div>
          </div>
        </section>

        {/* 5) MAINTENANCE */}
        <section className="mx-auto max-w-6xl px-4 pt-10" aria-label="Maintenance" id="maintenance">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Maintenance</div>
            <div className="mt-2 text-xl font-semibold text-white/90">Annual Maintenance Contracts (AMC)</div>
            <div className="mt-2 text-sm text-white/70">
              Region-aware contact + quote request flow — with clear coverage options.
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link className="btn btn-primary" href="/maintenance">
                View packages
              </Link>
              <Link className="btn btn-ghost" href="#contact">
                Request a quote
              </Link>
            </div>
          </div>
        </section>

        {/* 6) WORKFLOW (PCB) */}
        <section className="mx-auto max-w-6xl px-4 pt-10" aria-label="Workflow" id="workflow">
          <PCBWorkflow />
        </section>

        {/* 7) APPLICATIONS */}
        <section className="mx-auto max-w-6xl px-4 pt-10" aria-label="Applications" id="applications">
          <ApplicationsGrid />
        </section>

        {/* 8) CONTACT */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-16" aria-label="Contact" id="contact">
          <div className="rounded-3xl border border-white/10 bg-black/35 p-6 md:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Contact</div>
            <div className="mt-2 text-xl font-semibold text-white/90">Request support</div>
            <div className="mt-2 text-sm text-white/70">
              Use the form below (or email/call based on your selected region).
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70">
              Put your contact form module here (or wire to /api/request-service).
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}