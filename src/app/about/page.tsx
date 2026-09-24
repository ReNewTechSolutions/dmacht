import { pageMetadata } from "../../../lib/metadata";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import { photography } from "../../../data/photography";
import { brands } from "../../../data/site";

export const metadata = pageMetadata(
  "/about",
  "About D-Macht | Industrial Printer Specialists in Pune",
  "D-Macht provides industrial printer repair, maintenance, PCB repair, spare parts, consumables and new and refurbished coding printers in Pune.",
);

const capabilities = [
  { title: "Printer Repair", copy: "CIJ, TIJ and DOD service.", image: photography.field, href: "/repair-service" },
  { title: "PCB Repair", copy: "Component-level diagnostics and repair.", image: photography.pcb, href: "/repair-service#pcb-repair" },
  { title: "Parts & Consumables", copy: "Printer components, inks and make-up solvents.", image: photography.fluids, href: "/parts-consumables" },
  { title: "New & Refurbished Printers", copy: "Industrial coding equipment for production.", image: { src: "/brand/photography/printers-workshop.webp", alt: "Industrial coding printer cabinets on a workshop bench" }, href: "/printers" },
];

export default function AboutPage() {
  return <>
    <main>
      <section className="container aboutIntro">
        <div>
          <span className="eyebrow">About D-Macht</span>
          <h1>Industrial Printer Specialists in Pune</h1>
          <p>D-Macht provides repair, maintenance, spare parts, consumables, and new and refurbished industrial coding printers.</p>
          <Link className="button primary" href="/repair-service#request">Request Service</Link>
        </div>
        <figure>
          <Image src={photography.field.src} alt="Dee servicing coding equipment beside a bottle production line" width={1200} height={800} preload sizes="(max-width: 860px) calc(100vw - 48px), 590px" />
          <figcaption>Dee, Founder &amp; Lead Technician</figcaption>
        </figure>
      </section>

      <section className="container aboutServiceStory" aria-labelledby="about-story-title">
        <h2 id="about-story-title">Built Around Hands-On Service</h2>
        <div>
          <p>D-Macht is a Pune-based industrial coding and marking company. We repair industrial inkjet printers and supply the parts, consumables and equipment that keep production lines running.</p>
          <p>Our work covers CIJ, TIJ and DOD systems, PCB and ink-system repair, printhead and nozzle problems, preventive maintenance and breakdown support.</p>
        </div>
      </section>

      <section className="container aboutCapabilities" aria-labelledby="about-capabilities-title">
        <h2 id="about-capabilities-title">What We Do</h2>
        <div className="aboutCapabilityRow">{capabilities.map((item) => <Link className="aboutCapability" key={item.title} href={item.href}>
          <div className="aboutCapabilityPhoto"><Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 640px) 108px, (max-width: 860px) 44vw, 275px" /></div>
          <div><h3>{item.title}</h3><p>{item.copy}</p></div>
        </Link>)}</div>
        <div className="aboutExperience" id="brands">
          <p>Experience across major industrial coding systems and production environments.</p>
          <p className="aboutBrandNames">{brands.join(" · ")}</p>
          <Link className="textLink" id="industries" href="/industries">View Industries →</Link>
        </div>
      </section>

      <section className="aboutNextStep" aria-labelledby="about-cta-title">
        <div className="container">
          <h2 id="about-cta-title">Need Help With Your Printer?</h2>
          <p>Tell us what printer you have and what is happening.</p>
          <div className="aboutNextActions">
            <Link className="button primary" href="/repair-service#request">Request Service</Link>
            <Link className="textLink" href="/parts-consumables">Find Spare Parts →</Link>
            <Link className="textLink" href="/printers">View Printers →</Link>
          </div>
        </div>
      </section>
    </main>
    <Footer showCta={false} />
  </>;
}
