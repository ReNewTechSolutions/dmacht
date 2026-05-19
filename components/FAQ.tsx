

const faqs = [
  {
    q: "What should I include in a service request?",
    a: "Include printer brand, model, fault code, location, urgency, photos or video, and what changed before the issue started. The more specific the request is, the faster it can be routed.",
  },
  {
    q: "Do you support only one printer brand?",
    a: "No. D-Macht is built around industrial coding and marking workflows, including CIJ, TIJ, and DOD printer environments. Requests can include repair, parts, consumables, refurbished printers, and maintenance planning.",
  },
  {
    q: "Can you help if production is already stopped?",
    a: "Yes. Choose line down or production stopped in the request form and include the machine model, exact fault code, and what the printer is doing. That helps the issue get handled with the right urgency.",
  },
  {
    q: "What is different between India and US/global support?",
    a: "India support is best for hands-on service, maintenance, repair, parts, inks, fluids, refurbished printers, and local coordination. US/global support is best for remote help, sourcing, planning, and coordination requests.",
  },
  {
    q: "Can D-Macht help with PCB or chip-level repair?",
    a: "Yes. If the issue appears board-related, include the printer model, board details, symptoms, photos, and any visible damage or error behavior so the repair path can be reviewed clearly.",
  },
  {
    q: "Do you offer preventive maintenance or AMC plans?",
    a: "Yes. Maintenance support can include preventive service planning, inspection checklists, consumables guidance, spares recommendations, and escalation planning.",
  },
];

export default function FAQ() {
  return (
    <section className="faqSection" id="faq" aria-label="Frequently asked questions">
      <div className="faqHeaderGrid">
        <div className="sectionIntro">
          <span className="eyebrow">FAQ</span>
          <h2>Questions production teams usually ask first.</h2>
          <p>
            Clear answers for repair, maintenance, parts, consumables, region availability, and how service requests are routed.
          </p>
        </div>

        <aside className="faqHelperPanel">
          <span>Still unsure?</span>
          <strong>Select “Other / not sure” in the request form.</strong>
          <p>D-Macht can help route the request even when the exact failure point is not known yet.</p>
        </aside>
      </div>

      <div className="faqGrid">
        {faqs.map((item) => (
          <details key={item.q} className="faqItem">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}