"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { useRegion, type Region, regionLabel as getRegionLabel } from "@/components/region";

/**
 * ✅ One endorsement line, always (per your confirmation)
 */
const ENDORSEMENT = "DMacht — a ReNewTech Solutions service line.";

/**
 * ✅ Region-aware contact + copy (new info)
 * IN: +919960816363 / support@dmacht.com
 * US: +18169573063 / service@dmacht.com
 */
const REGION_SUPPORT = {
  IN: {
    label: "India (live now)",
    email: "support@dmacht.com",
    phoneDisplay: "+91 99608 16363",
    phoneE164: "+919960816363",
    headline: "India support is live",
    sub: "Request triage + preventive planning. We’ll confirm cadence, scope, and recommended spares.",
    ctaText: "Request",
    note: "",
  },
  US: {
    label: "US / Kansas City (booking soon)",
    email: "service@dmacht.com",
    phoneDisplay: "+1 (816) 957-3063",
    phoneE164: "+18169573063",
    headline: "US support is booking soon",
    sub: "We can start remote diagnostics immediately. We’ll confirm Kansas City scheduling as slots open.",
    ctaText: "Request",
    note: "US note: booking soon — remote diagnostics available now.",
  },
  unknown: {
    label: "Select region",
    email: "service@dmacht.com",
    phoneDisplay: "+1 (816) 957-3063",
    phoneE164: "+18169573063",
    headline: "Select a region to personalize support",
    sub: "Region affects availability, cadence, and on-site scheduling expectations.",
    ctaText: "Request",
    note: "Tip: choose a region to unlock the correct availability.",
  },
} as const;

type Meta = { title: string; sub: string };

function RegionSegmented({
  region,
  setRegion,
  ready,
}: {
  region: Region;
  setRegion: (r: Region) => void;
  ready: boolean;
}) {
  const isUnknown = ready && region === "unknown";
  const isIN = region === "IN";
  const isUS = region === "US";

  return (
    <div className={`regionSegWrap ${isUnknown ? "is-attn" : ""}`} aria-label="Select region">
      <div className="regionSegLabel">
        <span className="regionSegDot" aria-hidden />
        <span>{isUnknown ? "Select your region" : "Region"}</span>
        {isUnknown && <span className="regionSegHint">Required to personalize support</span>}
      </div>

      <div className="regionSeg" role="tablist" aria-label="Region options">
        <button
          type="button"
          className={`regionSegBtn ${isIN ? "is-active is-in" : ""}`}
          onClick={() => setRegion("IN")}
          disabled={!ready}
          aria-pressed={isIN}
        >
          India <span className="regionSegSub">live now</span>
        </button>

        <button
          type="button"
          className={`regionSegBtn ${isUS ? "is-active is-us" : ""}`}
          onClick={() => setRegion("US")}
          disabled={!ready}
          aria-pressed={isUS}
        >
          US / Kansas City <span className="regionSegSub">booking soon</span>
        </button>
      </div>

      {/* Fallback select for accessibility */}
      <select
        className="regionSegSelect"
        value={region}
        onChange={(e) => setRegion(e.target.value as Region)}
        disabled={!ready}
        aria-label="Select region"
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

  // ✅ One label for the chip (no stacking)
  const label = useMemo(() => getRegionLabel(region, ready), [region, ready]);

  const isUS = ready && region === "US";
  const isIN = ready && region === "IN";
  const isUnknown = ready && region === "unknown";

  // ✅ Region-aware support object (new contact info)
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
      { title: "Region", sub: isUnknown ? "pick to personalize" : label },
    ];
  }, [label, isUnknown]);

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

              <div className="chip chipRegion">
                <span className="chipDot" aria-hidden />
                <span>{label}</span>
              </div>
            </div>

            <h1 className="heroH1">Keep your production line running.</h1>

            <p className="heroP">
              Fast triage, clear next steps, and preventive maintenance planning—built around Markem-Imaje &amp; Domino.
            </p>

            <div className="heroCtas">
              <Link className="btn btn-primary" href="/#contact">
                Request support
              </Link>
              <Link className="btn btn-ghost" href="/#workflow">
                See workflow
              </Link>
              <Link className="btn btn-ghost" href="/maintenance">
                Maintenance
              </Link>
            </div>

            <div className="heroRegionRow">
              <RegionSegmented region={region} setRegion={setRegion} ready={ready} />
            </div>

            <div className="heroMetaGrid" aria-label="Hero highlights">
              {metaCards.map((m) => (
                <div key={m.title} className="heroMetaCard">
                  <div className="heroMetaTitle">{m.title}</div>
                  <div className="heroMetaSub">{m.sub}</div>
                </div>
              ))}
            </div>

            {/* ✅ Remove extra logos: keep ONLY the BrandLogo component (no legacy logo here) */}
            <div className="heroBrandRow" aria-label="Brand marks">
              <BrandLogo variant="hero" mode="wide" className="heroWordmark" />
            </div>

            {/* ✅ Endorsement line (one place) */}
            <div className="heroEndorsement">{ENDORSEMENT}</div>

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

                <div className="heroRightHeadline">{support.headline}</div>
                <div className="heroRightSub">{support.sub}</div>
              </div>

              <Link className="btn btn-primary" href="/#contact">
                {support.ctaText}
              </Link>
            </div>

            <div className="heroRightBody">
              <div className="heroRightImageFrame" aria-label="Brand preview">
                <Image
                  src="/brand/dmacht-wordmark.svg"
                  alt="DMacht wordmark"
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
                  <a className="heroContactValue" href={`tel:${support.phoneE164}`}>
                    {support.phoneDisplay}
                  </a>
                </div>
              </div>

              {(isUS || isUnknown) && <div className="heroNote">{support.note}</div>}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}