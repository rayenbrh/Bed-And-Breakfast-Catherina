import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CONTENT } from '../data/content'

const KEY = 'bb-catherina-loaded'

export function LoadingScreen({ children }) {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem(KEY)
    } catch {
      return true
    }
  })

  useEffect(() => {
    if (!show) return undefined
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* ignore */
      }
      setShow(false)
    }, 1500)
    return () => clearTimeout(t)
  }, [show])

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-start)] dark:bg-[var(--bg-end)]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-center"
            >
              <p className="font-display text-4xl font-semibold italic text-[var(--text-primary)] md:text-5xl">
                {CONTENT.brand.name}
              </p>
              <p className="mt-3 font-accent text-xs uppercase tracking-[0.4em] text-[var(--accent)]">
                {CONTENT.brand.tagline}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 0 : 1 }}
        transition={{ duration: 0.5, delay: show ? 0 : 0.05 }}
      >
        {children}
      </motion.div>
    </>
  )
}
