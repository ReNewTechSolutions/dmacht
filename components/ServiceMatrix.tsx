import Image from "next/image";

const services = [
  {
    title: "Printer repair",
    tag: "Breakdown support",
    desc: "Faults, error codes, print quality issues, sensor problems, and production interruptions.",
    bestFor: "Line-down issues, repeat faults, visible print defects",
  },
  {
    title: "Preventive maintenance",
    tag: "AMC planning",
    desc: "Planned service, inspection checklists, operator guidance, and recurring maintenance support.",
    bestFor: "Plants that want fewer surprise failures",
  },
  {
    title: "PCB repair",
    tag: "Repair lab",
    desc: "Board-related symptoms, chip-level repair review, visible damage checks, and repair routing.",
    bestFor: "Power, board, display, or control symptoms",
  },
  {
    title: "Ink, fluids & consumables",
    tag: "Supply support",
    desc: "Ink, make-up fluid, consumable matching, printer compatibility, and reorder planning.",
    bestFor: "Ink matching, make-up fluid, filters, and routine supply needs",
  },
  {
    title: "Spare parts",
    tag: "Parts request",
    desc: "Part identification, replacement planning, model matching, and sourcing coordination.",
    bestFor: "Known part numbers, photos, or machine model requests",
  },
  {
    title: "Refurbished printers",
    tag: "Equipment sourcing",
    desc: "Refurbished unit inquiries, backup printer planning, replacement options, and availability checks.",
    bestFor: "Replacement planning, backup units, and budget-conscious upgrades",
  },
];

export default function ServiceMatrix() {
  return (
    <section className="servicesSection" id="services">
      <div className="sectionIntro">
        <span className="eyebrow">Service matrix</span>
        <h2>What do you need help with?</h2>
        <p>
          Choose the closest service need. D-Macht can route the details from there, even if the issue is not fully diagnosed yet.
        </p>
      </div>

      <div className="serviceGrid">
        {services.map((service) => (
          <article className="serviceCard" key={service.title}>
            <span>{service.tag}</span>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <div className="serviceBestFor">
              <small>Best for</small>
              <strong>{service.bestFor}</strong>
            </div>
          </article>
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
