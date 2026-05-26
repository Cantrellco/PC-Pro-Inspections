# PC Pro Inspections — Marketing Website

Static, fast, mobile-first marketing site for a residential home inspection
business. Frontend-only — but architected so a backend is a drop-in later.

See **[CLAUDE.md](./CLAUDE.md)** for the architecture deep-dive, where to edit
things, and the full pre-launch checklist.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs static site to dist/
npm run preview  # serves the built site locally
```

---

## Stack

- Vite + React + TypeScript
- Tailwind CSS (dark theme; black with red/navy accents)
- React Router
- Web3Forms (lead capture, no backend required)

---

## Fill Before Launch — short list

Resolve every `// TODO: owner to fill` in `src/config/siteConfig.ts`, then:

- [ ] Add your **Web3Forms access key** to `siteConfig.ts` →
      `web3FormsAccessKey` (otherwise the form refuses to send).
- [ ] Add your production domain to the **Web3Forms dashboard**.
- [ ] Set `bookingUrl` in `siteConfig.ts` when you pick a scheduler
      (Cal.com / Acuity / Calendly / etc.). While blank, the Book Now page
      shows a polished fallback.
- [ ] Set `analytics.domain` and `analytics.provider` when you pick a provider.
- [ ] Drop the sample report PDF at `public/sample-report.pdf`.
- [ ] Drop an Open Graph image at `public/og-image.png` (1200×630).
- [ ] Drop real photos and (optional) certification badge SVGs.
- [ ] Update `public/sitemap.xml` hostnames to your production domain.

Full pre-launch checklist lives in [CLAUDE.md](./CLAUDE.md#pre-launch-fill-before-launch-checklist).

---

## Deployment

Build outputs a static site to `dist/`. Deploy anywhere:

| Host | Setup |
|---|---|
| **Netlify** | Drag `dist/` to the deploy page, or connect repo. The included `public/_redirects` handles SPA routing. |
| **Vercel** | Connect repo. `vercel.json` handles SPA routing. |
| **Cloudflare Pages** | Build command `npm run build`, output dir `dist`. |

After deploy:
1. Add the production domain to the Web3Forms dashboard.
2. Submit `sitemap.xml` to Google Search Console.
3. Test the contact form end-to-end.
4. Test the quote calculator → Book Now hand-off.
