/**
 * Cosmo – Bottom right: planet/moon info panel (glassmorphism, slide-in).
 * Remains visible until closed or selection cleared via canvas onPointerMissed.
 */
import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSimulationStore } from '../../store'
import { PLANETS_DATA, getMoonData } from '../../data/planets'
import type { PlanetId, MoonData } from '../../data/planets'
import { useDailyFact } from './useDailyFact'

function tempKToC(k: number): number {
  return Math.round(k - 273.15)
}

function PlanetContent({
  data,
  dailyFact,
}: {
  data: (typeof PLANETS_DATA)[PlanetId]
  dailyFact: { title: string; explanation: string } | null
}) {
  const setSelectedPlanet = useSimulationStore((s) => s.setSelectedPlanet)

  return (
    <>
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <h2 className="text-lg font-light text-white">{data.name}</h2>
        <button
          type="button"
          onClick={() => setSelectedPlanet(null)}
          className="rounded p-1 text-white/60 hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm text-white/85">
        <section>
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
            Orbital period
          </h3>
          <p className="font-mono">{data.orbitalPeriodDays.toFixed(1)} Earth days</p>
        </section>

        <section>
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
            Eccentricity
          </h3>
          <p className="font-mono">{data.eccentricity}</p>
        </section>

        <section>
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
            Inclination
          </h3>
          <p className="font-mono">{data.inclinationDeg}°</p>
        </section>

        <section>
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
            Distance from Sun
          </h3>
          <p className="font-mono">{data.distanceAU} AU</p>
        </section>

        <section>
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
            Surface gravity
          </h3>
          <p className="font-mono">{data.gravityMS2} m/s²</p>
        </section>

        <section>
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
            Surface temperature
          </h3>
          <p className="font-mono">{tempKToC(data.surfaceTempK)}°C (avg)</p>
        </section>

        <section>
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">Mass</h3>
          <p className="font-mono">{data.massKg} kg</p>
        </section>

        <section>
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
            Composition
          </h3>
          <p>{data.composition}</p>
        </section>

        <section>
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">Fact</h3>
          <p>{data.fact}</p>
        </section>

        {dailyFact && (
          <section className="rounded-lg border border-white/10 bg-white/5 p-3">
            <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-amber-400/80">
              Daily from NASA
            </h3>
            <p className="text-xs text-white/80">{dailyFact.title}</p>
            <p className="mt-1 text-xs text-white/60 line-clamp-3">{dailyFact.explanation}</p>
          </section>
        )}
      </div>
    </>
  )
}

function MoonContent({ data }: { data: MoonData }) {
  const setSelectedPlanet = useSimulationStore((s) => s.setSelectedPlanet)

  return (
    <>
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <h2 className="text-lg font-light text-white">{data.name}</h2>
        <button
          type="button"
          onClick={() => setSelectedPlanet(null)}
          className="rounded p-1 text-white/60 hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm text-white/85">
        <section>
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
            Orbital period (around Earth)
          </h3>
          <p className="font-mono">{data.orbitalPeriodDays.toFixed(1)} Earth days</p>
        </section>

        <section>
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
            Rotation period
          </h3>
          <p className="font-mono">{data.rotationPeriodDays.toFixed(1)} Earth days (tidally locked)</p>
        </section>

        <section>
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
            Distance from Earth
          </h3>
          <p className="font-mono">{data.distanceFromEarthAU.toFixed(5)} AU</p>
        </section>

        <section>
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">Fact</h3>
          <p>{data.fact}</p>
        </section>
      </div>
    </>
  )
}

export function InfoPanel() {
  const selectedPlanet = useSimulationStore((s) => s.selectedPlanet)
  const dailyFact = useDailyFact()
  const panelRef = useRef<HTMLElement>(null)

  const isPlanet = selectedPlanet != null && selectedPlanet !== 'moon'
  const planetData = isPlanet ? PLANETS_DATA[selectedPlanet as PlanetId] : null
  const moonData = selectedPlanet === 'moon' ? getMoonData() : null
  const showPanel = planetData != null || moonData != null

  return (
    <AnimatePresence>
      {showPanel && (
        <motion.aside
          ref={panelRef}
          className="absolute bottom-0 right-0 z-10 flex max-h-[70vh] w-80 flex-col rounded-tl-xl border-l border-t border-white/10 bg-black/60 backdrop-blur-md"
          initial={{ y: 400 }}
          animate={{ y: 0 }}
          exit={{ y: 400 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          {planetData && <PlanetContent data={planetData} dailyFact={dailyFact} />}
          {moonData && <MoonContent data={moonData} />}
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
