// src/lib/support.ts
import type { Region } from "@/components/region";

export const ENDORSEMENT = "DMacht — a ReNewTech Solutions service line.";

export type SupportInfo = {
  key: Region;
  label: string;
  email: string;
  phoneE164: string;      // for tel:
  phoneDisplay: string;   // for UI
  note?: string;
  booking?: "live" | "soon";
};

export const REGION_SUPPORT: Record<Region, SupportInfo> = {
  unknown: {
    key: "unknown",
    label: "Select region",
    email: "service@dmacht.com",
    phoneE164: "+18169573063",
    phoneDisplay: "+1 (816) 957-3063",
    note: "Select a region to see the correct contact + availability.",
  },

  IN: {
    key: "IN",
    label: "India (live now)",
    email: "support@dmacht.com",
    phoneE164: "+919960816363",
    phoneDisplay: "+91 99608 16363",
    booking: "live",
    note: "India support is live — triage + preventive planning available.",
  },

  US: {
    key: "US",
    label: "US / Kansas City (booking soon)",
    email: "service@dmacht.com",
    phoneE164: "+18169573063",
    phoneDisplay: "+1 (816) 957-3063",
    booking: "soon",
    note: "US note: booking soon — remote diagnostics available now; on-site scheduling opens as slots become available.",
  },
};