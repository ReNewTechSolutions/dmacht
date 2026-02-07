"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRegion, type Region } from "@/components/region";

const OPTIONS: { id: Region; title: string; sub: string }[] = [
  { id: "us", title: "United States", sub: "US field service (launching) + remote diagnostics" },
  { id: "in", title: "India", sub: "Regional field service + remote diagnostics" },
  { id: "global", title: "Remote / Global", sub: "Diagnostic assessment + guided resolution" },
];

export default function RegionSelector() {
  const { region, setRegion, label } = useRegion();
  const popId = useId();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (btnRef.current?.contains(t)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          "inline-flex items-center gap-2",
          "rounded-full border border-white/10 bg-white/5",
          "px-3 py-2 text-[12px] text-white/80",
          "hover:bg-white/8 hover:text-white transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
        ].join(" ")}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={popId}
        title="Service region"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[rgba(20,184,166,.9)] shadow-[0_0_14px_rgba(20,184,166,.35)]" />
        <span className="font-semibold">{label()}</span>
        <span className="text-white/55">▾</span>
      </button>

      {open && (
        <div
          id={popId}
          ref={panelRef}
          role="dialog"
          aria-label="Service region"
          className={[
            "absolute right-0 mt-2 w-[320px] overflow-hidden",
            "rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl",
            "shadow-[0_22px_70px_-45px_rgba(0,0,0,.9)]",
          ].join(" ")}
        >
          <div className="px-4 pt-4 pb-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Service region
            </div>
            <div className="mt-1 text-sm text-white/80">
              Availability and contact defaults adapt by region.
            </div>
          </div>

          <div className="px-2 pb-2">
            {OPTIONS.map((opt) => {
              const active = opt.id === region;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setRegion(opt.id);
                    setOpen(false);
                  }}
                  className={[
                    "w-full text-left",
                    "rounded-xl px-3 py-3",
                    "transition-colors",
                    active ? "bg-white/8" : "hover:bg-white/6",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={[
                        "mt-1 h-3 w-3 rounded-full border",
                        active ? "border-white/40 bg-white/70" : "border-white/20 bg-transparent",
                      ].join(" ")}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-white/90">{opt.title}</div>
                      <div className="mt-0.5 text-[12px] text-white/60">{opt.sub}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="border-t border-white/10 px-4 py-3 text-[11px] text-white/55">
            Tip: this doesn’t change capabilities — it adjusts context + routing.
          </div>
        </div>
      )}
    </div>
  );
}