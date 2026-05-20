import Image from "next/image";

const printerTypes = [
  {
    code: "CIJ",
    name: "Continuous inkjet",
    bestFor: "High-speed production lines, batch coding, expiry dates, and curved or uneven surfaces.",
    commonIssues: [
      "Poor print quality or missing characters",
      "Nozzle blockage, ink pressure, or gutter faults",
      "Make-up fluid, viscosity, or filter-related problems",
    ],
    send: "Printer brand/model, error code, print sample photo, current ink/fluid label, and whether the line is stopped.",
  },
  {
    code: "TIJ",
    name: "Thermal inkjet",
    bestFor: "Clean, compact coding on cartons, labels, packaging, and porous or semi-porous materials.",
    commonIssues: [
      "Weak or streaky print output",
      "Cartridge recognition or contact issues",
      "Incorrect setup, substrate mismatch, or dry cartridge behavior",
    ],
    send: "Printer model, cartridge details, substrate/photo sample, message layout, and recent changes to setup.",
  },
  {
    code: "DOD",
    name: "Drop-on-demand",
    bestFor: "Larger character marking, industrial packaging, cartons, pipes, drums, and secondary packaging.",
    commonIssues: [
      "Uneven drops or inconsistent character shape",
      "Valve, printhead, or fluid delivery issues",
      "Alignment, height, or distance-related print problems",
    ],
    send: "Printer model, printhead photos, print sample, fluid details, and the application surface/material.",
  },
  {
    code: "Laser",
    name: "Laser marking systems",
    bestFor: "Permanent marking, high-speed coding, serialized marks, and applications where inks or fluids are not ideal.",
    commonIssues: [
      "Weak mark, poor contrast, or inconsistent burn",
      "Lens, focus, alignment, or extraction-related problems",
      "Controller, interlock, or production line integration issues",
    ],
    send: "Laser model, material being marked, photo of the mark, lens/focus notes, and any safety/interlock errors.",
  },
  {
    code: "TTO",
    name: "Thermal transfer overprinter",
    bestFor: "Flexible packaging, films, labels, barcodes, date codes, and high-resolution packaging marks.",
    commonIssues: [
      "Ribbon wrinkles, breaks, or poor transfer",
      "Printhead wear, pressure, temperature, or speed mismatch",
      "Barcode clarity, registration, or intermittent print faults",
    ],
    send: "Printer model, ribbon type, packaging material, print sample, current speed/temperature if known, and fault photos.",
  },
];

const comparisonRows = [
  {
    label: "Best when you need speed",
    value: "CIJ, Laser, and TTO are common fits depending on material and line setup.",
  },
  {
    label: "Best when you need clean carton or label coding",
    value: "TIJ is often a practical fit for simple, clean, compact marks.",
  },
  {
    label: "Best when you need large character marks",
    value: "DOD is commonly used for larger industrial marks on cartons, drums, pipes, and secondary packaging.",
  },
  {
    label: "Best when ink is not ideal",
    value: "Laser may be a better fit when permanent, fluid-free marking is needed.",
  },
];

export default function PrinterTypesSupported() {
  return (
    <main className="siteShell printerTypesPage" id="top">
      <section className="printerTypesHero" aria-label="Printer types supported">
        <div className="printerTypesHeroCopy">
          <span className="eyebrow">Printer types supported</span>
          <h1>Support for CIJ, TIJ, DOD, laser, and TTO systems.</h1>
          <p>
            D-Macht helps route coding and marking requests by printer type, application, symptoms, and urgency — so operators do not need to diagnose the failure before asking for help.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#printer-types">
              Compare printer types
            </a>
            <a className="button secondary" href="#what-to-send">
              What to send
            </a>
          </div>
        </div>

        <aside className="printerTypesSignal" aria-label="Printer type summary">
          <span>Service routing</span>
          <strong>Different machines. One clearer intake flow.</strong>
          <p>
            Send the printer type, model, symptoms, photos, and production impact. D-Macht can route the request toward repair, maintenance, consumables, PCB review, parts, or sourcing.
          </p>
          <div className="printerTypeCodeRail" aria-hidden>
            {printerTypes.map((type) => (
              <b key={type.code}>{type.code}</b>
            ))}
          </div>
        </aside>
      </section>

      <section className="pageVisualSection" aria-label="Printer types supported visual">
        <div className="pageVisualFrame is-printer-types">
          <Image
            src="/brand/printer-types-supported.png"
            alt="D-Macht industrial coding and marking printer types including CIJ TIJ DOD laser and TTO systems"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 1200px"
            className="pageVisualImage"
          />
          <div className="pageVisualCaption">
            <div>
              <strong>CIJ, TIJ, DOD, laser, and TTO support in one intake flow.</strong>
              <span>Match the printer type, symptoms, material, and production impact before routing support.</span>
            </div>
            <b className="pageVisualBadge">Printer types</b>
          </div>
        </div>
      </section>

      <section className="printerTypesSection" id="printer-types" aria-label="Supported printer type cards">
        <div className="sectionIntro compact">
          <span className="eyebrow">Equipment families</span>
          <h2>Choose the closest printer type.</h2>
          <p>
            The exact brand can vary, but these are the main coding and marking environments D-Macht can help organize into a clear support request.
          </p>
        </div>

        <div className="printerTypeGrid">
          {printerTypes.map((type) => (
            <article className="printerTypeCard" key={type.code}>
              <div className="printerTypeTopline">
                <span>{type.code}</span>
                <b>{type.name}</b>
              </div>

              <p className="printerTypeBestFor">{type.bestFor}</p>

              <div className="printerTypeIssueBox">
                <small>Common issues</small>
                <ul>
                  {type.commonIssues.map((issue) => (
                    <li key={issue}>{issue}</li>
                  ))}
                </ul>
              </div>

              <div className="printerTypeSendBox">
                <small>Helpful details to send</small>
                <p>{type.send}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="printerTypesSection printerTypeSplit" aria-label="Printer type comparison and intake guidance">
        <div className="printerComparePanel">
          <span className="eyebrow">Quick comparison</span>
          <h2>Not sure which type you have?</h2>
          <div className="printerCompareRows">
            {comparisonRows.map((row) => (
              <div className="printerCompareRow" key={row.label}>
                <strong>{row.label}</strong>
                <p>{row.value}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="printerIntakePanel" id="what-to-send">
          <span>What to send</span>
          <strong>A few photos can save a lot of back-and-forth.</strong>
          <ul>
            <li>Printer brand, model, and type if known</li>
            <li>Error code, warning screen, or fault message</li>
            <li>Photo/video of the print issue or machine behavior</li>
            <li>Ink, fluid, ribbon, or consumable label if relevant</li>
            <li>Location and whether production is stopped</li>
          </ul>
          <a className="button primary" href="mailto:support@dmacht.com?subject=Printer%20Type%20Support%20Request">
            Send printer details
          </a>
        </aside>
      </section>
    </main>
  );
}
