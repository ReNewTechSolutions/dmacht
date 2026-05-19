const quickTips = [
  {
    title: "Print is faded or inconsistent",
    check: "Check ink level, make-up fluid level, nozzle cleanliness, and whether the correct ink or fluid is being used.",
    capture: "Send a close photo of the print sample and the machine display.",
  },
  {
    title: "Printer shows an error code",
    check: "Write down the exact code, when it appears, and whether it returns after restart.",
    capture: "Send the code, printer model, and a photo of the display if possible.",
  },
  {
    title: "Line is down or stopping often",
    check: "Note whether the issue seems electrical, fluid-related, sensor-related, or only happens during production.",
    capture: "Mark the request as line down and describe the production impact.",
  },
  {
    title: "Need parts, ink, or fluids",
    check: "Gather printer brand, model, current consumable name, and any part number if available.",
    capture: "Photos of labels, bottles, filters, boards, or existing parts are helpful.",
  },
];

export default function TroubleshootingTips() {
  return (
    <section className="tipsSection" id="tips" aria-label="Quick troubleshooting tips">
      <div className="tipsHeaderGrid">
        <div className="sectionIntro">
          <span className="eyebrow">Quick troubleshooting</span>
          <h2>Capture the details that speed up the fix.</h2>
          <p>
            These checks are not a replacement for service. They help the support request get routed faster to repair, parts, consumables, or maintenance.
          </p>
        </div>

        <aside className="tipsHelperPanel">
          <span>Before sending</span>
          <strong>Photos and fault codes save time.</strong>
          <p>Take clear photos of the machine display, print sample, labels, and any visible damage before submitting the request.</p>
        </aside>
      </div>

      <div className="tipsPanel">
        {quickTips.map((tip, index) => (
          <article className="tipItem" key={tip.title}>
            <span className="tipNumber">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{tip.title}</h3>
              <p>{tip.check}</p>
              <div className="tipCapture">
                <small>Helpful to capture</small>
                <strong>{tip.capture}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
