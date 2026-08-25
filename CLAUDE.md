# PC Pro Inspections — Marketing Website

A fast, trustworthy, mobile-first marketing website for a residential home
inspection business. Static, frontend-only — architected so a backend can be
added later without rewriting components.

---

## Stack

- **Vite + React + TypeScript** — fast dev/build, type-safe, deployable as static assets.
- **Tailwind CSS** — utility-first styling enforces consistent spacing/typography on a dark theme.
- **React Router** — client-side routing for multiple marketing pages without a server.
- **Web3Forms** — lead capture without a backend; one access key, no infra.
- Static build output deploys to Netlify / Vercel / Cloudflare Pages.

---

## Folder Structure

```
src/
  components/    Reusable UI (Nav, Footer, Button, Card, Field, Section, SEO, etc.)
  pages/         Route components, one per URL.
  services/      All data/network logic — components never fetch directly.
  config/        siteConfig.ts (business info) + pricing.ts (calculator rules).
  types/         Shared TypeScript types for config, leads, quotes, booking.
  assets/        Static images, icons, sample report PDF (drop-in).
```

---

## Architecture — Service-Layer Seams

The future backend is a **swap, not a rewrite** because:

1. **No fetch/network in components.** Everything goes through `src/services/`.
   Components import a function, call it, render the result.
2. **One lead-submission function:** `submitLead()` in `src/services/leads.ts`.
   Today it POSTs to Web3Forms. Tomorrow it POSTs to `/api/leads`. **Single line
   to change.** Components are untouched.
3. **One pricing function:** `calculateQuote()` in `src/services/pricing.ts`,
   driven entirely by `src/config/pricing.ts`. UI renders the breakdown it
   returns. Move pricing to a server endpoint later — same function signature,
   same UI.
4. **One booking module:** `getBookingConfig()` / `isBookingConfigured()` in
   `src/services/booking.ts`. The Book Now page asks these questions; it never
   knows which vendor (Cal.com / Acuity / Calendly / own backend) is behind them.
5. **One analytics module:** `src/services/analytics.ts`. Single `track(event)`
   API; no-ops when no provider key is set. Swap Plausible → GA4 → custom
   backend in one place.
6. **All content in config, never inline.** Business info → `siteConfig.ts`.
   Pricing → `pricing.ts`. Components import from these.

When the backend arrives:
- `submitLead()` swaps its `fetch` URL.
- `calculateQuote()` may proxy to `/api/quote` (or stay client-side).
- `booking.ts` returns a real scheduler URL or hooks into your own slot picker.
- `analytics.ts` points at your real endpoint.

No component changes. No prop refactor. That is the seam.

---

## Where to Edit Things

| Task | File |
|---|---|
| Business name, phone, email, hours, service area, social links | `src/config/siteConfig.ts` |
| List of service-area towns/counties (SEO + Service Areas page) | `src/config/siteConfig.ts` → `serviceAreaTowns` |
| Headline credential (InterNACHI CPI) shown in hero, cert strip, About, footer | `src/config/siteConfig.ts` → `primaryCertification` (badge at `public/certs/`; swap in the official InterNACHI member badge for max recognition; add `verifyUrl` for a proof link; remove the block to hide everywhere) |
| Specialty certifications shown on About + Home | `src/config/siteConfig.ts` → `certifications` |
| Hand-entered reviews (owner pastes a review in chat → added here; `source: 'google' \| 'spectora'`) | `src/config/reviews.ts` |
| Live Google reviews (auto-pulled; needs `GOOGLE_PLACES_API_KEY` in Vercel env) | `api/google-reviews.js` (server) + `src/services/reviews.ts` (`getReviews()` / `useReviews()`) |
| Google Business Profile links (Maps URL in JSON-LD `sameAs`; "Write a Google review" CTA on Reviews page) | `src/config/siteConfig.ts` → `google` (`writeReviewUrl` from GBP dashboard → "Ask for reviews") |
| Featured equipment showcase on About (name, copy, features, link) | `src/config/siteConfig.ts` → `equipment` (image at `public/equipment/`; remove the block to hide the section) |
| FAQs (also drives FAQPage JSON-LD) | `src/config/siteConfig.ts` → `faqs` |
| Pre-Inspection Prep Guide content | `src/config/siteConfig.ts` → `prepGuide` |
| Response promise ("call back in X hrs, inspect in Y days") | `src/config/siteConfig.ts` → `responsePromise` |
| Pricing tiers, add-on flat fees | `src/config/pricing.ts` |
| Add or remove a calculator add-on | `src/config/pricing.ts` → `ADD_ONS` array (single block) |
| Web3Forms access key | `src/config/siteConfig.ts` → `web3FormsAccessKey` |
| Scheduler URL / embed (Cal.com, Acuity, Calendly, etc.) | `src/config/siteConfig.ts` → `bookingUrl` |
| Service-area / contact map (keyless OSM, or Google "Embed a map" src) | `src/config/siteConfig.ts` → `mapEmbedSrc` |
| Analytics provider key | `src/config/siteConfig.ts` → `analytics` |
| Sample Report PDF | drop file at `public/sample-report.pdf` (linked from Resources page) |
| Open Graph preview image | `public/og-image.png` (1200×630, rendered from the site art; re-render after a headline change) |
| Favicon / touch icon | replace `public/favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png` |
| Woodblock illustrations (house section, crawler, landscape) | `public/art/` — regenerate a print and run `node scripts/separate-blocks.mjs` (see Design System) |
| Display / body fonts | `public/fonts/fonts.css` (Anton, Barlow, Barlow Condensed) + `tailwind.config.js` → `fontFamily` |
| Logo emblem (nav, footer) | master at `src/assets/PC Pro Logo.png`; web asset at `public/brand/logo-mark.png` (transparent PNG) |
| Site photography (hero, inspector, services, resources, CTA) | `src/config/siteConfig.ts` → `images` (paste URLs; blank → elegant placeholder) |

## Design System — "Folk Woodblock on crushed-shell paper"

Redesigned 2026-08-25 (impeccable direction seed b64509d8; approved comp at
`.impeccable/mocks/comps/comp-3-print-in-progress.png`; product truth in
`PRODUCT.md`; the durable rulebook is `DESIGN.md`). The old dark "glass card"
look is gone and must not come back.

- **Ground:** shell paper (`bg-paper` #f4efe4, `bg-paper-deep`, `bg-paper-white`)
  with a faint speckle + tooth set on `body` in `src/index.css`.
- **Four inks only:** `red` #c8102e, `navy` #0a3161, `brass` #b8952a, `ink` #111
  (the keyblock). Colour arrives as flat fields that own whole bands
  (`<Section tone="navy|red|brass|deep">`), never as scattered accents.
- **Depth = misregistration:** a colour block peeking 3–4px past the black line
  (`.sheet`, `.btn` box-shadow, `.cut-red/.cut-brass/.cut-navy` text-shadow).
  No gradients, no blur, no glow, no soft shadows, **no border-radius** (round
  `Seal`s are the one exception).
- **Type (self-hosted, `public/fonts/`):** Anton (`font-display`, always uppercase;
  `.display-1/2/3`), Barlow Condensed (`font-condensed`; `.label`, `.label-sm`),
  Barlow (`font-sans`, body). Tabular figures via `.num`.
- **Structure:** 3px keyblock rules (`border-3 border-ink`), ruled lists instead of
  card grids, notched `.ticket`s, pinned `.tag` label boxes, brass ledger bands.
  No eyebrow/kicker labels above headings; no stat counters (owner declined).
- **Components:** `Section`, `SectionHeader`, `Card` (a `.sheet`; never nest),
  `Button` (primary red / secondary paper / navy / ghost), `Field`, `Photo`
  (keyblock frame), `Seal`, `WoodblockPrint`, `PriceLedger`, `CertStrip`,
  `CTABand`, `FaqAccordion`, `Reveal`, `WavingFlag` (canvas, four inks,
  posterized shading; header chip + footer band).
- **Motion grammar:** things *register* (snap with a one-frame overshoot,
  `ease-register`) rather than fade; illustrations print one ink at a time
  (`WoodblockPrint`: red → navy → brass → keyblock, then settle into register);
  the price figure stamps on change. Reduced-motion users get the finished print.
- **Art pipeline:** four-ink illustrations live in `public/art/` as one PNG per ink
  (`<name>-{red,navy,brass,key}.png`) plus a composite. They are generated
  woodcuts colour-separated by `scripts/separate-blocks.mjs <input> public/art <name>`
  (sharp). Current prints: `house` (section, 1800×1005), `wombat` (crawler),
  `landscape` (Southern Illinois strip), `paul-cut` (portrait, optional).
  Raw sources: `.impeccable/mocks/assets/`. Share card: `public/og-image.png`.
- **Legacy shims** in `tailwind.config.js` / `index.css` (`bone-*`, `flag-*`,
  `ink-100…`, `.eyebrow`, `.card`, `.text-gradient-*`) exist only so untouched
  code compiles; do not use them in new work and delete them once unused.

---

## Contact / Quote form delivery

The forms have two delivery modes, chosen automatically in `services/leads.ts`
→ `submitLead()` by whether a Web3Forms key is set. No component changes to
switch between them.

### Default (no setup): `mailto:` fallback

While `web3FormsAccessKey` is the placeholder `YOUR_WEB3FORMS_ACCESS_KEY`,
submitting **opens the visitor's email app** with a pre-filled draft (name,
phone, message, and the quote breakdown for quote-form leads) addressed to
`siteConfig.email`. No account, no backend, nothing to deploy. Trade-off: the
visitor must have a mail client and press **Send** themselves, so it can drop
leads on devices with no configured mail app — the success screen says so and
shows the email address as a fallback.

### Upgrade (recommended once live): Web3Forms

- Sign up at https://web3forms.com → get free access key.
- Paste it into `siteConfig.ts` → `web3FormsAccessKey`. The form **upgrades
  automatically** to POST to Web3Forms, which emails the lead with no extra step
  for the visitor. Custom subject + honeypot are already wired.
- After deploy, add your production domain to the Web3Forms dashboard so
  submissions aren't blocked.

---

## Reviews — two sources, one seam

`services/reviews.ts` → `getReviews()` / `useReviews()` is the only thing
pages call. It returns `config/reviews.ts` instantly, then merges live Google
reviews from `/api/google-reviews` (a Vercel serverless function in `api/`
that calls Places API (New) with `GOOGLE_PLACES_API_KEY` from the Vercel
environment — the key never reaches the browser). Duplicates are collapsed;
Google entries lead. Locally (`vite dev` has no `/api`), without a key, or on
any Google error the config reviews are shown alone — nothing breaks.

- Google returns at most the 5 "most relevant" reviews per listing, so older
  Google reviews should also be pasted into `config/reviews.ts`.
- Setup: Google Cloud → enable **Places API (New)** → create key restricted
  to that API → Vercel → Environment Variables → `GOOGLE_PLACES_API_KEY`
  (optionally `GOOGLE_PLACE_ID`; otherwise resolved by name once). See
  `.env.example`. Redeploy after setting.
- The Reviews page shows a live "4.9 · 12 reviews on Google" pill when the
  feed is configured, plus a "Write a Google review" CTA from
  `siteConfig.google`.
- The site's NAP (name / `address` / `hours`) must match the Google listing
  exactly. Fix mismatches on the GBP side too.

## Booking — Vendor-Agnostic, Deferred

The site is built to accept any scheduler later **without code changes to
components**:

- Set ONE field in `siteConfig.ts`: `bookingUrl`. Either a full embed URL or an
  iframe `src`. Supported out of the box: **Cal.com, Acuity, Calendly,
  SquareSpace Scheduling, SimplyBook.me** — any vendor that gives you an
  embeddable URL.
- While `bookingUrl` is blank, the Book Now page renders an intentional
  "Online booking coming soon" placeholder with phone + quote-form CTAs.
- When you fill it, the page renders the scheduler in a responsive iframe slot.
- Switching to your own backend later: replace the iframe in `pages/BookNow.tsx`
  with your own scheduler UI; **everything else (CTAs, calculator hand-off,
  analytics) is untouched.**

### Calculator → Booking Hand-off

The calculator's **"Book This Inspection"** button routes to
`/book?sqft=2400&addons=mold,termite-wdo&estimate=600`. The Book Now page reads
these URL params and:

1. Surfaces them on screen ("We have your inputs ready: 2,400 sqft, Mold
   + Termite, estimate $600"), so the user feels seen.
2. Will eventually pass them to the scheduler as **prefill params**.

### Mapping Calculator Inputs to Your Scheduler's Prefill

Each scheduler has different prefill query param names. Map them in
`services/booking.ts` → `buildPrefillUrl()`. Examples:

| Scheduler | sqft | add-ons | estimate |
|---|---|---|---|
| Cal.com | `metadata[sqft]` | `metadata[addons]` | `metadata[estimate]` |
| Acuity | `field:XXXXX` (per custom field) | same | same |
| Calendly | `a1` / `utm_content` | `a2` | `a3` |
| SimplyBook | custom fields | same | same |

The mapping function in `booking.ts` is the **single place** to set these once
the vendor is chosen.

### Deposits / Payment

Not now. When the owner wants deposits, they enable it inside the chosen
scheduler's dashboard. **Zero code change.**

---

## Analytics

- `src/services/analytics.ts` exposes `track(event, props?)` and `init()`.
- Default integration: Plausible (privacy-friendly, no cookie banner needed).
  GA4 acceptable; swap inside this file.
- No-ops gracefully when `siteConfig.analytics.domain` is blank.
- **Conversion events tracked (already wired):**
  - `quote_calculated` — calculator updated (debounced)
  - `quote_request_submit` — "Request This Quote" form submitted
  - `lead_form_submit` — Contact form submitted
  - `book_now_click` — any "Book Now" link clicked
  - `tel_click` — phone link tapped
  - `mailto_click` — email link tapped

---

## SEO

- Per-page unique `<title>` and `<meta name="description">` via the `<SEO>` component.
- `LocalBusiness` (HomeAndConstructionBusiness) JSON-LD on every page,
  driven from `siteConfig.ts`. Single source of truth for NAP (Name,
  Address, Phone).
- `FAQPage` JSON-LD on the Home page (and Contact) from `siteConfig.faqs`.
- Open Graph + Twitter card tags, with `/og-image.png` placeholder.
- `robots.txt` and `sitemap.xml` at `public/`. Update sitemap when adding pages.
- City/town names rendered as crawlable text on `/service-areas`.

### What on-page SEO does NOT do

On-page SEO is **part of** local ranking, not all of it. The owner also needs:

1. **Google Business Profile** — claimed, verified, complete (photos, hours,
   services, posts). This is where local pack rankings come from.
2. **Reviews** — ongoing flow of real reviews on GBP. The single biggest
   ranking + conversion lever.
3. **NAP consistency** — the business name, address, and phone on this site
   MUST match GBP and every directory citation EXACTLY (including punctuation).
4. **Local citations** — listings on Yelp, BBB, Angi, HomeAdvisor, Nextdoor,
   InterNACHI's directory, ASHI's directory, local chamber of commerce, etc.

These live outside the codebase but are required to actually rank.

---

## Legal Pages

- `/privacy` and `/terms` are **complete, business-specific documents** —
  written for PC Pro Inspections as an Illinois (Wayne County) sole
  proprietorship, tailored to how this static, frontend-only site actually
  works (dual mailto/Web3Forms form delivery, optional cookieless analytics,
  optional future scheduler, self-hosted fonts).
- Content lives as **plain data** (`intro` + `sections` + `closingNote`) inside
  each page and is rendered by the shared `LegalContent` component. To edit the
  copy, change the `content` object in `pages/Privacy.tsx` / `pages/Terms.tsx`;
  no markup needed. Inline tokens `{EMAIL}`, `{PHONE}`, `{WEB3FORMS_PRIVACY}`
  expand to live links. List items written `Lead-in — explanation` auto-emphasize
  the lead-in.
- Each page shows a **static** `EFFECTIVE_DATE` (top of each file) — update it
  whenever the copy meaningfully changes; it is the "date shown" the copy
  references. Do NOT make it `new Date()` (that would silently show today).
- The Terms reference Illinois licensing/regulation; **owner must confirm the
  active IDFPR home-inspector license** before launch (Terms §5 states the legal
  requirement and routes specifics to the signed pre-inspection agreement — no
  license number is published).
- Each page ends with a brief, professional review note (not an alarming
  "template" banner). **Still not legal advice** — owner should have counsel
  glance at them before/periodically after launch.
- Linked in the footer, not the top nav.

---

## Images

- Use modern formats (WebP / AVIF) with fallbacks.
- Always set explicit `width` and `height` (prevents layout shift / CLS).
- Below-the-fold images: `loading="lazy"`.
- Hero / above-the-fold: `fetchpriority="high"`, no lazy.
- Responsive `srcset` for hero where worth it.
- **Owner should supply REAL photos** of the inspector at work, sample
  equipment, sample homes inspected. Stock photos hurt trust on a service
  built on competence.

---

## Definition of Done

Verified before declaring complete:

- [x] `npm run build` — zero errors, zero TS errors.
- [x] `npm run dev` — clean, no console errors/warnings.
- [x] All pages render, including a styled 404.
- [x] Quote calculator updates live with itemized breakdown.
- [x] "Request This Quote" submits via `submitLead()`; success + error states both display.
- [x] Book Now page renders fallback cleanly when `bookingUrl` is blank.
- [x] Book Now page renders embed when `bookingUrl` is set (test value).
- [x] Calculator → Book Now hand-off carries inputs through URL params.
- [x] Fully usable at 375px width; scales cleanly to desktop.
- [x] Keyboard-only navigation works across all pages and forms.
- [x] WCAG AA contrast on dark theme verified.
- [x] Focus moves to main heading on route change.
- [x] `prefers-reduced-motion` honored.

---

## Pre-Launch "Fill Before Launch" Checklist

Open `src/config/siteConfig.ts` and resolve every `// TODO: owner to fill`.

- [ ] Business name
- [ ] Phone number (primary)
- [ ] Email
- [ ] Street address (or service area if mobile-only)
- [ ] Hours of operation
- [ ] Years in business
- [ ] Inspections completed (running count)
- [ ] Response promise — hours to call back, days to inspect
- [ ] Service area towns/counties array (drives Service Areas page + SEO)
- [ ] Social links (Facebook, Instagram, etc.)
- [ ] Google Business Profile place ID / reviews embed URL
- [ ] Certifications (cert name, issuing org, badge image path)
- [ ] Real testimonials (name, town, quote, rating)
- [ ] FAQs (drives FAQPage JSON-LD)
- [ ] Pre-Inspection Prep Guide content (Resources page)
- [ ] Web3Forms access key (`web3FormsAccessKey`)
- [ ] Booking URL / embed (`bookingUrl`) — only when scheduler is chosen
- [ ] Analytics provider key (`analytics.domain`)
- [ ] Site photography — fill `siteConfig.images` (hero, inspector, services, resources, ctaBand)
- [ ] Sample Report PDF dropped at `public/sample-report.pdf`
- [ ] Open Graph preview image at `public/og-image.png` (1200×630)
- [x] Favicon + touch icon (`public/favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png`) — generated from the brand logo
- [ ] Real photos uploaded (no stock photos)
- [ ] Legal pages reviewed with counsel
- [ ] Custom domain configured at host (Netlify/Vercel/CFP)
- [ ] Production domain added to Web3Forms dashboard
- [ ] Google Business Profile claimed + verified
- [ ] NAP consistency verified across GBP, Yelp, BBB, InterNACHI, ASHI, etc.
- [ ] Initial review flow set up (post-inspection email/text asking for GBP review)

---

## Deployment

Static build → any static host. Recommended: **Netlify** or **Cloudflare Pages**
(both free tier, instant SSL, custom domain support).

```bash
npm run build        # outputs to dist/
```

Drag `dist/` into Netlify, or connect the repo for auto-deploy. Custom domain:
add A/CNAME records per host instructions, enable SSL.

After deploy:
1. Add the production domain to Web3Forms dashboard.
2. Verify analytics is firing on the live site.
3. Submit `sitemap.xml` to Google Search Console.
4. Test the contact form end-to-end.
