/**
 * Cosmo – Planet: PBR materials, optional textures, orbit/rotation from simulation time.
 * Earth: clouds + atmospheric glow. Jupiter: subtle cloud rotation. Hover labels; click focuses.
 */
import { useRef, useMemo } from 'react'
import { Group, Mesh, Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import { getOrbitPositionWithInclination } from '../../utils/orbit'
import { useSimulationStore } from '../../store'
import { orbitAngleRad, rotationAngleRad } from '../../data/planets'
import type { PlanetId } from '../../data/planets'
import { PLANET_MATERIAL_CONFIG } from '../../data/planetTextures'
import { usePreloadedTexture } from '../../contexts/TexturePreloadContext'
import { usePlanetTextures } from '../../hooks/usePlanetTextures'
import { PlanetPBRMaterial, EarthAtmosphere, EarthCloudLayer } from './materials'

export type PlanetProps = {
  planetId: string
  planetName: string
  orbitRadius: number
  size: number
  orbitalPeriodDays: number
  rotationPeriodDays: number
  inclinationDeg: number
  color?: string
}

const _worldPos = new Vector3()
const SEGMENTS = 64
const HIT_SCALE = 2.5

function usePlanetClick(planetId: PlanetId, objectRef: React.RefObject<Group | null>) {
  return (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (!objectRef.current) return
    objectRef.current.getWorldPosition(_worldPos)
    useSimulationStore.getState().setSelectedPlanet(planetId)
  }
}

function usePlanetHover(planetId: PlanetId) {
  const setHovered = useSimulationStore((s) => s.setHoveredPlanet)
  return {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      setHovered(planetId)
    },
    onPointerOut: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      setHovered(null)
    },
  }
}

function PlanetLabel({ name, visible }: { name: string; visible: boolean }) {
  return (
    <Html
      center
      position={[0, 1.2, 0]}
      style={{ pointerEvents: 'none', transition: 'opacity 0.2s ease' }}
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
        {name}
      </motion.div>
    </Html>
  )
}

export function Planet({
  planetId,
  planetName,
  orbitRadius,
  size,
  orbitalPeriodDays,
  rotationPeriodDays,
  inclinationDeg,
  color: _colorProp,
}: PlanetProps) {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const simulationTimeDays = useSimulationStore((s) => s.simulationTimeDays)
  const hoveredPlanet = useSimulationStore((s) => s.hoveredPlanet)
  const preloadedMap = usePreloadedTexture(planetId as PlanetId)
  const hookTextures = usePlanetTextures(planetId as PlanetId)
  const textures = useMemo(
    () => ({
      ...hookTextures,
      map: preloadedMap ?? hookTextures.map,
    }),
    [preloadedMap, hookTextures]
  )
  const config = PLANET_MATERIAL_CONFIG[planetId as PlanetId]
  const onPointerDown = usePlanetClick(planetId as PlanetId, groupRef)
  const hoverHandlers = usePlanetHover(planetId as PlanetId)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const angle = orbitAngleRad(simulationTimeDays, orbitalPeriodDays)
    const pos = getOrbitPositionWithInclination(orbitRadius, angle, inclinationDeg)
    groupRef.current.position.copy(pos)
    const rotAngle = rotationAngleRad(simulationTimeDays, rotationPeriodDays)
    if (meshRef.current) {
      meshRef.current.rotation.y = rotAngle
      // Jupiter: slow cloud-band drift for visual interest
      if (planetId === 'jupiter') meshRef.current.rotation.y += delta * 0.02
    }
  })

  const showLabel = hoveredPlanet === planetId
  const isEarth = planetId === 'earth'
  const hasAtmosphere = config?.hasAtmosphere

  return (
    <group ref={groupRef}>
      {/* Main planet sphere – PBR */}
      <mesh
        ref={meshRef}
        name={planetId}
        onPointerDown={onPointerDown}
        onPointerOver={hoverHandlers.onPointerOver}
        onPointerOut={hoverHandlers.onPointerOut}
      >
        <sphereGeometry args={[size, SEGMENTS, SEGMENTS]} />
        <PlanetPBRMaterial planetId={planetId as PlanetId} textures={textures} />
      </mesh>

      {/* Earth: cloud layer (slightly larger, transparent) */}
      {isEarth && config?.hasClouds && (
        <EarthCloudLayer radius={size} rotationSpeed={0.98} />
      )}

      {/* Earth / Neptune: atmospheric rim glow */}
      {hasAtmosphere && (
        <EarthAtmosphere
          radius={size}
          color={planetId === 'neptune' ? '#4166a8' : '#4a7ba7'}
          power={planetId === 'neptune' ? 1.3 : 1.4}
          intensity={planetId === 'neptune' ? 0.2 : 0.35}
        />
      )}

      {/* Invisible larger hit area */}
      <mesh
        name={`${planetId}-hit`}
        onPointerDown={onPointerDown}
        onPointerOver={hoverHandlers.onPointerOver}
        onPointerOut={hoverHandlers.onPointerOut}
      >
        <sphereGeometry args={[size * HIT_SCALE, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <PlanetLabel name={planetName} visible={showLabel} />
    </group>
  )
}
