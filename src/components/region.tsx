"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Region = "US" | "IN" | "unknown";

type RegionCtx = {
  region: Region;
  setRegion: (r: Region) => void;
  ready: boolean;
};

const Ctx = createContext<RegionCtx | null>(null);

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
      const stored = window.localStorage.getItem("dmacht_region") as Region | null;
      if (stored === "US" || stored === "IN") setRegionState(stored);
      else setRegionState(defaultRegion);
    } finally {
      setReady(true);
    }
  }, [defaultRegion]);

  const setRegion = (r: Region) => {
    setRegionState(r);
    if (r === "US" || r === "IN") window.localStorage.setItem("dmacht_region", r);
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