"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { useRegion, type Region } from "@/components/region";

const ENDORSEMENT = "D-Macht — a ReNewTech Solutions service line.";

const REGION_SUPPORT = {
  unknown: {
    label: "Select region",
    email: "support@dmacht.com",
    phoneDisplay: "Select region",
    phoneE164: "",
  },
  IN: {
    label: "India (live now)",
    email: "support@dmacht.com",
    phoneDisplay: "+91 99608 16363",
    phoneE164: "+919960816363",
  },
  US: {
    label: "US / Kansas City (booking soon)",
    email: "service@dmacht.com",
    phoneDisplay: "+1 (816) 957-3063",
    phoneE164: "+18169573063",
  },
} as const;

function RegionToggle({
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
    <div className="navRegion" aria-label="Region selector">
      <div className="navRegionSeg" role="tablist" aria-label="Region options">
        <button
          type="button"
          className={`navRegionBtn ${isIN ? "is-active is-in" : ""}`}
          onClick={() => setRegion("IN")}
          disabled={!ready}
          aria-pressed={isIN}
        >
          IN <span className="navRegionSub">live</span>
        </button>

        <button
          type="button"
          className={`navRegionBtn ${isUS ? "is-active is-us" : ""}`}
          onClick={() => setRegion("US")}
          disabled={!ready}
          aria-pressed={isUS}
        >
          US <span className="navRegionSub">soon</span>
        </button>
      </div>

      {/* Accessible fallback (kept hidden via CSS if you want) */}
      <select
        className="navRegionSelect"
        value={region}
        onChange={(e) => setRegion(e.target.value as Region)}
        disabled={!ready}
        aria-label="Select region"
      >
        <option value="unknown">Select region…</option>
        <option value="IN">India (live now)</option>
        <option value="US">US / Kansas City (booking soon)</option>
      </select>

      {ready && isUnknown && <div className="navRegionHint">Select region</div>}
    </div>
  );
}

export default function Navbar() {
  const { region, setRegion, ready } = useRegion();
  const [open, setOpen] = useState(false);

  const support = useMemo(() => {
    if (!ready) return REGION_SUPPORT.unknown;
    if (region === "IN") return REGION_SUPPORT.IN;
    if (region === "US") return REGION_SUPPORT.US;
    return REGION_SUPPORT.unknown;
  }, [ready, region]);

  return (
    <header className="nav" aria-label="Site navigation">
      <div className="navInner">
        {/* LEFT: brand */}
        <div className="navLeft">
          <Link href="/" className="navBrand" aria-label="D-Macht home" onClick={() => setOpen(false)}>
            <BrandLogo variant="nav" mode="wide" className="navLogo" />
          </Link>

          <div className="navEndorsement" aria-label="Endorsement">
            {ENDORSEMENT}
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="navLinks" aria-label="Primary">
          <Link href="/#services" className="navLink">
            Services
          </Link>
          <Link href="/#industries" className="navLink">
            Applications
          </Link>
          <Link href="/maintenance" className="navLink">
            Maintenance
          </Link>
          <Link href="/#workflow" className="navLink">
            Workflow
          </Link>
        </nav>

        {/* RIGHT: region + contact + CTA */}
        <div className="navRight">
          <RegionToggle region={region} setRegion={setRegion} ready={ready} />

          <div className="navContact" aria-label="Region contact">
            <a className="navContactEmail" href={`mailto:${support.email}`}>
              {support.email}
            </a>
            {support.phoneE164 ? (
              <a className="navContactPhone" href={`tel:${support.phoneE164}`}>
                {support.phoneDisplay}
              </a>
            ) : (
              <span className="navContactPhone">{support.phoneDisplay}</span>
            )}
          </div>

          <Link href="/#contact" className="btn btn-primary navCta" onClick={() => setOpen(false)}>
            Request support
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="navMenuBtn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="navMenuIcon" aria-hidden />
          </button>
        </div>
      </div>

      {/* MOBILE PANEL */}
      {open && (
        <div className="navMobile" aria-label="Mobile navigation">
          <div className="navMobileInner">
            <div className="navMobileRegion">
              <RegionToggle region={region} setRegion={setRegion} ready={ready} />
              <div className="navMobileContact">
                <a className="navMobileEmail" href={`mailto:${support.email}`}>
                  {support.email}
                </a>
                {support.phoneE164 ? (
                  <a className="navMobilePhone" href={`tel:${support.phoneE164}`}>
                    {support.phoneDisplay}
                  </a>
                ) : (
                  <span className="navMobilePhone">{support.phoneDisplay}</span>
                )}
              </div>
            </div>

            <div className="navMobileLinks">
              <Link href="/#services" className="navMobileLink" onClick={() => setOpen(false)}>
                Services
              </Link>
              <Link href="/#industries" className="navMobileLink" onClick={() => setOpen(false)}>
                Applications
              </Link>
              <Link href="/maintenance" className="navMobileLink" onClick={() => setOpen(false)}>
                Maintenance
              </Link>
              <Link href="/#workflow" className="navMobileLink" onClick={() => setOpen(false)}>
                Workflow
              </Link>
              <Link href="/#contact" className="btn btn-primary w-full" onClick={() => setOpen(false)}>
                Request support
              </Link>
            </div>

            <div className="navMobileEndorsement">{ENDORSEMENT}</div>
          </div>
        </div>
      )}
    </header>
  );
}