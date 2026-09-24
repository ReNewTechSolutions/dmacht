import IndustriesPreview from "../../components/IndustriesPreview";
import ExpertisePhotography from "../../components/ExpertisePhotography";
import Hero from "../../components/Hero";
import ServiceChoices from "../../components/ServiceChoices";
import BrandStrip from "../../components/BrandStrip";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ServiceChoices />
        <BrandStrip />
        <ExpertisePhotography />
        <IndustriesPreview />
      </main>
      <Footer />
    </>
  );
}
