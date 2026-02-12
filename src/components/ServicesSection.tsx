"use client";

import React from "react";
import Link from "next/link";

export default function ServicesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-10" id="services" aria-label="Services">
      <div className="sectionHead">
        <div className="sectionKicker">Services</div>
        <h2 className="sectionTitle">Repair-first support for inkjet uptime</h2>
        <p className="sectionSub">
          Initial scope focuses on <span className="text-white/90">motherboard + power supply repair</span> for{" "}
          <span className="text-white/90">Markem-Imaje, Domino, VideoJet</span>. Preventive maintenance and line support
          remain available.
        </p>
      </div>

      <div className="serviceTiles">
        <div className="serviceTile">
          <div className="serviceTileTitle">Motherboard repair</div>
          <div className="serviceTileSub">Board-level diagnosis + repair</div>
          <div className="serviceTileFoot">Best for no-boot, intermittent faults, recurring failures.</div>
        </div>

        <div className="serviceTile">
          <div className="serviceTileTitle">Power supply repair</div>
          <div className="serviceTileSub">Power rails + stability issues</div>
          <div className="serviceTileFoot">For resets, rail drift, power-related errors.</div>
        </div>

        <div className="serviceTile">
          <div className="serviceTileTitle">Troubleshooting</div>
          <div className="serviceTileSub">Remote-first diagnostics</div>
          <div className="serviceTileFoot">Fast triage and a clear next-step plan.</div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a className="btn btn-primary" href="#contact">
          Request repair support
        </a>
        <a className="btn btn-ghost" href="#workflow">
          See workflow
        </a>
        <Link className="btn btn-ghost" href="/maintenance">
          Maintenance packages
        </Link>
      </div>
    </section>
  );
}