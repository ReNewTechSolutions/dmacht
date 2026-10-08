import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata, productionOrigin } from "../../../lib/metadata";
import styles from "./page.module.css";

const title = "BazaarBox | Local Marketplace by DMacht";
const description = "BazaarBox is a local online marketplace operated by DMacht in India. Post listings from ₹10, connect with nearby buyers and sellers, and arrange local meetups.";
const base = pageMetadata("/bazaarboxbeta", title, description);
const image = `${productionOrigin}/brand/bazaarbox/marketplace-v5.png`;
export const metadata: Metadata = {
  ...base,
  openGraph: { ...base.openGraph, images: [{ url: image, width: 1200, height: 630, alt: "BazaarBox — sell your stuff, connect with local buyers" }] },
  twitter: { ...base.twitter, images: [image] },
};

const policies = [
  ["Terms & Conditions", "/terms"],
  ["Privacy Policy", "/privacy"],
  ["Refund & Cancellation Policy", "/refund-policy"],
  ["Safety & Posting Rules", "/safety"],
  ["Local Meetup / No Shipping Policy", "/shipping-delivery-policy"],
] as const;
const plans = [
  { name: "Single Listing", price: "₹10", quantity: "1 listing", note: "A simple start", detail: "Your published listing runs for 30 days." },
  { name: "Launch Pack", price: "₹50", quantity: "Up to 20 listings", note: "Introductory promotion", detail: "A 30-day posting window. Each published listing gets its own 30 days." },
  { name: "Mega Launch Pack", price: "₹100", quantity: "Up to 100 listings", note: "Introductory promotion", detail: "A 30-day posting window. Each published listing gets its own 30 days." },
];

export default function BazaarBoxPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="bazaarbox-heading">
        <div className={styles.container}>
          <p className={styles.eyebrow}>A local marketplace · Operated by DMacht</p>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.brand}>
                <Image src="/brand/bazaarbox/mark.png" alt="" width={68} height={68} priority />
                <span>Bazaar<span className={styles.orange}>Box</span></span>
              </div>
              <h1 id="bazaarbox-heading">Your local marketplace, online.</h1>
              <p className={styles.lead}>Post your ad for ₹10.<br />Find your buyer.</p>
              <p className={styles.intro}>Give things a new home. Connect with people nearby and arrange a local meetup, on your terms.</p>
              <div className={styles.actions}>
                <a className={styles.primary} href="https://bazaarbox.app">Explore BazaarBox <span aria-hidden="true">↗</span></a>
                <a className={styles.secondary} href="#listing-services">View listing services <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <figure className={styles.art}>
              <Image src="/brand/bazaarbox/marketplace-v5.png" alt="BazaarBox: sell your stuff, get cash. Everyday items ready for a new home." width={1200} height={630} sizes="(max-width: 800px) 100vw, 55vw" priority />
              <figcaption>Local people. Independent deals. New possibilities.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="listing-services" className={styles.section} aria-labelledby="pricing-heading">
        <div className={styles.container}>
          <p className={styles.eyebrow}>Simple listing services</p>
          <h2 id="pricing-heading">A little space for your next sale.</h2>
          <p className={styles.sectionIntro}>DMacht charges sellers for marketplace listing services. All prices below are in Indian rupees (INR), not the price of the items advertised.</p>
          <div className={styles.pricing}>
            {plans.map((plan) => <article className={styles.card} key={plan.name}>
              <p className={styles.planNote}>{plan.note}</p>
              <h3>{plan.name}</h3>
              <p className={styles.price}>{plan.price}<span> INR</span></p>
              <p className={styles.quantity}>{plan.quantity}</p>
              <p>{plan.detail}</p>
            </article>)}
          </div>
          <aside className={styles.notice}>
            <strong>About availability</strong>
            <p>Online payment checkout is not enabled yet. These are the intended listing-service prices; do not make a payment through this page. Promotional packs have a 30-day posting window, and each published listing receives its own 30-day duration.</p>
          </aside>
        </div>
      </section>

      <section className={`${styles.section} ${styles.local}`} aria-labelledby="local-heading">
        <div className={styles.container}>
          <p className={styles.eyebrow}>Built for nearby</p>
          <h2 id="local-heading">Meet locally. Make the deal together.</h2>
          <div className={styles.steps}>
            <article><span className={styles.number}>01</span><h3>List your item</h3><p>Describe what you’re selling and add clear photos so nearby buyers can discover it.</p></article>
            <article><span className={styles.number}>02</span><h3>Connect with a buyer</h3><p>Discuss the item and agree on a convenient, safe public place to meet.</p></article>
            <article><span className={styles.number}>03</span><h3>Arrange your own transaction</h3><p>Buyers and sellers inspect items, agree on terms and handle payment independently.</p></article>
          </div>
          <p className={styles.model}>BazaarBox is a local classified-advertising marketplace operated by DMacht. BazaarBox does not sell the goods in user advertisements or provide shipping, delivery, escrow, or buyer-to-seller payment processing.</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="operator-heading">
        <div className={`${styles.container} ${styles.details}`}>
          <div>
            <p className={styles.eyebrow}>The people behind the product</p>
            <h2 id="operator-heading">BazaarBox, by DMacht.</h2>
            <p>Operated in India by <strong>DMacht</strong>, with technology collaboration by <a href="https://renewtech.solutions" target="_blank" rel="noopener noreferrer">ReNewTech Solutions</a>.</p>
            <dl className={styles.business}>
              <div><dt>Legal operator</dt><dd>Deepumon Pillai</dd></div>
              <div><dt>Business address</dt><dd><address>GHULE WASTI<br />MANJARI BUDRUK, PUNE<br />PIN 412307, MAHARASHTRA, INDIA</address></dd></div>
              <div><dt>Support</dt><dd><a href="mailto:hello@renewtech.solutions">hello@renewtech.solutions</a></dd></div>
            </dl>
          </div>
          <div className={styles.policyPanel}>
            <h3>Know before you list</h3>
            <p>Read the marketplace’s public policies and practical guidance.</p>
            <ul>{policies.map(([label, path]) => <li key={path}><a href={`https://bazaarbox.app${path}`}>{label}<span aria-hidden="true">↗</span></a></li>)}</ul>
          </div>
        </div>
      </section>

      <section className={styles.closing} aria-label="Explore the marketplace">
        <div className={styles.container}><div><p className={styles.eyebrow}>Your next buyer could be nearby</p><h2>Discover BazaarBox.</h2></div><a className={styles.primary} href="https://bazaarbox.app">Explore BazaarBox <span aria-hidden="true">↗</span></a></div>
      </section>
      <footer className={styles.footer}><div className={styles.container}>
        <Link href="/" aria-label="DMacht home"><Image src="/brand/dmacht-logo.svg" width={160} height={58} alt="D-Macht" /></Link>
        <p>BazaarBox is operated by DMacht.<br /><span>Technology collaboration: <a href="https://renewtech.solutions" target="_blank" rel="noopener noreferrer">ReNewTech Solutions</a></span></p>
      </div></footer>
    </main>
  );
}
