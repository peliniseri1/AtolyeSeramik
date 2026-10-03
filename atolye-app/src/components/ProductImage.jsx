import { useState } from 'react'
import { useLang } from '../i18n.jsx'

// A product photo set into its glaze field. Until a photo exists (no src, or it fails to load)
// it shows a pencilled "photograph to come" frame instead of a broken image.
export default function ProductImage({ src, alt, label, ratio = '4 / 5', priority = false }) {
  const { t } = useLang()
  const [failedSrc, setFailedSrc] = useState(null)
  const empty = !src || failedSrc === src

  return (
    <figure className={'product-image' + (empty ? ' is-empty' : '')} style={{ aspectRatio: ratio }}>
      {empty ? (
        <figcaption className="product-image__soon">
          {t.photoSoon}
          {label && <span>{label}</span>}
        </figcaption>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={() => setFailedSrc(src)}
        />
      )}
    </figure>
  )
}
