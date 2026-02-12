/**
 * Cosmo – Bottom: horizontal planet navigation. Click to navigate camera to that body.
 */
import { motion } from 'framer-motion'
import { useSimulationStore } from '../../store'
import type { CelestialId } from '../../data/planets'
import { PLANETS_DATA, getMoonData } from '../../data/planets'

const NAV_ITEMS: { id: CelestialId | null; label: string }[] = [
  { id: null, label: 'Sun' },
  { id: 'mercury', label: PLANETS_DATA.mercury.name },
  { id: 'venus', label: PLANETS_DATA.venus.name },
  { id: 'earth', label: PLANETS_DATA.earth.name },
  { id: 'mars', label: PLANETS_DATA.mars.name },
  { id: 'jupiter', label: PLANETS_DATA.jupiter.name },
  { id: 'saturn', label: PLANETS_DATA.saturn.name },
  { id: 'uranus', label: PLANETS_DATA.uranus.name },
  { id: 'neptune', label: PLANETS_DATA.neptune.name },
  { id: 'moon', label: getMoonData().name },
]

export function PlanetNav() {
  const selectedPlanet = useSimulationStore((s) => s.selectedPlanet)
  const setSelectedPlanet = useSimulationStore((s) => s.setSelectedPlanet)

  return (
    <motion.div
      className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-row items-center gap-2 overflow-x-auto rounded-xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md scroll-smooth"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.4 }}
      style={{ maxWidth: 'calc(100vw - 2rem)' }}
    >
      {NAV_ITEMS.map(({ id, label }) => {
        const isSelected = selectedPlanet === id
        return (
          <button
            key={id ?? 'sun'}
            type="button"
            onClick={() => setSelectedPlanet(id)}
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
