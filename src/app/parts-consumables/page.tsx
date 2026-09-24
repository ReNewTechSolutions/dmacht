import { pageMetadata } from "../../../lib/metadata";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import PartsCatalog from "../../../components/PartsCatalog";

export const metadata = pageMetadata(
  "/parts-consumables",
  "Industrial Printer Spare Parts & Consumables | D-Macht",
  "Find industrial printer spare parts, CIJ, TIJ and DOD inks, fluids and consumables. Ask D-Macht in Pune to identify a part by model, part number or photo.",
);

export default function PartsConsumablesPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Parts & consumables"
          title="The right part starts with the right details."
          copy="Request industrial printer components, ink and fluids by brand, model, part number or photo. If you are unsure, D-Macht can help identify the item."
          image="/brand/parts-bench-v2.png"
          imageAlt="Industrial printer pumps filters printheads electronics and fluid bottles"
          primaryLabel="Start an inquiry"
          primaryHref="#parts-inquiry"
          secondaryLabel="View categories"
          secondaryHref="#categories"
        />

        <PartsCatalog />
      </main>
      <Footer />
    </>
  );
}
