// src/lib/support.ts

/**
 * Shared, static brand copy.
 * No region logic lives here.
 * Region-aware data is owned by `components/region.tsx`.
 */

export const ENDORSEMENT =
  "D-Macht — a ReNewTech Solutions service line.";

export const BRAND = {
  name: "D-Macht",
  tagline: "Industrial inkjet printer support",
  description:
    "Expert diagnostics, preventive maintenance, and field service for Markem-Imaje and Domino environments.",
} as const;

/**
 * Optional helpers for meta tags, footer copy, etc.
 * Safe for server + client.
 */
export const META = {
  title: "D-Macht",
  description:
    "Industrial inkjet printer support for Markem-Imaje and Domino environments. Diagnostics, maintenance, and field service.",
} as const;