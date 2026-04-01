import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { IMAGES } from '../../config/images'
import { CONTENT } from '../../data/content'
import { AnimatedButton } from '../ui/AnimatedButton'
import { GlassCard } from '../ui/GlassCard'

export function BookingSection() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollY, [0, 450], [0, reduced ? 0 : 55])
  const bookingVariants = reduced
    ? {
        hidden: { opacity: 1, y: 0, scale: 1 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }
    : {
        hidden: { opacity: 0, y: 40, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.75, ease: 'easeOut' },
        },
      }

  return (
    <section
      id="booking"
      ref={ref}
      className="relative z-10 overflow-hidden py-24 md:py-32"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img
          src={IMAGES.ctaBg}
          alt="B&B Catherina — ambiance pour réserver votre séjour"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-start)]/95 via-[var(--bg-start)]/80 to-[var(--bg-end)]/90 dark:from-black/85 dark:via-black/70 dark:to-[#1a1208]/92" />
      </motion.div>

      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <motion.div
          variants={bookingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <GlassCard className="px-6 py-12 text-center md:px-14 md:py-16">
            <h2 className="font-display text-4xl font-semibold italic leading-tight text-[var(--text-primary)] md:text-5xl whitespace-pre-line">
              {CONTENT.booking.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[var(--text-secondary)]">
              {CONTENT.booking.subtitle.trim()}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <span className="rounded-full border border-[var(--glass-border)] bg-white/15 px-5 py-2 text-sm text-[var(--text-primary)] dark:bg-white/5">
                Check-in: {CONTENT.booking.checkIn}
              </span>
              <span className="rounded-full border border-[var(--glass-border)] bg-white/15 px-5 py-2 text-sm text-[var(--text-primary)] dark:bg-white/5">
                Check-out: {CONTENT.booking.checkOut}
              </span>
            </div>

            <AnimatedButton
              href={CONTENT.booking.bookingUrl}
              className="mt-10 px-12 py-4 text-sm uppercase tracking-[0.2em]"
              target="_blank"
              rel="noreferrer"
            >
              {CONTENT.booking.cta.toUpperCase()}
            </AnimatedButton>

            <p className="mt-6 text-sm italic text-[var(--text-secondary)]">
              {CONTENT.booking.note}
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
