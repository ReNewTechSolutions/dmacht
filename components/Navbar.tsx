"use client";

import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { primaryNav } from "../data/site";
import styles from "./ProductNavigation.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const productsRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    setOpen(false);
    if (productsRef.current) productsRef.current.open = false;
  }

  return (
    <header className="siteHeader">
      <div className="navbar">
        <Link className="wordmark" href="/" aria-label="D-Macht home" onClick={closeMenu}>
          <Image className="navLogo" src="/brand/dmacht-logo-compact.svg" alt="D-Macht" width={1620} height={276} />
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
          <details className={styles.products} ref={productsRef} data-active={pathname.startsWith("/bazaarboxbeta")}
            onKeyDown={(event) => { if (event.key === "Escape" && productsRef.current) { productsRef.current.open = false; productsRef.current.querySelector("summary")?.focus(); } }}
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false; }}>
            <summary>Products <ChevronDown size={14} aria-hidden="true" /></summary>
            <div className={styles.menu}><Link href="/bazaarboxbeta" onClick={closeMenu} aria-current={pathname === "/bazaarboxbeta" ? "page" : undefined}>BazaarBox</Link></div>
          </details>
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
        <p className={styles.mobileProducts}>Products</p>
        <Link href="/bazaarboxbeta" onClick={closeMenu} aria-current={pathname === "/bazaarboxbeta" ? "page" : undefined}>BazaarBox</Link>

        <Link className="mobileNavCta" href="/repair-service#request" onClick={closeMenu}>
          <CalendarDays size={18} aria-hidden="true" />
          Request Service
        </Link>
      </nav>
    </header>
  );
}
