// The phone cannot reach the laptop's localhost, so it uses the live site's server functions
// (atolye-app/api/order.js, api/stock-alert.js). They hold the webhook URLs; the app never sees them.
export const SITE = 'https://atolye-seramik.vercel.app'
// the same address as CONFIG.email in atolye-app/src/lib/contact.js, which reads Vite-only env vars and so is not shared
export const ATELIER_EMAIL = 'pelinsibel2000@gmail.com'

// Resolves true once the server has forwarded the form and the webhook accepted it.
export async function postForm(path, payload) {
  try {
    const res = await fetch(`${SITE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, source: 'mobile' }),
    })
    return res.ok
  } catch {
    return false
  }
}

// product photos are served by the live site too: '/images/x.jpg' → 'https://…/images/x.jpg'
export const imageUri = (src) => `${SITE}${src}`
