# Website accuracy & design unification — Biluibaba × Study-Insights

Date: 2026-09-16

## Problem

The `home/` static site has drifted into three inconsistent visual systems and contains gaps versus the two source documents (`Biluibaba Company Profile.pdf`, `Study-Insights Company Portfolio.pdf`, `Financial Model Combined for Biluibaba and Study Insights.xlsx - Cost.pdf`):

- `index.html`, `company.html`, `contact.html` use a new editorial "brand" system (`assets/brand.css`/`brand.js` — Fraunces serif + Archivo + Spline Mono, cream/green palette).
- `team.html`, `financials.html` use an older Tailwind "glassmorphism" system (`assets/investor.css`/`investor.js`, neon-orange/black).
- `secureyourstake.html`, `legal-privacy.html`, `404.html` use a third inline-Tailwind neon-orange investor-portal look.
- Real photos already exist under `home/public/` (biluibaba/, study-insights/, and 4 service images) but are unused outside `team.html`.
- `team.html` lists "Dewan Abdullah Fahad – Head of Creative" under Study-Insights, but the Study-Insights PDF names only three leaders (Sadman Bin Arif, Mahir Shariar Mahin, Shah Sadad Ahmed) — Dewan Abdullah Fahad is Biluibaba's COO per the Biluibaba PDF.
- `company.html`'s Study-Insights section has no grounding in the PDF's market-research figures.
- `financials.html` figures already match the Cost PDF exactly; only the visual system needs to change.
- Neither `team.html` nor `financials.html` is linked from the shared nav/footer on the brand-style pages.

## Scope

In scope:
- `home/index.html`, `home/company.html`, `home/contact.html` — enrich content accuracy, add images, add nav links to team/financials.
- `home/team.html` — full rebuild in brand.css editorial style; fix roster to match PDFs.
- `home/financials.html` — full rebuild in brand.css editorial style; keep existing accurate figures and Chart.js charts.

Out of scope (explicitly, per user decision):
- `home/secureyourstake.html`, `home/legal-privacy.html`, `home/404.html` — left as-is, different style system, not part of this task.
- No backend/form service added — contact stays static `mailto:`/`tel:`/WhatsApp links.
- No new image assets — everything needed already exists in `home/public/`.

## Design

### 1. Shared navigation
Add `Team` and `Financials` links to the `.links` nav and `.mobile` menu and footer `.footer-links` on `index.html`, `company.html`, `contact.html`, `team.html`, `financials.html`, so all five brand-style pages are mutually reachable.

### 2. `index.html`
- Add a "Leadership" teaser block before the footer: 2–3 real headshots (thumbnail, grayscale-to-color hover consistent with brand.css `.service`/`.portfolio-card` hover patterns) linking to `team.html`.
- Add a "Financial model" teaser block: headline figure (Final funding commitment ৳88,00,000) in the `.metric` stat-block style, linking to `financials.html`.
- Swap the 4 abstract `.service` cards in "What we do" for the same real service photos used on `company.html` (see #3) for visual consistency, OR keep text-only here and reserve photos for `company.html` — decision: keep `index.html` services text-only (unchanged) since it's a condensed summary of both companies' services, not just Biluibaba's; images go on `company.html` where the full 4-service Biluibaba grid lives.

### 3. `company.html`
- **Biluibaba service grid**: convert each of the 4 `.service` article cards into image-backed cards (background-image or `<img>` thumbnail) using `public/E-Commerce.jpg`, `public/Vet Service.jpg`, `public/Pet Delivery.jpg`, `public/Adoption.jpg`, keeping title/description text overlaid or below per brand.css conventions (new small CSS addition: `.service-photo` treatment, consistent with `.service` box styling — border, hover lift).
- **Study-Insights section**: insert a stats strip (new `.metrics`-pattern block, 3 items) sourced from the PDF:
  - "52,799+" — Bangladeshi students studying abroad in 2023 (up from 24,112 in 2013 — 119% growth)
  - "$667.77M" — FY25 annual spending on foreign education (153% increase from FY21)
  - "$4.04B" — 2025 global education consulting market size (projected $6.34B by 2030)
  Each stat gets a one-line caption, matching the existing `.metric b/span` pattern. Source line: "Source: UNESCO Global Flow of Tertiary-Level Students, Bangladesh Bank, The Business Research Company."
- **Biluibaba milestones**: expand the existing 2-card "2025 Start in Dhaka / NEXT Reach further" portfolio grid to the 3-year milestone set from the PDF (2025 — start in Dhaka City; 2026 — expand beyond Dhaka to other parts of Bangladesh; 2027 — global market impact), matching the PDF's milestone slide exactly.
- **Team preview**: add a compact 4–6 face strip (2 from Study-Insights, e.g. Sadman Bin Arif + Shah Sadad Ahmed; a few from Biluibaba, e.g. Sadman Bin Arif + Dewan Abdullah Fahad + Sami Adnan) with "View full team →" linking to `team.html`. Uses existing photos from `public/biluibaba/` and `public/study-insights/`.
- **Financial model preview**: a small callout card with the top-line figure (৳88,00,000 final funding commitment) and "View the full financial model →" linking to `financials.html`.

### 4. `contact.html`
- Verify all contact facts against PDFs (they already match): Biluibaba `info@biluibaba.com`, `+8801318485287`; Study-Insights `info@study-insights.com`; shared office "Dhaka Trade Centre, 6th Floor, Kazi Nazrul Islam Avenue, Karwan Bazar, Dhaka, Bangladesh"; Study-Insights hours "Sat–Thu 9:00 AM–6:00 PM, Friday closed" (Biluibaba PDF has no separate hours, so hours block stays labeled as Study-Insights specific, as it already is).
- No structural changes needed beyond nav link additions (#1) — content is already accurate.

### 5. `team.html` — full rebuild
- Rebuild using `assets/brand.css`/`brand.js`, matching nav/hero/footer chrome of the other brand pages (loader, `#nav`, `.hero` with `#terrain` canvas, ticker, `.section` rhythm).
- Hero: "The people behind the platforms." eyebrow "Our team."
- Two grouped sections (`.section soft` and `.section dark` alternating, per site rhythm):
  - **Study-Insights leadership** (3 people, corrected roster from PDF):
    - Sadman Bin Arif — Managing Director
    - Mahir Shariar Mahin — Manager & Head of Operation
    - Shah Sadad Ahmed — Counselor & Head of Admissions
  - **Biluibaba leadership** (6 people, from PDF):
    - Sadman Bin Arif — CEO & Founder
    - Dewan Abdullah Fahad — COO & Co-Founder
    - Sami Adnan — Chief Technology Officer
    - Kazi Shabbin Hossain — Head of IT
    - Md Munjurul Karim — Head of Marketing & Sales
    - Md Sajidul Islam — Head of Procurement
- Each card: real photo from `public/{biluibaba,study-insights}/*.jpg` (already correctly named/matched), name, title — styled as a new `.team-card` in brand.css (photo, grayscale-to-color on hover matching `.service`/`.portfolio-card` hover language, cream/green palette, serif name + mono title).
- Photo `onerror` fallback (initials) kept, consistent with current team.html robustness.

### 6. `financials.html` — full rebuild
- Rebuild using `assets/brand.css`/`brand.js` chrome (nav/hero/footer), replacing `assets/investor.css`/`investor.js`.
- Keep Chart.js (`cashChart` bar, `fundingChart` doughnut) — restyle canvas container as a `.chart-panel`-style card (cream background, thin border) consistent with brand.css, update Chart.js color config to brand palette (green `#1f6b4a`, green-bright `#68c494`, copper `#b9793f`, ink `#151310`).
- Keep exact figures unchanged (already verified accurate against the Cost PDF):
  - Final funding commitment: ৳88,00,000
  - One-time costs (OTC): ৳15,50,000
  - 12-month recurring costs (MRC): ৳66,00,000
  - Yearly recurring costs (YRC): ৳1,80,000
  - Emergency reserve/contingency: ৳4,50,000
  - Calculated funding requirement: ৳87,80,000 + Rounding buffer ৳20,000
  - Monthly recurring cost breakdown: Salaries ৳4,05,000; Daily buffer ৳5,000; Rent+utilities ৳40,000; Biluibaba marketing ৳40,000; Study-Insights marketing ৳30,000; IT+admin ৳30,000 → ৳5,50,000/month
- Keep the Google Sheets `.xlsx` export link unchanged.
- Ledger/table sections restyled as brand.css `.ledger`/mono-table treatment (matching the pasted sample's investor-memorandum table look) rather than the current card-row layout — reuses the "dark ledger + tabs" visual idiom from the sample HTML you provided, adapted to real static data (no tabs needed since there's one dataset; keep it as a single clean table/card layout instead of tabbed, to avoid over-engineering for static content).

## Testing / verification

- No build step; this is static HTML/CSS/JS served via Netlify (`netlify.toml` redirects all routes to `index.html` — note this is an SPA-style catch-all already in place; multi-page nav still works because it's client-side navigation via real `<a href>` requests intercepted by Netlify only for unmatched routes... actually re-check: the redirect `from = "/*" to = "/index.html" status = 200` will hijack ALL paths including `/team.html` unless Netlify's static-file-first behavior takes precedence). **Must verify this doesn't break multi-page nav** — Netlify serves an existing static file before applying redirects, so `/team.html` resolves to the real file first; only truly unmatched paths fall back to `index.html`. This is existing behavior, unchanged by this work, but will be spot-checked.
- Manual check: open each rebuilt page, confirm nav links work, confirm images load (verify exact filenames incl. spaces: `public/E-Commerce.jpg`, `public/Vet Service.jpg`, `public/Pet Delivery.jpg`, `public/Adoption.jpg` — need URL-encoding or matching exact spaces in `src`).
- Cross-check every fact/figure against the three source PDFs before finalizing copy.
