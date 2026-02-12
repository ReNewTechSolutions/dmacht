"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV } from "@/lib/nav";

function useCloseOnEscape(close: () => void) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);
}

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  useCloseOnEscape(() => setOpen(false));
  useLockBodyScroll(open);

  const items = useMemo(() => NAV, []);

  return (
    <header className="navWrap" data-open={open ? "true" : "false"}>
      <div className="navInner">
        <Link href="/" className="navBrand" aria-label="D-Macht home" onClick={() => setOpen(false)}>
          <span className="navLogoPulse" aria-hidden />
          <span className="navLogoFrame" aria-hidden />
          <Image
            src="/brand/dmacht-wordmark.svg"
            alt="D-Macht"
            width={140}
            height={34}
            priority
            className="navWordmark"
          />
        </Link>

        <nav className="navLinks" aria-label="Primary navigation">
          {items.map((n) => (
            <a key={n.href} className="navLink" href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="navRight">
          <a className="btn btn-primary navCta" href="#contact" onClick={() => setOpen(false)}>
            Request support
          </a>

          <button
            type="button"
            className="navBurger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer: half-screen */}
      <div className={`navDrawer ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu">
        <button className="navDrawerBackdrop" aria-label="Close menu" onClick={() => setOpen(false)} />

        <div className="navDrawerPanel">
          <div className="navDrawerTop">
            <Image src="/brand/dmacht-wordmark.svg" alt="D-Macht" width={140} height={34} />
            <button className="navDrawerClose" onClick={() => setOpen(false)} aria-label="Close menu">
              ×
            </button>
          </div>

          <div className="navDrawerLinks">
            {items.map((n) => (
              <a key={n.href} className="navDrawerLink" href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ))}
          </div>

          <a className="btn btn-primary w-full" href="#contact" onClick={() => setOpen(false)}>
            Request support
          </a>

          <a className="btn btn-ghost w-full" href="/maintenance" onClick={() => setOpen(false)}>
            Maintenance packages
          </a>
        </div>
      </div>
      </header>
  );
}