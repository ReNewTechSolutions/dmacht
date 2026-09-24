import { pageMetadata } from "../../../lib/metadata";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import PrinterInventory from "../../../components/PrinterInventory";

export const metadata = pageMetadata(
  "/printers",
  "New & Refurbished Industrial Printers | D-Macht",
  "Ask D-Macht in Pune about new handheld and refurbished industrial coding and marking printers. Share your CIJ, TIJ or DOD application to confirm suitable options.",
);

export default function PrintersPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Industrial printers"
          title="New and refurbished printers for real production lines."
          copy="Browse the available buying paths, then tell D-Macht what you print, the line conditions and when you need the equipment."
          image="/brand/photography/printers-workshop.webp"
          imageAlt="Industrial coding printer cabinets on a clean workshop bench"
          imageNote="Illustrative equipment image — not current inventory"
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
