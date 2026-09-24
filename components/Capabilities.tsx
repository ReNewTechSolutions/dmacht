import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

const capabilities = [
  ["01", "PCB repair", "Controllers, power boards, displays and component-level faults."],
  ["02", "Printhead / nozzle repair", "Blocked nozzles, unstable jets, valves and head assemblies."],
  ["03", "Ink system service", "Pumps, filters, ink cores, tubing and pressure or flow faults."],
  ["04", "Field service", "On-site breakdown diagnosis and planned technical support."],
  ["05", "Refurbished equipment", "Serviced and tested coding equipment for production use."],
  ["06", "Spare parts", "Identification and supply by brand, model, photo or part number."],
];

export default function Capabilities() {
  return (
    <section className="section container capabilitySection">
      <div className="capabilityVisual">
        <Image
          src="/brand/photography/diagnostics.webp"
          alt="Technician carrying out component-level repair on an industrial printer PCB"
          fill
          sizes="(max-width: 860px) 100vw, 46vw"
        />
        <div className="visualCaption">Component-level repair in the D-Macht workshop</div>
      </div>
      <div>
        <SectionHeading
          eyebrow="Repair capabilities"
          title="We repair the machine—and the parts inside it."
          copy="Practical fault finding across the ink system, electronics, printhead and complete coding unit."
        />
        <div className="capabilityList">
          {capabilities.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
        <Link className="textLink" href="/repair-service">See all repair services <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
