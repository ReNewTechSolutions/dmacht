import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import { RegionProvider } from "@/components/region";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dmacht.com"),
  title: "D-Macht",
  description: "Industrial inkjet printer support + OEM compatible inks and fluids.",
  openGraph: {
    title: "D-Macht",
    description: "Industrial inkjet printer support + OEM compatible inks and fluids.",
    url: "https://www.dmacht.com",
    siteName: "D-Macht",
    images: [
      {
        url: "/brand/dmacht-ogimage.png",
        width: 1200,
        height: 630,
        alt: "D-Macht — industrial inkjet support",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "D-Macht",
    description: "Industrial inkjet printer support + OEM compatible inks and fluids.",
    images: ["/brand/dmacht-ogimage.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-black text-white">
        <Providers>
          <RegionProvider defaultRegion="unknown">
            <div className="appShell">
              <Navbar />
              <main className="appMain">{children}</main>
            </div>
          </RegionProvider>
        </Providers>
      </body>
    </html>
  );
}