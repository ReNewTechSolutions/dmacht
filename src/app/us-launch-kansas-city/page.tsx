const launchPriorities = [
  {
    title: "Remote-first triage now",
    detail:
      "Customers can send printer details, symptoms, photos, videos, error codes, and production impact before an in-person visit is needed.",
  },
  {
    title: "Kansas City service base",
    detail:
      "D-Macht is preparing US-side support around the Kansas City area as Dee transitions into local field service, repair planning, and customer support.",
  },
  {
    title: "Repair, parts, and consumables routing",
    detail:
      "Requests can be routed toward repair review, maintenance, PCB support, spare parts, fluids, ribbons, filters, or refurbished equipment planning.",
  },
  {
    title: "Built for industrial uptime",
    detail:
      "The US launch is focused on practical production support: faster intake, clearer next steps, and fewer avoidable service delays.",
  },
];

const serviceReadiness = [
  "Remote troubleshooting and request review",
  "Industrial printer repair intake",
  "Preventive maintenance and AMC planning",
  "Parts, fluids, ribbons, filters, and consumables routing",
  "PCB and module-level review coordination",
  "Refurbished printer and backup equipment planning",
];

const launchSteps = [
  {
    step: "01",
    title: "Submit the machine details",
    detail: "Send brand, model, printer type, error code, photos/video, and whether production is stopped.",
  },
  {
    step: "02",
    title: "Route the request",
    detail: "D-Macht reviews whether the issue looks like repair, parts, consumables, PCB, maintenance, or equipment sourcing.",
  },
  {
    step: "03",
    title: "Plan remote or local support",
    detail: "As US coverage expands, suitable requests can move from remote triage into local service planning around Kansas City.",
  },
  {
    step: "04",
    title: "Build a repeatable support path",
    detail: "Customers with ongoing production needs can move toward preventive maintenance, spares planning, and documented support routines.",
  },
];

const usSupportFit = [
  "Small and mid-sized manufacturers using coding and marking equipment",
  "Packaging operations needing clearer service and consumables routing",
  "Businesses preparing for preventive maintenance or backup printer planning",
  "Teams that need help identifying parts, fluids, ribbons, or board-level issues",
];

export default function USLaunchKansasCity() {
  return (
    <main className="siteShell usLaunchPage" id="top">
      <section className="usLaunchHero" aria-label="US launch Kansas City">
        <div className="usLaunchHeroCopy">
          <span className="eyebrow">US launch / Kansas City</span>
          <h1>US industrial printer support is being built from Kansas City outward.</h1>
          <p>
            D-Macht is preparing a practical US support path for industrial coding and marking customers — starting with remote-first triage and expanding toward local service, repair planning, maintenance, parts, consumables, and equipment support.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#us-support-request">
              Ask about US support
            </a>
            <a className="button secondary" href="#launch-plan">
              View launch plan
            </a>
          </div>
        </div>

        <aside className="usLaunchSignal" aria-label="Kansas City launch summary">
          <span>Launch focus</span>
          <strong>Remote intake now. Local field support next.</strong>
          <p>
            The goal is to make service requests easier to start before Dee is fully operating in the US field — so customers can already send the right information and get routed clearly.
          </p>
          <div className="usLaunchChips" aria-hidden>
            <b>Kansas City</b>
            <b>Remote triage</b>
            <b>Repair-first</b>
            <b>Uptime</b>
          </div>
        </aside>
      </section>

      <section className="usLaunchSection" id="launch-plan" aria-label="US launch priorities">
        <div className="sectionIntro compact">
          <span className="eyebrow">Launch priorities</span>
          <h2>A clear bridge from remote support into US-side service.</h2>
          <p>
            This page can set expectations honestly while still showing that D-Macht is building toward real local service capability.
          </p>
        </div>

        <div className="usPriorityGrid">
          {launchPriorities.map((priority) => (
            <article className="usPriorityCard" key={priority.title}>
              <h3>{priority.title}</h3>
              <p>{priority.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="usLaunchSection usLaunchSplit" aria-label="US support readiness">
        <div className="usReadinessPanel">
          <span className="eyebrow">Support readiness</span>
          <h2>What US customers can ask about.</h2>
          <div className="usReadinessGrid">
            {serviceReadiness.map((item) => (
              <div className="usReadinessItem" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <aside className="usFitPanel">
          <span>Best fit</span>
          <strong>Built for production teams that need practical next steps.</strong>
          <ul>
            {usSupportFit.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="usLaunchSection" aria-label="US launch workflow">
        <div className="sectionIntro compact">
          <span className="eyebrow">How it will work</span>
          <h2>Start with remote triage, then route the right support path.</h2>
        </div>

        <div className="usLaunchFlowGrid">
          {launchSteps.map((item) => (
            <article className="usLaunchFlowCard" key={item.step}>
              <b>{item.step}</b>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="usLaunchSection usLaunchRequest" id="us-support-request" aria-label="Ask about US support">
        <div>
          <span className="eyebrow">Next step</span>
          <h2>Ask about US support availability.</h2>
          <p>
            Send your printer type, brand, model, location, production issue, photos/video, and whether the request is urgent. D-Macht can help route the best next step as US coverage expands.
          </p>
        </div>
        <a className="button primary" href="mailto:support@dmacht.com?subject=US%20Support%20Availability%20Request">
          Email US support request
        </a>
      </section>
    </main>
  );
}
