// The four default pieces. Names, stories, specs and prices are sample content:
// replace them with the real details before launch.
// Each piece lists its photographs in order: images[0] is the cover, the rest open in the card's gallery.
// `src: null` marks a shot not yet taken; ProductImage shows the "photograph to come" frame for it.
export const products = [
  {
    id: 'hasat',
    code: 'H-01',
    glaze: 'tenmoku',
    images: [
      { src: '/images/hasat-wall-panel.jpg', alt: { tr: 'Hasat duvar panosu: tenmoku sırlı, oyma buğday başağı kabartması', en: 'Harvest wall panel: carved wheat relief in tenmoku glaze' } },
      { src: null, alt: { tr: 'Hasat, yakın çekim: oyma buğday başaklarında havuzlanan tenmoku sırrı', en: 'Harvest, detail: tenmoku glaze pooling in the carved wheat ears' } },
      { src: null, alt: { tr: 'Hasat, ölçek için bir yemek odasının duvarında, uzun ahşap masanın üstünde', en: 'Harvest installed above a long oak dining table, for scale' } },
    ],
    ratio: '4 / 5',
    name: { tr: 'Hasat', en: 'Harvest' },
    kind: { tr: 'Hikâyeli duvar panosu', en: 'Story wall panel' },
    codeLine: { tr: 'gre, tenmoku · 1260°', en: 'stoneware, tenmoku · 1260°' },
    story: {
      tr: "Trakya'da bir ağustos günü, rüzgârla eğilen buğday. Panoyu soldan sağa bir gün gibi okursunuz: şafakta orak, öğlen harman, akşam uzun sofrada ilk ekmek. Yüz kırk saatlik elle oyma.",
      en: 'An August day in Thrace, wheat bent by the wind. The panel reads left to right like a single day: the sickle at dawn, threshing at noon, the first loaf at the long table at dusk. One hundred and forty hours of hand carving.',
    },
    specs: [
      { label: { tr: 'Kil', en: 'Clay' }, value: { tr: 'Şamotlu gre', en: 'Grogged stoneware' } },
      { label: { tr: 'Sır', en: 'Glaze' }, value: { tr: 'Tenmoku, odun külü', en: 'Tenmoku, wood ash' } },
      { label: { tr: 'Ölçü', en: 'Size' }, value: { tr: '90 × 45 cm', en: '90 × 45 cm' } },
      { label: { tr: 'Baskı', en: 'Edition' }, value: { tr: 'Tek eser', en: 'One of a kind' } },
    ],
    price: 6800,
  },
  {
    id: 'ilkbahar',
    code: 'S-02',
    glaze: 'celadon',
    images: [
      { src: '/images/ilkbahar-dinnerware.jpg', alt: { tr: 'İlkbahar yemek takımı: seladon sırlı tabaklar, kâseler ve fincanlar, badem çiçeği deseni', en: 'Spring dinnerware: celadon plates, bowls and cups with almond blossom' } },
      { src: null, alt: { tr: 'İlkbahar, tek bir yemek tabağı: sır altına fırçayla işlenmiş badem dalı', en: 'Spring, a single dinner plate: almond branch brushed under the celadon' } },
    ],
    ratio: '4 / 3',
    name: { tr: 'İlkbahar', en: 'Spring' },
    kind: { tr: 'Yemek takımı', en: 'Dinnerware set' },
    codeLine: { tr: 'porselen, seladon · 1280°', en: 'porcelain, celadon · 1280°' },
    story: {
      tr: "Mart sonunda Kuzguncuk'ta açan ilk badem çiçekleri. Her tabak çarkta tek tek çekilir, çiçekler sır altına fırçayla işlenir; hiçbir dal ötekinin aynısı değildir.",
      en: 'The first almond blossoms of late March in Kuzguncuk. Each plate is thrown on the wheel one at a time and the blossoms are brushed under the glaze, so no two branches are alike.',
    },
    specs: [
      { label: { tr: 'Takım', en: 'Set' }, value: { tr: 'Altı kişilik, 24 parça', en: 'For six, 24 pieces' } },
      { label: { tr: 'Sır', en: 'Glaze' }, value: { tr: 'Seladon, sır altı fırça', en: 'Celadon, brushed underglaze' } },
      { label: { tr: 'Baskı', en: 'Edition' }, value: { tr: 'Yılda 12 numaralı takım', en: '12 numbered sets a year' } },
    ],
    price: 3900,
  },
  {
    id: 'fener',
    code: 'F-03',
    glaze: 'porcelain',
    images: [
      { src: '/images/fener-lampshade.jpg', alt: { tr: 'Fener abajur yanarken: delikli porselende Galata Kulesi silueti, tavana yıldızlar düşüyor', en: 'Fener lampshade lit: Galata Tower skyline pierced in porcelain, stars thrown on the ceiling' } },
      { src: null, alt: { tr: 'Fener abajur sönükken: gün ışığında beyaz porselen ve elle delinmiş yıldızlar', en: 'Fener lampshade unlit: white porcelain and hand-pierced stars in daylight' } },
    ],
    ratio: '4 / 5',
    name: { tr: 'Fener', en: 'Lantern' },
    kind: { tr: 'Delikli porselen abajur', en: 'Pierced porcelain lampshade' },
    codeLine: { tr: 'porselen, kobalt · 1280°', en: 'porcelain, cobalt · 1280°' },
    story: {
      tr: "Galata'dan bakınca bir kış gecesi gökyüzü. İki milimetre kalınlığındaki porselen her yıldız için elle delinir; yandığında tavana küçük bir takımyıldız düşer.",
      en: 'The winter night sky as seen from Galata. Porcelain two millimetres thin, pierced by hand for every star; lit, it throws a small constellation across the ceiling.',
    },
    specs: [
      { label: { tr: 'Ölçü', en: 'Size' }, value: { tr: 'Ø 32 cm', en: 'Ø 32 cm' } },
      { label: { tr: 'Duvar', en: 'Wall' }, value: { tr: '2 mm porselen', en: '2 mm porcelain' } },
      { label: { tr: 'Baskı', en: 'Edition' }, value: { tr: '9 adet, numaralı', en: 'Edition of 9, numbered' } },
    ],
    price: 1650,
  },
  {
    id: 'lale',
    code: 'L-04',
    glaze: 'copper',
    images: [
      { src: '/images/lale-vases.jpg', alt: { tr: 'Lale vazo üçlüsü: bakır kırmızısı sırlı, üç boy vazo ve laleler', en: 'Tulip vase trio: three copper-red vases in three heights with tulips' } },
      { src: null, alt: { tr: 'Lale, en uzun vazo tek başına: boyun kısmında koyulaşan bakır kırmızısı', en: 'Tulip, the tallest vase alone: copper red deepening at the neck' } },
    ],
    ratio: '4 / 5',
    name: { tr: 'Lale', en: 'Tulip' },
    kind: { tr: 'Üç vazoluk set', en: 'A set of three vases' },
    codeLine: { tr: 'gre, bakır kırmızısı · 1280°', en: 'stoneware, copper red · 1280°' },
    story: {
      tr: "Nisan'da Emirgân Korusu. Üç vazo, bir bahçe gibi birlikte durmak için yapıldı. Bakır kırmızısı yalnızca oksijensiz ateşte ortaya çıkar; hiçbir set ötekinin aynı tonunda değildir.",
      en: 'Emirgan Grove in April. Three vases made to stand together like a garden. Copper red only appears in a starved, reduction fire, so no two sets share the same red.',
    },
    specs: [
      { label: { tr: 'Boylar', en: 'Heights' }, value: { tr: '18 · 26 · 34 cm', en: '18 · 26 · 34 cm' } },
      { label: { tr: 'Pişirim', en: 'Firing' }, value: { tr: 'İndirgen ateş, 1280 °C', en: 'Reduction fire, 1280 °C' } },
      { label: { tr: 'Baskı', en: 'Edition' }, value: { tr: '7 set, numaralı', en: 'Edition of 7, numbered' } },
    ],
    price: 2400,
  },
]

export const formatPrice = (value, lang) =>
  '€ ' + new Intl.NumberFormat(lang === 'tr' ? 'tr-TR' : 'en-GB').format(value)
