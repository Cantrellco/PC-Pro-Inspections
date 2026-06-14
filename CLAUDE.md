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
| Certifications shown on About + Home | `src/config/siteConfig.ts` → `certifications` |
| Testimonials | `src/config/siteConfig.ts` → `testimonials` |
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
| Google reviews embed URL / place ID | `src/config/siteConfig.ts` → `googleReviews` |
| Sample Report PDF | drop file at `public/sample-report.pdf` (linked from Resources page) |
| Open Graph preview image | drop file at `public/og-image.png` (1200×630) |
| Favicon / touch icon | replace `public/favicon-32.png`, `favicon-16.png`, `apple-touch-icon.png` |
| Logo emblem (nav, footer) | master at `src/assets/PC Pro Logo.png`; web asset at `public/brand/logo-mark.png` (transparent PNG) |
| Site photography (hero, inspector, services, resources, CTA) | `src/config/siteConfig.ts` → `images` (paste URLs; blank → elegant placeholder) |

## Design System

- **Type:** Fraunces (display serif) + Hanken Grotesk (UI/body), **self-hosted**
  under `public/fonts/` (`fonts.css` + woff2). Hanken is a warm humanist
  grotesque shipped as one variable file (weights 400–700). No third-party CDN —
  fonts always load and there's no render-blocking round trip. To change fonts,
  replace the woff2 files + `fonts.css`, then update `tailwind.config.js` →
  `fontFamily`.
- **Palette:** near-black canvas, heritage crimson + navy, a restrained
  antique-brass accent. Tokens live in `tailwind.config.js` → `colors`.
- **Components:** `Section` (tones: default/elevated/dark/americana), `Card`
  (`rim` brass hairline, `hover` lift), `SectionHeader`, `Button`, `Photo`
  (image-or-placeholder), `Reveal` (scroll-in, respects reduced-motion),
  `Flag` / `FlagRosette` (heritage accents). Fluid display type via
  `.display-1/2/3` and `.lede` in `src/index.css`.
- **Photography is the #1 upgrade:** fill `siteConfig.images` with real photos
  (your own beat stock). Each slot degrades gracefully to a gradient
  placeholder, so the site never looks broken while empty.

---

## Web3Forms

- Sign up at https://web3forms.com → get free access key.
- Paste it into `siteConfig.ts` → `web3FormsAccessKey`. Default value is
  `YOUR_WEB3FORMS_ACCESS_KEY` — the form refuses to submit while that placeholder
  is present (prevents accidental live deploys with a bad key).
- Web3Forms supports custom redirect, custom subject, and honeypot — already
  wired in `services/leads.ts`.
- After deploy, add your production domain to the Web3Forms dashboard so
  submissions aren't blocked.

---

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

- `/privacy` and `/terms` are **templates with placeholder content**, labeled
  `// TODO: owner to review with counsel` at the top.
- Privacy Policy mentions Web3Forms (form processor) and analytics.
- **NOT legal advice.** Review before launch.
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
