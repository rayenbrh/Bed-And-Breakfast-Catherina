import { motion } from 'framer-motion'

export function GlassCard({
  className = '',
  children,
  hover = true,
  ...rest
}) {
  const base =
    'rounded-card glass-panel border border-[var(--glass-border)] text-[var(--text-primary)]'

  return (
    <motion.div
      className={`${base} ${className}`}
      whileHover={
        hover
          ? { y: -4, transition: { type: 'spring', stiffness: 320, damping: 22 } }
          : undefined
      }
      {...rest}
    >
      {children}
    </motion.div>
  )
}
