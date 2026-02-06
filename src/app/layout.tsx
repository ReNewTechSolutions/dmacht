import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "DMacht",
    template: "%s • DMacht",
  },
  description:
    "Industrial inkjet printer service, electronics repair, and field support — Kansas City.",
  applicationName: "DMacht",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#050914",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh antialiased text-white">
        <div className="pcb min-h-dvh">
          {/* Ambient FX overlays */}
          <div className="fx-noise" aria-hidden />
          <div className="fx-scanlines" aria-hidden />

          <Navbar />
          <main id="main" className="relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}