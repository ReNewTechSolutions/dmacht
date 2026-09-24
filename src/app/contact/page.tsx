import { pageMetadata } from "../../../lib/metadata";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import ServiceRequest from "../../../components/ServiceRequest";
import { contact } from "../../../data/site";

export const metadata = pageMetadata(
  "/contact",
  "Contact D-Macht | Service, Parts & Printer Inquiries",
  "Contact D-Macht in Pune, India for industrial printer repair, spare parts, consumables, or new and refurbished printers. Share your model, fault details or photos.",
);

export default function ContactPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Contact D-Macht"
          title="Send the machine details. We’ll take it from there."
          copy="Request repair, field service, parts, consumables or a refurbished printer. If you do not know the model, a photo of the machine and fault is enough to start."
          image="/brand/workshop-hero-v2.png"
          imageAlt="Industrial printer technician working on an open machine in a Pune service workshop"
          primaryLabel="Complete service request"
          primaryHref="#request"
          secondaryLabel="Email D-Macht"
          secondaryHref={`mailto:${contact.email}`}
        />

        <section className="contactMethods container" id="contact-methods">
          <article><span>01</span><h2>Email</h2><a href={`mailto:${contact.email}`}>{contact.email}</a><p>Best for fault details, photos, videos and part labels.</p></article>
          <article><span>02</span><h2>Call / WhatsApp</h2>{contact.phones.map((phone) => <p key={phone}><a href={`tel:${phone.replaceAll(" ", "")}`}>{phone}</a></p>)}<p>Or include a callback number in your inquiry.</p></article>
          <article><span>03</span><h2>Location</h2><strong>{contact.location}</strong><p>{contact.address}</p></article>
        </section>

        <div className="container requestWrap"><ServiceRequest variant="contact" /></div>
      </main>
      <Footer />
    </>
  );
}
