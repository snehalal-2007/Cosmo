/**
 * Cosmo – Time speed control: 0x (paused) to 10,000x, negative = reverse.
 */
import { motion } from 'framer-motion'
import { useSimulationStore } from '../../store'

function scaleToSlider(val: number): number {
  if (val === 0) return 0
  const sign = val < 0 ? -1 : 1
  const abs = Math.abs(val)
  const log = Math.log10(Math.max(abs, 0.1))
  const normalized = (log / 4) * sign
  return Math.max(-1, Math.min(1, normalized))
}

function sliderToScale(norm: number): number {
  if (norm === 0) return 0
  const sign = norm < 0 ? -1 : 1
  const abs = Math.min(Math.abs(norm), 1)
  const log = abs * 4
  const val = Math.pow(10, log)
  return sign * val
}

export function TimeSlider() {
  const timeMultiplier = useSimulationStore((s) => s.timeMultiplier)
  const setTimeMultiplier = useSimulationStore((s) => s.setTimeMultiplier)

  const norm = scaleToSlider(timeMultiplier)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setTimeMultiplier(sliderToScale(v))
  }

  const label =
    timeMultiplier === 0
      ? '0× Paused'
      : timeMultiplier === 1
        ? '1× Real time'
        : timeMultiplier === -1
          ? '-1×'
          : `${timeMultiplier >= 0 ? '' : '-'}${Math.abs(Math.round(timeMultiplier))}×`

  return (
    <motion.div
      className="flex flex-col gap-1"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between text-xs text-white/70">
        <span>Time</span>
        <span className="font-mono tabular-nums">{label}</span>
      </div>
      <input
        type="range"
        min={-1}
        max={1}
        step={0.01}
        value={norm}
        onChange={handleChange}
        className="h-1.5 w-32 accent-amber-400/80"
      />
    </motion.div>
  )
}
