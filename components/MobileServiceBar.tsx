import Link from "next/link";
import { contact } from "../data/site";

export default function MobileServiceBar() {
  return (
    <nav className="mobileServiceBar" aria-label="Quick contact actions">
      <a href={`mailto:${contact.email}?subject=Industrial%20Printer%20Support`}>
        Email
      </a>
      <Link href="/contact#request">Call / WhatsApp</Link>
      <Link className="isPrimary" href="/contact#request">
        Request service
      </Link>
    </nav>
  );
}
