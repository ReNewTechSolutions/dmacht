import { pageMetadata } from "../../../lib/metadata";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import SectionHeading from "../../../components/SectionHeading";
import { brands } from "../../../data/site";

export const metadata = pageMetadata(
  "/about",
  "About D-Macht",
  "Meet D-Macht, Pune-based specialists in industrial printer service, PCB repair, spare parts, consumables, and new and refurbished coding equipment.",
);

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
          title="About D-Macht"
          copy="Based in Pune, D-Macht repairs industrial coding printers, supplies parts and consumables, and sells new and refurbished equipment."
          image="/brand/photography/dee-service.webp"
          imageAlt="Dee working with a screwdriver on an open industrial printer"
          imagePosition="65% center"
          secondaryLabel="Find Spare Parts"
          secondaryHref="/parts-consumables"
        />

        <section className="section container aboutStory">
          <div><Image className="aboutLogo" src="/brand/dmacht-logo.svg" alt="D-Macht, Industrial Coding & Marking Solutions. Quality, Reliability, Flexibility." width={1620} height={437} /><SectionHeading eyebrow="What we do" title="Repair. Parts. Printers." copy="Dee, founder and lead technician, works on industrial printer faults and component repair." /></div>
          <div className="expertiseGrid">
            {expertise.map((item) => <article key={item.title}><h2>{item.title}</h2><p>{item.copy}</p></article>)}
          </div>
        </section>

        <section className="aboutCoverage" id="brands">
          <div className="container coverageGrid">
            <div><span className="eyebrow">Brands commonly supported</span><div className="simpleNameList">{brands.map((brand) => <span key={brand}>{brand}</span>)}</div></div>
            <div id="industries"><span className="eyebrow">Production environments</span><p>Food, beverage, dairy, packaging and manufacturing applications.</p><Link className="textLink" href="/industries">View All Industries →</Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
