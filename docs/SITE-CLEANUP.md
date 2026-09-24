# Final simplification and SEO audit

## Editorial changes

- Homepage: retain hero, three buying/service choices, brand strip, repair photography, three industry previews and final CTA. Remove the duplicate trust strip, hero benefit badges and secondary hero contact CTA.
- Service: shorter title and introduction; retain diagnostic detail, PCB repair, Ink Core Assembly, printhead/nozzle, electronics and field service. Replace three repeated AMC cards with one concise maintenance section.
- Parts: direct search and photo actions; shorter compatibility and stock explanation; preserve brand/model/part number handoff.
- Printers: two plain buying options, a single availability note, one price-request action per option. No unverified listings.
- Industries: nine independent images and concise application descriptions; keep useful service/parts/printer links.
- About: concise business and founder description, technical capabilities and brand list. Remove the repeated application-photo section.
- Contact: shorter copy, direct contact details, and inquiry choices for service, parts, printers or general questions.
- Standardize CTA vocabulary. Remove em dashes from site copy, accessible labels and the SVG title. Keep the approved logo geometry and OG artwork unchanged.

## Typography and layout

One existing local sans-serif stack. Sentence/title-case headings, simpler form labels, fewer borders and shadows, no decorative founder typeface. Preserve reserved image dimensions and responsive crops. Widen form layout at tablet widths. No new client dependency or external font request.

## Search and indexing

| Page | Title |
| --- | --- |
| / | D-Macht · Industrial Printer Repair, Parts & Printers (vertical bar separator on site) |
| /repair-service | Industrial Printer Repair & Service · D-Macht |
| /parts-consumables | Industrial Printer Spare Parts · D-Macht |
| /printers | Industrial Coding Printers · D-Macht |
| /industries | Industrial Coding Applications · D-Macht |
| /about | About D-Macht |
| /contact | Contact D-Macht |

Unique descriptions and a single canonical per route use https://www.dmacht.com. Existing content URLs are retained; legacy redirects remain permanent and are excluded from the sitemap. Shared metadata keeps Open Graph and Twitter aligned, with the approved static 1200 × 630 compact-logo PNG. The seven canonical public pages appear in `/sitemap.xml`; `/robots.txt` permits crawling and references it. No schema existed; none was added because no additional structured data was needed. No ratings, prices, hours, certifications or service areas were invented.

## Verification

- Lint and production build pass.
- All seven public pages inspected at desktop, tablet and mobile widths. One H1 each, logical heading progression, no visible em dashes, missing alt text, failed images or horizontal overflow.
- Internal destinations/anchors and mobile navigation checked. All service, parts, printer and contact forms tested for required-field validation, selected files and inquiry data without sending messages. Parts photo-help and selected printer condition remain intact.
- Forms continue to open email drafts or a supported native share app. A website submission does not confirm delivery; users must send the draft/complete the share. The UI explains this.
- `node scripts/verify-metadata.mjs` checks seven canonical routes, metadata, OG/Twitter, PNG dimensions, sitemap and robots. Supply a live origin to verify production and compare OG image bytes.
