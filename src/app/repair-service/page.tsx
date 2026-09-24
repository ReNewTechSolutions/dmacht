import type { Metadata } from "next";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import SectionHeading from "../../../components/SectionHeading";
import ServiceRequest from "../../../components/ServiceRequest";

export const metadata: Metadata = {
  title: "Industrial Printer Repair & Service",
  description: "Breakdown repair, preventive maintenance, PCB repair and field service for CIJ, TIJ and DOD industrial printers.",
};

const repairServices = [
  { title: "Breakdown repair", problem: "Printer stopped, error code shown or production line down.", repair: "Fault diagnosis across ink, electrical, mechanical, sensor and control systems." },
  { title: "Preventive maintenance", problem: "Repeat faults, declining print quality or overdue service.", repair: "Cleaning, inspection, filter and wear-part replacement, fluid and system checks." },
  { title: "Specialized PCB / chip-level repair", problem: "No power, boot failure, blank display or intermittent control fault.", repair: "Board-level diagnosis and component repair before expensive module replacement." },
  { title: "Ink Core Assembly repair", problem: "Pressure, viscosity, circulation, mixing or fluid-recognition faults.", repair: "Pumps, filters, valves, tubing, sensors and complete ink core assemblies." },
  { title: "Printhead / nozzle problems", problem: "Weak print, missing dots, unstable jet, blockage or ink leakage.", repair: "Nozzles, valves, head assemblies, alignment, cleaning and print-quality diagnosis." },
  { title: "Electrical / electronic faults", problem: "Power supply, keypad, display, sensor or communication failure.", repair: "Testing and repair of electrical assemblies, wiring, connectors and control components." },
  { title: "Field service", problem: "The printer needs diagnosis on the production line.", repair: "On-site assessment, fault isolation, repair planning and technical support from Pune." },
  { title: "Annual Maintenance Contracts", problem: "Multiple printers need a planned service schedule.", repair: "Routine visits, preventive work, service records and replacement-parts planning." },
];

const printerTypes = ["CIJ continuous inkjet", "TIJ thermal inkjet", "DOD drop-on-demand", "Coding & marking systems"];

export default function RepairServicePage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Repair & service"
          title="Industrial printer faults diagnosed and repaired."
          copy="From a blocked nozzle to a failed controller board, D-Macht works on the complete coding system—with workshop and field support from Pune."
          image="/brand/workshop-hero-v2.png"
          imageAlt="Technician repairing an open industrial coding printer"
          primaryLabel="Book Service"
          primaryHref="#request"
          secondaryLabel="See repair capabilities"
          secondaryHref="#repair-capabilities"
        />

        <section className="section container" id="repair-capabilities">
          <SectionHeading eyebrow="Common repair work" title="Start with the problem you can see." copy="You do not need to diagnose the cause before contacting D-Macht. Share the symptom, machine details and production impact." />
          <div className="repairServiceGrid">
            {repairServices.map((service, index) => (
              <article id={service.title === "Specialized PCB / chip-level repair" ? "pcb-repair" : undefined} key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{service.title}</h2>
                <p><strong>Typical problem:</strong> {service.problem}</p>
                <p><strong>What we repair:</strong> {service.repair}</p>
                <a className="textLink" href="#request">Request this service <span aria-hidden="true">→</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="equipmentBand" id="printer-types">
          <div className="container equipmentGrid">
            <div>
              <span className="eyebrow light">Supported systems</span>
              <h2>Industrial coding equipment, not office printers.</h2>
            </div>
            <div>{printerTypes.map((type) => <span key={type}>{type}</span>)}</div>
          </div>
        </section>

        <section className="section container" id="maintenance">
          <SectionHeading eyebrow="Maintenance & paid service" title="Plan ongoing care or request a one-off repair." copy="Choose breakdown maintenance when a fault stops production, or preventive maintenance to plan routine care. D-Macht also offers paid service and Annual Maintenance Contracts." />
          <div className="maintenanceOptions">{["Basic AMC", "Standard AMC", "Comprehensive AMC"].map((plan) => <article key={plan}><h3>{plan}</h3><p>Discuss your equipment, service schedule and required coverage. Scope and pricing are confirmed in your quotation.</p><a className="textLink" href="#request">Ask about {plan} →</a></article>)}</div>
        </section>
        <div className="container requestWrap"><ServiceRequest /></div>
      </main>
      <Footer />
    </>
  );
}
