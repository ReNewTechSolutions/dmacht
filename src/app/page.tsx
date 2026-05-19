import Hero from "../../components/Hero";
import OperationsSnapshot from "../../components/OperationsSnapshot";
import RegionSelector from "../../components/RegionSelector";
import ServiceMatrix from "../../components/ServiceMatrix";
import ProcessSteps from "../../components/ProcessSteps";
import TroubleshootingTips from "../../components/TroubleshootingTips";
import ServiceRequest from "../../components/ServiceRequest";
import FAQ from "../../components/FAQ";
import Footer from "../../components/Footer";


export default function Home() {
  return (
    <main className="siteShell">
      <Hero />
      <OperationsSnapshot />
      <RegionSelector />
      <ServiceMatrix />
      <ProcessSteps />
      <TroubleshootingTips />
      <ServiceRequest />
      <FAQ />
      <Footer />
    </main>
  );
}