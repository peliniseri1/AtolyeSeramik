import { useState } from 'react'
import { useLang } from '../i18n.jsx'
import { useStore } from '../store.jsx'
import { sendRequest } from '../lib/contact.js'
import { LIMITS, cleanText, isContact } from '../lib/sanitize.js'
import CommissionTile from '../components/CommissionTile.jsx'
import KvkkConsent from '../components/KvkkConsent.jsx'

const L = (tr, en) => ({ tr, en })

const steps = [
  {
    name: 'piece',
    question: L('Ne hayal ediyorsunuz?', 'What do you have in mind?'),
    options: [
      { value: 'wall-panel', label: L('Duvar panosu', 'Wall panel') },
      { value: 'dinnerware', label: L('Yemek takımı', 'Dinnerware set') },
      { value: 'lampshade', label: L('Abajur', 'Lampshade') },
      { value: 'vases', label: L('Vazo seti', 'Vase set') },
      { value: 'unsure', label: L('Henüz emin değilim', 'Not sure yet') },
    ],
  },
  {
    name: 'motif',
    question: L('Hangi hikâyeyi anlatsın?', 'Which story should it tell?'),
    note: true,
    options: [
      { value: 'floral', label: L('Çiçekler', 'Flowers') },
      { value: 'spring', label: L('İlkbahar', 'Spring') },
      { value: 'family', label: L('Bir aile hikâyesi', 'A family story') },
      { value: 'place', label: L('Sevdiğiniz bir yer', 'A place you love') },
      { value: 'own', label: L('Kendi fikrim', 'My own idea') },
    ],
  },
  {
    name: 'mood',
    question: L('Hangi renk duygusu?', 'Which colour mood?'),
    options: [
      { value: 'earth', glaze: 'tenmoku', label: L('Toprak: tenmoku', 'Earthy: tenmoku') },
      { value: 'soft', glaze: 'celadon', label: L('Yumuşak ve açık: seladon', 'Soft and light: celadon') },
      { value: 'pure', glaze: 'porcelain', label: L('Saf beyaz ve kobalt', 'Pure white and cobalt') },
      { value: 'deep', glaze: 'copper', label: L('Derin: bakır kırmızısı', 'Deep: copper red') },
      { value: 'artist', glaze: 'kintsugi', label: L('Sanatçı seçsin', "Artist's choice") },
    ],
  },
  {
    name: 'occasion',
    question: L('Ne için?', 'What is the occasion?'),
    options: [
      { value: 'home', label: L('Kendi evim için', 'For my home') },
      { value: 'wedding', label: L('Düğün hediyesi', 'A wedding gift') },
      { value: 'newhome', label: L('Yeni bir ev', 'A new home') },
      { value: 'corporate', label: L('Kurumsal hediye', 'A corporate gift') },
    ],
  },
  {
    name: 'when',
    question: L('Ne zaman ve size nasıl ulaşayım?', 'When, and how shall I reach you?'),
    contact: true,
    options: [
      { value: '3m', label: L('3 ay içinde', 'Within 3 months') },
      { value: '6m', label: L('6 ay içinde', 'Within 6 months') },
      { value: 'open', label: L('Acelem yok', 'No rush') },
    ],
  },
]

// a two-digit tile number, assigned once when the first answer is chosen
const newTileCode = () => String(10 + Math.floor(Math.random() * 89))

const empty = { piece: '', motif: '', mood: '', occasion: '', when: '', note: '', name: '', contact: '' }

export default function CommissionScreen() {
  const { lang, t } = useLang()
  const { addRequest } = useStore()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState(empty)
  const [code, setCode] = useState(null)
  const [showError, setShowError] = useState(false)
  const [done, setDone] = useState(false)
  const [sent, setSent] = useState(false)
  const [consent, setConsent] = useState(false)

  const step = steps[index]
  const optionOf = (name) => steps.find((s) => s.name === name).options.find((o) => o.value === answers[name])
  const labelOf = (name) => optionOf(name)?.label[lang] ?? ''
  const glaze = optionOf('mood')?.glaze
  // what actually leaves the page: free text cleaned, choices only from the option lists
  const clean = {
    ...Object.fromEntries(steps.map((s) => [s.name, optionOf(s.name)?.value ?? ''])),
    note: cleanText(answers.note, LIMITS.note, { multiline: true }),
    name: cleanText(answers.name, LIMITS.name),
    contact: cleanText(answers.contact, LIMITS.contact),
  }
  const nameMissing = !clean.name
  const contactInvalid = !isContact(clean.contact)

  const choose = (name, value) => {
    if (!code) setCode(newTileCode())
    setAnswers((a) => ({ ...a, [name]: value }))
  }

  const next = () => {
    if (index < steps.length - 1) return setIndex(index + 1)
    if (nameMissing || contactInvalid) return setShowError(true)
    setDone(true)
  }

  const summary = () => [
    `${t.commissionHeading} · K-${code}`,
    `${steps[0].question[lang]} ${labelOf('piece')}`,
    `${steps[1].question[lang]} ${labelOf('motif')}${clean.note ? ' · ' + clean.note : ''}`,
    `${steps[2].question[lang]} ${labelOf('mood')}`,
    `${steps[3].question[lang]} ${labelOf('occasion')}`,
    `${labelOf('when')} · ${clean.name} · ${clean.contact}`,
  ].join('\n')

  const send = (channel) => {
    if (!consent || sent) return // KVKK: nothing leaves without consent; and only once per tile
    sendRequest({ channel, subject: `${t.commissionHeading} · K-${code}`, text: summary(), payload: { kind: 'commission', code: `K-${code}`, lang, ...clean, kvkkConsent: true } })
    addRequest({ kind: 'commission', title: `K-${code} · ${labelOf('piece')}`, glaze: glaze ?? 'kintsugi' })
    setSent(true)
  }

  const restart = () => {
    setAnswers(empty); setCode(null); setIndex(0); setDone(false); setSent(false); setShowError(false); setConsent(false)
  }

  return (
    <div className="commission">
      <div className="screen-pad">
        <h1 className="screen-title">{t.commissionTitle}</h1>
        <p className="lede">{t.commissionLede}</p>

        <CommissionTile code={code} glaze={glaze} image="/images/commission.jpg" alt={t.commissionAlt}
          lines={[labelOf('piece'), labelOf('motif'), labelOf('mood'), labelOf('occasion'), labelOf('when')]} />

        {!done ? (
          <form className="quiz" onSubmit={(e) => { e.preventDefault(); next() }} noValidate>
            <p className="pencil-code quiz__progress" aria-live="polite">{t.step(index + 1)}</p>
            <fieldset className="quiz__step" key={step.name}>
              <legend className="quiz__question">{step.question[lang]}</legend>
              <div className={'choices' + (step.name === 'when' ? ' choices--row' : '')}>
                {step.options.map((o) => (
                  <label key={o.value} className="choice">
                    <input type="radio" name={step.name} value={o.value}
                      checked={answers[step.name] === o.value} onChange={() => choose(step.name, o.value)} />
                    <span>
                      {o.glaze && <i className={`chip glaze-${o.glaze}`} aria-hidden="true" />}
                      {o.label[lang]}
                    </span>
                  </label>
                ))}
              </div>

              {step.note && (
                <label className="field">
                  <span>{t.optional}</span>
                  <textarea rows={3} value={answers.note} placeholder={t.notePlaceholder} maxLength={LIMITS.note}
                    onChange={(e) => setAnswers((a) => ({ ...a, note: e.target.value }))} />
                </label>
              )}

              {step.contact && (
                <>
                  <label className="field">
                    <span>{t.yourName}</span>
                    <input type="text" autoComplete="name" value={answers.name} maxLength={LIMITS.name}
                      aria-invalid={showError && nameMissing}
                      onChange={(e) => setAnswers((a) => ({ ...a, name: e.target.value }))} />
                  </label>
                  <label className="field">
                    <span>{t.contact}</span>
                    <input type="text" autoComplete="email" value={answers.contact} maxLength={LIMITS.contact}
                      aria-invalid={showError && contactInvalid}
                      onChange={(e) => setAnswers((a) => ({ ...a, contact: e.target.value }))} />
                  </label>
                  {showError && (nameMissing || contactInvalid) && <p className="field-error" role="alert">{t.contactError}</p>}
                </>
              )}
            </fieldset>

            <div className="quiz__nav">
              {index > 0 && <button type="button" className="text-button" onClick={() => setIndex(index - 1)}>{t.back}</button>}
              <button type="submit" className="stamp" disabled={!answers[step.name]}>
                {index === steps.length - 1 ? t.finish : t.next}
              </button>
            </div>
          </form>
        ) : (
          <div className="quiz-done">
            <h2 className="quiz__question">{t.readyTitle}</h2>
            <p>{t.readyNote}</p>

            <KvkkConsent checked={consent} onChange={setConsent} />

            <button type="button" className="stamp stamp--wide" disabled={!consent || sent} onClick={() => send('whatsapp')}>{t.sendWhatsapp}</button>
            <button type="button" className="ghost ghost--wide" disabled={!consent || sent} onClick={() => send('email')}>{t.sendEmail}</button>
            {sent && (
              <>
                <p className="pencil-note" role="status">{t.sentNote}</p>
                <button type="button" className="text-button" onClick={restart}>{t.startOver}</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
