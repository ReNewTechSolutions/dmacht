"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Maintenance", href: "/maintenance" },
  { label: "Printer types", href: "/printer-types" },
  { label: "Parts + fluids", href: "/parts-fluids-consumables" },
  { label: "PCB repair", href: "/pcb-repair" },
  { label: "Industries", href: "/industries" },
  { label: "US launch", href: "/us-launch-kansas-city" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="topNavWrap">
      <div className="topNav">
        <Link className="brandMark" href="/" aria-label="D-Macht home" onClick={closeMenu}>
          <span className="brandLogoWide" aria-label="D-Macht logo">
            <Image
              src="/brand/dmacht-logo.png"
              alt="D-Macht logo"
              width={420}
              height={160}
              priority
            />
          </span>

          <span className="brandTextBlock">
            <strong>D-Macht</strong>
            <small>Industrial support desk</small>
          </span>
        </Link>

        <nav className="navLinks" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="navActions">
          <Link className="navCta" href="/#request" onClick={closeMenu}>
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
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}

        <Link className="mobileNavCta" href="/#request" onClick={closeMenu}>
          Request service
        </Link>
      </nav>
    </header>
  );
}