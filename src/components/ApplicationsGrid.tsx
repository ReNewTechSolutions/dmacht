"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Application = {
  id: string;
  title: string;
  sub: string;
  image: string;
  micro: string; // hover micro-detail
  href: string;  // optional anchor or route
};

function useInView<T extends HTMLElement>(rootMargin = "-10% 0px -15% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { root: null, rootMargin, threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

export default function ApplicationsGrid() {
  const { ref, inView } = useInView<HTMLElement>();

  // Conversion-optimized order:
  // 1) Troubleshooting (urgent pain)
  // 2) Packaging & Coding (primary use)
  // 3) Production Lines (scale)
  // 4) Inspection & QA (quality/compliance)
  // 5) Custom Inks & Fluids (recurring/parts)
  // 6) Industrial Parts & Spares (recurring/parts)
  // 7) Electronics & Control Systems (deep repair)
  // 8) PCB & Board-Level Repair (specialist)
  const applications: Application[] = useMemo(
    () => [
      {
        id: "troubleshooting",
        title: "Troubleshooting & Recovery",
        sub: "Rapid fault isolation and resolution",
        micro: "Error codes • print quality • startup faults",
        image: "/brand/applications/dmacht-troubleshooting.png",
        href: "#services",
      },
      {
        id: "packaging",
        title: "Packaging & Coding",
        sub: "Primary CIJ production environments",
        micro: "Batch/lot/date codes • variable data • uptime",
        image: "/brand/applications/dmacht-packagingandcoding.png",
        href: "#services",
      },
      {
        id: "production",
        title: "Production Lines",
        sub: "High-throughput manufacturing support",
        micro: "Multi-shift lines • planned downtime windows",
        image: "/brand/applications/dmacht-productionLine.png",
        href: "#workflow",
      },
      {
        id: "inspection",
        title: "Inspection & QA",
        sub: "Print quality, verification, compliance",
        micro: "Readability • contrast • verification support",
        image: "/brand/applications/dmacht-inspection.png",
        href: "#workflow",
      },
      {
        id: "inks",
        title: "Custom Inks & Fluids",
        sub: "Ink, solvent, and consumables expertise",
        micro: "Dry time • adhesion • substrate matching",
        image: "/brand/applications/dmacht-ink.png",
        href: "/maintenance#quote",
      },
      {
        id: "parts",
        title: "Industrial Parts & Spares",
        sub: "Pumps, printheads, sensors, tubing",
        micro: "Spares planning • wear items • replacements",
        image: "/brand/applications/dmacht-industrialparts.png",
        href: "/maintenance",
      },
      {
        id: "electronics",
        title: "Electronics & Control Systems",
        sub: "Boards, power, and signal diagnostics",
        micro: "Power rails • sensors • comms & control",
        image: "/brand/applications/dmacht-electronics.png",
        href: "#workflow",
      },
      {
        id: "pcb",
        title: "PCB & Board-Level Repair",
        sub: "Precision troubleshooting & repair",
        micro: "Board inspection • component-level checks",
        image: "/brand/applications/dmacht-PCB.png",
        href: "#workflow",
      },
    ],
    []
  );

  return (
    <section
      ref={ref}
      className={`applicationsSection ${inView ? "is-inview" : ""}`}
      id="applications"
      aria-label="Applications"
    >
      {/* PCB glow rails behind everything */}
      <div className="appsGlow" aria-hidden>
        <div className="appsGlowRail rail-1" />
        <div className="appsGlowRail rail-2" />
        <div className="appsGlowRail rail-3" />
      </div>

      <div className="applicationsInner">
        <div className="applicationsHeader">
          <div className="applicationsKicker">Applications</div>
          <h2 className="applicationsTitle">A Service Catalog for Industrial Coding Environments</h2>
          <p className="applicationsSub">
            Browse service domains. Choose what matches your line — then request support or compare AMC coverage.
          </p>

          {/* Contextual tie-in to Maintenance */}
          <div className="appsCtas">
            <Link className="btn btn-primary" href="/maintenance">
              View maintenance packages
            </Link>
            <Link className="btn btn-ghost" href="/maintenance#quote">
              Request an AMC quote
            </Link>
          </div>
        </div>

        <div className="applicationsGrid">
          {applications.map((app, i) => (
            <Link
              key={app.id}
              href={app.href}
              className="applicationCard"
              style={{ animationDelay: `${i * 55}ms` }}
              aria-label={`${app.title} - View services`}
            >
              <div className="applicationImageWrap">
                <Image src={app.image} alt={app.title} fill className="applicationImage" />
                <div className="applicationRing" aria-hidden />
              </div>

              <div className="applicationMeta">
                <div className="applicationTitleRow">
                  <div className="applicationTitle">{app.title}</div>
                  <span className="applicationArrow" aria-hidden>
                    →
                  </span>
                </div>

                <div className="applicationSub">{app.sub}</div>

                {/* hover micro-details */}
                <div className="applicationMicro">
                  <span className="microLabel">View services</span>
                  <span className="microDivider" aria-hidden />
                  <span className="microText">{app.micro}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom bridge CTA (extra conversion bump) */}
        <div className="appsBridge">
          <div className="appsBridgeLeft">
            <div className="appsBridgeTitle">Need predictable uptime?</div>
            <div className="appsBridgeSub">
              AMC packages reduce emergency downtime with scheduled preventive checks + faster triage.
            </div>
          </div>
          <div className="appsBridgeRight">
            <Link className="btn btn-primary" href="/maintenance">
              Compare AMC packages
            </Link>
            <Link className="btn btn-ghost" href="/maintenance#quote">
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}