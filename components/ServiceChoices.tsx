import Link from "next/link";
import { ArrowRight, Settings, ShoppingCart, Wrench } from "lucide-react";

const actions = [
  {
    title: "Book Service",
    copy: "Get your printer inspected, repaired and back up quickly.",
    href: "/repair-service#request",
    icon: Wrench,
    tone: "service",
  },
  {
    title: "Buy Spare Parts",
    copy: "Genuine and high-quality parts for all major brands.",
    href: "/parts-consumables",
    icon: Settings,
    tone: "parts",
  },
  {
    title: "Buy Printers",
    copy: "New and refurbished industrial coding printers.",
    href: "/printers",
    icon: ShoppingCart,
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
            <span className="primaryActionIcon"><Icon size={34} strokeWidth={2.25} aria-hidden="true" /></span>
            <span className="primaryActionCopy">
              <strong>{title}</strong>
              <small>{copy}</small>
            </span>
            <ArrowRight className="primaryActionArrow" size={26} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
