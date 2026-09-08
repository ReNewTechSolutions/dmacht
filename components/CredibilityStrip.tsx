import { Clock3, Settings, ShieldCheck, Users } from "lucide-react";

const items = [
  { title: "Real Expertise", copy: "Years of hands-on experience across all major brands.", icon: ShieldCheck },
  { title: "Trusted by Industry", copy: "Helping manufacturers keep their lines running.", icon: Users },
  { title: "Quality Parts", copy: "Tested. Reliable. Built for uptime.", icon: Settings },
  { title: "Less Downtime", copy: "Fast, effective repairs when you need it most.", icon: Clock3 },
];

export default function CredibilityStrip() {
  return (
    <section className="credibilityStrip" aria-label="Why manufacturers choose D-Macht">
      <div className="container credibilityGrid">
        {items.map(({ title, copy, icon: Icon }) => (
          <article key={title}>
            <Icon size={37} strokeWidth={1.8} aria-hidden="true" />
            <div><h2>{title}</h2><p>{copy}</p></div>
          </article>
        ))}
        <p className="credibilityScript" aria-hidden="true">Printing keeps<br />industry moving</p>
      </div>
    </section>
  );
}
