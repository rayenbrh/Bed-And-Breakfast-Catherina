import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { IMAGES } from '../../config/images'
import { SITE_CONFIG } from '../../data/siteConfig'
import {
  slideInLeft,
  slideInRight,
  useScrollAnimationVariants,
} from '../../hooks/useScrollAnimation'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'

export function LocationSection() {
  const { messages } = useI18n()
  const loc = messages.location
  const vL = useScrollAnimationVariants(slideInLeft)
  const vR = useScrollAnimationVariants(slideInRight)

  return (
    <section
      id="location"
      className="relative z-10 border-t border-[var(--glass-border)]/40 py-20 md:py-28"
      style={{ backgroundColor: 'var(--section-tint)' }}
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-8">
        <motion.div
          variants={vL}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <SectionTitle align="left" label={loc.label} title={loc.title} />
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {loc.description.trim()}
          </p>

          <ul className="mt-10 space-y-4">
            {loc.distances.map((d, i) => {
              const Icon = Icons[d.icon] ?? Icons.MapPin
              return (
                <motion.li
                  key={d.label}
                  variants={vL}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] px-4 py-3 backdrop-blur-md"
                >
                  <span className="flex items-center gap-3 text-sm text-[var(--text-primary)]">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-[var(--accent)] dark:bg-white/5">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    {d.label}
                  </span>
                  <span className="font-accent text-xs uppercase tracking-wider text-[var(--accent)]">
                    {d.value}
                  </span>
                </motion.li>
              )
            })}
          </ul>
        </motion.div>

        <motion.div
          variants={vR}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          <GlassCard className="overflow-hidden p-0">
            <iframe
              title={loc.mapTitle}
              src={SITE_CONFIG.mapEmbedUrl}
              className="h-[320px] w-full md:h-[380px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </GlassCard>
          <div className="overflow-hidden rounded-image shadow-glass ring-1 ring-white/30">
            <img
              src={IMAGES.locationPhoto}
              alt={loc.photoAlt}
              className="h-48 w-full object-cover md:h-56"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
