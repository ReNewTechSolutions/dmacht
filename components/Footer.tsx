export default function Footer() {
  return (
    <footer className="siteFooter" aria-label="D-Macht footer">
      <div className="footerCta">
        <div>
          <span className="eyebrow">Ready to route the issue?</span>
          <h2>Start with the machine details. D-Macht handles the next step.</h2>
          <p>
            Submit one clear service request for printer repair, maintenance, parts, consumables, PCB support, or sourcing coordination.
          </p>
        </div>
        <a className="button primary" href="#request">
          Request service
        </a>
      </div>

      <div className="footerBottom">
        <div className="footerBrandBlock">
          <strong>D-Macht</strong>
          <span>Industrial printer support desk</span>
        </div>

        <div className="footerMeta">
          <span>Repair • Maintenance • Parts • Consumables • Refurbished printers</span>
          <span>© {new Date().getFullYear()} D-Macht. A ReNewTech Solutions service line.</span>
        </div>
      </div>
    </footer>
  );
}
