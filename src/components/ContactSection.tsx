"use client";

import React from "react";
import { useRegion } from "@/components/region";
import SupportRequestForm from "@/components/SupportRequestForm";

export default function ContactSection() {
  const { isUnknown, support } = useRegion();

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-16" aria-label="Contact" id="contact">
      <div className="rounded-3xl border border-white/10 bg-black/35 p-6 md:p-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Contact</div>
            <h2 className="mt-2 text-xl font-semibold text-white/90 md:text-2xl">Request support</h2>

            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Current focus: <span className="text-white/85">motherboard + power supply repair</span> for{" "}
              <span className="text-white/85">Markem-Imaje, Domino, VideoJet</span>. Maintenance packages and other
              services are still available.
            </p>
          </div>

          <div className="text-xs text-white/55">
            {isUnknown ? (
              <span>Tip: pick a region for correct routing</span>
            ) : (
              <span>
                Routed label: <span className="text-white/75">{support.label}</span>
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {/* FORM */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <SupportRequestForm />
          </div>

          {/* CONTACT CARD */}
          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Contact</div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-3">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Email</div>
                <a className="mt-1 block text-sm text-white/80" href={`mailto:${support.email}`}>
                  {support.email}
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/35 p-3">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Call/Text</div>
                {support.phoneE164 ? (
                  <a className="mt-1 block text-sm text-white/80" href={`tel:${support.phoneE164}`}>
                    {support.phoneDisplay}
                  </a>
                ) : (
                  <div className="mt-1 block text-sm text-white/60">{support.phoneDisplay}</div>
                )}
              </div>
            </div>

            <div className="mt-4 text-sm text-white/70 leading-relaxed">
              For fastest turnaround, include: model, symptoms, photos/video, error codes, and recent maintenance history.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}