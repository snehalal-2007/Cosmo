/**
 * Cosmo – PBR material for Moon. Crater detail, no atmosphere, strong contrast.
 * Explicitly loads diffuse.jpg when not provided so the map always applies.
 */
import { useMemo } from 'react'
import { Color } from 'three'
import type { Texture } from 'three'
import { useMoonTextures, useOptionalTexture } from '../../../hooks/usePlanetTextures'
import { DIFFUSE_TEXTURE_URLS, MOON_MATERIAL_CONFIG } from '../../../data/planetTextures'

type MoonPBRMaterialProps = {
  preloadedMap?: Texture | null
}

export function MoonPBRMaterial({ preloadedMap = null }: MoonPBRMaterialProps) {
  const textures = useMoonTextures()
  const config = MOON_MATERIAL_CONFIG
  const explicitDiffuse = useOptionalTexture(DIFFUSE_TEXTURE_URLS.moon, true)
  const map = preloadedMap ?? textures.map ?? explicitDiffuse
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
