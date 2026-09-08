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
    "Book industrial printer service, request spare parts, or ask about new and refurbished CIJ, TIJ and DOD coding printers from D-Macht.",
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
      "Industrial printer service, spare parts, and new or refurbished CIJ, TIJ and DOD coding printers.",
    url: "https://www.dmacht.com",
    siteName: "D-Macht",
    images: [
      {
        url: "/brand/og-image-v2.png",
        width: 1731,
        height: 909,
        alt: "D-Macht industrial printer repair, spare parts and printers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "D-Macht | Industrial Printer Repair & Service",
    description: "Industrial printer service, spare parts, and new or refurbished coding printers.",
    images: ["/brand/og-image-v2.png"],
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
