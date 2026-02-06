"use client";

import { useMemo, useState } from "react";

type Hotspot = {
  id: string;
  label: string;
  title: string;
  desc: string;
  x: string; // percent
  y: string; // percent
};

export default function MotherboardHotspots() {
  const [active, setActive] = useState<string>("pm");

  const spots: Hotspot[] = useMemo(
    () => [
      {
        id: "pm",
        label: "PM",
        title: "Preventative Maintenance",
        desc: "Pressure balancing, cleaning cycles, inspections, and component checks to prevent downtime.",
        x: "18%",
        y: "34%",
      },
      {
        id: "inkjet",
        label: "IJ",
        title: "Inkjet Printer Service",
        desc: "Domino + Markem-Imaje expertise — calibration, print quality, repairs, refurb, and line readiness.",
        x: "62%",
        y: "28%",
      },
      {
        id: "board",
        label: "PCB",
        title: "Board-Level Diagnostics",
        desc: "Power systems, sensors, controllers, and electromechanical assemblies — isolate faults cleanly.",
        x: "44%",
        y: "60%",
      },
      {
        id: "field",
        label: "FIELD",
        title: "Field Install + Integration",
        desc: "On-site installs with clean wiring, alignment, validation, and production handoff support.",
        x: "78%",
        y: "62%",
      },
    ],
    []
  );

  const current = spots.find((s) => s.id === active) ?? spots[0];

  return (
    <section aria-label="Interactive motherboard map" className="mt-10 md:mt-14">
      <div className="glass trace rounded-3xl p-6 md:p-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Motherboard map
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Hover or tap nodes to see service details — built like a diagnostic workflow.
            </p>
          </div>
          <div className="text-xs text-white/55">
            Tip: tap nodes on mobile
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-12">
          {/* board */}
          <div className="md:col-span-7">
            <div className="board relative overflow-hidden rounded-3xl border border-white/10 bg-black/30">
              {/* traces */}
              <div className="pointer-events-none absolute inset-0 opacity-90">
                <div className="traceA" />
                <div className="traceB" />
                <div className="traceC" />
              </div>

              {/* hotspots */}
              {spots.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={[
                    "node",
                    active === s.id ? "node--active" : "",
                  ].join(" ")}
                  style={{ left: s.x, top: s.y }}
                  onMouseEnter={() => setActive(s.id)}
                  onFocus={() => setActive(s.id)}
                  onClick={() => setActive(s.id)}
                  aria-label={s.title}
                >
                  <span className="nodeLabel">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* detail panel */}
          <div className="md:col-span-5">
            <div className="glass-soft rounded-3xl p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Active node
              </div>
              <div className="mt-2 text-xl font-semibold text-white">
                {current.title}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                {current.desc}
              </p>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/75">
                <div className="text-xs text-white/55">What to include</div>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-white/65">
                  <li>Brand + model</li>
                  <li>Symptoms + fault code (if any)</li>
                  <li>When it started + what changed</li>
                  <li>Facility location</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* local CSS via global-safe classnames (no styled-jsx) */}
        <style>{`
          .board { aspect-ratio: 16 / 10; min-height: 260px; }
          .node {
            position: absolute;
            transform: translate(-50%, -50%);
            border-radius: 9999px;
            border: 1px solid rgba(255,255,255,0.14);
            background: rgba(0,0,0,0.45);
            padding: 10px 12px;
            font-size: 11px;
            color: rgba(255,255,255,0.78);
            box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03), 0 10px 30px rgba(0,0,0,0.35);
            transition: transform 160ms ease, background 160ms ease, border 160ms ease;
          }
          .node:hover, .node:focus {
            transform: translate(-50%, -50%) scale(1.03);
            background: rgba(255,255,255,0.08);
          }
          .node--active {
            border-color: rgba(20,184,166,0.45);
            box-shadow: 0 0 0 3px rgba(20,184,166,0.12), 0 18px 60px rgba(20,184,166,0.10);
          }
          .nodeLabel { letter-spacing: .12em; font-weight: 700; }

          .traceA, .traceB, .traceC {
            position: absolute;
            inset: -20%;
            background: radial-gradient(closest-side, rgba(20,184,166,0.22), transparent 60%);
            filter: blur(10px);
            opacity: .45;
            animation: floatTrace 10s ease-in-out infinite;
          }
          .traceB { background: radial-gradient(closest-side, rgba(249,115,22,0.18), transparent 62%); animation-duration: 12s; }
          .traceC { background: radial-gradient(closest-side, rgba(168,85,247,0.16), transparent 64%); animation-duration: 14s; }

          @keyframes floatTrace {
            0% { transform: translate3d(0,0,0); }
            50% { transform: translate3d(18px,-10px,0); }
            100% { transform: translate3d(0,0,0); }
          }

          @media (prefers-reduced-motion: reduce) {
            .traceA, .traceB, .traceC { animation: none; }
          }
        `}</style>
      </div>
    </section>
  );
}