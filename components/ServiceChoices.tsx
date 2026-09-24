import Link from "next/link";
import { ServicePrinterIcon, PrinterPartsIcon, IndustrialPrinterIcon } from "./PrinterActionIcons";

const actions = [
  {
    title: "Book Service",
    copy: "Breakdown repair and preventive maintenance.",
    href: "/repair-service#request",
    icon: ServicePrinterIcon,
    tone: "service",
  },
  {
    title: "Buy Spare Parts",
    copy: "Printer components, inks and make-up solvents.",
    href: "/parts-consumables",
    icon: PrinterPartsIcon,
    tone: "parts",
  },
  {
    title: "Buy Printers",
    copy: "New and refurbished industrial coding printers.",
    href: "/printers",
    icon: IndustrialPrinterIcon,
    tone: "printers",
  },
];

export default function ServiceChoices() {
  return (
    <section className="primaryActionsSection" aria-labelledby="primary-actions-title">
      <h2 className="visuallyHidden" id="primary-actions-title">Choose how D-Macht can help</h2>
      <div className="container primaryActionGrid">
        {actions.map(({ title, copy, href, icon: Icon, tone }) => (
          <Link className={`primaryActionCard ${tone}`} href={href} key={title}>
            <span className="primaryActionIcon"><Icon size={34} /></span>
            <span className="primaryActionCopy">
              <strong>{title}</strong>
              <small>{copy}</small>
            </span>
            <svg className="primaryActionArrow" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
