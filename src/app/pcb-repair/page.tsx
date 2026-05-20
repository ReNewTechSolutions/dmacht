import Image from "next/image";

const repairSignals = [
  {
    title: "Power or boot failure",
    detail: "Machine will not power on, restarts, freezes, or fails during startup.",
  },
  {
    title: "Display or control faults",
    detail: "Screen is blank, keypad is unresponsive, settings do not save, or the controller behaves inconsistently.",
  },
  {
    title: "Burn marks or corrosion",
    detail: "Visible board damage, liquid exposure, heat damage, cracked components, or connector issues.",
  },
  {
    title: "Intermittent machine behavior",
    detail: "Printer works sometimes, fails under load, loses communication, or faults after warming up.",
  },
  {
    title: "Sensor or I/O problems",
    detail: "Inputs, outputs, alarms, encoder signals, or external line signals are not behaving correctly.",
  },
  {
    title: "Replacement cost is high",
    detail: "A repair review may help before replacing an expensive board, module, or full assembly.",
  },
];

const photoChecklist = [
  "Full printer model and serial plate if available",
  "Clear photos of the board front and back",
  "Close-up photos of connectors, burn marks, corrosion, or damaged components",
  "Error screens, fault messages, or startup behavior video",
  "Notes on what happened before the failure",
  "Whether the machine is line-down or still partially working",
];

const repairFlow = [
  {
    step: "01",
    title: "Document the fault",
    detail: "Capture symptoms, error behavior, photos, and whether the board is connected to a line-down production machine.",
  },
  {
    step: "02",
    title: "Review the likely path",
    detail: "The request can be routed toward board-level review, replacement module sourcing, wiring checks, or broader machine diagnostics.",
  },
  {
    step: "03",
    title: "Avoid blind replacement",
    detail: "If the board may be repairable or the issue may be external, reviewing evidence first can reduce unnecessary part swaps.",
  },
  {
    step: "04",
    title: "Plan next action",
    detail: "Next steps may include repair review, part sourcing, machine inspection, or preventive maintenance recommendations.",
  },
];

const supportedAreas = [
  "Controller boards",
  "Power supply related faults",
  "Display and keypad issues",
  "Sensor / I/O behavior",
  "Connector and cable damage",
  "Visible board damage review",
  "Printer module sourcing",
  "Line-down triage support",
];

export default function PCBRepairSupport() {
  return (
    <main className="siteShell pcbRepairPage" id="top">
      <section className="pcbRepairHero" aria-label="PCB repair support">
        <div className="pcbRepairHeroCopy">
          <span className="eyebrow">PCB repair support</span>
          <h1>Board-level repair review for industrial printer faults.</h1>
          <p>
            D-Macht helps route suspected PCB, power, controller, display, sensor, and module issues before teams jump straight to expensive replacement parts.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#pcb-request">
              Request PCB review
            </a>
            <a className="button secondary" href="#repair-signals">
              Check symptoms
            </a>
          </div>
        </div>

        <aside className="pcbRepairSignal" aria-label="PCB support summary">
          <span>Repair-first review</span>
          <strong>When the fault looks electrical, start with evidence.</strong>
          <p>
            Photos, symptoms, error behavior, and machine context can help decide whether the next step should be board review, part sourcing, wiring checks, or full machine service.
          </p>
          <div className="pcbSignalGrid" aria-hidden>
            <b>Power</b>
            <b>Control</b>
            <b>I/O</b>
            <b>Display</b>
          </div>
        </aside>
      </section>

      <section className="pageVisualSection" aria-label="PCB repair support visual">
        <div className="pageVisualFrame is-pcb">
          <Image
            src="/brand/pcb-repair-support.png"
            alt="D-Macht PCB repair diagnostics with circuit board magnification tools and gloved technician support"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 1200px"
            className="pageVisualImage"
          />
          <div className="pageVisualCaption">
            <div>
              <strong>Board-level diagnostics before expensive replacement.</strong>
              <span>Clear photos, symptoms, visible damage, and machine context help route the repair path.</span>
            </div>
            <b className="pageVisualBadge">PCB review</b>
          </div>
        </div>
      </section>

      <section className="pcbRepairSection" id="repair-signals" aria-label="PCB repair signals">
        <div className="sectionIntro compact">
          <span className="eyebrow">Symptoms</span>
          <h2>Signals that may point toward board, module, or electrical review.</h2>
          <p>
            These symptoms do not always mean the board is bad. They are signs that the request should be reviewed carefully before replacing parts.
          </p>
        </div>

        <div className="pcbSignalCards">
          {repairSignals.map((signal) => (
            <article className="pcbSignalCard" key={signal.title}>
              <h3>{signal.title}</h3>
              <p>{signal.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pcbRepairSection pcbRepairSplit" aria-label="PCB repair intake checklist">
        <div className="pcbChecklistPanel">
          <span className="eyebrow">Photo checklist</span>
          <h2>What to send for a board-level review.</h2>
          <div className="pcbChecklistGrid">
            {photoChecklist.map((item) => (
              <div className="pcbChecklistItem" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <aside className="pcbAreasPanel">
          <span>Support areas</span>
          <strong>Board review works best with clear machine context.</strong>
          <div className="pcbAreaChips">
            {supportedAreas.map((item) => (
              <b key={item}>{item}</b>
            ))}
          </div>
        </aside>
      </section>

      <section className="pcbRepairSection" aria-label="PCB repair workflow">
        <div className="sectionIntro compact">
          <span className="eyebrow">Repair workflow</span>
          <h2>A clearer path before replacing expensive assemblies.</h2>
        </div>

        <div className="pcbFlowGrid">
          {repairFlow.map((item) => (
            <article className="pcbFlowCard" key={item.step}>
              <b>{item.step}</b>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pcbRepairSection pcbRepairRequest" id="pcb-request" aria-label="Request PCB repair support">
        <div>
          <span className="eyebrow">Next step</span>
          <h2>Request PCB or module review.</h2>
          <p>
            Send the printer model, board photos, symptom details, error behavior, visible damage, and whether production is stopped.
          </p>
        </div>
        <a className="button primary" href="mailto:support@dmacht.com?subject=PCB%20Repair%20Support%20Request">
          Email PCB support request
        </a>
      </section>
    </main>
  );
}
