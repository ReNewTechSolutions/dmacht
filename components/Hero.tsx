import Image from "next/image";
import Link from "next/link";
import { brands } from "../data/site";

export default function Hero() {
  return (
    <>
      <section className="homeHero" id="top">
        <div className="homeHeroCopy">
          <span className="eyebrow">Pune-based repair & field support</span>
          <h1>Industrial printer repair & service</h1>
          <p className="heroTypes">CIJ <span>•</span> TIJ <span>•</span> DOD <span>•</span> Coding & marking systems</p>
          <p className="heroLead">
            Repair, maintenance, PCB-level diagnostics, spare parts and consumables for major industrial printer brands.
          </p>
          <div className="buttonRow">
            <Link className="button primary" href="/contact#request">
              Request service
            </Link>
            <Link className="button secondary" href="/contact#request">
              Call / WhatsApp
            </Link>
          </div>
        </div>
        <div className="homeHeroImage">
          <Image
            src="/brand/workshop-hero-v2.png"
            alt="Technician diagnosing an open industrial continuous inkjet printer in a service workshop"
            fill
            loading="eager"
            sizes="(max-width: 860px) 100vw, 58vw"
          />
          <div className="imageNote">
            <strong>Workshop repair</strong>
            <span>Diagnostics, components and complete printer systems</span>
          </div>
        </div>
      </section>
      <section className="brandBar" aria-label="Supported industrial printer brands">
        <span>Major brands supported</span>
        <div>
          {brands.map((brand) => <strong key={brand}>{brand}</strong>)}
        </div>
      </section>
    </>
  );
}
