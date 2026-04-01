import { Facebook, Instagram, Leaf, MapPin, Star } from 'lucide-react'
import { CONTENT } from '../../data/content'

function scrollToSection(id) {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const QUICK = [
  { id: 'home', label: 'Home' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'location', label: 'Location' },
  { id: 'booking', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-[var(--accent)]" aria-hidden />
            <span className="font-display text-2xl font-semibold text-[var(--text-primary)]">
              {CONTENT.brand.name}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-[var(--text-secondary)]">
            {CONTENT.brand.tagline}
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] bg-white/10 text-[var(--text-primary)]"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] bg-white/10 text-[var(--text-primary)]"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.tripadvisor.com"
              target="_blank"
              rel="noreferrer"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] bg-white/10 text-[var(--text-primary)]"
              aria-label="TripAdvisor"
            >
              <Star className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-accent text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            Quick links
          </h3>
          <ul className="mt-4 space-y-2">
            {QUICK.map((item) => (
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
            Contact
          </h3>
          <address className="mt-4 not-italic text-sm leading-relaxed text-[var(--text-secondary)]">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
              <span>{CONTENT.brand.address}</span>
            </p>
            <p className="mt-3">
              <a
                href={`mailto:${CONTENT.brand.email}`}
                className="hover:text-[var(--text-primary)]"
              >
                {CONTENT.brand.email}
              </a>
            </p>
            <p className="mt-1">
              <a
                href={`tel:${CONTENT.brand.phone.replace(/\s/g, '')}`}
                className="hover:text-[var(--text-primary)]"
              >
                {CONTENT.brand.phone}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-[var(--glass-border)] py-6 text-center text-xs text-[var(--text-secondary)]">
        <p>
          © {new Date().getFullYear()} B&amp;B Catherina. All rights reserved.
        </p>
        <p className="mt-1">Ponsacco, Tuscany, Italy 🇮🇹</p>
      </div>
    </footer>
  )
}
