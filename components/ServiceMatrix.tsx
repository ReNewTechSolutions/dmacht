import Image from "next/image";

const diagnosticRoutes = [
  {
    issue: "Printer stopped / line down",
    route: "Breakdown support",
    send: "Model, error code, photos/video, and whether production is stopped.",
    next: "Triage repair path, parts need, or on-site service route.",
  },
  {
    issue: "Print is faded, missing, or messy",
    route: "Print quality review",
    send: "Print sample photo, ink/fluid details, nozzle status, and recent changes.",
    next: "Check fluid, nozzle, sensor, configuration, and maintenance causes.",
  },
  {
    issue: "Need ink, make-up fluid, or filters",
    route: "Consumables supply",
    send: "Printer brand/model, current product label, quantity, and location.",
    next: "Match compatible consumables and plan reorder support.",
  },
  {
    issue: "Board, power, display, or control issue",
    route: "PCB repair review",
    send: "Board photos, symptoms, visible damage, model, and fault behavior.",
    next: "Review repair path before replacing expensive assemblies.",
  },
  {
    issue: "Need a part or replacement module",
    route: "Spare parts request",
    send: "Part number if known, machine model, photos, and urgency.",
    next: "Identify part, confirm fit, and coordinate sourcing.",
  },
  {
    issue: "Need a backup or refurbished printer",
    route: "Equipment sourcing",
    send: "Current printer type, budget, production use, and required timeline.",
    next: "Review refurbished, replacement, or backup equipment options.",
  },
];

const supportTypes = [
  "Industrial printer repair",
  "Preventive maintenance / AMC",
  "PCB and board-level repair review",
  "Ink, fluids, filters, and consumables",
  "Spare parts identification and sourcing",
  "Refurbished printer and backup unit planning",
];

export default function ServiceMatrix() {
  return (
    <section className="servicesSection" id="services">
      <div className="serviceRouterHeader">
        <div className="sectionIntro">
          <span className="eyebrow">Service router</span>
          <h2>Start with what is happening on the line.</h2>
          <p>
            You do not need to know the exact technical failure before contacting D-Macht. Choose the closest issue, send the right details, and the request can be routed toward repair, parts, consumables, maintenance, PCB review, or sourcing.
          </p>
        </div>

        <aside className="serviceRouterNote">
          <span>Built for operators</span>
          <strong>No diagnosis required.</strong>
          <p>Plain-language issue routing helps maintenance teams and business owners send better service requests faster.</p>
        </aside>
      </div>

      <div className="diagnosticPanel" aria-label="Diagnostic service routing table">
        <div className="diagnosticPanelTop">
          <div>
            <span>Industrial routing table</span>
            <h3>What should I send?</h3>
          </div>
          <a href="#request" className="button secondary">
            Start request
          </a>
        </div>

        <div className="diagnosticTable">
          <div className="diagnosticRow diagnosticHead" aria-hidden>
            <span>Issue</span>
            <span>Route</span>
            <span>Details to send</span>
            <span>Next step</span>
          </div>

          {diagnosticRoutes.map((item) => (
            <article className="diagnosticRow" key={item.issue}>
              <div className="diagnosticIssue">
                <strong>{item.issue}</strong>
              </div>
              <div>
                <span className="diagnosticMobileLabel">Route</span>
                <b>{item.route}</b>
              </div>
              <div>
                <span className="diagnosticMobileLabel">Details to send</span>
                <p>{item.send}</p>
              </div>
              <div>
                <span className="diagnosticMobileLabel">Next step</span>
                <p>{item.next}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="supportStrip" aria-label="Available support categories">
        {supportTypes.map((type) => (
          <span key={type}>{type}</span>
        ))}
      </div>

      <article className="repairLabFeature">
        <div className="repairLabImageFrame">
          <Image
            src="/brand/pcb-repair.png"
            alt="Technician repairing an industrial printer PCB under magnification"
            fill
            sizes="(max-width: 900px) 100vw, 520px"
            className="repairLabImage"
          />
        </div>
        <div className="repairLabCopy">
          <span className="eyebrow">Repair lab capability</span>
          <h3>Board-level symptoms need more than guesswork.</h3>
          <p>
            For suspected PCB issues, capture the printer model, board details, symptoms, photos, visible damage, and error behavior so the repair path can be reviewed clearly.
          </p>
          <a className="button secondary" href="#request">
            Request PCB support
          </a>
        </div>
      </article>
    </section>
  );
}
