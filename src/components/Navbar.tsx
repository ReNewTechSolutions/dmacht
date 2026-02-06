"use client";

import BrandLogo from "@/components/BrandLogo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <BrandLogo className="w-40 md:w-48" />

        <nav className="flex items-center gap-4">
          <a
            href="#services"
            className="hidden text-sm text-white/70 hover:text-white md:block"
          >
            Services
          </a>
          <a
            href="#contact"
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
          >
            Request Service
          </a>
        </nav>
      </div>
    </header>
  );
}