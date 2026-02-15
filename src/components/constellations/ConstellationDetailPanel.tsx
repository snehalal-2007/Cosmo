/**
 * Cosmo – Constellation info panel (glassmorphism, slide-in).
 * Name, description, mythology, brightest star, distance; stars list + clickable star details.
 */
import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ConstellationCatalogEntry } from '../../data/constellationCatalog'
import { getStarById } from '../../data/starCatalog'
import type { StarRecord } from '../../data/starCatalog'

function formatStarDisplayName(id: string): string {
  return id
    .split(/[- ]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ')
}

type ConstellationDetailPanelProps = {
  constellation: ConstellationCatalogEntry | null
  selectedStar: StarRecord | null
  onSelectStar: (star: StarRecord | null) => void
  onClose: () => void
}

export function ConstellationDetailPanel({
  constellation,
  selectedStar,
  onSelectStar,
  onClose,
}: ConstellationDetailPanelProps) {
  const constellationStars = useMemo(() => {
    if (!constellation) return []
    const ids = new Set<string>()
    for (const [a, b] of constellation.lineSegments) {
      ids.add(a)
      ids.add(b)
    }
    const stars: StarRecord[] = []
    ids.forEach((id) => {
      const star = getStarById(id)
      if (star) {
        stars.push(star)
      } else if (import.meta.env.DEV) {
        console.warn(`[ConstellationDetailPanel] Star not in catalog: "${id}" (constellation: ${constellation.name})`)
      }
    })
    return stars.sort((a, b) => formatStarDisplayName(a.id).localeCompare(formatStarDisplayName(b.id)))
  }, [constellation])

  return (
    <AnimatePresence>
      {constellation && (
        <motion.aside
          className="absolute bottom-0 right-0 z-10 flex max-h-[70vh] w-80 flex-col rounded-tl-xl border-l border-t border-white/10 bg-black/60 backdrop-blur-md"
          initial={{ y: 400 }}
          animate={{ y: 0 }}
          exit={{ y: 400 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <h2 className="text-lg font-light text-white">{constellation.name}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1 text-white/60 hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm text-white/85">
            <section>
              <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
                Description
              </h3>
              <p>{constellation.description}</p>
            </section>

            <section>
              <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
                Mythology & history
              </h3>
              <p>{constellation.mythology}</p>
            </section>

            <section>
              <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
                Brightest star
              </h3>
              <p className="font-mono">{constellation.brightestStar}</p>
            </section>

            {constellation.distanceLy != null && (
              <section>
                <h3 className="mb-1 text-xs font-medium uppercase tracking-wider text-white/60">
                  Distance from Earth
                </h3>
                <p className="font-mono">
                  {constellation.distanceLy.toLocaleString()} light-years
                </p>
              </section>
            )}

            <section>
              <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/60">
                ⭐ Stars in this Constellation
              </h3>
              <div className="flex flex-wrap gap-2">
                {constellationStars.map((star) => {
                  const isSelected = selectedStar?.id === star.id
                  return (
                    <button
                      key={star.id}
                      type="button"
                      onClick={() =>
                        onSelectStar(isSelected ? null : star)
                      }
                      className={`rounded-full px-3 py-1.5 text-sm font-medium text-white transition-all duration-200 hover:scale-105 ${
                        isSelected
                          ? 'bg-sky-400/40 ring-1 ring-sky-300/60 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                          : 'bg-white/10 hover:bg-white/20 hover:ring-1 hover:ring-white/20'
                      }`}
                    >
                      {formatStarDisplayName(star.id)}
                    </button>
                  )
                })}
              </div>
            </section>

            {selectedStar && (
              <section className="rounded-md border border-white/10 bg-white/5 p-3">
                <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-white/60">
                  🌟 Star Details
                </h3>
                <div className="space-y-1.5 text-sm">
                  <p>
                    <span className="text-white/60">Name</span>{' '}
                    <span className="font-medium text-white">
                      {formatStarDisplayName(selectedStar.id)}
                    </span>
                  </p>
                  <p>
                    <span className="text-white/60">Magnitude</span>{' '}
                    <span className="font-mono text-white">
                      {selectedStar.magnitude.toFixed(2)}
                    </span>
                  </p>
                </div>
              </section>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
