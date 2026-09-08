import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

const services = [
  {
    title: "Printer repair",
    copy: "Breakdowns, error codes, print-quality issues, mechanical faults and electrical faults.",
    href: "/repair-service",
    image: "/brand/workshop-hero-v2.png",
    alt: "Open industrial printer undergoing workshop repair",
  },
  {
    title: "PCB & electronic repair",
    copy: "Chip-level diagnostics, board repair and component-level electronics work.",
    href: "/repair-service#pcb-repair",
    image: "/brand/pcb-workbench-v2.png",
    alt: "Industrial printer circuit board being repaired under magnification",
  },
  {
    title: "Parts & consumables",
    copy: "Filters, pumps, nozzles, printheads, ink, make-up fluid and replacement components.",
    href: "/parts-consumables",
    image: "/brand/parts-bench-v2.png",
    alt: "Industrial printer parts and consumables on a service bench",
  },
  {
    title: "Refurbished printers",
    copy: "Industrial coding equipment rebuilt, tested and prepared for production.",
    href: "/refurbished-printers",
    image: "/brand/refurbished-printers-v2.png",
    alt: "Refurbished industrial coding printers being tested in a workshop",
  },
];

export default function ServiceChoices() {
  return (
    <section className="section container" id="services">
      <SectionHeading
        eyebrow="What do you need?"
        title="Start with the job that needs doing."
        copy="Four clear ways D-Macht can help your production team get the printer—and the line—working again."
      />
      <div className="serviceChoiceGrid">
        {services.map((service) => (
          <article className="serviceChoice" key={service.title}>
            <div className="serviceChoiceImage">
              <Image src={service.image} alt={service.alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
            </div>
            <div className="serviceChoiceCopy">
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <Link className="textLink" href={service.href}>View service <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
