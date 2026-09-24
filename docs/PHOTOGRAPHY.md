# D-Macht imagery pass

## Source and audit decisions

The user-approved September 2026 collage is an art-direction reference, not a claim that its equipment is current inventory. No separately verified inventory photography was present in the project. Existing illustrative imagery and approved reference crops were used where suitable; two reference-derived images were prepared with the built-in image-generation tool. Actual stock photos should replace illustrative equipment when Dee supplies listings.

- Keep the existing approved Dee homepage hero: preserve face, build and composition, convert to WebP.
- Replace `workshop-hero-v2.png` in Service and Contact: its technician differs from the approved Dee identity.
- Replace `refurbished-printers-v2.png` in Printers: generic cabinets and an additional technician do not match the approved direction.
- Retain usable PCB and parts-bench detail as neutral, physical workshop illustrations. Crop distracting instrument markings from diagnostics.
- Exclude questionable manufacturer branding and caption strips from reference crops. The equipment and field-service variants remove manufacturer marks entirely.
- Retain the recently approved vector identity and clean social-share PNG unchanged. Old source PNGs remain in the repository for provenance, but the active site no longer requests them.

## Published files and placements

All photos are in `public/brand/photography/`.

| File | Source | Placement |
| --- | --- | --- |
| `dee-hero.webp` | Existing approved Dee hero | Homepage hero |
| `dee-service.webp` | Collage upper panel, cropped before manufacturer badge/caption | Service and About heroes |
| `pcb-repair.webp` | Collage PCB panel, caption excluded | Homepage PCB card; service PCB repair |
| `printhead-nozzle.webp` | Collage components panel, caption excluded | Homepage nozzle card; service nozzle work; parts printhead category |
| `spare-parts.webp` | Collage spares panel, caption excluded | Homepage parts card |
| `ink-fluids.webp` | Collage fluids panel, caption excluded | Parts inks/fluids category |
| `bottle-coding.webp` | Collage application panel, caption excluded | About application section |
| `diagnostics.webp` | Existing PCB workbench, cropped away from meter controls | Service breakdown/diagnostic work |
| `pumps-filters.webp` | Existing parts bench detail | Service ink-system work; parts ink-system category |
| `electronics-controls.webp` | Existing parts bench detail | Service electrical faults; parts electronics category |
| `parts-bench.webp` | Existing full parts bench | Parts hero |
| `field-service.webp` | Built-in image generation, approved reference-derived edit | Homepage field-service card; service field-service card; Contact hero |
| `printers-workshop.webp` | Built-in image generation, approved reference-derived edit | Printers hero, explicitly labeled illustrative / not inventory |

## Optimization and layout

`prepare-photography.mjs` creates deterministic reference crops and WebP assets. It never enlarges the small reference tiles. Generated standalone photos are resized to 1200 × 800 and encoded as WebP at quality 84. Detail cards stay narrow enough for their source dimensions. Next.js Image provides responsive sizes and reserves space through intrinsic dimensions or aspect-ratio frames. AVIF/WebP negotiation is enabled. Below-fold detail images lazy-load; internal-page hero images load eagerly because they can be the desktop LCP. Only the actual homepage hero is preloaded. Short labels sit below the homepage photos; no collage or caption paragraphs overlay them.

## Generation prompts (built-in tool; no CLI fallback)

### Field-service image

Use case: identity-preserve / precise-object-edit. Produce ONE standalone landscape photograph, 1536x1024, derived exclusively from the BOTTOM CENTER Field Service panel of the supplied approved collage. Preserve the same technician seen from behind, same navy shirt, same recognizable head and hair, same physically plausible servicing posture and hands, realistic industrial coding production line. Crop/extract and faithfully restore photographic detail. Remove the bottom caption and all manufacturer logos/brand names on machinery; leave those metal surfaces plain, no fake lettering. Retain the approved D-Macht workwear identity only if it is clean and accurate. Bright natural neutral workshop light, ordinary stainless production equipment, realistic texture. No extra employees, no cinematic grading, no new machine designs, no collage, no caption, no watermarks. This is illustrative website photography, not an inventory listing. Match reference closely.

### Equipment image

Use case: precise-object-edit. Produce ONE standalone landscape equipment photograph 1536x1024 derived from the BOTTOM LEFT Refurbished Printers panel in the supplied approved collage. Preserve the same three physically proportioned industrial CIJ coding printer cabinets, bench, printhead hoses, natural lighting and workshop. Remove every manufacturer logo, model name and invented text from the printer surfaces: neutral plain blue control surrounds, dark inactive screens, plain stainless steel cabinets. Remove caption and panel boundaries. No humans. Do not invent futuristic machines or redesign cabinets. Real slightly used clean metal, crisp natural photographic detail, neutral white balance. No collage, no extra text. This is illustrative equipment imagery and must not claim any inventory availability.

## Verification

All six content pages were reviewed at 1440px desktop and 390px mobile widths. Checks passed for loaded images, alt attributes, horizontal overflow, browser errors, parts filtering, photo-identification prefill and printer-condition prefill. The final service layout contains six unique detail photographs; preventive and AMC copy lives in the maintenance section. Lint and production build pass. Existing metadata/OG regression checks also pass. Thirteen published WebP assets total approximately 727 KB; the retained homepage hero falls from approximately 1,898 KB to 92 KB before responsive delivery.

## CIJ solvent label correction

The consumables category now uses `public/brand/photography/cij-ink-make-up-solvent.webp` (900 × 481, 23,446 bytes) instead of `ink-fluids.webp`. Built-in image editing preserved the two-bottle industrial composition and changed the right label to **CIJ Make-Up Solvent**. A second edit removed generated branding/trademark symbols; final labels contain only **CIJ Ink** and **CIJ Make-Up Solvent**. No HTML text overlay is used. The old source asset is retained for history and is no longer referenced by the site.

Edit direction: preserve bottles, caps, workshop, lighting and framing; replace the right product name exactly; retain the left product name; remove all other logos, branding and trademark symbols. Optimized with Sharp WebP quality 85. Historical source descriptions above remain unchanged.
