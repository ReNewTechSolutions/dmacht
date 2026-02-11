"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ENDORSEMENT } from "@/lib/support";

const nav = [
  { label: "Services", href: "#services" },
  { label: "Brands", href: "#brands" },
  { label: "Applications", href: "#applications" },
  { label: "Maintenance", href: "/maintenance" },
  { label: "Workflow", href: "#workflow" },
  { label: "Contact", href: "#contact" },
] as const;

function useCloseOnEscape(close: () => void) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);
}

function NavItem({
  href,
  label,
  onClick,
  className = "navLink",
}: {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return href.startsWith("#") ? (
    <a className={className} href={href} onClick={onClick}>
      {label}
    </a>
  ) : (
    <Link className={className} href={href} onClick={onClick}>
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useCloseOnEscape(() => {
    setOpen(false);
    setMoreOpen(false);
  });

  // Keep the desktop bar compact by moving lower-priority items into "More"
  const primary = useMemo(() => nav.slice(0, 4), []); // Services, Brands, Applications, Maintenance
  const secondary = useMemo(() => nav.slice(4), []); // Workflow, Contact

  return (
    <header className="navWrap" data-open={open ? "true" : "false"}>
      <div className="navInner">
        {/* Brand */}
        <Link href="/" className="navBrand" aria-label="D-Macht home" onClick={() => setOpen(false)}>
          <Image src="/brand/dmacht-wordmark.svg" alt="D-Macht" width={140} height={34} priority className="navWordmark" />
        </Link>

        {/* Desktop */}
        <nav className="navLinks" aria-label="Primary navigation">
          {primary.map((n) => (
            <NavItem key={n.href} href={n.href} label={n.label} onClick={() => setMoreOpen(false)} />
          ))}

          {/* More dropdown (desktop only) */}
          <div className="navMore">
            <button
              type="button"
              className="navMoreBtn"
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((v) => !v)}
            >
              More <span className="navCaret" aria-hidden>▾</span>
            </button>

            {moreOpen && (
              <div className="navMoreMenu" role="menu" aria-label="More">
                {secondary.map((n) => (
                  <NavItem
                    key={n.href}
                    href={n.href}
                    label={n.label}
                    className="navMoreItem"
                    onClick={() => setMoreOpen(false)}
                  />
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right */}
        <div className="navRight">
          <a className="btn btn-primary navCta" href="#contact" onClick={() => setOpen(false)}>
            Request support
          </a>

          {/* Mobile burger */}
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

      <div className="navSub">
        <span>{ENDORSEMENT}</span>
      </div>

      {/* Mobile drawer (half screen) */}
      <div className={`navDrawer ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="navDrawerPanel">
          <div className="navDrawerTop">
            <div className="navDrawerBrand">
              <Image src="/brand/dmacht-wordmark.svg" alt="D-Macht" width={140} height={34} />
              <span className="navDrawerSub">{ENDORSEMENT}</span>
            </div>

            <button type="button" className="navDrawerClose" onClick={() => setOpen(false)} aria-label="Close menu">
              ×
            </button>
          </div>

          <div className="navDrawerLinks">
            {nav.map((n) => (
              <NavItem
                key={n.href}
                href={n.href}
                label={n.label}
                className="navDrawerLink"
                onClick={() => setOpen(false)}
              />
            ))}
          </div>

          <a className="btn btn-primary w-full" href="#contact" onClick={() => setOpen(false)}>
            Request support
          </a>
        </div>

        <button className="navDrawerBackdrop" aria-label="Close menu" onClick={() => setOpen(false)} />
      </div>
    </header>
  );
}