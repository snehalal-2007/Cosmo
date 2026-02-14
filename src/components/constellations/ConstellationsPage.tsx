/**
 * Cosmo – Constellations Mode: real planetarium sky (full celestial sphere).
 * RA/Dec star catalog, constellation overlays, pan/zoom, search, alphabetical list.
 */
import { useCallback, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { PlanetariumScene } from './planetarium/PlanetariumScene'
import { ConstellationDetailPanel } from './ConstellationDetailPanel'
import { CONSTELLATION_CATALOG } from '../../data/constellationCatalog'
import type { ConstellationCatalogEntry } from '../../data/constellationCatalog'

export function ConstellationsPage() {
  const [showConstellationLines, setShowConstellationLines] = useState(true)
  const [showConstellationNames, setShowConstellationNames] = useState(false)
  const [selectedConstellation, setSelectedConstellation] =
    useState<ConstellationCatalogEntry | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleClosePanel = useCallback(() => setSelectedConstellation(null), [])

  const filteredAndSortedConstellations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    let list = q
      ? CONSTELLATION_CATALOG.filter((c) => c.name.toLowerCase().includes(q))
      : [...CONSTELLATION_CATALOG]
    list = list.slice().sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [searchQuery])

  return (
    <div className="fixed inset-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 2000 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <PlanetariumScene
          showConstellationLines={showConstellationLines}
          showConstellationNames={showConstellationNames}
          selectedConstellation={selectedConstellation}
        />
      </Canvas>

      {/* Toggles: same design language as HUD / PlanetNav */}
      <motion.div
        className="absolute left-4 top-4 z-10 flex flex-col gap-2 rounded-xl border border-white/10 bg-black/40 p-3 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <label className="flex cursor-pointer items-center gap-2 text-sm text-white/90">
          <input
            type="checkbox"
            checked={showConstellationLines}
            onChange={(e) => setShowConstellationLines(e.target.checked)}
            className="rounded border-white/30 bg-white/10"
          />
          Constellation lines
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-white/90">
          <input
            type="checkbox"
            checked={showConstellationNames}
            onChange={(e) => setShowConstellationNames(e.target.checked)}
            className="rounded border-white/30 bg-white/10"
          />
          Constellation names
        </label>
      </motion.div>

      {/* Constellation list: search + alphabetical, click to open detail panel */}
      <motion.div
        className="absolute bottom-4 left-4 z-10 flex max-h-[40vh] w-56 flex-col rounded-xl border border-white/10 bg-black/40 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <p className="mb-2 px-3 pt-2 text-xs uppercase tracking-wider text-white/50">
          Constellations
        </p>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mx-3 mb-2 rounded-md border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white placeholder-white/40 focus:border-white/20 focus:outline-none"
          aria-label="Search constellations"
        />
        <div className="flex flex-col gap-1 overflow-y-auto px-3 pb-2">
          {filteredAndSortedConstellations.map((con) => (
            <button
              key={con.id}
              type="button"
              onClick={() => setSelectedConstellation(con)}
              className={`rounded px-2 py-1 text-left text-sm transition-colors ${
                selectedConstellation?.id === con.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {con.name}
            </button>
          ))}
        </div>
      </motion.div>

      <ConstellationDetailPanel
        constellation={selectedConstellation}
        onClose={handleClosePanel}
      />
    </div>
  )
}
