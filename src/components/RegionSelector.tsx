// src/components/RegionSelector.tsx

import type { Region } from "@/components/region"; // or wherever Region is exported from

const OPTIONS: { id: Region; title: string; sub: string }[] = [
  {
    id: "US",
    title: "United States",
    sub: "US field service (launching) + remote diagnostics",
  },
  {
    id: "IN",
    title: "India",
    sub: "Regional field service + remote diagnostics",
  },
];