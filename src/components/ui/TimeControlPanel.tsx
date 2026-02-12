/**
 * Cosmo – Top Right: Play/Pause, Reverse, Speed, Date, Sun brightness.
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

export function TimeControlPanel() {
  const isPaused = useSimulationStore((s) => s.isPaused)
  const setPaused = useSimulationStore((s) => s.setPaused)
  const timeMultiplier = useSimulationStore((s) => s.timeMultiplier)
  const setTimeMultiplier = useSimulationStore((s) => s.setTimeMultiplier)
  const setSimulationTimeDays = useSimulationStore((s) => s.setSimulationTimeDays)
  const sunBrightness = useSimulationStore((s) => s.sunBrightness)
  const setSunBrightness = useSimulationStore((s) => s.setSunBrightness)

  const norm = scaleToSlider(timeMultiplier)

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    const newMult = sliderToScale(v)
    setTimeMultiplier(newMult)
  }

  const handleReverse = () => {
    setTimeMultiplier(-Math.abs(timeMultiplier) || -1)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value
    if (!dateStr) return
    const date = new Date(dateStr)
    const epoch = new Date('2000-01-01')
    const days = (date.getTime() - epoch.getTime()) / (86400 * 1000)
    setSimulationTimeDays(days)
  }

  const speedLabel =
    timeMultiplier === 0
      ? '0×'
      : timeMultiplier === 1
        ? '1×'
        : timeMultiplier === -1
          ? '-1×'
          : `${timeMultiplier >= 0 ? '' : '-'}${Math.abs(Math.round(timeMultiplier))}×`

  return (
    <motion.div
      className="absolute right-4 top-4 z-10 flex w-56 flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <div className="text-xs font-medium text-white/80">Time Control</div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setPaused(!isPaused)}
          className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20"
        >
          {isPaused ? 'Play' : 'Pause'}
        </button>
        <button
          type="button"
          onClick={handleReverse}
          className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20"
        >
          Reverse
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-xs text-white/70">
          <span>Speed</span>
          <span className="font-mono tabular-nums">{speedLabel}</span>
        </div>
        <input
          type="range"
          min={-1}
          max={1}
          step={0.01}
          value={norm}
          onChange={handleSpeedChange}
          className="h-1.5 w-full accent-amber-400/80"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/70">Date</label>
        <input
          type="date"
          defaultValue="2000-01-01"
          onChange={handleDateChange}
          className="rounded border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white"
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-xs text-white/70">
          <span>Sun brightness</span>
          <span className="font-mono tabular-nums">{Math.round(sunBrightness * 100)}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={sunBrightness}
          onChange={(e) => setSunBrightness(parseFloat(e.target.value))}
          className="h-1.5 w-full accent-amber-400/80"
        />
      </div>
    </motion.div>
  )
}
