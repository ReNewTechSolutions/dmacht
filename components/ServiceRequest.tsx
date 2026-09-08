"use client";

import type { FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { contact } from "../data/site";

const serviceTypes = [
  "Printer repair / breakdown support",
  "Preventive maintenance / AMC",
  "PCB or chip-level repair",
  "Ink / make-up fluid / consumables",
  "Spare parts request",
  "New or refurbished printer inquiry",
  "Installation / setup support",
  "Other / not sure",
];

const urgencyOptions = [
  "Line down / production stopped",
  "Print quality issue",
  "Error code / intermittent fault",
  "Maintenance planning",
  "Parts / consumables request",
  "General inquiry",
];

const partCategories = [
  "PCB", "Printhead", "Nozzle", "Pump", "Filter", "Ink core", "Sensors",
  "Power supply", "Keypad", "Display", "Head assembly", "Ink", "Make-up fluid",
  "Cleaner", "Other / not sure",
];

const printerTypes = [
  "CIJ continuous inkjet",
  "TIJ thermal inkjet",
  "DOD drop-on-demand",
  "Not sure — recommend a printer",
];

type ServiceRequestProps = {
  variant?: "service" | "parts" | "printers" | "contact";
};

export default function ServiceRequest({ variant = "service" }: ServiceRequestProps) {
  const isParts = variant === "parts";
  const isPrinters = variant === "printers";
  const heading = isParts
    ? "Request a part or consumable."
    : isPrinters
      ? "Ask about new or refurbished printers."
      : "Tell us what the printer is doing.";
  const intro = isParts
    ? "Send the brand, model, part number or a clear photo. If you do not know the part, D-Macht will help identify it."
    : isPrinters
      ? "Share the application, print requirement and preferred condition. D-Macht will confirm suitable equipment and current availability."
      : "Not sure what’s wrong? Send us a photo or video and we’ll help identify the issue. You can submit even if the exact model is unknown.";

  function openEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const files = Array.from(form.querySelectorAll<HTMLInputElement>('input[type="file"]'))
      .flatMap((input) => Array.from(input.files ?? []))
      .map((file) => file.name);
    const lines = Array.from(data.entries()).flatMap(([key, value]) => {
      if (typeof value !== "string" || !value.trim()) return [];
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
      return [`${label}: ${value.trim()}`];
    });
    if (files.length) lines.push(`Files to attach: ${files.join(", ")}`);
    const subject = isParts
      ? "Spare Parts / Consumables Inquiry"
      : isPrinters
        ? "New / Refurbished Printer Inquiry"
        : "Industrial Printer Service Request";
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  const selectorLabel = isParts ? "Category" : isPrinters ? "Printer type" : "Service needed";
  const selectorOptions = isParts ? partCategories : isPrinters ? printerTypes : serviceTypes;
  const detailsLabel = isParts ? "Part description" : isPrinters ? "Application and print requirement" : "Problem description";
  const detailsPlaceholder = isParts
    ? "Describe the component, current label, where it fits, or what needs replacing."
    : isPrinters
      ? "What will you print on, what code is required, and what line speed or environment should we account for?"
      : "What is happening, when did it start, and is production stopped?";

  return (
    <section className="requestSection" id="request" aria-label={heading}>
      <div className="requestIntro">
        <span className="eyebrow">Request support</span>
        <h2>{heading}</h2>
        <p>{intro}</p>
        <div className="requestHelp">
          <strong>{isParts ? "Unsure which part fits?" : isPrinters ? "Need help choosing?" : "Production stopped?"}</strong>
          <p>{isParts ? "A label or component photo is enough to start." : isPrinters ? "Describe the production line and D-Macht can narrow the options." : "Include the exact error code and mark the urgency as line down."}</p>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>

      <form className="requestForm" action={`mailto:${contact.email}`} method="post" encType="text/plain" onSubmit={openEmail}>
        <input type="hidden" name="requestType" value={variant} />
        <div className="formRow">
          <label>
            <span>Name *</span>
            <input name="name" placeholder="Your name" required />
          </label>
          <label>
            <span>Company</span>
            <input name="company" placeholder="Company / facility" />
          </label>
        </div>

        <div className="formRow">
          <label>
            <span>Phone / WhatsApp *</span>
            <input name="phone" type="tel" placeholder="Best callback number" required />
          </label>
          <label>
            <span>Email *</span>
            <input name="email" type="email" placeholder="you@company.com" required />
          </label>
        </div>

        <div className="formRow">
          <label>
            <span>Printer brand</span>
            <input name="printerBrand" placeholder="Videojet, Domino, Linx…" />
          </label>
          <label>
            <span>{selectorLabel} *</span>
            <select name={isParts ? "category" : isPrinters ? "printerType" : "serviceType"} defaultValue="" required>
              <option value="" disabled>Choose {selectorLabel.toLowerCase()}</option>
              {selectorOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        </div>

        <div className="formRow">
          {isParts ? (
            <label><span>Quantity *</span><input name="quantity" type="number" min="1" placeholder="1" required /></label>
          ) : isPrinters ? (
            <label>
              <span>Preferred condition *</span>
              <select name="condition" defaultValue="" required>
                <option value="" disabled>Choose condition</option>
                <option>New</option><option>Refurbished</option><option>Open to either</option>
              </select>
            </label>
          ) : (
            <label>
              <span>Urgency *</span>
              <select name="urgency" defaultValue="" required>
                <option value="" disabled>Choose urgency</option>
                {urgencyOptions.map((urgency) => <option key={urgency}>{urgency}</option>)}
              </select>
            </label>
          )}
          <label>
            <span>{isPrinters ? "Model / series of interest" : "Printer model"}</span>
            <input name="printerModel" placeholder={isPrinters ? "If known" : "Model / serial if known"} />
          </label>
        </div>

        <div className="formRow">
          <label>
            <span>{isParts ? "Part number" : isPrinters ? "Required timeline" : "Error code"}</span>
            <input name={isParts ? "partNumber" : isPrinters ? "timeline" : "errorCode"} placeholder={isParts ? "If known" : isPrinters ? "When do you need the printer?" : "Exact code if shown"} />
          </label>
          <label>
            <span>Location *</span>
            <input name="location" placeholder="City / plant location" required />
          </label>
        </div>

        {isParts ? (
          <label className="formCheckbox">
            <input name="identificationHelp" type="checkbox" value="Yes — help identify the part" />
            <span>I don’t know which part I need — help me identify it</span>
          </label>
        ) : null}

        <label className="fullField">
          <span>{detailsLabel} *</span>
          <textarea name="details" placeholder={detailsPlaceholder} required />
        </label>

        <label className="fullField fileField">
          <span>{isPrinters ? "Reference photo or specification" : "Photo / video"}</span>
          <input name="referenceFiles" type="file" accept="image/*,video/*,.pdf" multiple />
          <small>When your email app opens, attach the selected files before sending.</small>
        </label>

        <button className="button primary requestSubmit" type="submit">
          {isParts ? "Open Spare Parts Inquiry" : isPrinters ? "Request Price / Availability" : "Open Service Request"}
          <ArrowRight size={18} aria-hidden="true" />
        </button>

        <p className="requestFinePrint">Your details are placed into a new email to D-Macht. Review it, attach your files, then send.</p>
      </form>
    </section>
  );
}
