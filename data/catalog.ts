// Categories from D-Macht brochure page 4. These are not live stock records.
export const partGroups = [
  { title: "Printheads & nozzles", items: ["Gutter Block", "Head Cover", "Head Assembly", "Nozzle Block", "Printer Head", "Nozzle", "Related head-cover components"] },
  { title: "Ink systems & fluid handling", items: ["Pump", "By-Pass Kit", "Filter Kit", "Ink Core Assembly"] },
  { title: "Electronics & controls", items: ["Power Supply", "Keypad", "LED Display", "Keypad Plate", "Alternate / Refurbished PCB", "Sensors"] },
  { title: "Inks, Solvents & Consumables", items: ["CIJ ink", "DOD ink", "TIJ ink", "Make-up solvent", "Cleaners"] },
];

export type PrinterListing = {
  id: string;
  photo: string;
  photoAlt: string;
  brand: string;
  model: string;
  printerType: string;
  condition: "New" | "Refurbished";
  specifications: string[];
  availability: string;
};

// Add only verified machines and availability here. Empty until Dee supplies inventory.
export const printerInventory: PrinterListing[] = [];
