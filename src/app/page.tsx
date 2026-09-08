import Hero from "../../components/Hero";
import ServiceChoices from "../../components/ServiceChoices";
import BrandStrip from "../../components/BrandStrip";
import CredibilityStrip from "../../components/CredibilityStrip";
import Capabilities from "../../components/Capabilities";
import PartsPaths from "../../components/PartsPaths";
import AboutPreview from "../../components/AboutPreview";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ServiceChoices />
        <BrandStrip />
        <CredibilityStrip />
        <Capabilities />
        <PartsPaths />
        <AboutPreview />
      </main>
      <Footer />
    </>
  );
}
