# Photos

Studio and work photos go here. The site currently uses **SVG placeholders** so
it looks complete — swap them for real images when ready.

## Recommended formats & sizes

- **Format:** WebP preferred (best quality-to-size), or optimised progressive
  JPG. Convert before committing.
- **Hero (`hero`)** — landscape, ~1600×1000, ≤ ~250 KB.
- **Portraits (`portrait-0x`)** — 4:5, ~800×1000, ≤ ~180 KB. Used in splits,
  about, services.
- **Band (`band-0x`)** — 3:4, ~600×800, ≤ ~150 KB. Full-bleed 4-up strip.
- **Gallery (`gallery/0x`)** — square 1:1, ~800×800, ≤ ~120 KB each.

## How to swap

1. Drop your file in, keeping the same name (e.g. `hero.webp`), **or** add a new
   name and update the `src` in the HTML.
2. Keep `width`/`height` attributes and `loading="lazy"` on `<img>` for
   performance and to avoid layout shift.
3. Tell Claude when files are in — it can convert/resize and rewire references.

## Current placeholders

`hero` · `portrait-01…06` · `band-01…04` · `gallery/01…12` (all `.svg`).
