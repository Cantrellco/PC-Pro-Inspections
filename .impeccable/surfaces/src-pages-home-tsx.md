---
version: 1
slug: "src-pages-home-tsx"
primary_target: "src/pages/Home.tsx"
related_targets: ["src/pages/Services.tsx","src/pages/About.tsx"]
---

# Surface brief: / (Home)

Scope: the Home route, first surface of the Folk Woodblock world; every other route inherits this world.
Visitor mode: Persuade. Audience: first-time buyers under contract in Southern Illinois, on a phone, wanting price, availability, and a reason to trust one inspector.
Action: call (618) 599-4446; secondary: get my price (calculator) / book.
Proof on hand: six real Spectora reviews, flat price sheet, InterNACHI CPI + five specialty certs (names only), Wombat crawler, same-evening report, owner's story, sample report PDF. No stats, no license number, no invented claims.

Chosen direction: Folk Woodblock print on crushed-shell paper (seed b64509d8, bolder re-roll 1, challenger posters-covers-sleeves-dong-ho-shell-ground). Build path: comp-led.
Approved comp: .impeccable/mocks/comps/comp-3-print-in-progress.png (approved 2026-08-25; sidecar .json carries approved:true).
Memorable moment: the house section prints itself block by block on arrival (red, navy, brass, then the black keyblock registers last), with printer's crosshairs at the corners; the price ticket beside it updates live.

## Design system read from the comp
- Ground: shell paper #f4efe4 with faint pearlescent speckle (subtle noise + tiny light flecks), never flat white.
- Inks: red #c8102e, navy #0a3161, brass #b8952a, key #111111. Colour arrives as flat fields that own whole regions (brass strips, red banners, navy blocks). No gradients, no glass, no glow.
- Type: display = Anton (heavy condensed cut capitals, tight leading, slight woodcut edge via text-shadow/misregistration on hero only); labels and ledger rows = Barlow Condensed 600/700 caps, tracked +0.04em; body = Barlow 400/500, navy or near-black ink.
- Rules and frames: 2–3px black keyblock rules; ticket frames are thick black outlines with notched/scalloped corners; paper "labels" are white boxes with 2px black outline pinned over illustration.
- Corners: 0 radius everywhere (cut paper), except round seals.
- Elevation: none. Depth comes only from misregistration (a 2px colour offset behind black lines) and the paper texture.
- Controls: buttons are block-printed rectangles (red fill/white type; navy outline/navy type), pressed = darker ink + 1px inset offset, focus = 2px black bracket outline offset 3px, disabled = ink struck through at 40%. Inputs are white paper boxes with 2px black rule, focus rule turns navy 3px.
- Nav: single row, Barlow Condensed caps, small star ornaments between items, red block CALL button; on mobile a full-paper sheet menu.
- Motion grammar: things register (snap into place with a 1-frame overshoot) rather than fade; print-order reveal for illustrations; ink "stamp" for CTA press. Reduced-motion: everything fully printed, no wipes.

## Inventory (medium per ingredient)
| Ingredient | Medium |
|---|---|
| Shell-paper ground with speckle | CSS (background color + SVG noise + radial flecks); it is a pattern, not depth |
| House in section, four inks | raster, produced: public/art/house-{red,navy,brass,key}.png (+composite); separated by scripts/separate-blocks.mjs from a generated woodcut |
| Print-order reveal + registration crosshairs | code: layered <img> per ink with clip-path wipes in print order; crosshairs authored SVG |
| System labels (ROOF, ATTIC, PANEL, PLUMBING, WATER HEATER, CRAWL SPACE) | HTML text in paper label boxes positioned over the print |
| Headline EVERY SYSTEM. ONE PRINT. | HTML, Anton |
| Price ticket (slider, termite checkbox, $ figure, CALL, BOOK) | code: QuoteCalculator restyled as woodcut ticket; live calculateQuote() |
| Waving flag | existing WavingFlag canvas, re-graded to the four inks and posterized (no cloth shading gradient; stepped light/dark bands) — lives in the header band on Home and the footer everywhere |
| Shield logo mark | existing public/brand/logo-mark.png |
| Brass credential strip | HTML/CSS |
| Review seals | authored SVG rings + HTML text |
| Wombat crawler | raster, produced: public/art/wombat-*.png (About) |
| Rural landscape strip | raster, produced: public/art/landscape-*.png (Service Areas) |
| Paul portrait | real photo public/team/paul-portrait.webp in a woodcut frame; the produced paul-cut illustration is optional accent only |
| Icons | authored SVG, 2.5px black stroke, cut-paper simplicity |
