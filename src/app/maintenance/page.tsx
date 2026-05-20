import Image from "next/image";

const packageTiers = [
  {
    name: "Essential PM",
    label: "Best for basic uptime planning",
    cadence: "Scheduled preventive visit or remote review",
    description:
      "A practical maintenance path for teams that need routine checks, cleaner documentation, and fewer surprise printer issues.",
    includes: [
      "Printer condition review",
      "Basic cleaning and inspection checklist",
      "Ink, fluid, filter, and consumable review",
      "Operator notes and recommended next steps",
    ],
  },
  {
    name: "Production Care",
    label: "Best for active production lines",
    cadence: "Recurring PM cadence based on machine use",
    description:
      "A stronger support plan for production environments where coding issues can slow packing, labeling, or dispatch workflows.",
    includes: [
      "Preventive maintenance checklist",
      "Print quality and fault history review",
      "Recommended spares and consumables planning",
      "Priority triage for recurring issues",
    ],
  },
  {
    name: "Uptime Partner",
    label: "Best for multi-machine operations",
    cadence: "Custom AMC support plan",
    description:
      "A custom maintenance and support route for teams managing multiple printers, frequent production runs, or recurring downtime risk.",
    includes: [
      "Multi-printer maintenance planning",
      "Parts, PCB, and consumables routing",
      "Documentation for service history",
      "Escalation path for urgent repair needs",
    ],
  },
];

const maintenanceChecks = [
  "Printhead and nozzle condition",
  "Ink and make-up fluid levels",
  "Filters, pumps, tubing, and visible leaks",
  "Sensor alignment and basic machine behavior",
  "Error codes, fault history, and operator notes",
  "Recommended spares, consumables, and follow-up actions",
];

const fitList = [
  "Factories using CIJ, TIJ, DOD, laser, or TTO systems",
  "Packaging lines where batch coding or marking delays create downtime",
  "Teams that need cleaner maintenance records before problems repeat",
  "Operations preparing for backup printer, parts, or consumables planning",
];

export default function MaintenanceAMCPackages() {
  return (
    <main className="siteShell maintenancePage" id="top">
      <section className="maintenanceHero" aria-label="Maintenance and AMC packages">
        <div className="maintenanceHeroCopy">
          <span className="eyebrow">Maintenance / AMC</span>
          <h1>Preventive maintenance packages for industrial printer uptime.</h1>
          <p>
            D-Macht helps production teams plan routine service, reduce repeat failures, and keep coding and marking equipment easier to manage across repair, consumables, parts, and documentation.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#maintenance-request">
              Ask about AMC coverage
            </a>
            <a className="button secondary" href="#packages">
              View package paths
            </a>
          </div>
        </div>

        <aside className="maintenanceSignalPanel" aria-label="Maintenance summary">
          <span>Maintenance focus</span>
          <strong>Fewer surprises. Cleaner service planning.</strong>
          <p>
            Start with printer type, model, production use, fault history, and current consumables. D-Macht can help route the right preventive path.
          </p>
          <div className="maintenanceMiniGrid">
            <div>
              <b>Supported</b>
              <small>CIJ / TIJ / DOD / Laser / TTO</small>
            </div>
            <div>
              <b>Best use</b>
              <small>Production uptime and repeat issue reduction</small>
            </div>
          </div>
        </aside>
      </section>

      <section className="pageVisualSection" aria-label="Preventive maintenance visual">
        <div className="pageVisualFrame is-right">
          <Image
            src="/brand/maintenance-amc.png"
            alt="D-Macht technician performing preventive maintenance on an industrial coding machine"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 1200px"
            className="pageVisualImage"
          />
          <div className="pageVisualCaption">
            <div>
              <strong>Preventive maintenance for production uptime.</strong>
              <span>Routine inspection, cleaner service planning, and fewer surprise equipment issues.</span>
            </div>
            <b className="pageVisualBadge">AMC ready</b>
          </div>
        </div>
      </section>

      <section className="maintenanceSection" id="packages" aria-label="Maintenance package paths">
        <div className="sectionIntro compact">
          <span className="eyebrow">Package paths</span>
          <h2>Choose the maintenance level that matches the production risk.</h2>
        </div>

        <div className="maintenancePackageGrid">
          {packageTiers.map((tier) => (
            <article className="maintenancePackageCard" key={tier.name}>
              <span>{tier.label}</span>
              <h3>{tier.name}</h3>
              <p>{tier.description}</p>
              <div className="maintenanceCadence">{tier.cadence}</div>
              <ul>
                {tier.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="maintenanceSection maintenanceSplit" aria-label="What maintenance includes">
        <div className="maintenanceChecklistPanel">
          <span className="eyebrow">Checklist</span>
          <h2>What a preventive review can include.</h2>
          <div className="maintenanceCheckGrid">
            {maintenanceChecks.map((item) => (
              <div className="maintenanceCheck" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <aside className="maintenanceFitPanel">
          <span>Best fit</span>
          <strong>Built for real production environments.</strong>
          <ul>
            {fitList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="maintenanceSection maintenanceRequest" id="maintenance-request" aria-label="Ask about maintenance coverage">
        <div>
          <span className="eyebrow">Next step</span>
          <h2>Ask about maintenance coverage.</h2>
          <p>
            Send machine brand, model, printer type, location, production schedule, known issues, and whether you need one-time PM or recurring AMC support.
          </p>
        </div>
        <a className="button primary" href="mailto:support@dmacht.com?subject=Maintenance%20/%20AMC%20Coverage%20Request">
          Email maintenance request
        </a>
      </section>
    </main>
  );
}
