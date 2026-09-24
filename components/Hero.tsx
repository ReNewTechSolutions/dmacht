import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


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
          <p className="heroLead">Repair, spare parts and new or refurbished CIJ, TIJ and DOD coding printers.</p>

          <div className="heroActions">
            <Link className="button primary heroPrimary" href="/repair-service#request">
              Request Service <ArrowRight size={20} aria-hidden="true" />
            </Link>
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
