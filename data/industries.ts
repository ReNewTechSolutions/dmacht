export const productionEnvironments = [
  { id: "food-packaging", title: "Food & Packaging", alt: "Sealed biscuit packs with batch coding on a stainless-steel packaging conveyor", copy: "Coding for food packs, cartons and pouches. Printer repair, maintenance, parts, inks and equipment.", links: ["service", "parts", "printers"] },
  { id: "beverage", title: "Beverage", alt: "Capped water bottles with lot identification moving along a beverage conveyor", copy: "Bottle and can coding. Breakdown repair, printheads, ink-system parts, make-up fluids and replacement printers.", links: ["service", "parts", "printers"] },
  { id: "dairy", title: "Dairy", alt: "Opaque milk bottles with seated screw caps and lot codes on a dairy packaging conveyor", copy: "Coding for milk and dairy packaging. Printer maintenance, breakdown repair, parts and consumables.", links: ["maintenance", "parts"] },
  { id: "pharmaceutical", title: "Pharmaceutical", alt: "Plain pharmaceutical cartons with lot coding on a packaging line", copy: "Batch, manufacturing and expiry coding on pharmaceutical packaging. Printer repair, maintenance, components and consumables.", links: ["service", "parts"] },
  { id: "wire-cable", title: "Wire & Cable", alt: "Black cable with white identification marking passing through production guide rollers", copy: "Continuous wire and cable marking. CIJ service, printhead and nozzle repair, inks and replacement parts.", links: ["nozzle", "parts"] },
  { id: "pipes-tubes", title: "Pipes & Tubes", alt: "Grey PVC pipes with batch marking on industrial roller supports", copy: "Identification on PVC and metal pipes and tubes. Printer repair, maintenance, parts and consumables.", links: ["service", "parts", "printers"] },
  { id: "cosmetics-personal-care", title: "Cosmetics & Personal Care", alt: "Lidded cosmetic jars with subtle lot codes moving through a packaging line", copy: "Batch and date coding on bottles, jars and cartons. Equipment service, components and consumables.", links: ["service", "parts"] },
  { id: "electronics", title: "Electronics", alt: "Electronic modules in protective trays beside lot-labelled component packaging", copy: "Product and packaging identification. Industrial printer service, component-level PCB repair and parts.", links: ["service", "pcb", "parts"] },
  { id: "general-manufacturing", title: "General Manufacturing", alt: "Batch-coded shipping cartons beside a printhead on a roller conveyor", copy: "CIJ, TIJ and DOD coding for products and packaging. Service, parts, consumables and new or refurbished printers.", links: ["service", "parts", "printers"] },
] as const;

export const industrySupport = {
  service: { label: "Request Service", href: "/repair-service#request" },
  maintenance: { label: "Service & Maintenance", href: "/repair-service#maintenance" },
  nozzle: { label: "Printhead & Nozzle Service", href: "/repair-service#repair-capabilities" },
  pcb: { label: "PCB Repair", href: "/repair-service#pcb-repair" },
  parts: { label: "Find Spare Parts", href: "/parts-consumables" },
  printers: { label: "View Printers", href: "/printers" },
};
