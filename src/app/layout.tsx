import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "D-Macht — AI Outreach you can inspect",
    template: "%s · D-Macht",
  },
  description:
    "Translate AI outreach into digestible, step-based visuals. Clear capabilities, integrations, and reporting for technical decision makers.",
  metadataBase: new URL("https://dmacht.com"),
  openGraph: {
    title: "D-Macht — AI Outreach you can inspect",
    description:
      "Step-based outreach automation with transparent logic, integration-friendly workflows, and audit-ready reporting.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-black text-white">
        <Navbar />

        <main className="mx-auto max-w-6xl px-4">{children}</main>

        <footer className="mt-20 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-white/70">
                <span className="font-medium text-white/85">D-Macht</span> ·
                Step-based outreach automation
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-white/60">
                <a className="hover:text-white" href="#capabilities">
                  Capabilities
                </a>
                <a className="hover:text-white" href="#integrations">
                  Integrations
                </a>
                <a className="hover:text-white" href="#security">
                  Security
                </a>
                <a className="hover:text-white" href="#contact">
                  Contact
                </a>
              </div>
            </div>

            <div className="mt-6 text-xs text-white/45">
              © 2026 D-Macht. Built for clarity, fit, and repeatability.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}