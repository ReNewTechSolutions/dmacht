"use client";

import { useState } from "react";

type Skill = {
  title: string;
  subtitle: string;
  desc: string;
  badge: string;
  examples: string[];
};

export default function ServiceCards({ skills }: { skills: Skill[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((s, idx) => {
        const isOpen = open === s.title;
        return (
          <button
            key={s.title}
            type="button"
            onClick={() => setOpen(isOpen ? null : s.title)}
            className={[
              "glass trace group relative overflow-hidden rounded-3xl p-5 text-left",
              "transition-transform duration-200 hover:-translate-y-0.5",
              "focus:outline-none focus:ring-2 focus:ring-emerald-400/25",
            ].join(" ")}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -inset-10 bg-[radial-gradient(closest-side,rgba(20,184,166,0.18),transparent)]" />
            </div>

            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-xs text-white/60">{s.subtitle}</p>
                </div>

                <div className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] text-white/70">
                  {s.badge}
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-white/75">{s.desc}</p>

              <div className="mt-4 flex items-center justify-between text-xs text-white/55">
                <span>Tap for examples</span>
                <span className="rounded-full border border-white/10 bg-black/30 px-2 py-1">
                  {isOpen ? "Close" : "Open"} {idx + 1}/{skills.length}
                </span>
              </div>

              {/* Expand panel */}
              <div
                className={[
                  "mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/30",
                  "transition-[max-height,opacity] duration-300",
                  isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
                ].join(" ")}
              >
                <div className="p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                    Fault-code examples
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-white/70">
                    {s.examples.map((e) => (
                      <li key={e} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300/70" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 text-[11px] text-white/55">
                    Include the exact message/fault code + what changed before the issue.
                  </div>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}