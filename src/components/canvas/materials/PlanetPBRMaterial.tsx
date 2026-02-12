/**
 * Cosmo – PBR material for planets. Map comes from parent: preloadedMap ?? hookTextures.map.
 */
import { useMemo } from 'react'
import { Color } from 'three'
import type { PlanetId } from '../../../data/planets'
import { PLANET_MATERIAL_CONFIG } from '../../../data/planetTextures'
import type { LoadedTextures } from '../../../hooks/usePlanetTextures'

type PlanetPBRMaterialProps = {
  planetId: PlanetId
  textures: LoadedTextures
}

export function PlanetPBRMaterial({ planetId, textures }: PlanetPBRMaterialProps) {
  const config = PLANET_MATERIAL_CONFIG[planetId]
  const { map, normalMap, roughnessMap } = textures

  const color = useMemo(
    () => new Color(map ? '#ffffff' : config.color),
    [config.color, map]
  )
  const emissive = useMemo(
    () => (config.emissive ? new Color(config.emissive) : undefined),
    [config.emissive]
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
      emissive={emissive}
      emissiveIntensity={config.emissiveIntensity ?? 0}
      envMapIntensity={0.4}
    />
  )
}
