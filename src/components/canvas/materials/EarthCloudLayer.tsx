/**
 * Cosmo – Earth cloud layer. Slightly larger transparent sphere, slow rotation.
 * Uses clouds.png or clouds.jpg from /textures/earth/.
 */
import { useRef } from 'react'
import type { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import { useOptionalTexture } from '../../../hooks/usePlanetTextures'
import { EARTH_CLOUD_PATHS } from '../../../data/planetTextures'

type EarthCloudLayerProps = {
  radius: number
  /** Rotation speed multiplier (e.g. 0.98 = slightly slower than Earth surface) */
  rotationSpeed?: number
}

export function EarthCloudLayer({ radius, rotationSpeed = 0.98 }: EarthCloudLayerProps) {
  const meshRef = useRef<Mesh>(null)
  const cloudMapPng = useOptionalTexture(EARTH_CLOUD_PATHS[0], true)
  const cloudMapJpg = useOptionalTexture(EARTH_CLOUD_PATHS[1], true)
  const cloudMap = cloudMapPng ?? cloudMapJpg

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.1 * rotationSpeed
  })

  return (
    <mesh ref={meshRef} scale={1.01}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshBasicMaterial
        map={cloudMap ?? undefined}
        transparent
        opacity={cloudMap ? 0.38 : 0.12}
        depthWrite={false}
        color="#ffffff"
      />
    </mesh>
  )
}
