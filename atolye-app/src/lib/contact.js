// Contact settings: replace before launch.
// The real WhatsApp number lives in atolye-app/.env.local as VITE_WHATSAPP, which is never committed.
const SAMPLE_WHATSAPP = '905000000000'

export const CONFIG = {
  whatsapp: import.meta.env.VITE_WHATSAPP || SAMPLE_WHATSAPP, // international format, digits only
  email: 'pelinsibel2000@gmail.com',
  n8nWebhook: '', // later: your n8n webhook URL; when set, every request is also POSTed there.
  // Also add its origin to connect-src in atolye-app/vercel.json, or the Content-Security-Policy blocks the POST.
  // The two order forms each post to their own webhook, set in .env.local (webhook.site for now, n8n later).
  orderWebhook: import.meta.env.VITE_ORDER_WEBHOOK || '',
  stockWebhook: import.meta.env.VITE_STOCK_WEBHOOK || '',
}

// Posts one form straight to a webhook and resolves true once it has been delivered, false otherwise.
// Sent as text/plain with no-cors: a "simple" request needs no CORS preflight, which webhook.site does not answer.
// The body is still JSON. The reply is opaque, so true means "reached the server", not "the server said 200".
export async function postWebhook(url, payload) {
  if (!url) return false
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
    })
    return true
  } catch {
    return false
  }
}

export const isSampleWhatsapp = CONFIG.whatsapp === SAMPLE_WHATSAPP

export const whatsappLink = (text) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`

export const mailLink = (subject, body) =>
  `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

// Hands a request to WhatsApp or email, and to n8n when a webhook is configured.
export async function sendRequest({ channel, subject, text, payload }) {
  if (CONFIG.n8nWebhook) {
    try {
      await fetch(CONFIG.n8nWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel, subject, text, ...payload, submittedAt: new Date().toISOString() }),
      })
    } catch {
      // the WhatsApp / email hand-off below still delivers the request
    }
  }
  if (channel === 'whatsapp') window.open(whatsappLink(text), '_blank', 'noopener')
  else window.location.href = mailLink(subject, text)
}
