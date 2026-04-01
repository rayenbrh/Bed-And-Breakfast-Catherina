import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useRef } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useI18n } from '../../context/I18nContext'
import { fadeInUp, useScrollAnimationVariants } from '../../hooks/useScrollAnimation'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'

export function TestimonialsSection() {
  const { messages } = useI18n()
  const ts = messages.testimonials
  const swiperRef = useRef(null)
  const v = useScrollAnimationVariants(fadeInUp)

  return (
    <section id="testimonials" className="relative z-10 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle label={ts.sectionLabel} title={ts.sectionTitle} />

        <motion.div
          variants={v}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          <Swiper
            modules={[Autoplay]}
            loop
            speed={700}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              768: { slidesPerView: 1.5, spaceBetween: 24 },
              1024: { slidesPerView: 2, spaceBetween: 28 },
            }}
            onSwiper={(s) => {
              swiperRef.current = s
            }}
            className="testimonials-swiper !pb-6"
          >
            {ts.items.map((item) => (
              <SwiperSlide key={item.name} className="!h-auto">
                <GlassCard className="mx-auto flex h-full min-h-full max-w-xl flex-col p-8">
                  <div className="flex gap-1 text-[var(--accent)]">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-current"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <blockquote className="font-display mt-4 text-lg italic leading-relaxed text-[var(--text-primary)]">
                    “{item.text.trim()}”
                  </blockquote>
                  <footer className="mt-6 flex items-center justify-between text-sm text-[var(--text-secondary)]">
                    <span className="font-medium text-[var(--text-primary)]">
                      {item.name}
                    </span>
                    <span>
                      {item.country} {item.flag}
                    </span>
                  </footer>
                </GlassCard>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-8 flex justify-center gap-4">
            <button
              type="button"
              aria-label={ts.prevAria}
              className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass)] text-[var(--text-primary)] shadow-glass backdrop-blur-md"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label={ts.nextAria}
              className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass)] text-[var(--text-primary)] shadow-glass backdrop-blur-md"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
