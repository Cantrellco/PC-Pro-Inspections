# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: first-time home buyers in Fairfield, IL and the surrounding Southern Illinois counties. They are under contract or about to be, on a phone, in the inspection-contingency window (usually 7-10 days), often referred by their agent but checking the inspector out themselves. They are nervous about the money, do not know what an inspection covers, and want to know three things fast: what it costs, whether Paul can come this week, and whether they can trust him.

Secondary: local real estate agents who refer buyers and want an inspector who answers the phone, shows up on time, and explains findings without killing deals. Sellers ordering pre-listing inspections are a small third audience.

## Product Purpose

A marketing site for PC Pro Inspections, a one-inspector residential home inspection business run by Paul Cantrell out of Fairfield, IL (sole proprietorship, not an LLC). Success is a phone call or a quote request from a buyer who feels they already understand the price and the process before they dial. The site must work with few or no photographs; the owner may remove photo sections entirely.

## Positioning

One inspector, reachable directly, who walks the buyer through the house at the end of the inspection and delivers a photo-rich Spectora report the same evening. Flat pricing published on the site by square footage (most competitors say "call for a quote"). A robotic crawler (UplinkRobotics Wombat) inspects crawl spaces too tight or unsafe to enter. Trained under InterNACHI standards with specialty certifications in thermal imaging, mold assessment, termite/WDO, pool & spa, and manufactured/mobile homes.

## Operating Context

Buyer gets under contract; agent recommends an inspector; buyer checks the site, calls or requests a quote; Paul calls back within ~4 hours and inspects within ~3 days; the buyer attends the last 45 minutes for a walkthrough; report arrives the same evening; buyer and agent negotiate repairs from it. The owner's wife Mitzie is a local real estate agent, which is how the business started. Rural/small-town market: word of mouth, Facebook, and Google Business Profile matter more than search volume.

## Capabilities and Constraints

- Vite + React + TypeScript + Tailwind static site, React Router, deployed on Vercel from the default branch.
- All copy and business data live in `src/config/siteConfig.ts` and `src/config/pricing.ts`; components never hard-code business facts. Preserve this seam.
- Lead forms: `submitLead()` in `src/services/leads.ts` (mailto fallback, Web3Forms when keyed). Booking page is vendor-agnostic via `bookingUrl`. Analytics via `src/services/analytics.ts`. Keep these service modules and their call sites.
- Quote calculator: residential flat rate by sqft band, commercial per sqft, Termite/WDO is the only confirmed priced add-on; mold, pool/spa, thermal imaging are "call for a quote". Do not invent prices.
- Do not publish years in business or an inspection count (owner declined). Do not publish a license number. Certification issuing bodies for the specialty certs are unconfirmed; show cert names only, "documentation on request".
- Self-hosted fonts only (no CDN). Mobile-first; must be fully usable at 375px. Keyboard navigation, WCAG AA, reduced-motion respected.
- Pages: Home, Services (pricing + calculator), About, Reviews, Resources (prep guide, sample report), Service Areas, Contact, Book Now, Privacy, Terms, 404.

## Brand Commitments

- Name: PC Pro Inspections. Owner: Paul Cantrell.
- Logo mark at `public/brand/logo-mark.png` (master `src/assets/PC Pro Logo.png`), a red/navy/brass shield-style emblem. Fixed.
- Palette commitment: the flag red, navy, and antique brass of the logo remain the brand colors. Confirmed by the owner on 2026-08-25.
- The waving American flag (`src/components/WavingFlag.tsx`, a canvas animation) stays on the site. Confirmed by the owner on 2026-08-25. Its placement and treatment may change.
- Voice: plain, direct, small-town; Paul speaks in first person on the About page. No hype, no fear-mongering, no "AI landing page" register.

## Evidence on Hand

- Six real verified client reviews (Spectora), in `siteConfig.testimonials`.
- Paul's portrait at `public/team/paul-portrait.webp`.
- Wombat crawler product photo at `public/equipment/wombat-crawler.jpg`.
- Sample report PDF at `public/sample-report.pdf`.
- Official price sheet transcribed in `src/config/pricing.ts`.
- Owner's story in his own words in `siteConfig.ownerStory`.
- Hero/services/resources/CTA photography is Unsplash placeholder. The owner does not plan to supply many photos; design must not depend on them, and sections that exist only to hold a photo may be cut.
- No years-in-business, inspection count, license number, or cert issuing bodies to publish.

## Product Principles

1. Price and availability up front. A buyer should see the cost of their house and how fast Paul can come within one screen.
2. Prove with the report, the walkthrough, and the crawler, not with adjectives.
3. One human, reachable. The phone number is the primary action everywhere.
4. Nothing on the page the owner cannot stand behind. No invented stats, no unverified credentials.
5. Works without photographs.
