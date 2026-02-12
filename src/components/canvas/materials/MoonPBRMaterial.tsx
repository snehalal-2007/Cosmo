/**
 * Cosmo – PBR material for Moon. Map = preloadedMap ?? hook textures.map.
 */
import { useMemo } from 'react'
import { Color } from 'three'
import type { Texture } from 'three'
import { useMoonTextures } from '../../../hooks/usePlanetTextures'
import { MOON_MATERIAL_CONFIG } from '../../../data/planetTextures'

type MoonPBRMaterialProps = {
  preloadedMap?: Texture | null
}

export function MoonPBRMaterial({ preloadedMap = null }: MoonPBRMaterialProps) {
  const textures = useMoonTextures()
  const config = MOON_MATERIAL_CONFIG
  const map = preloadedMap ?? textures.map
  const { normalMap, roughnessMap } = textures

  const color = useMemo(
    () => new Color(map ? '#ffffff' : config.color),
    [config.color, map]
  )

  return (
    <meshStandardMaterial
      color={color}
      map={map ?? undefined}
      normalMap={normalMap ?? undefined}
      normalScale={config.normalScale != null ? [config.normalScale, config.normalScale] : undefined}
      roughnessMap={roughnessMap ?? undefined}
      roughness={config.roughness}
      metalness={config.metalness}
      envMapIntensity={0.25}
    />
  )
}
