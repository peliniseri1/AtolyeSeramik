import { useLang } from '../i18n.jsx'
import ProductCard from './ProductCard.jsx'

// The catalogue: the first piece leads as the featured artwork, then the atelier wall
// (a board of glaze test tiles that jumps to each piece), then the remaining pieces.
export default function ProductList({ products }) {
  const { t } = useLang()
  const [featured, ...rest] = products

  const jumpTo = (id) => {
    document.getElementById(`piece-${id}`)?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <section className="product-list" aria-label={t.tabs.collection}>
      {featured && <ProductCard product={featured} featured />}

      <div className="wall">
        <h2 className="section-title">{t.wallTitle}</h2>
        <p className="lede">{t.wallLede}</p>
        <ol className="board">
          {products.map((p) => (
            <li key={p.id}>
              <button type="button" className={`mini glaze-${p.glaze}`} onClick={() => jumpTo(p.id)}>
                <span className="mini__glaze" />
                <span className="mini__foot">
                  {p.code}
                  <span className="mini__name">{p.name.tr}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {rest.map((p) => <ProductCard key={p.id} product={p} />)}
    </section>
  )
}
