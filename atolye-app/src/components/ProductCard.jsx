import { formatPrice } from '../data/products.js'
import { useLang } from '../i18n.jsx'
import { useStore } from '../store.jsx'
import Dip from './Dip.jsx'
import ProductImage from './ProductImage.jsx'
import ProductGallery from './ProductGallery.jsx'
import { HeartIcon } from './Icons.jsx'

// One piece, presented as a fired test tile: the photo sits in the glaze field,
// and the raw clay foot carries the pencil code, name, story, specs, price and actions.
export default function ProductCard({ product, featured = false, compact = false }) {
  const { lang, t } = useLang()
  const { favourites, toggleFavourite, openEnquiry } = useStore()
  const name = product.name.tr
  const isSaved = favourites.includes(product.id)
  const TitleTag = featured ? 'h1' : 'h2'
  const label = `${name} · ${product.kind[lang]}`
  const [cover] = product.images

  return (
    <article className={`tile glaze-${product.glaze}` + (featured ? ' tile--featured' : '') + (compact ? ' tile--compact' : '')}
      id={`piece-${product.id}`} aria-labelledby={`title-${product.id}`}>
      <div className="tile__glaze">
        {compact ? (
          <ProductImage src={cover.src} alt={cover.alt[lang]} label={label} ratio="1 / 1" />
        ) : (
          <ProductGallery images={product.images} label={label} ratio={product.ratio} priority={featured} />
        )}
        <Dip glaze={product.glaze} />
      </div>

      <div className="tile__foot">
        <p className="pencil-code">{product.code} · {product.codeLine[lang]}</p>
        <div className="tile__heading">
          <TitleTag className="tile__title" id={`title-${product.id}`}>
            {name}
            <span className="tile__alt" lang="en-GB">{product.name.en}</span>
          </TitleTag>
          <button type="button" className={'heart' + (isSaved ? ' is-on' : '')} aria-pressed={isSaved}
            aria-label={`${isSaved ? t.saved : t.save}: ${name}`} onClick={() => toggleFavourite(product.id)}>
            <HeartIcon filled={isSaved} />
          </button>
        </div>
        <p className="tile__kind">{product.kind[lang]}</p>

        {featured && <p className="tile__hook">{t.hook}</p>}

        {!compact && (
          <>
            <p className="tile__story">{product.story[lang]}</p>
            <dl className="specs">
              {product.specs.map((spec) => (
                <div key={spec.label.en}>
                  <dt>{spec.label[lang]}</dt>
                  <dd>{spec.value[lang]}</dd>
                </div>
              ))}
              <div>
                <dt>{t.price}</dt>
                <dd className="specs__price">
                  {formatPrice(product.price, lang)} <em className="sample">{t.sample}</em>
                </dd>
              </div>
            </dl>
          </>
        )}

        <div className="tile__actions">
          <button type="button" className="stamp" onClick={() => openEnquiry(product)}
            aria-label={t.enquireAbout(name)}>
            {t.enquire}
          </button>
          {compact && <span className="tile__compact-price">{formatPrice(product.price, lang)} <em className="sample">{t.sample}</em></span>}
        </div>
      </div>
    </article>
  )
}
