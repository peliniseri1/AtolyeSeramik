import { useEffect, useRef } from 'react'
import { useLang } from '../i18n.jsx'
import { ChatIcon, MailIcon } from './Icons.jsx'

// A bottom sheet, the native pattern for "choose how to reply": WhatsApp first, email second.
export default function EnquirySheet({ product, onSend, onClose }) {
  const { lang, t } = useLang()
  const first = useRef(null)

  useEffect(() => {
    if (!product) return
    first.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [product, onClose])

  if (!product) return null
  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <button type="button" className="sheet__scrim" aria-label={t.cancel} onClick={onClose} />
      <div className={`sheet__panel glaze-${product.glaze}`}>
        <span className="sheet__grip" aria-hidden="true" />
        <p className="pencil-code">{product.code} · {product.name.tr}</p>
        <h2 className="sheet__title" id="sheet-title">{t.sheetTitle}</h2>
        <p className="sheet__note">{t.sheetNote}</p>
        <button ref={first} type="button" className="stamp stamp--wide" onClick={() => onSend('whatsapp')}>
          <ChatIcon size={20} /> {t.whatsapp}
        </button>
        <button type="button" className="ghost ghost--wide" onClick={() => onSend('email')}>
          <MailIcon size={20} /> {t.email}
        </button>
        <button type="button" className="text-button" onClick={onClose}>{t.cancel}</button>
        <span className="visually-hidden">{product.kind[lang]}</span>
      </div>
    </div>
  )
}
