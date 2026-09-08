import type { Metadata } from "next";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import SectionHeading from "../../../components/SectionHeading";
import ServiceRequest from "../../../components/ServiceRequest";

export const metadata: Metadata = {
  title: "Refurbished Industrial Printers",
  description: "Ask about serviced, tested and production-ready refurbished industrial coding printers from D-Macht.",
};

const preparation = [
  ["Inspect", "Machine condition and configuration are checked."],
  ["Diagnose", "Faults and wear items are identified."],
  ["Repair", "Required assemblies and components are serviced."],
  ["Clean", "Ink system and cabinet are prepared."],
  ["Test", "Print operation and key functions are verified."],
  ["Prepare", "The printer is readied for its intended application."],
];

export default function RefurbishedPrintersPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Refurbished printers"
          title="Serviced industrial coding equipment, ready for a second life."
          copy="D-Macht inspects, repairs and tests refurbished industrial printers before they are prepared for production use. Available models and configurations change."
          image="/brand/refurbished-printers-v2.png"
          imageAlt="Two refurbished industrial coding printers being inspected in a service workshop"
          primaryLabel="Ask about available printers"
          primaryHref="#request"
          secondaryLabel="How equipment is prepared"
          secondaryHref="#preparation"
        />

        <section className="section container" id="preparation">
          <SectionHeading eyebrow="Workshop preparation" title="More than a cleaned cabinet." copy="Each available unit is considered as industrial equipment: condition, repair work, configuration and application all matter." />
          <div className="preparationSteps">
            {preparation.map(([title, copy], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{copy}</p></article>
            ))}
          </div>
        </section>

        <section className="stockBand">
          <div className="container stockGrid">
            <div><span className="eyebrow light">Available stock</span><h2>Tell us what the printer needs to do.</h2></div>
            <p>Share your current printer type, substrate, code requirements, line speed, installation location and preferred timeline. D-Macht can then discuss suitable available equipment.</p>
          </div>
        </section>

        <div className="container requestWrap"><ServiceRequest variant="refurbished" /></div>
      </main>
      <Footer />
    </>
  );
}
