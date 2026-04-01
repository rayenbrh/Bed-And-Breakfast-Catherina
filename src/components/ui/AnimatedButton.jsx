import { motion } from 'framer-motion'

const base =
  'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full px-8 py-3 text-sm font-semibold tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]'

export function AnimatedButton({
  variant = 'primary',
  className = '',
  children,
  href,
  type = 'button',
  onClick,
  target,
  rel,
  whileHover,
  whileTap,
  ...rest
}) {
  const variants = {
    primary:
      'bg-[var(--accent)] text-white shadow-glass hover:brightness-105 dark:shadow-[0_0_28px_rgba(200,114,74,0.35)]',
    ghost:
      'border border-[var(--glass-border)] bg-white/10 text-[var(--text-primary)] backdrop-blur-md dark:bg-white/5',
    subtle:
      'bg-transparent text-[var(--accent)] underline-offset-4 hover:underline',
  }

  const cls = `${base} ${variants[variant] ?? variants.primary} ${className}`

  const motionHover = whileHover ?? { scale: 1.04 }
  const motionTap = whileTap ?? { scale: 0.97 }

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={`${cls} focus-ring`}
        whileHover={motionHover}
        whileTap={motionTap}
        {...rest}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${cls} focus-ring`}
      whileHover={motionHover}
      whileTap={motionTap}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
