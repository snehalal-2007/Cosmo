/**
 * Cosmo – Sun mesh + brightness from store. Diffuse from preload: public/textures/sun/diffuse.jpg.
 */
import { useRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import { useSimulationStore } from '../../store'
import { usePreloadedTexture } from '../../contexts/TexturePreloadContext'

const SUN_RADIUS = 2.5
const SUN_COLOR = '#fff5e0'

export function Sun() {
  const meshRef = useRef<Mesh>(null)
  const map = usePreloadedTexture('sun')

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[SUN_RADIUS, 64, 64]} />
      <meshBasicMaterial
        map={map ?? undefined}
        color={SUN_COLOR}
        toneMapped={false}
      />
    </mesh>
  )
}

export function useSunBrightness() {
  return useSimulationStore((s) => s.sunBrightness)
}
