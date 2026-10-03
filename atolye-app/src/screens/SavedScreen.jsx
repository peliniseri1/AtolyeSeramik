import { products } from '../data/products.js'
import { useLang } from '../i18n.jsx'
import { useStore } from '../store.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function SavedScreen({ onBrowse }) {
  const { lang, t } = useLang()
  const { favourites, requests } = useStore()
  const saved = products.filter((p) => favourites.includes(p.id))
  const dateFormat = new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', { day: 'numeric', month: 'long' })

  return (
    <div className="saved">
      <div className="screen-pad">
        <h1 className="screen-title">{t.savedTitle}</h1>
        <h2 className="section-title section-title--small">{t.favourites}</h2>
        {saved.length === 0 && (
          <div className="empty">
            <p>{t.noFavourites}</p>
            <button type="button" className="ghost" onClick={onBrowse}>{t.tabs.collection}</button>
          </div>
        )}
      </div>

      {saved.length > 0 && (
        <div className="saved__grid">
          {saved.map((p) => <ProductCard key={p.id} product={p} compact />)}
        </div>
      )}

      <div className="screen-pad">
        <h2 className="section-title section-title--small">{t.requests}</h2>
        {requests.length === 0 ? (
          <p className="empty">{t.noRequests}</p>
        ) : (
          <ul className="requests">
            {requests.map((r) => (
              <li key={r.id} className="request">
                <i className={`chip glaze-${r.glaze}`} aria-hidden="true" />
                <div>
                  <p className="request__title">{r.title}</p>
                  <p className="request__meta">{t.requestKinds[r.kind]} · {dateFormat.format(new Date(r.at))}</p>
                  <p className="pencil-code">{t.requestStatus}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
