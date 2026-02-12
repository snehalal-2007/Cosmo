/**
 * Cosmo – Saturn's ring system. Transparent texture for inner/outer variation, soft golden bands.
 */
import { useRef } from 'react'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'
import { DoubleSide } from 'three'
import { getOrbitPositionWithInclination } from '../../utils/orbit'
import { useSimulationStore } from '../../store'
import { orbitAngleRad } from '../../data/planets'
import { useOptionalTexture } from '../../hooks/usePlanetTextures'
import { SATURN_RINGS_ALPHA_PATH } from '../../data/planetTextures'

type SaturnRingsProps = {
  orbitRadius: number
  orbitalPeriodDays: number
  inclinationDeg: number
  innerRadius: number
  outerRadius: number
}

export function SaturnRings({
  orbitRadius,
  orbitalPeriodDays,
  inclinationDeg,
  innerRadius,
  outerRadius,
}: SaturnRingsProps) {
  const groupRef = useRef<Group>(null)
  const ringsAlpha = useOptionalTexture(SATURN_RINGS_ALPHA_PATH)

  useFrame(() => {
    if (!groupRef.current) return
    const simulationTimeDays = useSimulationStore.getState().simulationTimeDays
    const angle = orbitAngleRad(simulationTimeDays, orbitalPeriodDays)
    const pos = getOrbitPositionWithInclination(orbitRadius, angle, inclinationDeg)
    groupRef.current.position.copy(pos)
  })

  return (
    <group ref={groupRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerRadius, outerRadius, 128]} />
        <meshStandardMaterial
          color="#c9b896"
          side={DoubleSide}
          transparent
          opacity={0.72}
          roughness={0.9}
          metalness={0.05}
          alphaMap={ringsAlpha ?? undefined}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
