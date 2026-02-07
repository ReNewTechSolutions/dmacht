"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type AppItem = {
  key: string;
  label: string;
  src: string; // from /public
  badge?: "CIJ" | "TIJ" | "DOD" | "Hybrid";
};

const ITEMS: AppItem[] = [
  { key: "beverages", label: "Beverages", src: "/brand/applications/dmacht-beverages.svg", badge: "CIJ" },
  { key: "pharma", label: "Pharmaceuticals", src: "/brand/applications/dmacht-pharmaceuticals.svg", badge: "CIJ" },
  { key: "wires", label: "Wires & Cables", src: "/brand/applications/dmacht-wiresandcables.svg", badge: "CIJ" },
  { key: "pipes", label: "Pipes & Tubes", src: "/brand/applications/dmacht-pipesandtubes.svg", badge: "CIJ" },
  { key: "food", label: "Food Packaging", src: "/brand/applications/dmacht-foodpackaging.svg", badge: "CIJ" },
  { key: "cosmetics", label: "Cosmetics", src: "/brand/applications/dmacht-cosmetics.svg", badge: "TIJ" },
  { key: "dairy", label: "Dairy", src: "/brand/applications/dmacht-dairy.svg", badge: "CIJ" },
  { key: "barcode", label: "Barcode & Labels", src: "/brand/applications/dmacht-barcodeandlabels.svg", badge: "TIJ" },
  { key: "electronics", label: "Electronics", src: "/brand/applications/dmacht-electronics.svg", badge: "Hybrid" },
  { key: "industrial", label: "Industrial Parts", src: "/brand/applications/dmacht-industrialparts.svg", badge: "DOD" },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ApplicationsGrid() {
  const [active, setActive] = useState<string | null>(null);

  const subtitle = useMemo(
    () =>
      "Hover to explore. Built to feel alive: tilt, lift, glow, scanlines, and status badges.",
    []
  );

  return (
    <section id="applications" className="mt-12 md:mt-16 reveal">
      <div className="glass trace rounded-3xl p-6 md:p-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Applications
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/70">{subtitle}</p>
          </div>

          <div className="text-xs text-white/55">
            {active ? <>Focused: <span className="text-white/80">{active}</span></> : "Hover a tile"}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <TiltCard
              key={item.key}
              item={item}
              onFocus={(label) => setActive(label)}
              onBlur={() => setActive(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({
  item,
  onFocus,
  onBlur,
}: {
  item: AppItem;
  onFocus: (label: string) => void;
  onBlur: () => void;
}) {
  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);
  const [hover, setHover] = useState(false);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0..1
    const py = (e.clientY - rect.top) / rect.height;  // 0..1
    const tiltX = clamp((0.5 - py) * 10, -8, 8);
    const tiltY = clamp((px - 0.5) * 12, -10, 10);
    setRx(tiltX);
    setRy(tiltY);
  }

  function onEnter() {
    setHover(true);
    onFocus(item.label);
  }

  function onLeave() {
    setHover(false);
    setRx(0);
    setRy(0);
    onBlur();
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative rounded-3xl border border-white/10 bg-black/40 p-4 transition"
      style={{
        transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${hover ? -6 : 0}px)`,
        transition: hover ? "transform 80ms linear" : "transform 240ms ease",
      }}
    >
      {/* Glow halo */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 30%, rgba(59,130,246,.28), rgba(20,184,166,.18), transparent 70%)",
        }}
      />

      {/* Scanlines overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 scanlines" />
      </div>

      <div className="relative">
        {/* Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="text-sm font-semibold text-white/85">{item.label}</div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white/70" />
            </span>
            {item.badge ?? "CIJ"}
          </div>
        </div>

        {/* Art panel */}
        <div className="mt-3 relative h-44 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          <Image
            src={item.src}
            alt={item.label}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="object-cover opacity-95 transition duration-300 group-hover:opacity-100"
          />

          {/* Bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,.78), rgba(0,0,0,0))",
            }}
          />
        </div>

        <div className="mt-3 text-xs text-white/60">
          Coding & marking support • CIJ / TIJ / DOD ready
        </div>
      </div>

      <style jsx>{`
        .scanlines {
          background: repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.06),
            rgba(255, 255, 255, 0.06) 1px,
            rgba(0, 0, 0, 0) 3px,
            rgba(0, 0, 0, 0) 6px
          );
          animation: scan 2.8s linear infinite;
          opacity: 0.25;
        }
        @keyframes scan {
          0% { transform: translateY(-10%); }
          100% { transform: translateY(10%); }
        }
      `}</style>
    </div>
  );
}