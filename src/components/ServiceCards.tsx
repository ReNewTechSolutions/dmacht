"use client";

import { useState } from "react";

export type ServiceSkill = {
  title: string;
  subtitle: string;
  desc: string;
  badge: string;
  examples?: string[];
};

type Props = {
  items?: ServiceSkill[]; // 🔑 optional
  defaultOpenTitle?: string | null;
};

export default function ServiceCards({
  items = [], // 🔑 fallback
  defaultOpenTitle = null,
}: Props) {
  const [openTitle, setOpenTitle] = useState<string | null>(defaultOpenTitle);

  if (!items.length) {
    return (
      <div className="mt-6 text-sm text-white/60">
        No services available.
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, idx) => {
        const isOpen = openTitle === item.title;

        return (
          <button
            key={item.title}
            type="button"
            onClick={() =>
              setOpenTitle(isOpen ? null : item.title)
            }
            className="glass trace group relative overflow-hidden rounded-3xl p-5 text-left transition-transform hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-white/60">
                  {item.subtitle}
                </p>
              </div>

              <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] text-white/70">
                {item.badge}
              </span>
            </div>

            <p className="mt-3 text-sm text-white/75">
              {item.desc}
            </p>

            {item.examples?.length ? (
              <div
                className={`mt-4 overflow-hidden transition-all ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-1 text-xs text-white/65">
                  {item.examples.map((ex) => (
                    <li key={ex}>• {ex}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}