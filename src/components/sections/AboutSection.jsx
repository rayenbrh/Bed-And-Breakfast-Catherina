import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useI18n } from '../../context/I18nContext'
import { IMAGES } from '../../config/images'
import {
  slideInLeft,
  slideInRight,
  useScrollAnimationVariants,
} from '../../hooks/useScrollAnimation'
import { AnimatedButton } from '../ui/AnimatedButton'

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function useCountUp(target, enabled) {
  const num = Number(target)
  const isNumeric = !Number.isNaN(num)
  const [value, setValue] = useState(() => (isNumeric ? 0 : target))

  useEffect(() => {
    if (!enabled || !isNumeric) return undefined
    let raf
    const start = performance.now()
    const dur = 1200
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - (1 - p) ** 3
      setValue(Math.round(num * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [enabled, isNumeric, num])

  if (!isNumeric) return String(target)
  return `${value}`
}

function StatBlock({ stat }) {
  const { t } = useI18n()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  const numStr = useCountUp(stat.value, inView)
  const unit =
    stat.suffixType === 'mi'
      ? t('units.mi')
      : stat.suffixType === 'min'
        ? t('units.min')
        : ''
  const display = unit ? `${numStr}${unit}` : numStr

  return (
    <div ref={ref} className="text-center md:text-left">
      <p className="font-display text-4xl font-semibold text-[var(--accent)]">
        {display}
      </p>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">{stat.label}</p>
    </div>
  )
}

export function AboutSection() {
  const { messages } = useI18n()
  const vL = useScrollAnimationVariants(slideInLeft)
  const vR = useScrollAnimationVariants(slideInRight)

  return (
    <section
      id="about"
      className="relative z-10 border-t border-transparent py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:grid-cols-2 md:gap-16 md:px-8">
        <motion.div
          variants={vL}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="order-2 md:order-1"
        >
          <p className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent)]">
            {messages.about.label}
          </p>
          <div className="mt-2 h-px w-16 bg-[var(--accent)]/80" />
          <h2 className="font-display mt-6 text-4xl font-semibold leading-tight text-[var(--text-primary)] md:text-5xl whitespace-pre-line">
            {messages.about.title}
          </h2>
          <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
            {messages.about.body.trim()}
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6">
            {messages.about.stats.map((s) => (
              <StatBlock key={s.label} stat={s} />
            ))}
          </div>

          <AnimatedButton
            variant="ghost"
            className="mt-10"
            onClick={() => scrollToSection('rooms')}
          >
            {messages.about.cta}
          </AnimatedButton>
        </motion.div>

        <motion.div
          variants={vR}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative order-1 md:order-2"
        >
          <motion.div
            whileHover={{ rotateX: 2, rotateY: -2 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{ perspective: 1000 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-image shadow-glass ring-1 ring-white/40">
              <img
                src={IMAGES.aboutMain}
                alt={messages.about.imageMainAlt}
                className="h-[340px] w-full object-cover md:h-[420px]"
              />
            </div>
            <div className="absolute -bottom-8 -left-4 w-[55%] max-w-[240px] -rotate-3 overflow-hidden rounded-image shadow-glass ring-1 ring-white/30 md:-left-8">
              <img
                src={IMAGES.aboutAccent}
                alt={messages.about.imageAccentAlt}
                className="h-40 w-full object-cover md:h-48"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
