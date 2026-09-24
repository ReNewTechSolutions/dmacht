# Production environments

## Source and claims

The September 2026 user-supplied production-environment composite is an art-direction and subject reference only. No composite pixels or cropped tiles are shipped. All nine assets were generated independently with the built-in image-generation tool, then visually inspected. They illustrate applications, not verified customers or customer facilities; the page labels them as illustrative. Copy follows the requested applications and the existing brochure-informed service, parts, consumables and printer offering. There are no certification, manufacturer partnership, uptime or regulatory claims.

The rejected dairy reference was not reused, traced or provided to generation. Its replacement shows opaque handled HDPE milk bottles, seated caps, readable lot marking and a supported stainless-steel conveyor. The first generated pipe asset was also rejected: its printed 25 mm specification did not fit the pictured scale. The replacement uses only `LOT A327`.

## Individual assets and generation directions

All assets: `public/brand/photography/industries/{id}.webp`, 1200 × 800, WebP quality 82. Generated source images remain in the local Codex generated-images directory. Each scene was requested as a 1536 × 1024 professional industrial photograph with natural lighting, plausible conveyors and machinery, modest legible coding, no people, fake brands, certifications or futuristic elements. No reference image was supplied to generation.

| ID | Scene / prompt direction | Visible code |
| --- | --- | --- |
| food-packaging | Sealed transparent biscuit packs in trays on a stainless-steel packaging conveyor; flat label | BATCH A327 |
| beverage | Water-filled PET bottles with seated blue caps on a stainless conveyor | LOT B0426 |
| dairy | Entirely new milk packaging scene; opaque handled HDPE bottles with white screw caps | LOT D0426 |
| pharmaceutical | Plain medicine cartons supported on a conventional packaging belt | LOT P0426 |
| wire-cable | Black round cable on real guide rollers, production reel in background | CABLE 2.5 mm2 LOT A327 |
| pipes-tubes | Straight grey PVC pipes on scuffed galvanized rollers, consistent open ends; no dimensions printed | LOT A327 |
| cosmetics-personal-care | Ivory polypropylene jars with seated screw lids on a packaging line | LOT C0426 |
| electronics | Shielded electronic modules in protective trays; packaging identification, no oversized PCB branding | LOT E0426 |
| general-manufacturing | Brown cartons on a roller conveyor with conventional coding equipment nearby | LOT M0426 |

The pipe replacement prompt specified: “Grey PVC pipes approximately 110mm diameter on a real scuffed galvanized roller rack in a pipe extrusion factory. Foreground one perfectly straight cylindrical pipe with an open round end, consistent wall thickness and realistic perspective. Several parallel pipes behind it. Printed subtly along the foremost pipe is only the small black industrial code ‘LOT A327’. DO NOT print dimensions, specifications or any other text.” Natural lighting, no logos, people or futuristic equipment, 3:2 framing.

## Placement and performance

- `/industries`: nine large cards; three columns on wide desktops, two at ≤1000 px, one at ≤640 px.
- Homepage: food, dairy and cable image links, plus View All Industries. No full industry descriptions.
- Navigation, footer and About link to the consolidated route. No new forms or individual industry routes.
- Service/maintenance, parts/consumables, PCB/nozzle repair and printer links point into existing conversion paths.
- Next/Image supplies responsive sizes, lazy loading, reserved 3:2 aspect ratios and AVIF/WebP delivery. No external image requests.
- Nine source WebPs total approximately 637 KiB; responsive delivery normally transfers smaller derivatives. Each asset can be replaced independently with verified customer photography.

## Verification

All nine images were individually inspected for code legibility, container/cap geometry, product support, pipes, cables, electronic packaging, reflections and obvious false branding. No hands are present. The pipe asset was replaced after review; the dairy reference was excluded from the outset.

Browser verification at 1440, 1150 and 390 px covered homepage, Industries and About; all images decoded, descriptive alt text, no horizontal overflow, three preview images, nine cards, no duplicated forms, working preview navigation and valid support page/anchor destinations. Browser page errors: none. Lint, TypeScript/production build and seven-route canonical/OG/Twitter metadata verification passed.
