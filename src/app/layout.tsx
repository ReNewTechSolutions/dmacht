import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/navbar";
import Providers from "./providers";

export const metadata: Metadata = {
  title: {
    default: "D-Macht — AI Outreach, explained step-by-step",
    template: "%s · D-Macht",
  },
  description:
    "Translate AI outreach into a transparent, step-based workflow. Quickly assess capabilities, integrations, and fit.",
  metadataBase: new URL("https://dmacht.com"),
  openGraph: {
    title: "D-Macht — AI Outreach, explained step-by-step",
    description:
      "Clarity-first AI outreach: step visuals, transparent capabilities, fast fit checks for technical teams.",
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-black text-white">
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}