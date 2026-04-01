import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, MapPin } from 'lucide-react'
import { useRef } from 'react'
import { IMAGES } from '../../config/images'
import { CONTENT } from '../../data/content'
import { AnimatedButton } from '../ui/AnimatedButton'

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function HeroSection() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollY, [0, 420], [0, reduced ? 0 : 90])

  const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: i * 0.12, ease: 'easeOut' },
    }),
  }

  return (
    <section
      id="home"
      ref={ref}
      className="relative z-10 flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pb-24 pt-28 md:px-8"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 h-full w-full ${reduced ? '' : 'hero-ken-burns'}`}
        >
          <img
            src={IMAGES.heroBg}
            alt="B&B Catherina — vue d’accueil en Toscane"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-[var(--bg-end)] dark:to-[var(--bg-end)]" />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="glass-panel relative z-10 mx-auto w-full max-w-[600px] rounded-card border border-[var(--glass-border)] px-6 py-10 text-center shadow-glass backdrop-blur-xl md:px-10"
      >
        <motion.p
          variants={fadeInUp}
          custom={0}
          className="font-accent text-xs uppercase tracking-[0.4em] text-[var(--accent)]"
        >
          {CONTENT.hero.preTitle}
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          custom={1}
          className="font-display mt-3 text-[clamp(2.625rem,6vw,4.5rem)] font-semibold italic leading-none text-[var(--text-primary)]"
        >
          {CONTENT.hero.title}
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          custom={2}
          className="mt-4 text-base text-[var(--text-secondary)] md:text-lg"
        >
          {CONTENT.hero.subtitle}
        </motion.p>
        <motion.div
          variants={fadeInUp}
          custom={3}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <AnimatedButton onClick={() => scrollToSection('about')}>
            {CONTENT.hero.cta.toUpperCase()}
          </AnimatedButton>
          <AnimatedButton
            variant="ghost"
            onClick={() => scrollToSection('rooms')}
          >
            {CONTENT.hero.ctaSecondary}
          </AnimatedButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="glass-panel absolute bottom-8 left-4 z-10 flex max-w-[280px] items-center gap-3 rounded-2xl border border-[var(--glass-border)] px-4 py-3 text-sm text-[var(--text-primary)] shadow-glass md:left-10"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
        </span>
        <MapPin className="h-4 w-4 text-[var(--accent)]" aria-hidden />
        <span className="font-accent text-xs tracking-wide">
          Ponsacco, Tuscany
        </span>
      </motion.div>

      <button
        type="button"
        onClick={() => scrollToSection('about')}
        className="focus-ring absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[var(--text-primary)]"
        aria-label="Faire défiler vers le bas"
      >
        <ChevronDown className="h-8 w-8 animate-scroll-bounce opacity-80" />
      </button>
    </section>
  )
}
