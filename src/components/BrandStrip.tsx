"use client";

import { useMemo } from "react";

const BRANDS = [
  "Markem-Imaje",
  "Domino",
  "Videojet",
  "Linx",
  "Hitachi",
  "Citronix",
  "Alphajet",
] as const;

const META = [
  { k: "Coverage", v: "CIJ + TIJ" },
  { k: "Support", v: "PM + Repair" },
  { k: "Outcome", v: "Uptime-first" },
] as const;

export default function BrandStrip() {
  const loop = useMemo(() => [...BRANDS, ...BRANDS], []);

  return (
    <section aria-label="Brands supported" className="mt-8 md:mt-10">
      <div className="glass trace relative overflow-hidden rounded-3xl px-4 py-4 md:px-6">
        {/* top hairline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* label */}
          <div className="shrink-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Brands supported
            </div>
            <div className="mt-1 text-sm text-white/75">
              Industrial coding &amp; marking printers
            </div>

            {/* mini “proof” chips */}
            <div className="mt-3 hidden flex-wrap gap-2 md:flex">
              {META.map((m) => (
                <span
                  key={m.k}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/70"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40" aria-hidden />
                  <span className="text-white/55">{m.k}:</span>
                  <span className="text-white/80">{m.v}</span>
                </span>
              ))}
            </div>
          </div>

          {/* marquee */}
          <div className="relative w-full overflow-hidden">
            {/* edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/65 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/65 to-transparent" />

            {/* signal rail */}
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 opacity-70 brandRail" />

            <div className="marquee" aria-label="Scrolling list of supported brands">
              <div className="track">
                {loop.map((b, i) => {
                  const isDup = i >= BRANDS.length;
                  return (
                    <span
                      key={`${b}-${i}`}
                      className="pill"
                      title={b}
                      aria-hidden={isDup ? true : undefined}
                    >
                      <span className="dot" aria-hidden />
                      {b}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* bottom glow */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/25 to-transparent" />
          </div>
        </div>

        {/* Component-scoped CSS that guarantees animation */}
        <style jsx>{`
          .marquee {
            overflow: hidden;
            width: 100%;
          }

          /* Two copies of the list => -50% travel for seamless loop */
          .track {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            white-space: nowrap;
            will-change: transform;
            animation: dmachtMarquee 22s linear infinite;
          }

          /* Pause on hover for readability */
          .marquee:hover .track {
            animation-play-state: paused;
          }

          .pill {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 10px 14px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.35);
            color: rgba(255, 255, 255, 0.78);
            font-size: 12px;
            line-height: 1;
            box-shadow: 0 18px 60px -55px rgba(0, 0, 0, 0.9);
            transition: background 180ms ease, border-color 180ms ease, color 180ms ease;
          }

          .pill:hover {
            border-color: rgba(255, 255, 255, 0.18);
            color: rgba(255, 255, 255, 0.92);
            background: rgba(255, 255, 255, 0.06);
          }

          .dot {
            width: 6px;
            height: 6px;
            border-radius: 999px;
            background: rgba(59, 130, 246, 0.85);
            box-shadow: 0 0 18px rgba(59, 130, 246, 0.35);
          }

          .brandRail {
            background: linear-gradient(
              90deg,
              transparent,
              rgba(59, 130, 246, 0.25),
              rgba(20, 184, 166, 0.22),
              transparent
            );
            filter: blur(0.2px);
          }

          @keyframes dmachtMarquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .track {
              animation: none !important;
              transform: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}