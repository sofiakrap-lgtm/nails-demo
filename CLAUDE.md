# CLAUDE.md — Nails Lindes

Guidance for Claude Code (and humans) working in this repository.

## Project

**Nails Lindes** — marketing website for a Spain-based nail studio / nail
technician. Vintage-elegant, warm editorial brand. The site showcases
craftsmanship, a full service list with **transparent pricing**, a gallery, and
sends visitors to an **external booking platform (Booksy)** where they can pay
online or choose to pay on site.

- **Stack:** plain static **HTML + CSS + vanilla JS**. No build step, no
  dependencies, no framework. Open any `.html` file in a browser, or serve the
  folder with any static host (GitHub Pages, Netlify, Cloudflare Pages…).
- **Languages:** trilingual — **English (default) / Español / Русский** — via a
  lightweight client-side i18n layer (`assets/js/i18n.js`). One set of HTML;
  text is swapped by `data-i18n` keys. Choice is stored in `localStorage`.
- **Pages (separate files):** `index.html` (home), `services.html`,
  `pricing.html`, `gallery.html`, `booking.html`, `faq.html`, `contact.html`,
  `about.html`. The home page also has a client **testimonials carousel** and an
  **Instagram feed** strip (both trilingual; the feed links to the IG profile).

## Run / preview

No build. Pick one:

```bash
# Python (any 3.x)
python3 -m http.server 8000
# then open http://localhost:8000

# or Node
npx serve .
```

Opening `index.html` directly with `file://` also works, but a local server is
recommended so relative paths and fonts behave like production.

## Repository layout

```
.
├── index.html            # Home
├── services.html         # Full service catalogue
├── pricing.html          # Transparent price lists
├── gallery.html          # Work gallery (1:1 grid)
├── booking.html          # How booking + payment works → Booksy
├── faq.html              # Frequently asked questions (accordion)
├── contact.html          # Location, hours, map, contact form
├── about.html            # Story / brand / the technician
├── CLAUDE.md
├── README.md
└── assets/
    ├── css/styles.css     # Whole design system (tokens + components)
    ├── js/
    │   ├── config.js      # ⚙️  EDIT ME — booking URL, contact details, socials
    │   ├── i18n.js        # Translation dictionaries EN/ES/RU + switcher
    │   └── main.js        # Nav, mobile menu, marquee, gallery, year, etc.
    ├── logos/             # Brand logos (SVG)  — see logos/README.md
    ├── graphics/          # Decorative SVGs (florals, stripes, star, scallops)
    └── img/               # Photos (JPG/WEBP)  — see img/README.md
        └── gallery/       # Gallery photos
```

## Brand identity (do not drift from this)

### Colours — use exactly these (defined as CSS custom properties)

| Token            | Hex       | Role                                   |
|------------------|-----------|----------------------------------------|
| `--color-beige`  | `#F1EBDD` | Primary background (Light Beige)       |
| `--color-tan`    | `#D8C094` | Warm accent, stripes (Tan)             |
| `--color-silver` | `#CFC9B3` | Neutral surface, lines (Pale Silver)   |
| `--color-cadet`  | `#94A3AF` | Cool accent, subtle details (Cadet)    |
| `--color-stone`  | `#645A4E` | Secondary text, graphics (Stone Brown) |
| `--color-coffee` | `#2A1A13` | Primary text, dark surfaces (Coffee)   |

### Typography

- **Headings:** Instrument Serif (serif), weight 400. Wordmark in UPPERCASE.
- **Body:** Instrument Sans (sans-serif), weights 400/500/600, airy line-height.
- Sentence case everywhere **except** the wordmark and small labels, which are
  UPPERCASE. Loaded from Google Fonts in each page `<head>`.

### Voice / mood

Calm, timeless, premium but warm. Not clinical, not over-decorated.

## How things work

### Booking + contact details — one place to edit

`assets/js/config.js` holds the real-world values (Booksy URL, phone, email,
address, Instagram, opening hours, map embed). `main.js` injects them into every
element marked with the right hook, so you change them **once**:

- Any link with `data-book` → gets the Booksy URL as its `href`.
- Elements with `data-config="phone|email|address|instagram|whatsapp"` get
  filled in.

Until the studio's real Booksy page exists, `bookingUrl` is a placeholder
(`https://booksy.com/`). Replace it in `config.js`.

### Internationalisation

- Mark translatable text with `data-i18n="some.key"`.
- Translate an attribute with `data-i18n-attr="placeholder:some.key"`.
- Add the key to **all three** language objects in `assets/js/i18n.js`
  (`en`, `es`, `ru`). English is the fallback for missing keys.
- The language switcher lives in the header; selection persists in
  `localStorage` under `nl-lang` and sets `<html lang>`.

### Decorative dividers

- **Marquee / ticker** strips and **striped** + **scalloped** dividers are CSS
  components (`.marquee`, `.divider--stripe`, `.divider--scallop`). Reuse them
  between sections; don't hand-roll new ones.

## Working with assets (the user adds real files)

The user will drop brand files into `assets/`. When they do:

- **Logos (SVG)** → `assets/logos/`. Keep the existing filenames
  (`wordmark.svg`, `badge.svg`, `badge-dark.svg`) so the HTML keeps working, or
  update the references.
- **Graphics (SVG)** → `assets/graphics/`. Inline `currentColor` where possible
  so brand colours apply.
- **Photos (JPG)** → `assets/img/` (gallery shots in `assets/img/gallery/`).
  Convert to web-friendly format: prefer **WebP** (or optimised progressive
  JPG), target ≤ ~250 KB for full-width, ~120 KB for thumbnails, add `width`/
  `height` and `loading="lazy"`. Placeholder SVGs are in place until then.

Each `assets/*/README.md` lists expected filenames and sizes.

## Conventions

- Keep it dependency-free and accessible: semantic HTML, alt text, keyboard-
  navigable menu, visible focus states, `prefers-reduced-motion` respected.
- New page → copy an existing page's `<head>` + header + footer so the nav,
  i18n, and scripts stay identical.
- Don't introduce a framework or a bundler without being asked.

## Git

- Develop on branch **`claude/vibrant-gates-jetkxl`**.
- Commit with clear messages; push with `git push -u origin <branch>`.
- Do **not** open a pull request unless explicitly asked.
