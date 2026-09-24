import type { Metadata } from "next";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import PrinterInventory from "../../../components/PrinterInventory";

export const metadata: Metadata = {
  title: "New & Refurbished Industrial Printers",
  description: "Ask about new and workshop-refurbished CIJ, TIJ and DOD industrial coding printers from D-Macht.",
};

export default function PrintersPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Industrial printers"
          title="New and refurbished printers for real production lines."
          copy="Browse the available buying paths, then tell D-Macht what you print, the line conditions and when you need the equipment."
          image="/brand/refurbished-printers-v2.png"
          imageAlt="Industrial coding printers being inspected in a bright service workshop"
          primaryLabel="Browse printer options"
          primaryHref="#inventory"
          secondaryLabel="Ask about a printer"
          secondaryHref="#request"
        />

        <PrinterInventory />
      </main>
      <Footer />
    </>
  );
}
