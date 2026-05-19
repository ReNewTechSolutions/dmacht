const metrics = [
  {
    value: "4",
    label: "Support paths",
    detail: "Repair, maintenance, consumables, and equipment sourcing.",
  },
  {
    value: "CIJ / TIJ / DOD / Laser / TTO",
    label: "Printer environments",
    detail: "Industrial coding, marking, laser, and thermal transfer systems supported through one intake flow.",
  },
  {
    value: "Remote-first",
    label: "Triage approach",
    detail: "Start with model, fault code, photos, video, and line impact.",
  },
  {
    value: "Uptime",
    label: "Primary outcome",
    detail: "Service planning focused on reducing repeat equipment issues.",
  },
];

export default function OperationsSnapshot() {
  return (
    <section className="metricsSection" aria-label="Operations snapshot">
      <div className="sectionIntro compact">
        <span className="eyebrow">Operations snapshot</span>
        <h2>Built around the support problems production teams actually need solved.</h2>
      </div>

      <div className="metricGrid">
        {metrics.map((metric) => (
          <article className="metricCard" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <p>{metric.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
