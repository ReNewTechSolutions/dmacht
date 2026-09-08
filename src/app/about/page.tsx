import type { Metadata } from "next";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import SectionHeading from "../../../components/SectionHeading";
import { brands, industries } from "../../../data/site";

export const metadata: Metadata = {
  title: "About D-Macht",
  description: "Pune-based specialists in industrial printer repair, PCB diagnostics, maintenance, parts and refurbished coding equipment.",
};

const expertise = [
  { title: "Complete printer service", copy: "Fault finding across the ink system, printhead, electronics, controls and mechanical assemblies." },
  { title: "Component-level repair", copy: "PCB and module diagnosis intended to repair viable equipment before replacing expensive assemblies." },
  { title: "Parts and fluids", copy: "Practical identification and supply support using model details, part numbers, labels and photos." },
];

export default function AboutPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="About D-Macht"
          title="A repair company built around industrial coding equipment."
          copy="D-Macht is a Pune-based technical service business for industrial printers—combining field support, workshop repair, electronic diagnosis, parts, consumables and refurbished equipment."
          image="/brand/pcb-workbench-v2.png"
          imageAlt="Component-level industrial printer circuit board repair"
          secondaryLabel="Explore repair services"
          secondaryHref="/repair-service"
        />

        <section className="section container aboutStory">
          <SectionHeading eyebrow="What we do" title="Hands-on technical work, clearly explained." copy="Plant managers and maintenance teams need a practical answer: what failed, what can be repaired, what part is needed and how to get production moving again." />
          <div className="expertiseGrid">
            {expertise.map((item) => <article key={item.title}><h2>{item.title}</h2><p>{item.copy}</p></article>)}
          </div>
        </section>

        <section className="aboutCoverage" id="brands">
          <div className="container coverageGrid">
            <div><span className="eyebrow">Brands commonly supported</span><div className="simpleNameList">{brands.map((brand) => <span key={brand}>{brand}</span>)}</div></div>
            <div><span className="eyebrow">Production environments</span><div className="simpleNameList">{industries.map((industry) => <span key={industry}>{industry}</span>)}</div></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
