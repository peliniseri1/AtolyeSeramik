import { useEffect, useState } from 'react'

// useState that survives a reload. Storage can be unavailable (private mode), so every access is guarded.
export function useStoredState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw === null ? initial : JSON.parse(raw)
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // keep working in memory
    }
  }, [key, value])
  return [value, setValue]
}
