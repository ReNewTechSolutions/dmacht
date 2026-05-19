import Link from "next/link";

const footerLinks = [
  { label: "Maintenance / AMC", href: "/maintenance" },
  { label: "Printer types", href: "/printer-types" },
  { label: "Parts + fluids", href: "/parts-fluids-consumables" },
  { label: "PCB repair", href: "/pcb-repair" },
  { label: "Industries served", href: "/industries" },
  { label: "US launch", href: "/us-launch-kansas-city" },
];

const supportTags = ["Repair", "Maintenance", "Parts", "Consumables", "PCB", "Refurbished printers"];

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
        <Link className="button primary" href="/#request">
          Request service
        </Link>
      </div>

      <div className="footerLinkPanel" aria-label="Footer navigation">
        <div className="footerLinkIntro">
          <span className="eyebrow">Explore support</span>
          <h3>Find the right path before sending a request.</h3>
        </div>

        <nav className="footerLinks" aria-label="Footer page links">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="footerBottom">
        <div className="footerBrandBlock">
          <strong>D-Macht</strong>
          <span>Industrial printer support desk</span>
        </div>

        <div className="footerMeta">
          <div className="footerTagRow" aria-label="Support categories">
            {supportTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <span>© {new Date().getFullYear()} D-Macht. A ReNewTech Solutions service line.</span>
        </div>
      </div>
    </footer>
  );
}
