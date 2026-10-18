// Shared by api/order.js and api/stock-alert.js: checks a form again on the server, then forwards it to a webhook.
// The webhook URLs are server-only env vars (ORDER_WEBHOOK_URL, STOCK_WEBHOOK_URL): they never reach the browser.
// Files starting with "_" in api/ are not deployed as functions of their own.
import { products } from '../src/data/products.js'
import { LIMITS, cleanText, isEmail, isPhone } from '../src/lib/sanitize.js'

const KINDS = {
  order: { env: 'ORDER_WEBHOOK_URL', contact: 'phone', valid: isPhone, inStock: true },
  'stock-alert': { env: 'STOCK_WEBHOOK_URL', contact: 'email', valid: isEmail, inStock: false },
}

const json = (body, status = 200) => Response.json(body, { status })

export async function forward(request, kind) {
  const rule = KINDS[kind]
  const url = process.env[rule.env]
  if (!url) return json({ error: 'not-configured' }, 503)
  if (Number(request.headers.get('content-length')) > 4096) return json({ error: 'too-large' }, 413)

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'bad-json' }, 400)
  }

  // never trust the browser: rebuild the payload from known pieces and cleaned text only
  const piece = products.find((p) => p.id === body?.product)
  const name = cleanText(body?.name, LIMITS.name)
  const contact = cleanText(body?.[rule.contact], LIMITS.contact)
  const ok = piece && name && rule.valid(contact) && body.kvkkConsent === true
    && ['tr', 'en'].includes(body.lang) && (piece.stock > 0) === rule.inStock
  if (!ok) return json({ error: 'invalid' }, 422)

  const payload = {
    kind, lang: body.lang, code: piece.code, product: piece.id, name, [rule.contact]: contact,
    kvkkConsent: true, source: body.source === 'mobile' ? 'mobile' : 'web', submittedAt: new Date().toISOString(),
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    })
    return res.ok ? json({ ok: true }) : json({ error: 'upstream' }, 502)
  } catch {
    return json({ error: 'upstream' }, 502)
  }
}
