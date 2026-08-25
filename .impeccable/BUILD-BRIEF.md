# Build brief for page agents — PC Pro Inspections redesign

You are building one or more pages of a React + Vite + TypeScript + Tailwind marketing site
inside an already-established visual world. **Do not invent a look. Inherit it.** The Home page
(`src/pages/Home.tsx`) and the components it uses are the reference implementation; read them
first, then `src/index.css` and `tailwind.config.js`.

## The world: Folk Woodblock on crushed-shell paper

- Ground: shell paper (`bg-paper` #f4efe4, `bg-paper-deep` for a second sheet, `bg-paper-white`
  for label boxes). Never white, never dark canvas.
- Four inks only: `red` #c8102e, `navy` #0a3161, `brass` #b8952a, `ink` #111 (the keyblock).
  Colour arrives as flat fields that own whole bands (`Section tone="navy" | "red" | "brass" | "deep"`),
  not as accents sprinkled on a neutral page.
- Depth = misregistration only: a colour block peeking 3–4px past the black line (`.sheet`,
  `.btn`). **No gradients, no glass/blur, no glow, no soft shadows, no border-radius anywhere**
  (round seals are the one exception).
- Type: `font-display` (Anton, always uppercase, use `.display-1/2/3`), `font-condensed`
  (Barlow Condensed for labels — use `.label` / `.label-sm`), `font-sans` (Barlow) for body.
  Misregistered headline colour via `.cut-red` / `.cut-brass` / `.cut-navy` on section titles.
  Tabular numbers: `.num`.
- Rules: `border-3 border-ink` (3px keyblock) for structure; `border-2 border-ink` inside things.
  `.rule`, `.hairline` exist. Ruled lists (each row `border-b-3 border-ink`) replace card grids.
- Components you must use rather than re-inventing:
  `Section` (tone/wide/ruled/compact), `SectionHeader` (title, description, cut, centered; NO eyebrow),
  `Card` (a `.sheet`; `ink="red|navy|brass|none"`, `ticket` for notched edges; **never nest**),
  `Button` (primary red / secondary paper / navy / ghost underline), `Field`, `Photo` (keyblock frame),
  `Seal` (round stamp; `stars`), `WoodblockPrint` (four-ink print with print-order reveal; assets:
  `house` ratio 1800/1005, `wombat` 1200/896, `landscape` 2000/1116, `paul-cut` 1/1),
  `PriceLedger`, `CertStrip`, `CTABand` (tone red/navy; put one at the foot of every page),
  `FaqAccordion`, `Reveal` (scroll-in; use sparingly, one motion grammar), `SEO`.
- Copy voice: plain, direct, small-town. Paul speaks in first person on About. Say "Paul", not "we"
  where a person is meant. No hype, no "eyes wide open", no "zero friction", no "elevate".
  Short sentences. The phone number is the primary action on every page (`siteConfig.phone`,
  `tel:${siteConfig.phoneHref}`, `track('tel_click', {location})`).

## Hard bans (the craft floor)
- No eyebrow/kicker label above a heading. The heading carries itself.
- No same-size icon+heading+text card grids as page structure. Use ruled lists, ledgers, sheets
  with real content, or a print.
- No stat counters / hero-metric blocks; the owner declined to publish counts.
- No gradient text, no `backdrop-blur`, no `shadow-*`, no `rounded-*` (except Seal).
- No emoji as icons. Inline SVG, 2–3px black stroke, cut-paper simple. `src/components/icons.tsx`
  exists; restyle strokes to 2.5 if you use them.
- No new fonts, no CDN, no external images. Photos: `Photo` with existing paths only
  (`/team/paul-portrait.webp`, `/equipment/wombat-crawler.jpg`); Unsplash URLs in `siteConfig.images`
  are placeholders — prefer the woodblock prints (`WoodblockPrint`) over stock photos wherever the
  section can live without a photo; the owner may remove photo sections entirely.
- Do not touch `src/services/*`, `src/config/*`, `src/types/*` (except reading). Business facts come
  from `siteConfig` / `pricing.ts` only. Never invent prices, counts, license numbers, issuing bodies.
- Keep every existing route, form, analytics `track()` call, `SEO` props and JSON-LD behaviour.
  `submitLead()`, `getBookingConfig()`, `isBookingConfigured()`, `buildPrefillUrl()` stay wired.
- Legacy components you may delete or rewrite once nothing imports them: `CountUp`, `Magnetic`,
  `Flag`, `FlagRosette`, `HeroImage`, `TestimonialCarousel`, `SampleReportShowcase`, `ServiceAreaMap`,
  `StarRating`, `LegalContent`, `nav/CommandPalette` (restyle to paper: it is used by Nav).
  Legacy CSS classes (`.eyebrow`, `.card`, `.text-gradient-*`, `bone-*`, `flag-*`, `ink-100`…)
  are compatibility shims: **do not use them in new code**.

## Mobile first
Fully usable at 375px; sticky bottom call bar exists (`StickyCallCTA`) so leave `pb-24 md:pb-0`
on main alone. Grids collapse to one column; display type uses the fluid classes. Test both.

## Process
1. Read Home.tsx + the components + index.css.
2. Rewrite your page(s) completely in the world (do not polish the old dark layout).
3. Cut filler: any section that restates a claim in different words, any decorative stat.
4. `npx tsc -p tsconfig.app.json --noEmit` must pass. Dev server runs at http://localhost:5199
   (do not start another). Screenshot your route at 1440×900 and 390×844 with Playwright
   (`mcp__plugin_playwright_playwright__browser_*` tools) and fix what you see, once.
5. Report: files changed, sections cut, anything you could not resolve.
