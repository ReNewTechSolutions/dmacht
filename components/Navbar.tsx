"use client";

import { useState } from "react";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Tips", href: "#tips" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="topNavWrap">
      <div className="topNav">
        <a className="brandMark" href="#top" aria-label="D-Macht home" onClick={closeMenu}>
          <span className="brandLogoWide">
            <img src="/brand/dmacht-logo.png" alt="D-Macht logo" />
            <span className="brandLogoFallback" aria-hidden>
              D-MACHT
            </span>
          </span>

          <span className="brandTextBlock">
            <strong>D-Macht</strong>
            <small>Industrial support desk</small>
          </span>
        </a>

        <nav className="navLinks" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="navActions">
          <a className="navCta" href="#request" onClick={closeMenu}>
            Request service
          </a>

          <button
            type="button"
            className="navMenuButton"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobileNavPanel ${open ? "is-open" : ""}`} aria-hidden={!open}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}

        <a className="mobileNavCta" href="#request" onClick={closeMenu}>
          Request service
        </a>
      </div>
    </header>
  );
}
