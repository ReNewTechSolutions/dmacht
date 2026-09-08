import Link from "next/link";
import { contact } from "../data/site";

export default function BreakdownCTA() {
  return (
    <section className="breakdownBand">
      <div className="container breakdownGrid">
        <div>
          <span className="eyebrow light">Breakdown support</span>
          <h2>Printer down? Production stopped?</h2>
        </div>
        <div>
          <p>Send the printer model, exact error code, and a clear photo or video of the issue. If you do not know the model, send the machine plate or cabinet photo.</p>
          <div className="buttonRow">
            <Link className="button lightButton" href="/contact#request">Get repair support</Link>
            <a className="plainContact" href={`mailto:${contact.email}?subject=Urgent%20Printer%20Breakdown`}>{contact.email}</a>
          </div>
          <span className="locationLine">Field and workshop support from Pune, India</span>
        </div>
      </div>
    </section>
  );
}
