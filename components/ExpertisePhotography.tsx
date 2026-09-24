import Image from "next/image";
import Link from "next/link";
import { photography } from "../data/photography";
import SectionHeading from "./SectionHeading";

const expertise = [
  { title: "PCB Repair", photo: photography.pcb, href: "/repair-service#pcb-repair" },
  { title: "Printhead & Nozzle Service", photo: photography.nozzle, href: "/repair-service#repair-capabilities" },
  { title: "Spare Parts & Consumables", photo: photography.parts, href: "/parts-consumables#categories" },
  { title: "Field Service", photo: photography.field, href: "/repair-service#field-service" },
];

export default function ExpertisePhotography() {
  return (
    <section className="section container expertisePhotography" aria-labelledby="expertise-heading">
      <div id="expertise-heading"><SectionHeading eyebrow="Repair work" title="Industrial printer expertise." /></div>
      <div className="expertisePhotoGrid">
        {expertise.map(({ title, photo, href }) => (
          <Link className="expertisePhotoCard" href={href} key={title}>
            <div className="expertisePhotoFrame"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 860px) 45vw, 280px" /></div>
            <h3>{title}<span aria-hidden="true">↗</span></h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
