import { AnimatePresence, motion } from 'framer-motion'
import { Leaf, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CONTENT } from '../../data/content'
import { useActiveSection } from '../../hooks/useActiveSection'
import { AnimatedButton } from '../ui/AnimatedButton'
import { ThemeToggle } from '../ui/ThemeToggle'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'location', label: 'Location' },
  { id: 'booking', label: 'Contact' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const activeId = useActiveSection(NAV.map((n) => n.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const navSpring = {
    type: 'spring',
    stiffness: 380,
    damping: 28,
  }

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={navSpring}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'border-b border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="focus-ring flex min-h-[44px] items-center gap-2 rounded-lg text-left"
            aria-label="Accueil"
          >
            <Leaf
              className="h-6 w-6 text-[var(--accent)]"
              aria-hidden
              strokeWidth={1.75}
            />
            <span className="font-display text-xl font-bold tracking-tight text-[var(--text-primary)] md:text-2xl">
              {CONTENT.brand.name}
            </span>
          </button>

          <nav
            className="hidden items-center gap-10 lg:flex"
            aria-label="Navigation principale"
          >
            {NAV.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...navSpring, delay: 0.05 * i }}
                className={`relative nav-link-underline font-accent text-xs uppercase tracking-[0.2em] ${
                  activeId === item.id
                    ? 'is-active text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.label}
                {activeId === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--accent)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AnimatedButton
              className="hidden px-6 py-2.5 text-xs uppercase tracking-widest md:inline-flex"
              onClick={() => scrollToSection('booking')}
            >
              Book now
            </AnimatedButton>
            <button
              type="button"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass)] lg:hidden"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              aria-label="Fermer"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[min(100%,380px)] flex-col gap-2 border-l border-[var(--glass-border)] bg-[var(--glass)] p-8 pt-24 backdrop-blur-2xl"
              aria-label="Menu mobile"
            >
              {NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    scrollToSection(item.id)
                    setOpen(false)
                  }}
                  className={`rounded-xl px-4 py-3 text-left font-accent text-sm uppercase tracking-[0.25em] ${
                    activeId === item.id
                      ? 'bg-white/15 text-[var(--accent)]'
                      : 'text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <AnimatedButton
                className="mt-4 w-full justify-center uppercase tracking-widest"
                onClick={() => {
                  scrollToSection('booking')
                  setOpen(false)
                }}
              >
                Book now
              </AnimatedButton>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
