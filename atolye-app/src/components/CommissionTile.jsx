import Dip from './Dip.jsx'

// The commission tile: shows the atelier photograph until a colour mood is chosen,
// then glazed, with every answer written onto its clay foot in pencil.
export default function CommissionTile({ code, glaze, lines, image, alt }) {
  return (
    <div className={'ctile' + (glaze ? ` glaze-${glaze}` : ' is-unglazed')}>
      <div className="ctile__glaze">
        {image && <img className="ctile__photo" src={image} alt={glaze ? '' : alt} decoding="async" />}
        <Dip glaze={glaze ?? 'porcelain'} />
      </div>
      <div className="ctile__foot" aria-hidden="true">
        <span className="ctile__code">K-{code ?? '??'}</span>
        {lines.filter(Boolean).map((line) => (
          <span key={line} className="ctile__line">{line}</span>
        ))}
      </div>
    </div>
  )
}
