/**
 * Cosmo – Constellation sky canvas: circular view, pan/zoom, stars, lines.
 * Smooth camera controls and click-to-select with zoom.
 */
import { useRef, useEffect, useCallback, useMemo } from 'react'
import { CONSTELLATIONS } from '../../data/constellations'
import type { ConstellationData } from '../../data/constellations'
import { drawStar, drawConstellationLine } from './starUtils'

const PARTICLE_COUNT = 280
const EASING = 0.08
const MIN_SCALE = 0.4
const MAX_SCALE = 3
const HIT_RADIUS = 0.08

function worldToScreen(
  wx: number,
  wy: number,
  centerX: number,
  centerY: number,
  scale: number,
  panX: number,
  panY: number
): { x: number; y: number } {
  return {
    x: centerX + wx * scale + panX,
    y: centerY - wy * scale + panY,
  }
}

function screenToWorld(
  sx: number,
  sy: number,
  centerX: number,
  centerY: number,
  scale: number,
  panX: number,
  panY: number
): { x: number; y: number } {
  return {
    x: (sx - centerX - panX) / scale,
    y: -(sy - centerY - panY) / scale,
  }
}

/** Hit-test: which constellation (if any) was clicked near. */
function hitTestConstellation(
  worldX: number,
  worldY: number,
  scale: number
): ConstellationData | null {
  const threshold = HIT_RADIUS * (1.5 / scale)
  let best: ConstellationData | null = null
  let bestDist = threshold

  for (const c of CONSTELLATIONS) {
    for (const star of c.stars) {
      const dx = star.x - worldX
      const dy = star.y - worldY
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < bestDist) {
        bestDist = d
        best = c
      }
    }
  }
  return best
}

/** Ease value toward target */
function ease(current: number, target: number, factor: number): number {
  return current + (target - current) * factor
}

export type ConstellationSceneProps = {
  selectedId: string | null
  onSelectConstellation: (id: string | null) => void
}

export function ConstellationScene({
  selectedId,
  onSelectConstellation,
}: ConstellationSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const targetScale = useRef(0.85)
  const targetPanX = useRef(0)
  const targetPanY = useRef(0)
  const currentScale = useRef(0.85)
  const currentPanX = useRef(0)
  const currentPanY = useRef(0)

  const isDragging = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })
  const particles = useRef<{ x: number; y: number; size: number }[]>([])

  const selected = useMemo(
    () => CONSTELLATIONS.find((c) => c.id === selectedId) ?? null,
    [selectedId]
  )

  // Zoom/pan to center the selected constellation
  useEffect(() => {
    if (!selected) {
      targetScale.current = 0.85
      targetPanX.current = 0
      targetPanY.current = 0
      return
    }
    const cx =
      selected.stars.reduce((s, st) => s + st.x, 0) / selected.stars.length
    const cy =
      selected.stars.reduce((s, st) => s + st.y, 0) / selected.stars.length
    targetScale.current = 1.8
    targetPanX.current = -cx * 1.8 * 0.5
    targetPanY.current = cy * 1.8 * 0.5
  }, [selected])

  // Initialize particle field
  useEffect(() => {
    const list: { x: number; y: number; size: number }[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = Math.sqrt(Math.random()) * 1.2
      list.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        size: 0.3 + Math.random() * 0.8,
      })
    }
    particles.current = list
  }, [])

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const dpr = Math.min(2, window.devicePixelRatio ?? 1)
    const rect = container.getBoundingClientRect()
    const w = rect.width
    const h = rect.height
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
  }, [])

  useEffect(() => {
    resize()
    const ro = new ResizeObserver(resize)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [resize])

  const getCenter = useCallback(() => {
    const container = containerRef.current
    if (!container) return { cx: 0, cy: 0 }
    const rect = container.getBoundingClientRect()
    return { cx: rect.width / 2, cy: rect.height / 2 }
  }, [])

  const getMouse = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current
    if (!container) return { x: 0, y: 0 }
    const rect = container.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }, [])

  const handlePointerDown = useCallback(
    (e: React.MouseEvent) => {
      const { cx, cy } = getCenter()
      const scaleVal = currentScale.current
      const panXVal = currentPanX.current
      const panYVal = currentPanY.current
      const { x, y } = getMouse(e)
      const world = screenToWorld(x, y, cx, cy, scaleVal, panXVal, panYVal)
      const hit = hitTestConstellation(world.x, world.y, scaleVal)
      if (hit) {
        onSelectConstellation(hit.id)
      } else {
        isDragging.current = true
        lastMouse.current = { x: e.clientX, y: e.clientY }
      }
    },
    [getCenter, getMouse, onSelectConstellation]
  )

  const handlePointerMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return
      const dx = e.clientX - lastMouse.current.x
      const dy = e.clientY - lastMouse.current.y
      lastMouse.current = { x: e.clientX, y: e.clientY }
      targetPanX.current += dx
      targetPanY.current += dy
    },
    []
  )

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    targetScale.current = Math.min(
      MAX_SCALE,
      Math.max(MIN_SCALE, targetScale.current + targetScale.current * delta)
    )
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const loop = () => {
      const container = containerRef.current
      if (!container || !ctx) return
      const rect = container.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const dpr = Math.min(2, window.devicePixelRatio ?? 1)
      const cx = w / 2
      const cy = h / 2

      currentScale.current = ease(
        currentScale.current,
        targetScale.current,
        EASING
      )
      currentPanX.current = ease(
        currentPanX.current,
        targetPanX.current,
        EASING
      )
      currentPanY.current = ease(
        currentPanY.current,
        targetPanY.current,
        EASING
      )

      const scaleVal = currentScale.current
      const panXVal = currentPanX.current
      const panYVal = currentPanY.current

      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, w, h)

      // Circular clip (telescope view)
      ctx.beginPath()
      ctx.arc(cx, cy, Math.min(w, h) / 2, 0, Math.PI * 2)
      ctx.clip()

      // Dark gradient background
      const bg = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        Math.max(w, h) * 0.8
      )
      bg.addColorStop(0, '#0a0a12')
      bg.addColorStop(0.5, '#050508')
      bg.addColorStop(1, '#000000')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // Particle stars
      const baseScale = Math.min(w, h) * 0.35 * scaleVal
      for (const p of particles.current) {
        const { x, y } = worldToScreen(
          p.x,
          p.y,
          cx,
          cy,
          baseScale,
          panXVal,
          panYVal
        )
        if (x >= -20 && x <= w + 20 && y >= -20 && y <= h + 20) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + p.size * 0.2})`
          ctx.beginPath()
          ctx.arc(x, y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Constellation lines (under stars)
      for (const c of CONSTELLATIONS) {
        const isSelected = c.id === selectedId
        const starMap = new Map(c.stars.map((s) => [s.id, s]))
        for (const [idA, idB] of c.lines) {
          const sa = starMap.get(idA)
          const sb = starMap.get(idB)
          if (!sa || !sb) continue
          const pa = worldToScreen(
            sa.x,
            sa.y,
            cx,
            cy,
            baseScale,
            panXVal,
            panYVal
          )
          const pb = worldToScreen(
            sb.x,
            sb.y,
            cx,
            cy,
            baseScale,
            panXVal,
            panYVal
          )
          drawConstellationLine(ctx, pa.x, pa.y, pb.x, pb.y, {
            glow: isSelected,
            lineWidth: isSelected ? 2 : 1,
          })
        }
      }

      // Stars
      const starScale = baseScale * 0.12
      for (const c of CONSTELLATIONS) {
        const isSelected = c.id === selectedId
        for (const star of c.stars) {
          const { x, y } = worldToScreen(
            star.x,
            star.y,
            cx,
            cy,
            baseScale,
            panXVal,
            panYVal
          )
          if (x >= -50 && x <= w + 50 && y >= -50 && y <= h + 50) {
            drawStar(ctx, x, y, star.magnitude, {
              scale: starScale,
              glowIntensity: isSelected ? 1.4 : 1,
              isHighlight: isSelected,
            })
          }
        }
      }

      ctx.restore()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [selectedId])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center"
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onWheel={handleWheel}
      style={{ touchAction: 'none' }}
      role="img"
      aria-label="Constellation night sky"
    >
      <canvas
        ref={canvasRef}
        className="block rounded-full cursor-grab active:cursor-grabbing"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  )
}
