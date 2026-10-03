import { useLang } from '../i18n.jsx'

export default function AppBar() {
  const { lang, setLang, t } = useLang()
  return (
    <header className="app-bar">
      <p className="wordmark">
        <span className="wordmark__studio" lang="en-GB">Studio</span>
        <span className="wordmark__name">Atölye Seramik</span>
      </p>
      <div className="lang" role="group" aria-label={t.langLabel}>
        {['tr', 'en'].map((code) => (
          <button key={code} type="button" aria-pressed={lang === code} onClick={() => setLang(code)}>
            {code.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  )
}
