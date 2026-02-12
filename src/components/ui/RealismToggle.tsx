/**
 * Cosmo – Real Mode vs Visual Mode (top left).
 */
import { motion } from 'framer-motion'
import { useSimulationStore } from '../../store'
import type { ScaleMode } from '../../store'

const OPTIONS: { value: ScaleMode; label: string }[] = [
  { value: 'real', label: 'Real Mode' },
  { value: 'visual', label: 'Visual Mode' },
]

export function RealismToggle() {
  const scaleMode = useSimulationStore((s) => s.scaleMode)
  const setScaleMode = useSimulationStore((s) => s.setScaleMode)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setScaleMode(opt.value)}
            className="relative rounded-md px-3 py-1.5 text-xs text-white/80 transition-colors hover:text-white"
          >
            {scaleMode === opt.value && (
              <motion.span
                layoutId="scale-toggle"
                className="absolute inset-0 rounded-md bg-white/15"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
