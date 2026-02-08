"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ENDORSEMENT = "D-Macht — a ReNewTech Solutions service line.";

const nav = [
  { label: "Services", href: "#services" },
  { label: "Applications", href: "#brands" },
  { label: "Maintenance", href: "/maintenance" },
  { label: "Workflow", href: "#workflow" },
  { label: "Contact", href: "#contact" },
];

function useCloseOnEscape(close: () => void) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  useCloseOnEscape(() => setOpen(false));

  return (
    <header className="navWrap">
      <div className="navInner">
        <Link href="/" className="navBrand" aria-label="D-Macht home" onClick={() => setOpen(false)}>
          {/* Small logo (not massive) */}
          <Image src="/brand/dmacht-wordmark.svg" alt="D-Macht" width={150} height={40} priority />
        </Link>

        <nav className="navLinks" aria-label="Primary">
          {nav.map((n) =>
            n.href.startsWith("#") ? (
              <a key={n.href} className="navLink" href={n.href}>
                {n.label}
              </a>
            ) : (
              <Link key={n.href} className="navLink" href={n.href}>
                {n.label}
              </Link>
            )
          )}
        </nav>

        <div className="navRight">
          <a className="btn btn-primary navCta" href="#contact">
            Request support
          </a>

          <button
            type="button"
            className="navBurger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Subline (optional, small) */}
      <div className="navSub">{ENDORSEMENT}</div>

      {/* Mobile drawer */}
      {open && (
        <div className="navDrawer" role="dialog" aria-label="Menu">
          <div className="navDrawerPanel">
            <div className="navDrawerTop">
              <span className="navDrawerTitle">Menu</span>
              <button type="button" className="navDrawerClose" onClick={() => setOpen(false)} aria-label="Close menu">
                ×
              </button>
            </div>

            <div className="navDrawerLinks">
              {nav.map((n) =>
                n.href.startsWith("#") ? (
                  <a key={n.href} className="navDrawerLink" href={n.href} onClick={() => setOpen(false)}>
                    {n.label}
                  </a>
                ) : (
                  <Link key={n.href} className="navDrawerLink" href={n.href} onClick={() => setOpen(false)}>
                    {n.label}
                  </Link>
                )
              )}
            </div>

            <a className="btn btn-primary w-full" href="#contact" onClick={() => setOpen(false)}>
              Request support
            </a>

            <div className="navDrawerFoot">{ENDORSEMENT}</div>
          </div>

          <button className="navDrawerBackdrop" aria-label="Close menu" onClick={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
}