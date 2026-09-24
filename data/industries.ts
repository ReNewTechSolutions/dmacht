export const productionEnvironments = [
  { id: "food-packaging", title: "Food & Packaging", alt: "Sealed biscuit packs with batch coding on a stainless-steel packaging conveyor", copy: "Coding support for packaged foods, cartons and pouches, with printer service, maintenance, spare parts, inks, fluids and new or refurbished equipment.", links: ["service", "parts", "printers"] },
  { id: "beverage", title: "Beverage", alt: "Capped water bottles with lot identification moving along a beverage conveyor", copy: "Support for bottle, can and beverage packaging lines: breakdown repair, printheads, ink-system components, inks, make-up fluids and replacement printers.", links: ["service", "parts", "printers"] },
  { id: "dairy", title: "Dairy", alt: "Opaque milk bottles with seated screw caps and lot codes on a dairy packaging conveyor", copy: "Coding and marking support for milk and dairy packaging, backed by printer maintenance, breakdown repair, replacement parts and production consumables.", links: ["maintenance", "parts"] },
  { id: "pharmaceutical", title: "Pharmaceutical", alt: "Plain pharmaceutical cartons with lot coding on a packaging line", copy: "Support for equipment printing batch, manufacturing and expiry information on pharmaceutical packaging, including maintenance, repair, components and consumables.", links: ["service", "parts"] },
  { id: "wire-cable", title: "Wire & Cable", alt: "Black cable with white identification marking passing through production guide rollers", copy: "Continuous identification and production marking on wire and cable, supported by CIJ printer servicing, printhead and nozzle repair, inks and replacement components.", links: ["nozzle", "parts"] },
  { id: "pipes-tubes", title: "Pipes & Tubes", alt: "Grey PVC pipes with batch marking on industrial roller supports", copy: "Equipment and support for identification on PVC, metal and related pipe and tube applications, including printer repair, maintenance, parts and consumables.", links: ["service", "parts", "printers"] },
  { id: "cosmetics-personal-care", title: "Cosmetics & Personal Care", alt: "Lidded cosmetic jars with subtle lot codes moving through a packaging line", copy: "Coding support for cosmetic bottles, containers, cartons and packaged products, with equipment service, replacement components and coding consumables.", links: ["service", "parts"] },
  { id: "electronics", title: "Electronics", alt: "Electronic modules in protective trays beside lot-labelled component packaging", copy: "Coding and marking support for electronics manufacturing and packaged components, backed by printer service and component-level PCB repair capabilities.", links: ["service", "pcb", "parts"] },
  { id: "general-manufacturing", title: "General Manufacturing", alt: "Batch-coded shipping cartons beside a printhead on a roller conveyor", copy: "CIJ, TIJ and DOD support for manufactured products and packaging, including printer service, spare parts, consumables and new or refurbished equipment.", links: ["service", "parts", "printers"] },
] as const;

export const industrySupport = {
  service: { label: "Book Service", href: "/repair-service#request" },
  maintenance: { label: "Service & Maintenance", href: "/repair-service#maintenance" },
  nozzle: { label: "Printhead & Nozzle Service", href: "/repair-service#repair-capabilities" },
  pcb: { label: "PCB Repair", href: "/repair-service#pcb-repair" },
  parts: { label: "Parts & Consumables", href: "/parts-consumables" },
  printers: { label: "New & Refurbished Printers", href: "/printers" },
};
