"use client";

import React from "react";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import PCBWorkflow from "@/components/PCBWorkflow";
import ApplicationsGrid from "@/components/ApplicationsGrid";
import ContactSection from "@/components/ContactSection";
import Link from "next/link";

export default function HomeClient() {
  return (
    <main className="homeRoot" aria-label="D-Macht home">
      <Hero />

      {/* 1) SERVICES */}
      <ServicesSection />

      {/* 2) WORKFLOW */}
      <section className="mx-auto max-w-6xl px-4 pt-10" id="workflow" aria-label="Workflow">
        <PCBWorkflow />
      </section>

      {/* 3) APPLICATIONS (service catalog) */}
      <ApplicationsGrid />

      {/* 4) MAINTENANCE (teaser block, keeps /maintenance page) */}
      <section className="mx-auto max-w-6xl px-4 pt-10" id="maintenance" aria-label="Maintenance">
        <div className="rounded-3xl border border-white/10 bg-black/35 p-6 md:p-8 mp-card">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Maintenance</div>
          <h2 className="mt-2 text-xl font-semibold text-white/90 md:text-2xl">
            Maintenance packages (AMC)
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Preventive plans built for predictable uptime: cadence, checklists, documentation, and faster escalation.
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link className="btn btn-primary" href="/maintenance">
              View packages
            </Link>
            <a className="btn btn-ghost" href="#contact">
              Ask about coverage
            </a>
          </div>
        </div>
      </section>

      {/* 5) CONTACT */}
      <ContactSection />

      {/* FOOTER CTA */}
      <footer className="footerShell" aria-label="Footer">
        <div className="mx-auto max-w-6xl px-4 pb-14">
          <div className="footerCta">
            <div>
              <div className="footerKicker">Ready to restore uptime?</div>
              <div className="footerTitle">Request repair-first support today.</div>
              <div className="footerSub">
                Motherboard + power supply focus. Markem-Imaje, Domino, VideoJet.
              </div>
            </div>

            <div className="footerActions">
              <a className="btn btn-primary" href="#contact">
                Request support
              </a>
              <Link className="btn btn-ghost" href="/maintenance">
                Maintenance packages
              </Link>
            </div>
          </div>

          <div className="footerBottom">
            <div className="text-xs text-white/50">© {new Date().getFullYear()} D-Macht</div>
            <div className="text-xs text-white/50">A ReNewTech Solutions service line</div>
          </div>
        </div>
      </footer>
    </main>
  );
}