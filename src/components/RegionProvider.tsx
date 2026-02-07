"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Region = "india" | "us" | "unknown";

type RegionCtx = {
  region: Region;
  setRegion: (r: Region) => void;
  ready: boolean;
};

const Ctx = createContext<RegionCtx | null>(null);

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegionState] = useState<Region>("unknown");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("dmacht_region") as Region | null;
      if (stored === "india" || stored === "us") setRegionState(stored);
    } finally {
      setReady(true);
    }
  }, []);

  const setRegion = (r: Region) => {
    setRegionState(r);
    if (r === "india" || r === "us") window.localStorage.setItem("dmacht_region", r);
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