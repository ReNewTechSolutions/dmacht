export type Service = {
    id: string;
    title: string;
    summary: string;
    bullets: string[];
    accent: "orange" | "yellow" | "teal" | "purple";
  };
  
  export const services: Service[] = [
    {
      id: "industrial-inkjet",
      title: "Industrial Inkjet Printer Expertise",
      summary: "Markem-Imaje & Domino service, calibration, repair, refurb, and line support.",
      bullets: [
        "Coding & marking production-line printers",
        "Calibration, rebuilds, and print quality recovery",
        "Parts-level evaluation and refurb planning",
      ],
      accent: "orange",
    },
    {
      id: "pm-diagnostics",
      title: "Preventative Maintenance & Diagnostics",
      summary: "Proactive inspection, cleaning, pressure balancing, and component testing.",
      bullets: [
        "Downtime prevention and lifespan extension",
        "Compliance-minded maintenance routines",
        "Root-cause diagnostics before failure",
      ],
      accent: "yellow",
    },
    {
      id: "electronics-repair",
      title: "Industrial Electronics & Hardware Repair",
      summary: "Board/component troubleshooting across power, sensors, controllers, and assemblies.",
      bullets: [
        "Power systems, sensors, printheads, controllers",
        "Board-level diagnostics and component isolation",
        "Electromechanical troubleshooting",
      ],
      accent: "teal",
    },
    {
      id: "installation-integration",
      title: "Field Installation & System Integration",
      summary: "On-site installs with clean wiring, alignment, and operational validation.",
      bullets: [
        "Industrial equipment + production-line printer installs",
        "Low-voltage systems integration",
        "Operational validation + handoff",
      ],
      accent: "purple",
    },
    {
      id: "cctv-low-voltage",
      title: "Security Camera & Low-Voltage Systems Setup",
      summary: "Commercial CCTV design/install with DVR/NVR configuration and network setup.",
      bullets: [
        "Camera placement and coverage planning",
        "DVR/NVR configuration + networking",
        "Long-term maintenance support",
      ],
      accent: "teal",
    },
  ];