/**
 * Cosmo – Constellation line overlays on the celestial sphere.
 * Only explicit lineSegments (star id pairs). No auto-connect. Bright visible lines.
 */
import { useMemo } from 'react'
import { Vector3 } from 'three'
import { Line } from '@react-three/drei'
import { CONSTELLATION_CATALOG } from '../../../data/constellationCatalog'
import { getStarById } from '../../../data/starCatalog'
import { raDecToCartesian } from '../../../utils/celestialSphere'

const SPHERE_RADIUS = 500

export function ConstellationOverlay() {
  const points = useMemo(() => {
    const out: [number, number, number][] = []
    const v = new Vector3()
    for (const con of CONSTELLATION_CATALOG) {
      for (const [idA, idB] of con.lineSegments) {
        const sa = getStarById(idA)
        const sb = getStarById(idB)
        if (!sa) {
          if (import.meta.env.DEV) {
            console.warn(`[ConstellationOverlay] Missing star in catalog: "${idA}" (constellation: ${con.name})`)
          }
          continue
        }
        if (!sb) {
          if (import.meta.env.DEV) {
            console.warn(`[ConstellationOverlay] Missing star in catalog: "${idB}" (constellation: ${con.name})`)
          }
          continue
        }
        raDecToCartesian(sa.ra, sa.dec, v)
        out.push([v.x * SPHERE_RADIUS, v.y * SPHERE_RADIUS, v.z * SPHERE_RADIUS])
        raDecToCartesian(sb.ra, sb.dec, v)
        out.push([v.x * SPHERE_RADIUS, v.y * SPHERE_RADIUS, v.z * SPHERE_RADIUS])
      }
    }
    return out
  }, [])

  if (points.length === 0) return null

  return (
    <Line
      points={points}
      segments
      color="#7FDBFF"
      lineWidth={1.2}
      depthWrite={false}
      transparent
      opacity={0.5}
    />
  )
}
