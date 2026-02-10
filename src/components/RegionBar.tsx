"use client";

import React from "react";
import { useRegion, type Region } from "@/components/region";

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
  const isUnknown = region === "unknown";

  return (
    <div className="regionBarControls" aria-label="Select region">
      <div className="regionSeg" role="tablist" aria-label="Region options">
        <button
          type="button"
          onClick={() => setRegion("IN")}
          disabled={!ready}
          aria-pressed={isIN}
          className={[
            "regionSegBtn",
            isIN ? "is-active is-in" : "",
            isUnknown ? "is-nudge" : "",
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
            isUnknown ? "is-nudge" : "",
          ].join(" ")}
        >
          US / KC <span className="regionSegSub">soon</span>
        </button>
      </div>

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
  const { region, setRegion, ready, support, isUnknown } = useRegion();

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