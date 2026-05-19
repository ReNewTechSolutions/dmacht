import Image from "next/image";

export default function Hero() {
  return (
    <section className="heroSection" id="top">
      <div className="heroGrid">
        <div className="heroCopy">
          <div className="eyebrow">Factory operations dashboard • repair lab support</div>
          <h1>Industrial printer support built for production uptime.</h1>
          <p>
            D-Macht helps teams route repair, maintenance, parts, consumables, PCB support, and refurbished printer requests through one clear industrial service intake.
          </p>

          <div className="heroActions">
            <a className="button primary" href="#request">
              Start service request
            </a>
            <a className="button secondary" href="#process">
              See support process
            </a>
          </div>
        </div>

        <aside className="operationsCard" aria-label="Service intake summary">
          <div className="operationsImageFrame" aria-hidden>
            <Image
              src="/brand/hero-machine.png"
              alt=""
              fill
              sizes="(max-width: 1000px) 90vw, 430px"
              priority
              className="operationsImage"
            />
          </div>

          <div className="statusRow">
            <span className="statusDot" />
            Service intake online
          </div>

          <h2>Start with machine details.</h2>
          <p>
            The fastest request includes brand, model, error code, photos/video, location, and whether production is stopped.
          </p>

          <div className="ticketGrid">
            <div>
              <span>Best for</span>
              <strong>Repair, parts, fluids, maintenance</strong>
            </div>
            <div>
              <span>Route</span>
              <strong>India or US/global</strong>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
