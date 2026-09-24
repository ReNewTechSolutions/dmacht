"use client";

import Image from "next/image";
import { useState } from "react";
import { printerInventory } from "../data/catalog";
import ServiceRequest from "./ServiceRequest";

export default function PrinterInventory() {
  const [selection, setSelection] = useState({ condition: "", printerBrand: "", printerModel: "", listing: "" });
  return <>
    <section className="section container" id="inventory">
      <span className="eyebrow">Buy printers</span><h2>Choose new or refurbished.</h2>
      <div className="catalogGrid buyingPaths">
        <article id="new"><h2>New Printers</h2><p>Ask about new handheld printers for industrial marking and coding. Share your material, code and production requirements so D-Macht can confirm suitable options.</p><a className="textLink" href="#request" onClick={() => setSelection({ condition: "New", printerBrand: "", printerModel: "", listing: "" })}>Ask about new printers →</a></article>
        <article id="refurbished"><h2>Refurbished Printers</h2><p>D-Macht sources, refurbishes and resells previously owned industrial machinery. Machines may be customized to suit your production requirements and budget.</p><p>Discuss the application, configuration and maintenance needs with the refurbishment team.</p><a className="textLink" href="#request" onClick={() => setSelection({ condition: "Refurbished", printerBrand: "", printerModel: "", listing: "" })}>Ask about refurbished printers →</a></article>
      </div>
      {printerInventory.length === 0 ? <div className="emptyInventory"><h3>Contact us for current availability.</h3><p>No individual printers are listed online yet. Tell us what you need and D-Macht will confirm the available machines, specifications, condition and price.</p></div> : <div className="printerInventoryGrid">{printerInventory.map((printer) => <article className="printerCard" key={printer.id}><div className="printerCardImage"><Image src={printer.photo} alt={printer.photoAlt} fill sizes="(max-width: 860px) 100vw, 33vw" /></div><div className="printerCardBody"><p>{printer.brand}</p><h3>{printer.model}</h3><dl><div><dt>Type</dt><dd>{printer.printerType}</dd></div><div><dt>Condition</dt><dd>{printer.condition}</dd></div><div><dt>Specifications</dt><dd>{printer.specifications.join(" · ")}</dd></div><div><dt>Availability</dt><dd>{printer.availability}</dd></div></dl>{["Request Price", "Ask About This Printer"].map((action) => <a key={action} className="printerCardCta" href="#request" onClick={() => setSelection({ condition: printer.condition, printerBrand: printer.brand, printerModel: printer.model, listing: `${action}: ${printer.id} — ${printer.brand} ${printer.model}` })}>{action} →</a>)}</div></article>)}</div>}
    </section>
    <div className="container requestWrap" id="printer-inquiry"><ServiceRequest key={JSON.stringify(selection)} variant="printers" initial={selection} /></div>
  </>;
}
