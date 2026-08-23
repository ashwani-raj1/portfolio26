import { useCallback, useEffect, useState } from 'react'

/**
 * Reads the theme that index.html already applied before first paint, then keeps
 * <html data-theme> and localStorage in sync. Starting from the DOM rather than a
 * hardcoded default is what stops the toggle from flickering on mount.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.getAttribute('data-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Private browsing blocks storage; the theme still applies for this visit.
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
