import Link from "next/link";
import Image from "next/image";
import { contact, primaryNav } from "../data/site";

export default function Footer() {
  return (
    <footer className="siteFooter" aria-label="D-Macht footer">
      <div className="container footerCta">
        <div>

          <h2>Need help with your printer?</h2>
        </div>
        <Link className="button lightButton" href="/repair-service#request">
          Request Service
        </Link>
      </div>

      <div className="container footerMain">
        <div className="footerBrand">
          <Link className="footerLogo" href="/" aria-label="D-Macht home"><Image src="/brand/dmacht-logo.svg" alt="D-Macht, Industrial Coding & Marking Solutions. Quality, Reliability, Flexibility." width={1620} height={437} /></Link>
          <p>Printer repair, spare parts and new or refurbished printers.</p>
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
