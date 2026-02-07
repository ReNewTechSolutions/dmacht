"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Region = "us" | "in" | "global";

type RegionCtx = {
  region: Region;
  setRegion: (r: Region) => void;
  label: (r?: Region) => string;
};

const RegionContext = createContext<RegionCtx | null>(null);
const STORAGE_KEY = "dmacht_region";

function normalizeRegion(v: unknown): Region | null {
  if (v === "us" || v === "in" || v === "global") return v;
  return null;
}

function detectFromHostname(hostname: string): Region {
  if (hostname.endsWith(".in")) return "in";
  return "us"; // canonical default
}

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegion] = useState<Region>("us");

  // Set region after mount (prevents SSR/CSR mismatch + avoids window access on server)
  useEffect(() => {
    try {
      const saved = normalizeRegion(localStorage.getItem(STORAGE_KEY));
      const detected = detectFromHostname(window.location.hostname);
      setRegion(saved ?? detected);
    } catch {
      // If localStorage blocked, at least detect from hostname
      try {
        setRegion(detectFromHostname(window.location.hostname));
      } catch {
        setRegion("us");
      }
    }
  }, []);

  // Persist + tag the document for optional styling hooks
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, region);
    } catch {
      // ignore
    }
    try {
      document.documentElement.dataset.region = region;
    } catch {
      // ignore
    }
  }, [region]);

  const ctx = useMemo<RegionCtx>(
    () => ({
      region,
      setRegion,
      label: (r = region) => (r === "us" ? "US" : r === "in" ? "IN" : "Global"),
    }),
    [region]
  );

  return <RegionContext.Provider value={ctx}>{children}</RegionContext.Provider>;
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within <RegionProvider />");
  return ctx;
}