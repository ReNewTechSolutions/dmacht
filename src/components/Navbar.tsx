"use client";

import { useEffect, useMemo, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

type Region = "IN" | "US";

const REGION_KEY = "dmacht_region";
const REGION_EVENT = "dmacht:region";

const REGIONS: Record<
  Region,
  {
    label: string;
    email: string;
    phoneDisplay: string;
    phoneTel: string;
  }
> = {
  IN: {
    label: "India",
    email: "support@dmacht.com",
    phoneDisplay: "+91 99608 16363",
    phoneTel: "+919960816363",
  },
  US: {
    label: "Kansas City",
    email: "service@dmacht.com",
    phoneDisplay: "816.957.3063",
    phoneTel: "+18169573063",
  },
};

function getInitialRegion(): Region {
  if (typeof window === "undefined") return "IN";
  const url = new URL(window.location.href);
  const qp = url.searchParams.get("region");
  if (qp === "US" || qp === "IN") return qp;
  const saved = window.localStorage.getItem(REGION_KEY);
  if (saved === "US" || saved === "IN") return saved;
  return "IN";
}

export default function Navbar() {
  const [region, setRegion] = useState<Region>("IN");

  useEffect(() => {
    setRegion(getInitialRegion());

    const onStorage = (e: StorageEvent) => {
      if (e.key === REGION_KEY && (e.newValue === "IN" || e.newValue === "US")) {
        setRegion(e.newValue);
      }
    };

    const onRegionEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === "IN" || detail === "US") setRegion(detail);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(REGION_EVENT, onRegionEvent as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(REGION_EVENT, onRegionEvent as EventListener);
    };
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
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur">
          {/* Left */}
          <div className="flex items-center gap-3">
            <a href="#top" className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                <BrandLogo variant="nav" mode="mark" priority />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">D-Macht</div>
                <div className="text-xs text-white/60">Industrial inkjet support</div>
              </div>
            </a>

            {/* Region selector */}
            <div className="hidden md:flex items-center gap-2 pl-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                Region
              </div>
              <select
                className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/80 outline-none"
                value={region}
                onChange={(e) => updateRegion(e.target.value as Region)}
                aria-label="Select region"
              >
                <option value="IN">India (live now)</option>
                <option value="US">Kansas City (booking soon)</option>
              </select>
            </div>
          </div>

          {/* Center links */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a className="hover:text-white" href="#how-it-works">
              How it works
            </a>
            <a className="hover:text-white" href="#availability">
              Availability
            </a>
            <a className="hover:text-white" href="#capabilities">
              Capabilities
            </a>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a href={mailHref} className="btn">
              Email
            </a>
            <a href="#contact" className="btn btn-primary">
              Request support
            </a>
            <a href={telHref} className="btn hidden sm:inline-flex">
              Call/Text
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}