/* eslint-disable react-refresh/only-export-components -- React Context + hook pattern */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import raw from '../i18n/messages.json'
import {
  LOCALE_QUERY_KEY,
  LOCALE_STORAGE_KEY,
  SUPPORTED_LOCALES,
} from '../i18n/supportedLocales'

const bundles = raw

function getPath(obj, path) {
  if (!obj || !path) return undefined
  const parts = path.split('.')
  let cur = obj
  for (const p of parts) {
    cur = cur?.[p]
    if (cur === undefined) return undefined
  }
  return cur
}

function formatTemplate(str, vars = {}) {
  if (typeof str !== 'string') return str
  return str.replace(/\{(\w+)\}/g, (_, k) =>
    vars[k] != null ? String(vars[k]) : `{${k}}`,
  )
}

function getInitialLocale() {
  if (typeof window === 'undefined') return 'en'
  const params = new URLSearchParams(window.location.search)
  const q = params.get(LOCALE_QUERY_KEY)
  if (SUPPORTED_LOCALES.includes(q)) return q
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (SUPPORTED_LOCALES.includes(stored)) return stored
  } catch {
    /* ignore */
  }
  const nav = navigator.language?.slice(0, 2)
  if (nav === 'it') return 'it'
  return 'en'
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(getInitialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((next) => {
    if (!SUPPORTED_LOCALES.includes(next)) return
    setLocaleState(next)
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
    try {
      const url = new URL(window.location.href)
      url.searchParams.set(LOCALE_QUERY_KEY, next)
      window.history.replaceState({}, '', url)
    } catch {
      /* ignore */
    }
  }, [])

  const messages = bundles[locale] ?? bundles.en

  const t = useCallback(
    (path, vars) => {
      const val = getPath(messages, path)
      if (typeof val === 'string') return formatTemplate(val, vars)
      return typeof val === 'number' ? String(val) : path
    },
    [messages],
  )

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      messages,
      locales: SUPPORTED_LOCALES,
    }),
    [locale, setLocale, t, messages],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
