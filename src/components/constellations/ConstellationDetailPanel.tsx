/**
 * Cosmo – Constellation info panel (glassmorphism, slide-in).
 * Matches InfoPanel design language: name, description, mythology, brightest star, distance.
 */
import { motion, AnimatePresence } from 'framer-motion'
import type { ConstellationCatalogEntry } from '../../data/constellationCatalog'

type ConstellationDetailPanelProps = {
  constellation: ConstellationCatalogEntry | null
  onClose: () => void
}

export function ConstellationDetailPanel({
  constellation,
  onClose,
}: ConstellationDetailPanelProps) {
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
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
