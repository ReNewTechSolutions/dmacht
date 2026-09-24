import ExpertisePhotography from "../../components/ExpertisePhotography";
import Hero from "../../components/Hero";
import ServiceChoices from "../../components/ServiceChoices";
import BrandStrip from "../../components/BrandStrip";
import CredibilityStrip from "../../components/CredibilityStrip";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ServiceChoices />
        <BrandStrip />
        <ExpertisePhotography />
        <CredibilityStrip />
      </main>
      <Footer />
    </>
  );
}
