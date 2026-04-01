import { motion, useReducedMotion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { IMAGES } from '../../config/images'
import { CONTENT } from '../../data/content'
import { fadeInUp, useScrollAnimationVariants } from '../../hooks/useScrollAnimation'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'

const THUMBS = [
  { src: IMAGES.amenityBreakfast, label: 'Petit-déjeuner' },
  { src: IMAGES.amenityGarden, label: 'Jardin' },
  { src: IMAGES.amenityParking, label: 'Parking' },
  { src: IMAGES.amenityKitchen, label: 'Cuisine' },
]

function scrollToGallery() {
  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
}

export function AmenitiesSection() {
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
        <SectionTitle label="Comfort" title="Amenities" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONTENT.amenities.map((item, i) => {
            const Icon = Icons[item.icon] ?? Icons.Sparkles
            return (
              <motion.div
                key={item.label}
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
          {THUMBS.map((t, idx) => (
            <motion.button
              key={t.label}
              type="button"
              variants={v}
              custom={idx}
              onClick={scrollToGallery}
              className="focus-ring relative overflow-hidden rounded-image border border-[var(--glass-border)] shadow-glass transition-transform hover:z-10 hover:scale-105 md:-ml-5 md:first:ml-0"
              style={{ width: 120, height: 80 }}
              aria-label={`Voir la galerie — ${t.label}`}
            >
              <img
                src={t.src}
                alt={`B&B Catherina — ${t.label}`}
                className="h-full w-full object-cover"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
