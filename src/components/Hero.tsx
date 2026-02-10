"use client";

import Image from "next/image";
import Link from "next/link";

const ENDORSEMENT = "D-Macht — a ReNewTech Solutions service line.";

export default function Hero() {
  return (
    <section className="heroSection" aria-label="Hero">
      {/* Background image */}
      <div className="heroBg" aria-hidden>
        <Image
          src="/brand/dmacht-heroBanner.svg"
          alt=""
          fill
          priority
          className="heroBgImage"
        />
      </div>

      {/* Overlay for contrast */}
      <div className="heroOverlay" aria-hidden />

      {/* Content */}
      <div className="heroInner">
        <div className="heroContent">
          <div className="heroKicker">{ENDORSEMENT}</div>

          <h1 className="heroTitle">
            Industrial inkjet support that keeps production moving.
          </h1>

          <p className="heroSubtitle">
            Expert diagnostics, preventive maintenance, and field service for
            Markem-Imaje and Domino environments.
          </p>

          <div className="heroActions">
            <Link href="#contact" className="btn btn-primary">
              Request support
            </Link>

            <Link href="#workflow" className="btn btn-ghost">
              See how it works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}