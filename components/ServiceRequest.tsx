"use client";

import { useState, type FormEvent } from "react";
import { partGroups } from "../data/catalog";
import { ArrowRight } from "lucide-react";
import { contact } from "../data/site";

const serviceTypes = [
  "Printer stopped working", "Print quality problem", "PCB/electronics problem",
  "Ink system problem", "Printhead/nozzle problem", "Preventive maintenance",
  "AMC / maintenance contract", "Something else",
];

const urgencyOptions = [
  "Line down / production stopped",
  "Print quality issue",
  "Error code / intermittent fault",
  "Maintenance planning",
  "Parts / consumables request",
  "General inquiry",
];

const partCategories = [...partGroups.map((group) => group.title), ...partGroups.flatMap((group) => group.items), "Other / not sure"];

const printerTypes = [
  "CIJ continuous inkjet",
  "TIJ thermal inkjet",
  "DOD drop-on-demand",
  "Not sure — recommend a printer",
];

type ServiceRequestProps = {
  variant?: "service" | "parts" | "printers" | "contact";
  initial?: { printerBrand?: string; printerModel?: string; partNumber?: string; category?: string; photoHelp?: boolean; condition?: string; listing?: string };
};

export default function ServiceRequest({ variant = "service", initial = {} }: ServiceRequestProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [handoff, setHandoff] = useState("");
  const [canShareFiles, setCanShareFiles] = useState(false);
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

  async function openEmail(event: FormEvent<HTMLFormElement>) {
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
    const body = lines.join("\n");
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    if (submitter instanceof HTMLButtonElement && submitter.value === "share" && navigator.canShare?.({ files: selectedFiles })) {
      try {
        await navigator.share({ title: subject, text: `To: ${contact.email}\n${body}`, files: selectedFiles });
        setHandoff("Shared with your chosen app. Check the recipient and complete sending there; D-Macht has not confirmed receipt.");
      } catch {
        setHandoff("Sharing was cancelled or unavailable. Your details are still here; you can open an email draft instead.");
      }
      return;
    }
    setHandoff("Email draft requested. Attach the selected files and send it from your email app. If no app opens, email the details to " + contact.email + ". Nothing has been submitted on this website.");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  const selectorLabel = isParts ? "Category" : isPrinters ? "Printer type" : "What’s wrong with your printer?";
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
        {initial.listing && <input type="hidden" name="listing" value={initial.listing} />}
        {!isParts && !isPrinters && <label className="fullField"><span>{selectorLabel} *</span><select name="serviceType" defaultValue="" required><option value="" disabled>Choose the problem or maintenance need</option>{serviceTypes.map((option) => <option key={option}>{option}</option>)}</select></label>}
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
            <input name="printerBrand" defaultValue={initial.printerBrand} placeholder="Videojet, Domino, Linx…" />
          </label>
          {(isParts || isPrinters) && <label>
            <span>{selectorLabel} *</span>
            <select name={isParts ? "category" : isPrinters ? "printerType" : "serviceType"} defaultValue={initial.category || ""} required>
              <option value="" disabled>Choose {selectorLabel.toLowerCase()}</option>
              {selectorOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>}
        </div>

        <div className="formRow">
          {isParts ? (
            <label><span>Quantity *</span><input name="quantity" type="number" min="1" placeholder="1" required /></label>
          ) : isPrinters ? (
            <label>
              <span>Preferred condition *</span>
              <select name="condition" defaultValue={initial.condition || ""} required>
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
            <input name="printerModel" defaultValue={initial.printerModel} placeholder={isPrinters ? "If known" : "Model / serial if known"} />
          </label>
        </div>

        <div className="formRow">
          <label>
            <span>{isParts ? "Part number" : isPrinters ? "Required timeline" : "Error code"}</span>
            <input defaultValue={isParts ? initial.partNumber : undefined} name={isParts ? "partNumber" : isPrinters ? "timeline" : "errorCode"} placeholder={isParts ? "If known" : isPrinters ? "When do you need the printer?" : "Exact code if shown"} />
          </label>
          <label>
            <span>Location *</span>
            <input name="location" placeholder="City / plant location" required />
          </label>
        </div>

        {isParts ? (
          <label className="formCheckbox">
            <input name="identificationHelp" defaultChecked={initial.photoHelp} type="checkbox" value="Yes — help identify the part" />
            <span>I don’t know which part I need — help me identify it</span>
          </label>
        ) : null}

        <label className="fullField">
          <span>{detailsLabel} *</span>
          <textarea name="details" placeholder={detailsPlaceholder} required />
        </label>

        <label className="fullField fileField">
          <span>{isPrinters ? "Reference photo or specification" : "Add photo / video"}</span>
          <input name="referenceFiles" type="file" accept="image/*,video/*,.pdf" multiple onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            setSelectedFiles(files);
            setCanShareFiles(files.length > 0 && Boolean(navigator.canShare?.({ files })));
          }} />
          <small>Files stay on your device. Share them using a supported app, or attach them manually to the email draft.</small>
          {selectedFiles.length > 0 && <small role="status">Selected: {selectedFiles.map((file) => file.name).join(", ")}</small>}
        </label>

        <button className="button primary requestSubmit" type="submit">
          {isParts ? "Open Spare Parts Inquiry" : isPrinters ? "Request Price / Availability" : "Book Service — Open Email Draft"}
          <ArrowRight size={18} aria-hidden="true" />
        </button>

        {canShareFiles && <button className="button secondary" type="submit" value="share">Share inquiry with selected files</button>}
        {handoff && <p role="status" className="handoffStatus">{handoff}</p>}
        <p className="requestFinePrint">Your details are placed into a new email to D-Macht. Review it, attach your files, then send.</p>
      </form>
    </section>
  );
}
