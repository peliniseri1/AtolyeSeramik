# Atölye Seramik

A phone-format web app presenting handmade ceramic works: wall panels, dinnerware sets, lampshades and vases. Each piece is shown with its name, story, specifications and an enquiry action.

## Run

```
cd atolye-app
npm install
npm run dev
```

Before shipping, run `npm run lint` and `npm run build`.

## Structure

- `atolye-app/`: the main app (Vite + React)
  - `src/components/`: `ProductImage`, `ProductCard`, `ProductList` and other components
  - `src/screens/`: one screen per tab
  - `src/data/products.js`: the catalogue
  - `src/i18n.jsx`: every Turkish and English string
- `.claude/skills/atolye-standards/`: component standards and webhook format for Claude Code
- `index.html`, `css/`, `js/`: the earlier static one-page site, kept for reference
- `product_photos/`: original product photographs
