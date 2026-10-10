import { useId } from 'react'
import { useLang } from '../i18n.jsx'
import { CONFIG } from '../lib/contact.js'

// The KVKK notice and the explicit-consent box that every form collecting a name must show before it sends.
export default function KvkkConsent({ checked, onChange }) {
  const { t } = useLang()
  const hint = useId()

  return (
    <div className="kvkk-consent">
      <details className="kvkk">
        <summary>{t.kvkkTitle}</summary>
        <dl className="kvkk__body">
          {t.kvkkBody(CONFIG.email).map(([term, text]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </details>
      <label className="consent">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
          aria-describedby={checked ? undefined : hint} />
        <span>{t.kvkkConsent}</span>
      </label>
      {!checked && <p id={hint} className="consent__hint">{t.kvkkRequired}</p>}
    </div>
  )
}
