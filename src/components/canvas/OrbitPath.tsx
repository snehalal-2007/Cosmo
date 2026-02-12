/**
 * Cosmo – Orbit trail (Visual mode only). Static ellipse path.
 * Raycast disabled so clicks pass through to planets (fixes focus zoom for smaller planets).
 */
import { useMemo, useRef, useLayoutEffect } from 'react'
import type { Group } from 'three'
import { getOrbitPositionWithInclination } from '../../utils/orbit'

type OrbitPathProps = {
  orbitRadius: number
  inclinationDeg: number
  segments?: number
}

export function OrbitPath({
  orbitRadius,
  inclinationDeg,
  segments = 128,
}: OrbitPathProps) {
  const groupRef = useRef<Group>(null)
  const points = useMemo(() => {
    const pts: number[] = []
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * 2 * Math.PI
      const p = getOrbitPositionWithInclination(orbitRadius, angle, inclinationDeg)
      pts.push(p.x, p.y, p.z)
    }
    return new Float32Array(pts)
  }, [orbitRadius, inclinationDeg, segments])

  useLayoutEffect(() => {
    const group = groupRef.current
    if (!group?.children[0]) return
    const line = group.children[0] as unknown as { raycast: (r: unknown, i: unknown) => void }
    line.raycast = () => {}
  }, [])

  return (
    <group ref={groupRef}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[points, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </line>
    </group>
  )
}
