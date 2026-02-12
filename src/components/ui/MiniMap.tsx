/**
 * Cosmo – Bottom left: simplified solar system overview + toggles.
 */
import { motion } from 'framer-motion'
import { useSimulationStore } from '../../store'
import {
  PLANETS_DATA,
  PLANET_IDS,
  PLANET_COLORS,
  orbitAngleRad,
  getVisualOrbitRadius,
} from '../../data/planets'

const SUN_R = 6
const PLANET_R = 3
/** Asteroid belt between Mars (~1.52 AU) and Jupiter (~5.2 AU); inner ~2.2 AU, outer ~3.2 AU. */
const ASTEROID_BELT_INNER_AU = 2.2
const ASTEROID_BELT_OUTER_AU = 3.2

/** SVG ring (annulus) for the asteroid belt in Overview. */
function AsteroidBeltRing({
  cx,
  cy,
  innerR,
  outerR,
}: {
  cx: number
  cy: number
  innerR: number
  outerR: number
}) {
  const outerPath = `M ${cx + outerR} ${cy} A ${outerR} ${outerR} 0 1 1 ${cx - outerR} ${cy} A ${outerR} ${outerR} 0 1 1 ${cx + outerR} ${cy}`
  const innerPath = `M ${cx + innerR} ${cy} A ${innerR} ${innerR} 0 1 0 ${cx - innerR} ${cy} A ${innerR} ${innerR} 0 1 0 ${cx + innerR} ${cy}`
  return (
    <path
      d={`${outerPath} Z ${innerPath} Z`}
      fill="rgba(180,160,120,0.22)"
      fillRule="evenodd"
      stroke="rgba(200,180,140,0.45)"
      strokeWidth="0.6"
    />
  )
}

export function MiniMap() {
  const simulationTimeDays = useSimulationStore((s) => s.simulationTimeDays)

  const maxOrbit = Math.max(
    ...PLANET_IDS.map((id) => getVisualOrbitRadius(PLANETS_DATA[id].distanceAU))
  )
  const norm = 50 / maxOrbit

  return (
    <motion.div
      className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/40 p-3 backdrop-blur-md"
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
          {/* Asteroid belt (ring between Mars and Jupiter) */}
          <AsteroidBeltRing
            cx={60}
            cy={60}
            innerR={getVisualOrbitRadius(ASTEROID_BELT_INNER_AU) * norm}
            outerR={getVisualOrbitRadius(ASTEROID_BELT_OUTER_AU) * norm}
          />
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
                fill={PLANET_COLORS[id]}
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="0.5"
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
