import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import MobileServiceBar from "../../components/MobileServiceBar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dmacht.com"),
  title: {
    default: "D-Macht | Industrial Printer Repair & Service in Pune",
    template: "%s | D-Macht",
  },
  description:
    "Industrial printer repair, maintenance, PCB diagnostics, parts, consumables and refurbished coding equipment from D-Macht in Pune.",
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
    title: "D-Macht | Industrial Printer Repair & Service in Pune",
    description:
      "Industrial printer repair, PCB diagnostics, maintenance, parts, consumables and refurbished coding equipment.",
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
    title: "D-Macht | Industrial Printer Repair & Service",
    description:
      "Repair, maintenance, parts, consumables and refurbished industrial coding printers.",
    images: ["/brand/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <MobileServiceBar />
      </body>
    </html>
  );
}
