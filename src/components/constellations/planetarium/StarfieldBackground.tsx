/**
 * Cosmo – Immersive starfield background for the planetarium.
 * Large sphere viewed from inside (BackSide); procedural starfield texture. Renders behind all sky content.
 */
import { useMemo } from 'react'
import { CanvasTexture, BackSide } from 'three'

const SPHERE_RADIUS = 2000
const SEGMENTS = 64

/** Procedural starfield texture: many small dots of varying size and brightness on dark background. */
function createStarfieldTexture(): CanvasTexture {
  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#020206'
  ctx.fillRect(0, 0, size, size)
  const starCount = 4500
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = 0.3 + Math.random() * 1.2
    const alpha = 0.15 + Math.random() * 0.35
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
    ctx.fill()
  }
  const tex = new CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

export function StarfieldBackground() {
  const texture = useMemo(() => createStarfieldTexture(), [])

  return (
    <mesh renderOrder={-1}>
      <sphereGeometry args={[SPHERE_RADIUS, SEGMENTS, SEGMENTS]} />
      <meshBasicMaterial
        map={texture}
        side={BackSide}
        depthWrite
        depthTest
      />
    </mesh>
  )
}
