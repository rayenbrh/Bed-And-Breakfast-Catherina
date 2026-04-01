import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { IMAGES } from '../../config/images'
import { fadeInUp, useScrollAnimationVariants } from '../../hooks/useScrollAnimation'
import { SectionTitle } from '../ui/SectionTitle'

const GALLERY = [
  { key: 'gallery1', src: IMAGES.gallery1, label: 'Chambre' },
  { key: 'gallery2', src: IMAGES.gallery2, label: 'Espace commun' },
  { key: 'gallery3', src: IMAGES.gallery3, label: 'Jardin' },
  { key: 'gallery4', src: IMAGES.gallery4, label: 'Salle de bain' },
  { key: 'gallery5', src: IMAGES.gallery5, label: 'Petit-déjeuner' },
  { key: 'gallery6', src: IMAGES.gallery6, label: 'Toscane' },
]

export function GallerySection() {
  const [mobile, setMobile] = useState(false)
  const v = useScrollAnimationVariants(fadeInUp)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <section id="gallery" className="relative z-10 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionTitle label="Moments" title="Gallery" />

        {mobile ? (
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1.08}
            centeredSlides
            pagination={{ clickable: true }}
            className="!pb-10"
          >
            {GALLERY.map((g, i) => (
              <SwiperSlide key={g.key}>
                <motion.figure
                  variants={v}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                  className="group relative overflow-hidden rounded-image border border-[var(--glass-border)] shadow-glass"
                >
                  <img
                    src={g.src}
                    alt={`B&B Catherina — ${g.label}`}
                    className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <figcaption className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/55 to-transparent p-4 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {g.label}
                  </figcaption>
                </motion.figure>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:auto-rows-[220px]">
            {GALLERY.map((g, i) => {
              const layout =
                i === 0
                  ? 'col-span-2 row-span-2 md:col-span-1'
                  : i === 3
                    ? 'col-span-2 md:col-span-2'
                    : ''
              return (
                <motion.figure
                  key={g.key}
                  variants={v}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  className={`group relative overflow-hidden rounded-image border border-[var(--glass-border)] shadow-glass ${layout}`}
                >
                  <img
                    src={g.src}
                    alt={`B&B Catherina — ${g.label}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <figcaption className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {g.label}
                  </figcaption>
                </motion.figure>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
