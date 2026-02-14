/**
 * Cosmo – Star drawing utilities for constellation canvas.
 * Encapsulates glow and star rendering for reuse and clarity.
 */

/** Normalized magnitude to radius (larger = brighter star) */
export function magnitudeToRadius(magnitude: number, scale: number): number {
  const base = Math.max(0.5, 4 - magnitude)
  return Math.max(1, base * scale)
}

/** Draw a star with subtle glow (canvas 2D) */
export function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  magnitude: number,
  options: {
    scale: number
    glowIntensity?: number
    isHighlight?: boolean
  }
): void {
  const { scale, glowIntensity = 1, isHighlight = false } = options
  const radius = magnitudeToRadius(magnitude, scale)
  const glowRadius = radius * (isHighlight ? 8 : 4)

  // Outer glow
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius)
  const alpha = (isHighlight ? 0.35 : 0.2) * glowIntensity
  gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
  gradient.addColorStop(0.4, `rgba(255, 255, 255, ${alpha * 0.3})`)
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(x, y, glowRadius, 0, Math.PI * 2)
  ctx.fill()

  // Core
  const coreGradient = ctx.createRadialGradient(
    x - radius * 0.3,
    y - radius * 0.3,
    0,
    x,
    y,
    radius
  )
  coreGradient.addColorStop(0, '#ffffff')
  coreGradient.addColorStop(0.5, isHighlight ? '#fff5e0' : '#e8e8ff')
  coreGradient.addColorStop(1, 'rgba(200, 220, 255, 0.6)')
  ctx.fillStyle = coreGradient
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}

/** Draw a constellation line with optional glow */
export function drawConstellationLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  options: { glow?: boolean; lineWidth?: number } = {}
): void {
  const { glow = false, lineWidth = 1 } = options
  if (glow) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
    ctx.lineWidth = lineWidth + 4
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }
  ctx.strokeStyle = glow ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)'
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}
