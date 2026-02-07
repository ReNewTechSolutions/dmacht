"use client";

import BrandLogo from "@/components/BrandLogo";
import { useRegion, type Region } from "@/components/region";

export default function Navbar() {
  const { region, setRegion } = useRegion();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="inline-flex items-center gap-3">
          <BrandLogo variant="nav" mode="wide" priority />
        </a>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-5 md:flex">
            <a className="text-sm text-white/70 hover:text-white/90" href="#how-it-works">
              Workflow
            </a>
            <a className="text-sm text-white/70 hover:text-white/90" href="#capabilities">
              Capabilities
            </a>
            <a className="text-sm text-white/70 hover:text-white/90" href="#industries">
              Applications
            </a>
            <a className="text-sm text-white/70 hover:text-white/90" href="#contact">
              Contact
            </a>
          </nav>

          <select
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 outline-none"
            value={region}
            onChange={(e) => setRegion(e.target.value as Region)}
            aria-label="Select region"
          >
            <option value="IN">India (live now)</option>
            <option value="US">US / Kansas City (booking soon)</option>
          </select>

          <a className="btn btn-primary hidden sm:inline-flex" href="#contact">
            Request support
          </a>
        </div>
      </div>
    </header>
  );
}