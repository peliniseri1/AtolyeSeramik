import { useState } from 'react'
import { promises, useLang } from '../i18n.jsx'
import { useStore } from '../store.jsx'
import { sendRequest } from '../lib/contact.js'
import ProductImage from '../components/ProductImage.jsx'

export default function AtelierScreen() {
  const { lang, t } = useLang()
  const { addRequest } = useStore()
  const [when, setWhen] = useState(0)
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)

  const book = () => {
    const slot = t.visitOptions[when]
    sendRequest({ channel: 'whatsapp', subject: t.visitTitle, text: t.visitMsg(slot, name.trim()), payload: { kind: 'visit', lang, slot, name } })
    addRequest({ kind: 'visit', title: `${t.visitTitle} · ${slot}`, glaze: 'tenmoku' })
    setSent(true)
  }

  return (
    <div className="atelier">
      <div className="atelier__plate">
        <ProductImage src="/images/atelier.jpg" alt={t.atelierAlt} ratio="4 / 3" priority />
      </div>

      <div className="screen-pad">
        <h1 className="screen-title">{t.atelierTitle}</h1>
        <p className="pencil-code">İstanbul · {lang === 'tr' ? 'randevuyla' : 'by appointment'}</p>
        <p className="body-copy">{t.atelierStory}</p>

        <h2 className="section-title section-title--small">{t.promisesTitle}</h2>
        <ul className="promises">
          {promises.map((p) => (
            <li key={p.title.en} className={p.kintsugi ? 'promise promise--kintsugi' : 'promise'}>
              {p.kintsugi && (
                <svg className="seam" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 14 38 9 61 16 97 6 128 13 150 10 171 18 205 7 236 15 262 9 300 13" />
                </svg>
              )}
              <h3>{p.title[lang]}</h3>
              <p>{p.text[lang]}</p>
            </li>
          ))}
        </ul>

        <section className="visit" aria-labelledby="visit-title">
          <h2 className="section-title section-title--small" id="visit-title">{t.visitTitle}</h2>
          <fieldset className="quiz__step">
            <legend className="field-label">{t.visitWhen}</legend>
            <div className="choices">
              {t.visitOptions.map((label, i) => (
                <label key={label} className="choice">
                  <input type="radio" name="visit-when" checked={when === i} onChange={() => setWhen(i)} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="field">
            <span>{t.yourName}</span>
            <input type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <button type="button" className="stamp stamp--wide" onClick={book}>{t.visitSend}</button>
          {sent && <p className="pencil-note" role="status">{t.sentNote}</p>}
        </section>
      </div>
    </div>
  )
}
