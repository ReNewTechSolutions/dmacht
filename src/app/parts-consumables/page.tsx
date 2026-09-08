import type { Metadata } from "next";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import SectionHeading from "../../../components/SectionHeading";
import ServiceRequest from "../../../components/ServiceRequest";

export const metadata: Metadata = {
  title: "Industrial Printer Parts & Consumables",
  description: "Request pumps, filters, printheads, PCBs, ink, make-up fluid and industrial printer components by model, part number or photo.",
};

const requestPaths = [
  { title: "I need a part", copy: "Use the printer brand, model or part number. Add a clear photo to prevent a mismatch.", action: "Start a parts request" },
  { title: "I need ink / make-up fluid", copy: "Send the printer model and a photo of the current ink, make-up or cleaner label.", action: "Request consumables" },
  { title: "I don’t know what I need", copy: "Show us the component and where it fits. D-Macht can help identify it.", action: "Upload a photo" },
];

const categories = ["Power supplies", "Pumps", "Filters", "Printheads", "Head assemblies", "Nozzle blocks", "Keypads", "Displays", "Sensors", "PCBs", "Ink core assemblies", "Ink", "Make-up fluid", "Cleaners", "Other components"];

export default function PartsConsumablesPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Parts & consumables"
          title="The right part starts with the right details."
          copy="Request industrial printer components, ink and fluids by brand, model, part number or photo. If you are unsure, D-Macht can help identify the item."
          image="/brand/parts-bench-v2.png"
          imageAlt="Industrial printer pumps filters printheads electronics and fluid bottles"
          primaryLabel="Start an inquiry"
          primaryHref="#parts-inquiry"
          secondaryLabel="View categories"
          secondaryHref="#categories"
        />

        <section className="section container">
          <SectionHeading eyebrow="Choose a starting point" title="No vague catalogue. Three direct ways to ask." />
          <div className="requestPathGrid">
            {requestPaths.map((path, index) => (
              <article key={path.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{path.title}</h2><p>{path.copy}</p>
                <a className="textLink" href="#parts-inquiry">{path.action} <span aria-hidden="true">→</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="partsCategorySection" id="categories">
          <div className="container partsCategoryGrid">
            <SectionHeading eyebrow="What we can source" title="Parts inside the printer, plus fluids it needs to run." copy="Availability and compatibility vary by brand and model. A photo or current label helps confirm the correct item." />
            <div className="categoryList">{categories.map((category) => <span key={category}>{category}</span>)}</div>
          </div>
        </section>

        <div className="container requestWrap" id="parts-inquiry"><ServiceRequest variant="parts" /></div>
      </main>
      <Footer />
    </>
  );
}
