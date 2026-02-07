"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import BrandLogo from "@/components/BrandLogo";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Availability", href: "#availability" },
  { label: "Workflow", href: "#workflow" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const items = useMemo(() => NAV, []);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50",
        "border-b border-white/10",
        "backdrop-blur-xl",
        scrolled
          ? "bg-black/75 shadow-[0_18px_60px_-45px_rgba(0,0,0,.9)]"
          : "bg-black/45",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-[76px] items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl py-2 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            aria-label="DMacht home"
          >
            <BrandLogo variant="nav" priority />
            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold tracking-tight">
                  D-Macht
                </span>
                <span className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
                  Remote-first today
                </span>
              </div>
              <div className="text-[11px] text-white/55">
                A ReNewTech Solutions partner • KC field service soon
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={[
                  "rounded-xl px-3 py-2 text-[13px]",
                  "text-white/75 hover:text-white",
                  "hover:bg-white/5",
                  "transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                ].join(" ")}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className={[
                "hidden md:inline-flex items-center justify-center",
                "rounded-xl px-3 py-2 text-[13px]",
                "border border-white/10 bg-white/5 text-white/80",
                "hover:bg-white/10 hover:text-white",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
              ].join(" ")}
            >
              hello@renewtech.solutions
            </a>

            <a
              href="#contact"
              className={[
                "inline-flex items-center justify-center",
                "rounded-xl px-4 py-2 text-[13px] font-semibold",
                "bg-gradient-to-r from-sky-400/95 via-teal-300/95 to-amber-300/95",
                "text-black",
                "shadow-[0_18px_55px_-35px_rgba(59,130,246,.65)]",
                "hover:brightness-110",
                "transition-[filter]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
              ].join(" ")}
            >
              Request support
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={[
                "lg:hidden inline-flex items-center justify-center",
                "rounded-xl border border-white/10 bg-white/5 px-3 py-2",
                "text-[13px] text-white/85 hover:bg-white/10",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
              ].join(" ")}
              aria-expanded={open}
              aria-label="Toggle navigation"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="lg:hidden pb-4">
            <div className="rounded-2xl border border-white/10 bg-black/50 p-3">
              <div className="grid gap-1">
                {items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2 text-[13px] text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="mt-3 grid gap-2">
                <a
                  href="mailto:hello@renewtech.solutions"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-[13px] text-white/85"
                >
                  Email: hello@renewtech.solutions
                </a>
                <a
                  href="tel:+18169573063"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-[13px] text-white/85"
                >
                  Call/Text: (816) 957-3063
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-white px-3 py-2 text-center text-[13px] font-semibold text-black"
                >
                  Request support
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}