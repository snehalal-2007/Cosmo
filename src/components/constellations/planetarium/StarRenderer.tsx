/**
 * Cosmo – Renders catalog stars as visible circular points on the celestial sphere.
 * THREE.Points + BufferGeometry + ShaderMaterial. Perfect circles via gl_PointCoord; no textures.
 */
import { useMemo } from 'react'
import {
  BufferGeometry,
  Float32BufferAttribute,
  ShaderMaterial,
  AdditiveBlending,
} from 'three'
import { STAR_CATALOG } from '../../../data/starCatalog'
import { raDecToCartesian } from '../../../utils/celestialSphere'

const SPHERE_RADIUS = 500

// STEP 1 — Confirm stars exist
if (typeof console !== 'undefined') {
  console.log('[StarRenderer] STAR_CATALOG.length =', STAR_CATALOG.length)
}

/** Sizes so stars are clearly visible and dominate over lines. */
function magnitudeToSize(magnitude: number): number {
  if (magnitude <= 0) return 9
  if (magnitude <= 1) return 7
  if (magnitude <= 2) return 6
  if (magnitude <= 3) return 5
  if (magnitude <= 4) return 4
  return 3
}

const vertexShader = /* glsl */ `
  attribute float size;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float scale = 800.0 / max(1.0, -mvPosition.z);
    gl_PointSize = size * scale;
  }
`

const fragmentShader = /* glsl */ `
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c) * 2.0;
    if (d > 1.0) discard;
    float sharpCore = 1.0 - smoothstep(0.0, 0.25, d);
    float circle = 1.0 - smoothstep(0.42, 0.52, d);
    float glow = exp(-d * 1.2) * 0.5;
    float alpha = min(1.0, circle * 0.95 + glow);
    float brightness = 0.92 + 0.08 * sharpCore + 0.15 * glow;
    vec3 white = vec3(1.0, 1.0, 1.0) * brightness;
    gl_FragColor = vec4(white, alpha);
  }
`

export function StarRenderer() {
  const { positions, sizes } = useMemo(() => {
    const pos: number[] = []
    const siz: number[] = []
    let count = 0
    for (const star of STAR_CATALOG) {
      const v = raDecToCartesian(star.ra, star.dec)
      pos.push(v.x * SPHERE_RADIUS, v.y * SPHERE_RADIUS, v.z * SPHERE_RADIUS)
      siz.push(magnitudeToSize(star.magnitude))
      count++
    }
    if (typeof console !== 'undefined') {
      console.log('[StarRenderer] stars added to buffers:', count)
    }
    return {
      positions: new Float32Array(pos),
      sizes: new Float32Array(siz),
    }
  }, [])

  const geometry = useMemo(() => {
    const g = new BufferGeometry()
    g.setAttribute('position', new Float32BufferAttribute(positions, 3))
    g.setAttribute('size', new Float32BufferAttribute(sizes, 1))
    return g
  }, [positions, sizes])

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        opacity: 1.0,
        depthWrite: false,
        depthTest: true,
        blending: AdditiveBlending,
      }),
    []
  )

  return (
    <points geometry={geometry} material={material} />
  )
}
