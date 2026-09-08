import Hero from "../../components/Hero";
import ServiceChoices from "../../components/ServiceChoices";
import BreakdownCTA from "../../components/BreakdownCTA";
import Capabilities from "../../components/Capabilities";
import MaintenanceSection from "../../components/MaintenanceSection";
import PartsPaths from "../../components/PartsPaths";
import BrandsIndustries from "../../components/BrandsIndustries";
import AboutPreview from "../../components/AboutPreview";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ServiceChoices />
        <BreakdownCTA />
        <Capabilities />
        <MaintenanceSection />
        <PartsPaths />
        <BrandsIndustries />
        <AboutPreview />
      </main>
      <Footer />
    </>
  );
}
