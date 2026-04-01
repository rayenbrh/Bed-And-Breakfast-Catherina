import { motion } from 'framer-motion'
import { fadeInUp, useScrollAnimationVariants } from '../../hooks/useScrollAnimation'

export function SectionTitle({
  label,
  title,
  align = 'center',
  className = '',
}) {
  const v = useScrollAnimationVariants(fadeInUp)

  const alignCls =
    align === 'center'
      ? 'text-center mx-auto'
      : align === 'left'
        ? 'text-left'
        : 'text-right'

  return (
    <div className={`mb-12 md:mb-16 ${alignCls} ${className}`}>
      {label && (
        <motion.p
          variants={v}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="font-accent text-xs uppercase tracking-[0.35em] text-[var(--accent)]"
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        variants={v}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={1}
        className="font-display mt-3 max-w-3xl text-4xl font-semibold leading-tight text-[var(--text-primary)] md:text-5xl whitespace-pre-line"
      >
        {title}
      </motion.h2>
    </div>
  )
}
