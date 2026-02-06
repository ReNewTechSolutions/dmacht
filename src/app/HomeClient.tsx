"use client";

import { useEffect, useMemo, useState } from "react";

import BrandLogo from "@/components/BrandLogo";
import BrandStrip from "@/components/BrandStrip";
import StickyCTA from "@/components/StickyCTA";
import RequestForm from "@/components/RequestForm";

import useRevealOnScroll from "@/components/useRevealOnScroll";
import MotherboardHotspots from "@/components/MotherboardHotspots";
import ServiceCards, { type ServiceSkill } from "@/components/ServiceCards";

const CONTACT = {
  email: "hello@dmacht.com",
  phone: "816.957.3063",
};

function digitsOnlyPhone(phone: string) {
  return phone.replace(/\D/g, "");
}

/**
 * DMacht: translate complex AI outreach into digestible, step-based visuals
 * for technical decision makers who want fast fit + clear capabilities.
 */
const CAPABILITIES: ServiceSkill[] = [
  {
    title: "Data + ICP Targeting",
    subtitle: "Define who we reach",
    desc: "Map your ICP, enrich accounts, and segment lists so outreach starts with clean, workflow-ready targeting.",
    badge: "Targeting",
    examples: [
      "ICP fields + segmentation",
      "Enrichment & de-dupe",
      "Account scoring signals",
    ],
  },
  {
    title: "Outreach Orchestration",
    subtitle: "Multi-step sequences",
    desc: "Email + LinkedIn style sequencing with explicit logic: timing, retries, routing, and handoff rules.",
    badge: "Sequences",
    examples: [
      "Step timing + delays",
      "Retry / fallback paths",
      "Warm handoff triggers",
    ],
  },
  {
    title: "Personalization Engine",
    subtitle: "Human tone at scale",
    desc: "Message generation that stays constrained to your inputs: firm guardrails, clear source-of-truth, no guessing.",
    badge: "AI",
    examples: [
      "Profile-based angles",
      "On-brand voice controls",
      "Hallucination-resistant prompts",
    ],
  },
  {
    title: "CRM + Workflow Integration",
    subtitle: "Fits your stack",
    desc: "Connect to your pipeline and keep ownership clear: sync states, log events, and respect system boundaries.",
    badge: "Integrations",
    examples: [
      "HubSpot/Salesforce logging",
      "Lead routing rules",
      "Webhook / API events",
    ],
  },
  {
    title: "Observability + Compliance",
    subtitle: "Know what happened",
    desc: "Transparent reporting for technical teams: step-level metrics, audit trails, and deliverability signals.",
    badge: "Analytics",
    examples: [
      "Step conversion metrics",
      "Event/audit timeline",
      "Deliverability & domain health",
    ],
  },
];

export default function HomeClient() {
  // subtle “system boot” animation (deterministic)
  const [boot, setBoot] = useState(0);

  const telHref = useMemo(() => `tel:+1${digitsOnlyPhone(CONTACT.phone)}`, []);
  const mailHref = useMemo(() => `mailto:${CONTACT.email}`, []);

  // reveal animations (expects .reveal elements toggled with .is-on)
  useRevealOnScroll();

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
        {/* HERO */}
        <section className="glass-hero trace relative overflow-hidden rounded-3xl p-6 md:p-10 reveal is-on">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgba(59,130,246,0.85)] shadow-[0_0_18px_rgba(59,130,246,0.35)]" />
                Step-based AI outreach • Built for technical teams
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
                D-Macht
                <span className="block text-white/70">
                  AI outreach you can actually inspect.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-[17px]">
                Translate a complex outbound system into a clear workflow:
                targeting → sequencing → personalization → integration → reporting.
                No mystery boxes. Just steps you can validate.
              </p>

              {/* System boot bar */}
              <div className="mt-6">
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
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#contact" className="btn btn-primary text-center">
                  Request a walkthrough
                </a>
                <a href="#capabilities" className="btn btn-secondary text-center">
                  View capabilities
                </a>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 text-xs text-white/70 sm:grid-cols-4">
                {[
                  ["Step logic", "visible + testable"],
                  ["Guardrails", "no guesswork"],
                  ["Integrations", "CRM-friendly"],
                  ["Reporting", "audit-ready"],
                ].map(([a, b]) => (
                  <div key={a} className="rounded-2xl border border-white/10 bg-black/40 p-3">
                    <div className="font-semibold text-white/90">{a}</div>
                    <div className="mt-1 text-white/60">{b}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="glass-soft rounded-3xl p-5 md:p-6">
                <BrandLogo className="w-full" priority />

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-white/70">
                  {[
                    ["Clarity", "see every step"],
                    ["Control", "rules + routing"],
                    ["Fit", "stack-friendly"],
                    ["Trust", "audit trails"],
                  ].map(([a, b]) => (
                    <div key={a} className="rounded-2xl border border-white/10 bg-black/30 p-3">
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
            </div>
          </div>
        </section>

        {/* BRANDS STRIP */}
        <div className="mt-8 md:mt-10 reveal">
          <BrandStrip />
        </div>

        {/* WORKFLOW VISUAL (hotspots) */}
        <section className="mt-10 md:mt-14 reveal" aria-label="Outreach workflow visual">
          <div className="glass trace rounded-3xl p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Outreach workflow, visualized
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-white/70">
                  Click through the steps to see what’s happening under the hood —
                  inputs, logic, outputs, and where it plugs into your stack.
                </p>
              </div>

              <div className="flex gap-2">
                <a href={mailHref} className="btn btn-secondary py-3 text-sm">
                  Email
                </a>
                <a href="#contact" className="btn btn-primary py-3 text-sm">
                  Walkthrough
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
              Tap a card to see concrete examples (signals, steps, logs, and what we need from you to move fast).
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
                  Request a walkthrough
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                  Tell us your CRM, outreach volume, and current tooling. If you’re evaluating quickly,
                  mark{" "}
                  <span className="font-semibold text-white/90">Priority</span>{" "}
                  and we’ll reply with a fit check + next steps.
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
                  D-Macht • Outreach automation with step-level transparency
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