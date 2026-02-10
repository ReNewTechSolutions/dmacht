"use client";

import React, { useMemo } from "react";
import Link from "next/link";

import Hero from "@/components/Hero";
import RegionBar from "@/components/RegionBar";
import BrandStrip from "@/components/BrandStrip";
import PCBWorkflow from "@/components/PCBWorkflow";
import ApplicationsGrid from "@/components/ApplicationsGrid";

import { ENDORSEMENT } from "@/lib/support";
import { useRegion } from "@/components/region";

type Meta = { title: string; sub: string };

export default function HomeClient() {
  const { region, ready, support } = useRegion();

  const metaCards: Meta[] = useMemo(
    () => [
      { title: "Response", sub: "fast triage + next steps" },
      { title: "Format", sub: "remote-first diagnostics" },
      { title: "Brands", sub: "Markem-Imaje + Domino focus" },
      { title: "Region", sub: ready && region !== "unknown" ? support.label : "pick to personalize" },
    ],
    [ready, region, support.label]
  );

  return (
    <main className="homeRoot" aria-label="D-Macht home">
      <RegionBar />
      <Hero />

      <section className="mx-auto max-w-6xl px-4 pt-10" aria-label="Highlights">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metaCards.map((m) => (
            <div key={m.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">{m.title}</div>
              <div className="mt-2 text-sm font-semibold text-white/90">{m.sub}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-[11px] text-white/45">{ENDORSEMENT}</div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-10" aria-label="Services" id="services">
        <div className="rounded-3xl border border-white/10 bg-black/35 p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Services</div>
          <h2 className="mt-2 text-xl font-semibold text-white/90 md:text-2xl">Support that fits your uptime goals</h2>
          <p className="mt-2 text-sm text-white/70">
            Remote diagnostics, troubleshooting, preventive planning, and (region-dependent) on-site field service.
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link className="btn btn-primary" href="#contact">
              Request support
            </Link>
            <Link className="btn btn-ghost" href="#workflow">
              See workflow
            </Link>
            <Link className="btn btn-ghost" href="/maintenance">
              Maintenance packages
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-10" aria-label="Brands" id="brands">
        <BrandStrip />
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-10" aria-label="Workflow" id="workflow">
        <PCBWorkflow />
      </section>

      <section aria-label="Applications" id="applications">
        <ApplicationsGrid />
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-10 pb-16" aria-label="Contact" id="contact">
        <div className="rounded-3xl border border-white/10 bg-black/35 p-6 md:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Contact</div>
          <h2 className="mt-2 text-xl font-semibold text-white/90 md:text-2xl">Request support</h2>
          <p className="mt-2 text-sm text-white/70">
            Email us the model(s), issue symptoms, error codes, and any photos/video.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Email</div>
              <a className="mt-2 block text-sm text-white/85" href={`mailto:${support.email}`}>
                {support.email}
              </a>
              <div className="mt-2 text-xs text-white/55">{support.note}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Call / Text</div>
              {support.phoneE164 ? (
                <a className="mt-2 block text-sm text-white/85" href={`tel:${support.phoneE164}`}>
                  {support.phoneDisplay}
                </a>
              ) : (
                <div className="mt-2 text-sm text-white/60">{support.phoneDisplay}</div>
              )}
              <div className="mt-2 text-xs text-white/55">
                Region: <span className="text-white/75">{support.label}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-[11px] text-white/45">{ENDORSEMENT}</div>
        </div>
      </section>
    </main>
  );
}