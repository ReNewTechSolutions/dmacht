import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

const paths = [
  { title: "I need a part", copy: "Send the printer brand, model and part number if known.", href: "/parts-consumables#parts-inquiry" },
  { title: "I need ink / make-up fluid", copy: "Send the current container label and printer model.", href: "/parts-consumables#parts-inquiry" },
  { title: "I don’t know what I need", copy: "Upload a photo and describe where the component came from.", href: "/parts-consumables#parts-inquiry" },
];

export default function PartsPaths() {
  return (
    <section className="section container partsFeature">
      <div className="partsFeatureTop">
        <SectionHeading
          eyebrow="Parts & consumables"
          title="Find the right item without guessing."
          copy="A photo, label or part number is enough to start. D-Macht can help identify the component before supply."
        />
        <div className="partsFeatureImage">
          <Image src="/brand/parts-bench-v2.png" alt="Industrial printer pumps filters nozzles electronics and fluids" fill sizes="(max-width: 860px) 100vw, 46vw" />
        </div>
      </div>
      <div className="partsPathGrid">
        {paths.map((path) => (
          <article key={path.title}>
            <h3>{path.title}</h3>
            <p>{path.copy}</p>
            <Link className="textLink" href={path.href}>Start inquiry <span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
