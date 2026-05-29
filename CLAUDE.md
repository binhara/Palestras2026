# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A **multi-talk static site** of presentations by Alessandro De Oliveira Binhara, deployed on Vercel. No build system, dependencies, or tests — plain HTML/CSS/vanilla JS served as-is.

- The root `index.html` is a **landing page** that lists all talks. Its talk registry is the `TALKS` array inside the page's inline `<script>` — adding a talk means adding one object there.
- Each talk lives in its **own directory** (kebab-case slug) and is a self-contained presentation app.

The working language is **Brazilian Portuguese**. Keep content in Portuguese unless asked otherwise (some career artifacts — mock-interview prompts, the 3-min pitch — are intentionally in English because the talk teaches functional English).

## Layout

```
/index.html                     # landing; edit TALKS[] to register talks
/do-software-aos-dados/         # a talk (self-contained)
  index.html  styles.css  script.js
  assets/images/                # images, QR codes (qr-*.png), speaker photo
  curriculos/                   # PDFs linked from slides
  conteudo-palestra.txt         # the talk's source script
  _source/                      # original AI-generated images (not used at runtime)
/vercel.json  /README.md
```

## The presentation engine (per talk)

Each talk's `index.html` is a single page where every slide is a `<section class="slide" data-slide>`. `script.js` shows one at a time.

- **Slide numbering is dynamic**: `script.js` counts `[data-slide]` elements and renders the counter/progress bar. So inserting a slide anywhere "just works" at runtime — you do **not** need to renumber anything in JS.
- The `<!-- SLIDE N — TITLE -->` HTML comments are **only human bookkeeping**. When you insert a slide mid-deck, renumber the subsequent comments to match (cosmetic, but keep them in order).
- Navigation: `→`/space/click advances, `←` back, `Home`/`End`, `F` fullscreen, `#N` deep-links to slide N, touch swipe. `@media print` lays out one slide per page (1280×720) for PDF export.
- Visuals are driven by CSS component classes in `styles.css` (`.card`, `.feature-list`, `.pills`, `.timeline`, `.split`, `.ba-grid` for before/after, `.star-apply`/`.star-stack`, `.stats-2`, etc.). The dark palette + fonts are defined as `:root` custom properties — reuse them, don't hardcode colors.

## Conventions

- **QR codes** are generated locally with the Python `qrcode` lib (installed via `pip install --break-system-packages "qrcode[pil]"`), dark `#050B1A` modules on white, error-correction H, saved to a talk's `assets/images/qr-*.png`. Regenerate locally rather than hot-linking a QR web service (URLs expire).
- The speaker photo is **downloaded locally** (LinkedIn media URLs carry an expiry token) — don't hot-link it.
- Recurring narrative threads in "Do Software aos Dados": the speaker's first-person trajectory; the ~100 TB Hadoop Data Lake migration (the RDStation case, used for STAR/résumé before-after); the Buscapé recommendation platform (the STAR-applied example); and the CTAs **GU BigData & IA**, **English Talk Time (ETT)**, partner **Coders**. The deck also contrasts the speaker's real 2024 vs 2026 résumés (`curriculos/*.pdf`).

## Deploy

Static, no build. Vercel preset **Other**, empty build command, output directory `.` (root). Run locally with `python3 -m http.server` from the repo root and browse via HTTP (not `file://`) so PDF links and QR images resolve.
