import { Facebook, Instagram, Leaf, MapPin, Star } from 'lucide-react'
import { useMemo } from 'react'
import { useI18n } from '../../context/I18nContext'

const QUICK_IDS = ['home', 'rooms', 'gallery', 'location', 'booking']

function scrollToSection(id) {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Footer() {
  const { t, messages } = useI18n()
  const quick = useMemo(
    () => QUICK_IDS.map((id) => ({ id, label: messages.nav[id] })),
    [messages.nav],
  )

  return (
    <footer className="relative z-10 border-t border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-[var(--accent)]" aria-hidden />
            <span className="font-display text-2xl font-semibold text-[var(--text-primary)]">
              {messages.brand.name}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-[var(--text-secondary)]">
            {messages.brand.tagline}
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] bg-white/10 text-[var(--text-primary)]"
              aria-label={t('footer.socialInstagram')}
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] bg-white/10 text-[var(--text-primary)]"
              aria-label={t('footer.socialFacebook')}
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.tripadvisor.com"
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] bg-white/10 text-[var(--text-primary)]"
              aria-label={t('footer.socialTripAdvisor')}
            >
              <Star className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-accent text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            {t('footer.quickLinks')}
          </h3>
          <ul className="mt-4 space-y-2">
            {quick.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="focus-ring text-left text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-accent text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            {t('footer.contact')}
          </h3>
          <address className="mt-4 not-italic text-sm leading-relaxed text-[var(--text-secondary)]">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
              <span>{messages.brand.address}</span>
            </p>
            <p className="mt-3">
              <a
                href={`mailto:${messages.brand.email}`}
                className="hover:text-[var(--text-primary)]"
              >
                {messages.brand.email}
              </a>
            </p>
            <p className="mt-1">
              <a
                href={`tel:${messages.brand.phone.replace(/\s/g, '')}`}
                className="hover:text-[var(--text-primary)]"
              >
                {messages.brand.phone}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-[var(--glass-border)] py-6 text-center text-xs text-[var(--text-secondary)]">
        <p>
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
        <p className="mt-1">{messages.footer.locationLine}</p>
      </div>
    </footer>
  )
}
