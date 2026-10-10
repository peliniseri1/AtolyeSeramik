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
      { src: '/images/hasat-wall-panel.jpg', alt: { tr: 'Trakya Ağustosu duvar panosu: tenmoku sırlı, oyma buğday başağı kabartması', en: 'A Thracian August, wall panel: carved wheat relief in tenmoku glaze' } },
      { src: null, alt: { tr: 'Trakya Ağustosu, yakın çekim: oyma buğday başaklarında havuzlanan tenmoku sırrı', en: 'A Thracian August, detail: tenmoku glaze pooling in the carved wheat ears' } },
      { src: null, alt: { tr: 'Trakya Ağustosu, ölçek için bir yemek odasının duvarında, uzun ahşap masanın üstünde', en: 'A Thracian August installed above a long oak dining table, for scale' } },
    ],
    ratio: '4 / 5',
    name: { tr: 'Trakya Ağustosu', en: 'A Thracian August' },
    kind: { tr: 'Hikâyeli duvar panosu', en: 'Story wall panel' },
    codeLine: { tr: 'gre, tenmoku · 1260°', en: 'stoneware, tenmoku · 1260°' },
    story: {
      tr: "Trakya'da bir ağustos, tek bir başak. Pano aşağıdan yukarı okunur: kökte toprak, sapta rüzgâr, en üstte dolgun taneler; bir köşede doğan, ötekinde batan güneş. Tenmoku ile odun külü, yüz kırk saatte elle açılan her oyukta koyulaşır, kenarlarda bal rengine döner.",
      en: "A single ear of wheat, August in Thrace. The panel reads from the ground up: earth at the root, wind in the stalk, full grain at the top, a sun rising in one corner and setting in another. Tenmoku and wood ash pool dark in every groove, cut by hand over one hundred and forty hours, and thin to honey at the edges.",
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
      { src: '/images/ilkbahar-dinnerware.jpg', alt: { tr: 'Badem Dalı yemek takımı: seladon sırlı tabaklar, kâseler ve fincanlar, badem çiçeği deseni', en: 'The Almond Branch dinnerware: celadon plates, bowls and cups with almond blossom' } },
      { src: null, alt: { tr: 'Badem Dalı, tek bir yemek tabağı: sır altına fırçayla işlenmiş badem dalı', en: 'The Almond Branch, a single dinner plate: almond branch brushed under the celadon' } },
    ],
    ratio: '4 / 3',
    name: { tr: 'Badem Dalı', en: 'The Almond Branch' },
    kind: { tr: 'Yemek takımı', en: 'Dinnerware set' },
    codeLine: { tr: 'porselen, seladon · 1280°', en: 'porcelain, celadon · 1280°' },
    story: {
      tr: "Kuzguncuk'ta mart sonu; bahçe duvarlarından taşan ilk badem çiçekleri. Her parça çarkta tek tek çekilir, her dal sır altına elle fırçalanır; hiçbir dal ötekinin aynısı değildir. Altı kişilik bir sofra için yirmi dört parça, yılda yalnızca on iki takım.",
      en: "Late March in Kuzguncuk, the first almond blossom spilling over garden walls. Every piece is thrown on the wheel by itself and each branch brushed beneath the glaze by hand, so no two are alike. Twenty-four pieces to lay a table for six, and only twelve sets a year.",
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
      { src: '/images/fener-lampshade.jpg', alt: { tr: "Galata'da Ayaz abajur yanarken: delikli porselende Galata Kulesi silueti, tavana yıldızlar düşüyor", en: 'Frost over Galata, lit: Galata Tower skyline pierced in porcelain, stars thrown on the ceiling' } },
      { src: null, alt: { tr: "Galata'da Ayaz abajur sönükken: gün ışığında beyaz porselen ve elle delinmiş yıldızlar", en: 'Frost over Galata, unlit: white porcelain and hand-pierced stars in daylight' } },
    ],
    ratio: '4 / 5',
    name: { tr: "Galata'da Ayaz", en: 'Frost over Galata' },
    kind: { tr: 'Delikli porselen abajur', en: 'Pierced porcelain lampshade' },
    codeLine: { tr: 'porselen, kobalt · 1280°', en: 'porcelain, cobalt · 1280°' },
    story: {
      tr: "Galata'dan bakılan bir kış gecesi. Porselen iki milimetreye dek inceltilir, her yıldız tek tek elle delinir; gündüz beyaz ve sessiz bir kubbedir, yandığında kulenin siluetini ışıkla çizer, tavana küçük bir takımyıldız serper. Yalnızca dokuz adet, her biri numaralı.",
      en: "A winter night over Galata. The porcelain is pared to two millimetres and every star pierced by hand, one at a time; by day the shade hangs white and quiet, but lit, it draws the tower's outline in light and scatters a small constellation across the ceiling. Nine are made, each numbered.",
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
      { src: '/images/lale-vases.jpg', alt: { tr: 'Emirgân Nisanı vazo üçlüsü: bakır kırmızısı sırlı, üç boy vazo ve laleler', en: 'April in Emirgan vase trio: three copper-red vases in three heights with tulips' } },
      { src: null, alt: { tr: 'Emirgân Nisanı, en uzun vazo tek başına: boyun kısmında koyulaşan bakır kırmızısı', en: 'April in Emirgan, the tallest vase alone: copper red deepening at the neck' } },
    ],
    ratio: '4 / 5',
    name: { tr: 'Emirgân Nisanı', en: 'April in Emirgan' },
    kind: { tr: 'Üç vazoluk set', en: 'A set of three vases' },
    codeLine: { tr: 'gre, bakır kırmızısı · 1280°', en: 'stoneware, copper red · 1280°' },
    story: {
      tr: "Nisan'da Emirgân Korusu, laleler henüz tam açmamışken. Üç vazo yan yana durmak için yapıldı; ağızları açılmak üzere olan taç yaprakları gibi kıvrılır. Bakır kırmızısı yalnızca 1280 derecede, oksijeni kısılmış ateşte belirir; bu yüzden yedi setin hiçbiri aynı kırmızıyı taşımaz.",
      en: "Emirgan Grove in April, the tulips not yet fully open. Three vases made to stand together, their rims curling like petals about to part. Copper red appears only in a starved reduction fire at 1280 °C, so none of the seven sets carries quite the same red.",
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
