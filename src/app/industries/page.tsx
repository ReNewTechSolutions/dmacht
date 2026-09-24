import Image from "next/image";
import Link from "next/link";
import Footer from "../../../components/Footer";
import { productionEnvironments, industrySupport } from "../../../data/industries";
import { pageMetadata } from "../../../lib/metadata";

export const metadata = pageMetadata(
  "/industries",
  "Industrial Coding Applications | D-Macht",
  "Industrial coding and marking support across food, beverage, dairy and manufacturing: printer service, spare parts, consumables and equipment from D-Macht in Pune.",
);

export default function IndustriesPage() {
  return <>
    <main>
      <header className="container industriesIntro">
        <span className="eyebrow">Industries we serve</span>
        <h1>Industrial Coding Applications</h1>
        <p>Printer service, parts and equipment for your product and production line.</p>
        <span className="industryImageNote">Illustrative application imagery.</span>
      </header>
      <section className="container industryGrid" aria-label="Production environments">
        {productionEnvironments.map((environment) => <article className="industryCard" id={environment.id} key={environment.id}>
          <div className="industryPhoto"><Image src={`/brand/photography/industries/${environment.id}.webp`} alt={environment.alt} fill loading={environment.id === "food-packaging" ? "eager" : "lazy"} sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1000px) 46vw, 390px" /></div>
          <div className="industryCardBody"><h2>{environment.title}</h2><p>{environment.copy}</p>
            <ul className="industrySupport" aria-label={`${environment.title} support`}>
              {environment.links.map((key) => <li key={key}><Link href={industrySupport[key].href}>{industrySupport[key].label}<span aria-hidden="true"> ↗</span></Link></li>)}
            </ul>
          </div>
        </article>)}
      </section>
      <section className="container industryContact"><div><span className="eyebrow">Your application</span><h2>Need application support?</h2><p>Share your printer model, product surface and sample code.</p></div><Link className="button primary" href="/repair-service#request">Request Service</Link><Link className="textLink" href="/parts-consumables">Find Spare Parts →</Link><Link className="textLink" href="/printers">View Printers →</Link></section>
    </main>
    <Footer />
  </>;
}
