import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import { RegionProvider } from "@/components/region";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dmacht.com"),
  title: "D-Macht",
  description: "Industrial inkjet printer support + OEM compatible inks and fluids."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-black text-white">
        <Providers>
          <RegionProvider defaultRegion="IN">
            <Navbar />
            {children}
          </RegionProvider>
        </Providers>
      </body>
    </html>
  );
}