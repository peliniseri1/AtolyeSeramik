import { useState } from 'react'
import {
  ActivityIndicator, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native'
import { useLang } from '../../../atolye-app/src/i18n.jsx'
import { LIMITS, cleanText, isEmail, isPhone } from '../../../atolye-app/src/lib/sanitize.js'
import { ATELIER_EMAIL, postForm } from '../api.js'
import { color, font, glaze, gutter } from '../theme.js'

// The order sheet, as on the web: name and phone for a piece in stock ("Sipariş ver"),
// name and email for a sold-out one ("Stok bildirimi iste"). Confirms only once the webhook has it.
export default function OrderSheet({ product, onClose }) {
  const { lang, t } = useLang()
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [consent, setConsent] = useState(false)
  const [kvkkOpen, setKvkkOpen] = useState(false)
  const [showError, setShowError] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | done | failed

  const soldOut = product.stock === 0
  const pieceName = product.name.tr
  const clean = { name: cleanText(name, LIMITS.name), contact: cleanText(contact, LIMITS.contact) }
  const nameMissing = !clean.name
  const contactInvalid = soldOut ? !isEmail(clean.contact) : !isPhone(clean.contact)
  const canSend = consent && status !== 'sending'

  const send = async () => {
    if (status === 'sending' || status === 'done') return // only once
    if (nameMissing || contactInvalid) return setShowError(true)
    if (!consent) return // KVKK: nothing leaves without consent
    setStatus('sending')
    const base = { lang, product: product.id, name: clean.name, kvkkConsent: true }
    const ok = soldOut
      ? await postForm('/api/stock-alert', { ...base, email: clean.contact })
      : await postForm('/api/order', { ...base, phone: clean.contact })
    setStatus(ok ? 'done' : 'failed')
  }

  // the web note also points to the "Saved" tab, which this port does not have
  const doneNote = (soldOut ? t.notifyDoneNote(pieceName) : t.orderDoneNote(pieceName)).split(/ (?:Talebiniz|Your request)/)[0]

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.backdrop} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel={t.cancel} />
        <View style={[styles.panel, { borderTopColor: glaze[product.glaze].field }]}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
            <View style={styles.grip} />
            <Text style={styles.code}>{product.code} · {pieceName}</Text>

            {status === 'done' ? (
              <View accessibilityLiveRegion="polite">
                <Text style={styles.title}>{soldOut ? t.notifyDoneTitle : t.orderDoneTitle}</Text>
                <Text style={styles.note}>{doneNote}</Text>
                <Stamp label={t.close} onPress={onClose} />
              </View>
            ) : (
              <>
                <Text style={styles.title} accessibilityRole="header">{soldOut ? t.notifyTitle : t.orderTitle}</Text>
                <Text style={styles.note}>{soldOut ? t.notifyNote : t.orderNote}</Text>

                <Text style={styles.label}>{t.yourName}</Text>
                <TextInput style={[styles.input, showError && nameMissing && styles.invalid]} value={name}
                  onChangeText={setName} maxLength={LIMITS.name} autoComplete="name" textContentType="name"
                  accessibilityLabel={t.yourName} returnKeyType="next" />

                <Text style={styles.label}>{soldOut ? t.emailLabel : t.phoneLabel}</Text>
                <TextInput style={[styles.input, showError && contactInvalid && styles.invalid]} value={contact}
                  onChangeText={setContact} maxLength={LIMITS.contact}
                  keyboardType={soldOut ? 'email-address' : 'phone-pad'} autoCapitalize="none"
                  autoComplete={soldOut ? 'email' : 'tel'} textContentType={soldOut ? 'emailAddress' : 'telephoneNumber'}
                  accessibilityLabel={soldOut ? t.emailLabel : t.phoneLabel} />

                {showError && (nameMissing || contactInvalid) && (
                  <Text style={styles.error} accessibilityLiveRegion="assertive">{soldOut ? t.notifyError : t.orderError}</Text>
                )}

                <Pressable onPress={() => setKvkkOpen(!kvkkOpen)} accessibilityRole="button"
                  accessibilityState={{ expanded: kvkkOpen }} style={styles.kvkkToggle}>
                  <Text style={styles.kvkkTitle}>{t.kvkkTitle.toUpperCase()}  {kvkkOpen ? '−' : '+'}</Text>
                </Pressable>
                {kvkkOpen && t.kvkkBody(ATELIER_EMAIL).map(([term, text]) => (
                  <Text key={term} style={styles.kvkkBody}><Text style={styles.kvkkTerm}>{term}. </Text>{text}</Text>
                ))}

                <Pressable onPress={() => setConsent(!consent)} accessibilityRole="checkbox"
                  accessibilityState={{ checked: consent }} style={styles.consent}>
                  <View style={[styles.box, consent && styles.boxOn]}>{consent && <Text style={styles.tick}>✓</Text>}</View>
                  <Text style={styles.consentText}>{t.kvkkConsent}</Text>
                </Pressable>
                {!consent && <Text style={styles.hint}>{t.kvkkRequired}</Text>}

                {status === 'failed' && <Text style={styles.error} accessibilityLiveRegion="assertive">{t.sendFailed}</Text>}
                <Stamp label={status === 'sending' ? t.sending : soldOut ? t.notifySend : t.orderSend}
                  onPress={send} disabled={!canSend} busy={status === 'sending'} />
                <Pressable onPress={onClose} accessibilityRole="button" style={styles.cancel}>
                  <Text style={styles.cancelText}>{t.cancel}</Text>
                </Pressable>
              </>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

function Stamp({ label, onPress, disabled = false, busy = false }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} accessibilityRole="button" accessibilityState={{ disabled, busy }}
      style={({ pressed }) => [styles.stamp, disabled && styles.disabled, pressed && styles.pressed]}>
      {busy && <ActivityIndicator color={color.porcelainInk} style={styles.spinner} />}
      <Text style={styles.stampText}>{label.toUpperCase()}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(26,22,19,.55)' },
  panel: { maxHeight: '92%', backgroundColor: color.clay, borderTopWidth: 6 },
  content: { paddingHorizontal: gutter, paddingTop: 10, paddingBottom: 34 },
  grip: { alignSelf: 'center', width: 40, height: 4, backgroundColor: 'rgba(42,36,32,.3)', marginBottom: 14 },
  code: { fontFamily: font.pencil, fontSize: 20, color: color.graphite },
  title: { fontFamily: font.display, fontSize: 28, lineHeight: 32, color: color.clayInk, marginTop: 6 },
  note: { fontFamily: font.text, fontSize: 15, lineHeight: 24, color: color.graphite, marginTop: 8, marginBottom: 6 },
  label: { fontFamily: font.pencil, fontSize: 19, color: color.graphite, marginTop: 14, marginBottom: 6 },
  input: {
    minHeight: 48, paddingHorizontal: 13, fontFamily: font.text, fontSize: 16, color: color.clayInk,
    backgroundColor: '#d9cfc0', borderWidth: 1, borderColor: 'rgba(42,36,32,.35)',
  },
  invalid: { borderColor: '#7a1c18' },
  error: { fontFamily: font.textMedium, fontSize: 14, lineHeight: 21, color: color.error, marginTop: 12 },
  kvkkToggle: {
    minHeight: 48, justifyContent: 'center', marginTop: 20,
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(42,36,32,.35)',
  },
  kvkkTitle: { fontFamily: font.textBold, fontSize: 12, letterSpacing: 1.6, color: color.clayInk },
  kvkkBody: { fontFamily: font.text, fontSize: 13, lineHeight: 21, color: color.graphite, marginTop: 10 },
  kvkkTerm: { fontFamily: font.textBold, color: color.clayInk },
  consent: { flexDirection: 'row', gap: 12, marginTop: 16, alignItems: 'flex-start' },
  box: {
    width: 24, height: 24, marginTop: 2, borderWidth: 1.5, borderColor: color.clayInk,
    alignItems: 'center', justifyContent: 'center',
  },
  boxOn: { backgroundColor: color.clayInk },
  tick: { color: color.porcelainInk, fontSize: 15, lineHeight: 18 },
  consentText: { flex: 1, fontFamily: font.text, fontSize: 14, lineHeight: 22, color: color.clayInk },
  hint: { fontFamily: font.text, fontSize: 13, lineHeight: 20, color: color.graphite, marginTop: 8 },
  stamp: {
    flexDirection: 'row', gap: 10, marginTop: 20, minHeight: 52,
    alignItems: 'center', justifyContent: 'center', backgroundColor: color.clayInk,
  },
  disabled: { opacity: 0.35 },
  pressed: { opacity: 0.8 },
  spinner: { marginRight: 2 },
  stampText: { fontFamily: font.textBold, fontSize: 12, letterSpacing: 2, color: color.porcelainInk },
  cancel: { alignSelf: 'center', minHeight: 44, justifyContent: 'center', paddingHorizontal: 8, marginTop: 6 },
  cancelText: { fontFamily: font.textMedium, fontSize: 15, color: color.clayInk, textDecorationLine: 'underline' },
})
