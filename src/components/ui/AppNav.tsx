/**
 * Cosmo – Top-level navigation: Solar System | Constellations.
 * Styled consistently with PlanetNav (glassmorphism, same button styles).
 */
import { motion } from 'framer-motion'
import { useViewStore } from '../../store/view'
import type { AppView } from '../../store/view'

const TABS: { id: AppView; label: string }[] = [
  { id: 'solar', label: 'Solar System' },
  { id: 'constellations', label: 'Constellations' },
]

export function AppNav() {
  const appView = useViewStore((s) => s.appView)
  const setAppView = useViewStore((s) => s.setAppView)

  return (
    <motion.div
      className="absolute left-1/2 top-4 z-20 flex -translate-x-1/2 flex-row items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.4 }}
    >
      {TABS.map(({ id, label }) => {
        const isSelected = appView === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => setAppView(id)}
            className={`shrink-0 rounded-md px-2.5 py-1.5 text-sm whitespace-nowrap transition-colors ${
              isSelected
                ? 'bg-white/20 text-white'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            {label}
          </button>
        )
      })}
    </motion.div>
  )
}
