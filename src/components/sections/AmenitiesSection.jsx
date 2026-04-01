import { motion, useReducedMotion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { useI18n } from '../../context/I18nContext'
import { IMAGES } from '../../config/images'
import { fadeInUp, useScrollAnimationVariants } from '../../hooks/useScrollAnimation'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'

const THUMB_SRC = {
  breakfast: IMAGES.amenityBreakfast,
  garden: IMAGES.amenityGarden,
  parking: IMAGES.amenityParking,
  kitchen: IMAGES.amenityKitchen,
}

function scrollToGallery() {
  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
}

export function AmenitiesSection() {
  const { t, messages } = useI18n()
  const v = useScrollAnimationVariants(fadeInUp)
  const reduced = useReducedMotion()

  return (
    <section
      id="amenities"
      className="relative z-10 border-t border-[var(--glass-border)]/30 py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(200, 114, 74, 0.12), transparent 55%)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle
          label={messages.amenities.sectionLabel}
          title={messages.amenities.sectionTitle}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {messages.amenities.items.map((item, i) => {
            const Icon = Icons[item.icon] ?? Icons.Sparkles
            return (
              <motion.div
                key={`${item.icon}-${item.label}`}
                variants={v}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
              >
                <GlassCard className="h-full p-6 md:p-8">
                  <motion.div
                    whileHover={
                      reduced
                        ? undefined
                        : { rotate: 10, scale: 1.1 }
                    }
                    transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                    className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)] ring-1 ring-[var(--accent)]/30"
                  >
                    <Icon className="h-7 w-7" aria-hidden />
                  </motion.div>
                  <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {item.desc}
                  </p>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14 flex flex-wrap justify-center gap-3 md:-space-x-5 md:gap-0 md:justify-end md:pr-2"
        >
          {messages.amenities.thumbs.map((thumb, idx) => (
            <motion.button
              key={thumb.key}
              type="button"
              variants={v}
              custom={idx}
              onClick={scrollToGallery}
              className="focus-ring relative overflow-hidden rounded-image border border-[var(--glass-border)] shadow-glass transition-transform hover:z-10 hover:scale-105 md:-ml-5 md:first:ml-0"
              style={{ width: 120, height: 80 }}
              aria-label={t('amenities.galleryAria', { label: thumb.label })}
            >
              <img
                src={THUMB_SRC[thumb.key]}
                alt={t('amenities.thumbAlt', { label: thumb.label })}
                className="h-full w-full object-cover"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
