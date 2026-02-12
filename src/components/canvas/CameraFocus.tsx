/**
 * Cosmo – Dynamic camera focus: OrbitControls target follows selected body (Sun default).
 * Smooth lerp for cinematic transition when selection changes; then target follows body, camera is user-controlled.
 */
import { useRef } from 'react'
import { Vector3 } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useSimulationStore } from '../../store'
import { getCelestialWorldPosition } from '../../utils/celestialPosition'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

const FOCUS_DISTANCE = 8
const LERP_FACTOR = 0.06
const ARRIVAL_THRESHOLD = 0.8

type Props = { controlsRef: React.RefObject<OrbitControlsImpl | null> }

export function CameraFocus({ controlsRef }: Props) {
  const { camera } = useThree()
  const setFocusTarget = useSimulationStore((s) => s.setFocusTarget)
  const prevSelectedRef = useRef(useSimulationStore.getState().selectedPlanet)

  const targetLookAt = useRef(new Vector3())
  const targetCameraPos = useRef(new Vector3())
  const transitionComplete = useRef(true)

  useFrame(() => {
    if (!controlsRef.current) return

    // Read latest state inside useFrame so we never use stale closure (fixes click -> zoom to Sun)
    const { selectedPlanet, simulationTimeDays, scaleMode } = useSimulationStore.getState()
    if (prevSelectedRef.current !== selectedPlanet) {
      prevSelectedRef.current = selectedPlanet
      transitionComplete.current = false
    }

    const targetWorld = getCelestialWorldPosition(
      selectedPlanet,
      simulationTimeDays,
      scaleMode
    )
    setFocusTarget({ x: targetWorld.x, y: targetWorld.y, z: targetWorld.z })

    targetLookAt.current.copy(targetWorld)
    targetCameraPos.current.set(
      targetWorld.x + FOCUS_DISTANCE * 0.5,
      targetWorld.y + FOCUS_DISTANCE * 0.35,
      targetWorld.z + FOCUS_DISTANCE * 0.5
    )

    const controls = controlsRef.current
    const cam = camera

    // Always lerp OrbitControls target so it follows the focused body (or Sun at origin)
    controls.target.lerp(targetLookAt.current, LERP_FACTOR)

    // Only lerp camera position during transition; once close, let user orbit freely
    if (!transitionComplete.current) {
      cam.position.lerp(targetCameraPos.current, LERP_FACTOR)
      if (cam.position.distanceTo(targetCameraPos.current) < ARRIVAL_THRESHOLD) {
        transitionComplete.current = true
      }
    }
  })

  return null
}
