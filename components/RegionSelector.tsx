const regions = [
  {
    eyebrow: "India / Pune hub",
    status: "Live support",
    title: "India service support",
    desc: "Best for printer repair, maintenance, spare parts, refurbished printers, ink, fluids, and on-site support in India.",
    chips: ["Repair", "Maintenance", "Parts", "Ink & fluids"],
    route: "Service, repair, and supply requests",
    tone: "active",
  },
  {
    eyebrow: "US / global desk",
    status: "Planning route",
    title: "US / global support",
    desc: "Best for remote help, equipment sourcing, maintenance planning, and global coordination requests.",
    chips: ["Remote help", "Sourcing", "Planning", "Coordination"],
    route: "Consulting, sourcing, and coordination",
    tone: "standard",
  },
];

export default function RegionSelector() {
  return (
    <section className="regionSection" aria-label="Choose support region">
      <div className="regionHeaderGrid">
        <div className="sectionIntro">
          <span className="eyebrow">Choose region</span>
          <h2>Where do you need help?</h2>
          <p>
            Pick the closest support route first. This makes the site easier to understand and helps D-Macht route the request to the right contact, service type, and availability.
          </p>
        </div>

        <aside className="regionHelperPanel" aria-label="Why region selection matters">
          <span>Why this matters</span>
          <strong>India and US/global requests do not follow the same path.</strong>
          <p>
            India is for hands-on service and supply support. US/global is for remote coordination, sourcing, and planning.
          </p>
        </aside>
      </div>

      <div className="regionGrid">
        {regions.map((region) => (
          <article className={`regionCard ${region.tone === "active" ? "active" : ""}`} key={region.title}>
            <div className="regionVisualTop">
              <div>
                <span>{region.eyebrow}</span>
                <h3>{region.title}</h3>
              </div>
              <b>{region.status}</b>
            </div>

            <p>{region.desc}</p>

            <div className="regionRouteBox">
              <span>Best route for</span>
              <strong>{region.route}</strong>
            </div>

            <div className="chipRow">
              {region.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>

            <a className="regionSelectButton" href="#request">
              Select {region.title}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
