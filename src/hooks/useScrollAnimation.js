import { useReducedMotion } from 'framer-motion'

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: 'easeOut',
    },
  }),
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.08,
      ease: 'easeOut',
    },
  }),
}

export const slideInRight = {
  hidden: { opacity: 0, x: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.08,
      ease: 'easeOut',
    },
  }),
}

export function useScrollAnimationVariants(baseVariants) {
  const reduced = useReducedMotion()
  if (reduced) {
    return {
      hidden: { opacity: 1, y: 0, x: 0 },
      visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0 } },
    }
  }
  return baseVariants
}
