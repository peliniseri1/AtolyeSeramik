import { useRef, useState } from 'react'
import { useLang } from '../i18n.jsx'
import ProductImage from './ProductImage.jsx'

// A piece's photographs as a quiet swipe strip: one frame at a time, snapping into place,
// with a pencilled "1 / 3" beneath. Arrow keys move between frames once the strip has focus.
export default function ProductGallery({ images, label, ratio, priority = false }) {
  const { lang, t } = useLang()
  const strip = useRef(null)
  const [index, setIndex] = useState(0)

  if (images.length === 1) {
    const [only] = images
    return <ProductImage src={only.src} alt={only.alt[lang]} label={label} ratio={ratio} priority={priority} />
  }

  const onScroll = () => {
    const el = strip.current
    setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  const goTo = (i) => {
    const el = strip.current
    el.scrollTo({
      left: i * el.clientWidth,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' && index < images.length - 1) { e.preventDefault(); goTo(index + 1) }
    if (e.key === 'ArrowLeft' && index > 0) { e.preventDefault(); goTo(index - 1) }
  }

  return (
    <div className="gallery" role="region" aria-roledescription="carousel" aria-label={t.galleryLabel(label)}>
      <div className="gallery__strip" ref={strip} tabIndex={0} onScroll={onScroll} onKeyDown={onKeyDown}>
        {images.map((image, i) => (
          <div key={i} className="gallery__slide" role="group" aria-roledescription="slide"
            aria-label={t.galleryCount(i + 1, images.length)}>
            <ProductImage src={image.src} alt={image.alt[lang]} label={label} ratio={ratio} priority={priority && i === 0} />
          </div>
        ))}
      </div>
      <p className="gallery__count" aria-live="polite">{t.galleryCount(index + 1, images.length)}</p>
    </div>
  )
}
