# Nails Lindes

Marketing website for **Nails Lindes** — a boutique nail studio in Spain.
Vintage-elegant, warm and editorial. Built as a fast, dependency-free static
site, trilingual (English / Español / Русский), with transparent pricing and
online booking through **Booksy**.

![Nails Lindes](assets/img/hero.svg)

## Highlights

- **7 pages:** Home, Services, Pricing, Gallery, Booking, About, Contact.
- **Trilingual** with an instant in-page language switcher (EN / ES / RU); the
  choice is remembered between visits.
- **Transparent pricing** page with tabbed categories.
- **External booking + payment** via Booksy — pay online or in the studio.
- **Brand-true design system:** exact palette, Cormorant Garamond + Raleway,
  floral-arch motifs, marquee tickers and striped / scalloped dividers.
- **Accessible & responsive:** semantic HTML, keyboard-friendly menu, visible
  focus, `prefers-reduced-motion` support, lazy-loaded images.
- **No build step, no dependencies.**

## Quick start

```bash
# from the project root
python3 -m http.server 8000
# open http://localhost:8000
```

Or just open `index.html` in a browser.

## Make it yours

1. **Booking + contact details:** edit `assets/js/config.js` (Booksy URL, phone,
   email, address, Instagram, map). Used everywhere automatically.
2. **Logos / graphics / photos:** drop real files into `assets/logos`,
   `assets/graphics`, `assets/img` (see each folder's `README.md`). Placeholders
   are in place until then.
3. **Text:** edit translations in `assets/js/i18n.js` (`en`, `es`, `ru`).
4. **Prices:** edit the numbers directly in `pricing.html`.

## Deploy

Any static host works — GitHub Pages, Netlify, Cloudflare Pages, Vercel. Point
it at the repo root; there is nothing to build.

See [`CLAUDE.md`](CLAUDE.md) for full architecture and conventions.
