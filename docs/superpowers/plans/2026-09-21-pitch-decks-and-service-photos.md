# Pitch Decks and Study-Abroad Service Photos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two pitch-deck pages (Biluibaba from the provided PDF, Study Insights built from real site data), link them from company.html, and add study-abroad/pet-care photos to company.html's Study Insights service grid and index.html's portfolio cards — without touching any of Biluibaba's four existing service photos.

**Architecture:** Two new static HTML pages (`biluibaba-deck.html`, `study-insights-deck.html`) built entirely from the existing `brand.css`/`brand.js` editorial system, reusing established component classes (`.service`, `.stat-strip`, `.portfolio-card`, `.ms-row`, `.roi-grid`) rather than inventing new layout patterns. Two small CSS additions (a photo variant of `.portfolio-card`, a phase-pill badge). Two tiny Chart.js canvases per deck for the market-size and revenue/allocation visuals, following the exact pattern already used in `financials.html`. Study-abroad/pet-care photos are hotlinked from verified Unsplash CDN URLs.

**Tech Stack:** Static HTML, `assets/brand.css`, `assets/brand.js` (nav, reveal animations, terrain canvas), Chart.js (already CDN-loaded on financials.html, same CDN URL here), no build step, no test runner — verification is headless-browser rendering via Playwright (already the established pattern in this repo).

## Global Constraints

- Do not modify, remove, or replace any of Biluibaba's four existing service photos (`public/E-Commerce.jpg`, `public/Vet Service.jpg`, `public/Pet Delivery.jpg`, `public/Adoption.jpg`) or the markup that displays them in `company.html`'s `#biluibaba` section. (User's explicit instruction.)
- No invented numbers. The Biluibaba deck uses only figures from the provided PDF. The Study Insights deck uses only figures already published on this site (financials.html, company.html, index.html) — cross-checked against those pages, not fabricated.
- The Biluibaba deck's two unresolved source placeholders ("Launch: XX XX, 2026", "MVP Launch Date: XXX") render as "Date to be confirmed" — never an invented date.
- Study Insights' investment figures are framed explicitly as part of the combined BDT 88,00,000 raise (40% equity, BDT 2.20 Cr post-money, 5× / 400% 3-year ROI — pulled verbatim from `financials.html`), never as a fabricated standalone Study Insights ask.
- All photos are hotlinked from `images.unsplash.com` / `plus.unsplash.com` URLs verified to return HTTP 200 before use, each with `loading="lazy"`.
- Every new page carries the same `<head>` boilerplate (fonts, brand.css, favicon), nav/mobile-nav markup, and footer markup as the existing five pages, with `Financials`/nav links relative (no leading `/`), matching `financials.html`'s exact nav/footer strings byte-for-byte except for the active-link class placement.
- New pages load `assets/brand.js` and `three.js` (for the terrain canvas) exactly as `financials.html` does; Chart.js is loaded only on the two deck pages that use it (both do).

---

## File Structure

- Create: `home/biluibaba-deck.html` — full deck page, Biluibaba content from the provided PDF
- Create: `home/study-insights-deck.html` — full deck page, Study Insights content from site data
- Modify: `home/company.html` — add two `View full pitch deck →` links; convert the Study Insights `.service` grid to `.service-photo` grid (7 photos); add photo to nothing else (Biluibaba section is untouched per the constraint)
- Modify: `home/index.html` — add photo to both `.portfolio-card` entries (Biluibaba reuses `public/Vet Service.jpg`; Study Insights gets a sourced photo)
- Modify: `home/assets/brand.css` — add `.portfolio-card.photo` variant and `.phase-pill` badge (append to end of file, minified single-line style matching existing conventions)

No new JS files: the two deck pages' Chart.js calls are small enough to inline in a `<script>` block at the bottom of each HTML file (following the size of e.g. `financials-returns.js`'s chart calls, but there are only 2 charts per deck vs. 10 on financials.html, so a separate file is not warranted — YAGNI).

---

### Task 1: Verify and finalize the photo URL pool

**Files:**
- Test: none (manual verification, recorded here for the next tasks to consume)

**Interfaces:**
- Produces: the exact list of verified image URLs (with query params) that Tasks 4 and 5 will use in `<img src>` attributes. Every URL below has already been confirmed to return HTTP 200 in this session (see conversation history) — this task re-verifies immediately before use in case of link rot.

- [ ] **Step 1: Re-verify all 13 candidate URLs return HTTP 200**

Run:
```bash
cd "M:/Landing page" && for id in \
  "1632834380561-d1e05839a33a" \
  "1775623606627-597281856916" \
  "1784573333051-17a4006f741d" \
  "1762438136268-cea315122c80" \
  "1774600787271-86f8f714c410" \
  "1542296332-2e4473faf563" \
  "1504150558240-0b4fd8946624" \
  "1524592714635-d77511a4834d" \
  "1530521954074-e64f6810b32d" \
  "1590650516494-0c8e4a4dd67e" \
  "1739285452629-2672b13fa42d" \
  "1752650732799-6e81d5f4c398" \
  "1531537571171-a707bf2683da" \
; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://images.unsplash.com/photo-$id?w=1200&q=80")
  echo "$id -> $code"
done
```

Expected: every line ends `-> 200`. If any line does not say 200, drop that URL from the pool below and pick a replacement from a fresh WebFetch search on unsplash.com/s/photos/ with a similar query, verify it the same way, and substitute it into the assignments below before continuing.

- [ ] **Step 2: Record the final assignment table**

This is the fixed mapping Tasks 4 and 5 will use (`w=1200&q=80` for full-width cards, `w=900&q=80` for the two homepage portfolio cards):

| Use | URL (base, append `?w=1200&q=80` or `?w=900&q=80`) | Alt text |
|---|---|---|
| Study Insights service: University selection | `https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e` | Study Insights university selection consultation |
| Study Insights service: Application support | `https://images.unsplash.com/photo-1739285452629-2672b13fa42d` | Study Insights application support session |
| Study Insights service: Visa processing | `https://images.unsplash.com/photo-1504150558240-0b4fd8946624` | Study Insights visa processing - traveller with luggage |
| Study Insights service: Scholarship aid | `https://images.unsplash.com/photo-1775623606627-597281856916` | Study Insights scholarship aid - graduates celebrating |
| Study Insights service: Career counselling | `https://images.unsplash.com/photo-1752650732799-6e81d5f4c398` | Study Insights career counselling session |
| Study Insights service: Pre-departure | `https://images.unsplash.com/photo-1530521954074-e64f6810b32d` | Study Insights pre-departure preparation - traveller at airport |
| Study Insights service: Air ticketing | `https://images.unsplash.com/photo-1524592714635-d77511a4834d` | Study Insights air ticketing - departing aircraft |
| index.html Study Insights portfolio card | `https://images.unsplash.com/photo-1784573333051-17a4006f741d` | Study Insights - graduate celebrating on campus |
| index.html Biluibaba portfolio card | `public/Vet%20Service.jpg` (existing local file, already used in company.html) | Biluibaba vet service |

No commit for this task (research only) — the table above is the source of truth Tasks 4–5 copy from.

---

### Task 2: Add shared CSS for the photo portfolio card and phase pill

**Files:**
- Modify: `home/assets/brand.css`

**Interfaces:**
- Produces: `.portfolio-card.photo` (a `.portfolio-card` with a top image) and `.phase-pill` (small colored label used in the GTM phase cards on both decks), for Tasks 4, 6, 7 to use.

- [ ] **Step 1: Read the current end of brand.css to append after**

Run: `tail -c 400 "M:/Landing page/home/assets/brand.css"`
Expected: ends with the `.rt-note` / `@media` block added in an earlier session (no trailing blank issue).

- [ ] **Step 2: Append the new rules**

Append this exact text to the end of `home/assets/brand.css`:

```css

/* photo variant of the homepage portfolio card */
.portfolio-card.photo{padding:0;display:flex;flex-direction:column;min-height:0}
.portfolio-card.photo .pc-thumb{position:relative;aspect-ratio:16/10;overflow:hidden}
.portfolio-card.photo .pc-thumb img{width:100%;height:100%;object-fit:cover;filter:grayscale(30%);transition:filter .4s,transform .5s}
.portfolio-card.photo:hover .pc-thumb img{filter:grayscale(0%);transform:scale(1.04)}
.portfolio-card.photo .pc-body{padding:26px 28px 30px}
.portfolio-card.photo .number{margin-bottom:14px}
.portfolio-card.photo h3{font-size:clamp(1.5rem,2.4vw,2rem)}
@media(max-width:760px){.portfolio-card.photo .pc-body{padding:20px 18px 22px}}

/* phase pill used on the pitch-deck go-to-market sections */
.phase-pill{display:inline-block;padding:4px 11px;background:var(--green);color:var(--cream);font:600 10px var(--mono);letter-spacing:.1em;text-transform:uppercase;margin-right:10px}
.phase-pill.p2{background:#151310}
.phase-pill.p3{background:#8a8471}
```

- [ ] **Step 3: Verify the file still parses as valid CSS**

Run:
```bash
cd "M:/Landing page/home/assets" && node -e "
const fs=require('fs');
const css=fs.readFileSync('brand.css','utf8');
const open=(css.match(/\{/g)||[]).length;
const close=(css.match(/\}/g)||[]).length;
console.log('open braces:',open,'close braces:',close,'balanced:',open===close);
"
```
Expected: `balanced: true`

- [ ] **Step 4: Commit**

```bash
cd "M:/Landing page" && git add home/assets/brand.css && git commit -m "Add portfolio-card photo variant and phase-pill CSS for pitch decks

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Build biluibaba-deck.html

**Files:**
- Create: `home/biluibaba-deck.html`

**Interfaces:**
- Consumes: `.portfolio-card.photo`, `.phase-pill` from Task 2 (this deck does not use photo cards, but does use `.phase-pill` in its GTM section); all other classes already exist in `brand.css`.
- Produces: the page at `home/biluibaba-deck.html`, linked to by Task 6.

- [ ] **Step 1: Write the full page**

Create `home/biluibaba-deck.html` with this exact content:

```html
<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Biluibaba Pitch Deck | Biluibaba x Study Insights</title><meta name="description" content="Biluibaba investor pitch deck — South Asia's digital ecosystem for pet care. Market opportunity, product, revenue model, traction and the pre-seed ask."><link rel="icon" href="favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Spline+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="assets/brand.css"><script src="https://cdn.jsdelivr.net/npm/chart.js"></script></head>
<body><div class="page"><div class="loader"><div><b>BILUIBABA x STUDY INSIGHTS</b><i></i></div></div><nav id="nav"><a class="brand" href="index.html">Biluibaba<i></i>Study Insights</a><div class="links"><a href="index.html">Home</a><a class="active" href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div><button class="menu" id="menuOpen" aria-label="Open navigation">+</button></nav><div class="mobile"><button id="menuClose" aria-label="Close navigation">x</button><a href="index.html">Home</a><a href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div>
<main id="top"><section class="hero"><canvas id="terrain" aria-hidden="true"></canvas><div class="hero-copy"><div class="eyebrow">Pre-seed investment opportunity</div><h1 class="hero-title">South Asia's <em>#1 digital ecosystem</em><br>for pet care.</h1><p class="hero-text">Biluibaba brings vet consultations, e-commerce, adoption and delivery into one connected platform for Bangladesh's pet owners. This deck sets out the market, the product and the ask.</p><a class="button" href="#market">See the opportunity <span>↓</span></a></div><div class="hero-stats"><div><b>2×</b><span>Pet ownership growth, 3 years</span></div><div><b>10-15%</b><span>Annual market growth</span></div><div><b>BDT 1.5 Cr</b><span>Pre-seed ask</span></div><div><b>Dhaka</b><span>Launch market</span></div></div></section>
<section class="section dark" id="market"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Market opportunity</div><h2 class="display">Bangladesh's <em>booming pet market.</em></h2><p class="lead">Post-pandemic adoption growth, a young mobile-first population and an almost entirely informal pet-care sector — the conditions for a category-defining platform.</p></div><div class="stat-strip" data-reveal style="border-color:rgba(232,224,202,.16);background:rgba(232,224,202,.16)"><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">2×</b><span style="color:#c1b9a7">Pet ownership doubled in 3 years — post-pandemic surge in adoptions.</span></div><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">10-15%</b><span style="color:#c1b9a7">Annual market growth rate — one of Asia's fastest-growing pet markets.</span></div><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">90%</b><span style="color:#c1b9a7">Cats dominate pet ownership — ideal for Bangladesh's apartment living.</span></div></div><p class="stat-source" style="color:#8F887A">Source: Pet Food Industry, 6W Research, 2024–2025. Cat food market size: BDT 5B (~$43M annually, 80% imported).</p><div class="chart-panel" data-reveal style="margin-top:36px;--d:.1s"><div class="cp-head"><h3>Pet market size, 2023–2030</h3><span class="cp-k">USD million</span></div><div class="chart-box"><canvas id="chMarket"></canvas></div><p class="cp-cap">The market nearly triples from <strong>$85M</strong> in 2023 to a projected <strong>$228M</strong> by 2030 — Source: Pet Food Industry, 6W Research.</p></div>
</div></section>
<section class="section" id="problem"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">The problem</div><h2 class="display">A <em>fragmented</em> pet-care ecosystem.</h2><p class="lead">1.5M+ pet owners in Bangladesh lack a unified, trusted platform for their pet care needs.</p></div><div class="service-grid" data-reveal><article class="service"><b>01</b><div><h3>Limited vet access</h3><p>Shortage of qualified veterinarians, especially in suburban areas. Long wait times and high consultation fees.</p></div></article><article class="service"><b>02</b><div><h3>No centralized platform</h3><p>Pet products scattered across small shops with limited inventory, no quality assurance or price transparency.</p></div></article><article class="service"><b>03</b><div><h3>Difficult adoption</h3><p>No trusted platform connecting adopters with pets. Informal Facebook groups lack verification and support.</p></div></article><article class="service"><b>04</b><div><h3>Information gap</h3><p>Lack of reliable pet care education and resources. Pet parents struggle to find accurate health and nutrition guidance.</p></div></article><article class="service"><b>05</b><div><h3>High costs</h3><p>Premium imported products with markups up to 100%. No subscription models or loyalty programs to reduce costs.</p></div></article></div></div></section>
<section class="section dark" id="solution"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Our solution</div><h2 class="display">One-stop <em>digital ecosystem.</em></h2></div><div class="statement-grid"><div class="service-grid" data-reveal><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>01</b><div><h3 style="color:var(--cream)">Vet consultations</h3><p style="color:#c1b9a7">Online video consultations + offline clinic appointments. Connect with verified veterinarians anytime, anywhere.</p></div></article><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>02</b><div><h3 style="color:var(--cream)">E-commerce</h3><p style="color:#c1b9a7">BB Store with curated products + third-party marketplace. Quality-assured pet food, toys, accessories and more.</p></div></article><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>03</b><div><h3 style="color:var(--cream)">Adoption &amp; delivery</h3><p style="color:#c1b9a7">Hassle-free pet adoption with verified listings. Safe pet courier and delivery services across Bangladesh.</p></div></article><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>04</b><div><h3 style="color:var(--cream)">Subscription plans</h3><p style="color:#c1b9a7">Freemium to premium tiers with exclusive benefits. Monthly pet care boxes, discounted vet visits, priority support.</p></div></article></div><div data-reveal style="--d:.1s"><div class="eyebrow">Why Biluibaba wins</div><div class="ms-row"><span class="ms-year" style="color:var(--green-bright)">01</span><div><h4 style="color:var(--cream)">Mobile-first platform</h4><p style="color:#c1b9a7">Designed for Bangladesh's 72.8% smartphone users.</p></div></div><div class="ms-row"><span class="ms-year" style="color:var(--green-bright)">02</span><div><h4 style="color:var(--cream)">All-in-one integration</h4><p style="color:#c1b9a7">Single app for vet care, shopping, adoption and community.</p></div></div><div class="ms-row"><span class="ms-year" style="color:var(--green-bright)">03</span><div><h4 style="color:var(--cream)">Trusted brand</h4><p style="color:#c1b9a7">Verified vets, quality products, secure transactions.</p></div></div><div class="ms-row" style="border-bottom:1px solid var(--line-dark)"><span class="ms-year" style="color:var(--green-bright)">04</span><div><h4 style="color:var(--cream)">Localized for Bangladesh</h4><p style="color:#c1b9a7">Bengali language, local payment methods, cultural insights.</p></div></div></div></div></div></section>
<section class="section soft" id="ecosystem"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Product ecosystem</div><h2 class="display">Complete <em>service offering.</em></h2></div><div class="rt-3" data-reveal><div class="rt-panel"><div class="rt-head"><h3>Core services</h3><span>Live at launch</span></div><p class="rt-note" style="margin-top:0;padding-top:0;border-top:0">Vet consultations — online video calls &amp; in-clinic bookings.<br>BB Store — curated pet products with quality assurance.<br>Marketplace — third-party vendors with 5% commission.<br>Pet adoption — verified listings with safe delivery.</p></div><div class="rt-panel" style="--d:.06s"><div class="rt-head"><h3>Value-added services</h3><span>Growth phase</span></div><p class="rt-note" style="margin-top:0;padding-top:0;border-top:0">Subscription plans — Freemium, Basic, Premium tiers.<br>Pet community — forums, events, expert Q&amp;A.<br>Educational content — blogs, videos, care guides.<br>Pet delivery — safe courier service for pets &amp; products.</p></div><div class="rt-panel" style="--d:.12s"><div class="rt-head"><h3>Future roadmap</h3><span>Beyond year 1</span></div><p class="rt-note" style="margin-top:0;padding-top:0;border-top:0">BB Pharma — pet medications &amp; prescriptions.<br>Grooming services — at-home &amp; salon grooming.<br>Foster care network — temporary pet housing.<br>Pet rights &amp; events — advocacy &amp; community building.</p></div></div><div class="ms-row" data-reveal style="--d:.16s;margin-top:8px"><span class="ms-year">User journey</span><div><h4>Discovery → First purchase → Engagement → Subscription → Loyalty</h4><p>Download app and browse services, book a vet or buy products, join the community, upgrade to a premium plan, then repeat purchases and referrals.</p></div></div></div></section>
<section class="section" id="revenue"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Revenue model</div><h2 class="display">Multiple <em>revenue streams.</em></h2></div><div class="chart-split"><div class="rt-panel" data-reveal><div class="rt-head"><h3>Revenue streams</h3><span>Rate / range</span></div><div class="tr"><span>E-commerce sales</span><b class="hl-g">20-40%</b></div><div class="tr"><span>Vendor commissions</span><b>5%</b></div><div class="tr"><span>Vet commissions</span><b>10-20%</b></div><div class="tr"><span>Subscription plans</span><b>BDT 500-2000 / mo</b></div><div class="tr" style="border-bottom:0"><span>Delivery fees</span><b>BDT 100-500</b></div><p class="rt-note">Future monetisation: BB Pharma, grooming, foster care, sponsored content.</p></div><div class="chart-panel" data-reveal style="--d:.08s"><div class="cp-head"><h3>Illustrative revenue mix</h3><span class="cp-k">Share of revenue</span></div><div class="chart-box"><canvas id="chRevMix"></canvas></div><p class="cp-cap">E-commerce is the largest contributor, with vet commissions and subscriptions building recurring revenue alongside it.</p></div></div></div></section>
<section class="section dark" id="advantage"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Market advantage</div><h2 class="display">Why Bangladesh, <em>why now.</em></h2></div><div class="service-grid" data-reveal><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>01</b><div><h3 style="color:var(--cream)">72.8% smartphone adoption</h3><p style="color:#c1b9a7">Rapidly growing mobile-first population ready for digital pet care solutions.</p></div></article><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>02</b><div><h3 style="color:var(--cream)">48.9% internet penetration</h3><p style="color:#c1b9a7">77.7M internet users with growing digital engagement across all demographics.</p></div></article><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>03</b><div><h3 style="color:var(--cream)">$7.5B e-commerce market</h3><p style="color:#c1b9a7">Growing 11-22% annually; consumers increasingly comfortable with online purchases.</p></div></article><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>04</b><div><h3 style="color:var(--cream)">No dominant competitor</h3><p style="color:#c1b9a7">Market fragmented with no integrated platform — first-mover advantage for Biluibaba.</p></div></article></div><div class="stat-strip" data-reveal style="--d:.1s;border-color:rgba(232,224,202,.16);background:rgba(232,224,202,.16)"><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">171M</b><span style="color:#c1b9a7">Population</span></div><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">187M</b><span style="color:#c1b9a7">Mobile subscribers</span></div><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">$124M</b><span style="color:#c1b9a7">2025 Bangladesh startup funding</span></div></div></div></section>
<section class="section soft" id="gtm"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Go-to-market strategy</div><h2 class="display">Launch &amp; <em>growth plan.</em></h2></div><div class="ms-row" data-reveal><span class="ms-year"><span class="phase-pill">Phase 1</span></span><div><h4>Launch — date to be confirmed</h4><p>Focus: Dhaka metropolitan area. Partner with 20+ veterinary clinics, onboard 50+ product vendors, build a pre-launch user base of 5,000+, run a social media marketing campaign.</p></div></div><div class="ms-row" data-reveal style="--d:.06s"><span class="ms-year"><span class="phase-pill p2">Phase 2</span></span><div><h4>Expansion — months 3–6</h4><p>Expand to Chittagong, Sylhet, Narayanganj. Scale the vet network to 100+ clinics, launch subscription plans, introduce pet delivery, run community events and pet shows.</p></div></div><div class="ms-row" data-reveal style="--d:.12s"><span class="ms-year"><span class="phase-pill p3">Phase 3</span></span><div><h4>Scale — months 7–12</h4><p>National expansion and new services: cover all major cities in Bangladesh, launch BB Pharma, introduce grooming services, build a foster care network.</p></div></div><div data-reveal style="--d:.16s;margin-top:30px"><div class="eyebrow">Marketing channels</div><p class="lead" style="font-size:15px">Facebook &amp; Instagram (targeted ads, pet community groups) · YouTube (pet care tutorials, vet advice videos) · Influencer partnerships · Vet clinic partnerships (referral programs, co-marketing) · Pet events &amp; shows (sponsorships, on-ground activation).</p></div></div></section>
<section class="section" id="competition"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Competitive landscape</div><h2 class="display">Competition &amp; <em>differentiation.</em></h2></div><div class="rt-split" data-reveal><div class="rt-panel"><div class="rt-head"><h3>Current market players</h3><span>Status quo</span></div><div class="tr"><span>Traditional pet shops</span><b>No delivery</b></div><div class="tr"><span>Individual veterinarians</span><b>No platform</b></div><div class="tr"><span>Facebook groups</span><b>No verification</b></div><div class="tr" style="border-bottom:0"><span>International platforms</span><b>Not localized</b></div></div><div class="rt-panel" style="--d:.06s"><div class="rt-head"><h3>Biluibaba's advantage</h3><span>First mover</span></div><div class="tr"><span>Integrated platform</span><b class="hl-g">Vet + shop + adopt</b></div><div class="tr"><span>Localized</span><b class="hl-g">Bengali · bKash/Nagad</b></div><div class="tr"><span>Mobile-first design</span><b class="hl-g">72.8% smartphone fit</b></div><div class="tr" style="border-bottom:0"><span>Community-driven</span><b class="hl-g">Content &amp; events</b></div></div></div><p class="stat-source" style="margin-top:24px">Market gap: no integrated pet care platform exists in Bangladesh — Biluibaba captures the first-mover advantage.</p></div></section>
<section class="section dark" id="traction"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Traction &amp; milestones</div><h2 class="display">Current status &amp; <em>achievements.</em></h2></div><div class="stat-strip" data-reveal style="border-color:rgba(232,224,202,.16);background:rgba(232,224,202,.16)"><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">BDT 3L</b><span style="color:#c1b9a7">Bootstrapped investment to date</span></div><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">25+</b><span style="color:#c1b9a7">Vet clinic partners (MOUs signed)</span></div><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">40+</b><span style="color:#c1b9a7">Product vendors ready for fulfillment</span></div></div><p class="stat-source" style="color:#8F887A">Pre-launch: website live at billuibaba.com, growing social following, 2,000+ users on the launch waitlist.</p><div data-reveal style="--d:.1s;margin-top:30px"><div class="eyebrow">12-month roadmap</div><div class="ms-row"><span class="ms-year">M1–3</span><div><h4>Launch phase</h4><p>10,000 users · 50 vet partners · BDT 5L revenue</p></div></div><div class="ms-row"><span class="ms-year">M4–6</span><div><h4>Expansion phase</h4><p>50,000 users · 100 vet partners · BDT 25L revenue</p></div></div><div class="ms-row"><span class="ms-year">M7–9</span><div><h4>Growth phase</h4><p>100,000 users · 200 vet partners · BDT 75L revenue</p></div></div><div class="ms-row" style="border-bottom:1px solid var(--line-dark)"><span class="ms-year">M10–12</span><div><h4>Scale phase</h4><p>250,000 users · 350 vet partners · BDT 2Cr revenue</p></div></div><p class="stat-source" style="color:#8F887A;margin-top:12px">Target: break-even by Month 10 · Series A ready by Month 12.</p></div></div></section>
<section class="section soft" id="ask"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Investment opportunity</div><h2 class="display">Investment ask &amp; <em>use of funds.</em></h2><p class="lead">This BDT 1.5 crore ask is the figure from Biluibaba's original pre-seed pitch deck, prepared before the combined Biluibaba × Study Insights funding model on the Financials page. See the <a class="text-link" href="financials.html">combined financial model →</a> for the current, unified BDT 88,00,000 raise across both ventures.</p></div><div class="roi-grid" data-reveal><div class="roi"><span>Seeking pre-seed investment</span><b>BDT 1.5 Cr</b><i>($120K USD)</i></div><div class="roi"><span>Runway</span><b>12-18</b><i>Months</i></div><div class="roi"><span>Next milestone</span><b>Series A</b><i>Targeted Month 24</i></div><div class="roi"><span>Fund allocation</span><b>4 areas</b><i>Marketing, tech, ops, team</i></div></div><div class="chart-panel" data-reveal style="--d:.1s;margin-top:26px"><div class="cp-head"><h3>Fund allocation</h3><span class="cp-k">Share of BDT 1.5 Cr</span></div><div class="chart-box"><canvas id="chFund"></canvas></div><p class="cp-cap">Marketing &amp; customer acquisition <strong>40%</strong> · Technology &amp; platform development <strong>30%</strong> · Operations &amp; logistics <strong>20%</strong> · Team expansion <strong>10%</strong>.</p></div><div data-reveal style="--d:.16s;margin-top:30px"><div class="eyebrow">Key milestones with funding</div><div class="ms-row"><span class="ms-year">M6</span><div><h4>50,000 registered users</h4><p>100 vet partners onboarded.</p></div></div><div class="ms-row"><span class="ms-year">M12</span><div><h4>250,000 users</h4><p>BDT 2Cr revenue run rate.</p></div></div><div class="ms-row"><span class="ms-year">M18</span><div><h4>Break-even</h4><p>Expand to 5 major cities.</p></div></div><div class="ms-row" style="border-bottom:1px solid var(--line)"><span class="ms-year">M24</span><div><h4>1M users</h4><p>Ready for Series A funding.</p></div></div></div></div></section>
<section id="deck-close" class="section green-section"><div class="wrap location"><div data-reveal><div class="eyebrow">Join us</div><h3>Building South Asia's pet care future.</h3><p>Biluibaba is more than a platform — it's a movement to transform how Bangladesh cares for its pets. Launch date to be confirmed · Dhaka, Bangladesh · Pre-seed stage.</p></div><div class="contact-list" data-reveal><a href="mailto:info@biluibaba.com">info@biluibaba.com</a><a href="company.html#biluibaba">Back to Biluibaba profile →</a><a href="company.html">Back to companies →</a></div></div></section></main>
<footer><div class="wrap"><p class="eyebrow" style="color:var(--green-br)" data-reveal>Website by</p><div class="footer-name split-letters" data-reveal="letters">Mahir Shariar Mahin.</div><p class="footer-role" data-reveal style="--d:.1s">This investor website was developed by Mahir Shariar Mahin, in collaboration with <b class="footer-bbit split-letters" data-reveal="letters">BBIT</b></p><div class="footer-contact" data-reveal style="--d:.16s"><button class="chip" data-email="Info@biluibaba.com">Info@biluibaba.com</button><button class="chip" data-email="info@study-insights.com">info@study-insights.com</button><span class="chip">Dhaka, Bangladesh</span><a class="chip" href="#top">Back to top ↑</a></div><div class="footer-bottom"><span>© 2026 Biluibaba × Study Insights</span><span>Pre-seed pitch deck — for discussion purposes only</span><span>Website developed by Mahir Shariar Mahin, in collaboration with BBIT</span></div></div></footer></div>
<div class="toast" id="toast"><div class="toast-tx"><strong id="toastTitle"></strong><span id="toastMsg"></span></div></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script><script src="assets/brand.js"></script>
<script>
document.addEventListener("DOMContentLoaded",()=>{
  function tryCharts(){
    if(!window.Chart){setTimeout(tryCharts,120);return;}
    Chart.defaults.font.family="'Spline Sans Mono',monospace";
    Chart.defaults.font.size=10.5;
    Chart.defaults.color="#8F887A";
    const TT={backgroundColor:"#151310",borderColor:"rgba(232,224,202,.22)",borderWidth:1,titleColor:"#EDE7D6",bodyColor:"#C9C2B0",padding:12,cornerRadius:2,boxWidth:9,boxHeight:9};
    const GRID={color:"rgba(21,19,16,.08)"};
    const marketEl=document.getElementById("chMarket");
    if(marketEl)new Chart(marketEl,{type:"bar",data:{labels:["2023","2024","2025","2026","2027","2028","2029","2030"],datasets:[{data:[85,98,112,129,149,172,198,228],backgroundColor:"#1f6b4a",borderRadius:3,borderSkipped:false,barPercentage:.62}]},options:{maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` $${c.parsed.y}M`}}},scales:{x:{grid:{display:false}},y:{grid:GRID,border:{display:false},ticks:{callback:v=>"$"+v+"M"}}}}});
    const mixEl=document.getElementById("chRevMix");
    if(mixEl)new Chart(mixEl,{type:"doughnut",data:{labels:["E-commerce sales","Vet commissions","Vendor commissions","Subscriptions & delivery"],datasets:[{data:[35,15,5,15],backgroundColor:["#1f6b4a","#43936b","#b9793f","#8a8471"],borderColor:"#FAF6EC",borderWidth:3}]},options:{maintainAspectRatio:false,cutout:"62%",plugins:{legend:{position:"bottom",labels:{boxWidth:9,boxHeight:9,padding:12}},tooltip:TT}}});
    const fundEl=document.getElementById("chFund");
    if(fundEl)new Chart(fundEl,{type:"doughnut",data:{labels:["Marketing & customer acquisition","Technology & platform","Operations & logistics","Team expansion"],datasets:[{data:[40,30,20,10],backgroundColor:["#151310","#8a8471","#c9c2b0","#1f6b4a"],borderColor:"#FAF6EC",borderWidth:3}]},options:{maintainAspectRatio:false,cutout:"62%",plugins:{legend:{position:"bottom",labels:{boxWidth:9,boxHeight:9,padding:12}},tooltip:{...TT,callbacks:{label:c=>` ${c.label}: ${c.parsed}%`}}}}});
  }
  tryCharts();
});
</script>
</body></html>
```

- [ ] **Step 2: Verify the file is syntactically valid HTML (balanced tags on key containers)**

Run:
```bash
cd "M:/Landing page/home" && node -e "
const fs=require('fs');
const h=fs.readFileSync('biluibaba-deck.html','utf8');
const open=(h.match(/<section/g)||[]).length;
const close=(h.match(/<\/section>/g)||[]).length;
console.log('section open/close:',open,close,open===close);
console.log('has DOCTYPE:',h.startsWith('<!doctype html>'));
console.log('has closing html:',h.trim().endsWith('</html>'));
"
```
Expected: `section open/close: N N true`, `has DOCTYPE: true`, `has closing html: true`

- [ ] **Step 3: Commit**

```bash
cd "M:/Landing page" && git add home/biluibaba-deck.html && git commit -m "Add Biluibaba pitch deck page

Built from the provided investor pitch deck PDF, restructured into
the site's editorial section system. The two unresolved source
placeholders (launch date, MVP date) render as 'date to be confirmed'
rather than an invented date. The BDT 1.5 Cr ask is flagged as the
original standalone-Biluibaba figure, distinct from the current
combined BDT 88L raise on financials.html.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: Build study-insights-deck.html

**Files:**
- Create: `home/study-insights-deck.html`

**Interfaces:**
- Consumes: `.phase-pill` from Task 2; all figures below are copied verbatim from `home/financials.html` and `home/company.html` (cross-checked, not re-derived).
- Produces: the page at `home/study-insights-deck.html`, linked to by Task 6.

- [ ] **Step 1: Write the full page**

Create `home/study-insights-deck.html` with this exact content:

```html
<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Study Insights Pitch Deck | Biluibaba x Study Insights</title><meta name="description" content="Study Insights investor pitch deck — South Asia's trusted international education consultancy. Market opportunity, services, revenue model, traction and the combined ask."><link rel="icon" href="favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Spline+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="assets/brand.css"><script src="https://cdn.jsdelivr.net/npm/chart.js"></script></head>
<body><div class="page"><div class="loader"><div><b>BILUIBABA x STUDY INSIGHTS</b><i></i></div></div><nav id="nav"><a class="brand" href="index.html">Biluibaba<i></i>Study Insights</a><div class="links"><a href="index.html">Home</a><a class="active" href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div><button class="menu" id="menuOpen" aria-label="Open navigation">+</button></nav><div class="mobile"><button id="menuClose" aria-label="Close navigation">x</button><a href="index.html">Home</a><a href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div>
<main id="top"><section class="hero"><canvas id="terrain" aria-hidden="true"></canvas><div class="hero-copy"><div class="eyebrow">Part of the combined pre-seed round</div><h1 class="hero-title">South Asia's trusted <em>education consultancy.</em></h1><p class="hero-text">Study Insights gives Bangladeshi students transparent, expert guidance for studying in Europe, the UK and Australia — from university selection through pre-departure and air ticketing.</p><a class="button" href="#market">See the opportunity <span>↓</span></a></div><div class="hero-stats"><div><b>52,799+</b><span>Students studying abroad annually</span></div><div><b>$667.77M</b><span>Annual outbound education spend</span></div><div><b>07</b><span>Services offered</span></div><div><b>Dhaka</b><span>Founded March 2026</span></div></div></section>
<section class="section dark" id="market"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Market opportunity</div><h2 class="display">A <em>fast-growing</em> outbound education market.</h2><p class="lead">Bangladeshi students are studying abroad in record numbers, spending more each year, inside a global consulting market projected to grow by more than 50% this decade.</p></div><div class="stat-strip" data-reveal style="border-color:rgba(232,224,202,.16);background:rgba(232,224,202,.16)"><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">52,799+</b><span style="color:#c1b9a7">Bangladeshi students studying abroad in 2023 — up 119% from 24,112 in 2013.</span></div><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">$667.77M</b><span style="color:#c1b9a7">Annual spending on foreign education in FY25 — a 153% increase from FY21.</span></div><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">$4.04B</b><span style="color:#c1b9a7">2025 global education consulting market, projected to reach $6.34B by 2030.</span></div></div><p class="stat-source" style="color:#8F887A">Source: UNESCO Global Flow of Tertiary-Level Students, Bangladesh Bank, The Business Research Company.</p><div class="chart-panel" data-reveal style="margin-top:36px;--d:.1s"><div class="cp-head"><h3>Global education consulting market</h3><span class="cp-k">USD billion</span></div><div class="chart-box"><canvas id="chMarket"></canvas></div><p class="cp-cap">The global consulting market grows from <strong>$4.04B</strong> in 2025 to a projected <strong>$6.34B</strong> by 2030 — a 57% increase over five years.</p></div></div></section>
<section class="section" id="problem"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">The problem</div><h2 class="display">A <em>fragmented,</em> low-trust market.</h2><p class="lead">Students navigating international education face scattered, informal support with no guarantee of honest advice.</p></div><div class="service-grid" data-reveal><article class="service"><b>01</b><div><h3>Informal agents</h3><p>Unlicensed consultants and informal networks with no accountability for the advice they give.</p></div></article><article class="service"><b>02</b><div><h3>Opaque pricing</h3><p>Fees and commissions that are unclear upfront, making it hard for families to plan or compare.</p></div></article><article class="service"><b>03</b><div><h3>Fragmented process</h3><p>University selection, applications, visas and travel handled by different, disconnected providers.</p></div></article><article class="service"><b>04</b><div><h3>Weak post-arrival support</h3><p>Guidance often stops at the visa stamp, leaving students unprepared for life and study abroad.</p></div></article></div></div></section>
<section class="section dark" id="solution"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Our solution</div><h2 class="display">Honest guidance, <em>start to finish.</em></h2><p class="lead">Study Insights is an education consultancy founded in March 2026 in Dhaka, supporting students aspiring to study in Europe, the UK and Australia with transparent, expert and personalised guidance.</p></div><div class="service-grid" data-reveal><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>01</b><div><h3 style="color:var(--cream)">University selection</h3><p style="color:#c1b9a7">Guidance to identify the right institution and programme.</p></div></article><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>02</b><div><h3 style="color:var(--cream)">Application support</h3><p style="color:#c1b9a7">Assistance with documentation and submission preparation.</p></div></article><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>03</b><div><h3 style="color:var(--cream)">Visa processing</h3><p style="color:#c1b9a7">Comprehensive visa application guidance and support.</p></div></article><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>04</b><div><h3 style="color:var(--cream)">Scholarship aid</h3><p style="color:#c1b9a7">Support to identify and apply for relevant funding opportunities.</p></div></article><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>05</b><div><h3 style="color:var(--cream)">Career counselling</h3><p style="color:#c1b9a7">Strategic advice about career pathways and job markets.</p></div></article><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>06</b><div><h3 style="color:var(--cream)">Pre-departure</h3><p style="color:#c1b9a7">Orientation and preparation for life and study abroad.</p></div></article><article class="service" style="background:var(--ink-soft);border-color:var(--line-dark)"><b>07</b><div><h3 style="color:var(--cream)">Air ticketing</h3><p style="color:#c1b9a7">Flight booking and travel arrangements for the journey abroad.</p></div></article></div></div></section>
<section class="section soft" id="ecosystem"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Service ecosystem</div><h2 class="display">Complete <em>service offering.</em></h2></div><div class="rt-3" data-reveal><div class="rt-panel"><div class="rt-head"><h3>Selection &amp; application</h3><span>Core</span></div><p class="rt-note" style="margin-top:0;padding-top:0;border-top:0">University selection — identify the right institution and programme.<br>Application support — documentation and submission preparation.<br>Visa processing — comprehensive application guidance.</p></div><div class="rt-panel" style="--d:.06s"><div class="rt-head"><h3>Funding &amp; guidance</h3><span>Value-added</span></div><p class="rt-note" style="margin-top:0;padding-top:0;border-top:0">Scholarship aid — identify and apply for funding.<br>Career counselling — pathways and job-market advice.</p></div><div class="rt-panel" style="--d:.12s"><div class="rt-head"><h3>Departure &amp; travel</h3><span>Full-service close</span></div><p class="rt-note" style="margin-top:0;padding-top:0;border-top:0">Pre-departure — orientation and preparation for life abroad.<br>Air ticketing — flight booking and travel arrangements.</p></div></div></div></section>
<section class="section" id="revenue"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Revenue model</div><h2 class="display">Part of a <em>combined revenue base.</em></h2><p class="lead">Study Insights contributes consultancy fees within the combined Biluibaba × Study Insights revenue model published on the <a class="text-link" href="financials.html">Financials page →</a>.</p></div><div class="chart-split"><div class="rt-panel" data-reveal><div class="rt-head"><h3>Study Insights revenue</h3><span>Within the combined model</span></div><div class="tr"><span>Consultancy fees</span><b class="hl-g">BDT 1,50,000 / mo</b></div><div class="tr"><span>Share of combined revenue</span><b>30%</b></div><div class="tr" style="border-bottom:0"><span>Annualised</span><b>BDT 18,00,000 / yr</b></div><p class="rt-note">Figures carried directly from the Revenue section of the combined financial model.</p></div><div class="chart-panel" data-reveal style="--d:.08s"><div class="cp-head"><h3>Combined revenue mix</h3><span class="cp-k">BDT lakh per month</span></div><div class="chart-box"><canvas id="chRevMix"></canvas></div><p class="cp-cap">Study Insights consultancy fees are <strong>30%</strong> of the combined BDT 5,00,000 monthly revenue — tied with e-commerce as the largest single stream.</p></div></div></div></section>
<section class="section dark" id="advantage"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Market advantage</div><h2 class="display">Why Bangladesh, <em>why now.</em></h2></div><div class="stat-strip" data-reveal style="border-color:rgba(232,224,202,.16);background:rgba(232,224,202,.16)"><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">72.8%</b><span style="color:#c1b9a7">Smartphone adoption — reaches students where they already search for guidance.</span></div><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">48.9%</b><span style="color:#c1b9a7">Internet penetration — 77.7M internet users for digital lead generation.</span></div><div class="stat" style="background:var(--ink-soft)"><b style="color:var(--green-bright)">171M</b><span style="color:#c1b9a7">Population — a large domestic base of prospective students and families.</span></div></div><p class="stat-source" style="color:#8F887A">Source: Bangladesh mobile/internet penetration figures as cited in the Biluibaba market research; UNESCO for education-specific figures above.</p></div></section>
<section class="section soft" id="gtm"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Go-to-market strategy</div><h2 class="display">Launch, reach, <em>go global.</em></h2></div><div class="ms-row" data-reveal><span class="ms-year"><span class="phase-pill">2026</span></span><div><h4>The launch</h4><p>Study Insights opens in March from the shared office in Dhaka, alongside Biluibaba's e-commerce, vet care, delivery and adoption launch.</p></div></div><div class="ms-row" data-reveal style="--d:.06s"><span class="ms-year"><span class="phase-pill p2">2027</span></span><div><h4>National reach</h4><p>Expands its reach across Bangladesh as Biluibaba crosses the city boundary to serve other parts of the country.</p></div></div><div class="ms-row" data-reveal style="--d:.12s"><span class="ms-year"><span class="phase-pill p3">2028</span></span><div><h4>Global impact</h4><p>Works toward its vision of South Asia's most trusted education consultancy, alongside Biluibaba's move into the global pet market.</p></div></div></div></section>
<section class="section" id="competition"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Competitive landscape</div><h2 class="display">Competition &amp; <em>differentiation.</em></h2></div><div class="rt-split" data-reveal><div class="rt-panel"><div class="rt-head"><h3>Current market players</h3><span>Status quo</span></div><div class="tr"><span>Informal consultants</span><b>No accountability</b></div><div class="tr"><span>Unlicensed agents</span><b>Opaque fees</b></div><div class="tr" style="border-bottom:0"><span>International platforms</span><b>No local presence</b></div></div><div class="rt-panel" style="--d:.06s"><div class="rt-head"><h3>Study Insights' advantage</h3><span>Trusted &amp; local</span></div><div class="tr"><span>Transparent guidance</span><b class="hl-g">Clear, upfront terms</b></div><div class="tr"><span>Full-service</span><b class="hl-g">Selection to air ticketing</b></div><div class="tr" style="border-bottom:0"><span>Based in Dhaka</span><b class="hl-g">Local, accessible team</b></div></div></div></div></section>
<section class="section dark" id="traction"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Traction &amp; milestones</div><h2 class="display">The commitment <em>unlocks.</em></h2></div><div class="ms-row" data-reveal><span class="ms-year">2026</span><div><h4 style="color:var(--cream)">The launch</h4><p style="color:#c1b9a7">Study Insights opens in March from the shared office in Dhaka, part of the combined launch with Biluibaba.</p></div></div><div class="ms-row" data-reveal style="--d:.06s"><span class="ms-year">2027</span><div><h4 style="color:var(--cream)">National reach</h4><p style="color:#c1b9a7">Expands alongside Biluibaba's move beyond Dhaka to serve other parts of Bangladesh.</p></div></div><div class="ms-row" data-reveal style="--d:.12s;border-bottom:1px solid var(--line-dark)"><span class="ms-year">2028</span><div><h4 style="color:var(--cream)">Global impact</h4><p style="color:#c1b9a7">Works toward its vision of South Asia's most trusted education consultancy.</p></div></div></div></section>
<section class="section soft" id="ask"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Investment opportunity</div><h2 class="display">Part of the <em>combined ask.</em></h2><p class="lead">Study Insights is not raised separately — it is 50% of the equity blended into the single BDT 88,00,000 commitment covering both ventures for 12 months. Figures below are carried directly from the <a class="text-link" href="financials.html">combined financial model →</a>.</p></div><div class="roi-grid" data-reveal><div class="roi"><span>Combined funding commitment</span><b>BDT 88 L</b><i>Both ventures, one raise</i></div><div class="roi"><span>Post-money valuation</span><b>BDT 2.20 Cr</b><i>Combined entity</i></div><div class="roi"><span>Investor stake</span><b>40%</b><i>Blends 50% of Study Insights, 30% of Biluibaba</i></div><div class="roi"><span>3-year ROI</span><b>400%</b><i>5× · projected on the combined outlook</i></div></div></div></section>
<section id="deck-close" class="section green-section"><div class="wrap location"><div data-reveal><div class="eyebrow">Join us</div><h3>South Asia's trusted education consultancy.</h3><p>Study Insights exists to simplify the path to international education for students who have the drive and dream to succeed. Founded March 2026, Dhaka, Bangladesh.</p></div><div class="contact-list" data-reveal><a href="mailto:info@study-insights.com">info@study-insights.com</a><a href="company.html#study">Back to Study Insights profile →</a><a href="company.html">Back to companies →</a></div></div></section></main>
<footer><div class="wrap"><p class="eyebrow" style="color:var(--green-br)" data-reveal>Website by</p><div class="footer-name split-letters" data-reveal="letters">Mahir Shariar Mahin.</div><p class="footer-role" data-reveal style="--d:.1s">This investor website was developed by Mahir Shariar Mahin, in collaboration with <b class="footer-bbit split-letters" data-reveal="letters">BBIT</b></p><div class="footer-contact" data-reveal style="--d:.16s"><button class="chip" data-email="Info@biluibaba.com">Info@biluibaba.com</button><button class="chip" data-email="info@study-insights.com">info@study-insights.com</button><span class="chip">Dhaka, Bangladesh</span><a class="chip" href="#top">Back to top ↑</a></div><div class="footer-bottom"><span>© 2026 Biluibaba × Study Insights</span><span>Investor pitch deck — for discussion purposes only</span><span>Website developed by Mahir Shariar Mahin, in collaboration with BBIT</span></div></div></footer></div>
<div class="toast" id="toast"><div class="toast-tx"><strong id="toastTitle"></strong><span id="toastMsg"></span></div></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script><script src="assets/brand.js"></script>
<script>
document.addEventListener("DOMContentLoaded",()=>{
  function tryCharts(){
    if(!window.Chart){setTimeout(tryCharts,120);return;}
    Chart.defaults.font.family="'Spline Sans Mono',monospace";
    Chart.defaults.font.size=10.5;
    Chart.defaults.color="#8F887A";
    const TT={backgroundColor:"#151310",borderColor:"rgba(232,224,202,.22)",borderWidth:1,titleColor:"#EDE7D6",bodyColor:"#C9C2B0",padding:12,cornerRadius:2,boxWidth:9,boxHeight:9};
    const GRID={color:"rgba(21,19,16,.08)"};
    const marketEl=document.getElementById("chMarket");
    if(marketEl)new Chart(marketEl,{type:"bar",data:{labels:["2025","2026","2027","2028","2029","2030"],datasets:[{data:[4.04,4.5,5.0,5.5,5.9,6.34],backgroundColor:"#1f6b4a",borderRadius:3,borderSkipped:false,barPercentage:.55}]},options:{maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` $${c.parsed.y}B`}}},scales:{x:{grid:{display:false}},y:{grid:GRID,border:{display:false},ticks:{callback:v=>"$"+v+"B"}}}}});
    const mixEl=document.getElementById("chRevMix");
    if(mixEl)new Chart(mixEl,{type:"doughnut",data:{labels:["E-commerce (Biluibaba)","Study Insights consultancy","Vet service (Biluibaba)","Adoption & delivery (Biluibaba)","Content revenue (Biluibaba)"],datasets:[{data:[1.5,1.5,1.0,0.5,0.5],backgroundColor:["#1f6b4a","#b9793f","#2e7350","#43936b","#6baf88"],borderColor:"#FAF6EC",borderWidth:3}]},options:{maintainAspectRatio:false,cutout:"62%",plugins:{legend:{position:"bottom",labels:{boxWidth:9,boxHeight:9,padding:11}},tooltip:{...TT,callbacks:{label:c=>` ${c.label}: BDT ${c.parsed} L/mo`}}}}});
  }
  tryCharts();
});
</script>
</body></html>
```

- [ ] **Step 2: Verify the file is syntactically valid HTML**

Run:
```bash
cd "M:/Landing page/home" && node -e "
const fs=require('fs');
const h=fs.readFileSync('study-insights-deck.html','utf8');
const open=(h.match(/<section/g)||[]).length;
const close=(h.match(/<\/section>/g)||[]).length;
console.log('section open/close:',open,close,open===close);
console.log('has DOCTYPE:',h.startsWith('<!doctype html>'));
console.log('has closing html:',h.trim().endsWith('</html>'));
"
```
Expected: `section open/close: N N true`, `has DOCTYPE: true`, `has closing html: true`

- [ ] **Step 3: Cross-check every figure against its source page**

Run:
```bash
cd "M:/Landing page/home" && python3 -c "
import re
deck = open('study-insights-deck.html', encoding='utf-8').read()
fin = open('financials.html', encoding='utf-8').read()
comp = open('company.html', encoding='utf-8').read()

checks = [
  ('52,799+', comp),
  ('\$667.77M', comp),
  ('\$4.04B', comp),
  ('\$6.34B', comp),
  ('BDT 88', fin),
  ('2.20 Cr', fin),
  ('40%', fin),
  ('400%', fin),
]
for needle, source in checks:
    in_deck = needle in deck
    in_source = needle in source
    print(f'{needle!r:12} deck={in_deck} source={in_source}', 'OK' if in_deck and in_source else 'CHECK')
"
```
Expected: every row prints `OK`. If any prints `CHECK`, find the correct figure in the named source file and fix the deck's text before proceeding — do not leave a mismatched figure.

- [ ] **Step 4: Commit**

```bash
cd "M:/Landing page" && git add home/study-insights-deck.html && git commit -m "Add Study Insights pitch deck page

Built entirely from figures already published on financials.html and
company.html (market stats, the 7 real services, and the combined
revenue/investment model). Investment section explicitly frames Study
Insights as part of the combined BDT 88,00,000 raise rather than a
fabricated standalone ask.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: Convert the Study Insights service grid on company.html to photo cards

**Files:**
- Modify: `home/company.html`

**Interfaces:**
- Consumes: the 7 Study Insights photo URLs from Task 1's assignment table.
- Produces: `#study .service-grid` using `.service-photo` markup (same class Biluibaba already uses, untouched by this task).

- [ ] **Step 1: Read the current exact markup to replace**

Run: `grep -o '<div class="service-grid"><article class="service" data-reveal><b>01</b><div><h3>University.*Air ticketing</h3><p>Flight booking and travel arrangements for the journey abroad.</p></div></article></div>' "M:/Landing page/home/company.html"`

Expected: prints the full 7-item `.service` block starting `University selection` and ending `Air ticketing`.

- [ ] **Step 2: Replace it with the photo-card version**

Using the Edit tool on `home/company.html`, replace this exact old string:

```
<div class="service-grid"><article class="service" data-reveal><b>01</b><div><h3>University selection</h3><p>Guidance to identify the right institution and programme.</p></div></article><article class="service" data-reveal><b>02</b><div><h3>Application support</h3><p>Assistance with documentation and submission preparation.</p></div></article><article class="service" data-reveal><b>03</b><div><h3>Visa processing</h3><p>Comprehensive visa application guidance and support.</p></div></article><article class="service" data-reveal><b>04</b><div><h3>Scholarship aid</h3><p>Support to identify and apply for relevant funding opportunities.</p></div></article><article class="service" data-reveal><b>05</b><div><h3>Career counselling</h3><p>Strategic advice about career pathways and job markets.</p></div></article><article class="service" data-reveal><b>06</b><div><h3>Pre-departure</h3><p>Orientation and preparation for life and study abroad.</p></div></article><article class="service" data-reveal><b>07</b><div><h3>Air ticketing</h3><p>Flight booking and travel arrangements for the journey abroad.</p></div></article></div>
```

with this new string:

```
<div class="service-grid" data-reveal><article class="service-photo"><div class="thumb"><img src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=1200&q=80" alt="Study Insights university selection consultation" loading="lazy"></div><div class="body"><b>01</b><h3>University selection</h3><p>Guidance to identify the right institution and programme.</p></div></article><article class="service-photo"><div class="thumb"><img src="https://images.unsplash.com/photo-1739285452629-2672b13fa42d?w=1200&q=80" alt="Study Insights application support session" loading="lazy"></div><div class="body"><b>02</b><h3>Application support</h3><p>Assistance with documentation and submission preparation.</p></div></article><article class="service-photo"><div class="thumb"><img src="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?w=1200&q=80" alt="Study Insights visa processing - traveller with luggage" loading="lazy"></div><div class="body"><b>03</b><h3>Visa processing</h3><p>Comprehensive visa application guidance and support.</p></div></article><article class="service-photo"><div class="thumb"><img src="https://images.unsplash.com/photo-1775623606627-597281856916?w=1200&q=80" alt="Study Insights scholarship aid - graduates celebrating" loading="lazy"></div><div class="body"><b>04</b><h3>Scholarship aid</h3><p>Support to identify and apply for relevant funding opportunities.</p></div></article><article class="service-photo"><div class="thumb"><img src="https://images.unsplash.com/photo-1752650732799-6e81d5f4c398?w=1200&q=80" alt="Study Insights career counselling session" loading="lazy"></div><div class="body"><b>05</b><h3>Career counselling</h3><p>Strategic advice about career pathways and job markets.</p></div></article><article class="service-photo"><div class="thumb"><img src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1200&q=80" alt="Study Insights pre-departure preparation - traveller at airport" loading="lazy"></div><div class="body"><b>06</b><h3>Pre-departure</h3><p>Orientation and preparation for life and study abroad.</p></div></article><article class="service-photo"><div class="thumb"><img src="https://images.unsplash.com/photo-1524592714635-d77511a4834d?w=1200&q=80" alt="Study Insights air ticketing - departing aircraft" loading="lazy"></div><div class="body"><b>07</b><h3>Air ticketing</h3><p>Flight booking and travel arrangements for the journey abroad.</p></div></article></div>
```

- [ ] **Step 3: Verify Biluibaba's section is unchanged**

Run:
```bash
cd "M:/Landing page/home" && grep -c 'src="public/E-Commerce.jpg"' company.html
grep -c 'src="public/Vet%20Service.jpg"' company.html
grep -c 'src="public/Pet%20Delivery.jpg"' company.html
grep -c 'src="public/Adoption.jpg"' company.html
```
Expected: all four print `1` (unchanged from before this task).

- [ ] **Step 4: Add the "View full pitch deck" links to both company sections**

Using the Edit tool on `home/company.html`, replace this exact old string (end of the Biluibaba section):

```
<blockquote class="quote">“A caring ecosystem where pets thrive and pet parents feel supported every step of the way.”<cite>Biluibaba mission and vision</cite></blockquote></div></div></div></section>
```

with:

```
<blockquote class="quote">“A caring ecosystem where pets thrive and pet parents feel supported every step of the way.”<cite>Biluibaba mission and vision</cite></blockquote><a class="text-link" href="biluibaba-deck.html" style="display:inline-block;margin-top:22px">View full pitch deck →</a></div></div></div></section>
```

And replace this exact old string (end of the Study Insights section, the `stat-source` line):

```
<p class="stat-source">Source: UNESCO Global Flow of Tertiary-Level Students, Bangladesh Bank, The Business Research Company.</p></div></section>
```

with:

```
<p class="stat-source">Source: UNESCO Global Flow of Tertiary-Level Students, Bangladesh Bank, The Business Research Company.</p><a class="text-link" href="study-insights-deck.html" style="display:inline-block;margin-top:20px">View full pitch deck →</a></div></section>
```

- [ ] **Step 5: Verify both new links are present and Biluibaba's images are still untouched**

Run:
```bash
cd "M:/Landing page/home" && grep -c 'href="biluibaba-deck.html"' company.html
grep -c 'href="study-insights-deck.html"' company.html
grep -c 'src="public/E-Commerce.jpg"' company.html
```
Expected: `1`, `1`, `1`

- [ ] **Step 6: Commit**

```bash
cd "M:/Landing page" && git add home/company.html && git commit -m "Add photo cards to Study Insights services and link both pitch decks

Study Insights service grid converts from icon-badge cards to the
same .service-photo treatment Biluibaba's four services already use
(16:10 photo, grayscale-idle to color-on-hover) — Biluibaba's own
four photos are untouched. Both company sections get a 'View full
pitch deck' link to the new deck pages.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 6: Add photo cards to the homepage portfolio section

**Files:**
- Modify: `home/index.html`

**Interfaces:**
- Consumes: `.portfolio-card.photo` from Task 2; the Biluibaba photo URL (`public/Vet%20Service.jpg`, reused, not modified) and the Study Insights photo URL from Task 1's table.

- [ ] **Step 1: Replace the portfolio block**

Using the Edit tool on `home/index.html`, replace this exact old string:

```
<div class="portfolio"><article class="portfolio-card" data-reveal><span class="number">01 / PET CARE</span><h3>Biluibaba</h3><p>A one-stop pet service platform bringing products, veterinary support, transport and responsible adoption closer to pet parents.</p><a class="text-link" href="company.html#biluibaba">Explore Biluibaba →</a></article><article class="portfolio-card" data-reveal><span class="number">02 / EDUCATION</span><h3>Study Insights</h3><p>An education consultancy for students pursuing international education in Europe, the UK and Australia.</p><a class="text-link" href="company.html#study">Explore Study Insights →</a></article></div>
```

with:

```
<div class="portfolio"><article class="portfolio-card photo" data-reveal><div class="pc-thumb"><img src="public/Vet%20Service.jpg" alt="Biluibaba vet service" loading="lazy"></div><div class="pc-body"><span class="number">01 / PET CARE</span><h3>Biluibaba</h3><p>A one-stop pet service platform bringing products, veterinary support, transport and responsible adoption closer to pet parents.</p><a class="text-link" href="company.html#biluibaba">Explore Biluibaba →</a></div></article><article class="portfolio-card photo" data-reveal><div class="pc-thumb"><img src="https://images.unsplash.com/photo-1784573333051-17a4006f741d?w=900&q=80" alt="Study Insights - graduate celebrating on campus" loading="lazy"></div><div class="pc-body"><span class="number">02 / EDUCATION</span><h3>Study Insights</h3><p>An education consultancy for students pursuing international education in Europe, the UK and Australia.</p><a class="text-link" href="company.html#study">Explore Study Insights →</a></div></article></div>
```

- [ ] **Step 2: Verify the replacement landed and no stray old markup remains**

Run:
```bash
cd "M:/Landing page/home" && grep -c 'class="portfolio-card photo"' index.html
grep -c 'pc-thumb' index.html
```
Expected: `2`, `2`

- [ ] **Step 3: Commit**

```bash
cd "M:/Landing page" && git add home/index.html && git commit -m "Add photos to homepage portfolio cards

Biluibaba card reuses the existing public/Vet Service.jpg (no new
stock photo mixed in for a company that already has real photography
elsewhere on the site). Study Insights card gets a sourced
graduate/campus photo. Both use the new .portfolio-card.photo variant.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 7: Full render verification across all four touched/created pages

**Files:**
- Test: none created (uses the scratchpad, per repo convention established this session)

**Interfaces:**
- Consumes: all pages from Tasks 3–6.

- [ ] **Step 1: Install/confirm Playwright is available in the scratchpad (same pattern used earlier this session)**

Run:
```bash
SP="C:/Users/User/AppData/Local/Temp/claude/m--Landing-page/d5a67722-cd5d-4f11-a04c-4676882ba8ce/scratchpad"
mkdir -p "$SP" && cd "$SP" && ls node_modules 2>/dev/null | grep -c playwright
```
Expected: `2` (playwright, playwright-core already installed earlier this session). If `0`, run `npm install playwright --silent --no-fund --no-audit` in that directory first.

- [ ] **Step 2: Render both new deck pages and both modified pages, check for console errors and image load failures**

Run (from the scratchpad directory):
```bash
cat > verify-decks.js << 'EOF'
const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome'});
  const pages=['biluibaba-deck.html','study-insights-deck.html','company.html','index.html'];
  let allOk=true;
  for(const f of pages){
    const p=await b.newPage({viewport:{width:1280,height:900}});
    const errs=[];
    const failedImgs=[];
    p.on('pageerror',e=>errs.push(e.message));
    p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
    p.on('response',async res=>{
      const req=res.request();
      if(req.resourceType()==='image' && res.status()>=400){
        failedImgs.push(req.url()+' -> '+res.status());
      }
    });
    await p.goto(`file:///M:/Landing%20page/home/${f}?c=`+Date.now(),{waitUntil:'networkidle',timeout:30000});
    await p.waitForTimeout(1500);
    await p.evaluate(()=>{document.querySelectorAll('[data-reveal]').forEach(x=>x.classList.add('in'));
      document.querySelector('.loader')?.remove();});
    await p.waitForTimeout(500);
    const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2);
    const ok = errs.length===0 && failedImgs.length===0 && !overflow;
    allOk = allOk && ok;
    console.log(f, ok?'OK':'FAIL', 'errors:',errs.length?errs.join('|'):'none', 'failedImages:',failedImgs.length?failedImgs.join('|'):'none', 'overflow:',overflow);
    await p.close();
  }
  console.log('ALL_OK:',allOk);
  await b.close();
})();
EOF
node verify-decks.js
```

Expected: `OK` for all four pages, `ALL_OK: true`. If any page reports `FAIL`, read the printed errors/failedImages and fix the specific broken URL or markup in the relevant Task's file before continuing — do not proceed to Step 3 until `ALL_OK: true`.

- [ ] **Step 3: Verify Biluibaba's four photos render correctly on company.html (regression check against the global constraint)**

Run (from the scratchpad, same session):
```bash
cat > verify-biluibaba-photos.js << 'EOF'
const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome'});
  const p=await b.newPage({viewport:{width:1280,height:900}});
  await p.goto('file:///M:/Landing%20page/home/company.html?c='+Date.now(),{waitUntil:'networkidle'});
  await p.waitForTimeout(900);
  const srcs=await p.evaluate(()=>[...document.querySelectorAll('#biluibaba .service-photo img')].map(i=>i.getAttribute('src')));
  console.log(JSON.stringify(srcs,null,1));
  const expected=['public/E-Commerce.jpg','public/Vet%20Service.jpg','public/Pet%20Delivery.jpg','public/Adoption.jpg'];
  const match = JSON.stringify(srcs)===JSON.stringify(expected);
  console.log('MATCHES_ORIGINAL_FOUR:',match);
  await b.close();
})();
EOF
node verify-biluibaba-photos.js
```

Expected: `MATCHES_ORIGINAL_FOUR: true`. If `false`, this is a violation of the global constraint — stop and fix `company.html` so the four `src` values exactly match the expected array before proceeding.

- [ ] **Step 4: Screenshot each new/changed section for visual sanity check**

Run (from the scratchpad):
```bash
cat > shot-decks.js << 'EOF'
const {chromium}=require('playwright');
(async()=>{
  const b=await chromium.launch({channel:'chrome'});
  async function shot(file, out, fullPage){
    const p=await b.newPage({viewport:{width:1280,height:900}});
    await p.goto(`file:///M:/Landing%20page/home/${file}?c=`+Date.now(),{waitUntil:'networkidle'});
    await p.waitForTimeout(1200);
    await p.evaluate(()=>{document.querySelectorAll('[data-reveal]').forEach(x=>x.classList.add('in'));
      document.querySelector('.loader')?.remove();});
    const H=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<H;y+=700){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(150);}
    await p.waitForTimeout(1200);
    await p.screenshot({path:`M:/Landing page/${out}`, fullPage: !!fullPage});
    await p.close();
  }
  await shot('biluibaba-deck.html','.deck-biluibaba-full.png',true);
  await shot('study-insights-deck.html','.deck-study-full.png',true);
  await b.close();
})();
EOF
node shot-decks.js
```

Then use the Read tool on `M:/Landing page/.deck-biluibaba-full.png` and `M:/Landing page/.deck-study-full.png` to visually inspect both full-page renders: confirm every section is populated (no empty panels), both Chart.js canvases per page actually drew bars/doughnut segments (not blank), and text is not clipped or overlapping.

- [ ] **Step 5: Clean up screenshots**

Run: `cd "M:/Landing page" && rm -f .deck-biluibaba-full.png .deck-study-full.png`

- [ ] **Step 6: No commit for this task** (verification only; any fixes discovered in Steps 2–4 should be committed as part of the task file they belong to, amending that task's commit is not required — a new small fix commit is fine)

---

## Self-Review Notes

- **Spec coverage:** All three spec pieces (two deck pages, company.html links, photos on company.html + index.html) map to Tasks 3–6. The spec's placeholder-handling requirement is satisfied in Task 3's "Launch — date to be confirmed" copy. The spec's "don't fabricate a standalone Study Insights ask" requirement is satisfied in Task 4's investment section, which explicitly frames every figure as "part of the combined ask."
- **Global constraint enforcement:** Task 5 Step 3 and Task 7 Step 3 both independently verify Biluibaba's four photo `src` values are byte-for-byte unchanged — a real regression check, not just "don't touch it" left to discipline.
- **No placeholders:** every task has literal, complete HTML/CSS/JS content inline — nothing deferred to "similar to Task N."
- **Type/name consistency:** `.portfolio-card.photo`, `.pc-thumb`, `.pc-body`, `.phase-pill` (with `.p2`/`.p3` modifiers) are defined once in Task 2 and used identically (same class names) in Tasks 3, 4, 6 — checked against each other above.
