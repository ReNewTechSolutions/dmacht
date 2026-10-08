import Link from "next/link";
import { notFound } from "next/navigation";
import { policies, policyKeys, policyLinks, isPolicyKey } from "../../../../lib/bazaarbox-policies";
import { pageMetadata } from "../../../../lib/metadata";
import styles from "./policy.module.css";

type Props = { params: Promise<{ policy: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return policyKeys.map((policy) => ({ policy }));
}
export async function generateMetadata({ params }: Props) {
  const { policy } = await params;
  if (!isPolicyKey(policy)) notFound();
  return pageMetadata(`/bazaarboxbeta/${policy}`, `${policies[policy].title} | BazaarBox by DMacht`, "BazaarBox marketplace policies and customer support. Operated in India by Deepumon Pillai, carrying on business as DMacht.");
}

export default async function PolicyPage({ params }: Props) {
  const { policy } = await params;
  if (!isPolicyKey(policy)) notFound();
  const content = policies[policy];
  return (
    <main className={styles.page} lang="en">
      <div className={styles.container}>
        <Link className={styles.back} href="/bazaarboxbeta">← BazaarBox by DMacht</Link>
        <header className={styles.heading}>
          <p>BazaarBox · Policies & Customer Support</p>
          <h1>{content.title}</h1>
          <p>Effective 8 October 2026. This English version is the current policy text.</p>
        </header>
        <aside className={styles.summary} aria-label="Marketplace service and merchant information">
          <h2>Marketplace services and local transactions</h2>
          <p>BazaarBox is a local classified-advertising marketplace operated by DMacht. Legal operator: Deepumon Pillai. ReNewTech Solutions is the technology collaboration partner, not the legal merchant.</p>
          <p>DMacht charges sellers for marketplace listing services: ₹10 for one listing active for 30 days from publication; introductory packs, when available, are ₹50 for up to 20 listings or ₹100 for up to 100 listings. Packs have a 30-day posting window and each published listing receives its own 30 days.</p>
          <p>Online payment checkout is not enabled yet. A fee applies only when the applicable paid service is offered through BazaarBox and you choose it at checkout. This DMacht page does not collect payments.</p>
          <p>Buyers and sellers arrange safe local meetups, inspect items and transact directly. BazaarBox does not provide shipping, delivery, escrow or buyer-to-seller item-payment processing. Listings are subject to moderation; see the <Link href="/bazaarboxbeta/safety">Safety & Posting Rules</Link> and <Link href="/bazaarboxbeta/refund-policy">Refund & Cancellation Policy</Link>.</p>
        </aside>
        <nav className={styles.links} aria-label="Policies & Customer Support">
          {policyLinks.map((item) => <Link key={item.key} href={item.href} aria-current={policy === item.key ? "page" : undefined}>{item.label}</Link>)}
        </nav>
        <article className={styles.article} data-policy-body={policy}>
          {content.blocks.map((block, index) => {
            if (block.startsWith("## ")) return <h2 key={index}>{block.slice(3)}</h2>;
            if (block.startsWith("### ")) return <h3 key={index}>{block.slice(4)}</h3>;
            if (block.startsWith("- ")) return <ul key={index}>{block.split("\n- ").map((line, item) => <li key={item}>{line.replace(/^- /, "")}</li>)}</ul>;
            return <p key={index}>{block}</p>;
          })}
        </article>
        <footer className={styles.support}>
          <h2>Contact & Grievances</h2>
          <p><strong>Deepumon Pillai · DMacht</strong></p>
          <address>GHULE WASTI, MANJARI BUDRUK, PUNE, PIN 412307, MAHARASHTRA, INDIA</address>
          <p><a href="mailto:hello@renewtech.solutions">hello@renewtech.solutions</a></p>
          <p>Technology collaboration: <a href="https://renewtech.solutions" target="_blank" rel="noopener noreferrer">ReNewTech Solutions</a>.</p>
          <p>This is DMacht’s copy of the <a href={`https://bazaarbox.app/${policy}`}>BazaarBox marketplace policy</a>. The marketplace remains at <a href="https://bazaarbox.app">bazaarbox.app</a>.</p>
          <Link className={styles.back} href="/bazaarboxbeta">Back to BazaarBox listing services →</Link>
        </footer>
      </div>
    </main>
  );
}
