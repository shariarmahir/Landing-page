# Website Accuracy & Design Unification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring `home/` into visual and factual consistency: unify `team.html` and `financials.html` into the `brand.css` editorial system already used by `index.html`/`company.html`/`contact.html`, add real photos/service images throughout, correct the team roster and financial/market figures against the three source PDFs, and cross-link all five brand-style pages.

**Architecture:** Pure static HTML/CSS/JS, no build step, no framework. All shared visual language lives in `home/assets/brand.css` + `home/assets/brand.js` (loader, sticky nav, mobile menu, IntersectionObserver reveal, Three.js terrain hero). `team.html` and `financials.html` currently use a separate `assets/investor.css`/`investor.js` system and will be rewritten to use `brand.css`/`brand.js` instead — `investor.css`/`investor.js` remain on disk (still used by `secureyourstake.html` and referenced conceptually, though those pages are out of scope) but will no longer be linked from the pages this plan touches. `financials.html` keeps Chart.js for its two charts, restyled to brand colors.

**Tech Stack:** HTML5, CSS (custom, no framework), vanilla JS, Three.js r128 (hero terrain, already CDN-loaded via `brand.js`/pages), Chart.js (financials charts only, CDN).

## Global Constraints

- No backend/server changes. Contact stays static `mailto:`/`tel:`/WhatsApp links (per approved design).
- Do not modify `home/secureyourstake.html`, `home/legal-privacy.html`, `home/404.html`, `home/assets/investor.css`, `home/assets/investor.js` (out of scope, explicitly excluded in the design doc).
- No new image assets — only use files already present under `home/public/`.
- All facts (names, titles, emails, phone, address, figures) must match exactly what's in the three source PDFs: `Biluibaba Company Profile.pdf`, `Study-Insights Company Portfolio.pdf`, `Financial Model Combined for Biluibaba and Study Insights.xlsx - Cost.pdf`.
- Image filenames with spaces (`Vet Service.jpg`, `Pet Delivery.jpg`) must be URL-encoded (`%20`) or otherwise correctly referenced in `src=`/`url()` — spaces alone in an unquoted CSS `url()` will break; HTML `src` attributes handle literal spaces fine when quoted, but encode them anyway for CSS reuse consistency.
- Every HTML file keeps its existing `<!doctype html>` single-line-per-section minified style already used in `index.html`/`company.html`/`contact.html` (all markup on very few long lines) — match that convention exactly so file style stays consistent, rather than introducing pretty-printed multi-line HTML into a minified codebase.
- Currency figures in `financials.html` use the Bengali "৳" symbol and lac-based phrasing exactly as currently present (e.g. "BDT 88 Lac", "৳8,800,000") — do not convert to USD or alter figures.

---

## File Structure

| File | Change |
|---|---|
| `home/assets/brand.css` | Modify — add `.team-card`, `.team-grid`, `.service-photo`, `.ledger` (financials table), `.chart-panel`, `.stat-strip` rules |
| `home/index.html` | Modify — add Team + Financials nav links, footer links, add two teaser sections before footer |
| `home/company.html` | Modify — add nav/footer links, image-backed Biluibaba service cards, Study-Insights stats strip, 3-year milestone grid, team preview strip, financial model preview card |
| `home/contact.html` | Modify — add nav/footer links only (content already accurate) |
| `home/team.html` | Rewrite — full rebuild on `brand.css`/`brand.js`, corrected roster |
| `home/financials.html` | Rewrite — full rebuild on `brand.css`/`brand.js`, same figures, restyled charts |

No test framework exists in this repo. "Testing" for each task means: grep for the exact expected string/value in the file, and view the rendered page in a browser to confirm no visual breakage (images load, links resolve, layout doesn't overflow).

---

### Task 1: Add shared team/financials nav & footer links to brand-style pages

**Files:**
- Modify: `home/index.html` (nav `.links`, `.mobile` menu, footer `.footer-links`)
- Modify: `home/company.html` (same three spots)
- Modify: `home/contact.html` (same three spots)

**Interfaces:**
- Produces: every brand-style page has working `<a href="team.html">Team</a>` and `<a href="financials.html">Financials</a>` links in nav, mobile menu, and footer — later tasks (2, 3) rely on these being reachable.

- [ ] **Step 1: Add nav links to `index.html`**

In `home/index.html`, find the nav links block:
```html
<div class="links"><a class="active" href="index.html">Home</a><a href="company.html">Companies</a><a href="#services">Services</a><a href="contact.html">Contact</a></div>
```
Replace with:
```html
<div class="links"><a class="active" href="index.html">Home</a><a href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div>
```
Find the mobile menu block:
```html
<div class="mobile"><button id="menuClose" aria-label="Close navigation">x</button><a href="index.html">Home</a><a href="company.html">Companies</a><a href="#services">Services</a><a href="contact.html">Contact</a></div>
```
Replace with:
```html
<div class="mobile"><button id="menuClose" aria-label="Close navigation">x</button><a href="index.html">Home</a><a href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div>
```
Find the footer links:
```html
<div class="footer-links"><a href="index.html">Home</a><a href="company.html">Companies</a><a href="contact.html">Contact</a></div>
```
Replace with:
```html
<div class="footer-links"><a href="index.html">Home</a><a href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div>
```

- [ ] **Step 2: Same three replacements in `company.html`**

Find:
```html
<div class="links"><a href="index.html">Home</a><a class="active" href="company.html">Companies</a><a href="#biluibaba">Biluibaba</a><a href="#study">Study Insights</a><a href="contact.html">Contact</a></div>
```
Replace with:
```html
<div class="links"><a href="index.html">Home</a><a class="active" href="company.html">Companies</a><a href="#biluibaba">Biluibaba</a><a href="#study">Study Insights</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div>
```
Find:
```html
<div class="mobile"><button id="menuClose" aria-label="Close navigation">x</button><a href="index.html">Home</a><a href="#biluibaba">Biluibaba</a><a href="#study">Study Insights</a><a href="contact.html">Contact</a></div>
```
Replace with:
```html
<div class="mobile"><button id="menuClose" aria-label="Close navigation">x</button><a href="index.html">Home</a><a href="#biluibaba">Biluibaba</a><a href="#study">Study Insights</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div>
```
Find:
```html
<div class="footer-links"><a href="index.html">Home</a><a href="company.html">Companies</a><a href="contact.html">Contact</a></div>
```
Replace with:
```html
<div class="footer-links"><a href="index.html">Home</a><a href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div>
```

- [ ] **Step 3: Same three replacements in `contact.html`**

Find:
```html
<div class="links"><a href="index.html">Home</a><a href="company.html">Companies</a><a class="active" href="contact.html">Contact</a></div>
```
Replace with:
```html
<div class="links"><a href="index.html">Home</a><a href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a class="active" href="contact.html">Contact</a></div>
```
Find:
```html
<div class="mobile"><button id="menuClose" aria-label="Close navigation">x</button><a href="index.html">Home</a><a href="company.html">Companies</a><a href="contact.html">Contact</a></div>
```
Replace with:
```html
<div class="mobile"><button id="menuClose" aria-label="Close navigation">x</button><a href="index.html">Home</a><a href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div>
```
Find:
```html
<div class="footer-links"><a href="index.html">Home</a><a href="company.html">Companies</a><a href="contact.html">Contact</a></div>
```
Replace with:
```html
<div class="footer-links"><a href="index.html">Home</a><a href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div>
```

- [ ] **Step 4: Verify**

Grep for the new links:
```
grep -c "team.html" home/index.html home/company.html home/contact.html
grep -c "financials.html" home/index.html home/company.html home/contact.html
```
Expected: each file reports `3` for each grep (nav + mobile + footer).

- [ ] **Step 5: Commit**

```bash
git add home/index.html home/company.html home/contact.html
git commit -m "Link team and financials pages from main nav and footer"
```

---

### Task 2: Add CSS building blocks to `brand.css`

**Files:**
- Modify: `home/assets/brand.css`

**Interfaces:**
- Produces: CSS classes `.team-grid`, `.team-card`, `.team-card img`, `.team-card .fallback`, `.service-photo`, `.stat-strip`, `.stat-strip .stat`, `.ledger`, `.ledger table`, `.ledger th`, `.ledger td`, `.chart-panel`, `.chart-box` — consumed by Tasks 3, 4, 5, 6.

- [ ] **Step 1: Append new rules to `home/assets/brand.css`**

Append this block to the end of the file (after the existing `@media(max-width:760px)` block, as a new line):

```css
.team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.team-card{position:relative;border:1px solid var(--line);background:#fbf8ef;overflow:hidden;transition:.3s}.team-card:hover{border-color:var(--green);transform:translateY(-4px)}.team-card .photo{position:relative;aspect-ratio:4/5;overflow:hidden;background:#111}.team-card img{width:100%;height:100%;object-fit:cover;filter:grayscale(65%);transition:filter .4s,transform .5s}.team-card:hover img{filter:grayscale(0%);transform:scale(1.04)}.team-card .fallback{position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:var(--ink-soft);color:var(--green-bright);font:600 1.8rem var(--serif)}.team-card .info{padding:18px 20px 22px}.team-card h4{font:600 1.15rem var(--serif);letter-spacing:-.01em}.team-card span{display:block;margin-top:6px;color:var(--muted);font:500 10px var(--mono);letter-spacing:.1em;text-transform:uppercase}.dark .team-card{background:#211d16;border-color:var(--line-dark)}.dark .team-card span{color:#a89d86}
.service-photo{position:relative;padding:0;overflow:hidden;border:1px solid var(--line);background:#fbf8ef;display:flex;flex-direction:column}.service-photo .thumb{position:relative;aspect-ratio:16/10;overflow:hidden}.service-photo .thumb img{width:100%;height:100%;object-fit:cover;filter:grayscale(35%);transition:filter .4s,transform .5s}.service-photo:hover .thumb img{filter:grayscale(0%);transform:scale(1.05)}.service-photo .body{padding:20px 22px 24px}.service-photo b{display:inline-block;margin-bottom:9px;color:var(--green);font:500 10px var(--mono);letter-spacing:.14em;text-transform:uppercase}.service-photo h3{font:600 1.25rem var(--serif);margin:0 0 7px}.service-photo p{color:#5f5848;font-size:13px;line-height:1.6}
.stat-strip{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid #d8cdbb;background:#d8cdbb;gap:1px;margin-top:36px}.stat{min-height:150px;padding:25px;background:var(--paper)}.stat b{display:block;color:var(--green);font:600 clamp(1.7rem,2.8vw,2.5rem) var(--serif);letter-spacing:-.03em}.stat span{display:block;margin-top:10px;color:#5f5848;font-size:12px;line-height:1.5}.stat-source{margin-top:14px;color:var(--muted);font:500 10px var(--mono);letter-spacing:.06em}
.ledger{border:1px solid var(--line-dark);background:#1c1810}.ledger-head{display:flex;justify-content:space-between;align-items:center;padding:16px 22px;border-bottom:1px solid var(--line-dark);flex-wrap:wrap;gap:10px}.ledger-head h3{font:600 1.2rem var(--serif);color:var(--cream)}.ledger-head span{font:500 10px var(--mono);letter-spacing:.14em;text-transform:uppercase;color:#a89d86}.ledger table{width:100%;border-collapse:collapse}.ledger th{text-align:right;padding:12px 18px;font:500 10px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:#a89d86;border-bottom:1px solid var(--line-dark)}.ledger th:first-child,.ledger td:first-child{text-align:left}.ledger td{padding:13px 18px;font:400 13px var(--mono);text-align:right;color:#e6ddc6;border-bottom:1px solid rgba(239,232,214,.07)}.ledger tr.em td{font-weight:600;color:var(--green-bright);border-top:1px solid var(--line-dark)}.ledger tr:last-child td{border-bottom:0}
.chart-panel{border:1px solid var(--line);background:#fbf8ef;padding:26px 26px 20px}.chart-panel h3{font:600 1.25rem var(--serif);margin-bottom:16px}.chart-box{position:relative;height:280px}
@media(max-width:760px){.team-grid,.stat-strip{grid-template-columns:1fr}.team-grid{gap:1px}.stat-strip{gap:1px}}
```

- [ ] **Step 2: Verify**

```
grep -c "team-grid" home/assets/brand.css
grep -c "chart-panel" home/assets/brand.css
```
Expected: both `>= 1`.

- [ ] **Step 3: Commit**

```bash
git add home/assets/brand.css
git commit -m "Add team, service-photo, stat-strip and ledger styles to brand.css"
```

---

### Task 3: Rebuild `team.html` on brand.css with corrected roster

**Files:**
- Modify (full rewrite of `<body>` content, keep `<head>` pattern from `company.html`): `home/team.html`

**Interfaces:**
- Consumes: `.team-grid`/`.team-card` CSS from Task 2; nav/footer link pattern from Task 1.
- Produces: nothing consumed by later tasks (leaf page), but company.html Task 4 links to `team.html#study` / `team.html#biluibaba` anchors, so this task must add `id="study"` and `id="biluibaba"` to the two team sections.

Source of truth for roster (from `Study-Insights Company Portfolio.pdf` page 12 and `Biluibaba Company Profile.pdf` page 13):

Study-Insights (3 people):
- Sadman Bin Arif — Managing Director
- Mahir Shariar Mahin — Manager & Head of Operation
- Shah Sadad Ahmed — Counselor & Head of Admissions

Biluibaba (6 people):
- Sadman Bin Arif — CEO & Founder
- Dewan Abdullah Fahad — COO & Co-Founder
- Sami Adnan — Chief Technology Officer
- Kazi Shabbin Hossain — Head of IT
- Md Munjurul Karim — Head of Marketing & Sales
- Md Sajidul Islam — Head of Procurement

Photo paths (already exist, verified via Glob):
- `public/study-insights/sadman_bin_arif.jpg`
- `public/study-insights/mahir_shariar_mahin.jpg`
- `public/study-insights/shah_sadad_ahmed.jpg`
- `public/biluibaba/sadman_bin_arif.jpg`
- `public/biluibaba/dewan_abdullah_fahad.jpg`
- `public/biluibaba/sami_adnan.jpg`
- `public/biluibaba/kazi_shabbin_hossain.jpg`
- `public/biluibaba/md_munjurul_karim.jpg`
- `public/biluibaba/md_sajidul_islam.jpg`

- [ ] **Step 1: Write the new `home/team.html`**

Replace the entire file content with:

```html
<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Our Team | Biluibaba x Study Insights</title><meta name="description" content="Meet the leadership teams behind Biluibaba and Study Insights."><link rel="icon" href="favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900&family=Spline+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="assets/brand.css"></head>
<body><div class="page"><div class="loader"><div><b>BILUIBABA x STUDY INSIGHTS</b><i></i></div></div><nav id="nav"><a class="brand" href="index.html">Biluibaba<i></i>Study Insights</a><div class="links"><a href="index.html">Home</a><a href="company.html">Companies</a><a class="active" href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div><button class="menu" id="menuOpen" aria-label="Open navigation">+</button></nav><div class="mobile"><button id="menuClose" aria-label="Close navigation">x</button><a href="index.html">Home</a><a href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div>
<main><section class="hero"><canvas id="terrain" aria-hidden="true"></canvas><div class="hero-copy"><div class="eyebrow">Our people</div><h1 class="hero-title">The people behind <em>the platforms.</em></h1><p class="hero-text">Biluibaba and Study Insights are led by a shared team of founders and specialists based in Dhaka, Bangladesh - dedicated to honest work and genuinely useful service.</p><a class="button" href="#study">Meet the team <span>↓</span></a></div><span class="drag-hint">Drag the landscape</span><div class="hero-stats"><div><b>09</b><span>Team members</span></div><div><b>02</b><span>Companies</span></div><div><b>Dhaka</b><span>Shared base</span></div><div><b>2026</b><span>United leadership</span></div></div></section>
<section class="section soft" id="study"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Study Insights leadership</div><h2 class="display">Honest guidance, <em>led by experts.</em></h2><p class="lead">The Study Insights team brings admissions expertise, operational discipline and strategic vision to every student's journey.</p></div><div class="team-grid">
<article class="team-card" data-reveal><div class="photo"><img src="public/study-insights/sadman_bin_arif.jpg" alt="Sadman Bin Arif" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="fallback">SA</div></div><div class="info"><h4>Sadman Bin Arif</h4><span>Managing Director</span></div></article>
<article class="team-card" data-reveal><div class="photo"><img src="public/study-insights/mahir_shariar_mahin.jpg" alt="Mahir Shariar Mahin" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="fallback">MM</div></div><div class="info"><h4>Mahir Shariar Mahin</h4><span>Manager &amp; Head of Operation</span></div></article>
<article class="team-card" data-reveal><div class="photo"><img src="public/study-insights/shah_sadad_ahmed.jpg" alt="Shah Sadad Ahmed" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="fallback">SS</div></div><div class="info"><h4>Shah Sadad Ahmed</h4><span>Counselor &amp; Head of Admissions</span></div></article>
</div></div></section>
<section class="section dark" id="biluibaba"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Biluibaba leadership</div><h2 class="display">Building better <em>pet care, together.</em></h2><p class="lead">The Biluibaba team spans product, technology, marketing and procurement - united around one goal: a caring ecosystem where pets and pet parents thrive.</p></div><div class="team-grid">
<article class="team-card" data-reveal><div class="photo"><img src="public/biluibaba/sadman_bin_arif.jpg" alt="Sadman Bin Arif" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="fallback">SA</div></div><div class="info"><h4>Sadman Bin Arif</h4><span>CEO &amp; Founder</span></div></article>
<article class="team-card" data-reveal><div class="photo"><img src="public/biluibaba/dewan_abdullah_fahad.jpg" alt="Dewan Abdullah Fahad" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="fallback">DF</div></div><div class="info"><h4>Dewan Abdullah Fahad</h4><span>COO &amp; Co-Founder</span></div></article>
<article class="team-card" data-reveal><div class="photo"><img src="public/biluibaba/sami_adnan.jpg" alt="Sami Adnan" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="fallback">SA</div></div><div class="info"><h4>Sami Adnan</h4><span>Chief Technology Officer</span></div></article>
<article class="team-card" data-reveal><div class="photo"><img src="public/biluibaba/kazi_shabbin_hossain.jpg" alt="Kazi Shabbin Hossain" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="fallback">KS</div></div><div class="info"><h4>Kazi Shabbin Hossain</h4><span>Head of IT</span></div></article>
<article class="team-card" data-reveal><div class="photo"><img src="public/biluibaba/md_munjurul_karim.jpg" alt="Md Munjurul Karim" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="fallback">MK</div></div><div class="info"><h4>Md Munjurul Karim</h4><span>Head of Marketing &amp; Sales</span></div></article>
<article class="team-card" data-reveal><div class="photo"><img src="public/biluibaba/md_sajidul_islam.jpg" alt="Md Sajidul Islam" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="fallback">SI</div></div><div class="info"><h4>Md Sajidul Islam</h4><span>Head of Procurement</span></div></article>
</div></div></section>
<section class="section green-section"><div class="wrap location"><div data-reveal><div class="eyebrow">Work with us</div><h3>Want to talk to the team directly?</h3><p>Reach out to either company for pet-care support or international education guidance.</p></div><div class="contact-list" data-reveal><a href="mailto:info@biluibaba.com">info@biluibaba.com</a><a href="mailto:info@study-insights.com">info@study-insights.com</a><a href="contact.html">Contact page →</a></div></div></section></main>
<footer><div class="wrap"><div class="footer-name">Biluibaba <em>x</em> Study Insights</div><div class="footer-row"><p>Pet care and international education guidance from Dhaka, Bangladesh.</p><div class="footer-links"><a href="index.html">Home</a><a href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div></div></div></footer></div><script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script><script src="assets/brand.js"></script></body></html>
```

- [ ] **Step 2: Verify roster correctness**

```
grep -o "Head of Creative" home/team.html
```
Expected: no output (old incorrect title removed). Then:
```
grep -c "Shah Sadad Ahmed" home/team.html
grep -c "Dewan Abdullah Fahad" home/team.html
```
Expected: `1` each — Shah Sadad Ahmed appears once (Study Insights only), Dewan Abdullah Fahad appears once (Biluibaba only).

- [ ] **Step 3: Verify all 9 image paths exist**

```
ls "home/public/study-insights/sadman_bin_arif.jpg" "home/public/study-insights/mahir_shariar_mahin.jpg" "home/public/study-insights/shah_sadad_ahmed.jpg" "home/public/biluibaba/sadman_bin_arif.jpg" "home/public/biluibaba/dewan_abdullah_fahad.jpg" "home/public/biluibaba/sami_adnan.jpg" "home/public/biluibaba/kazi_shabbin_hossain.jpg" "home/public/biluibaba/md_munjurul_karim.jpg" "home/public/biluibaba/md_sajidul_islam.jpg"
```
Expected: all 9 files listed, no "No such file" errors.

- [ ] **Step 4: Commit**

```bash
git add home/team.html
git commit -m "Rebuild team.html on brand.css with corrected leadership roster"
```

---

### Task 4: Rebuild `financials.html` on brand.css

**Files:**
- Modify (full rewrite): `home/financials.html`

**Interfaces:**
- Consumes: `.ledger`, `.chart-panel`, `.chart-box`, `.stat` CSS from Task 2.
- Produces: nothing consumed by later tasks (leaf page). Must keep `id="cashChart"` and `id="fundingChart"` canvas element IDs and the same Chart.js data values so the chart-rendering script continues to work.

All figures below are taken verbatim from `Financial Model Combined for Biluibaba and Study Insights.xlsx - Cost.pdf` (page 17): Final funding commitment ৳88,00,000; One-Time Costs ৳15,50,000; 12-Month Recurring Costs ৳66,00,000; Yearly Recurring Costs ৳1,80,000; Emergency Reserve ৳4,50,000; Calculated Funding Requirement ৳87,80,000; Rounding Buffer ৳20,000. Monthly recurring breakdown (page 15): Employee salaries ৳4,05,000; Daily operating buffer ৳5,000; Rent + utilities ৳40,000; Biluibaba marketing ৳40,000; Study-Insights marketing ৳30,000; IT + administration ৳30,000; Final MRC ৳5,50,000.

- [ ] **Step 1: Write the new `home/financials.html`**

Replace the entire file content with:

```html
<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Financial Model | Biluibaba x Study Insights</title><meta name="description" content="The combined funding requirement and cost structure for Biluibaba and Study Insights."><link rel="icon" href="favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900&family=Spline+Sans+Mono:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="assets/brand.css"><script src="https://cdn.jsdelivr.net/npm/chart.js"></script></head>
<body><div class="page"><div class="loader"><div><b>BILUIBABA x STUDY INSIGHTS</b><i></i></div></div><nav id="nav"><a class="brand" href="index.html">Biluibaba<i></i>Study Insights</a><div class="links"><a href="index.html">Home</a><a href="company.html">Companies</a><a href="team.html">Team</a><a class="active" href="financials.html">Financials</a><a href="contact.html">Contact</a></div><button class="menu" id="menuOpen" aria-label="Open navigation">+</button></nav><div class="mobile"><button id="menuClose" aria-label="Close navigation">x</button><a href="index.html">Home</a><a href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div>
<main><section class="hero"><canvas id="terrain" aria-hidden="true"></canvas><div class="hero-copy"><div class="eyebrow">Approved cost structure</div><h1 class="hero-title">The financial model,<br><em>made legible.</em></h1><p class="hero-text">A direct translation of the combined Biluibaba and Study Insights cost model. Figures describe the funding requirement, not a revenue forecast.</p><a class="button" href="#breakdown">See the breakdown <span>↓</span></a></div><span class="drag-hint">Drag the landscape</span><div class="hero-stats"><div><b>৳88L</b><span>Final funding commitment</span></div><div><b>৳15.5L</b><span>One-time costs</span></div><div><b>৳66L</b><span>12-month recurring</span></div><div><b>৳5.5L</b><span>Monthly operating base</span></div></div></section>
<div class="ticker"><div><span>One-time costs ৳15,50,000</span><i></i><span>12-month recurring ৳66,00,000</span><i></i><span>Yearly recurring ৳1,80,000</span><i></i><span>Emergency reserve ৳4,50,000</span><i></i><span>One-time costs ৳15,50,000</span><i></i><span>12-month recurring ৳66,00,000</span><i></i><span>Yearly recurring ৳1,80,000</span><i></i><span>Emergency reserve ৳4,50,000</span><i></i></div></div>
<section class="section" id="breakdown"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Funding composition</div><h2 class="display">Every taka has a <em>defined role.</em></h2><p class="lead">The combined model funds one-time setup, twelve months of operations, yearly renewals and a contingency reserve.</p></div>
<div class="stat-strip" data-reveal><div class="stat"><b>৳15,50,000</b><span>One-time costs — office, technology, facilities, branding, legal &amp; safety setup.</span></div><div class="stat"><b>৳66,00,000</b><span>12-month recurring costs — ৳5,50,000 per month across salaries, rent, IT and marketing.</span></div><div class="stat"><b>৳1,80,000</b><span>Yearly recurring costs — renewals, compliance, servicing and brand refresh.</span></div></div>
<div class="chart-panel" data-reveal style="margin-top:26px"><h3>Funding requirement by component</h3><div class="chart-box"><canvas id="cashChart" aria-label="Bar chart showing funding requirements by cost component"></canvas></div></div>
</div></section>
<section class="section dark"><div class="wrap statement-grid">
<div data-reveal><div class="eyebrow">Commitment bridge</div><h2 class="display">From components to <em>final commitment.</em></h2><div class="ledger" style="margin-top:28px"><div class="ledger-head"><h3>Final commitment bridge</h3><span>Source: combined cost model</span></div><table><tbody>
<tr><td>One-time costs</td><td>৳15,50,000</td></tr>
<tr><td>12-month recurring costs</td><td>৳66,00,000</td></tr>
<tr><td>Yearly recurring costs</td><td>৳1,80,000</td></tr>
<tr><td>Emergency reserve</td><td>৳4,50,000</td></tr>
<tr class="em"><td>Calculated funding requirement</td><td>৳87,80,000</td></tr>
<tr class="em"><td>Rounding buffer</td><td>৳20,000</td></tr>
<tr class="em"><td>Final funding commitment</td><td>৳88,00,000</td></tr>
</tbody></table></div></div>
<div class="chart-panel" data-reveal style="--d:.1s"><h3>Commitment allocation</h3><div class="chart-box"><canvas id="fundingChart" aria-label="Doughnut chart showing cost allocation"></canvas></div></div>
</div></section>
<section class="section soft"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Monthly operating base</div><h2 class="display">৳5,50,000 per month, <em>fully mapped.</em></h2><p class="lead">The 12-month recurring cost establishes the operating base across people, space, market development and administration.</p></div>
<div class="ledger" data-reveal><div class="ledger-head"><h3>Monthly recurring cost</h3><span>BDT / month</span></div><table><tbody>
<tr><td>Employee salaries</td><td>৳4,05,000</td></tr>
<tr><td>Daily operating buffer</td><td>৳5,000</td></tr>
<tr><td>Rent + utilities</td><td>৳40,000</td></tr>
<tr><td>Biluibaba marketing</td><td>৳40,000</td></tr>
<tr><td>Study-Insights marketing</td><td>৳30,000</td></tr>
<tr><td>IT + administration</td><td>৳30,000</td></tr>
<tr class="em"><td>Final MRC</td><td>৳5,50,000</td></tr>
</tbody></table></div>
</div></section>
<section id="download" class="section green-section"><div class="wrap location"><div data-reveal><div class="eyebrow">Source workbook</div><h3>Review the full Excel model.</h3><p>Use the live workbook to review the underlying line items and cost assumptions.</p></div><div class="contact-list" data-reveal><a href="https://docs.google.com/spreadsheets/d/1JqAQOL649M2TDzyaj-ULkS7OPRzmZXk1/export?format=xlsx&amp;gid=671862489" target="_blank" rel="noopener">Download the .xlsx ↓</a><a href="company.html">Back to companies →</a></div></div></section></main>
<footer><div class="wrap"><div class="footer-name">Biluibaba <em>x</em> Study Insights</div><div class="footer-row"><p>Financial figures shown in BDT, based on the combined cost model.</p><div class="footer-links"><a href="index.html">Home</a><a href="company.html">Companies</a><a href="team.html">Team</a><a href="financials.html">Financials</a><a href="contact.html">Contact</a></div></div></div></footer></div><script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script><script src="assets/brand.js"></script>
<script>(()=>{const money=n=>new Intl.NumberFormat('en-BD').format(n);function draw(){if(!window.Chart)return setTimeout(draw,120);Chart.defaults.color='#8a8163';Chart.defaults.font.family='Spline Sans Mono';const cash=document.getElementById('cashChart');if(cash)new Chart(cash,{type:'bar',data:{labels:['One-time setup','Recurring / 12 months','Yearly recurring','Contingency'],datasets:[{data:[1550000,6600000,180000,450000],backgroundColor:['#b9793f','#1f6b4a','#68c494','#151310'],borderRadius:2,borderSkipped:false}]},options:{maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`BDT ${money(c.raw)}`}}},scales:{x:{grid:{display:false}},y:{grid:{color:'rgba(21,19,16,.08)'},ticks:{callback:v=>`৳${(v/100000).toFixed(0)}L`}}}}});const funding=document.getElementById('fundingChart');if(funding)new Chart(funding,{type:'doughnut',data:{labels:['12-month recurring costs','One-time costs','Contingency reserve','Yearly recurring costs'],datasets:[{data:[6600000,1550000,450000,180000],backgroundColor:['#1f6b4a','#b9793f','#68c494','#272119'],borderWidth:0,hoverOffset:8}]},options:{cutout:'73%',plugins:{legend:{position:'bottom',labels:{color:'#45403A',font:{family:'Spline Sans Mono',size:10}}},tooltip:{callbacks:{label:c=>`${c.label}: BDT ${money(c.raw)}`}}},animation:{animateRotate:true,duration:1200}}})}draw()})();</script>
</body></html>
```

- [ ] **Step 2: Verify figures match source exactly**

```
grep -c "৳88,00,000" home/financials.html
grep -c "৳15,50,000" home/financials.html
grep -c "৳66,00,000" home/financials.html
grep -c "৳5,50,000" home/financials.html
```
Expected: each `>= 1` (the ৳88,00,000 figure appears in hero + ledger = 2; others appear 2-3 times across strip/ledger/ticker — any count `>=1` confirms presence, no grep should return `0`).

- [ ] **Step 3: Verify chart canvases and script are intact**

```
grep -c "id=\"cashChart\"" home/financials.html
grep -c "id=\"fundingChart\"" home/financials.html
grep -c "new Chart" home/financials.html
```
Expected: `1`, `1`, `2`.

- [ ] **Step 4: Commit**

```bash
git add home/financials.html
git commit -m "Rebuild financials.html on brand.css with brand-colored charts"
```

---

### Task 5: Enrich `company.html` — image service cards, market stats, milestones, team/financial previews

**Files:**
- Modify: `home/company.html`

**Interfaces:**
- Consumes: `.service-photo`, `.stat-strip`, `.team-grid`/`.team-card` CSS from Task 2; links to `team.html`/`financials.html` established in Task 1.

Market stat sources (from `Study-Insights Company Portfolio.pdf`):
- Page 4: "52,799" students abroad in 2023, up from "24,112" in 2013 — "119% Growth"
- Page 6: "$667.77M" annual spending FY25, "153% Spending Growth" from FY21
- Page 8: "$4.04 Billion" 2025 global education consulting market size, projected "$6.34 Billion" by 2030

Milestone sources (from `Biluibaba Company Profile.pdf` page 11):
- 2025: "We started our journey to give pet owners a comfortable pet life in Dhaka City."
- 2026: "We plan to cross the boundary of city and reach other parts of Bangladesh."
- 2027: "Have an impact in Global market and cross national borders."

- [ ] **Step 1: Replace the Biluibaba service grid with image-backed cards**

Find in `home/company.html`:
```html
<div class="statement-grid"><div class="service-grid" data-reveal><article class="service"><b>01</b><div><h3>E-commerce</h3><p>Food, toys, grooming supplies and accessories for pets.</p></div></article><article class="service"><b>02</b><div><h3>Vet service</h3><p>Online consultations, appointments and home visits.</p></div></article><article class="service"><b>03</b><div><h3>Pet delivery</h3><p>Secure transport focused on safety, comfort and reliability.</p></div></article><article class="service"><b>04</b><div><h3>Pet adoption</h3><p>Responsible adoption listings that help pets find loving homes.</p></div></article></div><div data-reveal><div class="eyebrow">The purpose</div><blockquote class="quote">"A caring ecosystem where pets thrive and pet parents feel supported every step of the way."<cite>Biluibaba mission and vision</cite></blockquote></div></div>
```
Replace with:
```html
<div class="statement-grid"><div class="service-grid" data-reveal><article class="service-photo"><div class="thumb"><img src="public/E-Commerce.jpg" alt="Biluibaba e-commerce - pet food and accessories" loading="lazy"></div><div class="body"><b>01</b><h3>E-commerce</h3><p>Food, toys, grooming supplies and accessories for pets.</p></div></article><article class="service-photo"><div class="thumb"><img src="public/Vet%20Service.jpg" alt="Biluibaba vet service - online consultation" loading="lazy"></div><div class="body"><b>02</b><h3>Vet service</h3><p>Online consultations, appointments and home visits.</p></div></article><article class="service-photo"><div class="thumb"><img src="public/Pet%20Delivery.jpg" alt="Biluibaba pet delivery" loading="lazy"></div><div class="body"><b>03</b><h3>Pet delivery</h3><p>Secure transport focused on safety, comfort and reliability.</p></div></article><article class="service-photo"><div class="thumb"><img src="public/Adoption.jpg" alt="Biluibaba pet adoption" loading="lazy"></div><div class="body"><b>04</b><h3>Pet adoption</h3><p>Responsible adoption listings that help pets find loving homes.</p></div></article></div><div data-reveal><div class="eyebrow">The purpose</div><blockquote class="quote">"A caring ecosystem where pets thrive and pet parents feel supported every step of the way."<cite>Biluibaba mission and vision</cite></blockquote></div></div>
```

- [ ] **Step 2: Replace the 2-card Biluibaba journey portfolio grid with the 3-year milestone set**

Find:
```html
<section class="section dark"><div class="wrap statement-grid"><div data-reveal><div class="eyebrow">The Biluibaba journey</div><h2 class="display">Built locally, with an <em>expanding horizon.</em></h2><p class="lead">The Biluibaba profile sets out a journey that began by supporting pet owners in Dhaka, with an ambition to reach more of Bangladesh and eventually engage global markets.</p></div><div class="portfolio" data-reveal><article class="portfolio-card"><span class="number">2025</span><h3>Start in Dhaka</h3><p>Beginning with the goal of making life more comfortable for pet owners.</p></article><article class="portfolio-card"><span class="number">NEXT</span><h3>Reach further</h3><p>Expanding access to care, products and support beyond the city.</p></article></div></div></section>
```
Replace with:
```html
<section class="section dark"><div class="wrap statement-grid"><div data-reveal><div class="eyebrow">The Biluibaba journey</div><h2 class="display">Built locally, with an <em>expanding horizon.</em></h2><p class="lead">The Biluibaba profile sets out a three-year journey: start in Dhaka, extend across Bangladesh, then reach global markets.</p></div><div class="portfolio" data-reveal><article class="portfolio-card"><span class="number">2025</span><h3>Start in Dhaka</h3><p>We started our journey to give pet owners a comfortable pet life in Dhaka City.</p></article><article class="portfolio-card"><span class="number">2026</span><h3>Reach further</h3><p>We plan to cross the boundary of the city and reach other parts of Bangladesh.</p></article></div><div class="portfolio" data-reveal style="margin-top:1px"><article class="portfolio-card"><span class="number">2027</span><h3>Go global</h3><p>Have an impact in the global market and cross national borders.</p></article></div></div></section>
```

- [ ] **Step 3: Add the Study Insights market stats strip**

Find the closing of the Study Insights service grid (end of the `<div class="service-grid">...</div>` block, right before `</div></section>` that closes the `id="study"` section):
```html
<article class="service" data-reveal><b>06</b><div><h3>Pre-departure</h3><p>Orientation and preparation for life and study abroad.</p></div></article></div></div></section>
```
Replace with:
```html
<article class="service" data-reveal><b>06</b><div><h3>Pre-departure</h3><p>Orientation and preparation for life and study abroad.</p></div></article></div>
<div class="stat-strip" data-reveal><div class="stat"><b>52,799+</b><span>Bangladeshi students studying abroad in 2023 - up 119% from 24,112 in 2013.</span></div><div class="stat"><b>$667.77M</b><span>Annual spending on foreign education in FY25 - a 153% increase from FY21.</span></div><div class="stat"><b>$4.04B</b><span>2025 global education consulting market, projected to reach $6.34B by 2030.</span></div></div><p class="stat-source">Source: UNESCO Global Flow of Tertiary-Level Students, Bangladesh Bank, The Business Research Company.</p></div></section>
```

- [ ] **Step 4: Add a team preview strip and financial model preview before the final `green-section` contact block**

Find:
```html
<section class="section green-section"><div class="wrap location"><div data-reveal><div class="eyebrow">Study Insights</div><h3>Find the right fit, not just any destination.</h3><p>Study Insights exists to simplify the path to international education and support students who have the drive and dream to succeed.</p></div><div class="contact-list" data-reveal><a href="mailto:info@study-insights.com">info@study-insights.com</a><a href="tel:+8801318485287">+880 1318-485287</a><a href="contact.html">Contact the team →</a></div></div></section></main>
```
Replace with:
```html
<section class="section soft"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Who's behind it</div><h2 class="display">One team, <em>two missions.</em></h2><p class="lead">A shared leadership group runs both companies from Dhaka. Meet everyone on the team page.</p></div><div class="team-grid" data-reveal>
<article class="team-card"><div class="photo"><img src="public/biluibaba/sadman_bin_arif.jpg" alt="Sadman Bin Arif" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="fallback">SA</div></div><div class="info"><h4>Sadman Bin Arif</h4><span>CEO / Managing Director</span></div></article>
<article class="team-card"><div class="photo"><img src="public/biluibaba/dewan_abdullah_fahad.jpg" alt="Dewan Abdullah Fahad" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="fallback">DF</div></div><div class="info"><h4>Dewan Abdullah Fahad</h4><span>COO &amp; Co-Founder</span></div></article>
<article class="team-card"><div class="photo"><img src="public/study-insights/shah_sadad_ahmed.jpg" alt="Shah Sadad Ahmed" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="fallback">SS</div></div><div class="info"><h4>Shah Sadad Ahmed</h4><span>Counselor &amp; Head of Admissions</span></div></article>
</div><a class="text-link" href="team.html">View the full team →</a></div></section>
<section class="section dark"><div class="wrap statement-grid"><div data-reveal><div class="eyebrow">Funding the mission</div><h2 class="display">A transparent <em>financial model.</em></h2><p class="lead">The combined funding requirement across both companies, broken into one-time, monthly and yearly costs.</p><a class="text-link" href="financials.html">View the full financial model →</a></div><div class="metrics" data-reveal><div class="metric"><b>৳88L</b><span>Final funding commitment (BDT 8,800,000).</span></div><div class="metric"><b>৳15.5L</b><span>One-time setup costs.</span></div><div class="metric"><b>৳66L</b><span>12-month recurring costs.</span></div><div class="metric"><b>৳4.5L</b><span>Emergency reserve.</span></div></div></div></section>
<section class="section green-section"><div class="wrap location"><div data-reveal><div class="eyebrow">Study Insights</div><h3>Find the right fit, not just any destination.</h3><p>Study Insights exists to simplify the path to international education and support students who have the drive and dream to succeed.</p></div><div class="contact-list" data-reveal><a href="mailto:info@study-insights.com">info@study-insights.com</a><a href="tel:+8801318485287">+880 1318-485287</a><a href="contact.html">Contact the team →</a></div></div></section></main>
```

- [ ] **Step 5: Verify**

```
grep -c "service-photo" home/company.html
grep -c "52,799" home/company.html
grep -c "667.77M" home/company.html
grep -c "4.04B" home/company.html
grep -c "2027" home/company.html
grep -c "team.html" home/company.html
grep -c "financials.html" home/company.html
```
Expected: all `>= 1` (team.html/financials.html should now be `>= 4` counting nav+mobile+footer+new preview links from Task 1 and Step 4).

- [ ] **Step 6: Commit**

```bash
git add home/company.html
git commit -m "Add real service photos, market stats, milestones and team/financial previews to company.html"
```

---

### Task 6: Add Team and Financials teasers to `index.html`

**Files:**
- Modify: `home/index.html`

**Interfaces:**
- Consumes: `.team-grid`/`.team-card`, `.metrics`/`.metric` (already exists in brand.css) from Task 2 and existing brand.css.

- [ ] **Step 1: Insert teaser sections before the final `green-section` contact block**

Find in `home/index.html`:
```html
<section class="section green-section"><div class="wrap location"><div data-reveal><div class="eyebrow">Visit and connect</div><h3>Start with a conversation.</h3><p>Whether you are caring for a pet or planning a global academic journey, the right next step begins with clear, reliable information.</p></div><div class="contact-list" data-reveal><a href="mailto:info@biluibaba.com">info@biluibaba.com</a><a href="mailto:info@study-insights.com">info@study-insights.com</a><a href="tel:+8801318485287">+880 1318-485287</a><a href="contact.html">Contact page →</a></div></div></section></main>
```
Replace with:
```html
<section class="section dark"><div class="wrap statement-grid"><div data-reveal><div class="eyebrow">Meet the team</div><h2 class="display">One team, <em>two missions.</em></h2><p class="lead">A shared leadership group runs both companies from Dhaka, Bangladesh.</p><a class="text-link" href="team.html">View the full team →</a></div><div class="team-grid" data-reveal><article class="team-card"><div class="photo"><img src="public/biluibaba/sadman_bin_arif.jpg" alt="Sadman Bin Arif" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="fallback">SA</div></div><div class="info"><h4>Sadman Bin Arif</h4><span>CEO / Managing Director</span></div></article><article class="team-card"><div class="photo"><img src="public/study-insights/mahir_shariar_mahin.jpg" alt="Mahir Shariar Mahin" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="fallback">MM</div></div><div class="info"><h4>Mahir Shariar Mahin</h4><span>Head of Operation</span></div></article></div></div></section>
<section class="section soft"><div class="wrap"><div class="section-head" data-reveal><div class="eyebrow">Funding the mission</div><h2 class="display">A transparent <em>financial model.</em></h2><p class="lead">The full combined funding requirement for both companies is published openly.</p></div><div class="metrics" data-reveal><div class="metric"><b>৳88L</b><span>Final funding commitment (BDT 8,800,000).</span></div><div class="metric"><b>৳66L</b><span>12-month recurring operating cost.</span></div></div><a class="text-link" href="financials.html" style="display:inline-block;margin-top:26px">View the full financial model →</a></div></section>
<section class="section green-section"><div class="wrap location"><div data-reveal><div class="eyebrow">Visit and connect</div><h3>Start with a conversation.</h3><p>Whether you are caring for a pet or planning a global academic journey, the right next step begins with clear, reliable information.</p></div><div class="contact-list" data-reveal><a href="mailto:info@biluibaba.com">info@biluibaba.com</a><a href="mailto:info@study-insights.com">info@study-insights.com</a><a href="tel:+8801318485287">+880 1318-485287</a><a href="contact.html">Contact page →</a></div></div></section></main>
```

- [ ] **Step 2: Verify**

```
grep -c "team-grid" home/index.html
grep -c "View the full team" home/index.html
grep -c "View the full financial model" home/index.html
```
Expected: `1`, `1`, `1`.

- [ ] **Step 3: Commit**

```bash
git add home/index.html
git commit -m "Add team and financial model teaser sections to homepage"
```

---

### Task 7: Final cross-check against source PDFs and manual browse

**Files:** none modified — verification only.

**Interfaces:** none.

- [ ] **Step 1: Grep every page for the two companies' contact facts and confirm they match the PDFs exactly**

```
grep -o "info@biluibaba.com" home/*.html | sort | uniq -c
grep -o "info@study-insights.com" home/*.html | sort | uniq -c
grep -o "+8801318485287\|8801318485287" home/*.html | sort | uniq -c
```
Expected: matches found in `contact.html`, `index.html`, `team.html` (as applicable) — no typos, no alternate numbers.

- [ ] **Step 2: Confirm no leftover references to the removed/incorrect team title**

```
grep -rn "Head of Creative" home/*.html
```
Expected: no output.

- [ ] **Step 3: Confirm every internal link target file exists**

```
ls home/index.html home/company.html home/contact.html home/team.html home/financials.html home/assets/brand.css home/assets/brand.js home/favicon.svg
```
Expected: all files listed, no errors.

- [ ] **Step 4: Open each of the 5 pages in a browser (or via `start` on Windows) and visually confirm**

```
start "" "home/index.html"
start "" "home/company.html"
start "" "home/team.html"
start "" "home/financials.html"
start "" "home/contact.html"
```
Manually confirm for each: nav links work and highlight correctly, hero terrain renders, all photos load (no broken-image icons), financials charts render with correct colors, no layout overflow on a ~400px-wide resize.

- [ ] **Step 5: Final commit if any fixes were needed during verification**

```bash
git add -A
git commit -m "Fix verification issues found in final cross-check"
```
(Skip this commit if Step 4 found no issues.)

---

## Self-Review Notes

- **Spec coverage:** Task 1 covers nav/footer linking; Task 2 covers CSS foundations; Task 3 covers team.html rebuild + roster fix; Task 4 covers financials.html rebuild with unchanged figures; Task 5 covers company.html images/stats/milestones/previews; Task 6 covers index.html teasers; Task 7 covers final fact verification. All spec sections are represented.
- **Placeholder scan:** No TBD/TODO; all code blocks are complete, copy-pasteable HTML/CSS.
- **Type/name consistency:** `.service-photo`, `.team-grid`/`.team-card`, `.stat-strip`/`.stat`, `.ledger` class names are defined once in Task 2 and reused identically (verified spelling) across Tasks 3-6. Chart canvas IDs `cashChart`/`fundingChart` kept identical between old and new `financials.html` so no dangling references.
- Image paths with spaces are URL-encoded as `%20` in Task 5's `<img src>` attributes (`Vet%20Service.jpg`, `Pet%20Delivery.jpg`) since these are written as literal HTML attribute values in the plan text.
