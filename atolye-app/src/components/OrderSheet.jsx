import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n.jsx'
import { useStore } from '../store.jsx'
import { CONFIG, postWebhook } from '../lib/contact.js'
import { LIMITS, cleanText, isEmail, isPhone } from '../lib/sanitize.js'
import KvkkConsent from './KvkkConsent.jsx'

// The order sheet: for a piece in stock it takes a name and phone ("Sipariş ver"),
// for a sold-out piece a name and email ("Stok bildirimi iste"). Each posts to its own webhook.
export default function OrderSheet({ product, onClose }) {
  const { lang, t } = useLang()
  const { addRequest } = useStore()
  const first = useRef(null)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [consent, setConsent] = useState(false)
  const [showError, setShowError] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | done | failed

  useEffect(() => {
    first.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const soldOut = product.stock === 0
  const pieceName = product.name.tr
  const clean = { name: cleanText(name, LIMITS.name), contact: cleanText(contact, LIMITS.contact) }
  const nameMissing = !clean.name
  const contactInvalid = soldOut ? !isEmail(clean.contact) : !isPhone(clean.contact)

  const send = async (e) => {
    e.preventDefault()
    if (status === 'sending' || status === 'done') return // only once
    if (nameMissing || contactInvalid) return setShowError(true)
    if (!consent) return // KVKK: nothing leaves without consent
    setStatus('sending')
    const kind = soldOut ? 'stock-alert' : 'order'
    const base = { kind, lang, code: product.code, product: product.id, name: clean.name }
    const ok = soldOut
      ? await postWebhook(CONFIG.stockWebhook, { ...base, email: clean.contact, kvkkConsent: true })
      : await postWebhook(CONFIG.orderWebhook, { ...base, phone: clean.contact, kvkkConsent: true })
    if (!ok) return setStatus('failed')
    addRequest({ kind, title: `${product.code} · ${pieceName}`, glaze: product.glaze })
    setStatus('done')
  }

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="order-title">
      <button type="button" className="sheet__scrim" aria-label={t.cancel} onClick={onClose} />
      <div className={`sheet__panel sheet__panel--form glaze-${product.glaze}`}>
        <span className="sheet__grip" aria-hidden="true" />
        <p className="pencil-code">{product.code} · {pieceName}</p>

        {status === 'done' ? (
          <div className="order-done" role="status">
            <h2 className="sheet__title" id="order-title">{soldOut ? t.notifyDoneTitle : t.orderDoneTitle}</h2>
            <p className="sheet__note">{soldOut ? t.notifyDoneNote(pieceName) : t.orderDoneNote(pieceName)}</p>
            <button ref={first} type="button" className="stamp stamp--wide" onClick={onClose}>{t.close}</button>
          </div>
        ) : (
          <form className="order-form" onSubmit={send} noValidate>
            <h2 className="sheet__title" id="order-title">{soldOut ? t.notifyTitle : t.orderTitle}</h2>
            <p className="sheet__note">{soldOut ? t.notifyNote : t.orderNote}</p>
            <label className="field">
              <span>{t.yourName}</span>
              <input ref={first} type="text" autoComplete="name" value={name} maxLength={LIMITS.name}
                aria-invalid={showError && nameMissing} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="field">
              <span>{soldOut ? t.emailLabel : t.phoneLabel}</span>
              <input type={soldOut ? 'email' : 'tel'} autoComplete={soldOut ? 'email' : 'tel'} inputMode={soldOut ? 'email' : 'tel'}
                value={contact} maxLength={LIMITS.contact} aria-invalid={showError && contactInvalid}
                onChange={(e) => setContact(e.target.value)} />
            </label>
            {showError && (nameMissing || contactInvalid) && (
              <p className="field-error" role="alert">{soldOut ? t.notifyError : t.orderError}</p>
            )}

            <KvkkConsent checked={consent} onChange={setConsent} />

            {status === 'failed' && <p className="field-error" role="alert">{t.sendFailed}</p>}
            <button type="submit" className="stamp stamp--wide" disabled={!consent || status === 'sending'}>
              {status === 'sending' ? t.sending : soldOut ? t.notifySend : t.orderSend}
            </button>
            <button type="button" className="text-button" onClick={onClose}>{t.cancel}</button>
            <span className="visually-hidden">{product.kind[lang]}</span>
          </form>
        )}
      </div>
    </div>
  )
}
