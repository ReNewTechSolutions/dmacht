import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dmacht.com"),
  title: {
    default: "D-Macht | Industrial Printer Repair, Maintenance, Parts & Consumables",
    template: "%s | D-Macht",
  },
  description:
    "D-Macht provides industrial coding and marking support for CIJ, TIJ, and DOD printer environments, including repair, maintenance, PCB support, parts, inks, fluids, and refurbished printer sourcing.",
  keywords: [
    "industrial printer repair",
    "CIJ printer support",
    "TIJ printer support",
    "DOD printer support",
    "industrial inkjet maintenance",
    "coding and marking support",
    "printer consumables",
    "inkjet printer spare parts",
    "PCB repair",
    "D-Macht",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "D-Macht | Industrial Printer Repair, Maintenance, Parts & Consumables",
    description:
      "Industrial coding and marking support for CIJ, TIJ, and DOD printer environments — repair, maintenance, parts, inks, fluids, and refurbished printer sourcing.",
    url: "https://www.dmacht.com",
    siteName: "D-Macht",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "D-Macht — industrial printer support for production uptime",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "D-Macht | Industrial Printer Support",
    description:
      "Repair, maintenance, parts, inks, fluids, and refurbished printer sourcing for industrial coding and marking systems.",
    images: ["/brand/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dmachtBody">{children}</body>
    </html>
  );
}