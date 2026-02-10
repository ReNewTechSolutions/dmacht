"use client";

import React, { useMemo } from "react";
import { useRegion, type Region } from "@/components/region";

type Support = {
  label: string;
  email: string;
  phoneDisplay: string;
  phoneE164: string;
  headline: string;
  sub: string;
  note: string;
};

const REGION_SUPPORT: Record<Region, Support> = {
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
};

function Segmented({
  region,
  setRegion,
  ready,
}: {
  region: Region;
  setRegion: (r: Region) => void;
  ready: boolean;
}) {
  const isIN = region === "IN";
  const isUS = region === "US";

  return (
    <div className="regionBarControls" aria-label="Select region">
      {/* segmented */}
      <div className="regionSeg" role="tablist" aria-label="Region options">
        <button
          type="button"
          onClick={() => setRegion("IN")}
          disabled={!ready}
          aria-pressed={isIN}
          className={[
            "regionSegBtn",
            isIN ? "is-active is-in" : "",
            region === "unknown" ? "is-nudge" : "",
          ].join(" ")}
        >
          India <span className="regionSegSub">live</span>
        </button>

        <button
          type="button"
          onClick={() => setRegion("US")}
          disabled={!ready}
          aria-pressed={isUS}
          className={[
            "regionSegBtn",
            isUS ? "is-active is-us" : "",
            region === "unknown" ? "is-nudge" : "",
          ].join(" ")}
        >
          US / KC <span className="regionSegSub">soon</span>
        </button>
      </div>

      {/* fallback select for mobile + a11y */}
      <select
        className="regionSelect"
        value={region}
        onChange={(e) => setRegion(e.target.value as Region)}
        disabled={!ready}
        aria-label="Select region"
      >
        <option value="unknown">Select…</option>
        <option value="IN">India (live)</option>
        <option value="US">US / Kansas City (soon)</option>
      </select>
    </div>
  );
}

export default function RegionBar() {
  const { region, setRegion, ready } = useRegion();

  const support = useMemo(() => {
    if (!ready) return REGION_SUPPORT.unknown;
    return REGION_SUPPORT[region] ?? REGION_SUPPORT.unknown;
  }, [ready, region]);

  const isUnknown = ready && region === "unknown";

  return (
    <section className="regionBarShell" aria-label="Region" id="region">
      <div className="regionBarInner">
        <div className="regionBarLeft">
          <div className="regionBarKicker">Region</div>
          <div className="regionBarTitle">
            {isUnknown ? "Choose your region" : "Region selected:"}{" "}
            <span className="regionBarTitleStrong">{support.label}</span>
          </div>
          <div className="regionBarSub">
            {isUnknown
              ? "This switches contact details + availability across the site."
              : support.note}
          </div>
        </div>

        <div className="regionBarRight">
          <Segmented region={region} setRegion={setRegion} ready={ready} />

          <div className="regionBarMiniContact" aria-label="Region contact">
            <a className="regionMiniPill" href={`mailto:${support.email}`}>
              <span className="regionMiniK">Email</span>
              <span className="regionMiniV">{support.email}</span>
            </a>

            {support.phoneE164 ? (
              <a className="regionMiniPill" href={`tel:${support.phoneE164}`}>
                <span className="regionMiniK">Call/Text</span>
                <span className="regionMiniV">{support.phoneDisplay}</span>
              </a>
            ) : (
              <div className="regionMiniPill is-disabled">
                <span className="regionMiniK">Call/Text</span>
                <span className="regionMiniV">{support.phoneDisplay}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}