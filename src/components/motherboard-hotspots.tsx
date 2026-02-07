"use client";

import React, { useMemo, useState } from "react";

type Hotspot = {
  id: string;
  icon: "target" | "steps" | "plug" | "eye";
  tooltip: string;
  title: string;
  desc: string;
  x: number;
  y: number;
};

const VB_W = 1000;
const VB_H = 625;
const MB_GLOW_MATRIX = "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.85 0";

function pctToX(p: number) {
  return (p / 100) * VB_W;
}
function pctToY(p: number) {
  return (p / 100) * VB_H;
}

function Icon({ name }: { name: Hotspot["icon"] }) {
  switch (name) {
    case "target":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" opacity="0.9" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2" opacity="0.7" />
        </svg>
      );
    case "steps":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M7 7h10M7 12h10M7 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 7h.01M4 12h.01M4 17h.01" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "plug":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M9 7v4m6-4v4M8 11h8v2a4 4 0 0 1-4 4v3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "eye":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
  }
}

function useIsMobile(breakpoint = 900) {
  // Avoid effect-driven “sync setState warning” pattern: compute initial in initializer
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  });

  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

export default function MotherboardHotspots() {
  const spots: Hotspot[] = useMemo(
    () => [
      {
        id: "target",
        icon: "target",
        tooltip: "Targeting",
        title: "Targeting + Inputs",
        desc: "Define the audience and constraints up front: ICP fields, exclusions, source data, and routing rules.",
        x: 18,
        y: 34,
      },
      {
        id: "steps",
        icon: "steps",
        tooltip: "Step Logic",
        title: "Sequence Logic",
        desc: "Step-based outreach you can inspect: timing, branching, stop conditions, retries, and handoff triggers.",
        x: 62,
        y: 28,
      },
      {
        id: "integrate",
        icon: "plug",
        tooltip: "Integrations",
        title: "Integration + Handoff",
        desc: "Fits your workflow: log events to CRM, update lifecycle states, and route replies without breaking ownership.",
        x: 44,
        y: 60,
      },
      {
        id: "observe",
        icon: "eye",
        tooltip: "Observability",
        title: "Observability + Audit Trail",
        desc: "See what happened and why: step-level metrics, deliverability signals, and an event timeline for debugging.",
        x: 78,
        y: 62,
      },
    ],
    []
  );

  const isMobile = useIsMobile(900);

  const [active, setActive] = useState<string>(spots[0]?.id ?? "target");
  const [pulse, setPulse] = useState(0);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snapIdx, setSnapIdx] = useState<0 | 1 | 2>(1);

  const current = spots.find((s) => s.id === active) ?? spots[0];

  const hub = useMemo(() => ({ x: 520, y: 330 }), []);
  const paths = useMemo(() => {
    return spots.map((s) => {
      const x = pctToX(s.x);
      const y = pctToY(s.y);
      const midX = (hub.x + x) / 2;
      const midY = (hub.y + y) / 2;
      const elbowX = midX + (x > hub.x ? 44 : -44);
      const elbowY = midY + (y > hub.y ? 26 : -26);
      const d = `M ${hub.x} ${hub.y} Q ${elbowX} ${elbowY} ${x} ${y}`;
      return { id: s.id, d, x, y };
    });
  }, [spots, hub]);

  const activePath = paths.find((p) => p.id === active) ?? null;

  function activate(id: string, opts?: { openDrawer?: boolean }) {
    setActive(id);
    setPulse((n) => n + 1);

    if (isMobile && opts?.openDrawer) {
      setSnapIdx(1);
      setDrawerOpen(true);
    }
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <section aria-label="Interactive workflow map" className="mb-hotspots">
      <div className="mb-head">
        <div>
          <div className="mb-kicker">Workflow map</div>
          <div className="mb-sub">
            {isMobile ? "Tap nodes to open details. The board stays in view." : "Hover nodes to inspect. Minimal motion, clear signal."}
          </div>
        </div>
        <div className="mb-tip">{isMobile ? "Tip: tap nodes" : "Tip: hover nodes"}</div>
      </div>

      <div className="mb-grid">
        <div className="mb-boardWrap">
          <div className="mb-board" role="application" aria-label="Workflow board view">
            <div className="mb-boardLayer" aria-hidden />

            <svg className="mb-traces" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="mbTraceBase" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="rgba(255,255,255,0.12)" />
                  <stop offset="1" stopColor="rgba(255,255,255,0.06)" />
                </linearGradient>

                <linearGradient id="mbTraceActive" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="rgba(110,210,255,0.50)" />
                  <stop offset="1" stopColor="rgba(77,255,204,0.32)" />
                </linearGradient>

                <filter id="mbGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feColorMatrix in="blur" type="matrix" values={MB_GLOW_MATRIX} result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Hub */}
              <circle cx={hub.x} cy={hub.y} r="10" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.16)" />
              <circle cx={hub.x} cy={hub.y} r="4" fill="rgba(255,255,255,0.85)" opacity="0.9" />

              {/* Connectors */}
              {paths.map((p) => {
                const isActive = p.id === active;
                return (
                  <path
                    key={p.id}
                    d={p.d}
                    className={`mb-connector ${isActive ? "is-active" : ""}`}
                    stroke={isActive ? "url(#mbTraceActive)" : "url(#mbTraceBase)"}
                    filter={isActive ? "url(#mbGlow)" : undefined}
                  />
                );
              })}

              {/* Single clean signal dot (no spark dash spam) */}
              {activePath && (
                <g key={`sig-${active}-${pulse}`} className="mb-signal">
                  <circle r="7" fill="rgba(110,210,255,0.12)">
                    <animateMotion dur="0.95s" path={activePath.d} rotate="auto" />
                  </circle>
                  <circle r="2.8" fill="rgba(255,255,255,0.92)">
                    <animateMotion dur="0.95s" path={activePath.d} rotate="auto" />
                  </circle>
                </g>
              )}
            </svg>

            {/* Nodes */}
            {spots.map((s) => {
              const isActiveNode = s.id === active;

              return (
                <button
                  key={s.id}
                  type="button"
                  className={`mb-node ${isActiveNode ? "is-active" : ""}`}
                  style={{ left: `${s.x}%`, top: `${s.y}%` } as React.CSSProperties}
                  onMouseEnter={() => {
                    if (!isMobile) activate(s.id);
                  }}
                  onFocus={() => {
                    if (!isMobile) activate(s.id);
                  }}
                  onClick={() => activate(s.id, { openDrawer: true })}
                  aria-label={s.title}
                  aria-pressed={isActiveNode}
                >
                  <span className="mb-nodeHalo" aria-hidden />
                  <span className="mb-nodeCore" aria-hidden />
                  <span className="mb-nodeChip" aria-hidden />
                  <span className="mb-nodeIcon" aria-hidden>
                    <Icon name={s.icon} />
                  </span>

                  <span className="sr-only">{s.tooltip}</span>

                  {/* Tooltip stays desktop-only visually */}
                  <span className="mb-tooltip" role="tooltip" aria-hidden>
                    <span className="mb-tooltipInner">{s.tooltip}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop panel only */}
        {!isMobile && (
          <aside className="mb-panel" aria-label="Active node details">
            <div className="mb-panelTop">
              <div className="mb-panelKicker">Active step</div>
              <div className="mb-panelTitle">{current?.title}</div>
              <div className="mb-panelDesc">{current?.desc}</div>
            </div>

            <div className="mb-panelCard">
              <div className="mb-panelCardKicker">What we need from you</div>
              <ul className="mb-panelList">
                <li>ICP definition + exclusions</li>
                <li>Current stack (CRM, email, enrichment)</li>
                <li>Constraints (domains, compliance, limits)</li>
                <li>Success metric (replies, meetings, pipeline)</li>
              </ul>
              <div className="mb-panelHint">Fastest fit-check = your current workflow + the exact fields you track.</div>
            </div>
          </aside>
        )}
      </div>

      {/* Mobile snap-sheet drawer */}
      {isMobile && drawerOpen && current && (
        <div className="mb-drawerRoot">
          <button type="button" className="mb-drawerBackdrop" onClick={closeDrawer} aria-label="Close details" />

          <div className={`mb-drawerSheet snap-${snapIdx}`} role="dialog" aria-modal="true" aria-label="Workflow step details">
            <div className="mb-drawerHandle" />

            <div className="mb-drawerHeader">
              <div>
                <div className="mb-drawerKicker">Active step</div>
                <div className="mb-drawerTitle">{current.title}</div>
              </div>

              <div className="mb-drawerBtns">
                <button className="mb-snapBtn" onClick={() => setSnapIdx(0)}>
                  Small
                </button>
                <button className="mb-snapBtn" onClick={() => setSnapIdx(1)}>
                  Mid
                </button>
                <button className="mb-snapBtn" onClick={() => setSnapIdx(2)}>
                  Full
                </button>
                <button className="mb-closeBtn" onClick={closeDrawer}>
                  Close
                </button>
              </div>
            </div>

            <div className="mb-drawerBody">
              <div className="mb-drawerDesc">{current.desc}</div>

              <div className="mb-drawerCard">
                <div className="mb-drawerCardKicker">What we need from you</div>
                <ul className="mb-drawerList">
                  <li>• ICP definition + exclusions</li>
                  <li>• Current stack (CRM, email, enrichment)</li>
                  <li>• Constraints (domains, compliance, limits)</li>
                  <li>• Success metric (replies, meetings, pipeline)</li>
                </ul>
              </div>

              <a href="#contact" className="btn btn-primary w-full mt-4">
                Request support
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}