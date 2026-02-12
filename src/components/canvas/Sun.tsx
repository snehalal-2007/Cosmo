/**
 * Cosmo – Sun mesh + brightness from store (emissive, bloom, point light in Scene).
 */
import { useRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import { useSimulationStore } from '../../store'

const SUN_RADIUS = 2.5
const SUN_COLOR = '#fff5e0'

export function Sun() {
  const meshRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[SUN_RADIUS, 64, 64]} />
      <meshBasicMaterial
        color={SUN_COLOR}
        toneMapped={false}
      />
    </mesh>
  )
}

export function useSunBrightness() {
  return useSimulationStore((s) => s.sunBrightness)
}
