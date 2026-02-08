"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Region = "IN" | "US" | "unknown";

type RegionCtx = {
  region: Region;
  setRegion: (r: Region) => void;
  ready: boolean;
};

const Ctx = createContext<RegionCtx | null>(null);

function normalizeRegion(v: string | null): Region {
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
      const stored = normalizeRegion(window.localStorage.getItem("dmacht_region"));
      if (stored !== "unknown") setRegionState(stored);
    } finally {
      setReady(true);
    }
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRegion = (r: Region) => {
    setRegionState(r);
    if (r === "IN" || r === "US") window.localStorage.setItem("dmacht_region", r);
    else window.localStorage.removeItem("dmacht_region");
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