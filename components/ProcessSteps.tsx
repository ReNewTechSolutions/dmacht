

const processSteps = [
  {
    step: "01",
    title: "Tell us the problem",
    desc: "Share the printer model, location, issue, fault code, urgency, and whether production is stopped.",
    output: "A clear service request with enough detail to begin routing.",
  },
  {
    step: "02",
    title: "Check the cause",
    desc: "We review whether the issue is fluid-related, electrical, sensor-based, print-quality related, or service-related.",
    output: "A better idea of whether the request needs repair, parts, consumables, or maintenance.",
  },
  {
    step: "03",
    title: "Route the fix",
    desc: "The request is routed toward repair, maintenance, parts, consumables, remote help, or equipment replacement.",
    output: "The next step is matched to the real machine problem instead of guesswork.",
  },
  {
    step: "04",
    title: "Prevent repeat issues",
    desc: "After the issue is handled, we support uptime planning through maintenance, spares, and consumables guidance.",
    output: "A cleaner plan for reducing repeat downtime and avoidable service calls.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="processSection" id="process" aria-label="D-Macht support process">
      <div className="processHeaderGrid">
        <div className="sectionIntro">
          <span className="eyebrow">How support works</span>
          <h2>A simple path from issue report to uptime plan.</h2>
          <p>
            The process is built for operators, maintenance teams, and business owners who need clear next steps without having to diagnose everything themselves.
          </p>
        </div>

        <aside className="processHelperPanel">
          <span>Service flow</span>
          <strong>Report → Review → Route → Prevent</strong>
          <p>Start with the machine details. D-Macht uses those details to guide the request toward the right service path.</p>
        </aside>
      </div>

      <div className="processTimeline">
        {processSteps.map((item) => (
          <article className="processCard" key={item.step}>
            <span>{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div className="processOutput">
              <small>Outcome</small>
              <strong>{item.output}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}