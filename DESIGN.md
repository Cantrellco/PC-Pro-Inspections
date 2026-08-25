---
name: PC Pro Inspections
description: Folk woodblock print on crushed-shell paper; four flat inks, misregistration as the only depth, the price posted beside the house.
colors:
  shell-paper: "#f4efe4"
  second-sheet: "#e9e1cf"
  label-white: "#fbf8f1"
  keyblock: "#111111"
  body-ink: "#2f2b27"
  mute-ink: "#6b655c"
  heritage-red: "#c8102e"
  heritage-red-deep: "#9c0f26"
  heritage-navy: "#0a3161"
  heritage-navy-deep: "#061a33"
  antique-brass: "#b8952a"
  antique-brass-deep: "#8c6f18"
  brass-pale: "#e8d9a8"
  fleck-55: "rgba(255, 255, 255, 0.55)"
  fleck-50: "rgba(255, 255, 255, 0.5)"
  fleck-45: "rgba(255, 255, 255, 0.45)"
typography:
  display:
    fontFamily: "Anton, Arial Narrow, Impact, sans-serif"
    fontSize: "clamp(2.9rem, 1.6rem + 6vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Anton, Arial Narrow, Impact, sans-serif"
    fontSize: "clamp(2.1rem, 1.3rem + 3.4vw, 3.9rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.005em"
  title:
    fontFamily: "Anton, Arial Narrow, Impact, sans-serif"
    fontSize: "clamp(1.5rem, 1.15rem + 1.6vw, 2.35rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.005em"
  lede:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1rem + 0.5vw, 1.35rem)"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.06em"
  label-sm:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
  wordmark:
    fontFamily: "Anton, Arial Narrow, Impact, sans-serif"
    fontSize: "1.7rem"
    fontWeight: 400
    lineHeight: 0.9
  display-hero-lg:
    fontFamily: "Anton, Arial Narrow, Impact, sans-serif"
    fontSize: "4.6rem"
    fontWeight: 400
    lineHeight: 0.92
  display-hero-xl:
    fontFamily: "Anton, Arial Narrow, Impact, sans-serif"
    fontSize: "5.2rem"
    fontWeight: 400
    lineHeight: 0.92
  button:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.07em"
rounded:
  none: "0px"
spacing:
  gutter: "20px"
  gutter-sm: "32px"
  sheet-compact: "16px"
  sheet: "24px"
  sheet-lg: "32px"
  header-gap: "40px"
  section-compact: "48px"
  section: "64px"
  section-lg: "96px"
components:
  button-primary:
    backgroundColor: "{colors.heritage-red}"
    textColor: "{colors.shell-paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.4rem 0.78rem"
  button-primary-hover:
    backgroundColor: "{colors.heritage-red-deep}"
    textColor: "{colors.shell-paper}"
  button-secondary:
    backgroundColor: "{colors.label-white}"
    textColor: "{colors.heritage-navy}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.4rem 0.78rem"
  button-secondary-hover:
    backgroundColor: "{colors.shell-paper}"
    textColor: "{colors.heritage-navy}"
  button-navy:
    backgroundColor: "{colors.heritage-navy}"
    textColor: "{colors.shell-paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.4rem 0.78rem"
  button-navy-hover:
    backgroundColor: "{colors.heritage-navy-deep}"
    textColor: "{colors.shell-paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.heritage-navy}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0"
  sheet:
    backgroundColor: "{colors.label-white}"
    textColor: "{colors.body-ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.sheet}"
  ticket:
    backgroundColor: "{colors.label-white}"
    textColor: "{colors.body-ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.sheet}"
  tag:
    backgroundColor: "{colors.label-white}"
    textColor: "{colors.keyblock}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.2em 0.5em 0.15em"
  field-input:
    backgroundColor: "{colors.label-white}"
    textColor: "{colors.keyblock}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
  block-red:
    backgroundColor: "{colors.heritage-red}"
    textColor: "{colors.shell-paper}"
  block-navy:
    backgroundColor: "{colors.heritage-navy}"
    textColor: "{colors.shell-paper}"
  block-brass:
    backgroundColor: "{colors.antique-brass}"
    textColor: "{colors.keyblock}"
  block-ink:
    backgroundColor: "{colors.keyblock}"
    textColor: "{colors.shell-paper}"
  nav-bar:
    backgroundColor: "{colors.shell-paper}"
    textColor: "{colors.keyblock}"
    typography: "{typography.label}"
    height: "64px"
---

# Design System: PC Pro Inspections

## Overview

**Creative North Star: "The Print in Progress"**

The site is a folk woodblock print pulled one ink at a time onto crushed-shell paper. Every surface is the same warm sheet; everything on it is one of four flat inks (red, navy, brass, black keyblock) printed with a deliberate 3 to 5px misregistration. That misregistration is the entire depth model: a colour block peeking past the black line, a button whose second ink snaps into register on hover, a headline whose red block sits a hair off the black. The house prints itself in the hero (red, navy, brass, then keyblock) and the price sits beside it in a notched ticket. Nothing glows, nothing blurs, nothing is rounded.

Density is a posted price sheet rather than a landing page: cut-letter capitals, condensed uppercase labels, brass bands ruled top and bottom with the prices in them, pinned paper tags naming parts of the house. The world is loud in type and quiet in colour. Copy runs in a warm humanist grotesk with a navy lede so the reading layer never competes with the print.

Confirmed rejections, evidenced by the build: no hero-photo-plus-cards arrangement, no dark glowing SaaS look, no gradients used as colour, no glass, no glow, no radius anywhere, no stat counters, no license numbers, no invented certifications.

**Key Characteristics:**
- One ground (shell paper with a fixed multiply-blend tooth) and four flat inks; tints exist only as deeper printing pressure.
- Depth is misregistration: 4px solid offsets on sheets and buttons, 5px on tickets, 0.045em on display type, 2.5 units on seals.
- 3px black keyblock rules frame every band, sheet, button, and the nav; 2px for inner hairlines, fields, and tags.
- Anton cut-letter uppercase for every heading and every price figure; Barlow Condensed uppercase for labels, buttons, and ledger rows; Barlow for body.
- Motion is registration: things snap into place with a one-frame overshoot (`cubic-bezier(0.2, 1.35, 0.4, 1)`); they never fade in from nowhere.
- Zero radius and notched (scissor-cut) ticket corners are the only two silhouettes.

## Colors

Fleck ink: white at 45–55% alpha (`rgba(255,255,255,0.45–0.55)`) is printed only as the sub-pixel crushed-shell scatter on the body ground (`src/index.css` body background); it is a material, never a text or surface colour.

Four printing inks on one paper; the palette is a print run, not a UI theme, and colour is used in blocks rather than in text.

### Primary
- **Heritage Red** (`heritage-red`): the loudest ink. Primary buttons, the price figure, the misregistered block behind display headings (`.cut-red`), the red CTA band, the range-slider thumb, text selection, add-on prices, and the first plate of every woodblock print. Hover deepens to **Heritage Red Deep**.

### Secondary
- **Heritage Navy** (`heritage-navy`): the structural ink. Lede paragraphs, the navy segmented control, focus outlines (3px), the scrollbar thumb, the second ink behind primary buttons and tickets, the flag band ground, the navy CTA band, the second plate of every print. Hover deepens to **Heritage Navy Deep**.

### Tertiary
- **Antique Brass** (`antique-brass`): the warm ink. The default second ink behind sheets, the `PriceLedger` band ground, the second ink behind secondary buttons, the star glyphs between nav items, the third plate of every print. **Brass Pale** is the pinned-paper tint used in illustrations; **Antique Brass Deep** is the pressed variant.

### Neutral
- **Shell Paper** (`shell-paper`): the ground for every page, the nav, and the type printed on any colour band.
- **Second Sheet** (`second-sheet`): a slightly deeper sheet for elevated sections, ledger rows, the scrollbar track, and photo placeholders.
- **Label White** (`label-white`): the cleaner sheet of pinned label boxes, sheets, tickets, tags, and form fields.
- **Keyblock** (`keyblock`): the black plate. Headings, rules, borders, the keyline in every print and seal, the ink band.
- **Body Ink** (`body-ink`): body copy. **Mute Ink** (`mute-ink`): secondary copy, small labels, placeholders (4.6:1 on paper).

### Named Rules
**The Four Inks Rule.** Every visible colour is one of red, navy, brass, or keyblock, printed flat on paper. The `-deep` tints are hover pressure only; `brass-pale` is illustration only. No new hue enters the system.

**The Paper Type Rule.** Type printed on a colour block is always shell paper (brass blocks excepted, which carry keyblock). Never set red, navy, or brass type on a red, navy, or brass ground.

**The Deprecated Shim Rule.** The Tailwind tokens `bone.*`, `flag.*`, `ink-50/100/200/300`, `brass-soft`, and the classes `.eyebrow`, `.card`, `.photo-placeholder`, `.link-underline`, `.text-gradient-*` are legacy aliases from the previous dark theme kept only so old pages compile. They are not tokens of this system; do not use them in new work (one live use remains: `bg-flag-red` in `Layout.tsx`).

## Typography

**Display Font:** Anton (with Arial Narrow, Impact)
**Body Font:** Barlow (with system-ui)
**Label Font:** Barlow Condensed (with Arial Narrow)

All three are self-hosted under `public/fonts/` (Latin subsets, `font-display: swap`); Anton ships as one weight (400), Barlow at 400/400i/500/600/700, Barlow Condensed at 500/600/700.

**Character:** Cut letters. Anton is set uppercase at line-heights under 1 so headlines read as blocks carved from one plate; Barlow Condensed carries every label and button in tracked uppercase like the lettering on a price card; Barlow does the reading in a plain, warm voice, with the lede in navy.

### Hierarchy
- **Display** (400, `clamp(2.9rem, 1.6rem + 6vw, 6rem)`, 0.92): page title on every route, always `.cut-red` (or `.cut-brass` / `.cut-navy`), one per page.
- **Headline** (400, `clamp(2.1rem, 1.3rem + 3.4vw, 3.9rem)`, 0.95): section headers and the CTA band title; cut-red by default, cut-keyblock in paper when printed on a colour band.
- **Title** (400, `clamp(1.5rem, 1.15rem + 1.6vw, 2.35rem)`, 1.0): the ledger caption ("Prices posted"), footer column heads, ticket titles.
- **Price Figure** (Anton 400, 2xl to 5xl, line-height 1, `tabular-nums lining-nums`): the money. Always red or keyblock, always `.num`.
- **Lede** (Barlow 500, `clamp(1.1rem, 1rem + 0.5vw, 1.35rem)`, 1.5, navy): the sentence under every display heading.
- **Body** (Barlow 400, 1rem, 1.5, body ink): paragraphs, ~65ch inside `container-tight`.
- **Label** (Barlow Condensed 600, 0.9rem, 0.06em, uppercase, keyblock): nav items, field labels, ledger rows, footer links.
- **Label Small** (Barlow Condensed 600, 0.78rem, 0.08em, uppercase, mute ink): captions, "Fairfield, Ill.", slider ticks, pinned tags at phone width.
- **Wordmark** (Anton, 1.7rem desktop / 1.25rem condensed-or-phone, uppercase, navy over red): the two-line PC Pro / Inspections mark beside the crest in the header and footer. Not a heading step.
- **Display 1, two-column hero** (Anton, 4.6rem at lg / 5.2rem at xl): the Home headline only, where it shares its row with the lede; every other Display 1 uses the fluid clamp.
- **Button** (Barlow Condensed 700, 1.05rem, 0.07em, uppercase): all block-printed buttons and the ghost link.

### Named Rules
**The Cut Letter Rule.** Every heading (h1 to h4) is Anton, uppercase, keyblock, letter-spacing 0.005em, `text-wrap: balance`. There is no sentence-case heading anywhere and no second display face.

**The One Misregister Rule.** The `.cut-*` text-shadow (0.045em, one flat ink) belongs to display and headline sizes only. Never on body, labels, or buttons.

**The Tabular Money Rule.** Every number that is a price, a phone number, or a square-footage figure carries `.num` (tabular lining numerals) so figures line up in ledgers and do not jitter when the price stamps.

## Layout

Three containers, all with 20px side gutters rising to 32px at `sm` (640px): **narrow** (max 72rem, the default for sections), **tight** (max 48rem, reading and legal pages), **wide** (max 86rem, nav, footer, ledger, and the hero). Content sits `above-grain` (z-index 2) over the fixed paper tooth on `body::after` (z-index 1).

Sections are printed bands: 64px vertical padding at mobile, 96px at `sm`; compact sections 48px / 64px. A section on any colour tone (navy, red, brass, ink) or with `ruled` gets 3px keyblock rules top and bottom, so coloured bands always read as a strip printed edge to edge. Section headers sit 40px to 48px above their content in a `max-w-3xl` column, left-aligned by default.

The hero is a two-column print: cut-letter display and lede over the `WoodblockPrint` of the house (with registration crosshairs at the corners and pinned tags) on the left; the price ticket on the right. Below it the brass `PriceLedger` band runs the full width with one column per square-footage band (3 columns on mobile, 4 at `sm`, 7 at `md`), then the flag band. The footer is a 12-column grid (5 / 3 / 4) under a 112px to 160px flag band.

Sheets stack in 1 to 3 column grids with 24px to 32px gaps; sheet padding is 24px, 32px at `sm` (compact: 16px / 20px). Inside the ticket and the calculator, rows are separated by 2px keyblock rules. Breakpoints are Tailwind defaults (640 / 768 / 1024 / 1280); the nav collapses its link row below 1024px into a keyblock-bordered menu button and hides the flag below 768px.

## Elevation & Depth

There are no shadows in the blurred sense and no tonal layering. Depth is misregistration: a second flat ink printed a few pixels off the keyblock. Every offset is hard-edged, zero blur, one of the four inks, and sits down and to the right. Solid colour bands and 3px rules do the rest of the structural work.

### Shadow Vocabulary
- **Sheet offset** (`box-shadow: 4px 4px 0 0 var(--sheet-ink)`; brass default, red or navy by modifier): the colour block behind every sheet. A box-shadow rather than a pseudo-element so an animated parent can never lift it above the sheet.
- **Button offset** (`box-shadow: 4px 4px 0 0 var(--btn-ink)`): navy behind primary, brass behind secondary, red behind navy buttons. Collapses to 0 as the button translates 2px on hover/focus, 4px on press.
- **Ticket cast** (`filter: drop-shadow(5px 5px 0 var(--navy))` on the `.ticket-cast` wrapper): follows the notched outline that a box-shadow cannot.
- **Slider thumb offset** (`box-shadow: 3px 3px 0 var(--navy)`): the red block marker on the range.
- **Display cut** (`text-shadow: 0.045em 0.045em 0 <ink>`): red, brass, or navy behind headings; keyblock behind paper headings on colour bands.
- **Seal ring** (colour ring translated 2.5 SVG units behind the keyblock ring): the same misregister in the stamps.
- **Field focus** (`inset 0 0 0 1px var(--navy)` plus a navy border): the one inset stroke; it thickens the line rather than glowing.

### Named Rules
**The Misregister Rule.** Depth is a second ink printed 3 to 5px off the keyblock, never a blurred shadow, never a glow, never a translucent layer. If it has a blur radius it is not from this world.

**The Register-On-Hover Rule.** Interactive offsets close, they do not open. Hover moves the sheet onto its second ink (offset to 0, translate 2px); press pushes it fully down (translate 4px). Nothing lifts.

## Shapes

Zero radius everywhere: sheets, buttons, fields, tags, the slider thumb, the nav flag, the menu button. There is no `rounded-*` utility in the codebase and the frontmatter carries a single `rounded.none`. Two silhouettes exist: the rectangle with a 3px keyblock border, and the **ticket**, a rectangle with 22px scissor-notched corners (an 8-point `clip-path` polygon) and an inner 2px hairline inset 7px so the notch reads as cut rather than clipped. Rules are 3px keyblock (`--rule`); inner hairlines, field borders, and tags are 2px; ledger column dividers are 2px keyblock at 40%. The only rounds in the world are the stamped seals (a 28-scallop SVG ring with turbulence-displaced edges, each tilted -2 to +2 degrees), and dashed 2px keyblock borders mark "priced by the job" items that are not on the sheet.

## Components

Components feel hand-registered: heavy, flat, and slightly off until you touch them.

### Buttons
- **Shape:** square-cut (0px), 3px keyblock border, second ink offset 4px down-right.
- **Primary:** red field, shell-paper type, navy second ink; padding 0.85rem 1.4rem 0.78rem; Barlow Condensed 700 uppercase 1.05rem, 0.07em tracking. Hover deepens to red-deep.
- **Secondary:** label-white field, navy type, brass second ink; hover to shell paper.
- **Navy:** navy field, paper type, red second ink; hover to navy-deep.
- **Hover / Focus:** offset closes to 0 and the button translates 2px down-right on the register curve over 0.18s; `:active` translates 4px. Focus-visible also draws the global 3px navy outline at 3px offset.
- **Disabled:** 0.55 opacity, no offset, 3px line-through on the label; `loading` renders a pulsing 12px square of the text colour before the label.
- **Ghost:** no field; navy condensed uppercase with a 3px red underline offset 5px, underline turns navy on hover. Used for "Book this inspection" style secondary actions.

### Cards / Containers
- **Sheet** (the only container; never nest one inside another): label-white ground, 3px keyblock border, brass block offset 4px (red or navy via `ink` prop, none via `sheet-flat`). Padding 24px / 32px at `sm`; compact 16px / 20px.
- **Ticket:** same sheet with 22px notched corners, inner 2px hairline, and a navy 5px drop-shadow cast that follows the notches. Used for the price ticket in the hero and on Services.
- **Blocks:** `block-red`, `block-navy`, `block-ink` (paper type) and `block-brass` (keyblock type) are solid ink fields for bands and badges, usually ruled with `border-y-3 border-ink`.
- **Tag:** a pinned paper label: label-white, 2px keyblock border, Barlow Condensed 700 uppercase 0.05em, padding 0.2em 0.5em 0.15em, line-height 1. Pinned over prints, maps, and next to the home-base town.

### Inputs / Fields
- **Style:** label-white ground, 2px keyblock border, 0px radius, 14px / 12px padding, Barlow body in keyblock; placeholder in mute ink; label above in the Label style with a red asterisk when required.
- **Hover:** border to navy. **Focus:** border navy plus 1px inset navy (no outline).
- **Error:** border and inset to red, `aria-invalid`, error line in red Barlow 600 small below.
- **Range (`.range-cut`):** a 4px keyblock rule filled navy to the current value, a 20x30px red thumb with 3px keyblock border and 3px navy offset; ticks as small labels under it.
- **Segmented control:** two 3px-keyblock-bordered cells; the selected cell is a navy block with paper type, the other label-white.
- **Checkbox row (add-ons):** a sheet row with a 2px keyblock box, condensed label, and a red `+$` price.

### Navigation
- Sticky shell-paper header with a 3px keyblock bottom rule; height shrinks on scroll (logo 64px to 44px) over 0.3s on the smooth curve.
- Logo mark plus wordmark in Anton (navy "PC Pro", red "Inspections"), a live `WavingFlag` canvas in a 3px keyblock frame (hidden below `md`), and a "Fairfield, Ill." small label at `xl`.
- Links are the Label style separated by brass stars; the active route carries a red underline. Right side holds a compact primary button with the phone number in `.num`.
- Below `lg` the link row is replaced by a 40px square label-white menu button with a 2px keyblock border that opens `MobileMenu`; a `CommandPalette` exists for keyboard navigation.

### Price Ledger (signature)
A brass block ruled top and bottom, full width: the Title-size caption "Prices posted" with a 3px keyblock right rule, then one centred column per square-footage band (condensed label over an Anton keyblock price), add-ons in red with a `+`, and a condensed footnote row under a 2px 40% rule. Prices come only from `config/pricing.ts`.

### Woodblock Print (signature)
Four PNG plates per illustration (`/art/<name>-{red,navy,brass,key}.png` from `scripts/separate-blocks.mjs`) stacked absolutely. Each layer wipes on from the left (`clip-path: inset(0 100% 0 0)` to `inset(0)`, 0.9s) in print order red, navy, brass, keyblock at a 420ms stagger; the colour plates sit misregistered until the keyblock lands, then settle over 0.5s on the register curve. Optional registration crosshairs at the corners and pinned `tag` labels at percentage coordinates. Reduced motion shows the finished print.

### Seal (signature)
A one-ink rubber stamp: 28-scallop ring plus inner circle, the colour ring printed 2.5 units off the keyblock ring, edges roughened by SVG turbulence, optional five stars along the top for reviews, content set in the centre. Each seal is rotated a deterministic -2 to +2 degrees.

### CTA Band
A red (or navy) block ruled 3px top and bottom, 64px / 80px padding, headline-size paper cut letters with a keyblock misregister, an optional paper lede at 90%, and actions right-aligned at `lg`. Closes every page.

### Flag Band and Waving Flag
The owner-pinned `WavingFlag` is a live canvas of the flag cut as a woodblock in the four inks with keylines; it prints inside the nav frame and inside `.flag-band` (navy ground, 3px keyblock rules top and bottom, 112px / 160px tall) above the footer.

### Motion
- **Register** (`cubic-bezier(0.2, 1.35, 0.4, 1)`): every entrance and state change; a snap with a one-frame overshoot like a block landing on paper.
- **Reveal:** elements enter 10px up over 0.32s / 0.42s on the register curve when scrolled into view; route changes use `fade-up` 0.3s.
- **Price stamp:** the price figure re-keys on change and runs `animate-register` (0.42s) so the number stamps rather than counts.
- **Smooth** (`cubic-bezier(0.22, 1, 0.36, 1)`): only for the nav height change.
- **Reduced motion:** all durations to 0.001ms, reveals visible, print layers unclipped and untransformed.

## Do's and Don'ts

### Do:
- **Do** print every surface on shell paper and every element in one of the four inks; use the `-deep` tints only as hover pressure.
- **Do** frame bands, sheets, buttons, and the nav with 3px keyblock rules (`--rule`), and inner hairlines, fields, and tags with 2px.
- **Do** make depth with a hard 4px (sheets, buttons) or 5px (tickets) second-ink offset that closes on hover and press.
- **Do** set every heading in Anton uppercase at line-height 1 or below, and give page and section titles one `.cut-*` misregister.
- **Do** use Barlow Condensed 600/700 tracked uppercase for labels, buttons, ledger rows, and nav; Barlow 400 for reading; the lede in navy.
- **Do** carry `.num` on every price, phone, and square-footage figure, and stamp price changes with `animate-register`.
- **Do** ship new illustrations through `scripts/separate-blocks.mjs` as four plates so they can print in order, and give reduced-motion users the finished print.
- **Do** pin `tag` labels over prints and maps instead of captions or icon callouts.

### Don't:
- **Don't** use a border radius anywhere; the only non-rectangular silhouettes are the 22px-notched ticket and the round seal.
- **Don't** use blurred shadows, glows, glass, translucent overlays, or gradient fills as colour; the slider track's two-stop gradient is a hard fill, not a fade.
- **Don't** introduce a fifth hue, a dark canvas, or the legacy `bone` / `flag` / `ink-100..300` / `brass-soft` tokens and `.eyebrow` / `.card` classes in new work.
- **Don't** fade elements in; they register (translate plus overshoot) or wipe on in print order.
- **Don't** set coloured type on a coloured block, or a `.cut-*` shadow on anything below headline size.
- **Don't** nest a sheet inside a sheet or a ticket inside a sheet.
- **Don't** arrange a page as hero photo plus a row of cards; the print and the posted price lead.
- **Don't** add stat counters, license numbers, invented cert issuers, or a stock photo where a woodblock plate could stand.
