"use client";

import Link from "next/link";

const ENDORSEMENT = "D-Macht — a ReNewTech Solutions service line.";

export default function Hero() {
  return (
    <section className="heroSection" aria-label="Hero" id="top">
      <div className="heroFrame">
        <div className="heroCard">
          {/* CSS background image */}
          <div className="heroMedia" aria-hidden />
          {/* contrast overlay */}
          <div className="heroOverlay" aria-hidden />

          <div className="heroInner">
            {/* LEFT */}
            <div className="heroLeft">
              <div className="heroKicker">{ENDORSEMENT}</div>

              <h1 className="heroTitle">Industrial inkjet support that keeps production moving.</h1>

              <p className="heroSubtitle">
                Expert diagnostics, preventive maintenance, and field service for Markem-Imaje and Domino environments.
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

            {/* RIGHT (optional panel placeholder — delete if you don’t want it yet) */}
            <aside className="heroRight" aria-label="Quick contact">
              <div className="heroRightK">Support channel</div>
              <div className="heroRightTitle">Remote-first triage</div>
              <div className="heroRightSub">
                Send model + error code + photos/video. We’ll reply with clear next steps and recommended spares.
              </div>

              <div className="heroContactGrid">
                <div className="heroContactCard">
                  <div className="heroContactK">Email</div>
                  <div className="heroContactV">support@dmacht.com</div>
                </div>

                <div className="heroContactCard">
                  <div className="heroContactK">Call/Text</div>
                  <div className="heroContactV">+1 (816) 957-3063</div>
                </div>
              </div>

              <div className="heroNote">Tip: select a region below to personalize availability and contact.</div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}