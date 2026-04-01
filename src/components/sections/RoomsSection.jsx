import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  Bath,
  Building2,
  Car,
  Check,
  Coffee,
  Monitor,
  Trees,
  Utensils,
  Wifi,
} from 'lucide-react'
import { useRef } from 'react'
import { useI18n } from '../../context/I18nContext'
import { IMAGES } from '../../config/images'
import { fadeInUp, useScrollAnimationVariants } from '../../hooks/useScrollAnimation'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'

const ROOM_ORDER = ['superior', 'deluxe']

const ROOM_IMAGES = {
  superior: IMAGES.roomSuperior,
  deluxe: IMAGES.roomDeluxe,
}

/** Stable feature ids → Lucide icons (labels come from i18n). */
const FEATURE_ICONS = {
  gardenView: Trees,
  kitchenette: Utensils,
  privateBathroom: Bath,
  freeWifi: Wifi,
  premiumFurnishings: Monitor,
  smartTv: Monitor,
}

function scrollToBooking() {
  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
}

function RoomCard({ roomKey, index }) {
  const { t, messages } = useI18n()
  const room = messages.rooms.items[roomKey]
  const roomFeatures = messages.roomFeatures
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 260,
    damping: 24,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 260,
    damping: 24,
  })

  function onMove(e) {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  const v = useScrollAnimationVariants(fadeInUp)
  const img = ROOM_IMAGES[roomKey]

  const ariaBooking = t('rooms.roomCtaAria', {
    cta: room.cta,
    roomName: room.name,
  })

  const imgAlt = t('rooms.roomImageAlt', { roomName: room.name })

  return (
    <motion.div
      ref={ref}
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      style={{ perspective: 1200 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={reduced ? undefined : { rotateX, rotateY }}
        whileHover={
          reduced
            ? undefined
            : {
                y: -8,
                transition: { type: 'spring', stiffness: 420, damping: 28 },
              }
        }
        className="group rounded-card shadow-glass transition-shadow duration-300 group-hover:shadow-[0_24px_56px_rgba(0,0,0,0.18)] dark:group-hover:shadow-[0_24px_56px_rgba(0,0,0,0.45)]"
      >
        <GlassCard hover={false} className="overflow-hidden p-0">
          <div className="relative h-[200px] overflow-hidden rounded-t-card">
            <img
              src={img}
              alt={imgAlt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="space-y-4 p-6 md:p-8">
            <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
              {room.name}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {room.description.replace(/\s+/g, ' ')}
            </p>
            <div className="flex flex-wrap gap-2">
              {room.featureIds.map((fid) => {
                const Icon = FEATURE_ICONS[fid] ?? Check
                const label = roomFeatures[fid] ?? fid
                return (
                  <span
                    key={fid}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-white/20 px-3 py-1 text-xs text-[var(--text-primary)] dark:bg-black/20"
                  >
                    <Icon className="h-3.5 w-3.5 text-[var(--accent)]" />
                    {label}
                  </span>
                )
              })}
            </div>
            <button
              type="button"
              onClick={scrollToBooking}
              className="group/btn focus-ring inline-flex min-h-[44px] items-center gap-1 rounded-lg text-sm font-semibold text-[var(--accent)]"
              aria-label={ariaBooking}
            >
              <span className="room-underline">{room.cta}</span>
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}

export function RoomsSection() {
  const { messages } = useI18n()
  const vBadge = useScrollAnimationVariants(fadeInUp)

  return (
    <section
      id="rooms"
      className="relative z-10 border-t border-[var(--glass-border)]/40 py-20 md:py-28"
      style={{ backgroundColor: 'var(--section-tint)' }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle
          label={messages.rooms.sectionLabel}
          title={messages.rooms.sectionTitle}
        />

        <div className="grid gap-10 md:grid-cols-2">
          {ROOM_ORDER.map((key, i) => (
            <RoomCard key={key} roomKey={key} index={i} />
          ))}
        </div>

        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-3 md:gap-4"
        >
          {messages.rooms.badges.map((b, i) => (
            <motion.span
              key={b.key}
              variants={vBadge}
              custom={i}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] shadow-glass backdrop-blur-md"
            >
              {b.key === 'breakfast' && (
                <Coffee className="h-4 w-4 text-[var(--accent)]" />
              )}
              {b.key === 'wifi' && (
                <Wifi className="h-4 w-4 text-[var(--accent)]" />
              )}
              {b.key === 'center' && (
                <Building2 className="h-4 w-4 text-[var(--accent)]" />
              )}
              {b.key === 'parking' && (
                <Car className="h-4 w-4 text-[var(--accent)]" />
              )}
              {b.label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
