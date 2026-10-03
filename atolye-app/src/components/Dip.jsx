// The hand-drawn line where a tile was dipped into glaze: a pooled band behind a wavy edge.
const shapes = {
  tenmoku: ['M0 0H400V14C372 22 352 12 326 19S281 30 252 21 208 11 180 20 128 33 100 22 52 12 28 21 6 24 0 20Z', 'M0 0H400V8C372 16 352 6 326 13S281 24 252 15 208 5 180 14 128 27 100 16 52 6 28 15 6 18 0 14Z'],
  celadon: ['M0 0H400V18C380 12 350 24 318 17S262 9 236 20 190 30 160 19 112 10 84 18 30 28 0 16Z', 'M0 0H400V11C380 5 350 17 318 10S262 2 236 13 190 23 160 12 112 3 84 11 30 21 0 9Z'],
  porcelain: ['M0 0H400V15C366 25 340 13 304 20S246 28 220 18 168 10 140 21 82 30 52 19 14 14 0 21Z', 'M0 0H400V8C366 18 340 6 304 13S246 21 220 11 168 3 140 14 82 23 52 12 14 7 0 14Z'],
  copper: ['M0 0H400V20C376 12 344 22 314 14S258 26 228 20 178 10 150 18 96 28 66 18 22 12 0 18Z', 'M0 0H400V13C376 5 344 15 314 7S258 19 228 13 178 3 150 11 96 21 66 11 22 5 0 11Z'],
}

export default function Dip({ glaze = 'tenmoku', className = 'dip' }) {
  const [pool, edge] = shapes[glaze] ?? shapes.tenmoku
  return (
    <svg className={className} viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
      <path className="dip__pool" d={pool} />
      <path className="dip__edge" d={edge} />
    </svg>
  )
}
