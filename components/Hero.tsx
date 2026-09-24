import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChartNoAxesColumnIncreasing, ShieldCheck, Wrench } from "lucide-react";
import { contact } from "../data/site";

const proofPoints = [
  { label: "Faster Turnaround", icon: Wrench },
  { label: "Reliable Repairs", icon: ShieldCheck },
  { label: "Minimize Downtime", icon: ChartNoAxesColumnIncreasing },
];

export default function Hero() {
  return (
    <section className="homeHero" id="top">
      <Image
        className="homeHeroBackdrop"
        src="/brand/photography/dee-hero.webp"
        alt="Dee, D-Macht founder and lead technician, beside an open industrial coding printer"
        fill
        preload
        sizes="100vw"
      />
      <div className="homeHeroWash" aria-hidden="true" />
      <div className="container homeHeroInner">
        <div className="homeHeroCopy">
          <span className="heroEyebrow">Keep your production running</span>
          <h1>Industrial Printer<br />{" "}Repair &amp; Service</h1>
          <p className="heroLead">Expert service for CIJ, TIJ and DOD industrial coding &amp; marking systems.</p>

          <div className="heroProof" aria-label="Service benefits">
            {proofPoints.map(({ label, icon: Icon }) => (
              <div key={label}>
                <span><Icon size={22} strokeWidth={2.3} aria-hidden="true" /></span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>

          <div className="heroActions">
            <Link className="button primary heroPrimary" href="/repair-service#request">
              Request Service <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <a className="talkToDee" href={`mailto:${contact.email}?subject=Talk%20to%20Dee`}>
              <span>Talk to Dee <ArrowRight size={17} aria-hidden="true" /></span>
              <small>Get expert advice</small>
            </a>
          </div>
        </div>

        <div className="heroPersonLabel" aria-label="Dee, founder and lead technician">
          <strong>Dee</strong>
          <span>Founder &amp;<br />Lead Technician</span>
        </div>
      </div>
    </section>
  );
}
