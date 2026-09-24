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
        <article id="new"><h3>New Printers</h3><p>New handheld coding printers. Share your application to check suitable equipment.</p><a className="textLink" href="#request" onClick={() => setSelection({ condition: "New", printerBrand: "", printerModel: "", listing: "" })}>Request Price →</a></article>
        <article id="refurbished"><h3>Refurbished Printers</h3><p>Industrial printers refurbished for reuse. Ask about condition, configuration and suitability for your line.</p><a className="textLink" href="#request" onClick={() => setSelection({ condition: "Refurbished", printerBrand: "", printerModel: "", listing: "" })}>Request Price →</a></article>
      </div>
      {printerInventory.length === 0 ? <div className="emptyInventory"><h3>Contact us for current availability.</h3><p>Availability, specifications and prices are confirmed on inquiry.</p></div> : <div className="printerInventoryGrid">{printerInventory.map((printer) => <article className="printerCard" key={printer.id}><div className="printerCardImage"><Image src={printer.photo} alt={printer.photoAlt} fill sizes="(max-width: 860px) 100vw, 33vw" /></div><div className="printerCardBody"><p>{printer.brand}</p><h3>{printer.model}</h3><dl><div><dt>Type</dt><dd>{printer.printerType}</dd></div><div><dt>Condition</dt><dd>{printer.condition}</dd></div><div><dt>Specifications</dt><dd>{printer.specifications.join(" · ")}</dd></div><div><dt>Availability</dt><dd>{printer.availability}</dd></div></dl>{["Request Price"].map((action) => <a key={action} className="printerCardCta" href="#request" onClick={() => setSelection({ condition: printer.condition, printerBrand: printer.brand, printerModel: printer.model, listing: `${action}: ${printer.id}, ${printer.brand} ${printer.model}` })}>{action} →</a>)}</div></article>)}</div>}
    </section>
    <div className="container requestWrap" id="printer-inquiry"><ServiceRequest key={JSON.stringify(selection)} variant="printers" initial={selection} /></div>
  </>;
}
