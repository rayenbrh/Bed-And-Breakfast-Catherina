import { useI18n } from '../context/I18nContext'

export function SkipToContent() {
  const { t } = useI18n()
  return (
    <a
      href="#main-content"
      className="focus-ring fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-glass transition-transform focus:translate-y-0 focus:outline-none"
    >
      {t('a11y.skipToContent')}
    </a>
  )
}
