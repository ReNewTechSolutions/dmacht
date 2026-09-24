import { pageMetadata } from "../../../lib/metadata";
import Image from "next/image";
import { photography } from "../../../data/photography";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import SectionHeading from "../../../components/SectionHeading";
import ServiceRequest from "../../../components/ServiceRequest";

export const metadata = pageMetadata(
  "/repair-service",
  "Industrial Printer Repair & Service | D-Macht",
  "Book CIJ, TIJ and DOD printer service in Pune. D-Macht offers PCB and chip-level repair, Ink Core Assembly repair, nozzle diagnosis, maintenance and AMC options.",
);

const repairServices = [
  { photo: photography.diagnostics, title: "Breakdown repair", problem: "Printer stopped, error code shown or production line down.", repair: "Fault diagnosis across ink, electrical, mechanical, sensor and control systems." },
  { photo: photography.pcb, title: "PCB & chip-level repair", problem: "No power, boot failure, blank display or intermittent control fault.", repair: "Board-level diagnosis and component repair before expensive module replacement." },
  { photo: photography.inkSystem, title: "Ink Core Assembly repair", problem: "Pressure, viscosity, circulation, mixing or fluid-recognition faults.", repair: "Pumps, filters, valves, tubing, sensors and complete ink core assemblies." },
  { photo: photography.nozzle, title: "Printhead & nozzle repair", problem: "Weak print, missing dots, unstable jet, blockage or ink leakage.", repair: "Nozzles, valves, head assemblies, alignment, cleaning and print-quality diagnosis." },
  { photo: photography.electronics, title: "Electrical / electronic faults", problem: "Power supply, keypad, display, sensor or communication failure.", repair: "Testing and repair of electrical assemblies, wiring, connectors and control components." },
  { photo: photography.field, title: "Field service", problem: "The printer needs diagnosis on the production line.", repair: "On-site assessment, fault isolation, repair planning and technical support from Pune." },
];

const printerTypes = ["CIJ continuous inkjet", "TIJ thermal inkjet", "DOD drop-on-demand", "Coding & marking systems"];

export default function RepairServicePage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Repair & service"
          title="Printer Repair & Service"
          copy="CIJ, TIJ and DOD repair, PCB diagnosis and preventive maintenance. Workshop and field support from Pune."
          image="/brand/photography/dee-service.webp"
          imageAlt="Dee working with a screwdriver on an open industrial printer"
          imagePosition="65% center"
          primaryLabel="Request Service"
          primaryHref="#request"
          secondaryLabel="View Repair Services"
          secondaryHref="#repair-capabilities"
        />

        <section className="section container" id="repair-capabilities">
          <SectionHeading eyebrow="Common repair work" title="What needs repair?" />
          <div className="repairServiceGrid">
            {repairServices.map((service) => (
              <article id={service.title === "PCB & chip-level repair" ? "pcb-repair" : service.title === "Field service" ? "field-service" : undefined} key={service.title}>
                {service.photo && <div className="servicePhotoFrame"><Image src={service.photo.src} alt={service.photo.alt} fill sizes="(max-width: 640px) calc(100vw - 32px), 380px" /></div>}
                <h3>{service.title}</h3>
                <p>{service.problem}</p>
                <p>{service.repair}</p>
                <a className="textLink" href="#request">Request Service <span aria-hidden="true">→</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="equipmentBand" id="printer-types">
          <div className="container equipmentGrid">
            <div>
              <span className="eyebrow light">Supported systems</span>
              <h2>Supported printer types</h2>
            </div>
            <div>{printerTypes.map((type) => <span key={type}>{type}</span>)}</div>
          </div>
        </section>

        <section className="section container" id="maintenance">
          <SectionHeading eyebrow="Preventive maintenance" title="Maintenance & AMC" copy="Routine cleaning, inspection, filter changes and fluid checks. Choose one-off service or discuss a Basic, Standard or Comprehensive Annual Maintenance Contract (AMC). Scope and pricing are confirmed in your quotation." />
          <a className="textLink" href="#request">Request Service →</a>
        </section>
        <div className="container requestWrap"><ServiceRequest /></div>
      </main>
      <Footer />
    </>
  );
}
