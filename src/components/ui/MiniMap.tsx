/**
 * Cosmo – Bottom left: simplified solar system overview + toggles.
 */
import { motion } from 'framer-motion'
import { useSimulationStore } from '../../store'
import { PLANETS_DATA, PLANET_IDS } from '../../data/planets'
import { orbitAngleRad } from '../../data/planets'
import { getVisualOrbitRadius } from '../../data/planets'

const SUN_R = 6
const PLANET_R = 3

export function MiniMap() {
  const simulationTimeDays = useSimulationStore((s) => s.simulationTimeDays)

  const maxOrbit = Math.max(
    ...PLANET_IDS.map((id) => getVisualOrbitRadius(PLANETS_DATA[id].distanceAU))
  )
  const norm = 50 / maxOrbit

  return (
    <motion.div
      className="absolute bottom-4 left-4 z-10 flex flex-col gap-3 rounded-xl border border-white/10 bg-black/40 p-3 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <div className="text-xs font-medium text-white/80">Overview</div>
      <div
        className="relative h-28 w-28 rounded-full border border-white/15 bg-white/5"
        style={{ minWidth: 120, minHeight: 120 }}
      >
        <svg className="h-full w-full" viewBox="0 0 120 120">
          {/* orbits */}
          {PLANET_IDS.map((id) => {
            const r = getVisualOrbitRadius(PLANETS_DATA[id].distanceAU) * norm
            return (
              <ellipse
                key={`orbit-${id}`}
                cx="60"
                cy="60"
                rx={r}
                ry={r}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.5"
              />
            )
          })}
          {/* Sun */}
          <circle cx="60" cy="60" r={SUN_R} fill="#fff5e0" opacity={0.9} />
          {/* planets */}
          {PLANET_IDS.map((id) => {
            const data = PLANETS_DATA[id]
            const angle = orbitAngleRad(simulationTimeDays, data.orbitalPeriodDays)
            const r = getVisualOrbitRadius(data.distanceAU) * norm
            const x = 60 + r * Math.cos(angle)
            const y = 60 + r * Math.sin(angle)
            return (
              <circle
                key={id}
                cx={x}
                cy={y}
                r={PLANET_R}
                fill="currentColor"
                className="text-white/80"
              />
            )
          })}
        </svg>
      </div>
      <div className="flex flex-col gap-1.5 text-xs text-white/70">
        <label className="flex items-center gap-2">
          <input type="checkbox" defaultChecked={false} className="rounded" />
          <span>Asteroid Belt</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" defaultChecked={false} className="rounded" />
          <span>Comets</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" defaultChecked={false} className="rounded" />
          <span>Missions / Trajectories</span>
        </label>
      </div>
    </motion.div>
  )
}
