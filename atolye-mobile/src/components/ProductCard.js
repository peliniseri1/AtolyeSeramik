import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { formatPrice } from '../../../atolye-app/src/data/products.js'
import { useLang } from '../../../atolye-app/src/i18n.jsx'
import { imageUri } from '../api.js'
import { color, font, glaze, gutter } from '../theme.js'

// One piece as a fired test tile: the photo in its glaze field, then the clay foot
// with code, name, story, specs, price, stock and the order action.
export default function ProductCard({ product, onOrder }) {
  const { lang, t } = useLang()
  const g = glaze[product.glaze]
  const [cover] = product.images
  const [w, h] = product.ratio.split('/').map(Number)
  const soldOut = product.stock === 0
  const name = product.name.tr

  return (
    <View style={styles.tile} accessibilityLabel={`${name}, ${product.kind[lang]}`}>
      <View style={[styles.field, { backgroundColor: g.field }]}>
        <Image source={{ uri: imageUri(cover.src) }} accessibilityLabel={cover.alt[lang]}
          style={[styles.photo, { aspectRatio: w / h }]} resizeMode="cover" />
      </View>

      <View style={styles.foot}>
        <Text style={styles.code}>{product.code} · {product.codeLine[lang]}</Text>
        <Text style={styles.title} accessibilityRole="header">{name}</Text>
        <Text style={styles.alt}>{product.name.en.toUpperCase()}</Text>
        <Text style={styles.kind}>{product.kind[lang]}</Text>
        <Text style={[styles.stock, soldOut && styles.stockOut]}>{t.stockLabel(product.stock).toUpperCase()}</Text>
        <Text style={styles.story}>{product.story[lang]}</Text>

        <View style={styles.specs}>
          {product.specs.map((spec) => (
            <View key={spec.label.en} style={styles.spec}>
              <Text style={styles.specLabel}>{spec.label[lang]}</Text>
              <Text style={styles.specValue}>{spec.value[lang]}</Text>
            </View>
          ))}
          <View style={[styles.spec, styles.specLast]}>
            <Text style={styles.specLabel}>{t.price}</Text>
            <Text style={[styles.specValue, styles.price]}>{formatPrice(product.price, lang)}</Text>
          </View>
        </View>

        <Pressable onPress={() => onOrder(product)} accessibilityRole="button"
          accessibilityLabel={soldOut ? t.notifyAbout(name) : t.orderAbout(name)}
          style={({ pressed }) => [styles.stamp, pressed && styles.pressed]}>
          <Text style={styles.stampText}>{(soldOut ? t.notify : t.order).toUpperCase()}</Text>
        </Pressable>
      </View>
    </View>
  )
}

const hairline = { borderTopWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(42,36,32,.35)' }

const styles = StyleSheet.create({
  tile: { marginBottom: 12, backgroundColor: color.clay },
  field: { padding: 14, paddingBottom: 18 },
  photo: { width: '100%', backgroundColor: 'rgba(0,0,0,.08)' },
  foot: { paddingHorizontal: gutter, paddingTop: 22, paddingBottom: 32 },
  code: { fontFamily: font.pencil, fontSize: 20, color: color.graphite, transform: [{ rotate: '-1.2deg' }] },
  title: { fontFamily: font.display, fontSize: 40, lineHeight: 44, color: color.clayInk, marginTop: 2 },
  alt: { fontFamily: font.text, fontSize: 12, letterSpacing: 3.5, color: color.graphite, marginTop: 6 },
  kind: { fontFamily: font.textBold, fontSize: 14, color: color.clayInk, marginTop: 14 },
  stock: { fontFamily: font.textBold, fontSize: 11, letterSpacing: 2.2, color: color.graphite, marginTop: 6 },
  stockOut: { color: color.clayInk },
  story: { fontFamily: font.text, fontSize: 15, lineHeight: 25, color: color.clayInk, marginTop: 14 },
  specs: { marginTop: 20 },
  spec: { ...hairline, flexDirection: 'row', gap: 12, paddingVertical: 9 },
  specLast: { borderBottomWidth: StyleSheet.hairlineWidth },
  specLabel: { width: 96, fontFamily: font.pencil, fontSize: 18, color: color.graphite },
  specValue: { flex: 1, fontFamily: font.text, fontSize: 15, color: color.clayInk },
  price: { fontFamily: font.textBold },
  stamp: {
    marginTop: 24, minHeight: 50, alignItems: 'center', justifyContent: 'center',
    backgroundColor: color.clayInk, paddingHorizontal: 22,
  },
  pressed: { opacity: 0.8 },
  stampText: { fontFamily: font.textBold, fontSize: 12, letterSpacing: 2, color: color.porcelainInk },
})
