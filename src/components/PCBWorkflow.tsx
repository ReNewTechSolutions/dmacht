"use client";

import React, { useMemo, useState } from "react";

type NodeId = "triage" | "remote" | "onsite" | "pm";

type PcbNode = {
  id: NodeId;
  title: string;
  tooltip: string;
  desc: string;
  x: number; // 0..100
  y: number; // 0..100
  tone: "teal" | "blue" | "ember";
};

type Path = { id: NodeId; d: string };

const VB_W = 1000;
const VB_H = 520;

function pctX(p: number) {
  return (p / 100) * VB_W;
}
function pctY(p: number) {
  return (p / 100) * VB_H;
}

function buildQuadPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const elbowX = midX + (to.x > from.x ? 70 : -70);
  const elbowY = midY + (to.y > from.y ? 40 : -40);
  return `M ${from.x} ${from.y} Q ${elbowX} ${elbowY} ${to.x} ${to.y}`;
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function PCBWorkflow() {
  const nodes: PcbNode[] = useMemo(
    () => [
      {
        id: "triage",
        title: "Triage",
        tooltip: "Fast intake",
        desc: "We capture model, symptoms, error codes, recent maintenance, and line constraints — then route to the fastest fix path.",
        x: 18,
        y: 35,
        tone: "teal",
      },
      {
        id: "remote",
        title: "Remote Diagnostics",
        tooltip: "Remote-first",
        desc: "We troubleshoot print quality, sensors, fluids, and configuration remotely first to reduce downtime and avoid unnecessary visits.",
        x: 54,
        y: 22,
        tone: "blue",
      },
      {
        id: "onsite",
        title: "On-Site Service",
        tooltip: "Field service",
        desc: "When needed, we schedule on-site support based on region availability, parts readiness, and a clear scope of work.",
        x: 78,
        y: 55,
        tone: "ember",
      },
      {
        id: "pm",
        title: "Preventive Maintenance",
        tooltip: "Stay ahead",
        desc: "Planned PM reduces repeat failures: checklists, reporting, consumables guidance, and recommended spares strategy.",
        x: 36,
        y: 68,
        tone: "teal",
      },
    ],
    []
  );

  const [active, setActive] = useState<NodeId>("remote");
  const [open, setOpen] = useState(false);

  const hub = useMemo(() => ({ x: 520, y: 290 }), []);

  const paths: Path[] = useMemo(() => {
    return nodes.map((n) => {
      const to = { x: pctX(n.x), y: pctY(n.y) };
      return { id: n.id, d: buildQuadPath(hub, to) };
    });
  }, [nodes, hub]);

  const activeNode = nodes.find((n) => n.id === active)!;
  const activePath = paths.find((p) => p.id === active)!;

  function openNode(id: NodeId) {
    setActive(id);
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  const impulseStyle = useMemo(() => {
    return { ["--pulseKey" as string]: `${active}` } as React.CSSProperties;
  }, [active]);

  return (
    <section id="workflow" className="pcbWrap" aria-label="Workflow (PCB)">
      <div className="pcbHead">
        <div>
          <div className="pcbKicker">Workflow</div>
          <div className="pcbTitle">Tap a node to see the process</div>
          {/* removed: "Clean on mobile..." */}
        </div>
        <div className="pcbHint">Tip: tap nodes</div>
      </div>

      <div className="pcbBoard">
        {/* PCB background image */}
        <div className="pcbBg" aria-hidden />

        {/* NEW: node strip background layer */}
        <div className="pcbNodeStrip" aria-hidden />

        <svg className="pcbSvg" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="pcbTrace" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
              <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>

            <linearGradient id="pcbImpulse" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(77,255,204,0.70)" />
              <stop offset="1" stopColor="rgba(110,210,255,0.55)" />
            </linearGradient>

            <filter id="pcbGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.6" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0"
                result="glow"
              />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {paths.map((p) => (
            <path key={`base-${p.id}`} d={p.d} className="pcbTraceBase" stroke="url(#pcbTrace)" />
          ))}

          <path
            key={`impulse-${active}`}
            d={activePath.d}
            className="pcbTraceImpulse"
            stroke="url(#pcbImpulse)"
            filter="url(#pcbGlow)"
            style={impulseStyle}
          />

          <circle cx={hub.x} cy={hub.y} r="12" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.18)" />
          <circle cx={hub.x} cy={hub.y} r="4" fill="rgba(255,255,255,0.85)" opacity="0.9" />
        </svg>

        {nodes.map((n) => {
          const isActive = n.id === active;
          return (
            <button
              key={n.id}
              type="button"
              className={`pcbNode ${isActive ? "is-active" : ""} tone-${n.tone}`}
              style={{ left: `${n.x}%`, top: `${n.y}%` } as React.CSSProperties}
              onClick={() => openNode(n.id)}
              aria-label={n.title}
              aria-pressed={isActive}
            >
              <span className="pcbNodeHalo" aria-hidden />
              <span className="pcbNodeCore" aria-hidden />
              <span className="pcbNodeLabel">
                {n.title}
                <span className="pcbNodeMini">{n.tooltip}</span>
              </span>
            </button>
          );
        })}
      </div>

      {open && (
        <div className="pcbModalOverlay" role="dialog" aria-modal="true" aria-label="Workflow details" onClick={closeModal}>
          <div className="pcbModal" onClick={(e) => e.stopPropagation()}>
            <div className="pcbModalTop">
              <div>
                <div className="pcbModalKicker">Selected step</div>
                <div className="pcbModalTitle">{activeNode.title}</div>
                <div className="pcbModalSub">{activeNode.tooltip}</div>
              </div>

              <button type="button" className="pcbModalClose" onClick={closeModal} aria-label="Close">
                <XIcon />
              </button>
            </div>

            <div className="pcbModalBody">{activeNode.desc}</div>

            <div className="pcbModalActions">
              <a className="btn btn-primary" href="#contact" onClick={closeModal}>
                Request support
              </a>
              <button className="btn btn-ghost" type="button" onClick={closeModal}>
                Back to map
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}