/**
 * Cosmo – Moon orbits Earth. Position from central simulation time; tidal lock optional.
 * Click to select/focus; hover for label.
 */
import { useRef } from 'react'
import { Group, Mesh, Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { usePreloadedTexture } from '../../contexts/TexturePreloadContext'
import { MoonPBRMaterial } from './materials'
import { motion } from 'framer-motion'
import { getOrbitPosition } from '../../utils/orbit'
import { useSimulationStore } from '../../store'
import { orbitAngleRad, rotationAngleRad } from '../../data/planets'

type MoonProps = {
  /** Earth's orbit radius (same scale as planets) */
  earthOrbitRadius: number
  earthOrbitalPeriodDays: number
  earthInclinationDeg: number
  moonOrbitRadius: number
  moonOrbitalPeriodDays: number
  moonRotationPeriodDays: number
  moonSize: number
}

const _earthPos = new Vector3()

function getEarthPosition(
  orbitRadius: number,
  angleRad: number,
  inclinationDeg: number
): Vector3 {
  const inc = (inclinationDeg * Math.PI) / 180
  const x = orbitRadius * Math.cos(angleRad)
  const z = orbitRadius * Math.sin(angleRad)
  _earthPos.set(x, z * Math.sin(inc), z * Math.cos(inc))
  return _earthPos
}

function MoonLabel({ visible }: { visible: boolean }) {
  return (
    <Html
      center
      position={[0, 1.15, 0]}
      style={{ pointerEvents: 'none' }}
      distanceFactor={8}
    >
      <motion.div
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 13,
          fontWeight: 500,
          color: '#fff',
          whiteSpace: 'nowrap',
          padding: '4px 10px',
          borderRadius: 6,
          background: 'rgba(0,0,0,0.55)',
          boxShadow: '0 0 12px rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        Moon
      </motion.div>
    </Html>
  )
}

export function Moon({
  earthOrbitRadius,
  earthOrbitalPeriodDays,
  earthInclinationDeg,
  moonOrbitRadius,
  moonOrbitalPeriodDays,
  moonRotationPeriodDays,
  moonSize,
}: MoonProps) {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const simulationTimeDays = useSimulationStore((s) => s.simulationTimeDays)
  const hoveredPlanet = useSimulationStore((s) => s.hoveredPlanet)
  const setSelectedPlanet = useSimulationStore((s) => s.setSelectedPlanet)
  const preloadedMap = usePreloadedTexture('moon')

  useFrame(() => {
    if (!groupRef.current || !meshRef.current) return
    const earthAngle = orbitAngleRad(simulationTimeDays, earthOrbitalPeriodDays)
    getEarthPosition(earthOrbitRadius, earthAngle, earthInclinationDeg)
    const moonAngle = orbitAngleRad(simulationTimeDays, moonOrbitalPeriodDays)
    const offset = getOrbitPosition(moonOrbitRadius, moonAngle)
    groupRef.current.position.set(
      _earthPos.x + offset.x,
      _earthPos.y + offset.y,
      _earthPos.z + offset.z
    )
    const rotAngle = rotationAngleRad(simulationTimeDays, moonRotationPeriodDays)
    meshRef.current.rotation.y = rotAngle
  })

  const onPointerDown = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    setSelectedPlanet('moon')
  }
  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    useSimulationStore.getState().setHoveredPlanet('moon')
  }
  const onPointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    useSimulationStore.getState().setHoveredPlanet(null)
  }

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        name="moon"
        onPointerDown={onPointerDown}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <sphereGeometry args={[moonSize, 64, 64]} />
        <MoonPBRMaterial preloadedMap={preloadedMap} />
      </mesh>
      <MoonLabel visible={hoveredPlanet === 'moon'} />
    </group>
  )
}
