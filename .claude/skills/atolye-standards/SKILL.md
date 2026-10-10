---
name: atolye-standards
description: Component standards and webhook payload format for the atolye-app React app. Use when adding or changing a component, screen or product in atolye-app/src, or when touching sendRequest / the n8n webhook payload.
---

# Atölye Seramik: component and webhook standards

Applies to `atolye-app/` (Vite + React, phone format). The design rules live in the root `CLAUDE.md`; this file covers how the code is built.

## Component standards

### Where things live

| What | Where |
|---|---|
| Reusable pieces (`ProductImage`, `ProductCard`, `ProductList`, sheets, icons) | `src/components/` |
| One file per tab (`CollectionScreen`, `CommissionScreen`, ...) | `src/screens/` |
| Pieces of the catalogue | `src/data/products.js` |
| Every TR/EN string | `src/i18n.jsx`, both the `tr` and `en` blocks |
| Shared state (favourites, requests, `openEnquiry`) | `src/store.jsx`, read with `useStore()` |
| Outgoing requests | `src/lib/contact.js` → `sendRequest` |

### Rules for every component

1. **One default-exported function component per file**, named like the file (`ProductCard.jsx` → `export default function ProductCard`).
2. **Open with a one or two line comment** saying what the component is, in the catalogue voice (see `ProductCard.jsx`).
3. **Text comes from `useLang()`**: `const { lang, t } = useLang()`. Put new strings in both `tr` and `en` in `i18n.jsx`; strings that take values are functions (`enquireAbout: (name) => ...`).
4. **Bilingual data is an object `{ tr, en }`** and is read with `[lang]`. The exception is a piece's display name: it is always shown in Turkish, `product.name.tr`, with `name.en` as the `lang="en-GB"` subtitle.
5. **Styling is a BEM class plus a glaze class**: `className={`tile glaze-${product.glaze}`}`, with `block__element` and `block--modifier`. Colours and fonts come only from the `:root` tokens in `src/index.css` (`--clay`, `--celadon`, `--display`, `--text`, `--pencil`, ...). Put styles in the CSS file, not inline; the one inline style allowed is `aspectRatio`.
6. **Images go through `ProductImage`**, never a bare `<img>` for a piece. Pass `alt` in the current language and set `priority` only for the first image on screen; everything else is lazy. `src: null` is valid and shows the "Fotoğraf yakında" frame.
7. **Semantic, keyboard-reachable markup**: `article`, `section`, `figure`, `dl` for specs, and `<button type="button">` for every action. A toggle has `aria-pressed`; an icon-only button has `aria-label`; a dialog has `role="dialog"`, `aria-modal` and closes on Escape.
8. **Motion honours reduced motion**: scroll with `behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'`; CSS animations sit behind `@media (prefers-reduced-motion: no-preference)`.
9. **The main action on a piece is `Sorun` / `Enquire`** and calls `openEnquiry(product)` from the store. A product view never adds a cart, a quantity or "buy now".

### Product shape (`src/data/products.js`)

Every piece has all of these fields:

```js
{
  id: 'hasat',                 // kebab-case, also the DOM id `piece-${id}`
  code: 'H-01',                // letter + two digits, shown in pencil
  glaze: 'tenmoku',            // tenmoku | celadon | porcelain | copper: picks the glaze-* class
  images: [{ src, alt: { tr, en } }],  // images[0] is the cover; src may be null
  ratio: '4 / 5',              // one aspect ratio for all of a piece's images
  name: { tr, en },
  kind: { tr, en },            // e.g. "Hikâyeli duvar panosu"
  codeLine: { tr, en },        // clay, glaze · firing temperature
  story: { tr, en },           // museum-label paragraph with facts, not urgency
  specs: [{ label: { tr, en }, value: { tr, en } }],  // include size and edition
  price: 6800,                 // number in EUR; formatPrice() formats it
}
```

### Done for a component change

Done means: both `tr` and `en` render, it looks right at 375 px, and `npm run lint` and `npm run build` in `atolye-app/` both pass.

## Webhook format

`sendRequest({ channel, subject, text, payload })` in `src/lib/contact.js` opens WhatsApp or email and, when `CONFIG.n8nWebhook` is set, also POSTs JSON to it. Every call site sends the same envelope, so n8n can route on `kind`.

### Envelope

```json
{
  "channel": "whatsapp",
  "subject": "H-01 · Hasat",
  "text": "Merhaba, H-01 Hasat hakkında bilgi almak istiyorum.",
  "kind": "enquiry",
  "lang": "tr",
  "submittedAt": "2026-10-03T14:22:05.000Z"
}
```

| Field | Type | Set by | Notes |
|---|---|---|---|
| `channel` | `"whatsapp"` \| `"email"` | caller | The channel the visitor chose |
| `subject` | string | caller | `<code> · <name>`; the email subject |
| `text` | string | caller | The exact message sent to WhatsApp or email |
| `kind` | `"enquiry"` \| `"commission"` \| `"visit"` | caller, in `payload` | **Required**; n8n routes on it |
| `lang` | `"tr"` \| `"en"` | caller, in `payload` | The language of the reply |
| `submittedAt` | ISO 8601 string | `sendRequest` | Set automatically; callers never pass it |

### Fields per `kind`

| `kind` | Extra fields in `payload` |
|---|---|
| `enquiry` | `code` (piece code, e.g. `"H-01"`) |
| `commission` | `code` (`"K-<n>"`), `piece`, `motif`, `mood`, `occasion`, `when`, `note`, `name`, `contact`, `kvkkConsent` (always `true`: the form cannot send without KVKK consent) |
| `visit` | `slot`, `name` |

### Rules

1. Payload keys are camelCase English and flat: no nested objects, so n8n can map them straight to columns.
2. Values are the stored option values (e.g. `"wall-panel"`), not translated labels; the readable version is already in `text`.
3. A new request type adds a new `kind`, a row in the table above, and a call to `sendRequest`, in that order.
4. The webhook call stays fire-and-forget: a failed POST is swallowed so the WhatsApp/email hand-off always happens.
5. The webhook URL lives only in `CONFIG.n8nWebhook`; no secrets in the payload. Adding it also means adding its origin to `connect-src` in `atolye-app/vercel.json`.
6. Free text a visitor types goes through `cleanText` (`src/lib/sanitize.js`) with its `LIMITS` before it reaches `sendRequest`; choices are sent as their option `value`, never as typed text. A form that collects a name shows `KvkkConsent` and cannot send until it is ticked, and it sends only once.
7. Whatever stores these requests (n8n, a database) must write with parameterised queries and escape on output; the client clean-up is defence in depth, not the SQL-injection fix.
