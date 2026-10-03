import { QRCodeSVG } from 'qrcode.react'
import { useLang } from '../i18n.jsx'
import { isSampleWhatsapp, whatsappLink } from '../lib/contact.js'

// The catalogue's closing card: one QR that opens a WhatsApp chat with the atelier.
// `aside` is the copy shown beside the phone frame on a laptop, for scanning with a phone.
export default function CatalogueQR({ aside = false }) {
  const { t } = useLang()
  const link = whatsappLink(t.qrMsg)

  return (
    <section className={'qr' + (aside ? ' qr--aside' : '')} aria-label={t.qrTitle}>
      <p className="qr__label">{t.qrLabel}</p>
      <div className="qr__code">
        <QRCodeSVG value={link} size={160} level="M" marginSize={4}
          fgColor="currentColor" bgColor="transparent" title={t.qrTitle} />
      </div>
      <p className="qr__note">{aside ? t.qrAside : t.qrNote}</p>
      {!aside && (
        <a className="text-button qr__open" href={link} target="_blank" rel="noopener noreferrer">{t.qrOpen}</a>
      )}
      {isSampleWhatsapp && <em className="sample">{t.qrSample}</em>}
    </section>
  )
}
