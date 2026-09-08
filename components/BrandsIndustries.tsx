import { brands, industries } from "../data/site";
import SectionHeading from "./SectionHeading";

export default function BrandsIndustries() {
  return (
    <>
      <section className="brandSection container">
        <SectionHeading eyebrow="Supported brands" title="Service experience across major coding systems." align="center" />
        <div className="brandNameGrid">
          {brands.map((brand) => <span key={brand}>{brand}</span>)}
        </div>
        <p className="disclaimer">Brand names identify equipment commonly supported. D-Macht is an independent service company.</p>
      </section>
      <section className="industrySection" id="industries">
        <div className="container industryGrid">
          <SectionHeading
            eyebrow="Industries"
            title="Coding support for working production lines."
            copy="From date coding on packaged food to continuous marking on cable and pipe."
          />
          <div className="industryNames">
            {industries.map((industry) => <span key={industry}>{industry}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}
