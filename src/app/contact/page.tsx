import { pageMetadata } from "../../../lib/metadata";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import ServiceRequest from "../../../components/ServiceRequest";
import { contact } from "../../../data/site";

export const metadata = pageMetadata(
  "/contact",
  "Contact D-Macht",
  "Contact D-Macht in Pune, India for industrial printer repair, spare parts, consumables, or new and refurbished printers. Share your model, fault details or photos.",
);

export default function ContactPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Contact D-Macht"
          title="Contact D-Macht"
          copy="Send your printer model, fault details or a part photo. Call or email for service, parts and printer inquiries."
          image="/brand/photography/field-service.webp"
          imageAlt="Technician in navy workwear servicing coding equipment beside a production line"
          primaryLabel="Contact D-Macht"
          primaryHref="#request"
          secondaryLabel="Email D-Macht"
          secondaryHref={`mailto:${contact.email}`}
        />

        <section className="contactMethods container" id="contact-methods">
          <article><span>01</span><h2>Email</h2><a href={`mailto:${contact.email}`}>{contact.email}</a><p>Send details, photos or part labels.</p></article>
          <article><span>02</span><h2>Call / WhatsApp</h2>{contact.phones.map((phone) => <p key={phone}><a href={`tel:${phone.replaceAll(" ", "")}`}>{phone}</a></p>)}</article>
          <article><span>03</span><h2>Location</h2><strong>{contact.location}</strong><p>{contact.address}</p></article>
        </section>

        <div className="container requestWrap"><ServiceRequest variant="contact" /></div>
      </main>
      <Footer />
    </>
  );
}
