import Image from "next/image";
import Link from "next/link";
import Footer from "../../../components/Footer";
import { productionEnvironments, industrySupport } from "../../../data/industries";
import { pageMetadata } from "../../../lib/metadata";

export const metadata = pageMetadata(
  "/industries",
  "Industries & Applications | D-Macht Coding & Marking Support",
  "Industrial coding and marking support across food, beverage, dairy and manufacturing: printer service, spare parts, consumables and equipment from D-Macht in Pune.",
);

export default function IndustriesPage() {
  return <>
    <main>
      <header className="container industriesIntro">
        <span className="eyebrow">Industries we serve</span>
        <h1>Built around real production environments.</h1>
        <p>Different products. Different surfaces. The same need for a clear, consistent code. D-Macht supports the printers, parts and consumables behind your production marking.</p>
        <span className="industryImageNote">Illustrative application imagery. Support depends on your printer, substrate and production requirements.</span>
      </header>
      <section className="container industryGrid" aria-label="Production environments">
        {productionEnvironments.map((environment) => <article className="industryCard" id={environment.id} key={environment.id}>
          <div className="industryPhoto"><Image src={`/brand/photography/industries/${environment.id}.webp`} alt={environment.alt} fill sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1000px) 46vw, 390px" /></div>
          <div className="industryCardBody"><h2>{environment.title}</h2><p>{environment.copy}</p>
            <ul className="industrySupport" aria-label={`${environment.title} support`}>
              {environment.links.map((key) => <li key={key}><Link href={industrySupport[key].href}>{industrySupport[key].label}<span aria-hidden="true"> ↗</span></Link></li>)}
            </ul>
          </div>
        </article>)}
      </section>
      <section className="container industryContact"><div><span className="eyebrow">Your application</span><h2>Tell us what you need to mark.</h2><p>Share your printer model, product surface and a sample code so we can discuss service, compatible parts or equipment.</p></div><Link className="button primary" href="/repair-service#request">Book Service</Link><Link className="textLink" href="/parts-consumables">Buy Spare Parts →</Link><Link className="textLink" href="/printers">Buy Printers →</Link></section>
    </main>
    <Footer />
  </>;
}
