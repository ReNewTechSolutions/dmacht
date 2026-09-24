import type { Metadata } from "next";
import { pageMetadata, productionOrigin, siteTitle, siteDescription } from "../../lib/metadata";
import Navbar from "../../components/Navbar";
import MobileServiceBar from "../../components/MobileServiceBar";
import "./globals.css";

export const metadata: Metadata = {
  ...pageMetadata("/", siteTitle, siteDescription),
  metadataBase: new URL(productionOrigin),
  icons: { icon: [{ url: "/brand/dmacht-mark.svg", type: "image/svg+xml" }] },
  robots: { index: true, follow: true },
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
