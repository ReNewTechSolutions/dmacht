"use client";

import React from "react";
import { RegionProvider } from "@/components/region";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <RegionProvider>{children}</RegionProvider>;
}
