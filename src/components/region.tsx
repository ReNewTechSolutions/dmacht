"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Region = "IN" | "US" | "unknown";

type RegionCtx = {
  region: Region;
  setRegion: (r: Region) => void;
  ready: boolean;
  isIN: boolean;
  isUS: boolean;
  isUnknown: boolean;
};

const STORAGE_KEY = "dmacht_region";

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
  // Important: start with defaultRegion so SSR/CSR match, then hydrate from localStorage
  const [region, setRegionState] = useState<Region>(defaultRegion);
  const [ready, setReady] = useState(false);

  // hydrate once
  useEffect(() => {
    try {
      const stored = normalizeRegion(window.localStorage.getItem(STORAGE_KEY));
      setRegionState(stored !== "unknown" ? stored : defaultRegion);
    } finally {
      setReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep multiple tabs in sync
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

    // write-through to localStorage
    if (r === "IN" || r === "US") window.localStorage.setItem(STORAGE_KEY, r);
    else window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(() => {
    const isIN = ready && region === "IN";
    const isUS = ready && region === "US";
    const isUnknown = ready && region === "unknown";

    return { region, setRegion, ready, isIN, isUS, isUnknown };
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

export const OPTIONS: { id: Region; title: string; sub: string }[] = [
  { id: "IN", title: "India", sub: "Field service + remote diagnostics" },
  { id: "US", title: "United States", sub: "US field service (booking soon) + remote diagnostics" },
];