"use client";

import type { FormEvent } from "react";
import { contact } from "../data/site";

const serviceTypes = [
  "Printer repair / breakdown support",
  "Preventive maintenance / AMC",
  "PCB or chip-level repair",
  "Ink / make-up fluid / consumables",
  "Spare parts request",
  "Refurbished printer inquiry",
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
  "Power supply", "Pump", "Filter", "Printhead", "Head assembly", "Nozzle block",
  "Keypad", "Display", "Sensor", "PCB", "Ink core assembly", "Ink", "Make-up fluid", "Cleaner", "Other / not sure",
];

type ServiceRequestProps = {
  variant?: "service" | "parts" | "refurbished" | "contact";
};

export default function ServiceRequest({ variant = "service" }: ServiceRequestProps) {
  const isParts = variant === "parts";
  const heading = isParts ? "Request a part or consumable." : variant === "refurbished" ? "Ask about available printers." : "Tell us what the printer is doing.";

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
    const subject = isParts ? "Parts / Consumables Inquiry" : variant === "refurbished" ? "Refurbished Printer Inquiry" : "Industrial Printer Service Request";
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  return (
    <section className="requestSection" id="request" aria-label={heading}>
      <div className="requestIntro">
        <span className="eyebrow">Request support</span>
        <h2>{heading}</h2>
        <p>Not sure what is wrong? Send a photo or video and D-Macht will help identify the issue. You can submit even if the exact model is unknown.</p>
        <div className="requestHelp">
          <strong>Production stopped?</strong>
          <p>Include the exact error code and mark the urgency as line down.</p>
          <a href={`mailto:${contact.email}?subject=Urgent%20Industrial%20Printer%20Breakdown`}>{contact.email}</a>
        </div>
      </div>

      <form className="requestForm" action={`mailto:${contact.email}`} method="post" encType="text/plain" onSubmit={openEmail}>
        <input type="hidden" name="requestType" value={variant} />
        <div className="formRow">
          <label>
            <span>Name</span>
            <input name="name" placeholder="Your name" required />
          </label>
          <label>
            <span>Company</span>
            <input name="company" placeholder="Company / facility" />
          </label>
        </div>

        <div className="formRow">
          <label>
            <span>Email *</span>
            <input name="email" type="email" placeholder="you@company.com" required />
          </label>
          <label>
            <span>Phone / WhatsApp *</span>
            <input name="phone" type="tel" placeholder="Best callback number" required />
          </label>
        </div>

        <div className="formRow">
          <label>
            <span>Printer brand</span>
            <input name="printerBrand" placeholder="Videojet, Domino, Linx…" />
          </label>
          <label>
            <span>{isParts ? "Category" : "Service needed"} *</span>
            <select name={isParts ? "category" : "serviceType"} defaultValue="" required>
              <option value="" disabled>
                {isParts ? "Choose category" : "Choose service"}
              </option>
              {(isParts ? partCategories : serviceTypes).map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="formRow">
          <label>
            <span>Urgency *</span>
            <select name="urgency" defaultValue="" required>
              <option value="" disabled>
                Choose urgency
              </option>
              {urgencyOptions.map((urgency) => (
                <option key={urgency}>{urgency}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Printer model</span>
            <input name="printerModel" placeholder="Model / serial if known" />
          </label>
        </div>

        <div className="formRow">
          <label>
            <span>{isParts ? "Part number" : "Error code"}</span>
            <input name={isParts ? "partNumber" : "errorCode"} placeholder={isParts ? "If known" : "Exact code if shown"} />
          </label>
          <label>
            <span>Location *</span>
            <input name="location" placeholder="City / plant location" required />
          </label>
        </div>

        <label className="fullField">
          <span>{isParts ? "What do you need? *" : "Problem description *"}</span>
          <textarea
            name="details"
            placeholder={isParts ? "Describe the component, quantity, current label or application." : "What is happening, when did it start, and is production stopped?"}
            required
          />
        </label>

        <label className="fullField fileField">
          <span>Photo / video</span>
          <input name="referenceFiles" type="file" accept="image/*,video/*" multiple />
          <small>When your email app opens, attach the selected files before sending.</small>
        </label>

        <button className="button primary" type="submit">
          {isParts ? "Open parts inquiry" : "Open service request"}
        </button>

        <p className="requestFinePrint">
          Your details are placed into a new email to D-Macht. Review it, attach your photo or video, then send.
        </p>
      </form>
    </section>
  );
}
