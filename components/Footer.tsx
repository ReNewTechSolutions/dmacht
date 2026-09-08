import Link from "next/link";
import { contact, primaryNav } from "../data/site";

export default function Footer() {
  return (
    <footer className="siteFooter" aria-label="D-Macht footer">
      <div className="container footerCta">
        <div>
          <span className="eyebrow light">Need your printer running again?</span>
          <h2>Send the model, error code and a photo.</h2>
        </div>
        <Link className="button lightButton" href="/contact#request">
          Request service
        </Link>
      </div>

      <div className="container footerMain">
        <div className="footerBrand">
          <strong>D-MACHT</strong>
          <p>Industrial printer repair, service, parts, consumables and refurbished equipment.</p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <span>{contact.location}</span>
        </div>
        <nav className="footerLinks" aria-label="Footer page links">
          {primaryNav.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="container footerBottom">
        <span>© {new Date().getFullYear()} D-Macht. A ReNewTech Solutions service line.</span>
        <span>Independent industrial printer service company</span>
      </div>
    </footer>
  );
}
