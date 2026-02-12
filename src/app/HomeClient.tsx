"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type AppItem = {
  title: string;
  sub: string;
  img: string;
  href: string;
  pill?: string;
};

function useInViewOnce() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = document.getElementById("applications");
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.18 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return inView;
}

export default function ApplicationsGrid() {
  const inView = useInViewOnce();

  const primary: AppItem[] = useMemo(
    () => [
      {
        title: "Troubleshooting / Diagnostics",
        sub: "Remote-first triage + next steps",
        img: "/brand/applications/dmacht-troubleshooting.png",
        href: "#contact",
        pill: "fast triage",
      },
      {
        title: "Motherboard Repair",
        sub: "Board-level diagnosis + repair",
        img: "/brand/applications/dmacht-PCB.png",
        href: "#contact",
        pill: "core focus",
      },
      {
        title: "Power Supply Repair",
        sub: "5V / 3.3V / 1.2V rail issues + replacement",
        img: "/brand/applications/dmacht-productionLine.png",
        href: "#contact",
        pill: "core focus",
      },
      {
        title: "Inspection / Preventive",
        sub: "Catch issues before downtime",
        img: "/brand/applications/dmacht-inspection.png",
        href: "/maintenance",
        pill: "PM-ready",
      },
      {
        title: "Production Line Support",
        sub: "Reliability + uptime planning",
        img: "/brand/applications/dmacht-productionLine.png",
        href: "#contact",
      },
      {
        title: "Packaging & Coding",
        sub: "Line integration + print consistency",
        img: "/brand/applications/dmacht-packagingandcoding.png",
        href: "#contact",
      },
      {
        title: "Inks & Fluids",
        sub: "OEM-compatible fluids (guided selection)",
        img: "/brand/applications/dmacht-ink.png",
        href: "#contact",
      },
      {
        title: "Industrial Parts",
        sub: "Parts sourcing guidance + replacements",
        img: "/brand/applications/dmacht-industrialparts.png",
        href: "#contact",
      },
    ],
    []
  );

  const secondary: AppItem[] = useMemo(
    () => [
      {
        title: "Refurbished Electronics",
        sub: "Tested, restored, and resold hardware",
        img: "/brand/applications/dmacht-electronics.png",
        href: "#contact",
        pill: "new",
      },
      {
        title: "Mobile Repair",
        sub: "Device repair + service intake",
        img: "/brand/applications/dmacht-electronics.png",
        href: "#contact",
        pill: "new",
      },
    ],
    []
  );

  return (
    <section
      className={`mx-auto max-w-6xl px-4 pt-10 ${inView ? "is-inview" : ""}`}
      aria-label="Applications"
      id="applications"
    >
      <div className="appsHead">
        <div>
          <div className="appsKicker">Applications</div>
          <h2 className="appsTitle">Service catalog (what we cover)</h2>
          <p className="appsSub">
            Clear, repair-forward services — optimized for Markem-Imaje, Domino, and VideoJet.
          </p>
        </div>

        <div className="appsHeadCta">
          <Link className="btn btn-ghost" href="/maintenance">
            Maintenance packages →
          </Link>
        </div>
      </div>

      <div className="appsShell">
        {/* scroll glow background */}
        <div className="appsGlow" aria-hidden>
          <Image
            src="/brand/dmacht-nodestrip.png"
            alt=""
            fill
            className="appsGlowImg"
            priority={false}
          />
        </div>

        <div className="appsGrid">
          {primary.map((a) => (
            <a key={a.title} className="appCard" href={a.href}>
              <div className="appTop">
                <div className="appCircle">
                  <Image src={a.img} alt="" fill className="appImg" />
                </div>

                {a.pill ? <span className="appPill">{a.pill}</span> : <span className="appPill is-ghost">service</span>}
              </div>

              <div className="appTitleRow">
                <div className="appTitle">{a.title}</div>
                <div className="appHover">View services →</div>
              </div>

              <div className="appSub">{a.sub}</div>
            </a>
          ))}
        </div>

        <div className="appsDivider">
          <span />
          <div className="appsDividerText">Additional services</div>
          <span />
        </div>

        <div className="appsGrid appsGridSecondary">
          {secondary.map((a) => (
            <a key={a.title} className="appCard appCardSecondary" href={a.href}>
              <div className="appTop">
                <div className="appCircle">
                  <Image src={a.img} alt="" fill className="appImg" />
                </div>
                {a.pill ? <span className="appPill">{a.pill}</span> : null}
              </div>

              <div className="appTitleRow">
                <div className="appTitle">{a.title}</div>
                <div className="appHover">View services →</div>
              </div>

              <div className="appSub">{a.sub}</div>
            </a>
          ))}
        </div>

        <div className="appsFoot">
          <div className="appsFootText">
            Want predictable uptime? AMC coverage ties directly into inspections + preventive scheduling.
          </div>
          <Link className="btn btn-primary" href="/maintenance">
            Explore AMC packages
          </Link>
        </div>
      </div>
    </section>
  );
}