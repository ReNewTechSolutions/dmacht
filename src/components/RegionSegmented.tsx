// components/RegionSegmented.tsx
"use client";

import React from "react";
import type { Region } from "@/components/region";

export default function RegionSegmented({
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
    <div className="regionSegWrap" aria-label="Select region">
      <div className="regionSegLabel">
        <span className="regionSegDot" aria-hidden />
        <span>{isUnknown ? "Choose your region" : "Region"}</span>
        <span className="regionSegHint">Switch to see contacts + availability</span>
      </div>

      <div className="regionSeg" role="tablist" aria-label="Region options">
        <button
          type="button"
          className={`regionSegBtn is-in ${isIN ? "is-active" : ""}`}
          onClick={() => setRegion("IN")}
          disabled={!ready}
          aria-pressed={isIN}
        >
          India <span className="regionSegSub">live now</span>
        </button>

        <button
          type="button"
          className={`regionSegBtn is-us ${isUS ? "is-active" : ""}`}
          onClick={() => setRegion("US")}
          disabled={!ready}
          aria-pressed={isUS}
        >
          US / Kansas City <span className="regionSegSub">booking soon</span>
        </button>
      </div>

      {/* fallback select (hidden visually; prevents "stacked" feeling) */}
      <select
        className="sr-only"
        value={region}
        onChange={(e) => setRegion(e.target.value as Region)}
        disabled={!ready}
        aria-label="Select region"
      >
        <option value="unknown">Select region…</option>
        <option value="IN">India</option>
        <option value="US">US</option>
      </select>
    </div>
  );
}