import policies from "../data/bazaarbox-policies.json";

// Approved English policy snapshot, verified against bazaarbox.app on 8 October 2026.
// Preserve bodies verbatim. Run scripts/verify-bazaarbox-policies.mjs --source
// to compare every paragraph against the public authoritative marketplace pages.
export { policies };
export type PolicyKey = keyof typeof policies;
export const policyKeys = Object.keys(policies) as PolicyKey[];
export const policyLinks = policyKeys.map((key) => ({
  key,
  href: `/bazaarboxbeta/${key}`,
  label: key === "contact" ? "Contact & Grievances" : key === "shipping-delivery-policy" ? "Local Meetup / No Shipping Policy" : policies[key].title,
}));

export function isPolicyKey(value: string): value is PolicyKey {
  return Object.hasOwn(policies, value);
}
