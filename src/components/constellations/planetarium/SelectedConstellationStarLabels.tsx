/**
 * Cosmo – Star name labels for the selected constellation only.
 * Shows Html labels at each star position; only visible when a constellation is selected.
 */
import { useMemo } from 'react'
import { Html } from '@react-three/drei'
import type { ConstellationCatalogEntry } from '../../../data/constellationCatalog'
import { getStarById } from '../../../data/starCatalog'
import { raDecToCartesian } from '../../../utils/celestialSphere'

const SPHERE_RADIUS = 500

function formatStarName(id: string): string {
  return id
    .split(/[- ]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ')
}

export function SelectedConstellationStarLabels({
  constellation,
}: {
  constellation: ConstellationCatalogEntry
}) {
  const stars = useMemo(() => {
    const ids = new Set<string>()
    for (const [a, b] of constellation.lineSegments) {
      ids.add(a)
      ids.add(b)
    }
    const result: { id: string; x: number; y: number; z: number }[] = []
    ids.forEach((id) => {
      const star = getStarById(id)
      if (star) {
        const v = raDecToCartesian(star.ra, star.dec)
        result.push({
          id,
          x: v.x * SPHERE_RADIUS,
          y: v.y * SPHERE_RADIUS,
          z: v.z * SPHERE_RADIUS,
        })
      }
    })
    return result
  }, [constellation])

  return (
    <>
      {stars.map(({ id, x, y, z }) => (
        <Html key={id} position={[x, y, z]} center style={{ pointerEvents: 'none' }}>
          <span className="text-xs font-light text-white/90 whitespace-nowrap">
            {formatStarName(id)}
          </span>
        </Html>
      ))}
    </>
  )
}
