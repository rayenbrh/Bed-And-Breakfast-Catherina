import { Fragment } from 'react'
import { useI18n } from '../../context/I18nContext'

/**
 * Toggle EN | IT (extensible via SUPPORTED_LOCALES + messages.json).
 * Fixed min-width to limit layout shift when labels change.
 */
export function LanguageSwitcher() {
  const { locale, setLocale, t, locales } = useI18n()

  return (
    <div
      className="inline-flex h-9 min-w-[5.75rem] shrink-0 items-center justify-center gap-0.5 rounded-full border border-[var(--glass-border)] bg-[var(--glass)] px-1.5 text-[11px] font-medium tabular-nums tracking-wide backdrop-blur-md"
      role="group"
      aria-label={t('a11y.language')}
    >
      {locales.map((code, i) => (
        <Fragment key={code}>
          {i > 0 && (
            <span
              className="select-none px-0.5 text-[var(--text-secondary)]/40"
              aria-hidden
            >
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => setLocale(code)}
            className={`focus-ring min-w-[2rem] rounded-full px-2 py-1 transition-colors ${
              locale === code
                ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            aria-pressed={locale === code}
          >
            {code.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  )
}
