import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { Marcellus_400Regular } from '@expo-google-fonts/marcellus'
import { HankenGrotesk_400Regular, HankenGrotesk_500Medium, HankenGrotesk_600SemiBold } from '@expo-google-fonts/hanken-grotesk'
import { Caveat_500Medium } from '@expo-google-fonts/caveat'
import { products } from '../atolye-app/src/data/products.js'
import { LangContext, strings } from '../atolye-app/src/i18n.jsx'
import ProductCard from './src/components/ProductCard.js'
import OrderSheet from './src/components/OrderSheet.js'
import { color, font, gutter } from './src/theme.js'

// Atölye Seramik on the phone: the collection, with "Sipariş ver" and "Stok bildirimi iste".
// Data, validation and TR/EN strings are the web app's own files (atolye-app/src), shared through metro.config.js.
export default function App() {
  const [lang, setLang] = useState('tr')
  const [order, setOrder] = useState(null)
  const [fontsLoaded] = useFonts({
    Marcellus_400Regular, HankenGrotesk_400Regular, HankenGrotesk_500Medium, HankenGrotesk_600SemiBold, Caveat_500Medium,
  })
  const t = strings[lang]

  if (!fontsLoaded) return <View style={styles.night} />

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.night} edges={['top']}>
          <StatusBar style="light" />
          <View style={styles.bar}>
            <View>
              <Text style={styles.studio}>STUDIO</Text>
              <Text style={styles.brand} accessibilityRole="header">Atölye Seramik</Text>
            </View>
            <View style={styles.langs} accessibilityLabel={t.langLabel}>
              {['tr', 'en'].map((code) => (
                <Pressable key={code} onPress={() => setLang(code)} accessibilityRole="button"
                  accessibilityState={{ selected: lang === code }} style={[styles.lang, lang === code && styles.langOn]}>
                  <Text style={[styles.langText, lang === code && styles.langTextOn]}>{code.toUpperCase()}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <ScrollView style={styles.clay} contentContainerStyle={styles.list}>
            <View style={styles.intro}>
              <Text style={styles.heading}>{t.wallTitle}</Text>
              <Text style={styles.lede}>{t.wallLede}</Text>
            </View>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onOrder={setOrder} />
            ))}
          </ScrollView>

          {/* keyed by piece: each order starts with an empty form */}
          {order && <OrderSheet key={order.id} product={order} onClose={() => setOrder(null)} />}
        </SafeAreaView>
      </SafeAreaProvider>
    </LangContext.Provider>
  )
}

const styles = StyleSheet.create({
  night: { flex: 1, backgroundColor: color.night },
  bar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: gutter, paddingVertical: 12, backgroundColor: color.clay,
  },
  studio: { fontFamily: font.textBold, fontSize: 10, letterSpacing: 3, color: color.graphite },
  brand: { fontFamily: font.display, fontSize: 20, color: color.clayInk },
  langs: { flexDirection: 'row', borderWidth: 1, borderColor: color.clayInk },
  lang: { minWidth: 44, minHeight: 36, alignItems: 'center', justifyContent: 'center' },
  langOn: { backgroundColor: color.clayInk },
  langText: { fontFamily: font.textBold, fontSize: 12, letterSpacing: 1.5, color: color.clayInk },
  langTextOn: { color: color.porcelainInk },
  clay: { backgroundColor: color.clayDeep },
  list: { paddingBottom: 40 },
  intro: { paddingHorizontal: gutter, paddingTop: 28, paddingBottom: 22 },
  heading: { fontFamily: font.display, fontSize: 32, color: color.clayInk },
  lede: { fontFamily: font.text, fontSize: 15, lineHeight: 24, color: color.graphite, marginTop: 8 },
})
