"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav } from "../data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="siteHeader">
      <div className="navbar">
        <Link className="wordmark" href="/" aria-label="D-Macht home" onClick={closeMenu}>
          <span className="wordmarkIcon" aria-hidden="true">D</span>
          <span>
            <strong>D-MACHT</strong>
            <small>Industrial printer specialists</small>
          </span>
        </Link>

        <nav className="navLinks" aria-label="Primary navigation">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="navActions">
          <Link className="navCta" href="/contact#request" onClick={closeMenu}>
            Request service
          </Link>

          <button
            type="button"
            className="navMenuButton"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobileNavPanel ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
      >
        {primaryNav.map((item) => (
          <Link key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}

        <Link className="mobileNavCta" href="/contact#request" onClick={closeMenu}>
          Request service
        </Link>
      </nav>
    </header>
  );
}
