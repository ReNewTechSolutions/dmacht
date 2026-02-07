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
    const onScroll = () => setScrolled(window.scrollY > 10);
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
            aria-label="D-Macht home"
          >
            {/* Wide logo (not tiny) */}
            <div className="relative">
              <BrandLogo variant="nav" mode="wide" priority />
            </div>

            <div className="hidden sm:block leading-tight">
              <div className="text-[11px] text-white/55">
                Industrial inkjet support • Remote-first
              </div>
              <div className="text-[11px] text-white/45">
                A ReNewTech Solutions service line (DBA)
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
              href="#workflow"
              className={[
                "hidden md:inline-flex items-center justify-center",
                "rounded-xl px-3 py-2 text-[13px]",
                "border border-white/10 bg-white/5 text-white/80",
                "hover:bg-white/8 hover:text-white",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
              ].join(" ")}
            >
              See how it works
            </a>

            <a
              href="#contact"
              className={[
                "inline-flex items-center justify-center",
                "rounded-xl px-4 py-2 text-[13px] font-semibold",
                "bg-gradient-to-r from-sky-400/90 via-teal-300/90 to-amber-300/90",
                "text-black",
                "shadow-[0_18px_55px_-35px_rgba(59,130,246,.7)]",
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
                "text-[13px] text-white/85 hover:bg-white/8",
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
            <div className="rounded-2xl border border-white/10 bg-black/40 p-3">
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

              <div className="mt-3 flex gap-2">
                <a
                  href="#workflow"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-[13px] text-white/80"
                >
                  Workflow
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl bg-white text-center px-3 py-2 text-[13px] font-semibold text-black"
                >
                  Request
                </a>
              </div>

              <div className="mt-3 text-[11px] text-white/55">
                Email: <span className="text-white/75">support@dmacht.com</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}