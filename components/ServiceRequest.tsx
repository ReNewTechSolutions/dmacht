const serviceTypes = [
  "Printer repair / breakdown support",
  "Preventive maintenance / AMC",
  "PCB or chip-level repair",
  "Ink / make-up fluid / consumables",
  "Spare parts request",
  "Refurbished printer inquiry",
  "Installation / setup support",
  "Other / not sure",
];

const urgencyOptions = [
  "Line down / production stopped",
  "Print quality issue",
  "Error code / intermittent fault",
  "Maintenance planning",
  "Parts / consumables request",
  "General inquiry",
];

export default function ServiceRequest() {
  return (
    <section className="requestSection" id="request" aria-label="Service request intake">
      <div className="requestIntro">
        <span className="eyebrow">Service request intake</span>
        <h2>Submit one clear request. We route it to the right support path.</h2>
        <p>
          Requests are sent to the D-Macht support inboxes used for the current site. Include the printer model, fault code, location, urgency, and photos or video if available.
        </p>

        <div className="requestRoutingPanel">
          <span>Routing note</span>
          <strong>Use this for India service support or US/global coordination.</strong>
          <p>Choose the closest service type. If you are not sure, select “Other / not sure” and describe the issue in plain language.</p>
        </div>
      </div>

      <form className="requestForm" action="mailto:support@dmacht.com" method="post" encType="text/plain">
        <div className="formRow">
          <label>
            <span>Name</span>
            <input name="name" placeholder="Your name" required />
          </label>
          <label>
            <span>Company</span>
            <input name="company" placeholder="Company / facility" />
          </label>
        </div>

        <div className="formRow">
          <label>
            <span>Email</span>
            <input name="email" type="email" placeholder="you@company.com" required />
          </label>
          <label>
            <span>Phone</span>
            <input name="phone" type="tel" placeholder="Phone / WhatsApp" />
          </label>
        </div>

        <div className="formRow">
          <label>
            <span>Region</span>
            <select name="region" defaultValue="" required>
              <option value="" disabled>
                Choose region
              </option>
              <option>India service support</option>
              <option>US / global support</option>
            </select>
          </label>
          <label>
            <span>Service type</span>
            <select name="serviceType" defaultValue="" required>
              <option value="" disabled>
                Choose service type
              </option>
              {serviceTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="formRow">
          <label>
            <span>Urgency</span>
            <select name="urgency" defaultValue="" required>
              <option value="" disabled>
                Choose urgency
              </option>
              {urgencyOptions.map((urgency) => (
                <option key={urgency}>{urgency}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Printer model</span>
            <input name="printerModel" placeholder="Brand / model / serial if known" />
          </label>
        </div>

        <label className="fullField">
          <span>Issue details</span>
          <textarea
            name="details"
            placeholder="What is happening? Include fault code, print issue, when it started, photos available, location, and anything that changed."
            required
          />
        </label>

        <button className="button primary" type="submit">
          Submit service request
        </button>

        <p className="requestFinePrint">
          This opens your email app with the request details. For attachments, add photos or videos before sending.
        </p>
      </form>
    </section>
  );
}