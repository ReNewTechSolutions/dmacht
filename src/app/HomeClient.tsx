"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import { useRegion, type Region } from "@/components/region";

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

function RegionSelect({
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
    <div className="regionSelectRow">
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
  const { region, setRegion, ready } = useRegion();

  const support = useMemo(() => {
    if (!ready) return REGION_SUPPORT.unknown;
    if (region === "IN") return REGION_SUPPORT.IN;
    if (region === "US") return REGION_SUPPORT.US;
    return REGION_SUPPORT.unknown;
  }, [ready, region]);

  const metaCards: Meta[] = useMemo(() => {
    return [
      { title: "Response", sub: "fast triage + next steps" },
      { title: "Format", sub: "remote-first support" },
      { title: "Brands", sub: "Markem + Domino focus" },
      { title: "Region", sub: region === "unknown" ? "pick to personalize" : support.label },
    ];
  }, [region, support.label]);

  return (
    <main className="mx-auto max-w-6xl px-4">
      <section className="hero" aria-label="Hero">
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

              {/* ✅ Removed the extra region chip to avoid “stacked” feel */}
            </div>

            <h1 className="heroH1">Keep your production line running.</h1>

            <p className="heroP">
              Fast triage, clear next steps, and preventive maintenance planning—built around Markem-Imaje &amp; Domino.
            </p>

            <div className="heroCtas">
              <a className="btn btn-primary" href="#contact">
                Request support
              </a>
              <a className="btn btn-ghost" href="#workflow">
                See workflow
              </a>
              <a className="text-sm text-white/70 hover:text-white/90" href="/maintenance">
                Maintenance
              </a>
            </div>

            {/* REGION PICKER */}
            <div className="heroRegionRow">
              <RegionSelect region={region} setRegion={setRegion} ready={ready} />
              <div className="mt-2 text-xs text-white/55">
                Current selection: <span className="text-white/80">{support.label}</span>
              </div>
              <div className="mt-2 text-[11px] text-white/45">{ENDORSEMENT}</div>
            </div>

            {/* META CARDS */}
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

                {/* ✅ Region-aware headline/sub */}
                <div className="mt-2 text-sm font-semibold text-white/90">{support.headline}</div>
                <div className="mt-1 text-sm text-white/70">{support.sub}</div>
              </div>

              <a className="btn btn-primary" href="#contact">
                Request
              </a>
            </div>

            <div className="heroRightBody">
              <div className="heroRightImageFrame" aria-label="Brand preview">
                <Image
                  src="/brand/dmacht-wordmark.svg"
                  alt="D-Macht wordmark"
                  width={900}
                  height={360}
                  priority
                />
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
    </main>
  );
}