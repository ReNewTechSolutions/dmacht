// src/lib/support.ts
import type { Region } from "@/components/region";

export const ENDORSEMENT = "D-Macht — a ReNewTech Solutions service line.";

export const REGION_SUPPORT = {
  unknown: {
    id: "unknown",
    label: "Select region",
    phoneDisplay: "—",
    phoneE164: "",
    email: "support@dmacht.com",
    headline: "Choose a region to personalize support",
    sub: "Region affects availability, cadence, and on-site scheduling expectations.",
    note: "Tip: choose a region to unlock the correct availability + contact details."
  },
  IN: {
    id: "IN",
    label: "India (live now)",
    phoneDisplay: "+91 99608 16363",
    phoneE164: "+919960816363",
    email: "support@dmacht.com",
    headline: "India support is live",
    sub: "Fast triage + preventive planning. We’ll confirm cadence, scope, and spares strategy.",
    note: "India: field service + remote diagnostics available now."
  },
  US: {
    id: "US",
    label: "US / Kansas City (booking soon)",
    phoneDisplay: "+1 (816) 957-3063",
    phoneE164: "+18169573063",
    email: "service@dmacht.com",
    headline: "US support is booking soon",
    sub: "Remote diagnostics now. We’ll confirm Kansas City scheduling as slots open.",
    note: "US: booking soon — remote diagnostics available now."
  },
} as const;