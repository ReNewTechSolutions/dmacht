import Image from "next/image";
import Link from "next/link";
import styles from "./BazaarBoxFeature.module.css";

export default function BazaarBoxFeature() {
  return (
    <section className={styles.section} aria-labelledby="bazaarbox-product-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Image src="/brand/bazaarbox/mark.png" width={72} height={72} alt="" />
          <div><p>Our products</p><h2 id="bazaarbox-product-title">Bazaar<span>Box</span></h2></div>
        </div>
        <div className={styles.copy}><h3>Your local marketplace, online.</h3><p>An Indian local marketplace operated by DMacht, built in collaboration with ReNewTech Solutions.</p></div>
        <Link className="button primary" href="/bazaarboxbeta">Explore BazaarBox <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
