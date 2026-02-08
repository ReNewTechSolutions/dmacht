"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Region = "IN" | "US" | "unknown";

type RegionCtx = {
  region: Region;
  setRegion: (r: Region) => void;
  ready: boolean;
};

const STORAGE_KEY = "dmacht_region";

const Ctx = createContext<RegionCtx | null>(null);

function normalizeRegion(v: string | null | undefined): Region {
  if (v === "IN" || v === "US") return v;
  return "unknown";
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

  useEffect(() => {
    try {
      const stored = normalizeRegion(window.localStorage.getItem(STORAGE_KEY));
      if (stored !== "unknown") setRegionState(stored);
    } catch {
      // ignore (private mode / blocked storage)
    } finally {
      setReady(true);
    }
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRegion = (r: Region) => {
    setRegionState(r);

    try {
      if (r === "IN" || r === "US") window.localStorage.setItem(STORAGE_KEY, r);
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const value = useMemo(() => ({ region, setRegion, ready }), [region, ready]);

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