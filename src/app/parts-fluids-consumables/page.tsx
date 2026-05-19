const consumableGroups = [
  {
    title: "Inks",
    subtitle: "Coding and marking ink support",
    description:
      "Help matching ink needs by printer type, substrate, current product label, and production environment.",
    examples: ["Black and colored coding inks", "Fast-dry and substrate-specific inks", "Batch/date coding applications"],
    send: "Printer model, current ink label, surface/material, print sample, and quantity needed.",
  },
  {
    title: "Make-up fluids",
    subtitle: "CIJ fluid planning",
    description:
      "Support for make-up fluid matching and reorder planning so CIJ systems stay easier to maintain.",
    examples: ["Make-up / solvent fluids", "Compatible fluid matching", "Usage and reorder planning"],
    send: "Current make-up fluid label, printer model, ink type, and operating environment.",
  },
  {
    title: "Cleaning solutions",
    subtitle: "Routine cleaning support",
    description:
      "Cleaning products and maintenance guidance for printheads, nozzles, machine surfaces, and routine service checks.",
    examples: ["Printhead cleaning", "Nozzle cleaning", "Maintenance cleaning routines"],
    send: "Printer type, current cleaning product if known, photos of buildup, and symptom details.",
  },
  {
    title: "Filters and wear items",
    subtitle: "Preventive maintenance supplies",
    description:
      "Consumable wear items that help reduce repeat faults when replaced on a planned maintenance schedule.",
    examples: ["Filters", "Tubing and small wear items", "PM replacement planning"],
    send: "Machine model, part number if known, photos, maintenance history, and quantity needed.",
  },
  {
    title: "TTO ribbons",
    subtitle: "Thermal transfer supplies",
    description:
      "Ribbon support for thermal transfer overprinters used on film, flexible packaging, labels, and barcode applications.",
    examples: ["Wax/resin ribbons", "Ribbon width matching", "Printhead/ribbon issue review"],
    send: "TTO model, ribbon label, packaging material, print sample, speed/temperature if known.",
  },
  {
    title: "Parts and modules",
    subtitle: "Spare parts identification",
    description:
      "Help identifying parts before ordering replacements, especially when a photo or part number can prevent mismatch.",
    examples: ["Sensors and cables", "Printheads and modules", "Boards, pumps, and assemblies"],
    send: "Part number if known, machine model, clear photos, fault behavior, and urgency.",
  },
];

const intakeSteps = [
  {
    step: "01",
    title: "Send the current label",
    detail: "A photo of the ink, fluid, ribbon, filter, or part label is usually the fastest starting point.",
  },
  {
    step: "02",
    title: "Confirm the machine",
    detail: "Include printer brand, model, printer type, and whether the request is for reorder, matching, or troubleshooting.",
  },
  {
    step: "03",
    title: "Explain the application",
    detail: "Share what material is being marked, production speed if known, and whether print quality or downtime is involved.",
  },
  {
    step: "04",
    title: "Route the request",
    detail: "The request can be routed toward consumables, spare parts, PCB review, maintenance, or repair support.",
  },
];

const supplyNotes = [
  "Compatible product requests should be matched carefully by printer type and application.",
  "A low-cost consumable mismatch can create downtime, poor print quality, or avoidable service calls.",
  "For urgent line-down cases, send photos/video plus the current product label and fault message.",
];

export default function PartsFluidsConsumables() {
  return (
    <main className="siteShell consumablesPage" id="top">
      <section className="consumablesHero" aria-label="Parts fluids and consumables">
        <div className="consumablesHeroCopy">
          <span className="eyebrow">Parts / fluids / consumables</span>
          <h1>Industrial printer supplies routed with less guesswork.</h1>
          <p>
            D-Macht helps production teams organize requests for inks, make-up fluids, cleaning solutions, filters, TTO ribbons, spare parts, and replacement modules with clearer intake details.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#consumable-groups">
              View supply categories
            </a>
            <a className="button secondary" href="#supply-intake">
              What to send
            </a>
          </div>
        </div>

        <aside className="consumablesSignal" aria-label="Supply routing summary">
          <span>Supply routing</span>
          <strong>Send the label. Match the need. Reduce mistakes.</strong>
          <p>
            The best request includes machine model, printer type, current product label, material being marked, quantity needed, and whether the issue is urgent.
          </p>
          <div className="consumableSignalChips" aria-hidden>
            <b>Ink</b>
            <b>Fluids</b>
            <b>Filters</b>
            <b>Parts</b>
            <b>TTO</b>
          </div>
        </aside>
      </section>

      <section className="consumablesSection" id="consumable-groups" aria-label="Consumable categories">
        <div className="sectionIntro compact">
          <span className="eyebrow">Supply categories</span>
          <h2>Match the product to the printer, material, and production need.</h2>
          <p>
            These categories help customers explain what they need without needing to know every technical detail upfront.
          </p>
        </div>

        <div className="consumableGrid">
          {consumableGroups.map((group) => (
            <article className="consumableCard" key={group.title}>
              <div className="consumableCardTop">
                <span>{group.subtitle}</span>
                <h3>{group.title}</h3>
              </div>

              <p>{group.description}</p>

              <div className="consumableExamples">
                <small>Examples</small>
                <ul>
                  {group.examples.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="consumableSendBox">
                <small>Helpful details to send</small>
                <p>{group.send}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="consumablesSection consumablesSplit" id="supply-intake" aria-label="Supply request intake">
        <div className="consumableIntakePanel">
          <span className="eyebrow">Supply intake</span>
          <h2>What makes a parts or consumables request easier to fulfill?</h2>
          <div className="consumableSteps">
            {intakeSteps.map((item) => (
              <article className="consumableStep" key={item.step}>
                <b>{item.step}</b>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="consumableNotesPanel">
          <span>Important note</span>
          <strong>Compatibility matters.</strong>
          <ul>
            {supplyNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <a className="button primary" href="mailto:support@dmacht.com?subject=Parts%20/%20Fluids%20/%20Consumables%20Request">
            Send supply request
          </a>
        </aside>
      </section>
    </main>
  );
}
