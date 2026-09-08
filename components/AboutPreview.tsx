import Link from "next/link";
import SectionHeading from "./SectionHeading";

const proof = [
  ["Pune", "Workshop & field support"],
  ["CIJ · TIJ · DOD", "Industrial printer types"],
  ["Board-level", "Electronic diagnostics"],
  ["Repair + supply", "One technical partner"],
];

export default function AboutPreview() {
  return (
    <section className="section container aboutPreview">
      <div>
        <SectionHeading
          eyebrow="About D-Macht"
          title="Industrial printer specialists in Pune."
          copy="D-Macht repairs and maintains industrial coding equipment, diagnoses electronic and component-level faults, and supplies spare parts, consumables and refurbished printers."
        />
        <Link className="textLink" href="/about">More about D-Macht <span aria-hidden="true">→</span></Link>
      </div>
      <div className="proofGrid">
        {proof.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}
      </div>
    </section>
  );
}
