/**
 * Cosmo – Advances central simulation time each frame. Single source of truth for time.
 */
import { useFrame } from '@react-three/fiber'
import { useSimulationStore } from '../../store'

export function SimulationClock() {
  const advanceSimulationTime = useSimulationStore((s) => s.advanceSimulationTime)

  useFrame((_, delta) => {
    advanceSimulationTime(delta)
  })

  return null
}
