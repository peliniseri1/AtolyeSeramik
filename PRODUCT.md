# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React web app in `atolye-app/`, styled to look and behave like a mobile app (phone format, bottom tab bar). This was confirmed by the user on 2026-10-03; the course assignment asks for the HTML to be converted to React with ProductImage, ProductCard and ProductList components. It is not React Native. The earlier static HTML page remains in the project root. Enquiry and commission submissions will later be wired to an n8n webhook; for now they hand off to WhatsApp and email.

## Users

Affluent collectors of craft, design and art objects, mostly arriving on a phone from Instagram or WhatsApp; secondarily interior architects and gallery buyers on desktop. They are deciding whether a handmade piece is worth a premium price and whether to start a personal conversation with the maker. They buy provenance, rarity and story, never discounts.

## Product Purpose

Present Studio Atölye Seramik's handmade ceramics as collectable works and turn interest into a personal conversation: an enquiry about an existing piece, or a commission for a bespoke one. Success is a qualified enquiry or commission request reaching the maker.

## Positioning

One maker, one Istanbul atelier, every piece by the same hands. Wall panels carry a story or theme like a narrative artwork; functional pieces (dinnerware, lampshades, vases) carry named motifs such as floral and spring. Bespoke commissions are shaped through a conversation with the maker, not a configurator.

## Operating Context

- Collections: Wall Panels (flagship, story-led), Dinnerware Sets, Lampshades, Vase Sets.
- Materials: stoneware and porcelain.
- Atelier in Istanbul; visits by appointment.
- Enquiry channels: WhatsApp first, email second; n8n automation later.
- Commission flow: a short, one-question-per-step questionnaire (piece, motif/theme, colour mood, occasion, timing, contact). No budget question.

## Capabilities and Constraints

- Bilingual: Turkish and English, with a language switch.
- Mobile-first; must also hold up on desktop.
- Prices: placeholder values for now, clearly marked for replacement. Wall panels and commissions may use "price on request".
- No cart, checkout, discounts or stock-urgency devices.
- Undecided: real piece names, final prices, WhatsApp number, email address, n8n endpoint.

## Brand Commitments

- Name: **Studio Atölye Seramik**.
- Voice: gallery catalogue — understated, sensory, specific; scarcity stated through facts, never urgency.
- Binding: the site must not feel like an online shop.
- First impression: a single hero piece shown as an artwork.

## Evidence on Hand

Product photos for all four pieces are in `product_photos/` (the Fener and Lale pieces share one image), with cropped, caption-free versions in `atolye-app/public/images/`. There is only a lit photo of Fener, and no atelier or maker photo yet, so the atelier keeps its placeholder. The four default pieces, their stories, specs, editions and the service promises (signed and numbered, certificate of authenticity, personal inscription, kintsugi repair promise, gift box) are **sample content authored with the user's permission** and must be confirmed before launch. No testimonials, press or client names exist; none may be invented.

## Product Principles

1. The object leads; the interface recedes.
2. Every piece is a story with a name, never a SKU.
3. The conversation is the checkout.
4. Facts make it rare: material, firing, edition, hours.
5. Equal care in both languages.
