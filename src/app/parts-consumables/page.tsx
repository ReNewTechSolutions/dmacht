import { pageMetadata } from "../../../lib/metadata";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import PartsCatalog from "../../../components/PartsCatalog";

export const metadata = pageMetadata(
  "/parts-consumables",
  "Industrial Printer Spare Parts | D-Macht",
  "Find industrial printer spare parts, CIJ, TIJ and DOD inks, fluids and consumables. Ask D-Macht in Pune to identify a part by model, part number or photo.",
);

export default function PartsConsumablesPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Parts & consumables"
          title="Spare Parts & Consumables"
          copy="Find parts by printer brand, model or part number. Not sure? Send a photo."
          image="/brand/photography/parts-bench.webp"
          imageAlt="Industrial printer pumps filters printheads electronics and fluid bottles"
          primaryLabel="Find Spare Parts"
          primaryHref="#categories"
          secondaryLabel="Send Part Photo"
          secondaryHref="#part-photo"
        />

        <PartsCatalog />
      </main>
      <Footer />
    </>
  );
}
