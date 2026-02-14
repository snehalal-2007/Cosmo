/**
 * Cosmo – Smooth curved line connecting N → E → S → W → N on the celestial sphere.
 * Uses spherical interpolation (slerp) between cardinal direction vectors; follows sphere surface.
 */
import { useMemo } from 'react'
import {
  BufferGeometry,
  Float32BufferAttribute,
  Vector3,
  LineLoop,
  LineBasicMaterial,
} from 'three'

const SPHERE_RADIUS = 500

const N = new Vector3(0, 1, 0)
const E = new Vector3(1, 0, 0)
const S = new Vector3(0, -1, 0)
const W = new Vector3(-1, 0, 0)

/** Spherical linear interpolation between two unit vectors; returns point on sphere. */
function slerp(a: Vector3, b: Vector3, t: number, out: Vector3): Vector3 {
  const cos = Math.max(-1, Math.min(1, a.dot(b)))
  const angle = Math.acos(cos)
  if (angle < 1e-6) {
    return out.copy(a)
  }
  const sinAngle = Math.sin(angle)
  const wa = Math.sin((1 - t) * angle) / sinAngle
  const wb = Math.sin(t * angle) / sinAngle
  return out.copy(a).multiplyScalar(wa).addScaledVector(b, wb)
}

const SEGMENTS_PER_ARC = 24

function buildCardinalRingPoints(): Float32Array {
  const arcs: [Vector3, Vector3][] = [[N, E], [E, S], [S, W], [W, N]]
  const points: number[] = []
  const temp = new Vector3()

  for (let i = 0; i < arcs.length; i++) {
    const [from, to] = arcs[i]
    const steps = i < arcs.length - 1 ? SEGMENTS_PER_ARC : SEGMENTS_PER_ARC + 1
    for (let k = 0; k < steps; k++) {
      const t = k / (i < arcs.length - 1 ? SEGMENTS_PER_ARC : SEGMENTS_PER_ARC)
      slerp(from, to, t, temp).multiplyScalar(SPHERE_RADIUS)
      points.push(temp.x, temp.y, temp.z)
    }
  }

  return new Float32Array(points)
}

export function CardinalRing() {
  const [geometry, material] = useMemo(() => {
    const positions = buildCardinalRingPoints()
    const geom = new BufferGeometry()
    geom.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geom.computeBoundingSphere()

    const mat = new LineBasicMaterial({
      color: 0xa8c8f0,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    })

    return [geom, mat]
  }, [])

  const line = useMemo(() => new LineLoop(geometry, material), [geometry, material])

  return <primitive object={line} />
}
