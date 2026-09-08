import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import SectionHeading from "../../../components/SectionHeading";
import ServiceRequest from "../../../components/ServiceRequest";

export const metadata: Metadata = {
  title: "New & Refurbished Industrial Printers",
  description: "Ask about new and workshop-refurbished CIJ, TIJ and DOD industrial coding printers from D-Macht.",
};

const printerOptions = [
  {
    id: "new",
    title: "New Industrial Printers",
    image: "/brand/refurbished-printers-v2.png",
    imageAlt: "Industrial coding printers prepared for application matching",
    brand: "Multi-brand sourcing",
    model: "Matched to your application",
    condition: "New",
    specification: "CIJ, TIJ or DOD equipment selected around substrate, code, line speed and environment.",
    availability: "Sourced to requirement",
  },
  {
    id: "refurbished",
    title: "Refurbished CIJ Printers",
    image: "/brand/workshop-hero-v2.png",
    imageAlt: "Technician inspecting an industrial coding printer in the D-Macht workshop",
    brand: "Major supported brands",
    model: "Current workshop stock",
    condition: "Inspected and refurbished",
    specification: "Industrial coding units assessed, repaired, cleaned and function-tested before supply.",
    availability: "Stock changes regularly",
  },
  {
    id: "replacement",
    title: "Replacement Printer",
    image: "/brand/pcb-workbench-v2.png",
    imageAlt: "Industrial printer electronics and components on a repair bench",
    brand: "Application-led selection",
    model: "Confirmed after technical review",
    condition: "New or refurbished",
    specification: "A practical route when the current printer is obsolete, uneconomical to repair or unavailable.",
    availability: "Recommended on inquiry",
  },
];

export default function PrintersPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Industrial printers"
          title="New and refurbished printers for real production lines."
          copy="Browse the available buying paths, then tell D-Macht what you print, the line conditions and when you need the equipment."
          image="/brand/refurbished-printers-v2.png"
          imageAlt="Industrial coding printers being inspected in a bright service workshop"
          primaryLabel="Browse printer options"
          primaryHref="#inventory"
          secondaryLabel="Ask about a printer"
          secondaryHref="#request"
        />

        <section className="section container" id="inventory">
          <SectionHeading
            eyebrow="Printer sales"
            title="Start with the condition you need."
            copy="This is industrial equipment, not consumer ecommerce. D-Macht confirms application fit, condition and availability before quoting."
          />

          <div className="printerInventoryGrid">
            {printerOptions.map((printer) => (
              <article className="printerCard" id={printer.id} key={printer.title}>
                <div className="printerCardImage">
                  <Image src={printer.image} alt={printer.imageAlt} fill sizes="(max-width: 860px) 100vw, 33vw" />
                  <span>{printer.condition}</span>
                </div>
                <div className="printerCardBody">
                  <p>{printer.brand}</p>
                  <h2>{printer.title}</h2>
                  <dl>
                    <div><dt>Model</dt><dd>{printer.model}</dd></div>
                    <div><dt>Specification</dt><dd>{printer.specification}</dd></div>
                    <div><dt>Availability</dt><dd><CircleCheck size={16} aria-hidden="true" /> {printer.availability}</dd></div>
                  </dl>
                  <Link className="printerCardCta" href="#request">Request Price / Ask About This Printer <ArrowRight size={18} aria-hidden="true" /></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="printerProcess">
          <div className="container printerProcessGrid">
            <div><span>01</span><strong>Share the application</strong><p>Substrate, code, line speed and environment.</p></div>
            <div><span>02</span><strong>Confirm the equipment</strong><p>Brand, model, configuration and condition.</p></div>
            <div><span>03</span><strong>Receive availability and price</strong><p>A direct equipment proposal for your requirement.</p></div>
          </div>
        </section>

        <div className="container requestWrap" id="printer-inquiry"><ServiceRequest variant="printers" /></div>
      </main>
      <Footer />
    </>
  );
}
