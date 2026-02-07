"use client";

import { useMemo } from "react";

import BrandLogo from "@/components/BrandLogo";
import BrandStrip from "@/components/BrandStrip";
import StickyCTA from "@/components/StickyCTA";
import RequestForm from "@/components/RequestForm";

import useRevealOnScroll from "@/components/useRevealOnScroll";
import MotherboardHotspots from "@/components/motherboard-hotspots";
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
    title: "Remote Diagnostics",
    subtitle: "Fault isolation + next steps",
    desc: "We help you pinpoint the failure mode fast, translate symptoms into a clear action plan, and reduce trial-and-error.",
    badge: "Diagnostics",
    examples: [
      "Fault codes → probable causes",
      "Sensor/valve/pump checks",
      "Action plan + confirmation steps",
    ],
  },
  {
    title: "PM Planning",
    subtitle: "Reduce downtime",
    desc: "Preventative maintenance guidance, schedules, and checklists—built around what actually causes stops in production.",
    badge: "PM",
    examples: [
      "Cleaning cycle planning",
      "Wear-part schedules",
      "Operator checklists",
    ],
  },
  {
    title: "Parts Guidance",
    subtitle: "What to order + why",
    desc: "We tell you what to buy (and what not to), with justification—so you don’t waste time or money.",
    badge: "Parts",
    examples: [
      "Parts list by symptom",
      "Compatibility notes",
      "Priority ordering guidance",
    ],
  },
  {
    title: "Markem-Imaje & Domino Focus",
    subtitle: "Primary expertise",
    desc: "Our workflows are tuned for the systems we know best, so responses are faster and more accurate.",
    badge: "Focus",
    examples: [
      "Common failure patterns",
      "Setup/installation checks",
      "Quality issue troubleshooting",
    ],
  },
  {
    title: "Field Service Expansion",
    subtitle: "Kansas City coming online",
    desc: "We’re building pipeline now. Scheduling opens as Dee relocates to Kansas City.",
    badge: "KC",
    examples: [
      "Lead capture now",
      "Booking soon",
      "Local pages + SEO ramp",
    ],
  },
];

export default function HomeClient() {
  useRevealOnScroll();

  const telHref = useMemo(() => `tel:+1${digitsOnlyPhone(CONTACT.phone)}`, []);
  const mailHref = useMemo(() => `mailto:${CONTACT.email}`, []);

  return (
    <>
      <main id="main" className="mx-auto max-w-6xl px-4 pb-24 pt-6 md:pt-8">
        {/* HERO */}
        <section className="glass-hero trace relative overflow-hidden rounded-3xl p-6 md:p-10 reveal is-on">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            {/* Left copy */}
            <div className="md:col-span-7">
              {/* Kicker (ONE line) */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                Industrial Inkjet Printer Support • Remote-first today
              </div>

              {/* Headline (ONE) */}
              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
                Keep your production line running.
              </h1>

              {/* Subhead (ONE) */}
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-[17px]">
                Remote diagnostics, planning, and preventative maintenance—built around Markem-Imaje &amp; Domino.
                Kansas City field service is coming online soon.
              </p>

              {/* CTAs (TWO) */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#contact" className="btn btn-primary text-center">
                  Request support
                </a>
                <a href="#workflow" className="btn btn-secondary text-center">
                  See how it works
                </a>
              </div>

              {/* Proof row (FOUR) */}
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
            </div>

            {/* Right logo card */}
            <div className="md:col-span-5">
              <div className="glass-soft rounded-3xl p-5 md:p-6">
                {/* Make the logo big and clean */}
                <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
                  <BrandLogo className="w-full" priority />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-white/70">
                  {[
                    ["Remote-first", "fast triage"],
                    ["Clear steps", "no guessing"],
                    ["Focused brands", "Markem + Domino"],
                    ["Expansion", "KC booking soon"],
                  ].map(([a, b]) => (
                    <div key={a} className="rounded-2xl border border-white/10 bg-black/30 p-3">
                      <div className="font-semibold text-white/90">{a}</div>
                      <div className="mt-1 text-white/60">{b}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-[11px] text-white/55">
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
            </div>
          </div>
        </section>

        {/* BRANDS STRIP */}
        <div className="mt-8 md:mt-10 reveal">
          <BrandStrip />
        </div>

        <section id="availability" className="mt-10 md:mt-14 reveal">
  <div className="glass trace rounded-3xl p-6 md:p-10">
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Service coverage
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Remote-first support is available now. On-site availability varies by region and scheduling.
        </p>
      </div>

      <a href="#contact" className="btn btn-primary">
        Request support
      </a>
    </div>

    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          Remote support
        </div>
        <div className="mt-3 text-lg font-semibold text-white/90">
          Available now
        </div>
        <ul className="mt-3 space-y-2 text-sm text-white/75">
          <li>• Fault isolation + next steps</li>
          <li>• PM planning + checklists</li>
          <li>• Parts guidance + ordering help</li>
        </ul>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
          On-site support
        </div>
        <div className="mt-3 text-lg font-semibold text-white/90">
          Limited scheduling
        </div>
        <ul className="mt-3 space-y-2 text-sm text-white/75">
          <li>• Regional availability (by request)</li>
          <li>• Future bookings supported</li>
          <li>• We’ll confirm coverage after intake</li>
        </ul>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-3 text-xs text-white/65">
          Tell us your location and urgency — we’ll reply with the best path (remote vs. visit).
        </div>
      </div>
    </div>
  </div>
</section>

        {/* WORKFLOW MAP */}
        <section id="workflow" className="mt-10 md:mt-14 reveal" aria-label="Service workflow map">
          <div className="glass trace rounded-3xl p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  How it works
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-white/70">
                  A step-by-step flow from symptoms → isolation → action plan → PM/parts guidance.
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
              Tap a card for concrete examples (what we need from you, what we deliver, and how fast we can move).
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
                  Send your model, symptoms, and location. If your line is down, mark urgency and we’ll prioritize.
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
                  D-Macht • Industrial inkjet printer support (remote-first)
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