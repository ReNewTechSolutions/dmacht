import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brands } from "../data/site";

export default function BrandStrip() {
  return (
    <section className="brandStrip" id="supported-brands" aria-labelledby="supported-brands-title">
      <div className="container brandStripInner">
        <h2 id="supported-brands-title">Supported Brands</h2>
        <div className="brandStripNames">
          {brands.map((brand) => <span key={brand}>{brand}</span>)}
        </div>
        <Link href="/about#brands">View brands <ArrowRight size={15} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
