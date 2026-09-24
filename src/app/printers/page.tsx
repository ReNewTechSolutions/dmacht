import { pageMetadata } from "../../../lib/metadata";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import PrinterInventory from "../../../components/PrinterInventory";

export const metadata = pageMetadata(
  "/printers",
  "Industrial Coding Printers | D-Macht",
  "Ask D-Macht in Pune about new handheld and refurbished industrial coding and marking printers. Share your CIJ, TIJ or DOD application to confirm suitable options.",
);

export default function PrintersPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Industrial printers"
          title="New & Refurbished Printers"
          copy="Choose new or refurbished equipment. Share your material, code and line speed to check suitable options."
          image="/brand/photography/printers-workshop.webp"
          imageAlt="Industrial coding printer cabinets on a clean workshop bench"
          imageNote="Illustrative equipment. Contact us for current stock."
          primaryLabel="View Printers"
          primaryHref="#inventory"
          secondaryLabel="Request Price"
          secondaryHref="#request"
        />

        <PrinterInventory />
      </main>
      <Footer />
    </>
  );
}
