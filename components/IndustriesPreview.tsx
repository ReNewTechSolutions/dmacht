import Image from "next/image";
import Link from "next/link";
import { productionEnvironments } from "../data/industries";

const preview = [productionEnvironments[0], productionEnvironments[2], productionEnvironments[4]];

export default function IndustriesPreview() {
  return <section className="industriesPreview section" aria-labelledby="industries-preview-title"><div className="container">
    <div className="industriesPreviewHeading"><div><span className="eyebrow">Industries we serve</span><h2 id="industries-preview-title">Real production environments.</h2><p>Service, parts and coding equipment for the products you make.</p></div><Link className="textLink" href="/industries">View All Industries →</Link></div>
    <div className="industryPreviewGrid">{preview.map((environment) => <Link href={`/industries#${environment.id}`} className="industryPreviewCard" key={environment.id}><div className="industryPhoto"><Image src={`/brand/photography/industries/${environment.id}.webp`} alt={environment.alt} fill sizes="(max-width: 640px) calc(100vw - 32px), 32vw" /></div><h3>{environment.title}<span aria-hidden="true"> ↗</span></h3></Link>)}</div>
  </div></section>;
}
