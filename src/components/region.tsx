"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Region = "IN" | "US";

const REGION_KEY = "dmacht_region";
const REGION_EVENT = "dmacht:region";

type RegionCtx = {
  region: Region;
  setRegion: (r: Region) => void;
  toggleRegion: () => void;
};

const Ctx = createContext<RegionCtx | null>(null);

function getRegionFromUrl(): Region | null {
  if (typeof window === "undefined") return null;
  try {
    const url = new URL(window.location.href);
    const qp = url.searchParams.get("region");
    if (qp === "IN" || qp === "US") return qp;
  } catch {}
  return null;
}

function getRegionFromStorage(): Region | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = window.localStorage.getItem(REGION_KEY);
    if (saved === "IN" || saved === "US") return saved;
  } catch {}
  return null;
}

export function RegionProvider({
  children,
  defaultRegion = "IN",
}: {
  children: React.ReactNode;
  defaultRegion?: Region;
}) {
  const [region, _setRegion] = useState<Region>(() => {
    // Only read window-dependent values in the initializer (no effect setState needed)
    const qp = getRegionFromUrl();
    if (qp) return qp;
    const saved = getRegionFromStorage();
    if (saved) return saved;
    return defaultRegion;
  });

  const setRegion = useCallback((next: Region) => {
    _setRegion(next);
    try {
      window.localStorage.setItem(REGION_KEY, next);
      window.dispatchEvent(new CustomEvent(REGION_EVENT, { detail: next }));
    } catch {}
  }, []);

  const toggleRegion = useCallback(() => {
    setRegion(region === "IN" ? "US" : "IN");
  }, [region, setRegion]);

  // Sync if something else dispatches region event (optional but helpful)
  useEffect(() => {
    const onRegion = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === "IN" || detail === "US") _setRegion(detail);
    };
    window.addEventListener(REGION_EVENT, onRegion as EventListener);
    return () => window.removeEventListener(REGION_EVENT, onRegion as EventListener);
  }, []);

  const value = useMemo(() => ({ region, setRegion, toggleRegion }), [region, setRegion, toggleRegion]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useRegion() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useRegion must be used inside <RegionProvider />");
  return ctx;
}