import { pageMetadata } from "../../../lib/metadata";
import Image from "next/image";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import SectionHeading from "../../../components/SectionHeading";
import { photography } from "../../../data/photography";
import { brands, industries } from "../../../data/site";

export const metadata = pageMetadata(
  "/about",
  "About D-Macht | Industrial Coding & Marking Solutions",
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
          title="A repair company built around industrial coding equipment."
          copy="D-Macht is a Pune-based technical service business for industrial printers—combining field support, workshop repair, electronic diagnosis, parts, consumables and refurbished equipment."
          image="/brand/photography/dee-service.webp"
          imageAlt="Dee working with a screwdriver on an open industrial printer"
          imagePosition="65% center"
          secondaryLabel="Explore repair services"
          secondaryHref="/repair-service"
        />

        <section className="section container aboutStory">
          <div><Image className="aboutLogo" src="/brand/dmacht-logo.svg" alt="D-Macht — Industrial Coding & Marking Solutions. Quality, Reliability, Flexibility." width={1620} height={437} /><SectionHeading eyebrow="What we do" title="Hands-on technical work, clearly explained." copy="Plant managers and maintenance teams need a practical answer: what failed, what can be repaired, what part is needed and how to get production moving again." /></div>
          <div className="expertiseGrid">
            {expertise.map((item) => <article key={item.title}><h2>{item.title}</h2><p>{item.copy}</p></article>)}
          </div>
        </section>

        <section className="container applicationPhotoSection">
          <div className="applicationPhotoFrame"><Image src={photography.application.src} alt={photography.application.alt} fill sizes="(max-width: 640px) calc(100vw - 32px), 440px" /></div>
          <div><span className="eyebrow">On your production line</span><h2>Small codes. Essential information.</h2><p>Manufacturing dates, expiry dates and batch numbers on bottles, packaging and other production materials.</p></div>
        </section>
        <section className="aboutCoverage" id="brands">
          <div className="container coverageGrid">
            <div><span className="eyebrow">Brands commonly supported</span><div className="simpleNameList">{brands.map((brand) => <span key={brand}>{brand}</span>)}</div></div>
            <div id="industries"><span className="eyebrow">Production environments</span><div className="simpleNameList">{industries.map((industry) => <span key={industry}>{industry}</span>)}</div></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
