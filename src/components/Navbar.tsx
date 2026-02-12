"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { NAV_ITEMS } from "@/lib/nav";
import { ENDORSEMENT } from "@/lib/support";

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

  // lock body scroll when drawer open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="navWrap" data-open={open ? "true" : "false"}>
      <div className="navInner">
        {/* Brand */}
        <Link href="/" className="navBrand" aria-label="D-Macht home" onClick={() => setOpen(false)}>
          <span className="navLogoFrame" aria-hidden>
            <Image
              src="/brand/dmacht-mark.svg"
              alt=""
              width={28}
              height={28}
              priority
              className="navMark"
            />
          </span>

          <Image
            src="/brand/dmacht-wordmark.svg"
            alt="D-Macht"
            width={140}
            height={34}
            priority
            className="navWordmark"
          />
        </Link>

        {/* Desktop links */}
        <nav className="navLinks" aria-label="Primary navigation">
          {NAV_ITEMS.map((n) =>
            n.href.startsWith("#") ? (
              <a key={n.href} className="navLink" href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ) : (
              <Link key={n.href} className="navLink" href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            )
          )}
        </nav>

        {/* Right */}
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

      {/* Subline */}
      <div className="navSub">
        <span>{ENDORSEMENT}</span>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="navDrawer" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="navDrawerPanel">
            <div className="navDrawerTop">
              <div className="navDrawerBrand">
                <Image src="/brand/dmacht-wordmark.svg" alt="D-Macht" width={140} height={34} />
                <span className="navDrawerSub">{ENDORSEMENT}</span>
              </div>

              <button
                type="button"
                className="navDrawerClose"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <div className="navDrawerLinks">
              {NAV_ITEMS.map((n) =>
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

            <div className="navDrawerFooter">
              <div className="navDrawerNote">Motherboard + Power Supply repair focus.</div>
            </div>
          </div>

          <button className="navDrawerBackdrop" aria-label="Close menu" onClick={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
}