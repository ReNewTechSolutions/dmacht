"use client";

import useRevealOnScroll from "@/components/useRevealOnScroll";
import MotherboardHotspots from "@/components/MotherboardHotspots";
import ServiceCards from "@/components/ServiceCards";
import { useEffect, useMemo, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import BrandStrip from "@/components/BrandStrip";
import StickyCTA from "@/components/StickyCTA";
import RequestForm from "@/components/RequestForm";

const SKILLS = [
  {
    title: "Industrial Inkjet Printer Expertise",
    subtitle: "Markem-Imaje & Domino",
    desc: "Hands-on service, calibration, repair, and refurbishment for production-line coding and marking systems.",
    badge: "Printers",
  },
  {
    title: "Preventative Maintenance & Diagnostics",
    subtitle: "Reduce downtime",
    desc: "Inspection, cleaning, pressure balancing, and component testing to prevent downtime and extend equipment lifespan.",
    badge: "PM",
  },
  {
    title: "Industrial Electronics & Hardware Repair",
    subtitle: "Board & component level",
    desc: "Advanced troubleshooting across power systems, sensors, printheads, controllers, and electromechanical assemblies.",
    badge: "Electronics",
  },
  {
    title: "Field Installation & System Integration",
    subtitle: "On-site setup",
    desc: "On-site installation of industrial equipment and low-voltage systems with clean wiring, alignment, and validation.",
    badge: "Field",
  },
  {
    title: "Security Camera & Low-Voltage Systems",
    subtitle: "Commercial CCTV",
    desc: "Design + installation of commercial CCTV systems including placement, DVR/NVR setup, networking, and maintenance.",
    badge: "Low-Voltage",
  },
];

const CONTACT = {
  email: "hello@renewtech.solutions",
  phone: "816.957.3063",
};

export default function HomePage() {
  const [entered, setEntered] = useState(false);
  const [boot, setBoot] = useState(0);

  const telHref = useMemo(
    () => `tel:+1${CONTACT.phone.replace(/\D/g, "")}`,
    []
  );
  const mailHref = useMemo(() => `mailto:${CONTACT.email}`, []);

  // light “boot” progress (purely aesthetic)
  useEffect(() => {
    if (entered) return;
    const t = setInterval(() => {
      setBoot((p) => (p >= 100 ? 100 : p + Math.max(2, Math.floor(Math.random() * 8))));
    }, 140);
    return () => clearInterval(t);
  }, [entered]);

  // allow Enter key to proceed
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter") setEntered(true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* FULLSCREEN “CLICK TO ENTER” HERO */}
      <div
        className={[
          "boot fixed inset-0 z-[60] grid place-items-center px-4",
          entered ? "boot--off" : "",
        ].join(" ")}
        aria-hidden={entered}
      >
        <div className="boot-card glass trace w-full max-w-3xl rounded-3xl p-6 md:p-10">
          <div className="flex items-center justify-between gap-4">
            <BrandLogo className="w-40 md:w-52" />
            <div className="hidden rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70 md:inline-flex">
              Kansas City • Field service • Electronics repair
            </div>
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
            Industrial support,
            <span className="block text-white/70">built like engineering.</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
            Production-line printer service (Domino, Markem-Imaje and more), preventative maintenance,
            board-level troubleshooting, field installs, and low-voltage systems.
          </p>

          {/* Boot bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-white/55">
              <span>System ready</span>
              <span>{Math.min(boot, 100)}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full border border-white/10 bg-black/40">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400/70 via-orange-400/70 to-purple-400/70"
                style={{ width: `${Math.min(boot, 100)}%` }}
              />
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setEntered(true)}
              className="btn btn-primary w-full sm:w-auto"
            >
              Enter Site
            </button>
            <a href="#contact" onClick={() => setEntered(true)} className="btn btn-secondary w-full sm:w-auto">
              Request Service
            </a>
            <div className="sm:ml-auto text-xs text-white/55">
              Press <span className="font-semibold text-white/80">Enter</span> to continue
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-white/70 sm:grid-cols-4">
            {[
              ["Fast response", "KC metro"],
              ["PM plans", "prevent downtime"],
              ["Board repair", "component-level"],
              ["Field installs", "clean wiring"],
            ].map(([a, b]) => (
              <div key={a} className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <div className="font-semibold text-white/90">{a}</div>
                <div className="mt-1 text-white/60">{b}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-[11px] text-white/50">
            Email: <a className="underline" href={mailHref}>{CONTACT.email}</a> • Call/Text:{" "}
            <a className="underline" href={telHref}>{CONTACT.phone}</a>
          </div>
        </div>
      </div>

      {/* MAIN SITE */}
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <section className="glass trace relative overflow-hidden rounded-3xl p-6 md:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80 shadow-[0_0_18px_rgba(16,185,129,0.35)]" />
                Kansas City • Industrial service & support
              </div>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
                DMacht
                <span className="block text-white/70">By solving it.</span>
              </h2>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-[17px]">
                Built for production environments — service, diagnostics, and installs with clean, repeatable fixes.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#contact" className="btn btn-primary text-center">
                  Request Service
                </a>
                <a href="#services" className="btn btn-secondary text-center">
                  View Capabilities
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="glass-soft rounded-3xl p-5 md:p-6">
                <BrandLogo className="w-full" />
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-white/70">
                  {[
                    ["Uptime", "Prevent failures"],
                    ["Precision", "Isolate faults"],
                    ["Production", "Line-ready"],
                    ["Support", "Long-term"],
                  ].map(([a, b]) => (
                    <div key={a} className="rounded-2xl border border-white/10 bg-black/30 p-3">
                      <div className="font-semibold text-white/90">{a}</div>
                      <div className="mt-1 text-white/60">{b}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 md:mt-10">
          <BrandStrip />
        </div>

        <section id="services" className="mt-10 md:mt-14">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Core capabilities
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-white/70">
                Uptime-driven engineering support — production-ready service and clean installs.
              </p>
            </div>

            <div className="flex gap-2">
              <a href={mailHref} className="btn btn-secondary py-3 text-sm">
                Email
              </a>
              <a href="#contact" className="btn btn-primary py-3 text-sm">
                Request
              </a>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((s) => (
              <div
                key={s.title}
                className="glass trace group relative overflow-hidden rounded-3xl p-5 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -inset-10 bg-[radial-gradient(closest-side,rgba(20,184,166,0.18),transparent)]" />
                </div>

                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{s.title}</h4>
                      <p className="mt-1 text-xs text-white/60">{s.subtitle}</p>
                    </div>

                    <div className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] text-white/70">
                      {s.badge}
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-white/75">{s.desc}</p>

                  <div className="mt-4 flex items-center justify-between text-xs text-white/55">
                    <span>KC Metro</span>
                    <a href="#contact" className="underline underline-offset-4 hover:text-white/80">
                      Request service →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-10 md:mt-14">
          <div className="glass trace rounded-3xl p-6 md:p-10">
            <div className="grid gap-8 md:grid-cols-12 md:items-start">
              <div className="md:col-span-7">
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Request service
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                  Email or call/text with model, symptoms, and location. If production is down,
                  choose <span className="font-semibold text-white/90">Urgent</span>.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href={mailHref} className="btn btn-primary text-center">
                    Email: {CONTACT.email}
                  </a>
                  <a href={telHref} className="btn btn-secondary text-center">
                    Call/Text: {CONTACT.phone}
                  </a>
                </div>

                <p className="mt-4 text-xs text-white/50">
                  Service line operated via RenewTech Solutions • Kansas City
                </p>
              </div>

              <div className="md:col-span-5">
                <RequestForm defaultEmail={CONTACT.email} defaultPhone={CONTACT.phone} />
              </div>
            </div>
          </div>
        </section>

        <div className="h-24 md:h-12" />
      </main>

      <StickyCTA email={CONTACT.email} phone={CONTACT.phone} />
    </>
  );
}