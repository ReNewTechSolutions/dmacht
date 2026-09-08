"use client";

import Link from "next/link";
import { CalendarDays, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNav } from "../data/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="siteHeader">
      <div className="navbar">
        <Link className="wordmark" href="/" aria-label="D-Macht home" onClick={closeMenu}>
          <span className="wordmarkIcon" aria-hidden="true">D</span>
          <span className="wordmarkText">
            <strong>-Macht</strong>
            <small>Industrial Printer Solutions</small>
          </span>
        </Link>

        <nav className="navLinks" aria-label="Primary navigation">
          {primaryNav.map((item) => {
            const baseHref = item.href.split("#")[0];
            const active = item.href === "/" ? pathname === "/" : baseHref !== "/" && pathname.startsWith(baseHref);

            return (
              <Link key={item.href} className={active ? "isActive" : undefined} href={item.href} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="navActions">
          <Link className="navCta" href="/repair-service#request" onClick={closeMenu}>
            <CalendarDays size={18} aria-hidden="true" />
            Request Service
          </Link>

          <button
            type="button"
            className="navMenuButton"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
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

        <Link className="mobileNavCta" href="/repair-service#request" onClick={closeMenu}>
          <CalendarDays size={18} aria-hidden="true" />
          Request Service
        </Link>
      </nav>
    </header>
  );
}
