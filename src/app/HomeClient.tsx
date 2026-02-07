"use client";

import { useEffect, useMemo } from "react";

import BrandLogo from "@/components/BrandLogo";
import BrandStrip from "@/components/BrandStrip";
import StickyCTA from "@/components/StickyCTA";
import RequestForm from "@/components/RequestForm";

import useRevealOnScroll from "@/components/useRevealOnScroll";
import MotherboardHotspots from "@/components/MotherboardHotspots";
import ServiceCards, { type ServiceSkill } from "@/components/ServiceCards";

const CONTACT = {
  email: "support@dmacht.com",
  phone: "816.957.3063",
};

function digitsOnlyPhone(phone: string) {
  return phone.replace(/\D/g, "");
}

const CAPABILITIES: ServiceSkill[] = [
  {
    title: "Remote diagnostics",
    subtitle: "Fault isolation + next steps",
    desc: "We identify the likely failure point, interpret errors, and provide a step-by-step action plan to restore uptime.",
    badge: "Diagnostics",
    examples: [
      "Fault codes + symptom mapping",
      "Root-cause shortlist",
      "Action plan + verification",
    ],
  },
  {
    title: "Preventative maintenance planning",
    subtitle: "Reduce downtime",
    desc: "PM guidance built around how these systems actually fail: cleaning cycles, schedules, and checklists you can run.",
    badge: "PM",
    examples: [
      "Cleaning cycle routines",
      "PM schedule templates",
      "Operator checklists",
    ],
  },
  {
    title: "Parts guidance",
    subtitle: "What to order + why",
    desc: "We help you order the right parts the first time by matching symptoms to likely components and failure modes.",
    badge: "Parts",
    examples: [
      "Parts list from symptoms",
      "Compatibility checks",
      "Avoid mis-orders",
    ],
  },
  {
    title: "Brand specialties",
    subtitle: "Markem-Imaje + Domino first",
    desc: "Core focus on Markem-Imaje & Domino systems, with support across other major industrial coding brands.",
    badge: "Brands",
    examples: [
      "Markem-Imaje workflows",
      "Domino workflows",
      "Cross-brand triage",
    ],
  },
  {
    title: "Kansas City field service",
    subtitle: "Booking soon",
    desc: "We’re building the pipeline now and capturing leads so installs/PM visits can be scheduled ahead of arrival.",
    badge: "KC",
    examples: [
      "Lead capture + scheduling",
      "Future date bookings",
      "Local pages + SEO ramp",
    ],
  },
];

export default function HomeClient() {
  const telHref = useMemo(() => `tel:+1${digitsOnlyPhone(CONTACT.phone)}`, []);
  const mailHref = useMemo(() => `mailto:${CONTACT.email}`, []);

  useRevealOnScroll();

  useEffect(() => {
    // no-op, just ensures hook runs after hydration
  }, []);

  return (
    <>
      <main id="main" className="mx-auto max-w-6xl px-4 pb-24 pt-6 md:pt-8">
        {/* HERO */}
        <section className="glass-hero trace relative overflow-hidden rounded-3xl p-6 md:p-10 reveal is-on">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            {/* Left: hero copy (rule enforced) */}
            <div className="md:col-span-7">
              {/* Kicker */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgba(59,130,246,0.85)] shadow-[0_0_18px_rgba(59,130,246,0.35)]" />
                Industrial Inkjet Printer Support • Remote-first today
              </div>

              {/* Headline */}
              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
                Keep your production line running.
              </h1>

              {/* Subhead */}
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-[17px]">
                Remote diagnostics, planning, and preventative maintenance—built
                around Markem-Imaje &amp; Domino. Kansas City field service is
                coming online soon.
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
                  <div
                    key={a}
                    className="rounded-2xl border border-white/10 bg-black/40 p-3"
                  >
                    <div className="font-semibold text-white/90">{a}</div>
                    <div className="mt-1 text-white/60">{b}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-[11px] text-white/50">
                Email:{" "}
                <a className="underline underline-offset-4" href={mailHref}>
                  {CONTACT.email}
                </a>{" "}
                • Call/Text:{" "}
                <a className="underline underline-offset-4" href={telHref}>
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            {/* Right: hero logo card */}
            <div className="md:col-span-5">
              <div className="glass-soft relative overflow-hidden rounded-3xl p-5 md:p-6">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="relative rounded-3xl border border-white/10 bg-black/35 p-5">
                  <BrandLogo variant="hero" mode="wide" priority className="mx-auto" />
                  <div className="mt-3 text-center text-xs text-white/60">
                    A ReNewTech Solutions service line (DBA D-Macht)
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[0_0_0_1px_rgba(255,255,255,.06),0_18px_55px_-30px_rgba(59,130,246,.55)]" />
                </div>

                <div className="pointer-events-none absolute -inset-10 opacity-35 blur-2xl bg-gradient-to-r from-sky-400/20 via-teal-300/20 to-amber-300/20" />
              </div>
            </div>
          </div>
        </section>

        {/* BRANDS STRIP */}
        <div className="mt-8 md:mt-10 reveal">
          <BrandStrip />
        </div>

        {/* AVAILABILITY ROADMAP (provided section) */}
        <section id="availability" className="mt-10 md:mt-14 reveal">
          <div className="glass trace rounded-3xl p-6 md:p-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Availability roadmap
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-white/70">
                  We’re live now for India (remote + regional). Kansas City field
                  service comes online as Dee relocates.
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
                  <li>• Start SEO + local service pages</li>
                </ul>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-3 text-xs text-white/65">
                  Tip: we can capture leads now and schedule installs/PM dates ahead of arrival.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW MAP */}
        <section
          id="workflow"
          className="mt-10 md:mt-14 reveal"
          aria-label="Service workflow map"
        >
          <div className="glass trace rounded-3xl p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  How support works
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-white/70">
                  A clear path from symptoms → diagnosis → action plan → parts guidance → verification.
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
              Tap a card to see concrete examples and what we need from you to move fast.
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
                  Tell us your location, printer brand/model, and symptoms. If the line is down,
                  mark <span className="font-semibold text-white/90">Urgent</span>.
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
                  D-Macht • A ReNewTech Solutions service line (DBA)
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