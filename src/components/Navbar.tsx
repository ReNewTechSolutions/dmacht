"use client";

import Image from "next/image";

const CONTACT = {
  email: "support@dmacht.com",
  phone: "816.957.3063",
};

function digitsOnlyPhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export default function Navbar() {
  const telHref = `tel:+1${digitsOnlyPhone(CONTACT.phone)}`;
  const mailHref = `mailto:${CONTACT.email}`;

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="glass trace flex items-center justify-between rounded-2xl px-4 py-3">
          {/* Left: logo + wordmark */}
          <a href="#main" className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-black/30">
              <Image
                src="/brand/dmacht-logo.png"
                alt="D-Macht"
                fill
                className="object-contain p-1.5"
                priority
              />
            </div>

            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">D-Macht</div>
              <div className="text-[11px] text-white/60">
                Industrial inkjet support
              </div>
            </div>
          </a>

          {/* Center: links */}
          <nav className="hidden items-center gap-5 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#workflow">
              How it works
            </a>
            <a className="hover:text-white" href="#availability">
              Availability
            </a>
            <a className="hover:text-white" href="#capabilities">
              Capabilities
            </a>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <a
              href={mailHref}
              className="hidden rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 sm:inline-block"
            >
              Email
            </a>
            <a href="#contact" className="btn btn-primary py-2 text-sm">
              Request support
            </a>
            <a
              href={telHref}
              className="hidden rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 lg:inline-block"
            >
              Call/Text
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}