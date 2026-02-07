"use client";

import { useEffect, useMemo, useState } from "react";

import BrandStrip from "@/components/BrandStrip";
import StickyCTA from "@/components/StickyCTA";
import RequestForm from "@/components/RequestForm";

import useRevealOnScroll from "@/components/useRevealOnScroll";
import MotherboardHotspots from "@/components/MotherboardHotspots";
import ServiceCards, { type ServiceSkill } from "@/components/ServiceCards";

const CONTACT = {
  email: "hello@renewtech.solutions",
  phone: "816.957.3063",
};

function digitsOnlyPhone(phone: string) {
  return phone.replace(/\D/g, "");
}

const CAPABILITIES: ServiceSkill[] = [
  {
    title: "Remote Diagnostics",
    subtitle: "Find the fault fast",
    desc: "Video + logs + symptoms → isolate likely causes and give a clean next-step plan your team can execute.",
    badge: "Diagnostics",
    examples: ["Fault isolation", "Print quality triage", "Error code interpretation"],
  },
  {
    title: "Preventative Maintenance Planning",
    subtitle: "Reduce downtime",
    desc: "PM schedules, cleaning cycles, and checklists tailored to your environment and printer workload.",
    badge: "PM",
    examples: ["Cleaning cycles", "Consumables plan", "Quarterly PM checklist"],
  },
  {
    title: "Parts Guidance",
    subtitle: "Order the right thing",
    desc: "Tell us the model + symptoms and we’ll advise what to order (and what to avoid) before you spend money twice.",
    badge: "Parts",
    examples: ["Parts shortlist", "Compatibility checks", "Risk callouts"],
  },
  {
    title: "Field Service (Kansas City)",
    subtitle: "Coming online soon",
    desc: "As Dee relocates, KC service transitions from remote-first to on-site PM, installs, and repairs.",
    badge: "KC",
    examples: ["Booking soon", "Installs & PM", "Repair visits"],
  },
];

export default function HomeClient() {
  useRevealOnScroll();

  const telHref = useMemo(() => `tel:+1${digitsOnlyPhone(CONTACT.phone)}`, []);
  const mailHref = useMemo(() => `mailto:${CONTACT.email}`, []);

  // optional: close-open state, etc. (keeping simple)
  const [boot, setBoot] = useState(0);

  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p = Math.min(100, p + 5);
      setBoot(p);
      if (p >= 100) clearInterval(t);
    }, 70);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <main id="main" className="mx-auto max-w-6xl px-4 pb-24 pt-6 md:pt-8">
        {/* HERO — Rule: One kicker line, one headline, one subhead, two CTAs, one proof row */}
        <section className="glass-hero trace relative overflow-hidden rounded-3xl p-6 md:p-10 reveal is-on">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Kicker */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">
            Industrial Inkjet Printer Support • Remote-first today
          </div>

          {/* Headline */}
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
            Keep your production line running.
          </h1>

          {/* Subhead */}
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-[17px]">
            Remote diagnostics, planning, and preventative maintenance—built around Markem-Imaje &amp; Domino.
            Kansas City field service is coming online soon.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#contact" className="btn btn-primary text-center">
              Request support
            </a>
            <a href="#workflow" className="btn btn-secondary text-center">
              See how it works
            </a>
          </div>

          {/* Proof row (4) */}
          <div className="mt-7 grid grid-cols-2 gap-3 text-xs text-white/70 sm:grid-cols-4">
            {[
              ["Remote diagnostics", "fault isolation + next steps"],
              ["PM planning", "reduce downtime"],
              ["Parts guidance", "what to order + why"],
              ["KC expansion", "booking soon"],
            ].map(([a, b]) => (
              <div key={a} className="rounded-2xl border border-white/10 bg-black/40 p-3">
                <div className="font-semibold text-white/90">{a}</div>
                <div className="mt-1 text-white/60">{b}</div>
              </div>
            ))}
          </div>

          {/* Optional tiny “system check” (kept subtle) */}
          <div className="mt-7 max-w-sm">
            <div className="flex items-center justify-between text-xs text-white/55">
              <span>System check</span>
              <span>{boot}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full border border-white/10 bg-black/55">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400/80 via-teal-300/80 to-amber-300/80"
                style={{ width: `${boot}%` }}
                aria-hidden
              />
            </div>
            <div className="mt-2 text-[11px] text-white/45">
              DMacht is a service line operated in partnership with ReNewTech Solutions.
            </div>
          </div>
        </section>

        {/* BRANDS STRIP */}
        <div className="mt-8 md:mt-10 reveal">
          <BrandStrip />
        </div>

        {/* AVAILABILITY ROADMAP (exact section you provided) */}
        <section id="availability" className="mt-10 md:mt-14 reveal">
          <div className="glass trace rounded-3xl p-6 md:p-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Availability roadmap
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-white/70">
                  We’re live now for India (remote + regional). Kansas City field service comes online as Dee relocates.
                </p>
              </div>

              <a href="#contact" className="btn btn-primary">
                Request support
              </a>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {/* Phase 1 */}
              <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    Phase 1
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                    Live now • India
                  </span>
                </div>

                <div className="mt-3 text-lg font-semibold text-white/90">
                  Remote-first support (India)
                </div>

                <ul className="mt-3 space-y-2 text-sm text-white/75">
                  <li>• Remote diagnostics (fault isolation + action plan)</li>
                  <li>• Planning &amp; PM guidance (cleaning cycles, schedules, checklists)</li>
                  <li>• Regional India availability (site visits where possible)</li>
                  <li>• US expansion coming soon (quietly)</li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    Phase 2
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                    2–3 months out
                  </span>
                </div>

                <div className="mt-3 text-lg font-semibold text-white/90">
                  Pre-arrival ramp (Kansas City)
                </div>

                <ul className="mt-3 space-y-2 text-sm text-white/75">
                  <li>• Add “Kansas City — booking soon”</li>
                  <li>• Offer calendar slots for future dates</li>
                  <li>• Start SEO / local service pages</li>
                </ul>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-3 text-xs text-white/65">
                  Tip: we can capture leads now and schedule installs/PM dates ahead of arrival.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW MAP */}
        <section id="workflow" className="mt-10 md:mt-14 reveal" aria-label="Workflow map">
          <div className="glass trace rounded-3xl p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  How it works
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-white/70">
                  Tap through the diagnostic flow — what we ask for, how we isolate faults, and what you get back.
                </p>
              </div>

              <div className="flex gap-2">
                <a href={mailHref} className="btn btn-secondary py-3 text-sm">
                  Email
                </a>
                <a href="#contact" className="btn btn-primary py-3 text-sm">
                  Request support
                </a>
              </div>
            </div>

            <div className="mt-6">
              <MotherboardHotspots />
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="mt-10 md:mt-14 reveal">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Capabilities
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              Built for Markem-Imaje + Domino, and adaptable across major industrial coding &amp; marking platforms.
            </p>
          </div>

          <ServiceCards items={CAPABILITIES} />
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-10 md:mt-14 reveal">
          <div className="glass trace rounded-3xl p-6 md:p-10">
            <div className="grid gap-8 md:grid-cols-12 md:items-start">
              <div className="md:col-span-7">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Request support
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                  Share your location, equipment, and urgency. If the line is down, mark{" "}
                  <span className="font-semibold text-white/90">Urgent</span>{" "}
                  so we can prioritize next steps.
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
                  DMacht • Operated in partnership with ReNewTech Solutions
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