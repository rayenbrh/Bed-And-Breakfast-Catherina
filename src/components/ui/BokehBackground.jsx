import { useTheme } from '../../context/ThemeContext'

const ORBS = [
  { w: 220, h: 180, top: '8%', left: '5%', blur: 56, delay: 0, duration: 14 },
  { w: 140, h: 140, top: '62%', left: '8%', blur: 48, delay: 1.2, duration: 11 },
  { w: 300, h: 260, top: '18%', right: '4%', blur: 72, delay: 2.1, duration: 16 },
  { w: 100, h: 100, bottom: '12%', right: '18%', blur: 40, delay: 0.4, duration: 9 },
  { w: 180, h: 160, top: '48%', left: '22%', blur: 52, delay: 3, duration: 12 },
  { w: 120, h: 200, bottom: '22%', left: '12%', blur: 60, delay: 1.7, duration: 13 },
  { w: 260, h: 200, top: '72%', right: '28%', blur: 64, delay: 0.9, duration: 15 },
  { w: 90, h: 90, top: '32%', left: '42%', blur: 38, delay: 2.6, duration: 10 },
  { w: 200, h: 140, top: '6%', left: '38%', blur: 50, delay: 1.1, duration: 12 },
  { w: 160, h: 120, bottom: '8%', right: '6%', blur: 44, delay: 2.4, duration: 11 },
]

export function BokehBackground() {
  const { theme } = useTheme()
  if (theme !== 'dark') return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="bokeh-orb"
          style={{
            width: orb.w,
            height: orb.h,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            opacity: 0.06 + (i % 5) * 0.018,
            filter: `blur(${orb.blur}px)`,
            background: `radial-gradient(circle at 30% 30%, rgba(244, 196, 120, 0.9), rgba(200, 114, 74, 0.15) 55%, transparent 70%)`,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
