import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { CONTACT, normalizeWhatsAppDigits } from '../../config/contact'
import { useI18n } from '../../context/I18nContext'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])

  return matches
}

function WhatsAppIcon() {
  return (
    <svg
      className="block h-[26px] w-[26px] shrink-0 [shape-rendering:geometricPrecision]"
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.849L.057 23.617a.75.75 0 00.92.919l5.919-1.55A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.2-1.373l-.373-.217-3.867 1.013 1.013-3.773-.233-.387A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  )
}

export default function WhatsAppButton() {
  const { locale } = useI18n()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const reducedMotion = usePrefersReducedMotion()
  const [hovered, setHovered] = useState(false)

  const message = useMemo(
    () => (locale === 'it' ? CONTACT.whatsappMessageIT : CONTACT.whatsappMessage),
    [locale],
  )

  const whatsappUrl = useMemo(() => {
    const digits = normalizeWhatsAppDigits(CONTACT.whatsappNumber)
    const base = `https://wa.me/${digits}`
    return message ? `${base}?text=${encodeURIComponent(message)}` : base
  }, [message])

  const tooltipText =
    locale === 'it' ? 'Chatta su WhatsApp' : 'Chat on WhatsApp'

  const entranceDelay = reducedMotion ? 0 : 2
  const showPulse = !reducedMotion

  return (
    <div
      className="pointer-events-none fixed z-[9999] flex flex-row items-center gap-3 md:gap-4"
      style={{ bottom: 24, right: 24 }}
    >
      <AnimatePresence>
        {isDesktop && hovered && (
          <motion.div
            key="wa-tooltip"
            role="tooltip"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none relative max-w-[220px] self-center rounded-2xl border border-white/70 bg-white/95 px-3.5 py-2.5 text-[13px] font-semibold leading-snug text-neutral-900 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_0_1px_rgba(255,255,255,0.5)_inset] backdrop-blur-md dark:text-neutral-900"
            style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}
          >
            <span className="absolute -right-1.5 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[6px] border-l-8 border-y-transparent border-l-white [filter:drop-shadow(1px_0_0_rgba(0,0,0,0.06))]" />
            {tooltipText}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="pointer-events-auto relative flex flex-col items-end justify-center self-center"
        initial={
          reducedMotion
            ? false
            : { opacity: 0, y: 80, scale: 0.5 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                delay: entranceDelay,
                duration: 0.5,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }
        }
      >
        {/* Scale + pulse partagent le même conteneur : le halo reste concentrique au cercle */}
        <motion.div
          className="relative inline-flex origin-right [isolation:isolate]"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
        >
          {showPulse && (
            <div
              className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
              aria-hidden
            >
              <span className="whatsapp-pulse-ring h-[60px] w-[60px] rounded-full" />
            </div>
          )}

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            role="link"
            aria-label="Contact us on WhatsApp"
            className={`relative z-10 inline-flex h-[60px] min-h-[60px] min-w-[60px] flex-row-reverse items-center rounded-[50px] bg-gradient-to-br from-[#25D366] to-[#1DA851] text-white shadow-[0_1px_0_1px_rgba(255,255,255,0.3)_inset,0_-2px_0_2px_rgba(0,0,0,0.08)_inset,0_8px_32px_rgba(37,211,102,0.45),0_4px_12px_rgba(0,0,0,0.15)] outline-none transition-[box-shadow] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] ${
              isDesktop && hovered ? 'justify-center gap-3 px-5' : 'justify-center'
            }`}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            animate={{
              width: isDesktop && hovered ? 'auto' : 60,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          >
            <span className="relative z-10 flex size-[60px] shrink-0 items-center justify-center">
              <WhatsAppIcon />
            </span>
            {isDesktop && (
              <motion.span
                className="relative z-10 flex h-[60px] shrink-0 items-center overflow-hidden whitespace-nowrap text-sm font-semibold leading-[1.1] tracking-tight"
                initial={false}
                animate={{
                  opacity: hovered ? 1 : 0,
                  maxWidth: hovered ? 140 : 0,
                }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                WhatsApp
              </motion.span>
            )}
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  )
}
