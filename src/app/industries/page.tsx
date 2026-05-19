const industries = [
  {
    name: "Food and beverage",
    description:
      "Coding support for batch numbers, expiry dates, lot codes, bottles, cartons, flexible packaging, and production lines where downtime can quickly affect dispatch.",
    needs: ["Date and batch coding", "Washdown-aware planning", "Consumables and PM support"],
  },
  {
    name: "Pharma and medical packaging",
    description:
      "Support for packaging environments where clear marks, traceability, documentation, and repeatable maintenance routines matter.",
    needs: ["Readable codes", "Service documentation", "Careful parts and consumables matching"],
  },
  {
    name: "Manufacturing and industrial goods",
    description:
      "Industrial marking support for components, cartons, labels, parts, and production workflows that need dependable coding equipment.",
    needs: ["Line-down triage", "Parts identification", "Printer maintenance planning"],
  },
  {
    name: "Wire, cable, and pipe",
    description:
      "Support for marking applications where speed, surface shape, contrast, print distance, and repeatable quality can be difficult to manage.",
    needs: ["Curved surface marking", "Contrast and adhesion review", "CIJ / DOD / laser routing"],
  },
  {
    name: "Logistics and warehousing",
    description:
      "Support for carton coding, label workflows, scan readability, dispatch markings, and equipment used around packing and movement operations.",
    needs: ["Carton and label coding", "Barcode clarity", "Consumables reorder planning"],
  },
  {
    name: "Packaging and contract packing",
    description:
      "Support for operations running multiple products, packaging materials, code formats, and changeovers across active production schedules.",
    needs: ["Changeover support", "Printer type matching", "Backup equipment planning"],
  },
];

const painPoints = [
  {
    title: "Line-down urgency",
    detail: "When coding equipment stops, production, packing, and dispatch can stall. Requests should clearly include urgency and production impact.",
  },
  {
    title: "Unreadable or inconsistent marks",
    detail: "Poor contrast, missing characters, weak transfer, or bad barcode clarity can point to setup, consumables, printhead, or equipment issues.",
  },
  {
    title: "Consumables mismatch",
    detail: "The wrong ink, fluid, ribbon, filter, or replacement part can create avoidable downtime and repeat service problems.",
  },
  {
    title: "No clear maintenance rhythm",
    detail: "Preventive maintenance helps teams catch wear items, fluid issues, and repeated symptoms before they become bigger failures.",
  },
];

const requestDetails = [
  "Industry and production application",
  "Printer brand, model, and type if known",
  "Material being marked or coded",
  "Photo/video of the mark, fault, or machine behavior",
  "Current consumable label if ink, fluid, ribbon, or filter related",
  "Whether the issue is urgent or production is stopped",
];

export default function IndustriesServed() {
  return (
    <main className="siteShell industriesPage" id="top">
      <section className="industriesHero" aria-label="Industries served">
        <div className="industriesHeroCopy">
          <span className="eyebrow">Industries served</span>
          <h1>Industrial coding and marking support for production environments.</h1>
          <p>
            D-Macht helps teams across food, beverage, pharma, packaging, logistics, manufacturing, and industrial goods route printer support requests with clearer machine, material, and production context.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#industry-grid">
              View industries
            </a>
            <a className="button secondary" href="#industry-request">
              What to send
            </a>
          </div>
        </div>

        <aside className="industriesSignal" aria-label="Industry support summary">
          <span>Production-first support</span>
          <strong>Different industries. Similar uptime pressure.</strong>
          <p>
            Whether the application is date coding, batch marking, serialized labels, cartons, pipes, bottles, or flexible packaging, the first step is getting the right service details into one clear request.
          </p>
          <div className="industriesSignalChips" aria-hidden>
            <b>Food</b>
            <b>Pharma</b>
            <b>Packaging</b>
            <b>Logistics</b>
            <b>Manufacturing</b>
          </div>
        </aside>
      </section>

      <section className="industriesSection" id="industry-grid" aria-label="Industry cards">
        <div className="sectionIntro compact">
          <span className="eyebrow">Use cases</span>
          <h2>Built around the environments where coding failures become operational problems.</h2>
          <p>
            Each industry has different materials, marks, and urgency — but the same need for clear routing, reliable supplies, and better uptime planning.
          </p>
        </div>

        <div className="industriesGrid">
          {industries.map((industry) => (
            <article className="industryCard" key={industry.name}>
              <h3>{industry.name}</h3>
              <p>{industry.description}</p>
              <div className="industryNeeds">
                <small>Common support needs</small>
                <ul>
                  {industry.needs.map((need) => (
                    <li key={need}>{need}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="industriesSection industriesSplit" aria-label="Common pain points and request details">
        <div className="industryPainPanel">
          <span className="eyebrow">Common pain points</span>
          <h2>Most requests start with one of four problems.</h2>
          <div className="industryPainGrid">
            {painPoints.map((point) => (
              <article className="industryPainItem" key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="industryRequestPanel" id="industry-request">
          <span>Helpful request details</span>
          <strong>Send context, not just the fault.</strong>
          <ul>
            {requestDetails.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <a className="button primary" href="mailto:support@dmacht.com?subject=Industry%20Support%20Request">
            Send industry support request
          </a>
        </aside>
      </section>
    </main>
  );
}
