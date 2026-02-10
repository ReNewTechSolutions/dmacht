"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Region = "IN" | "US" | "unknown";

export type Support = {
  label: string;
  email: string;
  phoneDisplay: string;
  phoneE164: string;
  headline: string;
  sub: string;
  note: string;
};

export const STORAGE_KEY = "dmacht_region";

export const REGION_SUPPORT: Record<Region, Support> = {
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

type RegionCtx = {
  region: Region;
  setRegion: (r: Region) => void;
  ready: boolean;
  support: Support;
  isIN: boolean;
  isUS: boolean;
  isUnknown: boolean;
};

const Ctx = createContext<RegionCtx | null>(null);

function normalizeRegion(v: string | null | undefined): Region {
  return v === "IN" || v === "US" ? v : "unknown";
}

export function RegionProvider({
  children,
  defaultRegion = "unknown",
}: {
  children: React.ReactNode;
  defaultRegion?: Region;
}) {
  const [region, setRegionState] = useState<Region>(defaultRegion);
  const [ready, setReady] = useState(false);

  // hydrate once (SSR-safe)
  useEffect(() => {
    try {
      const stored = normalizeRegion(window.localStorage.getItem(STORAGE_KEY));
      setRegionState(stored !== "unknown" ? stored : defaultRegion);
    } catch {
      // ignore storage errors
    } finally {
      setReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sync across tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== STORAGE_KEY) return;
      setRegionState(normalizeRegion(e.newValue));
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setRegion = useCallback((r: Region) => {
    setRegionState(r);
    try {
      if (r === "IN" || r === "US") window.localStorage.setItem(STORAGE_KEY, r);
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(() => {
    const isIN = ready && region === "IN";
    const isUS = ready && region === "US";
    const isUnknown = ready && region === "unknown";
    const support = ready ? (REGION_SUPPORT[region] ?? REGION_SUPPORT.unknown) : REGION_SUPPORT.unknown;

    return { region, setRegion, ready, support, isIN, isUS, isUnknown };
  }, [region, ready, setRegion]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useRegion() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useRegion must be used within RegionProvider");
  return v;
}

export function regionLabel(region: Region, ready: boolean) {
  if (!ready) return "Loading…";
  if (region === "IN") return "India (live now)";
  if (region === "US") return "US / Kansas City (booking soon)";
  return "Select region";
}

export const OPTIONS: { id: Exclude<Region, "unknown">; title: string; sub: string }[] = [
    { id: "IN", title: "India", sub: "Field service + remote diagnostics" },
    { id: "US", title: "United States", sub: "US field service (booking soon) + remote diagnostics" },
  ];