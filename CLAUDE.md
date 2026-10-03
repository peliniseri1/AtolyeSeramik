# Atölye Seramik: Website

A website showing handmade ceramic works to affluent collectors. Every piece is made by hand, comes in small numbers and is priced to match. The site should feel like a private **gallery**: calm, unhurried, confident. Think of a quiet luxury brand or a museum catalogue, not a store.

When a design choice is unclear, ask: *would a high-end gallery do this?* Choose the more restrained option.

## Audience

Wealthy buyers who collect craft, design and art objects. They buy because of provenance, rarity and story, not discounts. They expect:
- The **maker** and the **process** to be visible: hands, clay, kiln, time.
- Each piece to be presented as a single object with a name and a story.
- A personal relationship. They make enquiries and commissions; they do not fill a shopping cart.

## Collections

Each collection gets its own section or page. Each piece within it has a name, a short story, dimensions, materials and glaze, edition or "one of a kind", and lead time.

| Collection | How to present it |
|---|---|
| **Wall Panels** | The flagship. Each panel tells a story or carries a theme. Show it large, give it a title, and write a paragraph telling its story the way a museum label would. Include a detail crop of the texture and a photo of it installed in a room for scale. |
| **Dinnerware Sets** | Shown as a full table setting, then piece by piece. Name the motif (e.g. *Spring*, *Floral*). List what the set contains. |
| **Lampshades** | Show them lit and unlit. The light through the clay is the point. |
| **Vase Sets** | Shown as a group composition, then each vase alone. Lead with the motif's story (floral, spring, etc.). |

New collections follow the same pattern: a story first, then the objects.

## Design Language

**Whitespace is the luxury.** Generous margins, one idea per screen, few elements. Images carry the page; text supports them.

- **Palette:** colours taken from the material. Warm off-white (unglazed porcelain), deep charcoal or near-black (reduction-fired clay), one muted accent drawn from the glazes (celadon, ochre or terracotta). Define them all as CSS custom properties on `:root`. Use the accent sparingly: links, thin rules, small details.
- **Typography:** an elegant high-contrast serif for headings (e.g. *Cormorant Garamond* or *Playfair Display*), a clean light sans-serif for body text (e.g. *Jost* or *Inter*). Large headings, small letter-spaced uppercase labels, comfortable line height (~1.7) for body text. Use at most two typefaces.
- **Imagery:** full-bleed hero photography, soft natural light, neutral backgrounds, close-up texture shots. Use consistent aspect ratios within a grid. Until real photos exist, use neutral placeholder blocks with the intended shot described in the `alt` text, e.g. `alt="Wall panel 'Harvest', detail of carved wheat relief"`.
- **Motion:** slow and subtle. Use gentle fades and slight upward reveals on scroll (≈600–900 ms, ease-out) and a slow image zoom on hover. Respect `prefers-reduced-motion`.
- **Layout:** asymmetric editorial grids, as in a printed art book. Thin hairline dividers, not boxes and shadows.

## Voice & Copy

Write like a gallery catalogue: understated, sensory, specific. Name the clay, the glaze, the firing, the hours. Make things sound scarce with facts ("one of three", "fired twice at 1240 °C"), not with urgency. Speak to the reader as a fellow collector.

## Commerce

- Show prices discreetly in small type, or as "Price on request" for wall panels and commissions.
- The main call to action on every piece is **Enquire** (or **Commission a piece**). It opens a short, elegant enquiry form: name, email, piece of interest, message.
- Add a **Commissions** section explaining bespoke work: consultation → sketch → making → delivery, with lead times.
- Trust signals: the maker's story, the atelier, care instructions, worldwide insured shipping, a certificate of authenticity.

## Suggested Site Structure

1. **Hero:** one striking image, the brand name and a single line.
2. **The Atelier:** the maker, the philosophy, process photography.
3. **Collections:** Wall Panels, Dinnerware, Lampshades, Vases.
4. **Piece detail:** gallery of images, story, specifications, Enquire.
5. **Commissions**
6. **Contact:** enquiry form, studio location, social links.

## Technical

- **The main deliverable is `atolye-app/`: a Vite + React web app in phone format** (full-screen on a phone, inside a phone frame on larger screens). It is not React Native or Expo. Run it with `npm run dev`, and run `npm run lint` and `npm run build` before calling work done.
- The required components are `ProductImage` (a photo, or the "Fotoğraf yakında" placeholder when there is none), `ProductCard` (one piece: name, code, story, specs, price, Sorun button) and `ProductList` (the four-piece catalogue). They live in `atolye-app/src/components/`. Screens live in `src/screens/`, products in `src/data/products.js`, and every TR/EN string in `src/i18n.jsx`.
- Product photos live in `atolye-app/public/images/`. They are cut from the originals in `product_photos/` by `atolye-app/scripts/crop-photos.ps1`, which also removes the baked-in captions.
- The root `index.html`, `css/` and `js/` are the earlier static one-page website, kept for reference. It is no longer the main deliverable.
- Load fonts from Google Fonts with `display=swap`.
- Images: modern formats (WebP/AVIF) with `srcset`, `loading="lazy"` below the fold, and explicit `width`/`height` to avoid layout shift. Write descriptive `alt` text for every image.
- Mobile-first and fully responsive. Most collectors will first see the site on a phone, so it must look just as premium there.
- Accessible: semantic HTML (`header`, `nav`, `main`, `section`, `footer`), visible focus states, AA contrast, keyboard-navigable galleries.
- SEO: a unique `<title>` and meta description per page, Open Graph tags with a hero image, and `Product` structured data for pieces.

## Definition of Done for a Page

A page is finished when every one of these holds:
- [ ] It reads as a gallery, with whitespace dominant and images leading.
- [ ] Every piece has a name, a story, its specifications and an Enquire action.
- [ ] It looks considered at 375 px, 768 px and 1440 px widths.
- [ ] All colours come from the `:root` tokens and all fonts from the two chosen typefaces.
- [ ] Animations respect `prefers-reduced-motion`.
- [ ] Every image has meaningful `alt` text.
