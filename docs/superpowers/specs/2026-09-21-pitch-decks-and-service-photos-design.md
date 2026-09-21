# Pitch decks and study-abroad service photos — design

Date: 2026-09-21

## Problem

The user provided the Biluibaba investor pitch deck (PDF) and asked for it to be
added to the website, a matching Study Insights pitch deck to be built from
scratch, and study-abroad related photos added to the homepage and company
page.

## Scope (three independent pieces)

1. Two new pitch-deck pages: `home/biluibaba-deck.html`,
   `home/study-insights-deck.html`
2. Links from `company.html` into each deck
3. Study-abroad and pet-care photos on `company.html` (Study Insights service
   grid) and `index.html` (portfolio cards)

## 1. Pitch deck pages

Built as scrollable sections in the site's existing editorial design system
(brand.css classes, Archivo/Bricolage/Spline Sans Mono fonts, `data-reveal`
scroll animations, dark/light/soft section alternation) — not a literal
slide/carousel reproduction of the PPTX. Section rhythm follows
`financials.html`: dark hero → alternating sections → CTA/footer.

### biluibaba-deck.html — section order, sourced from the provided PDF

1. Hero — "South Asia's #1 Digital Ecosystem for Pet Care", pre-seed framing
2. Market opportunity — 2×, 10–15%, 90%, BDT 5B stats; market-size bar
   chart 2023→2030 ($85M→$228M), Chart.js styled like financials.html
3. The problem — 5 fragmentation points (Limited Vet Access, No Centralized
   Platform, Difficult Adoption, Information Gap, High Costs)
4. Our solution — 4 core offerings (Vet Consultations, E-Commerce, Adoption &
   Delivery, Subscription Plans) + "Why Billuibaba Wins" panel
5. Product ecosystem — Core / Value-added / Future roadmap, plus the 5-step
   user journey
6. Revenue model — 5 streams with rates, doughnut chart
7. Market advantage — 6 "why now" points + 3 headline stats (171M
   population, 187M mobile subscribers, $124M 2025 startup funding)
8. Go-to-market — 3 phases, 5 marketing channels
9. Competitive landscape — 4 current players vs. 5 Billuibaba advantages
10. Traction & milestones — 4 stat tiles, pre-launch traction list, 12-month
    roadmap by quarter
11. Investment ask — BDT 1.5 Cr / $120K, 12–18 month runway, fund allocation
    doughnut (40/30/20/10)
12. Close — CTA, contact, placeholder launch date

**Placeholder handling:** the source PDF has two unresolved placeholders
("Launch: XX XX, 2026" and "MVP Launch Date: XXX"). These render as "Date to
be confirmed" rather than an invented date — explicit honesty about what
isn't decided yet, consistent with how the rest of the site handles
uncertain figures.

**Numbers note:** this deck's ask (BDT 1.5 Cr / $120K, standalone) is the
number from the *original Biluibaba-only* pitch PDF and is kept as historical
deck content — it is not reconciled against the combined BDT 88L raise on
financials.html. The deck opens with a byline noting it predates the combined
funding model, so a reader doesn't take the two asks as contradictory
current figures.

### study-insights-deck.html — section order, built from existing site data

Same 12-section rhythm, populated only from figures already published
elsewhere on this site (no invented numbers):

1. Hero — "South Asia's Trusted International Education Consultancy"
2. Market opportunity — from financials.html/company.html: 52,799 students
   studying abroad annually, $667.77M FY25 outbound spend, $4.04B→$6.34B
   global consulting market by 2030 (UNESCO / cited source retained)
3. The problem — fragmented/informal agents, no transparent pricing, weak
   post-arrival support (derived from the site's existing "honest,
   transparent guidance" positioning — framed as problem statements)
4. Our solution — the 7 real services (University selection → Air
   ticketing) as the core offering
5. Product ecosystem — same 7 services grouped as Core (selection,
   application, visa) / Value-added (scholarship, career counselling,
   pre-departure) / traction framed as roadmap (foreign markets: UK first,
   then Europe/Australia)
6. Revenue — Study Insights' slice of the combined revenue model from
   financials.html (BDT 1.50L/month consultancy fees, 30% of the BDT 5L
   combined revenue), framed honestly as part of the combined venture
7. Market advantage — same macro stats reused with Study Insights framing
   (smartphone/internet penetration relevant to lead generation)
8. Go-to-market — Dhaka launch (March 2026, already stated on the site) →
   national reach 2027 → global impact 2028 (matches the milestone years
   already set in the last edit)
9. Competitive landscape — informal consultants / unlicensed agents /
   international platforms with no local presence vs. Study Insights'
   transparency + local + full-service advantages
10. Traction — reuses the real milestone copy from financials.html (The
    launch 2026, National reach 2027, Global impact 2028)
11. Investment — **explicitly framed as part of the combined BDT 88,00,000
    raise** (40% equity, BDT 2.20 Cr post-money, 5× / 400% 3-year ROI — all
    pulled directly from financials.html), not a fabricated standalone
    Study Insights number
12. Close — CTA, contact, "Founded March 2026, Dhaka"

## 2. Navigation

`company.html`: each company section (`#biluibaba`, `#study`) gets one new
`<a class="text-link">View full pitch deck →</a>` pointing at its deck page,
placed near the existing "Explore X →" links. No top-nav change.

Each deck page's footer includes "← Back to companies" and a link to
`financials.html` for the full funding model, mirroring financials.html's
own footer CTA row.

## 3. Photos

### Sourcing

Direct-hotlinked from Unsplash CDN (`images.unsplash.com/photo-...` /
`plus.unsplash.com/premium_photo-...`), verified to return HTTP 200 before
use. `loading="lazy"` on every image. Not downloaded into the repo.

### company.html — Study Insights service grid

Converts from the plain icon-badge `.service` card to the same
`.service-photo` treatment Biluibaba already uses (16:10 `aspect-ratio`,
`object-fit:cover`, grayscale-idle → color-on-hover). One photo per service,
matched by theme:

- University selection, Application support, Career counselling →
  advisor/consultation photos
- Visa processing, Pre-departure, Air ticketing → airport/travel photos
- Scholarship aid → graduation photo

### index.html — portfolio cards

Both `.portfolio-card` entries (currently text-only, dark section) gain a
top photo via a new `.portfolio-card.photo` variant:

- Biluibaba card: reuses an existing local photo already in the repo
  (`public/Vet Service.jpg`) — brand consistency, no new stock photo mixed
  in for a company that already has real photography
- Study Insights card: a sourced graduate/campus-themed stock photo

## Out of scope

- No PDF export / print stylesheet for the decks (HTML pages only, per
  user's chosen option)
- No new top-level nav item
- No changes to the Excel export or financial model data
- No changes to team.html, contact.html, legal-privacy.html,
  secureyourstake.html
