/**
 * Cosmo – Optional constellation name labels on the sky.
 * Renders at constellation center (mean of star positions).
 */
import { useMemo } from 'react'
import { Html } from '@react-three/drei'
import { CONSTELLATION_CATALOG } from '../../../data/constellationCatalog'
import { getStarById } from '../../../data/starCatalog'
import { raDecToCartesian } from '../../../utils/celestialSphere'

const SPHERE_RADIUS = 500

export function ConstellationNamesOverlay() {
  const positions = useMemo(() => {
    return CONSTELLATION_CATALOG.map((con) => {
      const ids = new Set<string>()
      for (const [a, b] of con.lineSegments) {
        ids.add(a)
        ids.add(b)
      }
      let x = 0,
        y = 0,
        z = 0
      let n = 0
      ids.forEach((id) => {
        const s = getStarById(id)
        if (s) {
          const v = raDecToCartesian(s.ra, s.dec)
          x += v.x
          y += v.y
          z += v.z
          n++
        }
      })
      if (n === 0) return { name: con.name, x: 0, y: 0, z: 0 }
      return {
        name: con.name,
        x: (x / n) * SPHERE_RADIUS,
        y: (y / n) * SPHERE_RADIUS,
        z: (z / n) * SPHERE_RADIUS,
      }
    })
  }, [])

  return (
    <>
      {positions.map(({ name, x, y, z }, i) => (
        <Html key={i} position={[x, y, z]} center style={{ pointerEvents: 'none' }}>
          <span className="text-xs font-light text-white/70 whitespace-nowrap">
            {name}
          </span>
        </Html>
      ))}
    </>
  )
}
