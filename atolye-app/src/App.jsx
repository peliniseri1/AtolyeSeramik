import { useCallback, useEffect, useMemo, useState } from 'react'
import { LangContext, strings } from './i18n.jsx'
import { StoreContext } from './store.jsx'
import { useStoredState } from './lib/useStoredState.js'
import { sendRequest } from './lib/contact.js'
import AppBar from './components/AppBar.jsx'
import TabBar from './components/TabBar.jsx'
import EnquirySheet from './components/EnquirySheet.jsx'
import CatalogueQR from './components/CatalogueQR.jsx'
import CollectionScreen from './screens/CollectionScreen.jsx'
import CommissionScreen from './screens/CommissionScreen.jsx'
import SavedScreen from './screens/SavedScreen.jsx'
import AtelierScreen from './screens/AtelierScreen.jsx'
import './App.css'

const TABS = ['collection', 'commission', 'saved', 'atelier']
const defaultLang =() => ((navigator.language || 'tr').toLowerCase().startsWith('tr') ? 'tr' : 'en')

export default function App() {
  const [lang, setLang] = useStoredState('atolye-lang', defaultLang())
  // the open tab lives in the URL hash, so a screen can be linked to directly (e.g. #commission)
  const [tab, setTabState] = useState(() => (TABS.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'collection'))
  const setTab = useCallback((id) => { setTabState(id); history.replaceState(null, '', `#${id}`) }, [])
  const [favourites, setFavourites] = useStoredState('atolye-favourites', [])
  const [requests, setRequests] = useStoredState('atolye-requests', [])
  const [enquiry, setEnquiry] = useState(null)
  const t = strings[lang]

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  const addRequest = useCallback((request) => {
    setRequests((list) => [{ id: crypto.randomUUID(), at: Date.now(), ...request }, ...list])
  }, [setRequests])

  const store = useMemo(() => ({
    favourites,
    requests,
    toggleFavourite: (id) => setFavourites((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id])),
    addRequest,
    openEnquiry: setEnquiry,
  }), [favourites, requests, setFavourites, addRequest])

  const closeEnquiry = useCallback(() => setEnquiry(null), [])

  const sendEnquiry = (channel) => {
    const name = enquiry.name.tr
    const text = t.enquiryMsg(name, enquiry.code)
    sendRequest({ channel, subject: `${enquiry.code} · ${name}`, text, payload: { kind: 'enquiry', code: enquiry.code, lang } })
    addRequest({ kind: 'enquiry', title: `${enquiry.code} · ${name}`, glaze: enquiry.glaze })
    setEnquiry(null)
  }

  const screens = {
    collection: <CollectionScreen />,
    commission: <CommissionScreen />,
    saved: <SavedScreen onBrowse={() => setTab('collection')} />,
    atelier: <AtelierScreen />,
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <StoreContext.Provider value={store}>
        <div className="stage">
          <div className="device">
            <AppBar />
            {/* keyed by tab: each screen mounts fresh and starts at the top */}
            <main className="screen" key={tab}>
              {screens[tab]}
            </main>
            <TabBar current={tab} onChange={setTab} badge={favourites.length} />
            <EnquirySheet product={enquiry} onSend={sendEnquiry} onClose={closeEnquiry} />
          </div>
          <CatalogueQR aside />
        </div>
      </StoreContext.Provider>
    </LangContext.Provider>
  )
}
