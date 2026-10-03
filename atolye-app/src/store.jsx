import { createContext, useContext } from 'react'

// App-wide state: favourites, sent requests, and the enquiry sheet.
export const StoreContext = createContext(null)
export const useStore = () => useContext(StoreContext)
