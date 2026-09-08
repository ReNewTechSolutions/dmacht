import Link from "next/link";

const maintenanceItems = [
  "Preventive maintenance",
  "Breakdown service",
  "Annual Maintenance Contracts",
  "Scheduled parts replacement",
];

export default function MaintenanceSection() {
  return (
    <section className="maintenanceSection">
      <div className="container maintenanceGrid">
        <div>
          <span className="eyebrow light">Maintenance</span>
          <h2>Keep the line running.</h2>
          <p>Plan service before worn filters, unstable ink systems or repeat faults become production stoppages.</p>
          <Link className="button lightButton" href="/repair-service#maintenance">View maintenance options</Link>
        </div>
        <ol>
          {maintenanceItems.map((item, index) => (
            <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
