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
  email: "hello@renewtech.solutions",
  phone: "816.957.3063",
};

function digitsOnlyPhone(phone: string) {
  return phone.replace(/\D/g, "");
}

/**
 * D-Macht: translate a complex outreach process into digestible, step-based visuals
 * so technical teams can assess fit fast (capabilities, constraints, integrations, auditability).
 */
const CAPABILITIES: ServiceSkill[] = [
  {
    title: "Targeting + Inputs",
    subtitle: "Define the audience",
    desc: "Start with clean inputs: ICP fields, exclusions, source data, and routing constraints so the system behaves predictably.",
    badge: "Inputs",
    examples: ["ICP fields + exclusions", "Enrichment + de-dupe", "Routing constraints"],
  },
  {
    title: "Sequence Logic",
    subtitle: "Step-based orchestration",
    desc: "Inspectable steps and rules: timing, branching, stop conditions, retries, and handoff triggers — no black boxes.",
    badge: "Steps",
    examples: ["Timing + delays", "Branching + stop rules", "Retries + fallbacks"],
  },
  {
    title: "Personalization Guardrails",
    subtitle: "Human tone at scale",
    desc: "Personalization that stays constrained to your inputs: controlled sources, explicit rules, and consistent voice — no guessing.",
    badge: "AI",
    examples: ["Source-bound inputs", "Voice + tone controls", "Hallucination-resistant prompts"],
  },
  {
    title: "Integrations + Handoff",
    subtitle: "Fits your workflow",
    desc: "Log events, update lifecycle state, and route replies cleanly into your CRM without breaking ownership or process boundaries.",
    badge: "Stack",
    examples: ["HubSpot/Salesforce logging", "Lifecycle + routing rules", "Webhooks / API events"],
  },
  {
    title: "Observability + Audit Trail",
    subtitle: "Know what happened",
    desc: "Step-level metrics and an event timeline for debugging: deliverability signals, conversions, and a clear record of what ran.",
    badge: "Audit",
    examples: ["Step conversion metrics", "Event timeline", "Deliverability + domain health"],
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
                <span className="h-1.5 w-1.5 rounded-full bg-[rgba(20,184,166,0.9)] shadow-[0_0_18px_rgba(20,184,166,0.35)]" />
                Step-based outreach • Built for fast fit checks
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
                Industrial outreach,
                <span className="block text-white/70">diagnosed with clarity.</span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-[17px]">
                Translate a complex outreach process into clear, inspectable steps — targeting, sequence logic,
                constrained personalization, integrations, and audit trails. Built for technical teams who want
                predictable behavior.
              </p>

              {/* System check bar */}
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
                  Request Diagnostic Assessment
                </a>
                <a href="#capabilities" className="btn btn-secondary text-center">
                  View Capabilities
                </a>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 text-xs text-white/70 sm:grid-cols-4">
                {[
                  ["Step logic", "visible + testable"],
                  ["Guardrails", "source-bound"],
                  ["Integrations", "stack-friendly"],
                  ["Audit trail", "debug-ready"],
                ].map(([a, b]) => (
                  <div key={a} className="rounded-2xl border border-white/10 bg-black/40 p-3">
                    <div className="font-semibold text-white/90">{a}</div>
                    <div className="mt-1 text-white/60">{b}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-[11px] text-white/45">
                Canonical:{" "}
                <span className="text-white/70">dmacht.com</span> • Region adapts context + routing (not features)
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="glass-soft rounded-3xl p-5 md:p-6">
                <BrandLogo className="w-full" priority />

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-white/70">
                  {[
                    ["Clarity", "see every step"],
                    ["Control", "rules + routing"],
                    ["Fit", "workflow-ready"],
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
                  The workflow map
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-white/70">
                  Click through the steps to inspect inputs, logic, outputs, and where the system plugs into
                  your stack — designed like a diagnostic flow, not a marketing diagram.
                </p>
              </div>

              <div className="flex gap-2">
                <a href={mailHref} className="btn btn-secondary py-3 text-sm">
                  Email
                </a>
                <a href="#contact" className="btn btn-primary py-3 text-sm">
                  Request assessment
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
              Tap a card for concrete examples — signals, rules, logs, and what we need from you to move fast.
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
                  Request a diagnostic assessment
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                  Share your CRM, outreach volume, and constraints (domains, compliance, limits). If you’re
                  evaluating quickly, mark{" "}
                  <span className="font-semibold text-white/90">Priority</span>{" "}
                  and we’ll reply with a fit check and next steps.
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
                  D-Macht • Step-based outreach automation with audit-ready transparency
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