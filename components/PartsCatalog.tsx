"use client";

import { useState } from "react";
import { brands } from "../data/site";
import { partGroups } from "../data/catalog";
import ServiceRequest from "./ServiceRequest";

export default function PartsCatalog() {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [inquiry, setInquiry] = useState({ printerBrand: "", printerModel: "", partNumber: "", category: "", photoHelp: false });
  const results = partGroups.filter((group) => `${group.title} ${group.items.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()));
  function choose(value: string, photo = false) {
    setInquiry({ printerBrand: brand, printerModel: model, partNumber, category: value, photoHelp: photo });
  }
  return <>
    <section className="section container" id="categories">
      <span className="eyebrow">Browse spare parts</span>
      <h2>Search parts</h2>
      <p>Browse by part type. Add a brand, printer model or part number so we can confirm compatibility and availability.</p>
      <div className="catalogFilters">
        <label>Part type<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try nozzle, PCB or ink" /></label>
        <label>Brand<select value={brand} onChange={(event) => setBrand(event.target.value)}><option value="">Any brand / not sure</option>{[...brands, "Willett"].map((name) => <option key={name}>{name}</option>)}</select></label>
        <label>Printer model<input value={model} onChange={(event) => setModel(event.target.value)} placeholder="Model on the machine label" /></label>
        <label>Part number<input value={partNumber} onChange={(event) => setPartNumber(event.target.value)} placeholder="If known" /></label>
      </div>
      <p className="catalogNote">This is a category catalogue. Model and part-number matches are confirmed by D-Macht; no live stock or compatibility is implied.</p>
      <p role="status">{results.length} {results.length === 1 ? "category" : "categories"}{brand ? ` · For your ${brand} inquiry` : ""}</p>
      <div className="catalogGrid">{results.map((group) => <article key={group.title}><h3>{group.title}</h3><p>{group.items.join(" · ")}</p>{group.title === "Inks, Fluids & Consumables" && <p>CIJ, DOD and TIJ ink products, plus solvents and cleaners for multiple printer brands. Send the current fluid label to check suitability.</p>}<a className="textLink" href="#parts-inquiry" onClick={() => choose(group.title)}>Request these parts →</a></article>)}</div>
      {!results.length && <div className="emptyInventory"><h3>No category matches that term.</h3><p>Send the part number or a photo and we’ll help identify the component.</p></div>}
      <a className="textLink" href="#parts-inquiry" onClick={() => choose("Other / not sure")}>Ask about this brand, model or part number →</a>
      <aside className="photoCallout"><div><span className="eyebrow">Don’t know the part name?</span><h2>Send us a photo.</h2><p>Show the broken or existing component and its label. Include your printer brand and model so D-Macht can help identify it.</p></div><a className="button primary" href="#parts-inquiry" onClick={() => choose("Other / not sure", true)}>Add a component photo →</a></aside>
    </section>
    <div className="container requestWrap" id="parts-inquiry"><ServiceRequest key={JSON.stringify(inquiry)} variant="parts" initial={inquiry} /></div>
  </>;
}
