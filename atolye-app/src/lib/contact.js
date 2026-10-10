// Contact settings: replace before launch.
// The real WhatsApp number lives in atolye-app/.env.local as VITE_WHATSAPP, which is never committed.
const SAMPLE_WHATSAPP = '905000000000'

export const CONFIG = {
  whatsapp: import.meta.env.VITE_WHATSAPP || SAMPLE_WHATSAPP, // international format, digits only
  email: 'atelier@example.com',
  n8nWebhook: '', // later: your n8n webhook URL; when set, every request is also POSTed there.
  // Also add its origin to connect-src in atolye-app/vercel.json, or the Content-Security-Policy blocks the POST.
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
