"use client";

import React, { useMemo, useState } from "react";

type IconName = "target" | "steps" | "plug" | "eye";

type Hotspot = {
  id: string;
  icon: IconName;
  tooltip: string;
  title: string;
  desc: string;
  x: number; // 0..100
  y: number; // 0..100
};

type Path = { id: string; d: string };

const VB_W = 1000;
const VB_H = 625;

// single-line string avoids hydration issues
const GLOW_MATRIX = "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.85 0";

function pctToX(p: number) {
  return (p / 100) * VB_W;
}
function pctToY(p: number) {
  return (p / 100) * VB_H;
}

function Icon({ name }: { name: IconName }) {
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
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
  }
}

function computePaths(spots: Hotspot[], hub: { x: number; y: number }): Path[] {
  return spots.map((s) => {
    const x = pctToX(s.x);
    const y = pctToY(s.y);

    const midX = (hub.x + x) / 2;
    const midY = (hub.y + y) / 2;

    // “PCB-ish” elbow bias for more circuit-board vibes
    const elbowX = midX + (x > hub.x ? 58 : -58);
    const elbowY = midY + (y > hub.y ? 36 : -36);

    const d = `M ${hub.x} ${hub.y} Q ${elbowX} ${elbowY} ${x} ${y}`;
    return { id: s.id, d };
  });
}

export default function MotherboardHotspots() {
  const spots: Hotspot[] = useMemo(
    () => [
      {
        id: "target",
        icon: "target",
        tooltip: "Targeting",
        title: "Targeting + Inputs",
        desc: "Define the audience and constraints up front: models, environment, downtime windows, error patterns, and goals.",
        x: 18,
        y: 34,
      },
      {
        id: "steps",
        icon: "steps",
        tooltip: "Process",
        title: "Service Process",
        desc: "Clear triage and step-by-step resolution: remote diagnostics → action plan → on-site scheduling (if needed).",
        x: 62,
        y: 28,
      },
      {
        id: "integrate",
        icon: "plug",
        tooltip: "Parts",
        title: "Parts + Consumables",
        desc: "Guidance on fluids/consumables and recommended spares lists—so you reduce repeat failures and speed recoveries.",
        x: 44,
        y: 60,
      },
      {
        id: "observe",
        icon: "eye",
        tooltip: "Reporting",
        title: "Reporting + Prevention",
        desc: "Service notes, root-cause clues, and preventive planning—so the same issue doesn’t keep coming back.",
        x: 78,
        y: 62,
      },
    ],
    []
  );

  const hub = useMemo(() => ({ x: 520, y: 330 }), []);

  const paths = useMemo(() => computePaths(spots, hub), [spots, hub]);

  const [activeId, setActiveId] = useState<string>(spots[0]?.id ?? "target");
  const [open, setOpen] = useState(false);

  // used to restart the impulse animation on selection
  const [pulseTick, setPulseTick] = useState(0);

  const current = spots.find((s) => s.id === activeId) ?? spots[0];
  const activePath = paths.find((p) => p.id === activeId) ?? null;

  function activate(id: string) {
    setActiveId(id);
    setPulseTick((n) => n + 1);
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  return (
    <section className="pcbSection" aria-label="How it works" id="workflow">
      <div className="pcbHeader">
        <div>
          <div className="pcbKicker">Workflow</div>
          <h2 className="pcbTitle">How support flows (tap a node)</h2>
          <p className="pcbSub">Mobile-first PCB map. Tap any node to view details in a clean modal.</p>
        </div>

        <button type="button" className="pcbHintBtn" onClick={() => setOpen(true)} aria-label="Open workflow details">
          View details
        </button>
      </div>

      <div className="pcbWrap" role="application" aria-label="PCB workflow map">
        <div className="pcbBoard">
          {/* subtle grid + board texture */}
          <div className="pcbBoardBg" aria-hidden />

          <svg className="pcbSvg" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="pcbTrace" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgba(255,255,255,0.12)" />
                <stop offset="1" stopColor="rgba(255,255,255,0.06)" />
              </linearGradient>

              {/* active trace tint */}
              <linearGradient id="pcbTraceActive" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgba(20,184,166,0.55)" />
                <stop offset="1" stopColor="rgba(59,130,246,0.42)" />
              </linearGradient>

              {/* impulse shimmer gradient */}
              <linearGradient id="pcbImpulse" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="0.5" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
              </linearGradient>

              <filter id="pcbGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feColorMatrix in="blur" type="matrix" values={GLOW_MATRIX} result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* hub */}
            <circle cx={hub.x} cy={hub.y} r="11" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)" />
            <circle cx={hub.x} cy={hub.y} r="4" fill="rgba(255,255,255,0.85)" opacity="0.9" />

            {/* base traces */}
            {paths.map((p) => {
              const isActive = p.id === activeId;
              return (
                <path
                  key={p.id}
                  d={p.d}
                  className={`pcbTraceBase ${isActive ? "is-active" : ""}`}
                  stroke={isActive ? "url(#pcbTraceActive)" : "url(#pcbTrace)"}
                  filter={isActive ? "url(#pcbGlow)" : undefined}
                />
              );
            })}

            {/* impulse ONLY on active path */}
            {activePath && (
              <path
                key={`impulse-${activeId}-${pulseTick}`}
                d={activePath.d}
                className="pcbTraceImpulse"
                stroke="url(#pcbImpulse)"
                filter="url(#pcbGlow)"
              />
            )}
          </svg>

          {/* nodes */}
          {spots.map((s) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                className={`pcbNode ${isActive ? "is-active" : ""}`}
                style={{ left: `${s.x}%`, top: `${s.y}%` } as React.CSSProperties}
                onClick={() => activate(s.id)}
                aria-label={s.title}
                aria-pressed={isActive}
              >
                <span className="pcbNodeHalo" aria-hidden />
                <span className="pcbNodeCore" aria-hidden />
                <span className="pcbNodeIcon" aria-hidden>
                  <Icon name={s.icon} />
                </span>
                <span className="sr-only">{s.tooltip}</span>

                {/* tooltip (desktop hover only) */}
                <span className="pcbTip" role="tooltip" aria-hidden>
                  <span className="pcbTipInner">{s.tooltip}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* small helper row for mobile users */}
      <div className="pcbMiniLegend" aria-label="Workflow steps">
        {spots.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={`legend-${s.id}`}
              type="button"
              className={`pcbLegendPill ${isActive ? "is-active" : ""}`}
              onClick={() => activate(s.id)}
            >
              <span className="pcbLegendDot" aria-hidden />
              <span className="pcbLegendText">{s.tooltip}</span>
            </button>
          );
        })}
      </div>

      {/* modal */}
      {open && (
        <div className="pcbModalOverlay" role="dialog" aria-modal="true" aria-label="Workflow details">
          <div className="pcbModalCard">
            <div className="pcbModalTop">
              <div>
                <div className="pcbModalKicker">Active step</div>
                <div className="pcbModalTitle">{current?.title}</div>
                <div className="pcbModalDesc">{current?.desc}</div>
              </div>

              <button type="button" className="pcbModalClose" onClick={close} aria-label="Close">
                ✕
              </button>
            </div>

            <div className="pcbModalGrid">
              <div className="pcbModalBox">
                <div className="pcbModalBoxK">What we need from you</div>
                <ul className="pcbModalList">
                  <li>Printer model(s) + quantities</li>
                  <li>Error codes + photos/video (if possible)</li>
                  <li>Ink/solvent type + recent maintenance history</li>
                  <li>Downtime window + urgency</li>
                </ul>
                <div className="pcbModalHint">Tip: the fastest fix happens when we can reproduce the symptom.</div>
              </div>

              <div className="pcbModalBox">
                <div className="pcbModalBoxK">What you get</div>
                <ul className="pcbModalList">
                  <li>Remote-first triage + clear next steps</li>
                  <li>Documented actions and recommendations</li>
                  <li>Preventive planning to avoid repeats</li>
                  <li>Parts/consumables guidance (optional)</li>
                </ul>
                <div className="pcbModalHint">You’ll know what to do next—no guessing.</div>
              </div>
            </div>

            <div className="pcbModalActions">
              <button type="button" className="pcbModalBtn" onClick={close}>
                Done
              </button>
            </div>
          </div>

          {/* click outside closes */}
          <button className="pcbModalBackdropBtn" aria-label="Close backdrop" onClick={close} />
        </div>
      )}
    </section>
  );
}